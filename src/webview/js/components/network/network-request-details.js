import React, { Component } from 'react';

export default class NetworkRequestDetails extends Component {
  render () {
    const { data, onClose } = this.props;
    return (
      <div className="wrap-panel-details">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h1>Request</h1>
        <pre>{JSON.stringify(data.request, null, 2)}</pre>

        {data.response.ts && [
          <h1>Response</h1>,
          <pre>{JSON.stringify(data.response, null, 2)}</pre>
        ]}
      </div>
    );
  }
}
