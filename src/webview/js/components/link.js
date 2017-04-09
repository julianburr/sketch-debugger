import React, { Component } from 'react';
import { Link as RRLink } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    pathName: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname
  }
}

@connect(mapStateToProps)
export default class Link extends Component {
  render () {
    const { pathName, to, children, dispatch, ...rest } = this.props;
    return (
      <RRLink {...rest} to={to} className={pathName === to ? 'active' : ''}>
        {children}
      </RRLink>
    );
  }
}