import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = state => ({
  showTimes: state.actions.showTimes
});

@connect(mapStateToProps)
export default class Action extends Component {
  render () {
    const { data, onSelect, selected, showTimes } = this.props;
    return (
      <div
        className={`panel-list-item ${selected && 'selected'}`}
        onClick={onSelect}
      >
        {showTimes && (
          <span className="timestamp">
            {moment(data.ts).format('HH:mm:ss.SSS')}
          </span>
        )}
        <span className="action-name">{data.name}</span>
      </div>
    );
  }
}
