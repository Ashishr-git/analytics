import React, { useState } from 'react';
import { AnimatedNumber, Sparkline, FunnelChart, HeatmapChart, LineChart, DonutChart, StackedAreaChart } from '../components/charts';
import MetricTooltip from '../components/MetricTooltip';
import DemographicFilter from '../components/DemographicFilter';
import { applyFilter, applyFilterToMonthly, isFilterActive } from '../data/demographicData';
import { featureDiscovery, onboardingFunnel, engagement, retention, financialHealth, platformImpact } from '../data/productMetrics';

export default function ProductAnalytics({ filters, onFiltersChange }) {
  const [activeTab, setActiveTab] = useState('funnel');

  const tabs = [
    { id: 'funnel', label: '🔄 Funnel' },
    { id: 'engagement', label: '📊 Engagement' },
    { id: 'retention', label: '🔁 Retention' },
    { id: 'outcomes', label: '🎯 Outcomes' },
    { id: 'platform', label: '🏦 Platform Impact' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Analytics</h1>
          <p className="page-subtitle">Feature discovery, engagement, retention, and financial outcomes</p>
        </div>
        <div className="filters-bar">
          {tabs.map(tab => (
            <button key={tab.id}
              className={`filter-btn ${activeTab === tab.id ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <DemographicFilter filters={filters} onChange={onFiltersChange} />

      {activeTab === 'funnel' && <FunnelView f={filters} />}
      {activeTab === 'engagement' && <EngagementView f={filters} />}
      {activeTab === 'retention' && <RetentionView f={filters} />}
      {activeTab === 'outcomes' && <OutcomesView f={filters} />}
      {activeTab === 'platform' && <PlatformView f={filters} />}
    </div>
  );
}

function FunnelView({ f }) {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Impression Rate', metricKey: 'impressionRate', value: applyFilter(featureDiscovery.kpis.impressionRate, 'impressions', f), suffix: '%', icon: '👁️', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)' },
          { label: 'Click-Through Rate', metricKey: 'ctr', value: applyFilter(featureDiscovery.kpis.ctr, 'clicks', f), suffix: '%', icon: '👆', color: '#ccff00', bg: 'rgba(204,255,0,0.1)' },
          { label: 'Landing→Enrollment', metricKey: 'landingToEnrollment', value: applyFilter(featureDiscovery.kpis.landingToEnrollment, 'enrollments', f), suffix: '%', icon: '✅', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)' },
          { label: 'Overall Adoption', metricKey: 'overallAdoption', value: applyFilter(featureDiscovery.kpis.overallAdoption, 'adoptionRate', f), suffix: '%', icon: '🚀', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} />
            </span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card card-full glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <div>
              <h3 className="card-title">Conversion Funnel</h3>
              <p className="card-subtitle">From impression to active user</p>
            </div>
            <span className="card-badge">Last 30 days</span>
          </div>
          <FunnelChart steps={onboardingFunnel.steps.map(s => ({ ...s, count: applyFilter(s.count, 'enrollments', f) }))} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <div>
              <h3 className="card-title">CTR & Adoption Trends</h3>
              <p className="card-subtitle">12-month discovery performance</p>
            </div>
          </div>
          <LineChart data={featureDiscovery.monthly} height={200}
            lines={[
              { key: 'ctr', label: 'CTR %', color: '#ccff00' },
              { key: 'adoptionRate', label: 'Adoption %', color: '#bf5af2' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <div>
              <h3 className="card-title">Onboarding KPI Trends</h3>
              <p className="card-subtitle">Monthly onboarding metrics</p>
            </div>
          </div>
          <LineChart data={applyFilterToMonthly(onboardingFunnel.monthly, ['completionRate', 'planAcceptanceRate', 'accountLinkSuccess'], f)} height={200}
            lines={[
              { key: 'completionRate', label: 'Completion %', color: '#00f0ff' },
              { key: 'planAcceptanceRate', label: 'Plan Accept %', color: '#ccff00' },
              { key: 'accountLinkSuccess', label: 'Account Link %', color: '#6bcb77' },
            ]} />
        </div>
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <h3 className="card-title">Channel Effectiveness</h3>
          </div>
          <DonutChart data={featureDiscovery.channelBreakdown.map(c => ({ ...c, name: c.channel, value: c.enrollments }))}
            size={180} centerValue={featureDiscovery.channelBreakdown.reduce((s, c) => s + c.enrollments, 0).toLocaleString()} centerLabel="Enrollments" />
          <div style={{ marginTop: '12px' }}>
            {featureDiscovery.channelBreakdown.map((ch, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: ch.color }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{ch.channel}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>CTR: <strong style={{ color: ch.color }}>{ch.ctr}%</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>{ch.enrollments.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header">
            <h3 className="card-title">Onboarding Performance</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Completion Rate', metricKey: 'completionRate', value: `${applyFilter(onboardingFunnel.kpis.completionRate, 'completionRate', f)}%`, target: '> 70%', ok: true },
              { label: 'Account Link Success', metricKey: 'accountLinkSuccess', value: `${onboardingFunnel.kpis.accountLinkSuccess}%`, target: '> 85%', ok: true },
              { label: 'Time to Complete', metricKey: 'timeToComplete', value: `${onboardingFunnel.kpis.timeToComplete} min`, target: '< 3 min', ok: true },
              { label: 'Plan Acceptance', metricKey: 'planAcceptanceRate', value: `${applyFilter(onboardingFunnel.kpis.planAcceptanceRate, 'planAcceptanceRate', f)}%`, target: '> 55%', ok: true },
              { label: 'Time to First Value', metricKey: 'ttfv', value: `${onboardingFunnel.kpis.ttfv} min`, target: '< 5 min', ok: true },
              { label: 'Retry Rate', metricKey: 'retryRate', value: `${onboardingFunnel.kpis.retryRate}%`, target: 'Monitor', ok: true },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}><MetricTooltip metricKey={item.metricKey}>{item.label}</MetricTooltip></div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '0.65rem', color: item.ok ? 'var(--accent-green)' : 'var(--accent-red)' }}>Target: {item.target} ✓</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function EngagementView({ f }) {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Current DAU', metricKey: 'currentDAU', value: applyFilter(engagement.kpis.currentDAU, 'dau', f), suffix: '', icon: '📈', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', spark: engagement.monthly.map(m => applyFilter(m.dau, 'dau', f)) },
          { label: 'Current MAU', metricKey: 'currentMAU', value: applyFilter(engagement.kpis.currentMAU, 'mau', f), suffix: '', icon: '📊', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', spark: engagement.monthly.map(m => applyFilter(m.mau, 'mau', f)) },
          { label: 'Stickiness (DAU/MAU)', metricKey: 'stickiness', value: applyFilter(engagement.kpis.stickiness, 'stickiness', f), suffix: '%', icon: '🧲', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', spark: engagement.monthly.map(m => applyFilter(m.stickiness, 'stickiness', f)) },
          { label: 'Agent Interaction Rate', metricKey: 'agentInteractionRate', value: applyFilter(engagement.kpis.agentInteractionRate, 'agentInteractionRate', f), suffix: '%', icon: '🤖', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', spark: engagement.monthly.map(m => applyFilter(m.agentInteractionRate, 'agentInteractionRate', f)) },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={kpi.suffix === '%' ? 1 : 0} />
            </span>
            <div className="kpi-sparkline"><Sparkline data={kpi.spark} color={kpi.color} /></div>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card card-full glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">DAU / MAU Trend</h3>
          </div>
          <LineChart data={engagement.monthly.map(m => ({ ...m, dau: applyFilter(m.dau, 'dau', f), mau: applyFilter(m.mau, 'mau', f) }))} height={220}
            lines={[
              { key: 'dau', label: 'DAU', color: '#00f0ff' },
              { key: 'mau', label: 'MAU', color: '#bf5af2' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Feature Usage Distribution</h3>
          </div>
          <DonutChart data={engagement.featureUsage.map(fu => ({ ...fu, name: fu.feature, value: fu.sessions }))}
            size={180} centerValue={engagement.featureUsage.reduce((s, fu) => s + fu.sessions, 0).toLocaleString()} centerLabel="Total Sessions" />
          <div style={{ marginTop: '12px' }}>
            {engagement.featureUsage.map((fu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: fu.color }} />
                  <span style={{ fontSize: '0.82rem' }}>{fu.feature}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
                  <span style={{ color: fu.color, fontWeight: 600 }}>{fu.pct}%</span>
                  <span style={{ color: 'var(--text-muted)' }}>{fu.sessions.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Session Metrics</h3>
          </div>
          <LineChart data={applyFilterToMonthly(engagement.monthly, ['sessionFrequency', 'avgSessionDuration'], f)} height={200}
            lines={[
              { key: 'sessionFrequency', label: 'Sessions/Week', color: '#00f0ff' },
              { key: 'avgSessionDuration', label: 'Avg Duration (min)', color: '#ccff00' },
            ]} />
        </div>
      </div>
    </>
  );
}

function RetentionView({ f }) {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'D1 Retention', metricKey: 'd1Retention', value: applyFilter(retention.kpis.d1Retention, 'd1Retention', f), suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '📅' },
          { label: 'D7 Retention', metricKey: 'd7Retention', value: applyFilter(retention.kpis.d7Retention, 'd7Retention', f), suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '📆' },
          { label: 'D30 Retention', metricKey: 'd30Retention', value: applyFilter(retention.kpis.d30Retention, 'd30Retention', f), suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '🗓️' },
          { label: 'Churn Rate', metricKey: 'currentChurnRate', value: applyFilter(retention.kpis.currentChurnRate, 'churnRate', f), suffix: '%', color: '#ff4757', bg: 'rgba(255,71,87,0.1)', icon: '📉' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} />
            </span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card card-full glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <div>
              <h3 className="card-title">Cohort Retention Heatmap</h3>
              <p className="card-subtitle">Retention % by enrollment cohort</p>
            </div>
          </div>
          <HeatmapChart data={retention.cohortData}
            columns={[
              { key: 'd1', label: 'Day 1' },
              { key: 'd7', label: 'Day 7' },
              { key: 'd14', label: 'Day 14' },
              { key: 'd30', label: 'Day 30' },
              { key: 'd60', label: 'Day 60' },
              { key: 'd90', label: 'Day 90' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title"><MetricTooltip metricKey="currentChurnRate">Churn</MetricTooltip> & <MetricTooltip metricKey="reactivationRate">Reactivation</MetricTooltip></h3>
          </div>
          <LineChart data={applyFilterToMonthly(retention.monthly, ['churnRate', 'reactivationRate'], f)} height={200}
            lines={[
              { key: 'churnRate', label: 'Churn Rate %', color: '#ff4757' },
              { key: 'reactivationRate', label: 'Reactivation %', color: '#6bcb77' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Retention Summary</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'D90 Retention', metricKey: 'd90Retention', value: `${applyFilter(retention.kpis.d90Retention, 'd30Retention', f)}%`, target: '> 18%', met: true },
              { label: 'Reactivation Rate', metricKey: 'reactivationRate', value: `${retention.kpis.reactivationRate}%`, target: '> 12%', met: true },
              { label: 'Avg Time to Churn', metricKey: 'avgTimeToChurn', value: `${retention.kpis.avgTimeToChurn} days`, target: 'Increasing', met: true },
              { label: 'Monthly Churn', metricKey: 'currentChurnRate', value: `${applyFilter(retention.kpis.currentChurnRate, 'churnRate', f)}%`, target: '< 8%', met: retention.kpis.currentChurnRate < 8 },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}><MetricTooltip metricKey={item.metricKey}>{item.label}</MetricTooltip></div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '0.65rem', color: item.met ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {item.met ? '✓' : '✗'} Target: {item.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function OutcomesView({ f }) {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Green Zone Users', metricKey: 'greenZonePct', value: applyFilter(financialHealth.kpis.greenZonePct, 'greenZone', f), suffix: '%', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', icon: '💚', spark: financialHealth.zoneHistory.map(m => applyFilter(m.green, 'greenZone', f)) },
          { label: 'Red→Green Rate', metricKey: 'redToGreenRate', value: financialHealth.kpis.redToGreenRate, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '🔄' },
          { label: 'Overdraft Prevention', metricKey: 'overdraftPrevention', value: applyFilter(financialHealth.kpis.overdraftPrevention, 'overdraftPrevention', f), suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '🛡️', spark: financialHealth.outcomesTrend.map(m => applyFilter(m.overdraftPrevention, 'overdraftPrevention', f)) },
          { label: 'Paycheck Survival', metricKey: 'paycheckSurvival', value: applyFilter(financialHealth.kpis.paycheckSurvival, 'paycheckSurvival', f), suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '✅', spark: financialHealth.outcomesTrend.map(m => applyFilter(m.paycheckSurvival, 'paycheckSurvival', f)) },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} />
            </span>
            {kpi.spark && <div className="kpi-sparkline"><Sparkline data={kpi.spark} color={kpi.color} /></div>}
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Zone Distribution Trend</h3>
            <p className="card-subtitle">12-month financial health trajectory</p>
          </div>
          <StackedAreaChart data={financialHealth.zoneHistory} height={220}
            areas={[
              { key: 'red', label: 'Red Zone', color: '#ff4757' },
              { key: 'yellow', label: 'Yellow Zone', color: '#ffd93d' },
              { key: 'green', label: 'Green Zone', color: '#6bcb77' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Financial Outcome Trends</h3>
            <p className="card-subtitle">Budget, overdraft & paycheck survival</p>
          </div>
          <LineChart data={applyFilterToMonthly(financialHealth.outcomesTrend, ['budgetAdherence', 'overdraftPrevention', 'paycheckSurvival'], f)} height={220}
            lines={[
              { key: 'budgetAdherence', label: 'Budget Adherence %', color: '#00f0ff' },
              { key: 'overdraftPrevention', label: 'Overdraft Prevention %', color: '#ccff00' },
              { key: 'paycheckSurvival', label: 'Paycheck Survival %', color: '#bf5af2' },
            ]} />
        </div>
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Current Zone Breakdown</h3>
          </div>
          <DonutChart data={[
            { zone: 'Green', color: '#6bcb77', value: applyFilter(financialHealth.zoneDistribution[0].count, 'greenZone', f) },
            { zone: 'Yellow', color: '#ffd93d', value: applyFilter(financialHealth.zoneDistribution[1].count, 'yellowZone', f) },
            { zone: 'Red', color: '#ff4757', value: applyFilter(financialHealth.zoneDistribution[2].count, 'redZone', f) },
          ]}
            size={180} centerLabel="Total Users" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
            {[
              { label: 'Budget Adherence', metricKey: 'budgetAdherence', value: `${applyFilter(financialHealth.kpis.budgetAdherence, 'budgetAdherence', f)}%` },
              { label: 'Red→Green (days)', metricKey: 'redToGreenDays', value: `${financialHealth.kpis.redToGreenDays}` },
              { label: 'Savings Δ (30d)', metricKey: 'savingsImprovement30d', value: `+${financialHealth.kpis.savingsImprovement30d}%` },
              { label: 'Confidence Score', metricKey: 'financialConfidence', value: `${financialHealth.kpis.financialConfidence}/10` },
            ].map((item, i) => (
              <div key={i} style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{item.value}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}><MetricTooltip metricKey={item.metricKey}>{item.label}</MetricTooltip></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Savings & Confidence Trend</h3>
          </div>
          <LineChart data={financialHealth.outcomesTrend} height={200}
            lines={[
              { key: 'savingsImprovement', label: 'Savings Improvement %', color: '#6bcb77' },
              { key: 'financialConfidence', label: 'Confidence (1-10)', color: '#ffd93d' },
            ]} />
        </div>
      </div>
    </>
  );
}

function PlatformView({ f }) {
  const { enrolled, nonEnrolled } = platformImpact.comparison;
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Dormant Reactivation', metricKey: 'dormantReactivation', value: applyFilter(platformImpact.kpis.dormantReactivation, 'dormantReactivation', f), suffix: '%', icon: '🔄', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)' },
          { label: 'Session Lift', metricKey: 'sessionLift', value: applyFilter(platformImpact.kpis.sessionLift, 'sessionLift', f), suffix: '%', icon: '📈', color: '#ccff00', bg: 'rgba(204,255,0,0.1)' },
          { label: 'NPS Delta', metricKey: 'npsDelta', value: platformImpact.kpis.npsDelta, suffix: 'pts', icon: '⭐', color: '#ffd93d', bg: 'rgba(255,217,61,0.1)' },
          { label: 'Ticket Deflection', metricKey: 'ticketDeflection', value: platformImpact.kpis.ticketDeflection, suffix: '%', icon: '🎫', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label"><MetricTooltip metricKey={kpi.metricKey}>{kpi.label}</MetricTooltip></span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={kpi.suffix === '%' ? 1 : 0} />
            </span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Enrolled vs Non-Enrolled</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', padding: '16px 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '16px' }}>Enrolled Users</div>
              {[
                { label: 'Avg Sessions/Mo', value: enrolled.avgSessions },
                { label: '30d Retention', value: `${enrolled.retention30d}%` },
                { label: 'NPS', value: enrolled.nps },
                { label: 'Support Tickets/Mo', value: enrolled.supportTickets },
              ].map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{item.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '16px' }}>Non-Enrolled</div>
              {[
                { label: 'Avg Sessions/Mo', value: nonEnrolled.avgSessions },
                { label: '30d Retention', value: `${nonEnrolled.retention30d}%` },
                { label: 'NPS', value: nonEnrolled.nps },
                { label: 'Support Tickets/Mo', value: nonEnrolled.supportTickets },
              ].map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Platform Impact Trends</h3>
          </div>
          <LineChart data={applyFilterToMonthly(platformImpact.monthly, ['dormantReactivation', 'sessionLift', 'crossFeatureEngagement'], f)} height={220}
            lines={[
              { key: 'dormantReactivation', label: 'Dormant Reactivation %', color: '#00f0ff' },
              { key: 'sessionLift', label: 'Session Lift %', color: '#ccff00' },
              { key: 'crossFeatureEngagement', label: 'Cross-Feature %', color: '#bf5af2' },
            ]} />
        </div>
      </div>
    </>
  );
}
