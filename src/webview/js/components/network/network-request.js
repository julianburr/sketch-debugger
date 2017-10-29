import React, { Component } from 'react';

export default class NetworkRequest extends Component {
  render () {
    const { data, onSelect, selected } = this.props;
    return (
      <div
        className={`panel-list-item ${selected && 'selected'}`}
        onClick={onSelect}
      >
        <span className="network-request-method">{data.request.method}</span>
        <span className="network-request-label">{data.request.url}</span>
      </div>
    );
  }
}