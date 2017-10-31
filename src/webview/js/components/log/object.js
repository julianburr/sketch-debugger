import React, { Component, PropTypes } from 'react';
import LogValue from './value';
import _ from 'lodash';

export default class LogObject extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    name: PropTypes.string,
    object: PropTypes.object.isRequired
  };

  static defaultProps = {
    prefix: 'Object'
  };

  constructor () {
    super();
    this.state = {
      collapsed: true
    };
  }

  render () {
    const { name, prefix, object } = this.props;
    const { collapsed } = this.state;
    return (
      <span className={`log-object ${!this.state.collapsed ? 'expanded' : ''}`}>
        <button
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}
          className="button-toggle"
        >
          &gt;
        </button>
        {name && (
          <span>
            <span className="log-key">{name}</span>
            <span className="log-colon">: </span>
          </span>
        )}
        <span className="log-value-type">{_.startCase(prefix)}</span>
        {!collapsed ? (
          <ul>
            {Object.keys(object).map(key => {
              return (
                <li key={key}>
                  <LogValue value={object[key]} logKey={key} />
                </li>
              );
            })}
          </ul>
        ) : (
          <span className="log-value-length">
            {'{'}
            {Object.keys(object).length}
            {'}'}
          </span>
        )}
      </span>
    );
  }
}
