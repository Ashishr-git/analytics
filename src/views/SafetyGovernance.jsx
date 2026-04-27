import React from 'react';
import { AnimatedNumber, Sparkline, DonutChart, LineChart, GaugeChart } from '../components/charts';
import MetricTooltip from '../components/MetricTooltip';
import { isFilterActive } from '../data/demographicData';
import { safetyMetrics } from '../data/safetyMetrics';

export default function SafetyGovernance({ filters }) {
  const filtered = isFilterActive(filters);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Safety & Governance</h1>
          <p className="page-subtitle">Guardrails, PII protection, compliance, and incident tracking</p>
        </div>
        <span className="badge badge--green" style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
          🛡️ All Systems Compliant
        </span>
      </div>

      {filtered && (
        <div className="demo-filter-system-note">
          <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
          <span><strong>System-level metrics:</strong> Safety & Governance metrics do not vary by demographic slice. Displaying overall system data.</span>
        </div>
      )}

      {/* KPIs */}
      <div className="kpi-grid">
        {[
          { label: 'Guardrail Trigger Rate', metricKey: 'guardrailTriggerRate', value: safetyMetrics.kpis.guardrailTriggerRate, suffix: '%', icon: '🛡️', color: safetyMetrics.kpis.guardrailTriggerRate < 2 ? '#6bcb77' : '#ffd93d', bg: 'rgba(107,203,119,0.1)', spark: safetyMetrics.monthly.map(m => m.guardrailTriggerRate) },
          { label: 'PII Detection Rate', metricKey: 'piiDetectionRate', value: safetyMetrics.kpis.piiDetectionRate, suffix: '%', icon: '🔒', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', spark: safetyMetrics.monthly.map(m => m.piiDetectionRate) },
          { label: 'Compliance Score', metricKey: 'complianceScore', value: safetyMetrics.kpis.complianceScore, suffix: '%', icon: '✅', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', spark: safetyMetrics.monthly.map(m => m.complianceScore) },
          { label: 'PII Leakage Incidents', metricKey: 'piiLeakageIncidents', value: safetyMetrics.kpis.piiLeakageIncidents, suffix: '', icon: '🚨', color: safetyMetrics.kpis.piiLeakageIncidents === 0 ? '#6bcb77' : '#ff4757', bg: 'rgba(107,203,119,0.1)' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={kpi.suffix === '%' ? 1 : 0} />
            </span>
            {kpi.spark && <div className="kpi-sparkline"><Sparkline data={kpi.spark} color={kpi.color} /></div>}
          </div>
        ))}
      </div>

      <div className="card-grid">
        {/* Safety Trends */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <div>
              <h3 className="card-title">Safety Metrics Trend</h3>
              <p className="card-subtitle">12-month guardrail and detection performance</p>
            </div>
          </div>
          <LineChart data={safetyMetrics.monthly} height={220}
            lines={[
              { key: 'guardrailTriggerRate', label: 'Guardrail Trigger %', color: '#ffd93d' },
              { key: 'promptInjectionDetection', label: 'Injection Detection %', color: '#00f0ff' },
              { key: 'complianceScore', label: 'Compliance %', color: '#6bcb77' },
            ]} />
        </div>

        {/* Guardrail Breakdown */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Guardrail Trigger Breakdown</h3>
          </div>
          <DonutChart data={safetyMetrics.guardrailBreakdown.map(g => ({ ...g, name: g.type, value: g.count }))}
            size={180} centerValue={safetyMetrics.guardrailBreakdown.reduce((s, g) => s + g.count, 0).toLocaleString()} centerLabel="Total Triggers" />
          <div style={{ marginTop: '12px' }}>
            {safetyMetrics.guardrailBreakdown.map((g, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: g.color }} />{g.type}
                </span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: g.color, fontWeight: 600 }}>{g.pct}%</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{g.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gauges Row */}
      <div className="card-grid card-grid--three">
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header"><h3 className="card-title">Safety Gauges</h3></div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <GaugeChart value={safetyMetrics.kpis.piiDetectionRate} label="PII Detection" color="#00f0ff" size={110} />
            <GaugeChart value={safetyMetrics.kpis.promptInjectionDetection} label="Injection Detection" color="#bf5af2" size={110} />
          </div>
        </div>
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header"><h3 className="card-title">Compliance</h3></div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <GaugeChart value={safetyMetrics.kpis.complianceScore} label="Regulatory" color="#6bcb77" size={110} />
            <GaugeChart value={safetyMetrics.kpis.auditCompleteness} label="Audit Trail" color="#ccff00" size={110} />
          </div>
        </div>
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header"><h3 className="card-title">Threat Metrics</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-yellow)' }}>{safetyMetrics.kpis.jailbreakAttempts}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}><MetricTooltip metricKey="jailbreakAttempts">Jailbreak Attempts (30d)</MetricTooltip></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: safetyMetrics.kpis.toxicContentRate < 0.1 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {safetyMetrics.kpis.toxicContentRate}%
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}><MetricTooltip metricKey="toxicContentRate">Toxic Content Rate</MetricTooltip></div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Log */}
      <div className="card-grid">
        <div className="card card-full glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Safety Incidents</h3>
              <p className="card-subtitle">Last 30 days</p>
            </div>
            <span className="card-badge">{safetyMetrics.recentIncidents.length} incidents</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Severity</th>
                <th>Type</th>
                <th>Agent</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {safetyMetrics.recentIncidents.map((inc, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>{inc.id}</td>
                  <td style={{ fontSize: '0.78rem' }}>{inc.date}</td>
                  <td><span className={`severity-${inc.severity}`}>{inc.severity.toUpperCase()}</span></td>
                  <td style={{ fontSize: '0.78rem' }}>{inc.type}</td>
                  <td style={{ fontSize: '0.78rem' }}>{inc.agent}</td>
                  <td style={{ fontSize: '0.78rem', maxWidth: '300px' }}>{inc.description}</td>
                  <td><span className="status-resolved">{inc.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
