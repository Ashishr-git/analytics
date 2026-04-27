import React, { useState } from 'react';
import ExecutiveOverview from './views/ExecutiveOverview';
import ProductAnalytics from './views/ProductAnalytics';
import AgentPerformance from './views/AgentPerformance';
import SafetyGovernance from './views/SafetyGovernance';
import CostEfficiency from './views/CostEfficiency';
import './App.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Executive Overview', icon: '📊', section: 'Dashboard' },
  { id: 'product', label: 'Product Analytics', icon: '📈', section: 'Dashboard' },
  { id: 'agents', label: 'Agent Performance', icon: '🤖', section: 'Agentic AI' },
  { id: 'safety', label: 'Safety & Governance', icon: '🛡️', section: 'Agentic AI' },
  { id: 'cost', label: 'Cost & Efficiency', icon: '💰', section: 'Agentic AI' },
];

const DEFAULT_FILTERS = { age: 'all', income: 'all', gender: 'all' };

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [demoFilters, setDemoFilters] = useState(DEFAULT_FILTERS);

  const sections = [...new Set(NAV_ITEMS.map(item => item.section))];

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">MF</div>
            <div className="sidebar-logo-text">
              <span className="sidebar-logo-title">Managed Finance</span>
              <span className="sidebar-logo-subtitle">Analytics</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sections.map(section => (
            <React.Fragment key={section}>
              <span className="sidebar-section-label">{section}</span>
              {NAV_ITEMS.filter(item => item.section === section).map(item => (
                <button
                  key={item.id}
                  className={`sidebar-item ${activeView === item.id ? 'sidebar-item--active' : ''}`}
                  onClick={() => setActiveView(item.id)}
                >
                  <span className="sidebar-item-icon">{item.icon}</span>
                  <span className="sidebar-item-label">{item.label}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-status">
            <span className="sidebar-status-dot" />
            <span>Live — Last updated now</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="layout-main">
        {activeView === 'overview' && <ExecutiveOverview filters={demoFilters} onFiltersChange={setDemoFilters} />}
        {activeView === 'product' && <ProductAnalytics filters={demoFilters} onFiltersChange={setDemoFilters} />}
        {activeView === 'agents' && <AgentPerformance filters={demoFilters} />}
        {activeView === 'safety' && <SafetyGovernance filters={demoFilters} />}
        {activeView === 'cost' && <CostEfficiency filters={demoFilters} />}
      </main>
    </div>
  );
}
