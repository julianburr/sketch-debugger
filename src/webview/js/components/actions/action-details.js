import React, { Component } from 'react';

export default class ActionDetails extends Component {
  render () {
    const { data, onClose } = this.props;
    return (
      <div className="wrap-panel-details">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h1>Action</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}
