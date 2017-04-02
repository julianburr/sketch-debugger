import React, { Component, PropTypes } from 'react';
import LogList from 'components/console/log-list';
import _ from 'lodash';
import { connect } from 'react-redux';

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
        <pre>{JSON.stringify(this.props.requests, null, 2)}</pre>
      </div>
    );
  }
}