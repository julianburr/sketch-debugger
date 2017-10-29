import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Action from 'components/actions/action';
import ActionTimeline from 'components/actions/action-timeline';
import ActionDetails from 'components/actions/action-details';

const mapStateToProps = state => {
  return {
    actions: state.actions.actions
  };
};

@connect(mapStateToProps)
export default class Actions extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      selected: null
    };
  }

  render () {
    const { actions } = this.props;
    const { selected } = this.state;

    let combinedActions = actions.map(a => ({ ...a }));
    let actionCounts = {};

    let i = 0;
    while (combinedActions[i]) {
      const action = combinedActions[i];
      if (action.name.endsWith('.start')) {
        const actionBase = action.name.substr(0, action.name.length - 6);
        const finishIndex = combinedActions.findIndex(
          (a, index) => a.name === `${actionBase}.finish` && index > i
        );
        if (finishIndex === -1) {
          combinedActions[i].duration = null;
        } else {
          combinedActions[i].name = actionBase;
          combinedActions[i].duration =
            combinedActions[finishIndex].ts - action.ts;
          combinedActions[i].finish = { ...combinedActions[finishIndex] };
          delete combinedActions[finishIndex];
        }
      }
      if (!actionCounts[combinedActions[i].name]) {
        actionCounts[combinedActions[i].name] = 1;
      } else {
        actionCounts[combinedActions[i].name]++;
      }
      combinedActions[i].count = actionCounts[combinedActions[i].name];
      i++;
    }

    return (
      <div className="actions tab-content-inner">
        <div className="filters" />
        <div className="wrap-panels">
          <div className="panel-list">
            {combinedActions.map((action, i) => (
              <Action
                key={i}
                data={action}
                onSelect={() => this.setState({ selected: action })}
                selected={selected === action}
              />
            ))}
          </div>
          {selected ? (
            <div className="panel-details">
              <ActionDetails
                data={selected}
                onClose={() => this.setState({ selected: null })}
              />
            </div>
          ) : (
            <div className="panel-timelines">
              {combinedActions.map((action, i) => (
                <ActionTimeline key={i} data={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
