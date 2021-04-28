import { getAngleToTurn, degreesToRadians } from './PreviewArea.utils';

/**
 * Manipulate data for action
 * @param {String} [type] type of action
 * @param {Number} [value] value for action
 * @param {Number} [moveX] previous x coord
 * @param {Number} [moveY] previous y coord
 * @param {Number} [angle] previous angle
 * @param {Number} [rotation] previous rotation
 * @param {Boolean} [visibilitySay] 'say' div visibility status
 * @param {Boolean} [visibilityThink] 'think' div visibility status
 * @returns {Object} updated data
 */
const performEventsFunction = (type, value, moveX, moveY, angle, rotation, visibilitySay, visibilityThink) => {
  switch (type) {
    case 'motion-0':
      let newMoveX = value * Math.cos(degreesToRadians(angle));
      let newMoveY = value * Math.sin(degreesToRadians(angle));

      moveX = moveX + newMoveX;
      moveY = moveY + newMoveY;
      break;

    case 'motion-1':
      angle = angle - parseInt(value);
      rotation = parseInt(value);
      break;

    case 'motion-2':
      angle = angle + parseInt(value);
      rotation = -1 * parseInt(value);
      break;

    case 'motion-3':
      moveX = value[0];
      moveY = value[1];
      break;

    case 'motion-4':
      angle = getAngleToTurn(angle, value);
      rotation = getAngleToTurn(angle, value);
      break;

    case 'motion-5':
      moveX = moveX + value;
      break;

    case 'motion-6':
      moveX = value;
      break;

    case 'motion-7':
      moveY = moveY + value;
      break;

    case 'motion-8':
      moveY = value;
      break;

    case 'looks-0':
      visibilitySay = !visibilitySay;
      visibilityThink = false;
      break;

    case 'looks-1':
      visibilityThink = !visibilityThink;
      visibilitySay = false;
      break;

    default:
      break;
  }

  return {
    angle: parseInt(angle),
    rotation: parseInt(rotation),
    moveX: parseInt(moveX),
    moveY: parseInt(moveY),
    visibilitySay,
    visibilityThink,
  };
};

export { performEventsFunction };
