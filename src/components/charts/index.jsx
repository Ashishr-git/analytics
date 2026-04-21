import React, { useState, useEffect, useRef } from 'react';
import './Charts.css';

/* ══════════════════════════════════════════════════
   SPARKLINE
   ══════════════════════════════════════════════════ */
export function Sparkline({ data, color = 'var(--accent-cyan)', height = 36, width = 110 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const gradId = `spark-${Math.random().toString(36).substr(2, 6)}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="sparkline-wrapper">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradId})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * (height - 6) - 3}
        r="3" fill={color} />
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   ANIMATED NUMBER
   ══════════════════════════════════════════════════ */
export function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  const formatted = display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return <span>{prefix}{formatted}{suffix}</span>;
}

/* ══════════════════════════════════════════════════
   DONUT CHART
   ══════════════════════════════════════════════════ */
export function DonutChart({ data, size = 200, centerLabel, centerValue }) {
  const [hovered, setHovered] = useState(null);
  const cx = size / 2, cy = size / 2, radius = size * 0.36, stroke = size * 0.11;
  let cumulative = 0;
  const total = data.reduce((s, d) => s + (d.value || d.count || d.amount || d.pct || 0), 0);

  const arcs = data.map((d) => {
    const val = d.value || d.count || d.amount || d.pct || 0;
    const pct = val / total;
    const startAngle = cumulative * 360;
    cumulative += pct;
    const endAngle = cumulative * 360;
    return { ...d, startAngle, endAngle, pct, val };
  });

  const polarToCart = (angle, r) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div className="donut-wrapper">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((arc, i) => {
          if (arc.pct === 0) return null;
          const gap = 0.005;
          const s = polarToCart(arc.startAngle + gap * 360, radius);
          const e = polarToCart(arc.endAngle - gap * 360, radius);
          const large = arc.pct > 0.5 ? 1 : 0;
          const d = `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
          const isHovered = hovered === i;
          return (
            <path key={i} d={d} fill="none" stroke={arc.color}
              strokeWidth={isHovered ? stroke + 6 : stroke} strokeLinecap="round"
              opacity={hovered !== null && !isHovered ? 0.25 : 1}
              style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--text-primary)" fontSize="1.3rem" fontWeight="700">
          {hovered !== null ? `${arcs[hovered].pct.toFixed(0) === '0' ? '<1' : (arcs[hovered].pct * 100).toFixed(0)}%` : (centerValue || '')}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="0.65rem">
          {hovered !== null ? (arcs[hovered].name || arcs[hovered].zone || arcs[hovered].agent || arcs[hovered].category || '') : (centerLabel || '')}
        </text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   BAR CHART
   ══════════════════════════════════════════════════ */
export function BarChart({ data, dataKey, labelKey = 'month', color = 'var(--accent-cyan)', secondaryKey, secondaryColor = 'var(--accent-purple)', height = 200 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const vals = data.map(d => d[dataKey]);
  const secondVals = secondaryKey ? data.map(d => d[secondaryKey]) : [];
  const maxVal = Math.max(...vals, ...(secondVals.length ? secondVals : [0]));
  const barW = secondaryKey ? 14 : 24;
  const gap = secondaryKey ? 4 : 0;
  const groupW = secondaryKey ? (barW * 2 + gap + 16) : (barW + 16);
  const chartW = data.length * groupW;

  return (
    <div className="chart-container">
      <svg width="100%" height={height + 30} viewBox={`0 0 ${chartW} ${height + 30}`} preserveAspectRatio="xMidYMid meet">
        {[0.25, 0.5, 0.75].map((pct, i) => (
          <line key={i} x1="0" x2={chartW} y1={height * (1 - pct)} y2={height * (1 - pct)}
            stroke="var(--border-subtle)" strokeDasharray="3 3" />
        ))}
        {data.map((d, i) => {
          const x = i * groupW + 8;
          const h = (d[dataKey] / maxVal) * height;
          const isHov = hoveredIdx === i;
          return (
            <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={height - h} width={barW} height={h} rx="4"
                fill={isHov ? color : `${color}66`}
                style={{ transition: 'all 0.3s ease' }} />
              {secondaryKey && (
                <rect x={x + barW + gap} y={height - (d[secondaryKey] / maxVal) * height}
                  width={barW} height={(d[secondaryKey] / maxVal) * height} rx="4"
                  fill={isHov ? secondaryColor : `${secondaryColor}66`}
                  style={{ transition: 'all 0.3s ease' }} />
              )}
              <text x={x + (secondaryKey ? barW + gap / 2 : barW / 2)} y={height + 18}
                textAnchor="middle" fill={isHov ? 'var(--text-primary)' : 'var(--text-muted)'}
                fontSize="9" style={{ transition: 'fill 0.3s ease' }}>
                {d[labelKey]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   LINE CHART
   ══════════════════════════════════════════════════ */
export function LineChart({ data, lines, labelKey = 'month', height = 200 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const padding = { left: 40, right: 20, top: 10, bottom: 30 };
  const chartW = Math.max(data.length * 60, 400);
  const innerW = chartW - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const allVals = lines.flatMap(l => data.map(d => d[l.key]));
  const maxVal = Math.max(...allVals);
  const minVal = Math.min(...allVals) * 0.9;
  const range = maxVal - minVal || 1;

  const getX = (i) => padding.left + (i / (data.length - 1)) * innerW;
  const getY = (val) => padding.top + innerH - ((val - minVal) / range) * innerH;

  return (
    <div className="chart-container">
      <svg width="100%" height={height} viewBox={`0 0 ${chartW} ${height}`} preserveAspectRatio="xMidYMid meet">
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padding.top + innerH * (1 - pct);
          const val = minVal + range * pct;
          return (
            <g key={i}>
              <line x1={padding.left} x2={chartW - padding.right} y1={y} y2={y}
                stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <text x={padding.left - 6} y={y + 3} textAnchor="end" fill="var(--text-muted)" fontSize="8">
                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(val < 10 ? 1 : 0)}
              </text>
            </g>
          );
        })}
        {lines.map((line) => {
          const points = data.map((d, i) => `${getX(i)},${getY(d[line.key])}`).join(' ');
          const gradId = `line-grad-${line.key}`;
          const areaPoints = `${getX(0)},${padding.top + innerH} ${points} ${getX(data.length - 1)},${padding.top + innerH}`;
          return (
            <g key={line.key}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={line.color} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={line.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={areaPoints} fill={`url(#${gradId})`} />
              <polyline points={points} fill="none" stroke={line.color} strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
        {data.map((d, i) => (
          <g key={i}>
            <line x1={getX(i)} x2={getX(i)} y1={padding.top} y2={padding.top + innerH}
              stroke={hoveredIdx === i ? 'rgba(255,255,255,0.1)' : 'transparent'} strokeWidth="1" />
            <text x={getX(i)} y={height - 6} textAnchor="middle"
              fill={hoveredIdx === i ? 'var(--text-primary)' : 'var(--text-muted)'} fontSize="9">
              {d[labelKey]}
            </text>
            {hoveredIdx === i && lines.map((line) => (
              <circle key={line.key} cx={getX(i)} cy={getY(d[line.key])} r="4"
                fill={line.color} stroke="var(--bg-primary)" strokeWidth="2" />
            ))}
            <rect x={getX(i) - 15} y={padding.top} width="30" height={innerH}
              fill="transparent" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
          </g>
        ))}
      </svg>
      {hoveredIdx !== null && (
        <div className="chart-tooltip" style={{ left: `${(hoveredIdx / (data.length - 1)) * 85 + 5}%`, top: '10px' }}>
          <div className="chart-tooltip-label">{data[hoveredIdx][labelKey]}</div>
          {lines.map((line) => (
            <div key={line.key} style={{ color: line.color, fontSize: '0.8rem' }}>
              {line.label}: <strong>{typeof data[hoveredIdx][line.key] === 'number' && data[hoveredIdx][line.key] % 1 !== 0
                ? data[hoveredIdx][line.key].toFixed(1) : data[hoveredIdx][line.key]?.toLocaleString()}</strong>
            </div>
          ))}
        </div>
      )}
      <div className="chart-legend">
        {lines.map(line => (
          <span key={line.key} className="chart-legend-item">
            <span className="chart-legend-dot" style={{ background: line.color }} />
            {line.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   GAUGE CHART
   ══════════════════════════════════════════════════ */
export function GaugeChart({ value, max = 100, label, color = 'var(--accent-cyan)', size = 120, suffix = '%' }) {
  const [animVal, setAnimVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimVal(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const cx = size / 2, cy = size / 2 + 10;
  const radius = size * 0.38;
  const strokeW = size * 0.09;
  const startAngle = 225;
  const totalAngle = 270;
  const pct = Math.min(animVal / max, 1);
  const endAngle = startAngle - pct * totalAngle;

  const polar = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
  };

  const bgStart = polar(startAngle);
  const bgEnd = polar(startAngle - totalAngle);
  const fillEnd = polar(endAngle);
  const largeArcBg = totalAngle > 180 ? 1 : 0;
  const largeArcFill = pct * totalAngle > 180 ? 1 : 0;

  return (
    <div className="gauge-wrapper">
      <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
        <path d={`M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${largeArcBg} 1 ${bgEnd.x} ${bgEnd.y}`}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeW} strokeLinecap="round" />
        {pct > 0 && (
          <path d={`M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${largeArcFill} 1 ${fillEnd.x} ${fillEnd.y}`}
            fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round"
            style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        )}
        <text x={cx} y={cy - 2} textAnchor="middle" fill="var(--text-primary)" fontSize={size * 0.18} fontWeight="700">
          {value}{suffix}
        </text>
      </svg>
      {label && <span className="gauge-label">{label}</span>}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FUNNEL CHART
   ══════════════════════════════════════════════════ */
export function FunnelChart({ steps }) {
  const maxCount = steps[0]?.count || 1;
  const colors = ['#00f0ff', '#00d4e6', '#00b8cd', '#009cb4', '#00809b', '#006482', '#004869', '#002c50', '#001037'];

  return (
    <div className="funnel-container">
      {steps.map((step, i) => {
        const widthPct = Math.max((step.count / maxCount) * 100, 8);
        const color = colors[Math.min(i, colors.length - 1)];
        const dropoff = i > 0 ? ((1 - step.count / steps[i - 1].count) * 100).toFixed(1) : null;
        return (
          <div key={i} className="funnel-step">
            <span className="funnel-label">{step.name}</span>
            <div className="funnel-bar-track">
              <div className="funnel-bar-fill" style={{ width: `${widthPct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }}>
                {widthPct > 15 ? step.count.toLocaleString() : ''}
              </div>
            </div>
            <span className="funnel-count">{step.count.toLocaleString()}</span>
            <span className="funnel-pct" style={{ color: i === 0 ? 'var(--accent-cyan)' : dropoff > 30 ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
              {i === 0 ? '100%' : `${step.pct}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HEATMAP CHART (Retention Cohort)
   ══════════════════════════════════════════════════ */
export function HeatmapChart({ data, columns, rowKey = 'cohort' }) {
  const allVals = data.flatMap(row => columns.map(col => row[col.key]).filter(v => v != null));
  const maxVal = Math.max(...allVals);
  const minVal = Math.min(...allVals);
  const range = maxVal - minVal || 1;

  const getColor = (val) => {
    if (val == null) return 'rgba(255,255,255,0.02)';
    const norm = (val - minVal) / range;
    const r = Math.round(0 + (0 - 0) * norm);
    const g = Math.round(50 + (240 - 50) * norm);
    const b = Math.round(80 + (255 - 80) * norm);
    return `rgba(${r}, ${g}, ${b}, ${0.2 + norm * 0.6})`;
  };

  return (
    <div>
      <div className="heatmap-header">
        {columns.map(col => <span key={col.key}>{col.label}</span>)}
      </div>
      <div className="heatmap-grid">
        {data.map((row, i) => (
          <div key={i} className="heatmap-row">
            <span className="heatmap-row-label">{row[rowKey]}</span>
            {columns.map(col => (
              <div key={col.key} className="heatmap-cell"
                style={{
                  background: getColor(row[col.key]),
                  color: row[col.key] != null ? (row[col.key] > (maxVal + minVal) / 2 ? '#fff' : 'var(--text-secondary)') : 'transparent',
                }}>
                {row[col.key] != null ? `${row[col.key]}%` : '—'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HORIZONTAL BAR CHART
   ══════════════════════════════════════════════════ */
export function HorizontalBarChart({ data, valueKey, labelKey, color, maxValue }) {
  const max = maxValue || Math.max(...data.map(d => d[valueKey]));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '120px', fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'right', flexShrink: 0 }}>
            {d[labelKey]}
          </span>
          <div style={{ flex: 1, height: '22px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${(d[valueKey] / max) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${d.color || color || 'var(--accent-cyan)'}, ${d.color || color || 'var(--accent-cyan)'}88)`,
              borderRadius: '6px',
              transition: 'width 0.6s ease',
            }} />
          </div>
          <span style={{ width: '60px', fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
            {typeof d[valueKey] === 'number' ? d[valueKey].toLocaleString() : d[valueKey]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STACKED AREA CHART (Zone History)
   ══════════════════════════════════════════════════ */
export function StackedAreaChart({ data, areas, labelKey = 'month', height = 200 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const padding = { left: 40, right: 10, top: 10, bottom: 30 };
  const chartW = data.length * 60;
  const innerW = chartW - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const getX = (i) => padding.left + (i / (data.length - 1)) * innerW;

  return (
    <div className="chart-container">
      <svg width="100%" height={height} viewBox={`0 0 ${chartW} ${height}`} preserveAspectRatio="xMidYMid meet">
        {areas.slice().reverse().map((area, areaIdx) => {
          const points = data.map((d, i) => {
            const total = areas.reduce((sum, a) => sum + d[a.key], 0);
            const below = areas.slice(0, areas.length - 1 - areaIdx).reduce((sum, a) => sum + d[a.key], 0);
            const y = padding.top + innerH - ((below + d[areas[areas.length - 1 - areaIdx].key]) / total) * innerH;
            return `${getX(i)},${y}`;
          }).join(' ');
          const basePoints = data.map((d, i) => {
            const total = areas.reduce((sum, a) => sum + d[a.key], 0);
            const below = areas.slice(0, areas.length - 1 - areaIdx).reduce((sum, a) => sum + d[a.key], 0);
            const y = padding.top + innerH - (below / total) * innerH;
            return `${getX(i)},${y}`;
          }).reverse().join(' ');
          return (
            <polygon key={area.key} points={`${points} ${basePoints}`}
              fill={area.color} opacity="0.6" />
          );
        })}
        {data.map((d, i) => (
          <g key={i}>
            <text x={getX(i)} y={height - 6} textAnchor="middle" fill="var(--text-muted)" fontSize="9">
              {d[labelKey]}
            </text>
            <rect x={getX(i) - 15} y={padding.top} width="30" height={innerH}
              fill="transparent" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
            {hoveredIdx === i && (
              <line x1={getX(i)} x2={getX(i)} y1={padding.top} y2={padding.top + innerH}
                stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
            )}
          </g>
        ))}
      </svg>
      {hoveredIdx !== null && (
        <div className="chart-tooltip" style={{ left: `${(hoveredIdx / (data.length - 1)) * 85 + 5}%`, top: '10px' }}>
          <div className="chart-tooltip-label">{data[hoveredIdx][labelKey]}</div>
          {areas.map(area => (
            <div key={area.key} style={{ color: area.color }}>
              {area.label}: <strong>{data[hoveredIdx][area.key].toFixed(1)}%</strong>
            </div>
          ))}
        </div>
      )}
      <div className="chart-legend">
        {areas.map(area => (
          <span key={area.key} className="chart-legend-item">
            <span className="chart-legend-dot" style={{ background: area.color }} />
            {area.label}
          </span>
        ))}
      </div>
    </div>
  );
}
