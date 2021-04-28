/**
 * Handle dragover event
 * @param {Object} ev event data
 */
const dragoverHandler = (ev) => {
  sessionStorage.setItem('screenX', ev.screenX);
  sessionStorage.setItem('screenY', ev.screenY);
  sessionStorage.setItem('clientX', ev.clientX);
  sessionStorage.setItem('clientY', ev.clientY);
  ev.preventDefault();
};

/**
 * Handle drag start event
 * @param {Object} ev event data
 * @param {String} type type of element
 */
const dragStartHandler = (ev, type) => {
  sessionStorage.setItem('typeElement', type);
};

/**
 * Handle drop event
 * @param {Object} ev event data
 */
const dropHandler = (ev) => {
  ev.preventDefault();
};

export { dragoverHandler, dragStartHandler, dropHandler };
