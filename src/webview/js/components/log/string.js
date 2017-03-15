import React, { Component } from 'react';

export default class LogString extends Component {
  render () {
    return (
      <span className='log-string'>
        {this.props.logKey && (
          <span>
            <span className='log-key'>{this.props.logKey}</span>
            <span className='log-colon'>: </span>
          </span>
        )}
        <span className='log-value'>
          {JSON.stringify(this.props.string)}
        </span>
      </span>
    );
  }
}