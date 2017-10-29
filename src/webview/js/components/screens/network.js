import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import NetworkRequest from 'components/network/network-request';
import NetworkRequestDetails from 'components/network/network-request-details';
import NetworkRequestTimeline from 'components/network/network-request-timeline';

const mapStateToProps = state => {
  return {
    requests: state.network.requests
  };
};

@connect(mapStateToProps)
export default class Network extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      selected: null
    };
  }

  render () {
    const { requests } = this.props;
    const { selected } = this.state;

    let max = 10000;
    requests.forEach(req => {
      if (req.response.ts && req.response.ts - req.request.ts > max) {
        max = req.response.ts - req.request.ts;
      }
    });

    return (
      <div className="network tab-content-inner">
        <div className="filters" />
        <div className="wrap-panels">
          <div className="panel-list">
            {requests.map((r, i) => (
              <NetworkRequest
                key={i}
                data={r}
                onSelect={() => this.setState({ selected: r })}
                selected={selected === r}
              />
            ))}
          </div>
          {selected ? (
            <div className="panel-details">
              <NetworkRequestDetails
                data={selected}
                onClose={() => this.setState({ selected: null })}
              />
            </div>
          ) : (
            <div className="panel-timelines">
              {requests.map((r, i) => (
                <NetworkRequestTimeline key={i} data={r} max={max} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
