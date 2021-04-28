import React, { Component } from 'react';

/**
 * Component for Flag Icon .
 *
 * @component
 * @example
 * return (
 *   <Icon name="flag" />
 * )
 */
class Icon extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render the component
   */
  render() {
    const { name, size = 20, className = '' } = this.state;
    return (
      <svg className={`fill-current ${className}`} width={size.toString() + 'px'} height={size.toString() + 'px'}>
        <use xlinkHref={`/icons/solid.svg#${name}`} />
      </svg>
    );
  }
}

export default Icon;
