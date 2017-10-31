import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = state => ({
  showTimes: state.network.showTimes
});

@connect(mapStateToProps)
export default class NetworkRequest extends Component {
  render () {
    const { data, onSelect, selected } = this.props;
    return (
      <div
        className={`panel-list-item ${selected && 'selected'}`}
        onClick={onSelect}
      >
        {this.props.showTimes && (
          <span className="timestamp">
            {moment(data.request.ts).format('HH:mm:ss.SSS')}
          </span>
        )}
        <span className="network-request-method">{data.request.method}</span>
        <span className="network-request-label">{data.request.url}</span>
      </div>
    );
  }
}
