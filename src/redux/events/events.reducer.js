/** @format */

import { EventActionTypes } from './events.types';

const INITIAL_STATE = {
  currentEvent: null,
  activeEvent: [],
  componentValues: null,
  eventListenerData: null,
  spriteListenerStatus: null,
  flagListenerStatus: null,
};

const eventReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case EventActionTypes.SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: payload,
      };

    case EventActionTypes.SET_ACTIVE_EVENT:
      return {
        ...state,
        activeEvent: payload,
      };

    case EventActionTypes.SET_COMPONENT_VALUES:
      return {
        ...state,
        componentValues: { ...payload },
      };

    case EventActionTypes.SET_EVENT_LISTENER:
      return {
        ...state,
        eventListenerData: { ...payload },
      };

    case EventActionTypes.SET_SPRITE_LISTENER_STATUS:
      return {
        ...state,
        spriteListenerStatus: payload,
      };

    case EventActionTypes.SET_FLAG_LISTENER_STATUS:
      return {
        ...state,
        flagListenerStatus: payload,
      };

    default:
      return state;
  }
};

export default eventReducer;
