import React, { useState } from 'react';
import { AnimatedNumber, Sparkline, FunnelChart, HeatmapChart, LineChart, BarChart, DonutChart, StackedAreaChart, GaugeChart } from '../components/charts';
import { featureDiscovery, onboardingFunnel, engagement, retention, financialHealth, platformImpact } from '../data/productMetrics';

export default function ProductAnalytics() {
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

      {activeTab === 'funnel' && <FunnelView />}
      {activeTab === 'engagement' && <EngagementView />}
      {activeTab === 'retention' && <RetentionView />}
      {activeTab === 'outcomes' && <OutcomesView />}
      {activeTab === 'platform' && <PlatformView />}
    </div>
  );
}

function FunnelView() {
  return (
    <>
      {/* KPIs */}
      <div className="kpi-grid">
        {[
          { label: 'Impression Rate', value: featureDiscovery.kpis.impressionRate, suffix: '%', icon: '👁️', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)' },
          { label: 'Click-Through Rate', value: featureDiscovery.kpis.ctr, suffix: '%', icon: '👆', color: '#ccff00', bg: 'rgba(204,255,0,0.1)' },
          { label: 'Landing→Enrollment', value: featureDiscovery.kpis.landingToEnrollment, suffix: '%', icon: '✅', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)' },
          { label: 'Overall Adoption', value: featureDiscovery.kpis.overallAdoption, suffix: '%', icon: '🚀', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} />
            </span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        {/* Conversion Funnel */}
        <div className="card card-full glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <div>
              <h3 className="card-title">Conversion Funnel</h3>
              <p className="card-subtitle">From impression to active user</p>
            </div>
            <span className="card-badge">Last 30 days</span>
          </div>
          <FunnelChart steps={onboardingFunnel.steps} />
        </div>

        {/* Channel Effectiveness */}
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <div>
              <h3 className="card-title">Channel Effectiveness</h3>
              <p className="card-subtitle">Discovery channel performance</p>
            </div>
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

        {/* Onboarding KPIs */}
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Onboarding Performance</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Completion Rate', value: `${onboardingFunnel.kpis.completionRate}%`, target: '> 70%', ok: true },
              { label: 'Account Link Success', value: `${onboardingFunnel.kpis.accountLinkSuccess}%`, target: '> 85%', ok: true },
              { label: 'Time to Complete', value: `${onboardingFunnel.kpis.timeToComplete} min`, target: '< 3 min', ok: true },
              { label: 'Plan Acceptance', value: `${onboardingFunnel.kpis.planAcceptanceRate}%`, target: '> 55%', ok: true },
              { label: 'Time to First Value', value: `${onboardingFunnel.kpis.ttfv} min`, target: '< 5 min', ok: true },
              { label: 'Retry Rate', value: `${onboardingFunnel.kpis.retryRate}%`, target: 'Monitor', ok: true },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.label}</div>
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

function EngagementView() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Current DAU', value: engagement.kpis.currentDAU, suffix: '', icon: '📈', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', spark: engagement.monthly.map(m => m.dau) },
          { label: 'Current MAU', value: engagement.kpis.currentMAU, suffix: '', icon: '📊', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', spark: engagement.monthly.map(m => m.mau) },
          { label: 'Stickiness (DAU/MAU)', value: engagement.kpis.stickiness, suffix: '%', icon: '🧲', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', spark: engagement.monthly.map(m => m.stickiness) },
          { label: 'Agent Interaction Rate', value: engagement.kpis.agentInteractionRate, suffix: '%', icon: '🤖', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', spark: engagement.monthly.map(m => m.agentInteractionRate) },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label">{kpi.label}</span>
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
          <LineChart data={engagement.monthly} height={220}
            lines={[
              { key: 'dau', label: 'DAU', color: '#00f0ff' },
              { key: 'mau', label: 'MAU', color: '#bf5af2' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Feature Usage Distribution</h3>
          </div>
          <DonutChart data={engagement.featureUsage.map(f => ({ ...f, name: f.feature, value: f.sessions }))}
            size={180} centerValue={engagement.featureUsage.reduce((s, f) => s + f.sessions, 0).toLocaleString()} centerLabel="Total Sessions" />
          <div style={{ marginTop: '12px' }}>
            {engagement.featureUsage.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: f.color }} />
                  <span style={{ fontSize: '0.82rem' }}>{f.feature}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
                  <span style={{ color: f.color, fontWeight: 600 }}>{f.pct}%</span>
                  <span style={{ color: 'var(--text-muted)' }}>{f.sessions.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Session Metrics</h3>
          </div>
          <LineChart data={engagement.monthly} height={200}
            lines={[
              { key: 'sessionFrequency', label: 'Sessions/Week', color: '#00f0ff' },
              { key: 'avgSessionDuration', label: 'Avg Duration (min)', color: '#ccff00' },
            ]} />
        </div>
      </div>
    </>
  );
}

function RetentionView() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'D1 Retention', value: retention.kpis.d1Retention, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '📅' },
          { label: 'D7 Retention', value: retention.kpis.d7Retention, suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '📆' },
          { label: 'D30 Retention', value: retention.kpis.d30Retention, suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '🗓️' },
          { label: 'Churn Rate', value: retention.kpis.currentChurnRate, suffix: '%', color: '#ff4757', bg: 'rgba(255,71,87,0.1)', icon: '📉' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label">{kpi.label}</span>
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
            <h3 className="card-title">Churn & Reactivation</h3>
          </div>
          <LineChart data={retention.monthly} height={200}
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
              { label: 'D90 Retention', value: `${retention.kpis.d90Retention}%`, target: '> 18%', met: true },
              { label: 'Reactivation Rate', value: `${retention.kpis.reactivationRate}%`, target: '> 12%', met: true },
              { label: 'Avg Time to Churn', value: `${retention.kpis.avgTimeToChurn} days`, target: 'Increasing', met: true },
              { label: 'Monthly Churn', value: `${retention.kpis.currentChurnRate}%`, target: '< 8%', met: retention.kpis.currentChurnRate < 8 },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.label}</div>
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

function OutcomesView() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Green Zone Users', value: financialHealth.kpis.greenZonePct, suffix: '%', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', icon: '💚', spark: financialHealth.zoneHistory.map(m => m.green) },
          { label: 'Red→Green Rate', value: financialHealth.kpis.redToGreenRate, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '🔄' },
          { label: 'Overdraft Prevention', value: financialHealth.kpis.overdraftPrevention, suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '🛡️' },
          { label: 'Paycheck Survival', value: financialHealth.kpis.paycheckSurvival, suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '✅' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label">{kpi.label}</span>
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

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Current Zone Breakdown</h3>
          </div>
          <DonutChart data={financialHealth.zoneDistribution.map(z => ({ ...z, value: z.count }))}
            size={180} centerValue={financialHealth.zoneDistribution.reduce((s, z) => s + z.count, 0).toLocaleString()} centerLabel="Total Users" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
            {[
              { label: 'Budget Adherence', value: `${financialHealth.kpis.budgetAdherence}%` },
              { label: 'Red→Green (days)', value: `${financialHealth.kpis.redToGreenDays}` },
              { label: 'Savings Δ (30d)', value: `+${financialHealth.kpis.savingsImprovement30d}%` },
              { label: 'Confidence Score', value: `${financialHealth.kpis.financialConfidence}/10` },
            ].map((item, i) => (
              <div key={i} style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{item.value}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function PlatformView() {
  const { enrolled, nonEnrolled } = platformImpact.comparison;
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Dormant Reactivation', value: platformImpact.kpis.dormantReactivation, suffix: '%', icon: '🔄', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)' },
          { label: 'Session Lift', value: platformImpact.kpis.sessionLift, suffix: '%', icon: '📈', color: '#ccff00', bg: 'rgba(204,255,0,0.1)' },
          { label: 'NPS Delta', value: platformImpact.kpis.npsDelta, suffix: 'pts', icon: '⭐', color: '#ffd93d', bg: 'rgba(255,217,61,0.1)' },
          { label: 'Ticket Deflection', value: platformImpact.kpis.ticketDeflection, suffix: '%', icon: '🎫', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label">{kpi.label}</span>
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
            <p className="card-subtitle">Platform-level impact comparison</p>
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
          <LineChart data={platformImpact.monthly} height={220}
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
