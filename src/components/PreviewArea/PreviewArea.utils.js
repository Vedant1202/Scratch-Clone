/**
 * Convert angle to radians
 * @param {Number} [degrees] angle in degrees
 * @returns {Number} angle in radians
 */
const degreesToRadians = (degrees) => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

/**
 * Get required angle to turn by in order to be facing at desired angle
 * @param {Number} [prevAngle] previous angle in degrees
 * @param {Number} [desiredAngle] desired angle in degrees
 * @param {Number} [offset=90] offset angle in degrees
 * @returns {Number} required angle
 */
const getAngleToTurn = (prevAngle, desiredAngle, offset = 90) => {
  return desiredAngle - prevAngle - offset;
};

export { degreesToRadians, getAngleToTurn };
