import React, { Component } from 'react';

export default class LogEmpty extends Component {
  render () {
    const { name, value } = this.props;
    return (
      <span className="log-empty">
        {name && (
          <span>
            <span className="log-key">{name}</span>
            <span className="log-colon">: </span>
          </span>
        )}
        <span className="log-value">
          {value === undefined ? (
            'undefined'
          ) : Number.isNan(value) ? (
            'NaN'
          ) : (
            'null'
          )}
        </span>
      </span>
    );
  }
}
