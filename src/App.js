import React, { Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar.component';
import MidArea from './components/MidArea/MidArea.component';
import PreviewArea from './components/PreviewArea/PreviewArea.component';
import { connect } from 'react-redux';
import Icon from './components/Icon/Icon.component';
import './styles/style.css';

import { dragStartHandler, dropHandler, dragoverHandler } from './dragdrop/dragdrop.controller';
import { setFlagEventListenerStatus } from './redux/events/events.actions';

/**
 * Component for Main App.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
class App extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Handle flag click event
   */
  handleClick = () => {
    const { setFlagEventListenerStatus } = this.props;
    setFlagEventListenerStatus(true);
    setTimeout(() => {
      setFlagEventListenerStatus(false);
    }, 500);
  };

  render() {
    return (
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row  ">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar dragHandler={dragStartHandler} dropHandler={dropHandler} dragoverHandler={dragoverHandler} />
            <MidArea dragHandler={dragStartHandler} dropHandler={dropHandler} dragoverHandler={dragoverHandler} />
          </div>
          <div
            onClick={this.handleClick}
            style={{
              cursor: 'pointer',
            }}
          >
            <Icon name="flag" size={15} className="text-green-600 mx-2" />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Map redux state to component props
 * @param {Function} dispatch default dispatch function
 *  @returns {Object<Function>} Object containing functions to set redux state data
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setFlagEventListenerStatus: (event) => {
      dispatch(setFlagEventListenerStatus(event));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
