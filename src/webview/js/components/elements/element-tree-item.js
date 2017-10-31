import React, { Component } from 'react';

export default class ElementTreeItem extends Component {
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
        <span className="element-class">{element.class}</span>
        {element.meta &&
        element.meta.name && (
          <span className="element-name"> {element.meta.name}</span>
        )}
      </span>
    );
  }

  renderElement () {
    const { element } = this.props;
    const { expanded } = this.state;

    if (element.children.length > 0) {
      return (
        <li className={`tree-element ${expanded && 'tree-element-expanded'}`}>
          <button
            className="btn-expand"
            onClick={() => this.setState({ expanded: !expanded })}
          >
            &gt;
          </button>
          <span>
            <span className="wrap-element">
              <span className="wrap-element-open">&lt;</span>
              <span className="wrap-element-name">
                {this.renderElementName()}
              </span>
              {element.props &&
                Object.keys(element.props).map(key => (
                  <span className="wrap-element-prop">
                    {' '}
                    <span className="wrap-element-prop-name">{key}</span>
                    <span className="wrap-element-prop-equal">=</span>
                    <span className="wrap-element-prop-value">
                      {JSON.stringify(element.props[key])}
                    </span>
                  </span>
                ))}
              <span className="wrap-element-close">&gt;</span>
            </span>
            {expanded ? (
              element.children.map((e, i) => (
                <ElementTreeItem key={i} element={e} />
              ))
            ) : (
              <span className="wrap-element-child-cnt">
                [{element.children.length}]
              </span>
            )}
            <span className="wrap-element">
              <span className="wrap-element-open">&lt;</span>
              <span className="wrap-element-slash">/</span>
              <span className="wrap-element-name">
                {this.renderElementName()}
              </span>
              <span className="wrap-element-close">&gt;</span>
            </span>
          </span>
        </li>
      );
    }

    return (
      <li className="tree-element">
        <span className="wrap-element">
          <span className="wrap-element-open">&lt;</span>
          <span className="wrap-element-name">{this.renderElementName()}</span>
          {element.props &&
            Object.keys(element.props).map(key => (
              <span className="wrap-element-prop">
                {' '}
                <span className="wrap-element-prop-name">{key}</span>
                <span className="wrap-element-prop-equal">=</span>
                <span className="wrap-element-prop-value">
                  {JSON.stringify(element.props[key])}
                </span>
              </span>
            ))}
          <span className="wrap-element-slash"> /</span>
          <span className="wrap-element-close">&gt;</span>
        </span>
      </li>
    );
  }

  render () {
    const { element } = this.props;
    return <ul className="element">{this.renderElement()}</ul>;
  }
}
