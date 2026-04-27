// ═══════════════════════════════════════════════════════════
// PRODUCT ANALYTICS — MOCK DATA (12 months)
// ═══════════════════════════════════════════════════════════

const MONTHS = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
const MONTHS_SHORT = ['M','J','J','A','S','O','N','D','J','F','M','A'];

// --- A1. Feature Discovery & Adoption ---
export const featureDiscovery = {
  monthly: MONTHS.map((month, i) => {
    const impressions = Math.round(45000 + i * 3200 + Math.random() * 2000);
    const clicks = Math.round(7500 + i * 800 + Math.random() * 500);
    const enrollmentStarts = Math.round(3200 + i * 400 + Math.random() * 300);
    const enrollmentCompletes = Math.round(2400 + i * 350 + Math.random() * 200);
    return {
      month,
      impressions,
      clicks,
      enrollmentStarts,
      enrollmentCompletes,
      ctr: parseFloat((clicks / impressions * 100).toFixed(1)),
      adoptionRate: parseFloat((enrollmentCompletes / impressions * 100).toFixed(1)),
    };
  }),
  channelBreakdown: [
    { channel: 'In-App Banner', impressions: 85000, clicks: 14200, ctr: 16.7, enrollments: 5800, color: '#00f0ff' },
    { channel: 'Push Notification', impressions: 62000, clicks: 11160, ctr: 18.0, enrollments: 4900, color: '#ccff00' },
    { channel: 'Low Balance Alert', impressions: 28000, clicks: 7560, ctr: 27.0, enrollments: 4200, color: '#bf5af2' },
    { channel: 'Navigation Link', impressions: 120000, clicks: 9600, ctr: 8.0, enrollments: 3100, color: '#ff8e53' },
    { channel: 'Referral', impressions: 15000, clicks: 3750, ctr: 25.0, enrollments: 2100, color: '#6bcb77' },
  ],
  kpis: {
    impressionRate: 82.4,
    ctr: 16.8,
    landingToEnrollment: 43.2,
    overallAdoption: 24.6,
    timeToDiscovery: 3.2,
  }
};

// --- A2. Onboarding Funnel ---
export const onboardingFunnel = {
  steps: [
    { name: 'Saw Promotion', count: 85200, pct: 100 },
    { name: 'Clicked Through', count: 14313, pct: 16.8 },
    { name: 'Reached Landing', count: 13100, pct: 15.4 },
    { name: 'Started Onboarding', count: 8650, pct: 10.2 },
    { name: 'Linked Account', count: 7200, pct: 8.5 },
    { name: 'Completed Profile', count: 6520, pct: 7.7 },
    { name: 'Received Plan', count: 6300, pct: 7.4 },
    { name: 'Accepted Plan', count: 5040, pct: 5.9 },
    { name: 'Active User', count: 4200, pct: 4.9 },
  ],
  monthly: MONTHS.map((month, i) => ({
    month,
    completionRate: parseFloat((68 + i * 0.7 + Math.random() * 1.5).toFixed(1)),
    accountLinkSuccess: parseFloat((82 + i * 0.5 + Math.random() * 1).toFixed(1)),
    timeToComplete: parseFloat((3.8 - i * 0.08 + Math.random() * 0.2).toFixed(1)),
    planAcceptanceRate: parseFloat((70 + i * 0.9 + Math.random() * 1.5).toFixed(1)),
    ttfv: parseFloat((5.5 - i * 0.1 + Math.random() * 0.3).toFixed(1)),
    retryRate: parseFloat((12 - i * 0.3 + Math.random() * 0.5).toFixed(1)),
  })),
  kpis: {
    onboardingStartRate: 66.0,
    completionRate: 75.4,
    accountLinkSuccess: 88.2,
    timeToComplete: 2.8,
    planAcceptanceRate: 80.0,
    ttfv: 4.2,
    retryRate: 8.5,
  },
  stepDropoff: [
    { step: 'Promotion → Click', dropoff: 83.2 },
    { step: 'Click → Landing', dropoff: 8.5 },
    { step: 'Landing → Start', dropoff: 34.0 },
    { step: 'Start → Link Account', dropoff: 16.8 },
    { step: 'Link → Profile', dropoff: 9.4 },
    { step: 'Profile → Plan', dropoff: 3.4 },
    { step: 'Plan → Accept', dropoff: 20.0 },
    { step: 'Accept → Active', dropoff: 16.7 },
  ],
};

// --- A3. Engagement ---
export const engagement = {
  monthly: MONTHS.map((month, i) => ({
    month,
    dau: Math.round(3200 + i * 280 + Math.random() * 200),
    mau: Math.round(12800 + i * 600 + Math.random() * 400),
    stickiness: parseFloat((25 + i * 0.8 + Math.random() * 2).toFixed(1)),
    sessionFrequency: parseFloat((3.8 + i * 0.12 + Math.random() * 0.3).toFixed(1)),
    avgSessionDuration: parseFloat((2.5 + i * 0.08 + Math.random() * 0.4).toFixed(1)),
    agentInteractionRate: parseFloat((15 + i * 1.2 + Math.random() * 2).toFixed(1)),
  })),
  featureUsage: [
    { feature: 'Dashboard', sessions: 42500, pct: 92, color: '#00f0ff' },
    { feature: 'Money Movement', sessions: 18200, pct: 39, color: '#ccff00' },
    { feature: 'AI Agent Chat', sessions: 14800, pct: 32, color: '#bf5af2' },
    { feature: 'Plan Review', sessions: 21300, pct: 46, color: '#ff8e53' },
    { feature: 'Analytics', sessions: 9800, pct: 21, color: '#6bcb77' },
    { feature: 'Notifications', sessions: 28400, pct: 61, color: '#4d96ff' },
  ],
  kpis: {
    currentDAU: 6480,
    currentMAU: 18200,
    stickiness: 35.6,
    avgSessionFrequency: 4.8,
    avgSessionDuration: 3.4,
    agentInteractionRate: 28.4,
    depthScore: 72,
    notificationEngagement: 28.5,
  },
};

// --- A4. Retention & Churn ---
export const retention = {
  cohortData: [
    { cohort: 'May', d1: 68, d7: 52, d14: 44, d30: 35, d60: 26, d90: 21 },
    { cohort: 'Jun', d1: 65, d7: 49, d14: 42, d30: 33, d60: 25, d90: 20 },
    { cohort: 'Jul', d1: 70, d7: 54, d14: 46, d30: 37, d60: 28, d90: 22 },
    { cohort: 'Aug', d1: 72, d7: 56, d14: 48, d30: 38, d60: 29, d90: 23 },
    { cohort: 'Sep', d1: 71, d7: 55, d14: 47, d30: 39, d60: 30, d90: null },
    { cohort: 'Oct', d1: 74, d7: 58, d14: 50, d30: 41, d60: null, d90: null },
    { cohort: 'Nov', d1: 73, d7: 57, d14: 49, d30: 40, d60: null, d90: null },
    { cohort: 'Dec', d1: 76, d7: 60, d14: 52, d30: null, d60: null, d90: null },
    { cohort: 'Jan', d1: 75, d7: 59, d14: 51, d30: null, d60: null, d90: null },
    { cohort: 'Feb', d1: 78, d7: 62, d14: null, d30: null, d60: null, d90: null },
    { cohort: 'Mar', d1: 77, d7: 61, d14: null, d30: null, d60: null, d90: null },
    { cohort: 'Apr', d1: 79, d7: null, d14: null, d30: null, d60: null, d90: null },
  ],
  monthly: MONTHS.map((month, i) => ({
    month,
    churnRate: parseFloat((9.2 - i * 0.15 + Math.random() * 0.5).toFixed(1)),
    reactivationRate: parseFloat((8 + i * 0.5 + Math.random() * 1).toFixed(1)),
  })),
  kpis: {
    d1Retention: 79,
    d7Retention: 61,
    d30Retention: 40,
    d90Retention: 23,
    currentChurnRate: 6.8,
    reactivationRate: 14.2,
    avgTimeToChurn: 42,
  },
};

// --- A5. Financial Health Outcomes ---
export const financialHealth = {
  zoneDistribution: [
    { zone: 'Green', count: 11200, pct: 61.5, color: '#6bcb77' },
    { zone: 'Yellow', count: 4550, pct: 25.0, color: '#ffd93d' },
    { zone: 'Red', count: 2450, pct: 13.5, color: '#ff4757' },
  ],
  zoneHistory: MONTHS.map((month, i) => ({
    month,
    green: parseFloat((48 + i * 1.2 + Math.random() * 2).toFixed(1)),
    yellow: parseFloat((30 - i * 0.4 + Math.random() * 1).toFixed(1)),
    red: parseFloat((22 - i * 0.8 + Math.random() * 1).toFixed(1)),
  })),
  outcomesTrend: MONTHS.map((month, i) => ({
    month,
    budgetAdherence: parseFloat((38 + i * 1.3 + Math.random() * 2).toFixed(1)),
    overdraftPrevention: parseFloat((58 + i * 1.5 + Math.random() * 2).toFixed(1)),
    paycheckSurvival: parseFloat((68 + i * 1.4 + Math.random() * 2).toFixed(1)),
    savingsImprovement: parseFloat((1.2 + i * 0.18 + Math.random() * 0.3).toFixed(1)),
    financialConfidence: parseFloat((5.2 + i * 0.14 + Math.random() * 0.2).toFixed(1)),
  })),
  kpis: {
    greenZonePct: 61.5,
    redToGreenRate: 44.2,
    redToGreenDays: 8.5,
    budgetAdherence: 52.3,
    savingsImprovement30d: 3.2,
    savingsImprovement90d: 8.7,
    overdraftPrevention: 74.5,
    paycheckSurvival: 83.2,
    financialConfidence: 6.8,
  },
};

// --- A6. Platform-Level Impact ---
export const platformImpact = {
  monthly: MONTHS.map((month, i) => ({
    month,
    dormantReactivation: parseFloat((3.2 + i * 0.3 + Math.random() * 0.5).toFixed(1)),
    sessionLift: parseFloat((18 + i * 1.5 + Math.random() * 3).toFixed(1)),
    crossFeatureEngagement: parseFloat((22 + i * 1.0 + Math.random() * 2).toFixed(1)),
  })),
  comparison: {
    enrolled: { avgSessions: 12.4, retention30d: 72, nps: 58, supportTickets: 0.8 },
    nonEnrolled: { avgSessions: 6.2, retention30d: 45, nps: 34, supportTickets: 2.1 },
  },
  kpis: {
    dormantReactivation: 6.8,
    sessionLift: 34.5,
    crossFeature: 32.4,
    retentionDelta: 27,
    npsDelta: 24,
    ticketDeflection: 62,
    viralCoefficient: 0.12,
  },
};

export { MONTHS, MONTHS_SHORT };
