import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { actionCreators } from 'data/network';
import NetworkRequest from 'components/network/network-request';
import NetworkRequestDetails from 'components/network/network-request-details';
import NetworkRequestTimeline from 'components/network/network-request-timeline';

const mapStateToProps = state => {
  return {
    requests: state.network.requests,
    search: state.network.search,
    showSearch: state.network.showSearch,
    showTimes: state.network.showTimes
  };
};

const mapDispatchToProps = dispatch => ({
  clearRequests: () => dispatch(actionCreators.clearRequests()),
  setSearch: search => dispatch(actionCreators.setSearch({ search })),
  setShowSearch: show => dispatch(actionCreators.setShowSearch({ show })),
  setShowTimes: show => dispatch(actionCreators.setShowTimes({ show }))
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
    let {
      requests,
      search,
      showSearch,
      showTimes,
      setShowTimes,
      setShowSearch
    } = this.props;
    const { selected } = this.state;

    let max = 10000;
    requests.forEach(req => {
      if (req.response.ts && req.response.ts - req.request.ts > max) {
        max = req.response.ts - req.request.ts;
      }
    });

    requests = requests.filter(r => !search || r.request.url.includes(search));

    return (
      <div className="network tab-content-inner">
        <div className="filters">
          <div className="filters-inner">
            <div className="filter search">
              <button
                className={`filter-button ${showSearch && 'active'}`}
                onClick={() => {
                  this._refs.searchInput.focus();
                  setShowSearch(!showSearch);
                }}
              >
                <span className="icon icon-search" />
                <span className={`indicator ${search && 'active'}`} />
              </button>
              <div className={`search-panel ${showSearch && 'active'}`}>
                <input
                  ref={c => (this._refs.searchInput = c)}
                  type="text"
                  placeholder="Type search..."
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                />
                <button
                  className={`clear-search ${search && 'visible'}`}
                  onClick={() => {
                    setSearch('');
                    this._refs.searchInput.focus();
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="filter show-log-times">
              <button
                className={`filter-button ${showTimes && 'active'}`}
                onClick={() => setShowTimes(!showTimes)}
              >
                <span className="icon icon-schedule" />
              </button>
            </div>
            <div className="filter clear-list">
              <button className="filter-button" onClick={() => clearRequests()}>
                <span className="icon icon-delete_sweep" />
              </button>
            </div>
          </div>
        </div>
        {requests.length ? (
          <div className="wrap-panels">
            <div className="panel-list">
              {requests.map((r, i) => (
                <NetworkRequest
                  key={i}
                  data={r}
                  onSelect={() => this.setState({ selected: i })}
                  selected={selected === i}
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
        ) : (
          <div className="wrap-panels">
            <p className="empty-message">No requests found.</p>
          </div>
        )}
      </div>
    );
  }
}
