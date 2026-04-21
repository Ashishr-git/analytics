// ═══════════════════════════════════════════════════════════
// AGENTIC AI ANALYTICS — MOCK DATA (12 months)
// ═══════════════════════════════════════════════════════════

const MONTHS = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];

// --- B1. System-Level Agent Metrics ---
export const systemMetrics = {
  monthly: MONTHS.map((month, i) => ({
    month,
    totalInteractions: Math.round(28000 + i * 3500 + Math.random() * 2000),
    totalSessions: Math.round(8500 + i * 1200 + Math.random() * 600),
    avgTurns: parseFloat((4.2 + Math.random() * 1.5).toFixed(1)),
    latencyP50: Math.round(650 - i * 15 + Math.random() * 50),
    latencyP95: Math.round(1800 - i * 30 + Math.random() * 100),
    latencyP99: Math.round(3200 - i * 40 + Math.random() * 200),
    ttft: Math.round(320 - i * 8 + Math.random() * 30),
    taskCompletion: parseFloat((80 + i * 0.5 + Math.random() * 1).toFixed(1)),
    satisfaction: parseFloat((75 + i * 0.8 + Math.random() * 1.5).toFixed(1)),
    escalationRate: parseFloat((12 - i * 0.4 + Math.random() * 0.5).toFixed(1)),
    errorRate: parseFloat((2.5 - i * 0.12 + Math.random() * 0.2).toFixed(1)),
  })),
  agentDistribution: [
    { agent: 'RAG Agent', pct: 38, interactions: 42800, color: '#00f0ff', icon: '📚' },
    { agent: 'Transaction Agent', pct: 35, interactions: 39400, color: '#ccff00', icon: '💳' },
    { agent: 'Chit-chat Agent', pct: 27, interactions: 30400, color: '#bf5af2', icon: '💬' },
  ],
  kpis: {
    totalInteractions: 112600,
    totalSessions: 34200,
    avgTurns: 5.1,
    latencyP50: 520,
    latencyP95: 1450,
    latencyP99: 2800,
    ttft: 240,
    taskCompletion: 87.4,
    satisfaction: 84.2,
    escalationRate: 6.8,
    errorRate: 0.9,
  },
};

// --- B2. RAG Agent Metrics ---
export const ragMetrics = {
  monthly: MONTHS.map((month, i) => ({
    month,
    retrievalPrecision: parseFloat((80 + i * 0.5 + Math.random() * 2).toFixed(1)),
    retrievalRecall: parseFloat((70 + i * 0.6 + Math.random() * 2).toFixed(1)),
    contextRelevancy: parseFloat((0.75 + i * 0.01 + Math.random() * 0.02).toFixed(2)),
    faithfulness: parseFloat((0.86 + i * 0.005 + Math.random() * 0.01).toFixed(2)),
    answerRelevancy: parseFloat((0.82 + i * 0.005 + Math.random() * 0.015).toFixed(2)),
    hallucinationRate: parseFloat((8 - i * 0.3 + Math.random() * 0.5).toFixed(1)),
    kbCoverage: parseFloat((72 + i * 0.8 + Math.random() * 1.5).toFixed(1)),
    satisfaction: parseFloat((74 + i * 0.6 + Math.random() * 1.5).toFixed(1)),
  })),
  latencyBreakdown: {
    retrieval: { p50: 180, p95: 350, p99: 520 },
    generation: { p50: 680, p95: 1200, p99: 1800 },
  },
  topQueries: [
    { query: 'How does the 50/30/20 rule work?', count: 1240, satisfaction: 92 },
    { query: 'What are good ways to save money?', count: 980, satisfaction: 88 },
    { query: 'How to build an emergency fund?', count: 870, satisfaction: 91 },
    { query: 'What is compound interest?', count: 760, satisfaction: 95 },
    { query: 'How to reduce monthly expenses?', count: 720, satisfaction: 85 },
    { query: 'Should I pay off debt or save first?', count: 680, satisfaction: 82 },
    { query: 'What is a credit score?', count: 640, satisfaction: 90 },
    { query: 'How much should I save each month?', count: 590, satisfaction: 87 },
  ],
  kbGaps: [
    { topic: 'Cryptocurrency basics', queries: 340, status: 'planned' },
    { topic: 'Student loan strategies', queries: 280, status: 'in-progress' },
    { topic: 'Side hustle income management', queries: 220, status: 'planned' },
    { topic: 'Tax filing for gig workers', queries: 190, status: 'not-started' },
    { topic: 'Healthcare savings (HSA)', queries: 150, status: 'not-started' },
  ],
  kpis: {
    retrievalPrecision: 87.4,
    retrievalRecall: 78.2,
    faithfulness: 0.92,
    answerRelevancy: 0.88,
    hallucinationRate: 4.2,
    kbCoverage: 82.5,
    citationAccuracy: 96.1,
    satisfaction: 81.5,
    avgResponseLength: 124,
  },
};

// --- B3. Transaction Agent Metrics ---
export const transactionMetrics = {
  monthly: MONTHS.map((month, i) => ({
    month,
    queryUnderstanding: parseFloat((86 + i * 0.4 + Math.random() * 1.5).toFixed(1)),
    dataRetrieval: parseFloat((92 + i * 0.3 + Math.random() * 1).toFixed(1)),
    temporalReasoning: parseFloat((82 + i * 0.6 + Math.random() * 2).toFixed(1)),
    aggregationAccuracy: parseFloat((93 + i * 0.2 + Math.random() * 1).toFixed(1)),
    responseCompleteness: parseFloat((80 + i * 0.5 + Math.random() * 1.5).toFixed(1)),
    toolCallSuccess: parseFloat((96 + i * 0.15 + Math.random() * 0.5).toFixed(1)),
    satisfaction: parseFloat((76 + i * 0.7 + Math.random() * 1.5).toFixed(1)),
  })),
  topQueries: [
    { query: 'How much did I spend on food this month?', count: 2100, accuracy: 96 },
    { query: 'What are my biggest expenses?', count: 1800, accuracy: 94 },
    { query: 'Show me my subscriptions', count: 1500, accuracy: 98 },
    { query: 'How much did I spend last week?', count: 1400, accuracy: 92 },
    { query: 'Where is my money going?', count: 1200, accuracy: 88 },
    { query: 'Compare spending this month vs last', count: 950, accuracy: 85 },
  ],
  toolCallStats: {
    totalCalls: 84200,
    successRate: 98.4,
    avgLatency: 320,
    byTool: [
      { tool: 'get_transactions', calls: 38500, success: 99.1, avgLatency: 280 },
      { tool: 'aggregate_spending', calls: 22100, success: 98.8, avgLatency: 310 },
      { tool: 'get_categories', calls: 15200, success: 98.2, avgLatency: 240 },
      { tool: 'compare_periods', calls: 8400, success: 96.5, avgLatency: 520 },
    ]
  },
  kpis: {
    queryUnderstanding: 91.2,
    dataRetrieval: 96.4,
    temporalReasoning: 89.8,
    aggregationAccuracy: 96.2,
    responseCompleteness: 87.5,
    toolCallSuccess: 98.4,
    multiStepSuccess: 83.6,
    satisfaction: 83.4,
  },
};

// --- B4. Chit-chat Agent Metrics ---
export const chitchatMetrics = {
  monthly: MONTHS.map((month, i) => ({
    month,
    coherence: parseFloat((0.76 + i * 0.008 + Math.random() * 0.02).toFixed(2)),
    navigationSuccess: parseFloat((80 + i * 0.5 + Math.random() * 2).toFixed(1)),
    personalityConsistency: parseFloat((0.87 + i * 0.005 + Math.random() * 0.01).toFixed(2)),
    avgTurns: parseFloat((4.5 + Math.random() * 2).toFixed(1)),
    containmentRate: parseFloat((65 + i * 0.6 + Math.random() * 2).toFixed(1)),
    motivationalImpact: parseFloat((12 + i * 0.5 + Math.random() * 1.5).toFixed(1)),
    satisfaction: parseFloat((72 + i * 0.6 + Math.random() * 2).toFixed(1)),
    handoffAccuracy: parseFloat((85 + i * 0.5 + Math.random() * 1.5).toFixed(1)),
  })),
  conversationCategories: [
    { category: 'Financial Coaching', pct: 32, count: 9700, color: '#ccff00' },
    { category: 'Navigation Help', pct: 24, count: 7300, color: '#00f0ff' },
    { category: 'General Questions', pct: 22, count: 6700, color: '#bf5af2' },
    { category: 'Encouragement', pct: 14, count: 4250, color: '#6bcb77' },
    { category: 'Other', pct: 8, count: 2430, color: '#ff8e53' },
  ],
  kpis: {
    coherence: 0.85,
    navigationSuccess: 87.2,
    personalityConsistency: 0.93,
    avgTurns: 5.2,
    containmentRate: 73.4,
    motivationalImpact: 18.2,
    satisfaction: 79.8,
    handoffAccuracy: 91.5,
  },
};

// --- B5. Multi-Agent Coordination ---
export const coordinationMetrics = {
  routingFlow: [
    { from: 'User Query', to: 'RAG Agent', value: 42800 },
    { from: 'User Query', to: 'Transaction Agent', value: 39400 },
    { from: 'User Query', to: 'Chit-chat Agent', value: 30400 },
    { from: 'RAG Agent', to: 'Transaction Agent', value: 1200 },
    { from: 'RAG Agent', to: 'Chit-chat Agent', value: 800 },
    { from: 'Transaction Agent', to: 'RAG Agent', value: 950 },
    { from: 'Transaction Agent', to: 'Chit-chat Agent', value: 450 },
    { from: 'Chit-chat Agent', to: 'RAG Agent', value: 2100 },
    { from: 'Chit-chat Agent', to: 'Transaction Agent', value: 1800 },
  ],
  monthly: MONTHS.map((month, i) => ({
    month,
    routingAccuracy: parseFloat((88 + i * 0.4 + Math.random() * 1).toFixed(1)),
    misrouteRate: parseFloat((7 - i * 0.2 + Math.random() * 0.5).toFixed(1)),
    handoffSuccess: parseFloat((85 + i * 0.5 + Math.random() * 1.5).toFixed(1)),
    contextPreservation: parseFloat((80 + i * 0.5 + Math.random() * 2).toFixed(1)),
    roleAdherence: parseFloat((88 + i * 0.4 + Math.random() * 1).toFixed(1)),
    loopDetections: Math.max(0, Math.round(3 - i * 0.2 + Math.random())),
    avgAgentsPerSession: parseFloat((1.3 + Math.random() * 0.3).toFixed(1)),
    orchestratorLatency: Math.round(65 - i * 2 + Math.random() * 10),
  })),
  kpis: {
    routingAccuracy: 93.2,
    misrouteRate: 4.1,
    handoffSuccess: 91.8,
    contextPreservation: 87.4,
    roleAdherence: 93.6,
    loopDetections: 0,
    avgAgentsPerSession: 1.4,
    crossAgentResolution: 1.6,
    orchestratorLatency: 48,
  },
};

// --- B7. Cost & Efficiency ---
export const costMetrics = {
  monthly: MONTHS.map((month, i) => ({
    month,
    totalTokens: Math.round(4200000 + i * 350000 + Math.random() * 200000),
    ragTokens: Math.round(1800000 + i * 150000 + Math.random() * 80000),
    transactionTokens: Math.round(1500000 + i * 120000 + Math.random() * 70000),
    chitchatTokens: Math.round(900000 + i * 80000 + Math.random() * 50000),
    totalCost: parseFloat((840 + i * 65 + Math.random() * 30).toFixed(2)),
    costPerConversation: parseFloat((0.042 - i * 0.001 + Math.random() * 0.003).toFixed(3)),
    costPerResolvedQuery: parseFloat((0.058 - i * 0.001 + Math.random() * 0.004).toFixed(3)),
    cacheHitRate: parseFloat((8 + i * 1.0 + Math.random() * 1.5).toFixed(1)),
    modelCallEfficiency: parseFloat((3.5 - i * 0.08 + Math.random() * 0.2).toFixed(1)),
  })),
  costBreakdown: [
    { category: 'RAG Agent', cost: 5200, pct: 42, color: '#00f0ff' },
    { category: 'Transaction Agent', cost: 4100, pct: 33, color: '#ccff00' },
    { category: 'Chit-chat Agent', cost: 1900, pct: 15, color: '#bf5af2' },
    { category: 'Orchestration', cost: 750, pct: 6, color: '#ff8e53' },
    { category: 'Infrastructure', cost: 500, pct: 4, color: '#6bcb77' },
  ],
  kpis: {
    totalTokens: 8400000,
    totalCost: 1580,
    costPerConversation: 0.032,
    costPerResolvedQuery: 0.044,
    costPerUser: 1.12,
    monthlyBudget: 2000,
    budgetUtilization: 79,
    cacheHitRate: 19.2,
    modelCallEfficiency: 2.6,
  },
};

export { MONTHS };
