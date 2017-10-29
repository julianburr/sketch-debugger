import React, { Component } from 'react';

export default class LogNumber extends Component {
  render () {
    const { name, number } = this.props;
    return (
      <span className="log-number">
        {name && (
          <span>
            <span className="log-key">{name}</span>
            <span className="log-colon">: </span>
          </span>
        )}
        <span className="log-value">{Number(number)}</span>
      </span>
    );
  }
}
