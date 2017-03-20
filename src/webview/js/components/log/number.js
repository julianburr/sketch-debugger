import React, { Component } from 'react';

export default class LogNumber extends Component {
  render () {
    return (
      <span className='log-number'>
        {this.props.logKey && (
          <span>
            <span className='log-key'>{this.props.logKey}</span>
            <span className='log-colon'>: </span>
          </span>
        )}
        <span className='log-value'>
          {Number(this.props.number)}
        </span>
      </span>
    );
  }
}