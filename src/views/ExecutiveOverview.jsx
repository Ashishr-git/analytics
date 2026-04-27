import React from 'react';
import { AnimatedNumber, Sparkline, GaugeChart, DonutChart, LineChart } from '../components/charts';
import MetricTooltip from '../components/MetricTooltip';
import DemographicFilter from '../components/DemographicFilter';
import { applyFilter, isFilterActive } from '../data/demographicData';
import { engagement, retention, financialHealth, platformImpact, featureDiscovery } from '../data/productMetrics';
import { systemMetrics, ragMetrics, costMetrics } from '../data/agentMetrics';
import { safetyMetrics } from '../data/safetyMetrics';

export default function ExecutiveOverview({ filters, onFiltersChange }) {
  const f = filters;
  const filtered = isFilterActive(f);

  const NORTH_STAR_KPIS = [
    { label: 'Monthly Active Users', metricKey: 'currentMAU', value: applyFilter(engagement.kpis.currentMAU, 'mau', f), suffix: '', decimals: 0, change: '+12.4%', up: true, icon: '👥', sparkData: engagement.monthly.map(m => applyFilter(m.mau, 'mau', f)), color: '#00f0ff', bgColor: 'rgba(0,240,255,0.1)' },
    { label: 'Feature Adoption Rate', metricKey: 'overallAdoption', value: applyFilter(featureDiscovery.kpis.overallAdoption, 'adoptionRate', f), suffix: '%', decimals: 1, change: '+3.2%', up: true, icon: '🚀', sparkData: engagement.monthly.map(m => applyFilter(m.stickiness, 'stickiness', f)), color: '#ccff00', bgColor: 'rgba(204,255,0,0.1)' },
    { label: 'Green Zone Users', metricKey: 'greenZonePct', value: applyFilter(financialHealth.kpis.greenZonePct, 'greenZone', f), suffix: '%', decimals: 1, change: '+5.8%', up: true, icon: '💚', sparkData: financialHealth.zoneHistory.map(m => applyFilter(m.green, 'greenZone', f)), color: '#6bcb77', bgColor: 'rgba(107,203,119,0.1)' },
    { label: 'Agent Satisfaction', metricKey: 'satisfaction', value: systemMetrics.kpis.satisfaction, suffix: '%', decimals: 1, change: '+2.1%', up: true, icon: '🤖', sparkData: systemMetrics.monthly.map(m => m.satisfaction), color: '#bf5af2', bgColor: 'rgba(191,90,242,0.1)' },
  ];

  const HEALTH_CHECKS = [
    { label: 'Agent Error Rate', metricKey: 'errorRate', value: `${systemMetrics.kpis.errorRate}%`, target: '< 1%', status: systemMetrics.kpis.errorRate < 1 ? 'green' : 'yellow' },
    { label: 'PII Leakage', metricKey: 'piiLeakageIncidents', value: `${safetyMetrics.kpis.piiLeakageIncidents}`, target: '0', status: safetyMetrics.kpis.piiLeakageIncidents === 0 ? 'green' : 'red' },
    { label: 'Hallucination Rate', metricKey: 'hallucinationRate', value: `${ragMetrics.kpis.hallucinationRate}%`, target: '< 5%', status: ragMetrics.kpis.hallucinationRate < 5 ? 'green' : 'yellow' },
    { label: 'Onboarding Completion', metricKey: 'completionRate', value: `${applyFilter(75.4, 'completionRate', f)}%`, target: '> 70%', status: 'green' },
    { label: 'Response Latency P95', metricKey: 'latencyP95', value: `${systemMetrics.kpis.latencyP95}ms`, target: '< 3000ms', status: systemMetrics.kpis.latencyP95 < 3000 ? 'green' : 'yellow' },
    { label: 'Routing Accuracy', metricKey: 'routingAccuracy', value: '93.2%', target: '> 92%', status: 'green' },
    { label: 'Churn Rate', metricKey: 'currentChurnRate', value: `${applyFilter(retention.kpis.currentChurnRate, 'churnRate', f)}%`, target: '< 8%', status: retention.kpis.currentChurnRate < 8 ? 'green' : 'yellow' },
    { label: 'Budget Utilization', metricKey: 'budgetUtilization', value: `${costMetrics.kpis.budgetUtilization}%`, target: '< 90%', status: costMetrics.kpis.budgetUtilization < 90 ? 'green' : 'yellow' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Overview</h1>
          <p className="page-subtitle">North star metrics and system health at a glance</p>
        </div>
      </div>

      <DemographicFilter filters={filters} onChange={onFiltersChange} />

      {/* North Star KPIs */}
      <div className="kpi-grid">
        {NORTH_STAR_KPIS.map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bgColor }}>{kpi.icon}</div>
              <span className={`kpi-change kpi-change--${kpi.up ? 'up' : 'down'}`}>
                {kpi.up ? '↑' : '↓'} {kpi.change}
              </span>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value">
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={kpi.decimals} />
            </span>
            <div className="kpi-sparkline">
              <Sparkline data={kpi.sparkData} color={kpi.color} height={32} width={100} />
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="card-grid">
        {/* System Health */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <div>
              <h3 className="card-title">System Health Monitor</h3>
              <p className="card-subtitle">Real-time status of critical metrics</p>
            </div>
            <span className="badge badge--green">All Systems OK</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {HEALTH_CHECKS.map((check, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.02)', gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`status-dot status-dot--${check.status}`} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <MetricTooltip metricKey={check.metricKey}>{check.label}</MetricTooltip>
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{check.value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>target: {check.target}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gauges */}
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <div>
              <h3 className="card-title">Key Performance Gauges</h3>
              <p className="card-subtitle">Current period vs targets</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', justifyItems: 'center' }}>
            <GaugeChart value={87.4} label="Task Completion" color="#00f0ff" size={130} />
            <GaugeChart value={84.2} label="Agent Satisfaction" color="#bf5af2" size={130} />
            <GaugeChart value={parseFloat(applyFilter(61.5, 'greenZone', f).toFixed(1))} label="Green Zone %" color="#6bcb77" size={130} />
            <GaugeChart value={93.2} label="Routing Accuracy" color="#ccff00" size={130} />
            <GaugeChart value={applyFilter(79, 'd1Retention', f)} label="D1 Retention" color="#ff8e53" size={130} />
            <GaugeChart value={parseFloat(applyFilter(75.4, 'completionRate', f).toFixed(1))} label="Onboarding %" color="#4d96ff" size={130} />
          </div>
        </div>
      </div>

      {/* Financial Zone Distribution + Agent Distribution */}
      <div className="card-grid card-grid--three">
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Financial Zone Distribution</h3>
          </div>
          <DonutChart data={[
            { zone: 'Green', color: '#6bcb77', value: applyFilter(61.5, 'greenZone', f) },
            { zone: 'Yellow', color: '#ffd93d', value: applyFilter(25.0, 'yellowZone', f) },
            { zone: 'Red', color: '#ff4757', value: applyFilter(13.5, 'redZone', f) },
          ]} size={180} centerValue={`${applyFilter(61.5, 'greenZone', f).toFixed(0)}%`} centerLabel="Green Zone" />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            {[
              { zone: 'Green', pct: applyFilter(61.5, 'greenZone', f), color: '#6bcb77' },
              { zone: 'Yellow', pct: applyFilter(25.0, 'yellowZone', f), color: '#ffd93d' },
              { zone: 'Red', pct: applyFilter(13.5, 'redZone', f), color: '#ff4757' },
            ].map((z, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: z.color }}>{z.pct.toFixed(1)}%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{z.zone}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <h3 className="card-title">Agent Utilization</h3>
          </div>
          <DonutChart data={systemMetrics.agentDistribution.map(a => ({ ...a, value: a.pct }))}
            size={180} centerValue={`${systemMetrics.kpis.totalSessions.toLocaleString()}`} centerLabel="Total Sessions" />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            {systemMetrics.agentDistribution.map((a, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: a.color }}>{a.pct}%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.icon} {a.agent.replace(' Agent', '')}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <h3 className="card-title">Monthly Cost</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <GaugeChart value={costMetrics.kpis.budgetUtilization} label="Budget Used" color="#00f0ff" size={150} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>${costMetrics.kpis.totalCost.toLocaleString()}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Total Spend</div>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>${costMetrics.kpis.monthlyBudget.toLocaleString()}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Monthly Budget</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="card-grid">
        <div className="card card-full glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <div>
              <h3 className="card-title">Engagement & Retention Trends</h3>
              <p className="card-subtitle">12-month rolling view</p>
            </div>
          </div>
          <LineChart data={engagement.monthly.map(m => ({
            ...m,
            dau: applyFilter(m.dau, 'dau', f),
            mau: applyFilter(m.mau, 'mau', f),
          }))} height={220}
            lines={[
              { key: 'dau', label: 'DAU', color: '#00f0ff' },
              { key: 'mau', label: 'MAU', color: '#bf5af2' },
            ]} />
        </div>
      </div>
    </div>
  );
}
