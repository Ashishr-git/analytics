import React, { useState } from 'react';
import { AnimatedNumber, Sparkline, GaugeChart, DonutChart, LineChart, BarChart, HorizontalBarChart } from '../components/charts';
import { systemMetrics, ragMetrics, transactionMetrics, chitchatMetrics, coordinationMetrics } from '../data/agentMetrics';

export default function AgentPerformance() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'rag', label: '📚 RAG Agent' },
    { id: 'transaction', label: '💳 Transaction' },
    { id: 'chitchat', label: '💬 Chit-chat' },
    { id: 'coordination', label: '🔀 Coordination' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Agent Performance</h1>
          <p className="page-subtitle">Multi-agent system quality, latency, and satisfaction metrics</p>
        </div>
        <div className="filters-bar">
          {tabs.map(tab => (
            <button key={tab.id} className={`filter-btn ${activeTab === tab.id ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'rag' && <RagTab />}
      {activeTab === 'transaction' && <TransactionTab />}
      {activeTab === 'chitchat' && <ChitchatTab />}
      {activeTab === 'coordination' && <CoordinationTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Task Completion Rate', value: systemMetrics.kpis.taskCompletion, suffix: '%', icon: '✅', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', spark: systemMetrics.monthly.map(m => m.taskCompletion) },
          { label: 'User Satisfaction', value: systemMetrics.kpis.satisfaction, suffix: '%', icon: '😊', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', spark: systemMetrics.monthly.map(m => m.satisfaction) },
          { label: 'Latency P50', value: systemMetrics.kpis.latencyP50, suffix: 'ms', icon: '⚡', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', spark: systemMetrics.monthly.map(m => m.latencyP50) },
          { label: 'Error Rate', value: systemMetrics.kpis.errorRate, suffix: '%', icon: '🐛', color: systemMetrics.kpis.errorRate < 1 ? '#6bcb77' : '#ff4757', bg: 'rgba(107,203,119,0.1)', spark: systemMetrics.monthly.map(m => m.errorRate) },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
            </div>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-value" style={{ color: kpi.color }}>
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={kpi.suffix === 'ms' ? 0 : 1} />
            </span>
            <div className="kpi-sparkline"><Sparkline data={kpi.spark} color={kpi.color} /></div>
          </div>
        ))}
      </div>

      <div className="card-grid">
        {/* Agent Performance Cards */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Per-Agent Performance</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'RAG Agent', icon: '📚', color: '#00f0ff', satisfaction: ragMetrics.kpis.satisfaction, faithfulness: ragMetrics.kpis.faithfulness, latency: ragMetrics.latencyBreakdown.generation.p50 },
              { name: 'Transaction Agent', icon: '💳', color: '#ccff00', satisfaction: transactionMetrics.kpis.satisfaction, faithfulness: null, accuracy: transactionMetrics.kpis.dataRetrieval, latency: transactionMetrics.toolCallStats.avgLatency },
              { name: 'Chit-chat Agent', icon: '💬', color: '#bf5af2', satisfaction: chitchatMetrics.kpis.satisfaction, coherence: chitchatMetrics.kpis.coherence, latency: 450 },
            ].map((agent, i) => (
              <div key={i} style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${agent.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{agent.icon} {agent.name}</span>
                  <span className="badge badge--green">{agent.satisfaction}% satisfaction</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
                  {agent.faithfulness && <span style={{ color: 'var(--text-muted)' }}>Faithfulness: <strong style={{ color: agent.color }}>{(agent.faithfulness * 100).toFixed(0)}%</strong></span>}
                  {agent.accuracy && <span style={{ color: 'var(--text-muted)' }}>Accuracy: <strong style={{ color: agent.color }}>{agent.accuracy}%</strong></span>}
                  {agent.coherence && <span style={{ color: 'var(--text-muted)' }}>Coherence: <strong style={{ color: agent.color }}>{(agent.coherence * 100).toFixed(0)}%</strong></span>}
                  <span style={{ color: 'var(--text-muted)' }}>Latency: <strong>{agent.latency}ms</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Distribution */}
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header">
            <h3 className="card-title">Query Distribution</h3>
          </div>
          <DonutChart data={systemMetrics.agentDistribution.map(a => ({ ...a, name: a.agent, value: a.interactions }))}
            size={200} centerValue={systemMetrics.kpis.totalInteractions.toLocaleString()} centerLabel="Total Queries" />
          <div style={{ marginTop: '12px' }}>
            {systemMetrics.agentDistribution.map((a, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                  {a.icon} {a.agent}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: a.color }}>{a.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Latency Trends</h3>
          </div>
          <LineChart data={systemMetrics.monthly} height={200}
            lines={[
              { key: 'latencyP50', label: 'P50 (ms)', color: '#00f0ff' },
              { key: 'latencyP95', label: 'P95 (ms)', color: '#ffd93d' },
              { key: 'latencyP99', label: 'P99 (ms)', color: '#ff4757' },
            ]} />
        </div>

        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header">
            <h3 className="card-title">Satisfaction & Completion</h3>
          </div>
          <LineChart data={systemMetrics.monthly} height={200}
            lines={[
              { key: 'satisfaction', label: 'Satisfaction %', color: '#ccff00' },
              { key: 'taskCompletion', label: 'Task Completion %', color: '#00f0ff' },
              { key: 'escalationRate', label: 'Escalation %', color: '#ff4757' },
            ]} />
        </div>
      </div>

      {/* Gauges */}
      <div className="card-grid card-grid--three">
        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header"><h3 className="card-title">Latency Gauges</h3></div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <GaugeChart value={systemMetrics.kpis.latencyP50} max={1500} label="P50" color="#00f0ff" size={110} suffix="ms" />
            <GaugeChart value={systemMetrics.kpis.latencyP95} max={3000} label="P95" color="#ffd93d" size={110} suffix="ms" />
            <GaugeChart value={systemMetrics.kpis.latencyP99} max={5000} label="P99" color="#ff4757" size={110} suffix="ms" />
          </div>
        </div>
        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header"><h3 className="card-title">Quality Gauges</h3></div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <GaugeChart value={ragMetrics.kpis.faithfulness * 100} label="Faithfulness" color="#6bcb77" size={110} />
            <GaugeChart value={ragMetrics.kpis.answerRelevancy * 100} label="Relevancy" color="#00f0ff" size={110} />
            <GaugeChart value={100 - ragMetrics.kpis.hallucinationRate} label="Non-Hallucin." color="#ccff00" size={110} />
          </div>
        </div>
        <div className="card glass-panel animate-in animate-in-delay-5">
          <div className="card-header"><h3 className="card-title">Operational</h3></div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <GaugeChart value={coordinationMetrics.kpis.routingAccuracy} label="Routing" color="#bf5af2" size={110} />
            <GaugeChart value={100 - systemMetrics.kpis.errorRate} label="Uptime" color="#6bcb77" size={110} />
            <GaugeChart value={100 - systemMetrics.kpis.escalationRate} label="Containment" color="#00f0ff" size={110} />
          </div>
        </div>
      </div>
    </>
  );
}

function RagTab() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Faithfulness', value: ragMetrics.kpis.faithfulness * 100, suffix: '%', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', icon: '🎯' },
          { label: 'Hallucination Rate', value: ragMetrics.kpis.hallucinationRate, suffix: '%', color: ragMetrics.kpis.hallucinationRate < 5 ? '#6bcb77' : '#ff4757', bg: 'rgba(255,71,87,0.1)', icon: '🔍' },
          { label: 'KB Coverage', value: ragMetrics.kpis.kbCoverage, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '📖' },
          { label: 'Satisfaction', value: ragMetrics.kpis.satisfaction, suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '👍' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header"><div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div></div>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-value" style={{ color: kpi.color }}><AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} /></span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">RAG Quality Trends</h3></div>
          <LineChart data={ragMetrics.monthly} height={220}
            lines={[
              { key: 'retrievalPrecision', label: 'Precision', color: '#00f0ff' },
              { key: 'retrievalRecall', label: 'Recall', color: '#ccff00' },
              { key: 'kbCoverage', label: 'KB Coverage', color: '#bf5af2' },
            ]} />
        </div>
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Top Queries</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ragMetrics.topQueries.map((q, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flex: 1 }}>{q.query}</span>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', flexShrink: 0 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{q.count}x</span>
                  <span style={{ color: q.satisfaction > 90 ? '#6bcb77' : '#ffd93d' }}>{q.satisfaction}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header"><h3 className="card-title">Knowledge Base Gaps</h3></div>
          <table className="data-table">
            <thead><tr><th>Topic</th><th>Queries</th><th>Status</th></tr></thead>
            <tbody>
              {ragMetrics.kbGaps.map((gap, i) => (
                <tr key={i}>
                  <td>{gap.topic}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{gap.queries}</td>
                  <td><span className={`badge badge--${gap.status === 'in-progress' ? 'cyan' : gap.status === 'planned' ? 'yellow' : 'red'}`}>
                    {gap.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card glass-panel animate-in animate-in-delay-4">
          <div className="card-header"><h3 className="card-title">Faithfulness & Hallucination</h3></div>
          <LineChart data={ragMetrics.monthly} height={200}
            lines={[
              { key: 'hallucinationRate', label: 'Hallucination %', color: '#ff4757' },
            ]} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{ragMetrics.kpis.citationAccuracy}%</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Citation Accuracy</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{ragMetrics.kpis.avgResponseLength}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Avg Words</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{ragMetrics.latencyBreakdown.retrieval.p50}ms</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Retrieval P50</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TransactionTab() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Query Understanding', value: transactionMetrics.kpis.queryUnderstanding, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '🧠' },
          { label: 'Data Retrieval', value: transactionMetrics.kpis.dataRetrieval, suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '📋' },
          { label: 'Tool Call Success', value: transactionMetrics.kpis.toolCallSuccess, suffix: '%', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', icon: '🔧' },
          { label: 'Satisfaction', value: transactionMetrics.kpis.satisfaction, suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '👍' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header"><div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div></div>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-value" style={{ color: kpi.color }}><AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} /></span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Accuracy Trends</h3></div>
          <LineChart data={transactionMetrics.monthly} height={220}
            lines={[
              { key: 'queryUnderstanding', label: 'Query Understanding', color: '#00f0ff' },
              { key: 'dataRetrieval', label: 'Data Retrieval', color: '#ccff00' },
              { key: 'aggregationAccuracy', label: 'Aggregation', color: '#bf5af2' },
              { key: 'temporalReasoning', label: 'Temporal Reasoning', color: '#ff8e53' },
            ]} />
        </div>
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Tool Call Stats</h3></div>
          <table className="data-table">
            <thead><tr><th>Tool</th><th>Calls</th><th>Success</th><th>Latency</th></tr></thead>
            <tbody>
              {transactionMetrics.toolCallStats.byTool.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{t.tool}</td>
                  <td>{t.calls.toLocaleString()}</td>
                  <td style={{ color: t.success > 98 ? '#6bcb77' : '#ffd93d' }}>{t.success}%</td>
                  <td>{t.avgLatency}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ChitchatTab() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Coherence', value: chitchatMetrics.kpis.coherence * 100, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '🗣️' },
          { label: 'Navigation Success', value: chitchatMetrics.kpis.navigationSuccess, suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '🧭' },
          { label: 'Containment', value: chitchatMetrics.kpis.containmentRate, suffix: '%', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', icon: '📦' },
          { label: 'Satisfaction', value: chitchatMetrics.kpis.satisfaction, suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '😊' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header"><div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div></div>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-value" style={{ color: kpi.color }}><AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={1} /></span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Chit-chat Performance Trends</h3></div>
          <LineChart data={chitchatMetrics.monthly} height={220}
            lines={[
              { key: 'navigationSuccess', label: 'Navigation %', color: '#00f0ff' },
              { key: 'containmentRate', label: 'Containment %', color: '#ccff00' },
              { key: 'satisfaction', label: 'Satisfaction %', color: '#bf5af2' },
            ]} />
        </div>
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Conversation Categories</h3></div>
          <DonutChart data={chitchatMetrics.conversationCategories.map(c => ({ ...c, name: c.category, value: c.count }))}
            size={180} centerValue={chitchatMetrics.conversationCategories.reduce((s, c) => s + c.count, 0).toLocaleString()} centerLabel="Conversations" />
          <div style={{ marginTop: '12px' }}>
            {chitchatMetrics.conversationCategories.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.color }} />{c.category}
                </span>
                <span style={{ color: c.color }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CoordinationTab() {
  return (
    <>
      <div className="kpi-grid">
        {[
          { label: 'Routing Accuracy', value: coordinationMetrics.kpis.routingAccuracy, suffix: '%', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', icon: '🎯' },
          { label: 'Handoff Success', value: coordinationMetrics.kpis.handoffSuccess, suffix: '%', color: '#ccff00', bg: 'rgba(204,255,0,0.1)', icon: '🤝' },
          { label: 'Context Preserved', value: coordinationMetrics.kpis.contextPreservation, suffix: '%', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', icon: '🧠' },
          { label: 'Loop Detections', value: coordinationMetrics.kpis.loopDetections, suffix: '', color: '#6bcb77', bg: 'rgba(107,203,119,0.1)', icon: '🔄' },
        ].map((kpi, i) => (
          <div key={i} className={`kpi-card glass-panel animate-in animate-in-delay-${i + 1}`}>
            <div className="kpi-card-header"><div className="kpi-icon" style={{ background: kpi.bg }}>{kpi.icon}</div></div>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-value" style={{ color: kpi.color }}><AnimatedNumber value={kpi.value} suffix={kpi.suffix} decimals={kpi.suffix === '%' ? 1 : 0} /></span>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Coordination Trends</h3></div>
          <LineChart data={coordinationMetrics.monthly} height={220}
            lines={[
              { key: 'routingAccuracy', label: 'Routing %', color: '#00f0ff' },
              { key: 'handoffSuccess', label: 'Handoff %', color: '#ccff00' },
              { key: 'contextPreservation', label: 'Context %', color: '#bf5af2' },
              { key: 'roleAdherence', label: 'Role Adherence %', color: '#ff8e53' },
            ]} />
        </div>
        <div className="card glass-panel animate-in animate-in-delay-3">
          <div className="card-header"><h3 className="card-title">Agent Routing Flow</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {coordinationMetrics.routingFlow.map((flow, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', minWidth: '130px' }}>{flow.from}</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-purple)', minWidth: '130px' }}>{flow.to}</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${(flow.value / 42800) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', minWidth: '50px', textAlign: 'right' }}>
                  {flow.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
