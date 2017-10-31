import React, { Component } from 'react';

export default class ActionTimeline extends Component {
  render () {
    const { data, index } = this.props;
    return (
      <div className="panel-timeline">
        {data.finish !== undefined ? (
          [
            <span
              className="panel-timeline-bar"
              style={{
                width: `${data.finish.ts
                  ? (data.finish.ts - data.ts) / 500
                  : 0.2}rem`,
                marginLeft: `${index * 0.4}rem`
              }}
            />,
            data.finish.ts ? (
              <span className="panel-timeline-value">
                {(data.finish.ts - data.ts) / 1000}s
              </span>
            ) : (
              <span className="panel-timeline-pending">pending</span>
            )
          ]
        ) : (
          [
            <span
              className="panel-timeline-bar"
              style={{
                width: `.2rem`
              }}
            />,
            <span className="panel-timeline-value">single action</span>
          ]
        )}
      </div>
    );
  }
}
