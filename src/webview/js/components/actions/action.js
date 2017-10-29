import React, { Component } from 'react';

export default class Action extends Component {
  render () {
    const { data, onSelect, selected } = this.props;
    return (
      <div
        className={`panel-list-item ${selected && 'selected'}`}
        onClick={onSelect}
      >
        <span className="action-name">{data.name}</span>
        <span className="action-count">#{data.count}</span>
      </div>
    );
  }
}
