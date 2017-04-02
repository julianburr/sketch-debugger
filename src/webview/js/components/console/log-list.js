import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import LogValue from 'components/log/value';
import { connect } from 'react-redux';
import { selectValue } from 'actions/console';
import { autobind } from 'core-decorators';

const mapStateToProps = state => {
  return {
    selectedLog: state.console.selectedLog,
    selectedLogValue: state.console.selectedLogValue,
    search: state.console.search,
    types: state.console.types,
    showLogTimes: state.console.showLogTimes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectValue: (key, value) => dispatch(selectValue(key, value))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
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
    return this.props.logs.filter(l => {
      if (!this.props.types[l.type]) {
        return false;
      }
      if (this.props.search && l.values.findIndex(v => String(v).toLowerCase().indexOf(this.props.search.toLowerCase()) > -1) === -1) {
        return false;
      }
      return true;
    })
  }

  handleLogScroll (e) {
    console.log('handle scroll', e, e.target.scrollTop, e.target.scrollHeight - e.target.clientHeight);
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
      if (!this.state.autoScroll) {
        this.setState({autoScroll: true});
      }
    } else {
      if (this.state.autoScroll) {
        this.setState({autoScroll: false});
      }
    }
  }

  componentDidUpdate (prevProps) {
    console.log('this._refs', this._refs)
    if (this.state.autoScroll && prevProps.logs.length !== this.props.logs.length) {
      this._refs.logList.scrollTop = this._refs.logList.scrollHeight;
    }
  }

  render () {
    return (
      <div className='log-list' ref={c => this._refs.logList = c} onScroll={this.handleLogScroll}>
        {this.props.logs.length > 0 ? (
          <ul>
            {this.filterLogs().map((log, i) => {
              return (
                <li key={i} className={`log log-${log.type}`}>
                  {this.props.showLogTimes && (
                    <span className='timestamp'>{moment(log.ts).format('HH:mm:ss.SSS')}</span>
                  )}
                  <ul className='values'>
                    {log.values.map((value, k) => {
                      return (
                        <li 
                          className={`value ${this.props.selectedLog === `${i}-${k}` ? 'selected' : ''}`} 
                          key={`${i}-${k}`}
                          onClick={() => this.props.selectValue(`${i}-${k}`, value)}
                        >
                          <LogValue value={value} />
                        </li>
                      );
                    })}
                  </ul>
                  <span className='file'>{log.stack && log.stack[0].file}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className='nologs'>No logs found, but no worries, we'll keep looking for you :)</p>
        )}
      </div>
    );
  }
}