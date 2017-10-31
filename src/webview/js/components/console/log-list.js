import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import LogValue from 'components/log/value';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

const mapStateToProps = state => {
  return {
    logs: state.console.logs,
    search: state.console.search,
    showTypes: state.console.showTypes,
    showTimes: state.console.showTimes
  };
};

@connect(mapStateToProps)
@autobind
export default class LogList extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      autoScroll: true
    };
    this._refs = {};
  }

  filterLogs () {
    const { logs, showTypes, search } = this.props;
    return logs.filter(l => {
      if (!showTypes.includes(l.type)) {
        return false;
      }
      if (
        search &&
        !l.values.find(
          v =>
            String(v.name).toLowerCase().includes(search.toLowerCase()) ||
            String(v.value).toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });
  }

  handleLogScroll (e) {
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
      if (!this.state.autoScroll) {
        this.setState({ autoScroll: true });
      }
    } else {
      if (this.state.autoScroll) {
        this.setState({ autoScroll: false });
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (
      this.state.autoScroll &&
      prevProps.logs.length !== this.props.logs.length
    ) {
      this._refs.logList.scrollTop = this._refs.logList.scrollHeight;
    }
  }

  render () {
    const { logs, showTimes } = this.props;
    return (
      <div
        className="log-list"
        ref={c => (this._refs.logList = c)}
        onScroll={this.handleLogScroll}
      >
        {logs.length > 0 ? (
          <ul>
            {this.filterLogs().map((log, i) => {
              return (
                <li key={i} className={`log log-${log.type}`}>
                  {showTimes && (
                    <span className="timestamp">
                      {moment(log.ts).format('HH:mm:ss.SSS')}
                    </span>
                  )}
                  <ul className="values">
                    {log.values.map((value, k) => (
                      <li className="value" key={`${i}-${k}`}>
                        <LogValue value={value} />
                      </li>
                    ))}
                  </ul>
                  <span className="file">{log.stack && log.stack[0].file}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="empty-message">
            No logs found, but no worries, we'll keep looking for you :)
          </p>
        )}
      </div>
    );
  }
}
