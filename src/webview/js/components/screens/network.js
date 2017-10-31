import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  clearRequests,
  setSearch,
  setSearchOpen,
  setShowTimes
} from 'actions/network';
import NetworkRequest from 'components/network/network-request';
import NetworkRequestDetails from 'components/network/network-request-details';
import NetworkRequestTimeline from 'components/network/network-request-timeline';

const mapStateToProps = state => {
  return {
    requests: state.network.requests,
    search: state.network.search,
    searchOpen: state.network.searchOpen,
    showTimes: state.network.showTimes
  };
};

const mapDispatchToProps = dispatch => ({
  clearRequests: () => dispatch(clearRequests()),
  setSearch: search => dispatch(setSearch(search)),
  setSearchOpen: open => dispatch(setSearchOpen(open)),
  setShowTimes: show => dispatch(setShowTimes(show))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Network extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      selected: null
    };
    this._refs = {};
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
        <div className="filters">
          <div className="filters-inner">
            <div className="filter search">
              <button
                className={`filter-button ${this.props.searchOpen && 'active'}`}
                onClick={() => {
                  this._refs.searchInput.focus();
                  this.props.setSearchOpen(!this.props.searchOpen);
                }}
              >
                <span className="icon icon-search" />
                <span
                  className={`indicator ${this.props.search && 'active'}`}
                />
              </button>
              <div
                className={`search-panel ${this.props.searchOpen && 'active'}`}
              >
                <input
                  ref={c => (this._refs.searchInput = c)}
                  type="text"
                  placeholder="Type search..."
                  onChange={e => this.props.setSearch(e.target.value)}
                  value={this.props.search}
                />
                <button
                  className={`clear-search ${this.props.search && 'visible'}`}
                  onClick={() => {
                    this.props.setSearch('');
                    this._refs.searchInput.focus();
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="filter show-log-times">
              <button
                className={`filter-button ${this.props.showLogTimes &&
                  'active'}`}
                onClick={() => this.props.setShowTimes(!this.props.showTimes)}
              >
                <span className="icon icon-schedule" />
              </button>
            </div>
            <div className="filter clear-list">
              <button
                className="filter-button"
                onClick={() => this.props.clearRequests()}
              >
                <span className="icon icon-delete_sweep" />
              </button>
            </div>
          </div>
        </div>
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
