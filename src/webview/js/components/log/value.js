import React, { Component, PropTypes } from 'react';
import LogObject from './object';
import LogArray from './array';
import LogString from './string';
import _ from 'lodash';

export default class Value extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    const { value, logKey } = this.props;
    if (_.isArray(value)) {
      return <LogArray array={value} logKey={logKey} />
    } else if (_.isObject(value)) {
      return <LogObject object={value} logKey={logKey} />;
    }
    return <LogString string={String(value)} logKey={logKey} />;
  }
}