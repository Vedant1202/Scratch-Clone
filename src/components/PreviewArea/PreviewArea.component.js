import React, { Component } from 'react';
import CatSprite from '../CatSprite/CatSprite.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentEvent,
  selectActiveEvent,
  selectComponentValues,
  selectEventListenerData,
  selectSpriteListenerStatus,
  selectFlagListenerStatus,
} from '../../redux/events/events.selector';

import { performEventsFunction } from './PreviewArea.actions';

/**
 * Component for Preview Area.
 *
 * @component
 * @example
 * return (
 *   <PreviewArea />
 * )
 */
class PreviewArea extends Component {
  /**
   * Contructor
   * @param {Object} props props
   */
  constructor(props) {
    super(props);
    this.state = {
      isEventActive: false,
      events: [],
      activeEvent: [],
      componentValues: [],
      moveX: 0,
      moveY: 0,
      rotation: 0,
      angle: 0,
      visibilitySay: false,
      visibilityThink: false,
      keypressType: null,
      keypressFunction: null,
      eventFired: false,
      eventListenerData: null,
      sprite: null,
    };
  }

  /**
   * @helper
   * Perform event
   * @param {String} [type] type of event
   * @param {Number} [value] value of event
   */
  performEvent = (type, value) => {
    let { moveX, moveY, angle, rotation, visibilitySay, visibilityThink } = this.state;
    ({ moveX, moveY, angle, rotation, visibilitySay, visibilityThink } = performEventsFunction(
      type,
      value,
      moveX,
      moveY,
      angle,
      rotation,
      visibilitySay,
      visibilityThink
    ));

    return {
      angle,
      rotation,
      moveX,
      moveY,
      visibilitySay,
      visibilityThink,
    };
  };

  /**
   * @controller - Preview Area
   * Set keypress event listener
   * @param {Array<Object>} [eventsList] list of events
   * @param {Object} [componentValues] list of values of events
   */
  keypressEventListener = (eventsList, componentValues) => {
    let angle, rotation, moveX, moveY, visibilitySay, visibilityThink;
    eventsList.forEach((event) => {
      switch (event.type.split('-')[0]) {
        case 'looks':
          ({ angle, rotation, moveX, moveY, visibilitySay, visibilityThink } = this.performEvent(event.type, true));
          this.setState({
            angle: parseInt(angle),
            rotation: parseInt(rotation),
            moveX: parseInt(moveX),
            moveY: parseInt(moveY),
            visibilitySay,
            visibilityThink,
          });
          break;

        case 'motion':
          setTimeout(() => {
            if (componentValues) {
              let compValue = componentValues[event.key];
              if (compValue !== undefined) {
                ({ angle, rotation, moveX, moveY, visibilitySay, visibilityThink } = this.performEvent(
                  event.type,
                  compValue
                ));
                this.setState({
                  angle: parseInt(angle),
                  rotation: parseInt(rotation),
                  moveX: parseInt(moveX),
                  moveY: parseInt(moveY),
                  visibilitySay,
                  visibilityThink,
                });
              }
            }
          }, 1000);
          break;

        default:
          break;
      }
    });
  };

  /**
   * Set click event listener
   * @param {Object} [eventListenerData] event listener data
   * @param {Object} [componentValues] list of values of events
   */
  performClickUpdates = (eventListenerData, componentValues) => {
    if (eventListenerData.eventListenerActive) {
      this.keypressEventListener(eventListenerData.events, componentValues);
    }
  };

  /**
   * Update keypress event listener
   * @param {Object} [eventListenerData] event listener data
   * @param {Object} [componentValues] list of values of events
   */
  performKeypressFunctionUpdate = (eventListenerData, componentValues) => {
    if (eventListenerData.eventListenerActive) {
      document.addEventListener(
        'keydown',
        (ev) => {
          if (eventListenerData.parent && componentValues[eventListenerData.parent.key]) {
            switch (componentValues[eventListenerData.parent.key]) {
              case 'space':
                if (ev.key === ' ') {
                  this.keypressEventListener(eventListenerData.events, componentValues);
                }
                break;

              case 'control':
                if (ev.key === 'Control') {
                  this.keypressEventListener(eventListenerData.events, componentValues);
                }
                break;

              case 'shift':
                if (ev.key === 'Shift') {
                  this.keypressEventListener(eventListenerData.events, componentValues);
                }
                break;

              case 'm':
                if (ev.key === 'm') {
                  this.keypressEventListener(eventListenerData.events, componentValues);
                }
                break;

              default:
                break;
            }
          }
        },
        false
      );
    } else {
      document.addEventListener(
        'keydown',
        (ev) => {
          // do nothing
          ev.stopImmediatePropagation();
        },
        false
      );
    }
  };

  /**
   * Perform event updates
   * @param {Object} [currentEvent] current event
   * @param {Array} [activeEvent] active events list
   * @param {Array} [prevActiveEvent] previous active events list
   * @param {Object} [componentValues] list of values of events
   */
  performUpdates = (currentEvent, activeEvent, prevActiveEvent, componentValues) => {
    let angle, rotation, moveX, moveY, visibilitySay, visibilityThink;

    if (activeEvent.length > prevActiveEvent.length) {
      const activeEventKey = activeEvent[0];
      const activeEventsList = currentEvent[activeEventKey];

      if (activeEventsList.length > 0) {
        activeEventsList.forEach((event) => {
          switch (event.type.split('-')[0]) {
            case 'looks':
              ({ angle, rotation, moveX, moveY, visibilitySay, visibilityThink } = this.performEvent(event.type, true));
              this.setState({
                angle: parseInt(angle),
                rotation: parseInt(rotation),
                moveX: parseInt(moveX),
                moveY: parseInt(moveY),
                visibilitySay,
                visibilityThink,
                activeEvent,
              });
              break;

            case 'motion':
              setTimeout(() => {
                if (componentValues) {
                  let compValue = componentValues[event.key];
                  if (compValue !== undefined) {
                    ({ angle, rotation, moveX, moveY, visibilitySay, visibilityThink } = this.performEvent(
                      event.type,
                      compValue
                    ));
                    this.setState({
                      angle: parseInt(angle),
                      rotation: parseInt(rotation),
                      moveX: parseInt(moveX),
                      moveY: parseInt(moveY),
                      visibilitySay,
                      visibilityThink,
                      activeEvent,
                    });
                  }
                }
              }, 1000);
              break;

            default:
              break;
          }
        });
      }
    }
  };

  componentDidUpdate = () => {
    const prevActiveEvent = this.state.activeEvent;
    const {
      currentEvent,
      activeEvent,
      componentValues,
      eventFired,
      eventListenerData,
      spriteListenerStatus,
      flagListenerStatus,
    } = this.props;
    if (eventListenerData) {
      this.performKeypressFunctionUpdate(eventListenerData, componentValues);
    }
    if (spriteListenerStatus && eventListenerData) {
      this.performClickUpdates(eventListenerData, componentValues);
    }
    if (flagListenerStatus && eventListenerData) {
      this.performClickUpdates(eventListenerData, componentValues);
    }
    this.performUpdates(currentEvent, activeEvent, prevActiveEvent, componentValues);
  };

  /**
   * Render the component
   */
  render() {
    const { moveX, moveY, rotation, angle, visibilitySay, visibilityThink } = this.state;

    return (
      <div className="flex-none h-full w-full overflow-y-auto p-2">
        <CatSprite
          moveX={moveX}
          moveY={moveY}
          angle={angle}
          rotation={rotation}
          visibilitySay={visibilitySay}
          visibilityThink={visibilityThink}
        />
      </div>
    );
  }
}

/**
 * Map redux state to component props
 *  @returns {Object<Function>} Object containing functions to retrieve redux state data
 */
const mapStateToProps = createStructuredSelector({
  currentEvent: selectCurrentEvent,
  activeEvent: selectActiveEvent,
  componentValues: selectComponentValues,
  eventListenerData: selectEventListenerData,
  spriteListenerStatus: selectSpriteListenerStatus,
  flagListenerStatus: selectFlagListenerStatus,
});

export default connect(mapStateToProps)(PreviewArea);
