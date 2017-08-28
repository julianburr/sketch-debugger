import React, { Component, PropTypes } from 'react';

export default class Class extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      selected: false,
      showTab: 'request'
    };
  }

  render () {
    const { data } = this.props;
    const duration = data.finished ? data.finished.diff(data.started) : 0;
    console.log('duration', duration)
    return (
      <div className={`network-request ${this.state.selected ? 'expanded' : ''}`}>
        <div className='request-data' onClick={() => this.setState({selected: !this.state.selected})}>
          <div className='request-label'>{data.request.url || 'undefined'}</div>
          <div className='request-timeline'>
            <span className='bar' style={{width: duration / 40}} />
            {duration && <span className='time'>{duration}ms</span>}
          </div>
        </div>
        <div className='request-details'>
          <div className='request-tab-bar'>
            <a className={this.state.showTab === 'request' ? 'selected' : ''} onClick={() => this.setState({showTab: 'request'})}>Request</a>
            <a className={this.state.showTab === 'response' ? 'selected' : ''} onClick={() => this.setState({showTab: 'response'})}>Response</a>
          </div>
          <div className='request-tab-content'>
            {this.state.showTab === 'request' && <b>Request</b>}
            {this.state.showTab === 'response' && <b>Response</b>}
          </div>
        </div>
      </div>
    );
  }
}