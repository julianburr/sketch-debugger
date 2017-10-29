import React, { Component, PropTypes } from 'react';

import LogObject from './object';
import LogArray from './array';
import LogString from './string';
import LogNumber from './number';
import LogClass from './class';
import LogEmpty from './empty';

export default class Value extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    const { value } = this.props;
    switch (value.type) {
      case 'array':
        return (
          <LogArray array={value.value} name={value.name} prefix={value.type} />
        );

      case 'object':
        return (
          <LogObject
            object={value.value}
            name={value.name}
            prefix={value.type}
          />
        );

      case 'number':
        return <LogNumber number={value.value} name={value.name} />;

      case 'empty':
        return <LogEmpty number={value.value} name={value.name} />;

      case 'class':
        return <LogClass value={value.value} name={value.name} />;

      case 'string':
      default:
        return <LogString string={String(value.value)} name={value.name} />;
    }
  }
}
