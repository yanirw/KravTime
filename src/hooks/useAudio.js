import { useEffect, useCallback, useState } from 'react';
import { 
  initializeAudio, 
  resumeAudioContext, 
  playBellSound, 
  playWarningSound, 
  playTripleBell, 
  cleanupAudio, 
  isAudioReady 
} from '../utils/audioUtils';

/**
 * Custom hook for managing audio functionality
 * Handles initialization, user interaction, and cleanup
 */
export const useAudio = () => {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audioError, setAudioError] = useState(null);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        const success = await initializeAudio();
        setAudioInitialized(success);
        
        if (!success) {
          setAudioError('Failed to initialize audio');
        }
      } catch (err) {
        console.warn('Audio setup failed:', err);
        setAudioError(err.message);
      }
    };

    const enableAudio = async () => {
      try {
        await resumeAudioContext();
        
        // Test if audio is ready after user interaction
        if (isAudioReady()) {
          setAudioInitialized(true);
          setAudioError(null);
        }
      } catch (err) {
        console.log('Audio setup - user interaction needed:', err);
      }

      // Remove listeners after first interaction
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    setupAudio();

    // Set up user interaction listeners for mobile
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);

    return () => {
      // Cleanup audio on unmount
      cleanupAudio();
      
      // Remove event listeners
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, []);

  const playBell = useCallback(async (volume = 1.56) => {
    try {
      const success = await playBellSound(volume);
      if (!success && audioInitialized) {
        setAudioError('Failed to play bell sound');
      }
      return success;
    } catch (err) {
      setAudioError(err.message);
      return false;
    }
  }, [audioInitialized]);

  const playWarning = useCallback(async () => {
    try {
      const success = await playWarningSound();
      if (!success && audioInitialized) {
        setAudioError('Failed to play warning sound');
      }
      return success;
    } catch (err) {
      setAudioError(err.message);
      return false;
    }
  }, [audioInitialized]);

  const playSessionEnd = useCallback(async () => {
    try {
      const success = await playTripleBell();
      if (!success && audioInitialized) {
        setAudioError('Failed to play session end sound');
      }
      return success;
    } catch (err) {
      setAudioError(err.message);
      return false;
    }
  }, [audioInitialized]);

  const clearError = useCallback(() => {
    setAudioError(null);
  }, []);

  return {
    audioInitialized,
    audioError,
    playBell,
    playWarning,
    playSessionEnd,
    clearError
  };
}; 