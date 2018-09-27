/**
 * Format a number as a string
 *
 * @param {number} number Value
 * @param {boolean} pad Pad this number with a 0 if it's less than 2 digits
 * @returns {string} The formated number
 */
const formatNumber = (number, pad = false) => {
  const numberString = number.toString();

  if (!pad) return numberString;

  return numberString.length < 2 ? `0${numberString}` : numberString;
};

/**
 * Format a number as "hours:minutes:seconds", where the hours and minutes
 * only become visible as necessary.
 *
 * @param {number} elapsed Seconds elapsed
 * @returns {string} The formatted number
 */
export default function formatElapsedTime(elapsed) {
  const seconds = elapsed % 60;
  const minutes = Math.floor((elapsed / 60) % 60);
  const hours = Math.floor(elapsed / 60 / 60);

  const parts = [
    hours > 0 && formatNumber(hours),
    (hours > 0 || minutes > 0) && formatNumber(minutes, hours > 0),
    formatNumber(seconds, hours > 0 || minutes > 0),
  ];

  return parts.filter(x => x !== false).join(':');
}
