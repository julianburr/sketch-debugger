import React, { Component, PropTypes } from 'react';

import LogObject from './object';
import LogArray from './array';
import LogString from './string';
import LogNumber from './number';
import LogEmpty from './empty';

export default class Value extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    const { value, logKey } = this.props;
    switch (value.type) {
      case 'Array':
      case 'NSArray':
      case 'NSMutuableArray':
        return <LogArray array={value.value} logKey={logKey} prefix={value.type} />;

      case 'Object':
      case 'NSDictionary':
        return <LogObject object={value.value} logKey={logKey} prefix={value.type} />;

      case 'Number':
        return <LogNumber number={value.value} logKey={logKey} />;

      case 'Empty':
        return <LogEmpty number={value.value} logKey={logKey} />;

      case 'String':
      default:
        return <LogString string={String(value.value)} logKey={logKey} />;
    }
  }
}