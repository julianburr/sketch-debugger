import React, { Component, PropTypes } from 'react';
import LogValue from './value';

export default class LogArray extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    array: PropTypes.array.isRequired
  };

  static defaultProps = {
    prefix: 'Array'
  };

  constructor () {
    super();
    this.state = {
      collapsed: true
    };
  }

  render () {
    const { collapsed } = this.state;
    const { name, prefix, array } = this.props;
    return (
      <span className={`log-array ${!collapsed ? 'expanded' : ''}`}>
        <button
          onClick={() => this.setState({ collapsed: !collapsed })}
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
        <span className="log-value-type">{prefix}</span>
        {!collapsed ? (
          <ul>
            {array.map((value, key) => {
              return (
                <li key={key}>
                  <span className="log-key">{key}</span>
                  <span className="log-colon">: </span>
                  <span className="log-value">
                    <LogValue value={value} />
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <span className="log-value-length">[{array.length}]</span>
        )}
      </span>
    );
  }
}
