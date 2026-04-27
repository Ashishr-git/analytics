import React from 'react';
import { DEMOGRAPHICS } from '../data/demographicData';

/**
 * DemographicFilter — Pill-based filter bar for slicing data by demographics.
 *
 * Props:
 *   - filters: { age: 'all', income: 'all', gender: 'all' }
 *   - onChange: (newFilters) => void
 */
export default function DemographicFilter({ filters, onChange }) {
  const handleSelect = (dimension, segmentId) => {
    onChange({ ...filters, [dimension]: segmentId });
  };

  const hasActiveFilter = Object.values(filters).some(v => v && v !== 'all');

  return (
    <div className="demo-filter-bar">
      {Object.entries(DEMOGRAPHICS).map(([dimKey, dim], idx) => (
        <React.Fragment key={dimKey}>
          {idx > 0 && <div className="demo-filter-divider" />}
          <div className="demo-filter-group">
            <span className="demo-filter-label">{dim.icon} {dim.label}</span>
            <div className="demo-filter-pills">
              {dim.segments.map(seg => (
                <button
                  key={seg.id}
                  className={`demo-filter-pill ${filters[dimKey] === seg.id ? 'demo-filter-pill--active' : ''}`}
                  onClick={() => handleSelect(dimKey, seg.id)}
                >
                  {seg.label}
                </button>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
      {hasActiveFilter && (
        <>
          <div className="demo-filter-divider" />
          <button
            className="demo-filter-pill"
            onClick={() => onChange({ age: 'all', income: 'all', gender: 'all' })}
            style={{ color: 'var(--accent-red)', borderColor: 'rgba(255,71,87,0.3)' }}
          >
            ✕ Clear Filters
          </button>
        </>
      )}
    </div>
  );
}
