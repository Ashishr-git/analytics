import React from 'react';
import { AnimatedNumber, Sparkline, DonutChart, LineChart, BarChart, GaugeChart } from '../components/charts';
import MetricTooltip from '../components/MetricTooltip';
import { isFilterActive } from '../data/demographicData';
import { costMetrics } from '../data/agentMetrics';

export default function CostEfficiency({ filters }) {
  const filtered = isFilterActive(filters);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cost & Efficiency</h1>
          <p className="page-subtitle">Token usage, cost trends, budget utilization, and optimization insights</p>
        </div>
      </div>

      {filtered && (
        <div className="demo-filter-system-note">
          <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
          <span><strong>System-level metrics:</strong> Cost & Efficiency metrics do not vary by demographic slice. Displaying overall system data.</span>
        </div>
      )}

      {/* KPIs */}
      <div className="kpi-grid">
        {[
          { label: 'Monthly Cost', metricKey: 'totalCost', value: costMetrics.kpis.totalCost, prefix: '$', suffix: '', icon: '💵', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', spark: costMetrics.monthly.map(m => m.totalCost) },
          { label: 'Cost per Conversation', metricKey: 'costPerConversation', value: costMetrics.kpis.costPerConversation * 100, prefix: '$0.0', suffix: '', icon: '💬', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', spark: costMetrics.monthly.map(m => m.costPerConversation * 100) },
          { label: 'Budget Utilization', metricKey: 'budgetUtilization', value: costMetrics.kpis.budgetUtilization, prefix: '', suffix: '%', icon: '📊', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)' },
          { label: 'Cache Hit Rate', metricKey: 'cacheHitRate', value: costMetrics.kpis.cacheHitRate, prefix: '', suffix: '%', icon: '⚡', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', spark: costMetrics.monthly.map(m => m.cacheHitRate) },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              {kpi.label === 'Cost per Conversation' ? (
                <span>${costMetrics.kpis.costPerConversation.toFixed(3)}</span>
              ) : (
                <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.suffix === '%' ? 1 : 0} />
              )}
            </span>
            {kpi.spark && <div className="kpi-sparkline"><Sparkline data={kpi.spark} color={kpi.color} /></div>}
          </div>
        ))}
      </div>

      <div className="card-grid">
        {/* Cost Trend */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <div>
              <h3 className="card-title">Monthly Cost Trend</h3>
              <p className="card-subtitle">Total spend over 12 months</p>
            </div>
            <span className="card-badge">Budget: ${costMetrics.kpis.monthlyBudget}/mo</span>
          </div>
          <LineChart data={costMetrics.monthly} height={220}
            lines={[
              { key: 'totalCost', label: 'Total Cost ($)', color: '#00f0ff' },
            ]} />
        </div>

        {/* Cost Breakdown */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Cost Breakdown</h3>
          </div>
          <DonutChart data={costMetrics.costBreakdown.map(c => ({ ...c, name: c.category, value: c.cost }))}
            size={180} centerValue={`$${(costMetrics.costBreakdown.reduce((s, c) => s + c.cost, 0) / 1000).toFixed(1)}k`} centerLabel="Total (12mo)" />
          <div style={{ marginTop: '12px' }}>
            {costMetrics.costBreakdown.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.color }} />{c.category}
                </span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: c.color, fontWeight: 600 }}>{c.pct}%</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>${c.cost.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-grid">
        {/* Token Usage by Agent */}
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Token Usage by Agent</h3>
          </div>
          <LineChart data={costMetrics.monthly} height={220}
            lines={[
              { key: 'ragTokens', label: 'RAG Agent', color: '#00f0ff' },
              { key: 'transactionTokens', label: 'Transaction Agent', color: '#ccff00' },
              { key: 'chitchatTokens', label: 'Chit-chat Agent', color: '#bf5af2' },
            ]} />
        </div>

        {/* Efficiency Metrics */}
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Efficiency Metrics</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Cost per User/Mo', metricKey: 'costPerUser', value: `$${costMetrics.kpis.costPerUser}`, target: '< $1.50', met: costMetrics.kpis.costPerUser < 1.5 },
              { label: 'Cost per Resolved', metricKey: 'costPerResolvedQuery', value: `$${costMetrics.kpis.costPerResolvedQuery}`, target: '< $0.08', met: costMetrics.kpis.costPerResolvedQuery < 0.08 },
              { label: 'Model Calls/Query', metricKey: 'modelCallEfficiency', value: costMetrics.kpis.modelCallEfficiency, target: '< 3', met: costMetrics.kpis.modelCallEfficiency < 3 },
              { label: 'Cache Hit Rate', metricKey: 'cacheHitRate', value: `${costMetrics.kpis.cacheHitRate}%`, target: '> 15%', met: costMetrics.kpis.cacheHitRate > 15 },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}><MetricTooltip metricKey={item.metricKey}>{item.label}</MetricTooltip></div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '0.65rem', color: item.met ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {item.met ? '✓' : '✗'} Target: {item.target}
                </div>
              </div>
            ))}
          </div>

          {/* Budget Gauge */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <GaugeChart value={costMetrics.kpis.budgetUtilization} label="Budget Utilization" color="#00f0ff" size={160} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '8px', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Spent: <strong style={{ color: '#00f0ff' }}>${costMetrics.kpis.totalCost}</strong></span>
              <span style={{ color: 'var(--text-muted)' }}>Budget: <strong>${costMetrics.kpis.monthlyBudget}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Efficiency Trend */}
      <div className="card-grid">
        <div className="card card-full glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <div>
              <h3 className="card-title">Cost Efficiency Over Time</h3>
              <p className="card-subtitle">Cost per conversation and model call efficiency trends</p>
            </div>
          </div>
          <LineChart data={costMetrics.monthly} height={200}
            lines={[
              { key: 'cacheHitRate', label: 'Cache Hit Rate %', color: '#6bcb77' },
              { key: 'modelCallEfficiency', label: 'Calls per Query', color: '#ff8e53' },
            ]} />
        </div>
      </div>
    </div>
  );
}
