import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { actionCreators } from 'data/actions';
import Action from 'components/actions/action';
import ActionTimeline from 'components/actions/action-timeline';
import ActionDetails from 'components/actions/action-details';

const mapStateToProps = state => ({
  actions: state.actions.actions,
  search: state.actions.search,
  showSearch: state.actions.showSearch,
  showTimes: state.actions.showTimes
});

const mapDispatchToProps = dispatch => ({
  clearActions: () => dispatch(actionCreators.clearActions()),
  setSearch: search => dispatch(actionCreators.setSearch({ search })),
  setShowSearch: show => dispatch(actionCreators.setShowSearch({ show })),
  setShowTimes: show => dispatch(actionCreators.setShowTimes({ show }))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Actions extends Component {
  constructor () {
    super();
    this.state = {
      selected: null
    };
    this._refs = {};
  }

  render () {
    const {
      actions,
      showSearch,
      search,
      showTimes,
      setShowTimes,
      setShowSearch,
      setSearch,
      clearActions
    } = this.props;
    const { selected } = this.state;

    return (
      <div className="actions tab-content-inner">
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
              <button className="filter-button" onClick={() => clearActions()}>
                <span className="icon icon-delete_sweep" />
              </button>
            </div>
          </div>
        </div>
        {actions.length ? (
          <div className="wrap-panels">
            <div className="panel-list">
              {actions.map((action, i) => (
                <Action
                  key={i}
                  data={action}
                  onSelect={() => this.setState({ selected: i })}
                  selected={selected === i}
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
                {actions.map((action, i) => (
                  <ActionTimeline key={i} data={action} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="wrap-panels">
            <p className="empty-message">No actions found.</p>
          </div>
        )}
      </div>
    );
  }
}
