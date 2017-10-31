import React, { Component } from 'react';

export default class LogClass extends Component {
  render () {
    const { value, name } = this.props;
    return (
      <span className="log-class">
        <span>
          <span className="log-tag-open">&lt;</span>
          <span className="log-name">{name} </span>
          {value.props &&
            Object.keys(value.props).map(key => (
              <span className="log-prop">
                <span className="log-prop-name">{key}</span>
                <span className="log-prop-equal">=</span>
                <span className="log-prop-value">
                  {JSON.stringify(value.props[key])}
                </span>
              </span>
            ))}
          <span className="log-tag-close">&gt;</span>
        </span>
      </span>
    );
  }
}
