import React, { Component, PropTypes } from 'react';
import LogValue from './value';

export default class LogObject extends Component {
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
      <span className={`log-object ${!this.state.collapsed ? 'expanded' : ''}`}>
        <button 
          onClick={() => this.setState({collapsed: !this.state.collapsed})}
          className='button-toggle'
        >&gt;</button>
        {this.props.logKey && (
          <span>
            <span className='log-key'>{this.props.logKey}</span>
            <span className='log-colon'>: </span>
          </span>
        )}
        <span className='log-value-type'>Object</span>
        {!this.state.collapsed ? (
          <ul>
            {Object.keys(this.props.object).map(key => {
              return (
                <li key={key}>
                  <LogValue value={this.props.object[key]} logKey={key} />
                </li>
              );
            })}
          </ul>
        ) : (
          <span className='log-value-length'>{'{'}{Object.keys(this.props.object).length}{'}'}</span>
        )}
      </span>
    );
  }
}