import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import NetworkRequest from 'components/network/network-request';

const mapStateToProps = state => {
  return {
    requests: state.network.requests
  };
};

@connect(mapStateToProps)
export default class Network extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    return (
      <div className='network tab-content-inner'>
        <div className='filters'></div>
        <div className='network-requests'>
          {this.props.requests.map((r, i) => <NetworkRequest key={i} data={r} />)}
        </div>
      </div>
    );
  }
}
