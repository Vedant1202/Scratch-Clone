import React from 'react';
import Icon from '../Icon/Icon.component';
import { connect } from 'react-redux';

import { selectCurrentEvent } from '../../redux/events/events.selector';
import { createStructuredSelector } from 'reselect';

/**
 * Component for Side bar .
 *
 * @component
 * @example
 * const drag = () => {}
 * const drop = () => {}
 * const dragover = () => {}
 * return (
 *   <Sidebar dragHandler={drag} dropHandler={drop} dragoverHandler={dragover} />
 * )
 */
function Sidebar({ dragHandler, dropHandler }) {
  return (
    <div
      className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
      onDrop={dropHandler}
      onDragOver={() => {}}
    >
      <div className="font-bold"> {'Events'} </div>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'event-0')}
      >
        {'When '}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {'clicked'}
      </div>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'event-1')}
      >
        {'When'}
        <select
          defaultValue={'space'}
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
      </div>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'event-2')}
      >
        {'When Sprite clicked'}
      </div>
      <div className="font-bold"> {'Motion'} </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-0')}
      >
        Move
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
        steps
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-1')}
      >
        Turn
        <Icon name="undo" size={15} className="text-white mx-2" />
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
        degrees
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-2')}
      >
        Turn
        <Icon name="redo" size={15} className="text-white mx-2" />
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
        degrees
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-3')}
      >
        Go to x:
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
        y:
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-4')}
      >
        Point at direction
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-5')}
      >
        Change X by
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
      </div>

      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-6')}
      >
        Set X to
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-7')}
      >
        Change Y by
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
      </div>

      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'motion-8')}
      >
        Set Y to
        <input
          type="number"
          style={{
            marginRight: '4px',
            marginLeft: '4px',
            width: '50px',
            color: '#000',
          }}
          value={10}
          readOnly
        />
      </div>
      <div className="font-bold"> {'Looks'} </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'looks-0')}
      >
        Toggle Say Hello
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable={true}
        onDragStart={(ev) => dragHandler(ev, 'looks-1')}
      >
        Toggle Think Hmmm...
      </div>
    </div>
  );
}

/**
 * Map redux state to component props
 *  @returns {Object<Function>} Object containing functions to retrieve redux state data
 */
const mapStateToProps = createStructuredSelector({
  currentEvent: selectCurrentEvent,
});

export default connect(mapStateToProps)(Sidebar);
