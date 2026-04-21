// ═══════════════════════════════════════════════════════════
// SAFETY & GOVERNANCE — MOCK DATA (12 months)
// ═══════════════════════════════════════════════════════════

const MONTHS = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];

export const safetyMetrics = {
  monthly: MONTHS.map((month, i) => ({
    month,
    guardrailTriggerRate: parseFloat((3.2 - i * 0.1 + Math.random() * 0.3).toFixed(1)),
    piiDetectionRate: parseFloat((98.5 + i * 0.1 + Math.random() * 0.2).toFixed(1)),
    piiLeakageIncidents: i < 4 ? Math.round(Math.random() * 2) : 0,
    promptInjectionDetection: parseFloat((90 + i * 0.5 + Math.random() * 1).toFixed(1)),
    toxicContentRate: parseFloat((0.15 - i * 0.005 + Math.random() * 0.02).toFixed(2)),
    complianceScore: parseFloat((96 + i * 0.3 + Math.random() * 0.5).toFixed(1)),
    jailbreakAttempts: Math.round(45 - i * 2 + Math.random() * 10),
    authorizationRate: 100,
    auditCompleteness: parseFloat((98 + i * 0.15 + Math.random() * 0.3).toFixed(1)),
  })),
  guardrailBreakdown: [
    { type: 'Off-Topic / Scope', count: 1240, pct: 38, color: '#ff8e53' },
    { type: 'Financial Advice Boundary', count: 820, pct: 25, color: '#ffd93d' },
    { type: 'PII in Query', count: 560, pct: 17, color: '#ff4757' },
    { type: 'Prompt Injection', count: 380, pct: 12, color: '#bf5af2' },
    { type: 'Toxic Language', count: 180, pct: 5, color: '#ff6b9d' },
    { type: 'Other', count: 100, pct: 3, color: '#6a6a8e' },
  ],
  recentIncidents: [
    { id: 'INC-042', date: '2026-04-18', severity: 'low', type: 'PII in Query', agent: 'Transaction', description: 'User shared SSN in query — redacted before processing', status: 'resolved' },
    { id: 'INC-041', date: '2026-04-15', severity: 'low', type: 'Off-Topic', agent: 'Chit-chat', description: 'User asked about medical advice — correctly deflected', status: 'resolved' },
    { id: 'INC-040', date: '2026-04-12', severity: 'medium', type: 'Prompt Injection', agent: 'RAG', description: 'Attempted prompt injection via encoded text — blocked', status: 'resolved' },
    { id: 'INC-039', date: '2026-04-08', severity: 'low', type: 'Scope Violation', agent: 'RAG', description: 'Response included investment advice — guardrail triggered', status: 'resolved' },
    { id: 'INC-038', date: '2026-04-05', severity: 'low', type: 'Financial Advice', agent: 'Chit-chat', description: 'Agent recommended specific stock — corrected in follow-up', status: 'resolved' },
    { id: 'INC-037', date: '2026-03-28', severity: 'medium', type: 'PII Leakage', agent: 'Transaction', description: 'Partial account number in response — patched', status: 'resolved' },
    { id: 'INC-036', date: '2026-03-22', severity: 'high', type: 'PII Leakage', agent: 'Transaction', description: 'Full account number exposed in debug response — P1 fix deployed', status: 'resolved' },
    { id: 'INC-035', date: '2026-03-15', severity: 'low', type: 'Toxic Language', agent: 'Chit-chat', description: 'Agent tone too casual for financial context — prompt updated', status: 'resolved' },
  ],
  kpis: {
    guardrailTriggerRate: 1.8,
    piiDetectionRate: 99.6,
    piiLeakageIncidents: 0,
    promptInjectionDetection: 96.5,
    toxicContentRate: 0.06,
    complianceScore: 99.2,
    jailbreakAttempts: 28,
    authorizationRate: 100,
    auditCompleteness: 99.8,
  },
};

export { MONTHS };
