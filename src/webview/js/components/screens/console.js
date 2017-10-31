import React, { Component } from 'react';
import LogList from 'components/console/log-list';
import _ from 'lodash';
import { actionCreators } from 'data/console';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    logs: state.console.logs,
    search: state.console.search,
    showSearch: state.console.showSearch,
    showTypes: state.console.showTypes,
    showTimes: state.console.showTimes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearch: search => dispatch(actionCreators.setSearch({ search })),
    setShowSearch: show => dispatch(actionCreators.setShowSearch({ show })),
    setShowTypes: types => dispatch(actionCreators.setShowTypes({ types })),
    clearLogs: () => dispatch(actionCreators.clearLogs()),
    setShowTimes: show => dispatch(actionCreators.setShowTimes({ show }))
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Console extends Component {
  constructor () {
    super();
    this._refs = {};
  }

  render () {
    const {
      showSearch,
      setSearch,
      setShowSearch,
      showTimes,
      showTypes,
      setShowTypes,
      setShowTimes,
      search,
      clearLogs,
      logs
    } = this.props;
    return (
      <div className="console tab-content-inner">
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
            <div className="filter log-types">
              {[ 'default', 'warning', 'error' ].map(type => {
                return (
                  <button
                    key={type}
                    onClick={() => {
                      let newTypes = [ ...showTypes ];
                      if (newTypes.includes(type)) {
                        newTypes.filter(t => t !== type);
                      } else {
                        newTypes.push(type);
                      }
                      setShowTypes({
                        types: newTypes
                      });
                    }}
                    className={`
                      filter-button 
                      type 
                      type-${type} 
                      ${showTypes.includes(type) && 'active'}
                    `}
                  >
                    k
                  </button>
                );
              })}
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
              <button className="filter-button" onClick={() => clearLogs()}>
                <span className="icon icon-delete_sweep" />
              </button>
            </div>
          </div>
        </div>
        <LogList logs={logs} />
      </div>
    );
  }
}
