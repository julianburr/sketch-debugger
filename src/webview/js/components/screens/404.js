import React, { Component, PropTypes } from 'react';

export default class Console extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    return (
      <div>
        <p>Der Inhalt konnte nicht gefunden werden :/</p>
      </div>
    );
  }
}
