import React, { Component } from 'react';

export default class NetworkRequestTimeline extends Component {
  render () {
    const { data, max } = this.props;
    return (
      <div className="panel-timeline">
        {data.response.ts ? (
          [
            <span
              className="panel-timeline-bar"
              style={{
                width: `${(data.response.ts - data.request.ts) / max * 100}%`
              }}
            />,
            <span className="panel-timeline-value">
              {`${(data.response.ts - data.request.ts) / 1000}s`}
            </span>
          ]
        ) : (
          <span className="panel-timeline-pending">pending</span>
        )}
      </div>
    );
  }
}
