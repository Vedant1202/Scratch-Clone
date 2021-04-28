/**
 * Get adjusted height for aligning components to border
 * @param {Number} [width] actual x of component
 * @param {Number} [height] actual y of component
 * @param {Number} [widthpercent] value for percentage width of main component
 * @param {Number} [elementWidth] width of component
 * @param {Number} [elementHeight] height of component
 * @param {Number} [heightOffset] offset for height
 * @param {Number} [widthOffset] offset for width
 * @returns {Object} adjusted height and width
 */
const getAdjustedHeightAndWidth = (
  height,
  width,
  widthpercent,
  elementWidth,
  elementHeight,
  heightOffset = 10,
  widthOffset = 16
) => {
  let newWidth = width;
  let newHeight = height;
  if (width >= Math.floor((window.innerWidth * widthpercent) / 100) - elementWidth) {
    newWidth = Math.floor((window.innerWidth * widthpercent) / 100) - elementWidth - widthOffset;
  }
  if (height > Math.floor(window.innerHeight) - elementHeight - heightOffset) {
    newHeight = Math.floor(window.innerHeight) - elementHeight;
  }

  return { newHeight, newWidth };
};

/**
 * Check if mulitple inputs present in a div
 * @param {String} [type] type of component
 * @returns {Boolean} represents existence of multiple input fields
 */
const checkIfDualInputsPresent = (type) => {
  if (type === 'motion-3') {
    return true;
  }
  return false;
};

export { getAdjustedHeightAndWidth, checkIfDualInputsPresent };
