/** @format */

import { EventActionTypes } from './events.types';

const setCurrentEvent = (event) => {
  return {
    type: EventActionTypes.SET_CURRENT_EVENT,
    payload: event,
  };
};

const setActiveEvent = (activeEvent) => {
  return {
    type: EventActionTypes.SET_ACTIVE_EVENT,
    payload: activeEvent,
  };
};

const setComponentValues = (componentValues) => {
  return {
    type: EventActionTypes.SET_COMPONENT_VALUES,
    payload: componentValues,
  };
};

const setEventListenerData = (eventListenerData) => {
  return {
    type: EventActionTypes.SET_EVENT_LISTENER,
    payload: eventListenerData,
  };
};

const setSpriteEventListenerStatus = (status) => {
  return {
    type: EventActionTypes.SET_SPRITE_LISTENER_STATUS,
    payload: status,
  };
};

const setFlagEventListenerStatus = (status) => {
  return {
    type: EventActionTypes.SET_FLAG_LISTENER_STATUS,
    payload: status,
  };
};

export {
  setCurrentEvent,
  setActiveEvent,
  setComponentValues,
  setEventListenerData,
  setSpriteEventListenerStatus,
  setFlagEventListenerStatus,
};
