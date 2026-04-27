// ═══════════════════════════════════════════════════════════
// METRIC DESCRIPTIONS — Tooltip definitions for ~90 KPIs
// ═══════════════════════════════════════════════════════════

const metricDescriptions = {
  // ── A1. Feature Discovery & Adoption ──
  impressionRate: {
    name: 'Impression Rate',
    description: 'Percentage of app users who were exposed to the Managed Finance feature promotion within a given period.',
    formula: 'Users Shown Promotion / Total App MAU × 100',
    target: '> 80%',
  },
  ctr: {
    name: 'Click-Through Rate (CTR)',
    description: 'Percentage of users who clicked on the feature promotion after seeing it. Measures initial interest in the feature.',
    formula: 'Clicks / Impressions × 100',
    target: '> 15%',
  },
  landingToEnrollment: {
    name: 'Landing → Enrollment Rate',
    description: 'Percentage of users who landed on the feature page and subsequently started the enrollment process.',
    formula: 'Enrollment Starts / Landing Page Views × 100',
    target: '> 40%',
  },
  overallAdoption: {
    name: 'Overall Adoption Rate',
    description: 'End-to-end conversion rate from feature impression to becoming an active user. The ultimate funnel metric.',
    formula: 'Active Users / Total Impressions × 100',
    target: '> 20%',
  },
  timeToDiscovery: {
    name: 'Time to Discovery',
    description: 'Average number of app sessions before a user first encounters the Managed Finance feature promotion.',
    formula: 'Avg sessions before first impression',
    target: '< 5 sessions',
  },

  // ── A2. Onboarding Funnel ──
  onboardingStartRate: {
    name: 'Onboarding Start Rate',
    description: 'Percentage of users who clicked through the promotion and actually started the onboarding flow.',
    formula: 'Onboarding Starts / Click-throughs × 100',
    target: '> 60%',
  },
  completionRate: {
    name: 'Onboarding Completion Rate',
    description: 'Percentage of users who started onboarding and completed all steps including plan acceptance.',
    formula: 'Completed Onboarding / Started Onboarding × 100',
    target: '> 70%',
  },
  accountLinkSuccess: {
    name: 'Account Link Success Rate',
    description: 'Percentage of users who successfully linked their bank account during onboarding. Critical step for feature functionality.',
    formula: 'Successful Links / Link Attempts × 100',
    target: '> 85%',
  },
  timeToComplete: {
    name: 'Time to Complete Onboarding',
    description: 'Average time in minutes from starting onboarding to completing all steps.',
    formula: 'Avg(completion_timestamp - start_timestamp)',
    target: '< 3 minutes',
  },
  planAcceptanceRate: {
    name: 'Plan Acceptance Rate',
    description: 'Percentage of users who received a financial plan and accepted it. Indicates plan quality and relevance.',
    formula: 'Accepted Plans / Generated Plans × 100',
    target: '> 55%',
  },
  ttfv: {
    name: 'Time to First Value (TTFV)',
    description: 'Time in minutes from starting onboarding until the user performs their first meaningful action (e.g., views plan, interacts with agent).',
    formula: 'First meaningful action timestamp - onboarding start',
    target: '< 5 minutes',
  },
  retryRate: {
    name: 'Retry Rate',
    description: 'Percentage of users who failed a step and retried. High retry rates indicate friction points.',
    formula: 'Users with retries / Total users × 100',
    target: 'Monitor (< 10%)',
  },

  // ── A3. Engagement ──
  currentDAU: {
    name: 'Daily Active Users (DAU)',
    description: 'Number of unique users who opened the Managed Finance feature at least once in the past 24 hours.',
    formula: 'Count(distinct user_id) where last_activity within 24h',
    target: 'Growing MoM',
  },
  currentMAU: {
    name: 'Monthly Active Users (MAU)',
    description: 'Number of unique users who used the Managed Finance feature at least once in the past 30 days.',
    formula: 'Count(distinct user_id) where last_activity within 30d',
    target: 'Growing MoM',
  },
  stickiness: {
    name: 'Stickiness (DAU/MAU)',
    description: 'Ratio of daily to monthly active users. Higher values indicate users return frequently, suggesting strong habit formation.',
    formula: 'DAU / MAU × 100',
    target: '> 25%',
  },
  avgSessionFrequency: {
    name: 'Avg Session Frequency',
    description: 'Average number of times a user opens the feature per week.',
    formula: 'Total sessions / Unique users / Weeks',
    target: '> 3x/week',
  },
  avgSessionDuration: {
    name: 'Avg Session Duration',
    description: 'Average time in minutes spent per session within the Managed Finance feature.',
    formula: 'Total time / Total sessions',
    target: '2-5 minutes',
  },
  agentInteractionRate: {
    name: 'Agent Interaction Rate',
    description: 'Percentage of sessions where the user interacted with at least one AI agent.',
    formula: 'Sessions with agent interaction / Total sessions × 100',
    target: '> 20%',
  },
  depthScore: {
    name: 'Feature Depth Score',
    description: 'Composite score (0-100) measuring how many sub-features a user engages with in a session. Higher scores indicate broader feature exploration.',
    formula: 'Weighted avg of sub-features used per session',
    target: '> 60',
  },
  notificationEngagement: {
    name: 'Notification Engagement Rate',
    description: 'Percentage of push notifications or in-app alerts that resulted in the user opening the feature.',
    formula: 'Notification opens / Notifications sent × 100',
    target: '> 25%',
  },

  // ── A4. Retention & Churn ──
  d1Retention: {
    name: 'Day 1 Retention',
    description: 'Percentage of new users who return to the feature on the day after their first use.',
    formula: 'Users active on Day 1 / Cohort size × 100',
    target: '> 65%',
  },
  d7Retention: {
    name: 'Day 7 Retention',
    description: 'Percentage of new users who return to the feature within 7 days of first use.',
    formula: 'Users active on Day 7 / Cohort size × 100',
    target: '> 45%',
  },
  d30Retention: {
    name: 'Day 30 Retention',
    description: 'Percentage of new users who return to the feature within 30 days. Key indicator of long-term value.',
    formula: 'Users active on Day 30 / Cohort size × 100',
    target: '> 30%',
  },
  d90Retention: {
    name: 'Day 90 Retention',
    description: 'Percentage of new users still active after 90 days. Indicates strong product-market fit.',
    formula: 'Users active on Day 90 / Cohort size × 100',
    target: '> 18%',
  },
  currentChurnRate: {
    name: 'Monthly Churn Rate',
    description: 'Percentage of active users who stopped using the feature in a given month (no activity for 14+ days).',
    formula: 'Churned users / Active users at period start × 100',
    target: '< 8%',
  },
  reactivationRate: {
    name: 'Reactivation Rate',
    description: 'Percentage of previously churned users who returned to the feature. Measures win-back effectiveness.',
    formula: 'Reactivated users / Total churned users × 100',
    target: '> 12%',
  },
  avgTimeToChurn: {
    name: 'Avg Time to Churn',
    description: 'Average number of days from a user\'s last activity before they churn. Increasing trend is positive.',
    formula: 'Avg(churn_date - last_active_date)',
    target: 'Increasing',
  },

  // ── A5. Financial Health Outcomes ──
  greenZonePct: {
    name: 'Green Zone Users %',
    description: 'Percentage of users in a financially healthy state. Green zone = positive cash flow, savings on track, bills current.',
    formula: 'Users in green zone / Total users × 100',
    target: '> 50%',
  },
  redToGreenRate: {
    name: 'Red → Green Transition Rate',
    description: 'Percentage of users who moved from financial distress (red zone) to healthy (green zone) within 30 days.',
    formula: 'Users transitioned R→G / Users in red zone × 100',
    target: '> 40%',
  },
  redToGreenDays: {
    name: 'Red → Green Avg Days',
    description: 'Average number of days it takes a user to move from red zone to green zone.',
    formula: 'Avg(green_zone_date - red_zone_start_date)',
    target: '< 10 days',
  },
  budgetAdherence: {
    name: 'Budget Adherence Rate',
    description: 'Percentage of users staying within their assigned budget plan each month.',
    formula: 'Users within budget / Users with plans × 100',
    target: '> 50%',
  },
  savingsImprovement30d: {
    name: 'Savings Improvement (30d)',
    description: 'Average percentage increase in user savings rate over 30 days of using the feature.',
    formula: 'Avg((savings_rate_now - savings_rate_start) / savings_rate_start × 100)',
    target: '> 2%',
  },
  savingsImprovement90d: {
    name: 'Savings Improvement (90d)',
    description: 'Average percentage increase in user savings rate over 90 days.',
    formula: 'Same as 30d but over 90-day window',
    target: '> 5%',
  },
  overdraftPrevention: {
    name: 'Overdraft Prevention Rate',
    description: 'Percentage of potential overdraft situations prevented by the feature\'s alerts and money movement recommendations.',
    formula: 'Prevented overdrafts / (Prevented + Actual overdrafts) × 100',
    target: '> 70%',
  },
  paycheckSurvival: {
    name: 'Paycheck Survival Rate',
    description: 'Percentage of users who maintain a positive balance until their next paycheck. Core success metric for the target audience.',
    formula: 'Users with positive balance at paycheck / Total users × 100',
    target: '> 80%',
  },
  financialConfidence: {
    name: 'Financial Confidence Score',
    description: 'Self-reported score (1-10) from periodic surveys measuring how confident users feel about their finances.',
    formula: 'Avg survey score',
    target: '> 6.5/10',
  },

  // ── A6. Platform-Level Impact ──
  dormantReactivation: {
    name: 'Dormant User Reactivation',
    description: 'Percentage of previously inactive banking app users (30+ days dormant) who returned and enrolled in Managed Finance.',
    formula: 'Reactivated dormant users / Total dormant users exposed × 100',
    target: '> 5%',
  },
  sessionLift: {
    name: 'Session Lift',
    description: 'Percentage increase in overall app sessions for users who enrolled in Managed Finance vs. their pre-enrollment baseline.',
    formula: '(Post-enrollment sessions - Pre-enrollment sessions) / Pre × 100',
    target: '> 20%',
  },
  crossFeature: {
    name: 'Cross-Feature Engagement',
    description: 'Percentage of Managed Finance users who also actively use other banking app features (bill pay, transfers, etc.).',
    formula: 'MF users using 2+ other features / Total MF users × 100',
    target: '> 25%',
  },
  retentionDelta: {
    name: 'Retention Delta',
    description: 'Difference in 30-day retention between enrolled and non-enrolled users. Measures incremental impact.',
    formula: 'Enrolled 30d retention - Non-enrolled 30d retention',
    target: '> 15 pts',
  },
  npsDelta: {
    name: 'NPS Delta',
    description: 'Difference in Net Promoter Score between enrolled and non-enrolled users.',
    formula: 'Enrolled NPS - Non-enrolled NPS',
    target: '> 15 pts',
  },
  ticketDeflection: {
    name: 'Support Ticket Deflection',
    description: 'Percentage reduction in support tickets for enrolled users compared to non-enrolled baseline.',
    formula: '(Non-enrolled tickets - Enrolled tickets) / Non-enrolled × 100',
    target: '> 50%',
  },
  viralCoefficient: {
    name: 'Viral Coefficient',
    description: 'Average number of new users each existing user refers. Values > 1.0 indicate viral growth.',
    formula: 'Total referral conversions / Total users',
    target: '> 0.1',
  },

  // ── B1. System-Level Agent Metrics ──
  totalInteractions: {
    name: 'Total Agent Interactions',
    description: 'Total number of individual messages exchanged between users and all AI agents combined.',
    formula: 'Sum of all agent messages',
    target: 'Growing MoM',
  },
  totalSessions: {
    name: 'Total Agent Sessions',
    description: 'Total number of distinct conversation sessions across all agents.',
    formula: 'Count(distinct session_id)',
    target: 'Growing MoM',
  },
  avgTurns: {
    name: 'Average Turns per Session',
    description: 'Average number of message exchanges (user + agent) per conversation session.',
    formula: 'Total turns / Total sessions',
    target: '3-6 turns',
  },
  latencyP50: {
    name: 'Latency P50',
    description: 'Median response time from receiving a user message to delivering the agent\'s complete response.',
    formula: '50th percentile of response times',
    target: '< 800ms',
  },
  latencyP95: {
    name: 'Latency P95',
    description: '95th percentile response time. Captures tail latency that affects 1-in-20 users.',
    formula: '95th percentile of response times',
    target: '< 3000ms',
  },
  latencyP99: {
    name: 'Latency P99',
    description: '99th percentile response time. Critical for SLA compliance and worst-case user experience.',
    formula: '99th percentile of response times',
    target: '< 5000ms',
  },
  ttft: {
    name: 'Time to First Token (TTFT)',
    description: 'Time from receiving user input to streaming the first token of the response. Affects perceived responsiveness.',
    formula: 'First token timestamp - request timestamp',
    target: '< 500ms',
  },
  taskCompletion: {
    name: 'Task Completion Rate',
    description: 'Percentage of user queries that the agent successfully resolved without escalation or user abandonment.',
    formula: 'Resolved queries / Total queries × 100',
    target: '> 85%',
  },
  satisfaction: {
    name: 'User Satisfaction Rate',
    description: 'Percentage of interactions rated positively (thumbs up or 4-5 stars) by users.',
    formula: 'Positive ratings / Total ratings × 100',
    target: '> 80%',
  },
  escalationRate: {
    name: 'Escalation Rate',
    description: 'Percentage of conversations requiring escalation to a human agent or supervisor flow.',
    formula: 'Escalated sessions / Total sessions × 100',
    target: '< 8%',
  },
  errorRate: {
    name: 'Agent Error Rate',
    description: 'Percentage of responses that contained errors (tool failures, invalid responses, timeouts).',
    formula: 'Error responses / Total responses × 100',
    target: '< 1%',
  },

  // ── B2. RAG Agent ──
  retrievalPrecision: {
    name: 'Retrieval Precision',
    description: 'Percentage of retrieved knowledge base chunks that were actually relevant to the user\'s query.',
    formula: 'Relevant chunks retrieved / Total chunks retrieved × 100',
    target: '> 85%',
  },
  retrievalRecall: {
    name: 'Retrieval Recall',
    description: 'Percentage of all relevant knowledge base chunks that were successfully retrieved.',
    formula: 'Relevant chunks retrieved / Total relevant chunks × 100',
    target: '> 75%',
  },
  faithfulness: {
    name: 'Faithfulness Score',
    description: 'Measures whether the generated response is factually grounded in the retrieved context. Scale 0-1.',
    formula: 'Claims supported by context / Total claims in response',
    target: '> 0.90',
  },
  answerRelevancy: {
    name: 'Answer Relevancy',
    description: 'How well the agent\'s response addresses the user\'s actual question. Scale 0-1.',
    formula: 'Semantic similarity(response, query)',
    target: '> 0.85',
  },
  hallucinationRate: {
    name: 'Hallucination Rate',
    description: 'Percentage of responses containing statements not supported by the retrieved context or knowledge base.',
    formula: 'Responses with hallucinations / Total responses × 100',
    target: '< 5%',
  },
  kbCoverage: {
    name: 'Knowledge Base Coverage',
    description: 'Percentage of user queries that find relevant matches in the knowledge base.',
    formula: 'Queries with KB matches / Total queries × 100',
    target: '> 80%',
  },
  citationAccuracy: {
    name: 'Citation Accuracy',
    description: 'Percentage of cited sources that correctly support the claims made in the response.',
    formula: 'Correct citations / Total citations × 100',
    target: '> 95%',
  },

  // ── B3. Transaction Agent ──
  queryUnderstanding: {
    name: 'Query Understanding Rate',
    description: 'Percentage of transaction queries where the agent correctly identified the user\'s intent and entities (date, category, amount).',
    formula: 'Correct intent + entity extraction / Total queries × 100',
    target: '> 90%',
  },
  dataRetrieval: {
    name: 'Data Retrieval Accuracy',
    description: 'Percentage of times the agent retrieved the correct transaction data matching the user\'s query.',
    formula: 'Correct data responses / Total data queries × 100',
    target: '> 95%',
  },
  temporalReasoning: {
    name: 'Temporal Reasoning Accuracy',
    description: 'Accuracy of the agent when handling time-based queries ("last month", "past 2 weeks", "compared to January").',
    formula: 'Correct temporal interpretations / Total temporal queries × 100',
    target: '> 85%',
  },
  aggregationAccuracy: {
    name: 'Aggregation Accuracy',
    description: 'Accuracy of computed totals, averages, and breakdowns across transaction data.',
    formula: 'Correct aggregations / Total aggregation queries × 100',
    target: '> 95%',
  },
  responseCompleteness: {
    name: 'Response Completeness',
    description: 'Percentage of responses that include all requested data points without requiring follow-up.',
    formula: 'Complete responses / Total responses × 100',
    target: '> 85%',
  },
  toolCallSuccess: {
    name: 'Tool Call Success Rate',
    description: 'Percentage of API/tool calls made by the agent that completed successfully.',
    formula: 'Successful tool calls / Total tool calls × 100',
    target: '> 98%',
  },
  multiStepSuccess: {
    name: 'Multi-Step Query Success',
    description: 'Percentage of complex queries requiring multiple tool calls that were resolved correctly.',
    formula: 'Correct multi-step resolutions / Total multi-step queries × 100',
    target: '> 80%',
  },

  // ── B4. Chit-chat Agent ──
  coherence: {
    name: 'Conversation Coherence',
    description: 'Score (0-1) measuring how logically consistent the agent\'s responses are across a multi-turn conversation.',
    formula: 'Semantic coherence model score',
    target: '> 0.85',
  },
  navigationSuccess: {
    name: 'Navigation Success Rate',
    description: 'Percentage of times the agent successfully guided users to the correct app feature or section.',
    formula: 'Successful navigations / Navigation requests × 100',
    target: '> 85%',
  },
  personalityConsistency: {
    name: 'Personality Consistency',
    description: 'Score (0-1) measuring how consistent the agent\'s tone and personality remain across conversations.',
    formula: 'Tone consistency model score',
    target: '> 0.90',
  },
  containmentRate: {
    name: 'Containment Rate',
    description: 'Percentage of conversations fully resolved by the chit-chat agent without needing to hand off to another agent.',
    formula: 'Self-contained sessions / Total sessions × 100',
    target: '> 70%',
  },
  motivationalImpact: {
    name: 'Motivational Impact',
    description: 'Percentage increase in user engagement within 24 hours after receiving motivational or coaching messages.',
    formula: '(Post-coaching activity - Baseline activity) / Baseline × 100',
    target: '> 10%',
  },
  handoffAccuracy: {
    name: 'Handoff Accuracy',
    description: 'Percentage of times the chit-chat agent correctly identified when to hand off to a specialized agent.',
    formula: 'Correct handoffs / Total handoffs × 100',
    target: '> 90%',
  },

  // ── B5. Multi-Agent Coordination ──
  routingAccuracy: {
    name: 'Routing Accuracy',
    description: 'Percentage of user queries correctly routed to the appropriate specialized agent on the first attempt.',
    formula: 'Correct routes / Total routes × 100',
    target: '> 92%',
  },
  misrouteRate: {
    name: 'Misroute Rate',
    description: 'Percentage of queries initially sent to the wrong agent, requiring re-routing.',
    formula: 'Misrouted queries / Total queries × 100',
    target: '< 5%',
  },
  handoffSuccess: {
    name: 'Handoff Success Rate',
    description: 'Percentage of inter-agent handoffs that maintained conversation context and user intent.',
    formula: 'Successful handoffs / Total handoffs × 100',
    target: '> 90%',
  },
  contextPreservation: {
    name: 'Context Preservation',
    description: 'Percentage of information preserved when context is transferred between agents during a handoff.',
    formula: 'Preserved context items / Total context items × 100',
    target: '> 85%',
  },
  roleAdherence: {
    name: 'Role Adherence',
    description: 'Percentage of responses where each agent stayed within its defined role boundaries.',
    formula: 'In-role responses / Total responses × 100',
    target: '> 92%',
  },
  loopDetections: {
    name: 'Loop Detections',
    description: 'Number of times the orchestrator detected and broke infinite routing loops between agents.',
    formula: 'Count(loop_detection_events)',
    target: '0',
  },
  avgAgentsPerSession: {
    name: 'Avg Agents per Session',
    description: 'Average number of distinct agents involved in a single user session.',
    formula: 'Sum(agents_per_session) / Total sessions',
    target: '1.2-1.5',
  },
  crossAgentResolution: {
    name: 'Cross-Agent Resolution Time',
    description: 'Average number of agent switches needed to resolve a complex query.',
    formula: 'Avg switches for multi-agent sessions',
    target: '< 2',
  },
  orchestratorLatency: {
    name: 'Orchestrator Latency',
    description: 'Time in milliseconds for the orchestrator to make a routing decision.',
    formula: 'Avg(routing_decision_time)',
    target: '< 100ms',
  },

  // ── B6. Safety & Governance ──
  guardrailTriggerRate: {
    name: 'Guardrail Trigger Rate',
    description: 'Percentage of agent responses that triggered a safety guardrail (blocked, modified, or flagged).',
    formula: 'Triggered responses / Total responses × 100',
    target: '< 2%',
  },
  piiDetectionRate: {
    name: 'PII Detection Rate',
    description: 'Percentage of PII (SSN, account numbers, etc.) in user queries that was successfully detected and redacted.',
    formula: 'Detected PII instances / Total PII instances × 100',
    target: '> 99.5%',
  },
  piiLeakageIncidents: {
    name: 'PII Leakage Incidents',
    description: 'Number of incidents where PII was accidentally included in an agent response.',
    formula: 'Count(PII leakage events)',
    target: '0',
  },
  promptInjectionDetection: {
    name: 'Prompt Injection Detection',
    description: 'Percentage of prompt injection attempts that were successfully detected and blocked.',
    formula: 'Detected injections / Total injection attempts × 100',
    target: '> 95%',
  },
  toxicContentRate: {
    name: 'Toxic Content Rate',
    description: 'Percentage of agent responses flagged for inappropriate, offensive, or harmful content.',
    formula: 'Toxic responses / Total responses × 100',
    target: '< 0.1%',
  },
  complianceScore: {
    name: 'Compliance Score',
    description: 'Composite score (0-100%) measuring adherence to financial regulatory requirements and content policies.',
    formula: 'Weighted compliance checks passed / Total checks × 100',
    target: '> 98%',
  },
  jailbreakAttempts: {
    name: 'Jailbreak Attempts',
    description: 'Number of user attempts to bypass agent instructions or safety guardrails.',
    formula: 'Count(detected jailbreak patterns)',
    target: 'Monitor',
  },
  authorizationRate: {
    name: 'Authorization Rate',
    description: 'Percentage of data access requests that were properly authorized before execution.',
    formula: 'Authorized requests / Total data requests × 100',
    target: '100%',
  },
  auditCompleteness: {
    name: 'Audit Trail Completeness',
    description: 'Percentage of agent interactions that have a complete, searchable audit log entry.',
    formula: 'Logged interactions / Total interactions × 100',
    target: '> 99.5%',
  },

  // ── B7. Cost & Efficiency ──
  totalTokens: {
    name: 'Total Token Usage',
    description: 'Total number of LLM tokens consumed across all agents (input + output) in a given period.',
    formula: 'Sum(input_tokens + output_tokens)',
    target: 'Monitor',
  },
  totalCost: {
    name: 'Total Monthly Cost',
    description: 'Total infrastructure and API cost for running all AI agents in a given month.',
    formula: 'Sum(LLM cost + compute + storage)',
    target: '< $2,000/mo',
  },
  costPerConversation: {
    name: 'Cost per Conversation',
    description: 'Average total cost to serve one complete user conversation session.',
    formula: 'Total cost / Total sessions',
    target: '< $0.05',
  },
  costPerResolvedQuery: {
    name: 'Cost per Resolved Query',
    description: 'Average cost for each successfully resolved user query (excludes escalated/failed).',
    formula: 'Total cost / Resolved queries',
    target: '< $0.08',
  },
  costPerUser: {
    name: 'Cost per Active User',
    description: 'Monthly cost per active user. Key unit economics metric.',
    formula: 'Total monthly cost / MAU',
    target: '< $1.50',
  },
  budgetUtilization: {
    name: 'Budget Utilization',
    description: 'Percentage of the allocated monthly AI budget currently consumed.',
    formula: 'Actual spend / Budget allocation × 100',
    target: '< 90%',
  },
  cacheHitRate: {
    name: 'Cache Hit Rate',
    description: 'Percentage of queries served from cache rather than making a new LLM call. Higher = lower cost.',
    formula: 'Cached responses / Total responses × 100',
    target: '> 15%',
  },
  modelCallEfficiency: {
    name: 'Model Call Efficiency',
    description: 'Average number of LLM API calls required to resolve a single user query. Lower is more efficient.',
    formula: 'Total LLM calls / Total queries',
    target: '< 3',
  },
};

export default metricDescriptions;
