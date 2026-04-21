# Managed Finance — Analytics Dashboard

A comprehensive **Product & Agentic AI Analytics** dashboard for the Managed Finance feature — a financial wellness capability embedded within an existing banking application.

## 📋 What's Inside

### 1. Metrics Framework Document (`docs/`)
A comprehensive ~90 metric framework covering:
- **Product Analytics**: Feature discovery, onboarding funnel, engagement, retention, financial health outcomes, platform impact
- **Agentic AI Analytics**: System-level performance, RAG agent, Transaction agent, Chit-chat agent, multi-agent coordination, safety & governance, cost efficiency

### 2. Interactive Dashboard (`src/`)
A premium React + Vite dashboard with 5 interactive views:

| View | Description |
|------|-------------|
| **Executive Overview** | North star KPIs, system health monitor, gauge charts, zone distribution |
| **Product Analytics** | Conversion funnel, engagement trends, retention heatmap, financial outcomes, platform impact |
| **Agent Performance** | Per-agent quality metrics, latency trends, RAG quality, tool call stats, routing flow |
| **Safety & Governance** | Guardrail triggers, PII detection, compliance scores, incident log |
| **Cost & Efficiency** | Token usage, cost trends, budget utilization, cache hit rates |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠 Tech Stack
- **React 18** + **Vite**
- **Vanilla CSS** with design tokens (dark theme)
- **Pure SVG charts** (no chart library)
- **Mock data** with 12-month realistic datasets

## 📊 Target Audience
Young adults (18-24) living paycheck-to-paycheck. The Managed Finance feature helps users manage their finances between paychecks, moving from "red zone" (financial stress) to "green zone" (financially healthy).

## 🤖 Agent Architecture
Three specialized AI agents:
- **RAG Agent** — Financial literacy knowledge base
- **Transaction Agent** — Spending analysis and transaction queries
- **Chit-chat Agent** — Navigation help, coaching, encouragement
