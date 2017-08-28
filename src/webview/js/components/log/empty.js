import React, { Component } from 'react';

export default class LogEmpty extends Component {
  render () {
    return (
      <span className='log-empty'>
        {this.props.logKey && (
          <span>
            <span className='log-key'>{this.props.logKey}</span>
            <span className='log-colon'>: </span>
          </span>
        )}
        <span className='log-value'>
          {this.props.value === undefined ? 'undefined'
            : Number.isNan(this.props.value) ? 'NaN'
            : 'null'}
        </span>
      </span>
    );
  }
}
