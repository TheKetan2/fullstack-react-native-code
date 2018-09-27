/**
 * If `number` is less than `min` or greater than `max`, return `min` or `max`
 * respectively. Otherwise, return `number.
 *
 * @param {number} number Value
 * @param {number} min The lower bound
 * @param {number} max The upper bound
 * @returns {number} A number between `min` and `max`, inclusive
 */
export default function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
