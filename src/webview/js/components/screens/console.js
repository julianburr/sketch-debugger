import React, { Component, PropTypes } from 'react';
import LogList from 'components/console/log-list';
import _ from 'lodash';
import { setSearch, setSearchOpen, setTypes, clearLogs, setShowLogTimes } from 'actions/console';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    logs: state.console.logs,
    search: state.console.search,
    searchOpen: state.console.searchOpen,
    types: state.console.types,
    showLogTimes: state.console.showLogTimes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearch: search => dispatch(setSearch(search)),
    setSearchOpen: open => dispatch(setSearchOpen(open)),
    setTypes: types => dispatch(setTypes(types)),
    clearLogs: () => dispatch(clearLogs()),
    setShowLogTimes: show => dispatch(setShowLogTimes(show))
  }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Console extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor () {
    super();
    this.state = {
      searchPanelOpen: false,
      searchTerm: ''
    };
    this._refs = {};
  }

  render () {
    return (
      <div className='console tab-content-inner'>
        <div className='filters'>
          <div className='filters-inner'>
            <div className='filter search'>
              <button className={`filter-button ${this.props.searchOpen && 'active'}`} onClick={() => {
                this._refs.searchInput.focus()
                this.props.setSearchOpen(!this.props.searchOpen);
              }}>
                <span className='icon icon-search' />
                <span className={`indicator ${this.props.search && 'active'}`} />
              </button>
              <div className={`search-panel ${this.props.searchOpen && 'active'}`}>
                <input 
                  ref={c => this._refs.searchInput = c} 
                  type='text' 
                  placeholder='Type search...' 
                  onChange={e => this.props.setSearch(e.target.value)}
                  value={this.props.search}
                />
                <button 
                  className={`clear-search ${this.props.search && 'visible'}`}
                  onClick={() => {
                    this.props.setSearch('');
                    this._refs.searchInput.focus();
                  }}
                >&times;</button>
              </div>
            </div>
            <div className='filter log-types'>
              {['default', 'warn', 'error'].map(type => {
                return (
                  <button
                    key={type}
                    onClick={() => {
                      this.props.setTypes({...this.props.types, [type]: !this.props.types[type]});
                    }} 
                    className={`
                      filter-button 
                      type 
                      type-${type} 
                      ${this.props.types[type] && 'active'}
                    `}
                  >k</button>
                );
              })}
            </div>
            <div className='filter show-log-times'>
              <button 
                className={`filter-button ${this.props.showLogTimes && 'active'}`}
                onClick={() => this.props.setShowLogTimes(!this.props.showLogTimes)}
              ><span className='icon icon-schedule' /></button>
            </div>
            <div className='filter clear-console'>
              <button 
                className='filter-button'
                onClick={() => this.props.clearLogs()}
              ><span className='icon icon-delete_sweep' /></button>
            </div>
          </div>
        </div>
        <LogList logs={this.props.logs} />
      </div>
    );
  }
}