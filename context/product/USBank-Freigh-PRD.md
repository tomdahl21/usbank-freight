# Product Requirements Document
## US Bank Freight Payment Analytics Dashboard

**Version:** 1.1 Draft  
**Date:** August 14, 2026  
**Prepared by:** Slalom Consulting — Product Design  
**Client Partner:** Lauren Woods  
**Status:** For client review

---

## 1. Executive Summary

US Bank Freight Payment processes $46B+ in freight annually across 200+ countries — but its current portal delivers **static, report-first analytics** in a category that is rapidly moving toward conversational, AI-native intelligence. Customers have explicitly asked for natural language querying, real-time chart generation, carrier pricing optimization, and accounting visibility.

This PRD defines the Freight Payment Analytics Dashboard: a next-generation portal experience that pairs US Bank's unmatched institutional trust and data depth with an AI-powered intelligence layer. The result is a differentiated product that no bank-backed competitor currently offers and that positions US Bank against the AI-native disruptors entering the market from the software side.

---

## 2. Problem Statement

### What customers are asking for (from Slalom account team briefing)

The core ask is **visibility, not control.** US Bank already handles payments reliably — customers don't need to manage that process. What they lack is the ability to understand what's happening, why, and what to do about it. The AI layer exists to make non-statisticians fluent in their own freight data.

1. **Data visibility and self-service insight** — customers want to explore their own freight data without waiting for scheduled reports or analyst support; US Bank holds significant data that is currently shown in only a minimal way
2. **Natural language querying** — ask questions in plain, layman's terms and get answers with live, dynamically updating charts
3. **Carrier performance understanding** — visibility into which carriers are performing, which are underperforming, and what's driving cost and timing differences
4. **Business policy cost analysis** — connect freight data to business decisions (e.g., "We offer free shipping on items over $100 — how much is this costing us?")
5. **Accounting visibility** — real-time view of payment status and invoice reconciliation across the carrier network
6. **AI competitive reassurance** — a visible AI roadmap that demonstrates US Bank's commitment to continued enhancement; the trigger for this project was a large client threatening to leave if they didn't see one

### The competitive gap

Neither US Bank nor Cass Information Systems (its closest bank-backed competitor) currently offers conversational AI querying or AI-generated chart responses. Software-first competitors like Trax Technologies and Intelligent Audit are closer to this capability but lack US Bank's institutional trust, financial controls, and $46B+ data network. This creates a durable 12–24 month window to establish a defensible lead.

---

## 3. Goals and Success Metrics

### Business goals

- Increase portal engagement and stickiness among existing shipper customers
- Create a differentiating product capability that supports retention and new business development
- Position US Bank favorably in competitive evaluations against Trax, Cass, and emerging AI-native players

### Product goals

- Enable any shipper customer to get an actionable answer from their freight data in under 60 seconds without analyst support
- Reduce inbound support volume for standard data requests by 40% within 6 months of launch
- Increase the percentage of customers who log into the portal weekly from baseline to 60%+

### Key success metrics

| Metric | Baseline | 6-Month Target |
|---|---|---|
| Weekly active users (% of customers) | TBD | 60% |
| AI query interactions per session | 0 | 3+ |
| Support tickets for data requests | Baseline | –40% |
| NPS (portal experience) | TBD | +20 pts |
| Time-to-insight (new query → chart) | N/A | < 60 seconds |

---

## 4. Users

### Primary user: Freight Manager

**Context:** Identified through account leader interview as the clearest, highest-priority persona. Operationally accountable for shipment execution — not just spend — across a carrier network. Lives and dies by whether freight arrives on time and in full. Negotiates carrier agreements and makes day-to-day routing decisions based on carrier reliability by lane. Core questions are about movement, not money: did it leave on time, when did it arrive, which carrier got it there, and how does that compare across lanes?

**Core focus areas (directly from interview):**
- **On-time and full (OTIF)** — the primary operational KPI; needs to see OTIF by carrier, lane, and time period at a glance
- **Time to location by carrier** — wants to compare how long different carriers take on the same lane; drives routing and contract decisions
- **Shipment origin and destination** — needs clear visibility into where freight starts and ends; the complete lane picture (not just spend aggregates)

**Goals:**
- Know immediately which carriers are meeting OTIF and which are not — by lane
- Compare carrier transit times for the same origin/destination pair before tendering
- Trace any shipment from origin to delivery using BOL and PRO number data
- Have data ready to challenge or validate carrier invoices when billed weight or freight class is disputed

**Pain points:**
- Current portal shows spend but not shipment execution data in a usable way
- Comparing carrier performance across the same lane requires manual work outside the portal
- No easy way to correlate a late or short shipment with its BOL and invoice in one place

---

### Secondary user: AP / Finance Analyst

**Context:** Handles invoice reconciliation, carrier payment status, and period-close freight accounting. Needs real-time payment status, not batched reports.

**Goals:**
- Confirm which invoices are paid, pending, or disputed in real time
- Reconcile freight charges against GL accounts
- Export clean data for ERP or accounting system ingestion

---

### Tertiary user: VP Supply Chain / CFO

**Context:** Executive-level stakeholder who reviews freight spend as a percentage of COGS. Wants trend lines and benchmark comparisons, not drill-down tables.

**Goals:**
- Benchmark freight program against industry peers
- Understand quarterly trend direction and drivers
- Validate that the freight payment program is generating ROI

---

## 5. Feature Requirements

### 5.1 Conversational AI Query Interface — Priority: P0

The defining differentiator of this product. A persistent natural language query bar that allows users to ask any question about their freight data and receive an AI-generated response with appropriate visualizations.

**Functional requirements:**

- Persistent query bar accessible from every page in the dashboard
- Accepts natural language input (typed; voice input v2)
- Interprets intent and maps to underlying data queries
- Generates responses that include: text explanation, an automatically-selected chart or table, and follow-up question suggestions
- Handles ambiguous queries by asking a clarifying question before generating output
- Maintains query context within a session (follow-up questions reference prior context)
- Provides a plain-language explanation of any chart it generates ("Here's what this shows...")
- Allows users to save, share, or export AI-generated charts
- Includes suggested queries based on current data anomalies or upcoming payment events

**Example interactions:**

- "Show my top 5 carriers by spend this quarter" → ranked bar chart + spend table
- "Which lanes are above benchmark?" → map or lane list with delta to benchmark
- "Compare August vs July by mode" → side-by-side stacked bar chart
- "Show me unpaid invoices older than 30 days" → filtered invoice table
- "What drove the spike in LTL spend last week?" → anomaly explanation + drill-down chart
- "We offer free shipping on items over $100 — how much is this costing us?" → policy cost attribution analysis connecting freight data to a business rule
- "Which carriers are meeting on-time and full on my Chicago to Dallas lane?" → OTIF scorecard by carrier for that origin/destination pair
- "How long does FedEx Freight take versus XPO on my southeast lanes?" → time-to-location comparison chart by carrier across matching origin/destination pairs
- "Show me shipments from Cincinnati that arrived late or short last month" → shipment list filtered by origin and OTIF failure, with BOL and PRO number links
- "Which invoices have a freight class mismatch from the original BOL?" → exception list showing BOL-declared class vs. carrier-billed class with cost impact

The last example represents a distinct capability class: **business policy cost analysis**, where the AI connects freight spend data to a customer's own pricing rules, promotions, or operational policies. This is not a standard reporting query — it requires the AI to interpret a business context and map it to underlying cost data. This should be treated as a named capability and scoped explicitly in the AI model design.

**AI behavior guardrails:**
- AI responses are clearly labeled as AI-generated
- Confidence level is surfaced when data is sparse or ambiguous
- No recommendations involving payment decisions without user confirmation
- All AI output traces to auditable underlying data

---

### 5.2 Freight Spend Dashboard — Priority: P0

The primary landing view. A configurable dashboard that shows key metrics at a glance, with drill-down access to detail.

**Functional requirements:**

- Summary stat cards: Total Spend (MTD/QTD/YTD), Invoices Processed, Audit Recovery, Open Exceptions, Payment Status summary
- Spend trend chart (configurable time range: 4W / 12W / 6M / 12M / custom)
- Spend breakdown by: Mode, Carrier, Lane, Origin/Destination region, Division (if applicable)
- **OTIF summary card** — on-time and full rate across all shipments for the selected period, with drill-down by carrier and lane
- **Shipment origin/destination map** — visual lane view showing freight flow between origin and destination nodes, filterable by carrier
- Week-over-week change indicators on all key metrics
- Quick filters: date range, carrier, mode, lane, origin, destination, status
- Export to CSV / PDF for any view
- Dashboard is configurable per user (drag-and-drop card arrangement, v2)

---

### 5.3 Carrier Performance & Pricing Intelligence — Priority: P1

Gives transportation managers the data to manage carrier relationships and identify renegotiation opportunities.

**Functional requirements:**

- **Carrier OTIF scorecards (primary metric):** on-time rate, full-delivery rate, combined OTIF rate — all filterable by lane (origin/destination pair), mode, and time period
- **Time-to-location comparison:** for any origin/destination pair, show average transit time per carrier side-by-side — the core tool for routing decisions
- Invoice accuracy rate, exception rate, average days to pay, spend trend per carrier
- Invoice accuracy benchmarking: individual carrier vs. program average vs. industry
- Rate analysis: compare carrier-billed rates against contracted rates by lane, including accessorial charges flagged on the BOL (liftgate, residential delivery, appointment fees)
- **BOL discrepancy detection:** flag invoices where carrier-billed weight, freight class (NMFC), or dimensions deviate from what was recorded on the original BOL — a primary source of overcharges
- Overcharge identification: flag invoices where billed amount exceeds contracted rate by configurable threshold
- Carrier ranking by mode and lane for comparative evaluation
- AI-powered carrier recommendation: "Based on your freight profile, these 3 carriers are performing below benchmark on this lane. Here are alternatives in the US Bank carrier network."

---

### 5.4 Invoice & Payment Management — Priority: P0

The operational core. Replaces fragmented manual processes with a unified invoice lifecycle view.

**Functional requirements:**

- Invoice list view with filtering by status: Pending Audit / In Audit / Approved / Paid / Exception / Voided
- Invoice detail view: shipment data, carrier, mode, origin/destination (shipper and consignee from BOL), billed amount, contracted amount, audit status, payment date
- **BOL reference data on every invoice:** PRO number (carrier tracking ID), freight class (NMFC), commodity description, declared weight and dimensions, accessorials requested — sourced from the original bill of lading so discrepancies are immediately visible alongside the invoice
- **Shipment lifecycle status:** for each invoice, show the shipment's progression from origin pickup through delivery — connecting BOL issuance to carrier receipt to final delivery confirmation
- Exception workflow: flagged invoices show reason code, supporting documentation, and resolution action buttons (Approve / Dispute / Escalate)
- Real-time payment status: shows disbursement date, payment method, carrier confirmation
- Bulk action support: approve, dispute, or export multiple invoices
- Carrier collaboration: send invoice dispute directly to carrier from within the portal; track response status
- Exception aging report: open exceptions by age bucket (0–7 days, 8–14 days, 15–30 days, 30+ days)

---

### 5.5 Accounting & Reconciliation — Priority: P1

Closes the loop between freight operations and finance. Addresses the stated customer need for accounting visibility.

**Functional requirements:**

- GL coding assignment: map freight invoices to general ledger codes (manual and rule-based)
- Accrual reporting: estimated freight liability for open/in-transit shipments
- Period close export: clean data export for ERP ingestion (SAP, Oracle, NetSuite connectors — or file-based)
- Real-time payment ledger: running total of paid vs. outstanding freight liability
- Invoice reconciliation: match freight invoices to POs or shipment records
- Carrier balance view: outstanding payables per carrier, with aging

---

### 5.6 Benchmarking & Market Insights — Priority: P2

Leverages US Bank's unique network position to deliver market-level context no software-only competitor can match.

**Functional requirements:**

- Program benchmark: user's freight spend vs. industry average for their freight profile (mode mix, volume, geography)
- Carrier benchmark: carrier performance vs. peer group
- Quarterly Freight Payment Index integration: in-portal access to the US Bank Freight Payment Index with program-specific overlay
- Peer comparison: user's key metrics vs. anonymized peer group in same industry segment
- Historical trend context: 12-month and 24-month trend lines for all key metrics

---

### 5.7 AI Roadmap Module — Priority: P2

A trust-building feature that surfaces US Bank's AI roadmap and current intelligence capabilities. Addresses the stated customer concern about competitive positioning.

**Functional requirements:**

- "What AI can do today" section: plain-language overview of current AI capabilities in the portal
- Upcoming features preview: roadmap visibility into next 2 quarters of planned AI capabilities
- AI usage summary: how many AI queries the user has run, what types, time saved estimate
- Feedback loop: thumbs up/down on any AI-generated response; feeds model improvement

---

## 6. Non-Functional Requirements

### Security & Compliance
- All data access governed by existing US Bank AML, OFAC, SOC 2 Type II, and SOX controls
- No freight data used to train AI models without explicit customer consent
- Session timeout after 15 minutes of inactivity (configurable by admin)
- Role-based access control: Admin / Analyst / Read-Only
- All AI interactions logged for audit trail

### Performance
- Dashboard load time: < 2 seconds (P95)
- AI query response time: < 8 seconds for standard queries; loading indicator for complex queries
- Invoice list rendering: < 1 second for up to 10,000 rows with virtual scrolling
- System availability: 99.9% uptime SLA

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigable throughout
- Screen reader compatible (ARIA labels on all interactive elements)
- Reduced motion mode support

### Integrations
- TMS connectors: Oracle TMS, JDA, MercuryGate (API or file-based)
- ERP connectors: SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics (file-based v1; API v2)
- BI connectors: Power BI and Tableau data export compatibility
- Existing US Bank freight payment processing infrastructure (internal)

---

## 7. Out of Scope (v1)

- Mobile application (responsive web only)
- Multi-tenant / 3PL management view
- Voice input for AI query bar
- Carrier self-service portal (carrier-facing features limited to dispute collaboration)
- Predictive tender optimization
- Direct carrier contract management

---

## 8. Assumptions & Dependencies

- US Bank's core freight payment processing data is API-accessible with < 15-minute latency
- AI model (likely LLM with RAG against customer data) can be scoped and governed within US Bank's security boundary
- Customer data is normalized and structured per existing US Bank data model
- Carrier network data (performance, rates) is available from existing audit infrastructure
- Industry benchmark data is accessible from US Bank's existing freight index data

---

## 9. Proposed Phasing

### Phase 1 — Core Dashboard + Invoice Management (Weeks 1–8)
- Freight Spend Dashboard (5.2)
- Invoice & Payment Management (5.4)
- Basic filters, export, alert system
- Design system and component library

### Phase 2 — AI Query + Carrier Intelligence (Weeks 9–16)
- Conversational AI Query Interface (5.1)
- Carrier Performance & Pricing Intelligence (5.3)
- AI Insight Cards embedded in dashboard

### Phase 3 — Finance, Benchmarks, Roadmap (Weeks 17–24)
- Accounting & Reconciliation (5.5)
- Benchmarking & Market Insights (5.6)
- AI Roadmap Module (5.7)
- ERP connector v1

---

## 10. Open Questions

1. What is the data refresh latency from the core processing platform to the analytics layer?
2. Is the AI query feature intended to run against a customer's own data only, or also against aggregated network data for recommendations?
3. What is the preferred AI infrastructure (internal US Bank model, Azure OpenAI, or other)?
4. Are there existing design standards or brand guidelines from US Bank that must be adhered to for the portal?
5. What is the current portal tech stack, and is this a greenfield build or migration/overlay?
6. What constitutes "real-time" for payment status — is < 15-minute latency acceptable, or is true real-time (< 1 minute) required?
7. Are there regulatory considerations around AI-generated recommendations for payment decisions?
8. **What is the financing model between US Bank and the shipper client?** US Bank fronts payment to carriers immediately upon shipment delivery — but it is unclear whether clients pre-fund this or are invoiced after the fact. This directly affects how the real-time payment ledger (5.5) should be designed: if clients are pre-funding, the ledger tracks drawdown against a balance; if clients are billed post-delivery, it tracks receivables owed to US Bank. Lauren Woods or Justin Higgins should clarify before the reconciliation feature is scoped.

---

## Appendix A: Competitive Feature Gap Summary

| Feature | US Bank (today) | Cass | Trax | Freehand | This Product |
|---|---|---|---|---|---|
| Conversational AI query | ❌ | ❌ | Partial | ❌ | ✅ |
| AI-generated charts | ❌ | ❌ | Partial | ❌ | ✅ |
| Bank-grade security | ✅ | ✅ | ❌ | ❌ | ✅ |
| Real-time payment status | ✅ | ✅ | Partial | Partial | ✅ |
| Carrier pricing intelligence | Partial | Partial | ✅ | ❌ | ✅ |
| AP reconciliation | ✅ | ✅ | Partial | ❌ | ✅ |
| Industry benchmarking | ✅ | ✅ | ❌ | ❌ | ✅ |
| AI roadmap transparency | ❌ | ❌ | Partial | ❌ | ✅ |

---

*End of document. Next step: client review and prioritization workshop with Lauren Woods and US Bank stakeholders.*
