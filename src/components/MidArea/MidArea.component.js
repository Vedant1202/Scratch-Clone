import React, { Component } from 'react';
import Icon from '../Icon/Icon.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  setCurrentEvent,
  setActiveEvent,
  setComponentValues,
  setEventListenerData,
} from '../../redux/events/events.actions';
import { selectCurrentEvent, selectActiveEvent, selectComponentValues } from '../../redux/events/events.selector';

import { getAdjustedHeightAndWidth, checkIfDualInputsPresent } from './MidArea.utils';
import { getChainComponentsData, getMainComponentsData } from './MidArea.controller';
import { dragoverHandler } from '../../dragdrop/dragdrop.controller';

/**
 * Component for Mid Area (dropping activity area).
 *
 * @component
 * @example
 * const drag = () => {}
 * const drop = () => {}
 * const dragover = () => {}
 * return (
 *   <MidArea dragHandler={drag} dropHandler={drop} dragoverHandler={dragover} />
 * )
 */
class MidArea extends Component {
  /**
   * Contructor
   * @param {Object} props props
   */
  constructor(props) {
    super(props);
    this.state = {
      componentsData: [],
      componentChains: [],
      childrenData: {},
      elementId: 0,
      events: {},
      componentValues: {},
      activeEvent: [],
      isRedraggingComponent: false,
      redragId: null,
      eventListenerActive: false,
    };
  }

  /**
   * Retreive child component data
   * @param {String} [type] type of component
   * @param {Number} [key] key of component
   * @param {Number} [width] width of component
   * @param {Number} [height] height of component
   * @param {Number} [x] x coord of component
   * @param {Number} [y] y coord of component
   * @param {Function} [dragoverFn] dragover function
   * @param {Boolean} [isChild=false] check if has children
   */
  getElement = (type, width, height, x, y, key, dragoverFn, isChild = false) => {
    const { childrenData, componentValues } = this.state;
    const children = [];
    if (childrenData && childrenData[key].length > 0) {
      childrenData[key].forEach((child) => {
        children.push(this.getChildElement(child.type, child.width, child.height, child.key, key));
      });
    }

    switch (type) {
      case 'event-0':
        return (
          <div
            className="flex flex-row flex-wrap bg-yellow-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.handleEventListenerChange(ev, key, type);
            }}
          >
            {'When '}
            <Icon name="flag" size={15} className="text-green-600 mx-2" />
            {'clicked'}
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              draggable={true}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'event-1':
        return (
          <div
            className="flex flex-row flex-wrap bg-yellow-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.handleEventListenerChange(ev, key, type);
            }}
          >
            {'When'}
            <select
              onChange={(ev) => {
                this.handleDropdownChange(ev, key);
              }}
              value={componentValues[key]}
              style={{
                color: '#000',
                margin: '0 2px 0 2px',
              }}
            >
              <option value="space">Space</option>
              <option value="control">CTRL</option>
              <option value="shift">Shift</option>
              <option value="m">M</option>
            </select>
            {'clicked'}
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'event-2':
        return (
          <div
            className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.handleEventListenerChange(ev, key, type);
            }}
          >
            {'When Sprite clicked'}
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-0':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Move
            <input
              type="number"
              min={0}
              style={{
                marginRight: '4px',
                marginLeft: '4px',
                width: '50px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            steps
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-1':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Turn
            <Icon name="undo" size={15} className="text-white mx-2" />
            <input
              type="number"
              min={0}
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            degrees
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-2':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Turn
            <Icon name="redo" size={15} className="text-white mx-2" />
            <input
              type="number"
              min={0}
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            degrees
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-3':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Go to X:
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key][0]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key, true, 0);
              }}
            />
            Y:
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key][1]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key, true, 1);
              }}
            />
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-4':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Point in direction
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-5':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Change X by
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-6':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Set X to
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-7':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Change Y by
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'motion-8':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Set Y to
            <input
              type="number"
              style={{
                marginRight: '2px',
                marginLeft: '2px',
                width: '30px',
                color: '#000',
              }}
              value={componentValues[key]}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'looks-0':
        return (
          <div
            className="flex flex-row flex-wrap bg-purple-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Toggle Say Hello
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      case 'looks-1':
        return (
          <div
            className="flex flex-row flex-wrap bg-purple-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'absolute',
              left: x + 'px',
              top: y - 40 + 'px',
              border: 'black solid 2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.activeEventHandler(ev, key);
            }}
          >
            Toggle Think Hmmm...
            {children}
            <div
              className="child-droppable-area"
              style={{
                width: width + 'px',
                height: height + 'px',
                position: 'relative',
                marginTop: '4px',
                top: height / 2 + 'px',
              }}
              onClick={() => {
                // console.log('click');
              }}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={(ev) => {
                this.dropInChain(ev, y, x, key);
              }}
              onDragOver={(ev) => {
                dragoverFn(ev, isChild);
              }}
            ></div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  /**
   * Retreive child component data
   * @param {String} [type] type of component
   * @param {Number} [key] key of component
   * @param {Number} [parentKey] key of parent component
   * @param {Number} [width] width of parent component
   * @param {Number} [height] height of parent component
   */
  getChildElement = (type, width, height, key, parentKey) => {
    const { componentValues } = this.state;

    switch (type) {
      case 'event-0':
        return (
          <div
            className="flex flex-row flex-wrap bg-yellow-500 text-white py-1 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.handleEventListenerChange(ev, parentKey, type);
            }}
          >
            {'When '}
            <Icon name="flag" size={15} className="text-green-600 mx-2" />
            {'clicked'}
          </div>
        );
        break;

      case 'event-1':
        return (
          <div
            className="flex flex-row flex-wrap bg-yellow-500 text-white px-1 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.handleEventListenerChange(ev, parentKey, type);
            }}
          >
            {'When'}
            <select
              onChange={(ev) => {
                this.handleDropdownChange(ev, key);
              }}
              value={componentValues[key]}
              style={{
                color: '#000',
                margin: '0 1px 0 1px',
              }}
            >
              <option value="space">Space</option>
              <option value="control">CTRL</option>
              <option value="shift">Shift</option>
              <option value="m">M</option>
            </select>
            {'clicked'}
          </div>
        );
        break;

      case 'event-2':
        return (
          <div
            className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
            onClick={(ev) => {
              this.handleEventListenerChange(ev, parentKey, type);
            }}
          >
            {'When Sprite clicked'}
          </div>
        );
        break;

      case 'motion-0':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Move
            <input
              type="number"
              min={0}
              style={{
                marginRight: '4px',
                marginLeft: '4px',
                width: '50px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            steps
          </div>
        );
        break;

      case 'motion-1':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Turn
            <Icon name="undo" size={15} className="text-white mx-2" />
            <input
              type="number"
              min={0}
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            degrees
          </div>
        );
        break;

      case 'motion-2':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Turn
            <Icon name="redo" size={15} className="text-white mx-2" />
            <input
              type="number"
              min={0}
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
            degrees
          </div>
        );
        break;

      case 'motion-3':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Go to X:
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key][0]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key, true, 0);
              }}
            />
            Y:
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key][1]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key, true, 1);
              }}
            />
          </div>
        );
        break;

      case 'motion-4':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Point in direction
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
          </div>
        );
        break;

      case 'motion-5':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Change X by
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
          </div>
        );
        break;

      case 'motion-6':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Set X to
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
          </div>
        );
        break;

      case 'motion-7':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Change Y by
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
          </div>
        );
        break;

      case 'motion-8':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Set Y to
            <input
              type="number"
              style={{
                marginRight: '.5px',
                marginLeft: '.5px',
                width: '30px',
                color: '#000',
              }}
              onClick={(ev) => {
                ev.stopPropagation;
              }}
              value={componentValues[key]}
              onChange={(ev) => {
                this.handleElementValueChange(ev, key);
              }}
            />
          </div>
        );
        break;

      case 'looks-0':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Toggle Say Hello
          </div>
        );
        break;

      case 'looks-1':
        return (
          <div
            className="flex flex-row flex-wrap bg-blue-500 text-white py-1 my-2 text-sm cursor-pointer"
            style={{
              textAlign: 'center',
              width: width + 40 + 'px',
              height: height + 'px',
              zIndex: 100,
              position: 'relative',
              top: '1.2rem',
              marginTop: '2px',
            }}
            key={key}
            draggable
            onDragStart={(ev) => {
              this.setState({
                isRedraggingComponent: true,
                redragId: key,
              });
            }}
          >
            Toggle Think Hmmm...
          </div>
        );
        break;

      default:
        break;
    }
  };

  /**
   * Handle event listener change
   * @param {Object} ev event data
   * @param {Number} [eventId] key of event
   * @param {String} [type] type of component
   */
  handleEventListenerChange = (ev, eventId, type) => {
    ev.preventDefault();
    const { events, eventListenerActive } = this.state;
    let eventList = [...events[eventId]];
    const parent = eventList.shift();

    const eventListenerData = {
      type,
      parent,
      events: eventList,
      eventListenerActive: !eventListenerActive,
    };

    this.setState(
      {
        eventListenerActive: !eventListenerActive,
      },
      () => {
        this.props.setEventListenerData(eventListenerData);
      }
    );
  };

  /**
   * Handle the active event
   * @param {Object} ev event data
   * @param {Number} [eventId] key of event
   */
  activeEventHandler = (ev, eventId) => {
    ev.preventDefault();
    const { activeEvent } = this.state;

    this.setState(
      {
        activeEvent: [eventId, ...activeEvent],
      },
      () => {
        this.props.setActiveEvent([eventId, ...activeEvent]);
      }
    );
  };

  /**
   * Handle input field change
   * @param {Object} ev event data
   * @param {Number} [elementId] key of component
   * @param {Number} [position=null] position of element
   * @param {Boolean} [isDual=false] does element contain multiple input fields
   */
  handleElementValueChange = (ev, elemId, isDual = false, position = null) => {
    const { componentValues } = this.state;
    if (isDual) {
      componentValues[elemId][position] = parseInt(ev.target.value);
    } else {
      componentValues[elemId] = parseInt(ev.target.value);
    }

    this.setState(
      {
        componentValues,
      },
      () => {
        this.props.setComponentValues(this.state.componentValues);
      }
    );
    ev.stopPropagation();
  };

  /**
   * Handle dropdown input change
   * @param {Object} ev event data
   * @param {Number} [elementId] key of component
   */
  handleDropdownChange = (ev, elemId) => {
    const { componentValues } = this.state;
    componentValues[elemId] = ev.target.value;
    this.setState(
      {
        componentValues,
      },
      () => {
        this.props.setComponentValues(this.state.componentValues);
      }
    );
    ev.stopPropagation();
  };

  /**
   * Handle drop on MidArea for child components
   * @param {Object} ev event data
   * @param {Number} prevHeight height of parentDiv
   * @param {Number} prevWidth width of parentDiv
   * @param {Number} parentKey key of parent
   * @param {Number} [defaultValue=10] value of component input
   * @param {String} [defaultDropdownValue=space] value of component dropdown
   */
  dropInChain = (ev, prevHeight, prevWidth, parentKey, defaultValue = 10, defaultDropdownValue = 'space') => {
    ev.preventDefault();
    const { componentsData, elementId, isRedraggingComponent, redragId } = this.state;
    let { childrenData, events, componentValues } = this.state;
    const typeElement = sessionStorage.getItem('typeElement');

    ({ childrenData, events, componentValues } = getChainComponentsData(
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
    ));

    this.setState(
      {
        childrenData: JSON.parse(JSON.stringify(childrenData)),
        elementId: elementId + 1,
        events,
        componentValues,
      },
      () => {
        this.props.setCurrentEvent(events);
      }
    );
  };

  /**
   * Handle drop on MidArea for parent components
   * @param {Object} ev event data
   * @param {Number} [defaultValue=10] value of component input
   * @param {String} [defaultDropdownValue=space] value of component dropdown
   */
  drop = (ev, defaultValue = 10, defaultDropdownValue = 'space') => {
    ev.preventDefault();

    const { elementId, isRedraggingComponent, redragId } = this.state;
    let { componentsData, childrenData, events, componentValues } = this.state;
    const ogwidth = sessionStorage.getItem('screenX');
    const ogheight = sessionStorage.getItem('screenY');
    const typeElement = sessionStorage.getItem('typeElement');
    let { newHeight, newWidth } = getAdjustedHeightAndWidth(ogheight, ogwidth, 64, 160, 40);

    ({ componentsData, childrenData, events, componentValues } = getMainComponentsData(
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
    ));

    this.setState(
      {
        componentsData,
        childrenData,
        elementId: elementId + 1,
        componentValues,
        events,
        redragId: null,
        isRedraggingComponent: false,
      },
      () => {
        this.props.setCurrentEvent(events);
      }
    );
  };

  /**
   * Handle dragover event on MidArea
   * @param {Object} ev event data
   */
  dragHandler = (ev) => {
    dragoverHandler(ev);
  };

  /**
   * Render the component
   */
  render() {
    const { componentsData } = this.state;

    const components = [];
    componentsData.forEach((component) => {
      let newElement = this.getElement(
        component.type,
        component.width,
        component.height,
        component.x,
        component.y,
        component.key,
        this.dragHandler
      );
      components.push(newElement);
    });

    return (
      <>
        <div
          className="flex-1 h-full overflow-auto"
          style={{
            zIndex: 0,
          }}
          onDrop={this.drop}
          onClick={() => {
            // console.log('click2');
          }}
          onDragOver={this.dragHandler}
        >
          {/* {'mid area'} */}
        </div>
        {components}
      </>
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
});

/**
 * Map redux state to component props
 * @param {Function} dispatch default dispatch function
 *  @returns {Object<Function>} Object containing functions to set redux state data
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentEvent: (event) => {
      dispatch(setCurrentEvent(event));
    },
    setActiveEvent: (activeEvent) => {
      dispatch(setActiveEvent(activeEvent));
    },
    setComponentValues: (componentValues) => {
      const newComponentValues = JSON.parse(JSON.stringify(componentValues));
      dispatch(setComponentValues(newComponentValues));
    },
    setEventListenerData: (eventListenerData) => {
      dispatch(setEventListenerData(eventListenerData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
