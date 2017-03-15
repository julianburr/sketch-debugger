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
    console.log('pathName', this.props.pathName)
    const { pathName, to, children, dispatch, ...rest } = this.props;
    return (
      <RRLink {...rest} to={to} className={pathName === to ? 'active' : ''}>
        {children}
      </RRLink>
    );
  }
}