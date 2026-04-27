import React, { useState, useRef, useEffect } from 'react';
import metricDescriptions from '../data/metricDescriptions';

/**
 * MetricTooltip — Wraps a KPI label and shows a rich description tooltip on hover.
 *
 * Usage:
 *   <MetricTooltip metricKey="ctr">Click-Through Rate</MetricTooltip>
 *
 * Props:
 *   - metricKey: key in metricDescriptions map
 *   - children: the label text to render
 */
export default function MetricTooltip({ metricKey, children }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);
  const desc = metricDescriptions[metricKey];

  if (!desc) {
    return <span>{children}</span>;
  }

  const handleMouseEnter = (e) => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPos({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
    setShow(true);
  };

  return (
    <span
      ref={wrapperRef}
      className="metric-tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <span className="metric-tooltip-icon">ⓘ</span>
      {show && (
        <div
          className="metric-tooltip-popover"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '100%',
          }}
        >
          <div className="metric-tooltip-name">{desc.name}</div>
          <div className="metric-tooltip-desc">{desc.description}</div>
          {desc.formula && (
            <div className="metric-tooltip-formula">
              <span className="metric-tooltip-label-small">Formula:</span> {desc.formula}
            </div>
          )}
          {desc.target && (
            <div className="metric-tooltip-target">
              <span className="metric-tooltip-label-small">Target:</span>{' '}
              <span className="metric-tooltip-target-value">{desc.target}</span>
            </div>
          )}
          <div className="metric-tooltip-arrow" />
        </div>
      )}
    </span>
  );
}
