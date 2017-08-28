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
        {this.props.tree.length > 0 ? (
          <div className='element-tree'>
            {this.props.tree.map((e, i) => <ElementTreeItem key={i} element={e} />)}
          </div>
        ) : (
          <p className='empty'>No Elements found! We'll keep looking, just to be sure ;)</p>
        )}
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

  renderElementName () {
    const { element } = this.props;
    return (
      <span>
        <span className='element-class'>{element.class}</span>
        {element.meta && element.meta.name && <span className='element-name'> {element.meta.name}</span>}
      </span>
    );
  }

  renderElement () {
    const { element } = this.props;

    if (element.children.length > 0) {
      return (
        <li className={`tree-element ${this.state.expanded && 'tree-element-expanded'}`}>
          <button className="btn-expand" onClick={() => this.setState({expanded: !this.state.expanded})}>></button>
          {this.state.expanded ? (
            <span>
              <span className='wrap-element'>&lt;{this.renderElementName()}&gt;</span>
              {element.children.map((e, i) => <ElementTreeItem key={i} element={e} />)}
              <span className='wrap-element-close'>&lt;/{this.renderElementName()}&gt;</span>
            </span>
          ) : (
            <span className='wrap-element wrap-element-self-close'>&lt;{this.renderElementName()} /&gt;</span>
          )}
        </li>
      );
    }

    return (
      <li className='tree-element'>
        <span className='wrap-element'>&lt;{this.renderElementName()} /&gt;</span>
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
