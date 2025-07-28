/**
 * Audio utilities for KravTime app
 * Handles Web Audio API with proper cleanup to prevent memory leaks
 */

let audioContext = null;
let bellAudioBuffer = null;
const activeSources = new Set(); // Track active audio sources for cleanup

/**
 * Initialize audio context and load bell sound
 * @returns {Promise<boolean>} - Success status
 */
export const initializeAudio = async () => {
  try {
    // Enhanced Web Audio API setup with better browser compatibility
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn('Web Audio API not supported');
      return false;
    }

    audioContext = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 44100
    });

    console.log('Audio context created successfully');
    
    // Load bell sound buffer
    await loadBellAudioBuffer();
    
    return true;
  } catch (err) {
    console.warn('Audio context setup failed:', err);
    return false;
  }
};

/**
 * Load bell sound as audio buffer
 * @returns {Promise<boolean>} - Success status
 */
const loadBellAudioBuffer = async () => {
  try {
    if (!audioContext) return false;
    
    const response = await fetch(`${process.env.PUBLIC_URL}/sounds/boxing_ring.wav`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    bellAudioBuffer = audioBuffer;
    console.log('Bell audio buffer loaded successfully');
    return true;
    
  } catch (err) {
    console.warn('Failed to load bell audio buffer:', err);
    
    // Try alternative path
    try {
      const response = await fetch('/KravTime/sounds/boxing_ring.wav');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      bellAudioBuffer = audioBuffer;
      console.log('Bell audio buffer loaded successfully (alternative path)');
      return true;
      
    } catch (altErr) {
      console.warn('Failed to load bell audio buffer (alternative path):', altErr);
      return false;
    }
  }
};

/**
 * Resume audio context if suspended (required for mobile)
 * @returns {Promise<boolean>} - Success status
 */
export const resumeAudioContext = async () => {
  try {
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume();
      console.log('Audio context resumed');
      return true;
    }
    return true;
  } catch (err) {
    console.warn('Failed to resume audio context:', err);
    return false;
  }
};

/**
 * Create and play a sound with proper cleanup
 * @param {AudioBuffer} buffer - The audio buffer to play
 * @param {number} volume - Volume level (0-1)
 * @param {Function} onEnded - Callback when sound finishes
 * @returns {AudioBufferSourceNode|null} - The created source node
 */
const createAndPlaySound = (buffer, volume = 1.0, onEnded = null) => {
  try {
    if (!audioContext || !buffer) return null;

    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    source.buffer = buffer;
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    
    // Connect: source -> gain -> destination
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Track active source for cleanup
    activeSources.add(source);
    
    // Cleanup when sound ends
    source.onended = () => {
      try {
        source.disconnect();
        gainNode.disconnect();
        activeSources.delete(source);
        if (onEnded) onEnded();
      } catch (cleanupErr) {
        console.warn('Audio cleanup error:', cleanupErr);
      }
    };
    
    // Play the sound
    source.start(0);
    
    return source;
  } catch (err) {
    console.warn('Error creating sound:', err);
    return null;
  }
};

/**
 * Play bell sound with proper cleanup
 * @param {number} volume - Volume level (0-1)
 * @returns {Promise<boolean>} - Success status
 */
export const playBellSound = async (volume = 1.0) => {
  try {
    if (!audioContext || !bellAudioBuffer) {
      console.warn('Audio context or bell buffer not ready');
      return false;
    }

    // Resume audio context if suspended
    await resumeAudioContext();
    
    // Create and play the bell sound
    const source = createAndPlaySound(bellAudioBuffer, volume);
    
    if (source) {
      console.log('Bell sound played successfully');
      
      // Vibration for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
      }
      
      return true;
    }
    
    return false;
    
  } catch (err) {
    console.warn('Bell sound error:', err);
    
    // Fallback: ensure vibration still works even if audio fails
    if (navigator.vibrate) {
      navigator.vibrate([300, 100, 300]);
    }
    
    return false;
  }
};

/**
 * Create wood clap sound using white noise
 * @param {number} volume - Volume level (0-1)
 * @returns {Promise<boolean>} - Success status
 */
export const playWoodClapSound = async (volume = 0.48) => {
  try {
    if (!audioContext) return false;
    
    await resumeAudioContext();
    
    // Create wood clap sound using white noise burst
    const bufferSize = audioContext.sampleRate * 0.06; // 0.06 seconds
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    // Generate filtered white noise for wood clap effect
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Filter for wood-like sound
    filter.type = 'highpass';
    filter.frequency.value = 1200;
    
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    
    // Track and cleanup
    activeSources.add(source);
    source.onended = () => {
      try {
        source.disconnect();
        filter.disconnect();
        gainNode.disconnect();
        activeSources.delete(source);
      } catch (cleanupErr) {
        console.warn('Wood clap cleanup error:', cleanupErr);
      }
    };
    
    source.start();
    source.stop(now + 0.06);
    
    // Sharp vibration for clap
    if (navigator.vibrate) {
      navigator.vibrate(80);
    }
    
    return true;
  } catch (err) {
    console.warn('Wood clap sound failed:', err);
    return false;
  }
};

/**
 * Play warning sound (3 wood claps)
 * @returns {Promise<boolean>} - Success status
 */
export const playWarningSound = async () => {
  try {
    // Play 3 wood claps with UFC-style rapid pace
    await playWoodClapSound(); // First clap immediately
    
    setTimeout(() => playWoodClapSound(), 250); // Second clap after 250ms
    setTimeout(() => playWoodClapSound(), 500); // Third clap after 500ms
    
    if (navigator.vibrate) {
      // Rapid vibration pattern: clap-clap-clap
      navigator.vibrate([80, 170, 80, 170, 80]);
    }
    
    return true;
  } catch (err) {
    console.warn('Warning sound failed:', err);
    return false;
  }
};

/**
 * Play triple bell sound for session end
 * @returns {Promise<boolean>} - Success status
 */
export const playTripleBell = async () => {
  try {
    // Fast-paced triple bell like in boxing - 400ms apart
    await playBellSound(1.56);
    setTimeout(() => playBellSound(1.56), 400);
    setTimeout(() => playBellSound(1.56), 800);
    
    // Extended vibration pattern for session end
    if (navigator.vibrate) {
      navigator.vibrate([300, 100, 300, 100, 300, 100, 300]);
    }
    
    return true;
  } catch (err) {
    console.warn('Triple bell failed:', err);
    return false;
  }
};

/**
 * Clean up all active audio sources and close audio context
 */
export const cleanupAudio = () => {
  try {
    // Stop and disconnect all active sources
    activeSources.forEach(source => {
      try {
        source.stop();
        source.disconnect();
      } catch (err) {
        // Source might already be stopped/disconnected
      }
    });
    activeSources.clear();
    
    // Close audio context
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
      audioContext = null;
      bellAudioBuffer = null;
    }
    
    console.log('Audio cleanup completed');
  } catch (err) {
    console.warn('Audio cleanup error:', err);
  }
};

/**
 * Get current audio context state
 * @returns {string|null} - Audio context state or null
 */
export const getAudioContextState = () => {
  return audioContext ? audioContext.state : null;
};

/**
 * Test if audio is ready
 * @returns {boolean} - True if audio is ready
 */
export const isAudioReady = () => {
  return !!(audioContext && bellAudioBuffer);
}; 