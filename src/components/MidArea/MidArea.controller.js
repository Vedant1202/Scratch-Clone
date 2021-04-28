import { dragoverHandler } from '../../dragdrop/dragdrop.controller';

const { checkIfDualInputsPresent } = require('./MidArea.utils');

/**
 * Retreive child component data
 * @param {Number} [prevWidth] width of parent component
 * @param {Number} [prevHeight] height of parent component
 * @param {Number} [parentKey] key of parent component
 * @param {Number} [defaultValue] value for input field
 * @param {Number} [defaultDropdownValue] value for dropdown
 * @param {Object<Array>} [childrenData] data of its children
 * @param {Object<Array>} [componentsData] data of components
 * @param {Number} [elementId] key of component
 * @param {Object<Array>} [events] array of events
 * @param {Object<Number>} [componentValues] values of inputs in components
 * @param {Boolean} [isRedraggingComponent] if component is re-dragged
 * @param {Number} [redragId] id of redragged component
 * @param {Number} [typeElement] type of component
 * @returns {Object} chain (children) components data
 */
const getChainComponentsData = (
  prevHeight,
  prevWidth,
  parentKey,
  defaultValue,
  defaultDropdownValue,
  childrenData,
  componentsData,
  elementId,
  events,
  componentValues,
  isRedraggingComponent,
  redragId,
  typeElement
) => {
  let newHeight = prevHeight;
  let newWidth = prevWidth;

  if (isRedraggingComponent) {
    let existingComponentIndex = childrenData[parentKey].findIndex((component) => component.key === redragId);
    if (existingComponentIndex !== -1) {
      childrenData[parentKey][existingComponentIndex].y = newHeight;
      childrenData[parentKey][existingComponentIndex].x = newWidth;
    } else {
      existingComponentIndex = componentsData.findIndex((component) => component.key === redragId);
      const removedComponent = componentsData.splice(existingComponentIndex, 1);
      childrenData[parentKey] = [...childrenData[parentKey], removedComponent[0]];
    }
  } else {
    childrenData[parentKey] = [
      ...childrenData[parentKey],
      {
        key: elementId,
        type: typeElement,
        width: 160,
        height: 40,
        x: newWidth,
        y: newHeight,
        dragHandler: dragoverHandler,
      },
    ];
  }

  if (events[parentKey]) {
    events[parentKey].push({ type: typeElement, key: elementId });
  } else {
    events[parentKey] = [{ type: typeElement, key: elementId }];
  }

  if (componentValues[elementId] === undefined) {
    if (checkIfDualInputsPresent(typeElement)) {
      componentValues[elementId] = { 0: defaultValue, 1: defaultValue };
    } else if (typeElement === 'event-1') {
      componentValues[elementId] = defaultDropdownValue;
    } else {
      componentValues[elementId] = defaultValue;
    }
  }

  return {
    events,
    componentValues,
    childrenData,
  };
};

/**
 * Retreive main(parent) component data
 * @param {Number} [defaultValue] value for input field
 * @param {Number} [defaultDropdownValue] value for dropdown
 * @param {Object<Array>} [componentsData] data of components
 * @param {Object<Array>} [childrenData] data of its children
 * @param {Number} [elementId] key of component
 * @param {Object<Array>} [events] array of events
 * @param {Object<Number>} [componentValues] values of inputs in components
 * @param {Boolean} [isRedraggingComponent] if component is re-dragged
 * @param {Number} [redragId] id of redragged component
 * @param {Number} [newHeight] height of component
 * @param {Number} [newWidth] width of component
 * @param {Number} [typeElement] type of component
 * @returns {Object} main (parent) components data
 */
const getMainComponentsData = (
  defaultValue,
  defaultDropdownValue,
  componentsData,
  childrenData,
  elementId,
  events,
  componentValues,
  isRedraggingComponent,
  redragId,
  newHeight,
  newWidth,
  typeElement
) => {
  let updatedComponentsData;

  if (isRedraggingComponent) {
    let existingComponentIndex = componentsData.findIndex((component) => component.key === redragId);
    if (existingComponentIndex !== -1) {
      componentsData[existingComponentIndex].y = newHeight;
      componentsData[existingComponentIndex].x = newWidth;
    } else {
      existingComponentIndex = childrenData.findIndex((component) => component.key === redragId);
      removedComponent = childrenData.splice(existingComponentIndex, 1);
      componentsData.push({
        ...removedComponent[0],
        children: [],
      });
    }
    updatedComponentsData = [...componentsData];
  } else {
    childrenData[elementId] = [];
    if (events[elementId]) {
      events[elementId].push({ type: typeElement, key: elementId });
    } else {
      events[elementId] = [{ type: typeElement, key: elementId }];
    }

    if (componentValues[elementId] === undefined) {
      if (checkIfDualInputsPresent(typeElement)) {
        componentValues[elementId] = { 0: defaultValue, 1: defaultValue };
      } else if (typeElement === 'event-1') {
        componentValues[elementId] = defaultDropdownValue;
      } else {
        componentValues[elementId] = defaultValue;
      }
    }

    updatedComponentsData = [
      {
        key: elementId,
        type: typeElement,
        width: 160,
        height: 40,
        x: newWidth,
        y: newHeight,
        children: [],
        dragHandler: dragoverHandler,
      },
      ...componentsData,
    ];
  }

  return { componentsData: updatedComponentsData, childrenData, componentValues, events };
};

export { getChainComponentsData, getMainComponentsData };
