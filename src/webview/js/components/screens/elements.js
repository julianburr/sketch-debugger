import React, { Component, PropTypes } from 'react';
import LogList from 'components/console/log-list';
import _ from 'lodash';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    tree: state.elements.tree
  };
};

@connect(mapStateToProps)
export default class Elements extends Component {
  static propTypes = {};
  static defaultProps = {};

  render () {
    return (
      <div className='elements tab-content-inner'>
        <div className='element-tree'>
          {this.props.tree.map(e => <ElementTreeItem element={e} />)}
        </div>
      </div>
    );
  }
}

export class ElementTreeItem extends Component {
  constructor () {
    super();
    this.state = {
      expanded: false
    };
  }

  renderElement () {
    const { element } = this.props;

    if (this.state.expanded) {
      return (
        <li>
          <button className="btn-expand" onClick={() => this.setState({expanded: !this.state.expanded})}>></button>
          <span className='wrap-element'>&lt;{element.class}&gt;</span>
          {element.children.map(e => <ElementTreeItem element={e} />)}
          <span className='wrap-element-close'>&lt;/{element.class}&gt;</span>
        </li>
      );
    }

    if (!this.state.expanded && element.children.length > 0) {
      return (
        <li>
          <button className="btn-expand" onClick={() => this.setState({expanded: !this.state.expanded})}>></button>
          <span className='wrap-element'>&lt;{element.class} /&gt;</span>
        </li>
      );
    }

    return (
      <li>
        <span className='wrap-element'>&lt;{element.class} /&gt;</span>
      </li>
    );
  }

  render () {
    const { element } = this.props;
    return (
      <ul className='element'>
        {this.renderElement()}
      </ul>
    );
  }
}