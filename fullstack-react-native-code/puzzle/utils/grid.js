import { Dimensions, PixelRatio } from 'react-native';

export const itemMargin = 4;

export const containerPadding = 6;

/**
 * Calculate the width of the grid, based on screen dimensions.
 *
 * @returns {number} The width of the grid
 */
export function calculateContainerSize() {
  return Dimensions.get('window').width - 20;
}

/**
 * Calculate the size of each item, based on column count
 *
 * @param {number} columns The number of columns
 * @returns {number} The width of the grid
 */
export function calculateItemSize(columns) {
  return PixelRatio.roundToNearestPixel(
    (calculateContainerSize() -
      containerPadding * 2 -
      itemMargin * (columns - 1)) /
      columns,
  );
}

/**
 * Calculate the position of each item
 *
 * @param {number} columns The number of columns
 * @param {number} index The index of the item
 * @returns {{top: number, left: number}} The item's position
 */
export function calculateItemPosition(columns, index) {
  const itemSize = calculateItemSize(columns);

  return {
    top:
      containerPadding + Math.floor(index / columns) * (itemSize + itemMargin),
    left:
      containerPadding + Math.floor(index % columns) * (itemSize + itemMargin),
  };
}
