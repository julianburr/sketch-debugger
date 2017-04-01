import React, { Component, PropTypes } from 'react';
import LogList from 'components/console/log-list';
import _ from 'lodash';
import { setSearch, setSearchOpen, setTypes, clearLogs, setShowLogTimes } from 'actions/console';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    tree: state.elements.tree
  };
};

@connect(mapStateToProps)
export default class Elements extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    return (
      <div className='elements tab-content-inner'>
        <pre>{JSON.stringify(this.props.tree, null, 2)}</pre>
      </div>
    );
  }
}