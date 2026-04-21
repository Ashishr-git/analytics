# Managed Finance: Product & Agentic Analytics Metrics Framework

> **Product**: Managed Finance — A financial wellness feature embedded within an existing banking application
> **Target Users**: Young adults (18-24) living paycheck-to-paycheck
> **Core Value Proposition**: Proactive financial management to help users survive between paychecks ("red zone" → "green zone")
> **Version**: 1.0 | April 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Context & Assumptions](#2-product-context--assumptions)
3. [Section A — Product Analytics Metrics](#3-section-a--product-analytics-metrics)
   - A1. Feature Discovery & Adoption
   - A2. Onboarding Funnel
   - A3. Engagement
   - A4. Retention & Churn
   - A5. Financial Health Outcomes
   - A6. Platform-Level Impact
4. [Section B — Agentic AI Analytics Metrics](#4-section-b--agentic-ai-analytics-metrics)
   - B1. System-Level Agent Metrics
   - B2. RAG Agent (Financial Knowledge)
   - B3. Transaction Agent
   - B4. Chit-chat Agent
   - B5. Multi-Agent Coordination
   - B6. Safety & Governance
   - B7. Cost & Efficiency
5. [Instrumentation Strategy](#5-instrumentation-strategy)
6. [Alerting & Thresholds](#6-alerting--thresholds)
7. [Reporting Cadence](#7-reporting-cadence)

---

## 1. Executive Summary

This document defines the comprehensive metrics framework for the **Managed Finance** feature — a financial wellness capability embedded within an existing banking application. It covers two distinct domains:

- **Product Analytics**: Measuring how users discover, adopt, engage with, and benefit from the Managed Finance feature
- **Agentic AI Analytics**: Measuring the performance, quality, safety, and cost of the multi-agent AI system (RAG, Transaction, and Chit-chat agents) that powers the intelligent aspects of the feature

The framework serves as the single source of truth for KPI definitions, measurement methodology, target thresholds, and alerting strategy.

---

## 2. Product Context & Assumptions

### Key Context

- Managed Finance is a **feature within an existing banking app** — users already have accounts and use the core banking product
- The feature is surfaced to users via in-app banners, notifications, navigation links, and contextual prompts (e.g., when balance drops below a threshold)
- Users must **enroll** in the feature — enrollment involves linking their existing accounts and setting up their financial profile
- The feature includes an **AI-powered multi-agent system** with three specialized agents

### User Journey (Within Existing App)

```
Existing App User
    → Sees Feature Promotion (Banner / Notification / Nav Link)
    → Clicks Through to Feature Landing
    → Begins Enrollment / Onboarding
    → System Analyzes Financial State
    → Receives Personalized Plan
    → Accepts Plan → Enters Active Dashboard
    → Interacts with AI Agents for Guidance
    → Manages Money (Transfers, Bill Pay, etc.)
    → Achieves Green Zone Financial Health
```

### User Segments

| Segment | Definition |
|---------|-----------|
| **Active App Users** | Users regularly using the core banking app (≥1 session/week) |
| **Dormant App Users** | Users who haven't used the core banking app in 30+ days |
| **Feature-Aware** | Users who have been exposed to the Managed Finance promotion |
| **Feature-Enrolled** | Users who have completed Managed Finance onboarding |
| **Feature-Active** | Enrolled users who interact with Managed Finance ≥1x/week |

---

## 3. Section A — Product Analytics Metrics

### A1. Feature Discovery & Adoption

These metrics measure how effectively the Managed Finance feature is being surfaced to existing app users and whether it drives interest and enrollment.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| A1.1 | **Feature Impression Rate** | % of active app users who see the Managed Finance promotion (banner, notification, nav link) | `Users who saw promotion / Total active app users` | > 80% | Daily |
| A1.2 | **Feature Click-Through Rate (CTR)** | % of users who click on the promotion after seeing it | `Users who clicked / Users who saw promotion` | > 15% | Daily |
| A1.3 | **Feature Landing-to-Enrollment Rate** | % of users who start enrollment after reaching the feature landing page | `Users who started enrollment / Users who reached landing page` | > 40% | Daily |
| A1.4 | **Overall Feature Adoption Rate** | % of total active app users who have enrolled in Managed Finance | `Total enrolled users / Total active app users` | Growing, target 30% at 6 months | Weekly |
| A1.5 | **Promotion Channel Effectiveness** | CTR and enrollment rate broken down by discovery channel | Per-channel breakdown (banner, push notification, in-app prompt, contextual trigger) | Identify top channel | Weekly |
| A1.6 | **Time to Discovery** | Avg days from user's first app session to first feature impression | `Avg(first impression date - first app session date)` | Decreasing | Monthly |
| A1.7 | **Contextual Trigger Effectiveness** | Enrollment rate for users who saw the feature via a contextual trigger (e.g., low balance alert) vs. passive promotion | Segment comparison | Contextual > Passive | Weekly |

### A2. Onboarding Funnel

Once a user decides to enroll, these metrics track the onboarding completion and quality.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| A2.1 | **Onboarding Start Rate** | % of feature landing visitors who begin the onboarding flow | `Started onboarding / Visited landing page` | > 50% | Daily |
| A2.2 | **Onboarding Completion Rate** | % of users who complete the full onboarding | `Completed onboarding / Started onboarding` | > 70% | Daily |
| A2.3 | **Step-by-Step Drop-off** | Drop-off rate at each onboarding step | Per-step funnel analysis | Identify worst step | Daily |
| A2.4 | **Account Linking Success Rate** | % of users who successfully link their bank accounts during onboarding | `Successful links / Attempted links` | > 85% | Daily |
| A2.5 | **Time to Complete Onboarding** | Avg time from onboarding start to completion | Median time | < 3 minutes | Weekly |
| A2.6 | **Plan Acceptance Rate** | % of users who accept the initial suggested financial plan | `Plans accepted / Plans shown` | > 55% | Daily |
| A2.7 | **Time to First Value (TTFV)** | Time from enrollment start to first meaningful interaction (plan acceptance or first money movement) | Median time | < 5 minutes | Weekly |
| A2.8 | **Onboarding Retry Rate** | % of users who abandon onboarding but return to try again | `Retry users / Abandoned users` | Monitor | Weekly |

### A3. Engagement

These metrics measure how deeply and frequently enrolled users interact with the Managed Finance feature.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| A3.1 | **Feature DAU / Feature MAU (Stickiness)** | Daily active users of the feature vs. monthly active users | `Feature DAU / Feature MAU` | > 25% | Daily |
| A3.2 | **Feature Session Frequency** | Avg number of Managed Finance sessions per user per week | Mean sessions/user/week | > 4 | Weekly |
| A3.3 | **Feature Session Duration** | Avg time spent in Managed Finance per session | Median duration | 2-5 minutes | Daily |
| A3.4 | **Core Feature Usage Distribution** | Breakdown of which sub-features are used most | % of sessions using: Dashboard, Money Movement, Agent Chat, Analytics, Plan Review | Balanced distribution | Weekly |
| A3.5 | **Money Movement Frequency** | Avg money movements (transfers, bill pay) per active user per month | Mean transactions/user/month | > 3 | Monthly |
| A3.6 | **Money Movement Volume** | Total $ moved through the feature per period | Sum of all transaction amounts | Growing | Monthly |
| A3.7 | **Agent Interaction Rate** | % of feature sessions that include at least one AI agent interaction | `Sessions with agent / Total feature sessions` | > 20% | Daily |
| A3.8 | **Plan Review Frequency** | How often users check their financial plan/budget status | Mean views/user/week | > 3 | Weekly |
| A3.9 | **Notification Engagement Rate** | % of Managed Finance push notifications opened | `Opened / Sent` | > 25% | Daily |
| A3.10 | **Depth of Engagement Score** | Composite score based on features used, frequency, and duration | Weighted composite | Increasing | Weekly |

### A4. Retention & Churn

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| A4.1 | **Feature D1 Retention** | % of enrolled users who return to the feature on Day 1 | Cohort analysis | > 60% | Daily |
| A4.2 | **Feature D7 Retention** | % of enrolled users who return within 7 days | Cohort analysis | > 45% | Weekly |
| A4.3 | **Feature D30 Retention** | % of enrolled users who return within 30 days | Cohort analysis | > 30% | Monthly |
| A4.4 | **Feature D60 / D90 Retention** | Longer-term retention cohorts | Cohort analysis | D60 > 22%, D90 > 18% | Monthly |
| A4.5 | **Feature Churn Rate** | % of active feature users who stop using Managed Finance in a given month (no session in 14+ days) | `Churned users / Active users at start of period` | < 8% | Monthly |
| A4.6 | **Churn Reason Analysis** | Categorized reasons for churn (survey, behavioral inference) | Qualitative + behavioral | Actionable insights | Monthly |
| A4.7 | **Feature Reactivation Rate** | % of churned feature users who return to using the feature | `Reactivated / Previously churned` | > 12% | Monthly |
| A4.8 | **Time to Churn** | Avg days from enrollment to churn for users who churn | Survival analysis | Increasing | Monthly |
| A4.9 | **Cohort Retention Curve** | Retention trend by enrollment cohort over time | Cohort heatmap | Newer cohorts improving | Monthly |

### A5. Financial Health Outcomes

These metrics measure whether the feature is actually achieving its core mission — helping users stay financially healthy.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| A5.1 | **% Users in Green Zone** | Users whose current financial status is healthy (on-track to make it to next paycheck with buffer) | `Green zone users / Total active feature users` | > 60% | Daily |
| A5.2 | **% Users in Yellow Zone** | Users at risk of running out before payday | Zone classification | < 25% | Daily |
| A5.3 | **% Users in Red Zone** | Users projected to run out before payday | Zone classification | < 15%, decreasing | Daily |
| A5.4 | **Red→Green Conversion Rate** | % of users who move from Red to Green zone within a pay cycle | `Converted users / Users who started in Red` | > 40% | Per pay cycle |
| A5.5 | **Red→Green Conversion Time** | Avg days for a user to move from Red to Green | Median days | Decreasing | Monthly |
| A5.6 | **Budget Adherence Rate** | % of users staying within their suggested daily spending limit | `Adherent days / Total days` across users | > 50% | Weekly |
| A5.7 | **Savings Rate Improvement** | Change in user's savings rate after 30/60/90 days of using the feature | `(Savings rate at Dn) - (Savings rate at D0)` | Positive delta | Monthly |
| A5.8 | **Overdraft Prevention Rate** | % of potential overdrafts avoided because the feature alerted the user in advance | `Prevented overdrafts / (Prevented + Actual overdrafts)` | > 70% | Monthly |
| A5.9 | **Paycheck Survival Rate** | % of users who successfully make it to their next paycheck without going negative | `Survived / Total active users` | > 80% | Per pay cycle |
| A5.10 | **Financial Confidence Score (Survey)** | Self-reported financial confidence (1-10 scale) before and after using the feature | Survey delta | Improving | Quarterly |

### A6. Platform-Level Impact

These metrics measure whether the Managed Finance feature is driving broader value for the banking platform itself.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| A6.1 | **Dormant User Reactivation Rate** | % of dormant app users (no activity in 30+ days) who return to the app specifically because of Managed Finance promotion | `Dormant users reactivated via feature / Total dormant users exposed` | > 5% | Monthly |
| A6.2 | **Platform Session Lift** | Increase in overall app sessions attributable to Managed Finance users vs. non-enrolled users | `(Avg sessions for enrolled) - (Avg sessions for non-enrolled)` | Positive lift | Monthly |
| A6.3 | **Cross-Feature Engagement** | Whether Managed Finance users use more core banking features (deposits, transfers, card management) than non-users | Feature usage comparison | Higher for enrolled | Monthly |
| A6.4 | **Platform Retention Impact** | Comparison of overall app retention rates between enrolled vs. non-enrolled users | Retention delta | Enrolled > Non-enrolled | Monthly |
| A6.5 | **NPS Impact** | NPS score of enrolled users vs. non-enrolled users | Score comparison | Enrolled higher | Quarterly |
| A6.6 | **Support Ticket Deflection** | Reduction in finance-related support tickets from Managed Finance users (handled by AI agents instead) | `Ticket reduction % for enrolled users` | > 20% reduction | Monthly |
| A6.7 | **Viral / Referral Signal** | % of enrolled users who share or refer the feature to others | `Sharers / Enrolled users` | > 8% | Monthly |

---

## 4. Section B — Agentic AI Analytics Metrics

### B1. System-Level Agent Metrics (All Agents)

These metrics provide the aggregate view of the multi-agent system's health and performance.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B1.1 | **Total Agent Interactions** | Total number of user ↔ agent messages exchanged | Count of messages | Track trend | Daily |
| B1.2 | **Total Agent Sessions** | Number of distinct agent conversation sessions | Count of sessions | Track trend | Daily |
| B1.3 | **Avg Turns per Session** | Average number of back-and-forth turns in an agent session | `Total messages / Total sessions / 2` | 3-8 turns | Daily |
| B1.4 | **Agent Utilization Distribution** | % of interactions handled by each agent type | Per-agent % of total interactions | Balanced per design | Daily |
| B1.5 | **Response Latency — P50** | Median time from user query to complete agent response | Latency percentile | < 1.0s | Hourly |
| B1.6 | **Response Latency — P95** | 95th percentile response time | Latency percentile | < 3.0s | Hourly |
| B1.7 | **Response Latency — P99** | 99th percentile response time | Latency percentile | < 5.0s | Hourly |
| B1.8 | **Time to First Token (TTFT)** | Time from query submission to first token streamed back | Median TTFT | < 500ms | Hourly |
| B1.9 | **Overall Task Completion Rate** | % of agent sessions where the user's intent was successfully resolved | `Resolved sessions / Total sessions` | > 85% | Daily |
| B1.10 | **User Satisfaction Score** | Aggregate thumbs up/down or star rating across all agents | `Positive ratings / Total ratings` | > 80% positive | Daily |
| B1.11 | **Fallback / Escalation Rate** | % of interactions where the agent could not handle the query and escalated (to human or fallback response) | `Escalated / Total interactions` | < 8% | Daily |
| B1.12 | **Error Rate** | % of agent interactions that result in a system error (timeout, crash, API failure) | `Errored / Total interactions` | < 1% | Hourly |

### B2. RAG Agent Metrics (Financial Knowledge)

The RAG agent answers financial literacy questions using a curated knowledge base (e.g., "How does compound interest work?", "What's the 50/30/20 budget rule?").

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B2.1 | **Retrieval Precision@K** | % of top-K retrieved documents that are relevant to the query | Evaluated via LLM-as-judge or human annotation | > 85% | Daily (sampled) |
| B2.2 | **Retrieval Recall** | % of all relevant documents in the KB that were retrieved | Evaluated on benchmark queries | > 75% | Weekly |
| B2.3 | **Context Relevancy Score** | How much of the retrieved context is actually pertinent (vs. noise) | LLM-as-judge score (0-1) | > 0.80 | Daily (sampled) |
| B2.4 | **Faithfulness Score** | % of the generated response that is grounded in the retrieved context (no hallucinated claims) | LLM-as-judge or RAGAS framework | > 0.90 | Daily (sampled) |
| B2.5 | **Answer Relevancy Score** | How directly and completely the response addresses the user's specific question | LLM-as-judge score (0-1) | > 0.85 | Daily (sampled) |
| B2.6 | **Hallucination Rate** | % of responses containing claims not supported by the retrieved context | `Hallucinated responses / Total responses` | < 5% | Daily (sampled) |
| B2.7 | **Knowledge Base Coverage** | % of user queries that the current KB can adequately answer | `Answerable queries / Total queries` | > 80% | Weekly |
| B2.8 | **KB Gap Identification** | Queries that the RAG agent couldn't answer due to missing KB content | Log of unanswerable queries clustered by topic | Actionable list | Weekly |
| B2.9 | **Citation Accuracy** | % of source citations in responses that correctly reference the actual source document | `Correct citations / Total citations` | > 95% | Weekly (sampled) |
| B2.10 | **RAG Agent Satisfaction** | User satisfaction specifically for RAG agent interactions | Thumbs up/down ratio | > 78% positive | Daily |
| B2.11 | **Avg Response Length** | Average word count of RAG agent responses | Mean word count | 50-200 words | Weekly |
| B2.12 | **Response Latency (RAG-specific)** | Latency breakdown: retrieval time vs. generation time | Median of each phase | Retrieval < 300ms, Generation < 1.5s | Daily |

### B3. Transaction Agent Metrics

The Transaction agent answers questions about the user's financial transactions (e.g., "How much did I spend on food last week?", "What's my biggest expense this month?").

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B3.1 | **Query Understanding Accuracy** | % of transaction queries where the agent correctly interprets the user's intent (category, time range, aggregation type) | Human evaluation or LLM-as-judge | > 90% | Daily (sampled) |
| B3.2 | **Data Retrieval Accuracy** | % of queries where the correct transactions are fetched from the data store | `Correct data fetched / Total queries` | > 95% | Daily (sampled) |
| B3.3 | **Temporal Reasoning Accuracy** | Correctly handling relative time expressions ("last week", "past 3 months", "since my last paycheck") | Benchmark evaluation | > 88% | Weekly |
| B3.4 | **Aggregation Accuracy** | Correctness of sum, average, min, max, count calculations | `Correct aggregations / Total aggregations` | > 95% | Daily (sampled) |
| B3.5 | **Category Classification Accuracy** | Correctly identifying/mapping transaction categories | `Correct classifications / Total classifications` | > 90% | Weekly |
| B3.6 | **Response Completeness** | % of answers that fully address all parts of the user's question | LLM-as-judge score | > 85% | Daily (sampled) |
| B3.7 | **Tool Call Success Rate** | % of API/tool calls (to fetch transaction data) that succeed | `Successful calls / Total calls` | > 98% | Hourly |
| B3.8 | **Tool Call Latency** | Time taken for the agent to call external tools/APIs and receive data | Median latency | < 500ms | Hourly |
| B3.9 | **Multi-step Reasoning Success** | % of complex queries (requiring multiple tool calls or reasoning steps) completed successfully | `Successful complex queries / Total complex queries` | > 80% | Daily |
| B3.10 | **Transaction Agent Satisfaction** | User satisfaction for transaction agent interactions | Thumbs up/down ratio | > 80% positive | Daily |

### B4. Chit-chat Agent Metrics

The Chit-chat agent handles casual conversation, general navigation help, and financial encouragement/coaching.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B4.1 | **Conversation Coherence** | Multi-turn consistency and natural flow of conversation | LLM-as-judge score (0-1) | > 0.80 | Weekly (sampled) |
| B4.2 | **Navigation Success Rate** | % of navigation/help requests where the agent correctly guided the user to the right feature | `Successful navigations / Total navigation requests` | > 85% | Daily |
| B4.3 | **Personality Consistency** | Adherence to defined brand tone, empathy, and age-appropriate communication | LLM-as-judge rubric score | > 0.90 | Weekly (sampled) |
| B4.4 | **Engagement Quality** | Avg turns per chit-chat session (too low = unhelpful, too high = going in circles) | Mean turns/session | 3-8 turns | Daily |
| B4.5 | **Containment Rate** | % of chit-chat interactions that stay within the agent's scope (vs. needing handoff to specialized agent) | `Contained / Total chit-chat sessions` | > 70% | Daily |
| B4.6 | **Motivational Impact** | For coaching/encouragement interactions, % of users who take a positive financial action within 24 hours of the conversation | Behavioral analysis | > 15% | Weekly |
| B4.7 | **Chit-chat Agent Satisfaction** | User satisfaction for chit-chat interactions | Thumbs up/down ratio | > 75% positive | Daily |
| B4.8 | **Appropriate Handoff Rate** | % of conversations correctly identified as needing a specialized agent and successfully handed off | `Correct handoffs / Total handoffs attempted` | > 90% | Daily |

### B5. Multi-Agent Coordination

These metrics monitor how well the three agents work together as a system.

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B5.1 | **Routing Accuracy** | % of incoming queries routed to the correct specialized agent by the orchestrator | `Correctly routed / Total queries` | > 92% | Daily |
| B5.2 | **Misroute Rate** | % of queries sent to the wrong agent | `Misrouted / Total queries` | < 5% | Daily |
| B5.3 | **Handoff Success Rate** | % of inter-agent transfers that complete smoothly (user doesn't notice the switch or has no friction) | `Smooth handoffs / Total handoffs` | > 90% | Daily |
| B5.4 | **Context Preservation Rate** | % of handoffs where conversation context (user intent, prior info) is correctly passed to the receiving agent | Evaluation by LLM-as-judge | > 85% | Weekly |
| B5.5 | **Role Adherence Score** | % of agent responses that stay within the agent's designated responsibility scope | LLM-as-judge evaluation | > 92% | Weekly (sampled) |
| B5.6 | **Circular Routing / Loop Detection** | Number of instances where queries bounce between agents without resolution | Count of detected loops | 0 (zero tolerance) | Real-time |
| B5.7 | **Avg Agents per Session** | Average number of distinct agents involved in a single user session | Mean agents/session | 1.2-1.8 | Daily |
| B5.8 | **Cross-Agent Resolution Time** | Additional latency introduced when a query requires multiple agents | Median additional time | < 2s total | Daily |
| B5.9 | **Orchestrator Decision Latency** | Time taken by the routing/orchestration layer to decide which agent to invoke | Median latency | < 100ms | Hourly |

### B6. Safety & Governance

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B6.1 | **PII Detection & Redaction Rate** | % of PII in agent outputs that is caught and redacted before reaching the user | `Detected PII / Total PII present` | > 99% | Real-time |
| B6.2 | **PII Leakage Incidents** | Number of instances where PII was exposed in agent responses | Count | 0 (zero tolerance) | Real-time |
| B6.3 | **Prompt Injection Detection Rate** | % of prompt injection attempts detected and blocked | `Detected / Total attempts` | > 95% | Daily |
| B6.4 | **Guardrail Trigger Rate** | % of agent interactions that trigger any safety guardrail | `Triggered / Total interactions` | < 2% | Daily |
| B6.5 | **Guardrail Breakdown by Type** | Distribution of guardrail triggers by category (PII, toxicity, off-topic, financial advice) | Per-type counts | Monitor | Daily |
| B6.6 | **Toxic / Harmful Content Rate** | % of agent outputs flagged as harmful, offensive, or inappropriate | `Flagged / Total outputs` | < 0.1% | Daily |
| B6.7 | **Financial Regulatory Compliance** | % of financial guidance responses that comply with regulatory requirements (no unauthorized financial advice) | Compliance audit score | > 99% | Weekly (sampled) |
| B6.8 | **Jailbreak Attempt Rate** | Frequency of user attempts to manipulate the agent outside its intended behavior | Count and trend | Monitor, decreasing | Weekly |
| B6.9 | **Data Access Authorization Rate** | % of data access requests (transactions, balances) that are properly authorized before execution | `Authorized / Total access requests` | 100% | Real-time |
| B6.10 | **Audit Trail Completeness** | % of agent interactions with a complete, immutable audit trail | `Complete trails / Total interactions` | 100% | Daily |

### B7. Cost & Efficiency

| # | Metric | Definition | Calculation | Target | Granularity |
|---|--------|-----------|-------------|--------|-------------|
| B7.1 | **Total Token Usage** | Total LLM tokens consumed (input + output) across all agents | Sum of tokens | Budget-bound | Daily |
| B7.2 | **Token Usage per Agent** | Token consumption broken down by agent type | Per-agent token count | Monitor distribution | Daily |
| B7.3 | **Token Usage per Session** | Average tokens consumed per user session | `Total tokens / Total sessions` | < 2,000 tokens | Daily |
| B7.4 | **Cost per Conversation** | Average dollar cost per agent conversation session | `Total LLM cost / Total sessions` | < $0.05 | Daily |
| B7.5 | **Cost per Resolved Query** | Average dollar cost per successfully resolved user query | `Total cost / Resolved queries` | < $0.08 | Daily |
| B7.6 | **Cost per Active User / Month** | Monthly agent-related cost per active feature user | `Monthly total cost / Active users` | < $1.50 | Monthly |
| B7.7 | **Infrastructure Cost** | Hosting, compute, and storage costs for the agent system | Dollar amount | Within budget | Monthly |
| B7.8 | **Cost Efficiency Ratio** | Quality score achieved per dollar spent | `Avg quality score / Avg cost per query` | Improving | Monthly |
| B7.9 | **Model Call Efficiency** | Avg number of LLM calls per resolved query (fewer = more efficient) | `Total LLM calls / Resolved queries` | < 3 calls | Daily |
| B7.10 | **Cache Hit Rate** | % of queries that can be served from cache (for RAG agent, similar queries with same context) | `Cache hits / Total queries` | > 15% | Daily |

---

## 5. Instrumentation Strategy

### Event Taxonomy

All metrics should be derived from a structured event taxonomy. Key event categories:

#### Product Events
```
feature.impression           — User sees Managed Finance promotion
feature.click                — User clicks on the promotion
feature.landing.view         — User reaches feature landing page
onboarding.start             — User begins enrollment
onboarding.step.{n}.start    — User begins onboarding step N
onboarding.step.{n}.complete — User completes onboarding step N
onboarding.step.{n}.abandon  — User abandons at step N
onboarding.complete          — User completes full onboarding
account.link.attempt         — User attempts to link bank account
account.link.success         — Account link successful
account.link.failure         — Account link failed (with error type)
plan.shown                   — Financial plan presented to user
plan.accepted                — User accepts plan
plan.declined                — User declines plan
plan.reviewed                — User reviews their plan
dashboard.view               — User views the main dashboard
money.transfer.initiated     — User initiates a money transfer
money.transfer.completed     — Transfer completed successfully
money.transfer.failed        — Transfer failed
zone.change                  — User's financial zone changes (red→yellow→green)
session.start                — Feature session begins
session.end                  — Feature session ends (with duration)
```

#### Agent Events
```
agent.session.start          — Agent conversation begins
agent.query.received         — User sends a message to agent system
agent.routed                 — Query routed to specific agent (with agent_type)
agent.response.start         — Agent begins generating response (TTFT)
agent.response.complete      — Agent finishes response (with latency)
agent.tool.call              — Agent invokes an external tool (with tool_name)
agent.tool.response          — Tool returns result (with latency, success/fail)
agent.handoff                — Inter-agent handoff occurs (from_agent, to_agent)
agent.feedback               — User provides feedback (thumbs_up/down, rating)
agent.escalation             — Query escalated to human/fallback
agent.error                  — Agent error occurred (with error_type)
agent.guardrail.triggered    — Safety guardrail activated (with guardrail_type)
agent.session.end            — Agent conversation ends (with total_turns, tokens)
```

### Event Properties

Each event should include standard properties:

| Property | Description | Example |
|----------|-----------|---------|
| `event_id` | Unique event identifier | `uuid` |
| `timestamp` | ISO 8601 timestamp | `2026-04-21T14:30:00Z` |
| `user_id` | Anonymized user identifier | `usr_abc123` |
| `session_id` | Current app session ID | `ses_xyz789` |
| `feature_session_id` | Managed Finance session ID | `fsid_def456` |
| `agent_session_id` | Agent conversation session ID (if applicable) | `asid_ghi012` |
| `agent_type` | Which agent (rag, transaction, chitchat) | `rag` |
| `user_segment` | User segment at time of event | `active_enrolled` |
| `platform` | iOS / Android / Web | `ios` |
| `app_version` | App version number | `4.2.1` |
| `zone_status` | Current financial zone | `green` |

### Data Pipeline Architecture

```
User Actions → Event SDK → Event Bus (Kafka/Kinesis)
    ├── Real-time Stream → Monitoring Dashboard (alerting)
    ├── Batch Processing → Data Warehouse (reporting)
    └── Agent Telemetry → Observability Platform (LangSmith/Langfuse)
```

---

## 6. Alerting & Thresholds

### Critical Alerts (Immediate — PagerDuty/Slack)

| Metric | Threshold | Action |
|--------|----------|--------|
| Agent Error Rate | > 5% for 5 minutes | On-call escalation |
| PII Leakage | Any single incident | Immediate investigation + incident response |
| Circular Agent Loop | Any detection | Auto-break loop + alert |
| Response Latency P99 | > 10s for 10 minutes | Infrastructure scaling |
| Guardrail Trigger Rate | > 10% for 1 hour | Agent behavior review |
| Data Access Auth Failure | Any unauthorized access | Security incident response |

### Warning Alerts (Within 1 hour — Slack channel)

| Metric | Threshold | Action |
|--------|----------|--------|
| Agent Satisfaction Score | < 70% for 24 hours | Prompt/behavior review |
| Hallucination Rate | > 8% for 24 hours | RAG pipeline review |
| Onboarding Completion Rate | < 50% for 48 hours | UX investigation |
| Feature Churn Rate | > 12% for 1 week | Retention analysis |
| Cost per Conversation | > $0.10 for 24 hours | Efficiency review |
| Routing Accuracy | < 88% for 24 hours | Orchestrator review |

### Informational Alerts (Daily digest)

| Metric | Condition | Purpose |
|--------|----------|---------|
| Feature Adoption Rate | Weekly trend report | Growth tracking |
| Zone Distribution | Daily snapshot | Mission effectiveness |
| Token Usage | Daily total vs. budget | Cost management |
| KB Gap Report | Weekly summary | Content development |

---

## 7. Reporting Cadence

| Report | Frequency | Audience | Key Contents |
|--------|----------|----------|-------------|
| **Real-time Dashboard** | Live | Engineering, On-call | System health, latency, errors, safety |
| **Daily Digest** | Daily | Product, Engineering | KPI summary, alerts fired, anomalies |
| **Weekly Product Review** | Weekly | Product, Design, PM | Engagement, retention, funnel, outcomes |
| **Weekly Agent Performance** | Weekly | AI/ML Team | Quality scores, routing accuracy, cost |
| **Monthly Business Review** | Monthly | Leadership | North star metrics, platform impact, ROI |
| **Quarterly Assessment** | Quarterly | Executive | Strategic impact, NPS, financial health outcomes, roadmap |

---

> **Document Status**: Draft v1.0 — Pending stakeholder review
> **Next Steps**: Align on metric priorities, confirm thresholds, begin instrumentation
