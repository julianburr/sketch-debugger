import React, { Component } from 'react';

export default class LogString extends Component {
  render () {
    const { name, string } = this.props;
    return (
      <span className="log-string">
        {name && (
          <span>
            <span className="log-key">{name}</span>
            <span className="log-colon">: </span>
          </span>
        )}
        <span className="log-value">{JSON.stringify(string)}</span>
      </span>
    );
  }
}
