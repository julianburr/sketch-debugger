import React, { Component, PropTypes } from 'react';
import LogValue from './value';

export default class LogArray extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      collapsed: true
    };
  }

  render () {
    return (
      <span className={`log-array ${!this.state.collapsed ? 'expanded' : ''}`}>
        <button 
          onClick={() => this.setState({collapsed: !this.state.collapsed})}
          className='button-toggle'
        >&gt;</button>
        <span className='log-value-type'>Array</span>
        {!this.state.collapsed ? (
          <ul>
            {this.props.array.map((value, key) => {
              return (
                <li key={key}>
                  <span className='log-key'>{key}</span>
                  <span className='log-colon'>: </span>
                  <span className='log-value'>
                    <LogValue value={value} />
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <span className='log-value-length'>[{this.props.array.length}]</span>
        )}
      </span>
    );
  }
}