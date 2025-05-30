/**
 * Format seconds into MM:SS format
 * @param {number} seconds - The number of seconds to format
 * @returns {string} - Formatted time string (e.g., "2:30")
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate total workout duration
 * @param {number} rounds - Number of rounds
 * @param {number} roundDuration - Duration of each round in seconds
 * @param {number} restDuration - Duration of rest between rounds in seconds
 * @returns {number} - Total workout time in seconds
 */
export const calculateTotalWorkoutTime = (rounds, roundDuration, restDuration) => {
  return (roundDuration * rounds) + (restDuration * Math.max(0, rounds - 1));
};

/**
 * Convert slider value to round duration
 * @param {number} sliderValue - The slider value
 * @returns {number} - Round duration in seconds
 */
export const sliderToRoundDuration = (sliderValue) => {
  if (sliderValue === 1.5) {
    return 45;
  } else {
    return Math.round(sliderValue) * 30;
  }
};

/**
 * Convert round duration to slider value
 * @param {number} duration - Round duration in seconds
 * @returns {number} - Slider value
 */
export const roundDurationToSlider = (duration) => {
  if (duration === 45) {
    return 1.5;
  } else {
    return duration / 30;
  }
};

/**
 * Convert slider value to rest duration
 * @param {number} sliderValue - The slider value
 * @returns {number} - Rest duration in seconds
 */
export const sliderToRestDuration = (sliderValue) => {
  if (sliderValue === 1) {
    return 10;
  } else if (sliderValue <= 4) {
    // 0:15 to 1:00 in 15-second increments
    return (sliderValue - 1) * 15;
  } else {
    // 1:30 to 5:00 in 30-second increments
    return 60 + (sliderValue - 4) * 30;
  }
};

/**
 * Convert rest duration to slider value
 * @param {number} duration - Rest duration in seconds
 * @returns {number} - Slider value
 */
export const restDurationToSlider = (duration) => {
  if (duration === 10) {
    return 1;
  } else if (duration <= 60) {
    return Math.round(duration / 15) + 1;
  } else {
    return 4 + (duration - 60) / 30;
  }
}; 