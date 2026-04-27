// ═══════════════════════════════════════════════════════════
// DEMOGRAPHIC DIMENSION DATA & FILTER ENGINE
// ═══════════════════════════════════════════════════════════

// Demographic dimension definitions
export const DEMOGRAPHICS = {
  age: {
    label: 'Age Group',
    icon: '🎂',
    segments: [
      { id: 'all', label: 'All Ages' },
      { id: '18-21', label: '18–21' },
      { id: '22-24', label: '22–24' },
    ],
  },
  income: {
    label: 'Income Bracket',
    icon: '💵',
    segments: [
      { id: 'all', label: 'All Income' },
      { id: 'low', label: '< $25k' },
      { id: 'mid-low', label: '$25k–$40k' },
      { id: 'mid', label: '$40k–$60k' },
      { id: 'high', label: '$60k+' },
    ],
  },
  gender: {
    label: 'Gender',
    icon: '👤',
    segments: [
      { id: 'all', label: 'All' },
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
      { id: 'nonbinary', label: 'Non-binary' },
    ],
  },
};

// Multiplier profiles per segment
// These adjust base metrics to simulate demographic differences
// Values > 1.0 mean higher than average, < 1.0 mean lower
const SEGMENT_PROFILES = {
  // --- Age ---
  '18-21': {
    // Younger: higher engagement, lower financial health, higher agent usage
    impressions: 1.15, clicks: 1.22, enrollments: 0.88,
    dau: 1.18, mau: 1.12, stickiness: 1.08, sessionFrequency: 1.25,
    agentInteractionRate: 1.35, avgSessionDuration: 1.12,
    d1Retention: 0.92, d7Retention: 0.88, d30Retention: 0.82, churnRate: 1.15,
    greenZone: 0.72, yellowZone: 1.18, redZone: 1.55,
    budgetAdherence: 0.65, overdraftPrevention: 0.58, paycheckSurvival: 0.72,
    dormantReactivation: 1.10, sessionLift: 1.20,
    completionRate: 0.90, planAcceptanceRate: 0.85,
  },
  '22-24': {
    // Older segment: more financially aware, better outcomes, moderate engagement
    impressions: 0.88, clicks: 0.82, enrollments: 1.12,
    dau: 0.85, mau: 0.90, stickiness: 0.94, sessionFrequency: 0.80,
    agentInteractionRate: 0.72, avgSessionDuration: 0.90,
    d1Retention: 1.08, d7Retention: 1.12, d30Retention: 1.18, churnRate: 0.85,
    greenZone: 1.28, yellowZone: 0.82, redZone: 0.55,
    budgetAdherence: 1.35, overdraftPrevention: 1.42, paycheckSurvival: 1.28,
    dormantReactivation: 0.92, sessionLift: 0.85,
    completionRate: 1.10, planAcceptanceRate: 1.15,
  },

  // --- Income ---
  'low': {
    impressions: 1.05, clicks: 1.18, enrollments: 1.10,
    dau: 1.15, mau: 1.08, stickiness: 1.10, sessionFrequency: 1.20,
    agentInteractionRate: 1.40, avgSessionDuration: 1.15,
    d1Retention: 0.88, d7Retention: 0.84, d30Retention: 0.78, churnRate: 1.25,
    greenZone: 0.55, yellowZone: 1.15, redZone: 1.95,
    budgetAdherence: 0.48, overdraftPrevention: 0.42, paycheckSurvival: 0.55,
    dormantReactivation: 1.25, sessionLift: 1.35,
    completionRate: 0.82, planAcceptanceRate: 0.78,
  },
  'mid-low': {
    impressions: 1.02, clicks: 1.05, enrollments: 1.05,
    dau: 1.08, mau: 1.04, stickiness: 1.05, sessionFrequency: 1.08,
    agentInteractionRate: 1.15, avgSessionDuration: 1.05,
    d1Retention: 0.95, d7Retention: 0.92, d30Retention: 0.90, churnRate: 1.08,
    greenZone: 0.82, yellowZone: 1.10, redZone: 1.35,
    budgetAdherence: 0.78, overdraftPrevention: 0.72, paycheckSurvival: 0.80,
    dormantReactivation: 1.08, sessionLift: 1.12,
    completionRate: 0.95, planAcceptanceRate: 0.92,
  },
  'mid': {
    impressions: 0.95, clicks: 0.92, enrollments: 1.02,
    dau: 0.92, mau: 0.95, stickiness: 0.98, sessionFrequency: 0.90,
    agentInteractionRate: 0.85, avgSessionDuration: 0.92,
    d1Retention: 1.05, d7Retention: 1.08, d30Retention: 1.12, churnRate: 0.88,
    greenZone: 1.20, yellowZone: 0.88, redZone: 0.60,
    budgetAdherence: 1.22, overdraftPrevention: 1.28, paycheckSurvival: 1.18,
    dormantReactivation: 0.90, sessionLift: 0.85,
    completionRate: 1.08, planAcceptanceRate: 1.10,
  },
  'high': {
    impressions: 0.78, clicks: 0.70, enrollments: 0.85,
    dau: 0.72, mau: 0.78, stickiness: 0.85, sessionFrequency: 0.68,
    agentInteractionRate: 0.55, avgSessionDuration: 0.75,
    d1Retention: 1.15, d7Retention: 1.20, d30Retention: 1.28, churnRate: 0.72,
    greenZone: 1.48, yellowZone: 0.62, redZone: 0.28,
    budgetAdherence: 1.52, overdraftPrevention: 1.55, paycheckSurvival: 1.45,
    dormantReactivation: 0.72, sessionLift: 0.65,
    completionRate: 1.15, planAcceptanceRate: 1.22,
  },

  // --- Gender ---
  'male': {
    impressions: 1.02, clicks: 0.95, enrollments: 0.98,
    dau: 0.98, mau: 1.00, stickiness: 0.96, sessionFrequency: 0.95,
    agentInteractionRate: 0.88, avgSessionDuration: 0.92,
    d1Retention: 0.97, d7Retention: 0.95, d30Retention: 0.94, churnRate: 1.05,
    greenZone: 0.95, yellowZone: 1.02, redZone: 1.08,
    budgetAdherence: 0.90, overdraftPrevention: 0.92, paycheckSurvival: 0.95,
    dormantReactivation: 1.02, sessionLift: 0.98,
    completionRate: 0.95, planAcceptanceRate: 0.92,
  },
  'female': {
    impressions: 0.98, clicks: 1.08, enrollments: 1.05,
    dau: 1.05, mau: 1.02, stickiness: 1.06, sessionFrequency: 1.08,
    agentInteractionRate: 1.15, avgSessionDuration: 1.10,
    d1Retention: 1.04, d7Retention: 1.06, d30Retention: 1.08, churnRate: 0.92,
    greenZone: 1.08, yellowZone: 0.96, redZone: 0.88,
    budgetAdherence: 1.12, overdraftPrevention: 1.10, paycheckSurvival: 1.08,
    dormantReactivation: 0.98, sessionLift: 1.04,
    completionRate: 1.06, planAcceptanceRate: 1.08,
  },
  'nonbinary': {
    impressions: 0.92, clicks: 1.05, enrollments: 0.95,
    dau: 1.02, mau: 0.98, stickiness: 1.04, sessionFrequency: 1.02,
    agentInteractionRate: 1.20, avgSessionDuration: 1.08,
    d1Retention: 1.00, d7Retention: 1.02, d30Retention: 1.00, churnRate: 1.00,
    greenZone: 0.98, yellowZone: 1.02, redZone: 1.02,
    budgetAdherence: 0.98, overdraftPrevention: 0.95, paycheckSurvival: 0.98,
    dormantReactivation: 1.05, sessionLift: 1.02,
    completionRate: 1.00, planAcceptanceRate: 0.98,
  },
};

/**
 * Get the multiplier for a specific metric key given the active demographic filters.
 * If 'all' is selected for a dimension, the multiplier is 1.0 (no change).
 * Multiple active filters are combined multiplicatively.
 */
export function getMultiplier(metricKey, filters) {
  let multiplier = 1.0;

  Object.values(filters).forEach(segmentId => {
    if (segmentId === 'all' || !segmentId) return;
    const profile = SEGMENT_PROFILES[segmentId];
    if (profile && profile[metricKey] !== undefined) {
      multiplier *= profile[metricKey];
    }
  });

  return multiplier;
}

/**
 * Apply demographic filter to a numeric value.
 */
export function applyFilter(value, metricKey, filters) {
  if (!filters) return value;
  const m = getMultiplier(metricKey, filters);
  if (typeof value === 'number') {
    return Number.isInteger(value) ? Math.round(value * m) : parseFloat((value * m).toFixed(2));
  }
  return value;
}

/**
 * Apply demographic filter to an array of monthly data.
 * Only modifies numeric fields that have a matching multiplier key.
 */
export function applyFilterToMonthly(monthly, metricKeys, filters) {
  if (!filters) return monthly;
  return monthly.map(row => {
    const newRow = { ...row };
    metricKeys.forEach(key => {
      if (typeof newRow[key] === 'number') {
        newRow[key] = applyFilter(newRow[key], key, filters);
      }
    });
    return newRow;
  });
}

/**
 * Check if an active demographic filter is applied (i.e., not all "all").
 */
export function isFilterActive(filters) {
  if (!filters) return false;
  return Object.values(filters).some(v => v && v !== 'all');
}
