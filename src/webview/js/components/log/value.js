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
    if (value.type === 'Array') {
      return <LogArray array={value.value} logKey={logKey} />
    }
    if (value.type === 'Object') {
      return <LogObject object={value.value} logKey={logKey} />;
    }
    return <LogString string={String(value.value)} logKey={logKey} />;
  }
}