/** @format */

const { createSelector } = require('reselect');

const selectEvent = (state) => state.event;

const selectCurrentEvent = createSelector([selectEvent], (event) => event.currentEvent);
const selectActiveEvent = createSelector([selectEvent], (event) => event.activeEvent);
const selectComponentValues = createSelector([selectEvent], (event) => event.componentValues);
const selectEventListenerData = createSelector([selectEvent], (event) => event.eventListenerData);
const selectSpriteListenerStatus = createSelector([selectEvent], (event) => event.spriteListenerStatus);
const selectFlagListenerStatus = createSelector([selectEvent], (event) => event.flagListenerStatus);

export {
  selectCurrentEvent,
  selectActiveEvent,
  selectComponentValues,
  selectEventListenerData,
  selectSpriteListenerStatus,
  selectFlagListenerStatus,
};
