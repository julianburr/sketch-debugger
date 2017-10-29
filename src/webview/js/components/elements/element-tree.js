import React, { Component } from 'react';
import ElementTreeItem from './element-tree-item';

export default class ElementTree extends Component {
  render () {
    const { tree } = this.props;
    return (
      <div className="element-tree">
        {tree.map((element, i) => (
          <ElementTreeItem key={i} element={element} />
        ))}
      </div>
    );
  }
}
