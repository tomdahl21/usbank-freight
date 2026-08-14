# Carrier Performance Page — Enhancement Proposal
## Personas, Functional Priorities & AI Integration

**Date:** August 14, 2026  
**Status:** For Review & Prioritization  
**Prepared by:** Slalom Product Team

---

## Executive Summary

The current **Carrier Performance** page successfully delivers the core Freight Manager use case (OTIF monitoring, lane-level drill-down). However, it lacks three critical capabilities that the research documents identify:

1. **Time-to-location comparison** — needed for routing decisions
2. **Payment status visibility** — required by AP/Finance Analyst secondary persona
3. **Smart alternative recommendations** — driven by AI, with impact modeling

This proposal maps the three personas to page enhancements and recommends a phased rollout (MVP + Phase 1 + Phase 2).

---

## Personas & Their Needs on This Page

### 1. FREIGHT MANAGER (Primary) — Marcus Rodriguez
**Role:** Operationally accountable for shipment execution and OTIF across carrier network.

**On This Page, They Need:**
| Need | Current State | Gap | Proposed Solution |
|---|---|---|---|
| OTIF visibility by carrier & lane | ✅ Full | — | — |
| Transit time comparison | ⚠️ Only in table | Need visual comparison | Time-to-Location Card |
| Identify underperformers | ✅ Color-coded | — | — |
| Find alternative carriers quickly | ❌ Manual external step | Major gap | Alternatives Sidebar |
| Route this shipment today | ❌ No tendering support | Not in scope v1 | Future: Workflow button |
| Understand why performance declined | ⚠️ Only AI card | Limited context | Enhanced AI Insights |

**Example Workflow:**
> "FedEx is 8.6 pts below target on Dallas → Nashville. Let me see who else can handle this lane... [Alternatives Sidebar shows SAIA 93.2%, Old Dominion 94.1%]. What's the cost difference? [AI shows: +2.3% cost, -1.2 days transit time]. Should I shift volume?" → Triggers reallocation workflow (Phase 2)

**AI Use Cases for Freight Manager:**
- **Query:** "Which carriers are meeting OTIF on my southeast lanes?"
  - **Response:** Chart showing OTIF by carrier filtered to SE region; ranked list of alternatives
  
- **Query:** "Why did XPO's on-time rate drop this week?"
  - **Response:** Trend analysis + root cause explanation (weather, facility congestion, etc.) with evidence
  
- **Query:** "Compare transit time: FedEx vs XPO vs Old Dominion on Chicago lanes"
  - **Response:** Side-by-side time distribution chart + cost per day comparison
  
- **Proactive Alert:** "SAIA is outperforming FedEx on 4 of your 6 southeast lanes. Consider shifting volume."

---

### 2. AP / FINANCE ANALYST (Secondary)
**Role:** Invoice reconciliation, payment tracking, exception resolution.

**On This Page, They Need:**
| Need | Current State | Gap | Proposed Solution |
|---|---|---|---|
| Payment status by carrier | ❌ Not shown | Critical gap | Payment Status KPI Row |
| Invoice accuracy trend | ⚠️ One KPI | No context | Accuracy Benchmarking Card |
| Exception aging (what's old?) | ❌ Not shown | Workflow blocker | Aging Summary Widget |
| How many exceptions to resolve? | ❌ Not shown | Critical gap | Exception Queue Link |
| Link to dispute workflow | ⚠️ Only in exceptions page | Not convenient | Inline "Dispute" button |

**Example Workflow:**
> "FedEx invoices are pending audit. [Payment Status row shows] 12 pending, 3 disputed, $4.2K outstanding. [Exception Aging shows] 2 over 30 days — need escalation. [AI explains] Top issue: freight class mismatches ($2.1K), weight overages ($1.8K). [Bulk action] Resolve top 5 weight overages." → Saves 30 min per day

**AI Use Cases for AP Analyst:**
- **Query:** "What's holding up our FedEx payment reconciliation?"
  - **Response:** Breakdown of pending invoices by exception type, aging, $ amounts; top 3 recommendations for resolution
  
- **Query:** "Which BOL discrepancies should we auto-approve?"
  - **Response:** Identify patterns (small weight deltas <5%, minor class upgrades); flag batch for approval
  
- **Query:** "Why is FedEx's invoice accuracy dropping?"
  - **Response:** Trend analysis showing accuracy decline + correlation to commodity types, shipping days, terminals

---

### 3. VP SUPPLY CHAIN / CFO (Tertiary)
**Role:** Monitor program ROI, benchmark against peers, identify cost optimization.

**On This Page, They Need:**
| Need | Current State | Gap | Proposed Solution |
|---|---|---|---|
| Program benchmark context | ❌ Not shown | No competitive visibility | Benchmark Overlay (Chart) |
| Audit recovery $ (ROI of audit?) | ❌ Not shown | Business case unclear | Cost Impact Widget |
| Carrier network health score | ⚠️ Implied by OTIF | No aggregation | Executive Summary Card |
| 12-month trend context | ⚠️ Only 12-week chart | Insufficient for planning | Extended Trend Selector |
| Cost vs. OTIF trade-off | ❌ Not shown | Optimization opportunity hidden | Pareto Chart (Phase 2) |

**Example Workflow:**
> "How's our freight program performing? [Executive Summary shows] OTIF at 87.3% (vs 90% target), Audit Recovery $0.8M YTD (3.8% of spend). [Benchmark Overlay shows] We're 2.3 pts below peer avg, but 1.1 pts above market. [AI explains] FedEx decline is concentrated on Dallas → Nashville; shifting 30% to SAIA would add 2 pts OTIF with 1.8% cost premium. Worth it?"

**AI Use Cases for CFO:**
- **Query:** "How does our program compare to industry peers?"
  - **Response:** Benchmark dashboard showing: spend/unit, OTIF, DSO, exception rate vs. peer median + percentile position
  
- **Query:** "What would the ROI be if we reallocate to better carriers?"
  - **Response:** Scenario modeling showing: cost delta, OTIF improvement, exception reduction, working capital impact
  
- **Query:** "What's our audit recovery trend?"
  - **Response:** $ recovered YTD, % of total spend, trend vs. prior year; breakdown by exception type

---

## Proposed Enhancements: Phased Rollout

### Phase 0 (Current MVP) — ✅ Shipped
- [x] Carrier list with OTIF color coding
- [x] Carrier detail header with KPIs
- [x] OTIF trend chart (12 weeks)
- [x] OTIF by Lane table
- [x] BOL Discrepancy detection
- [x] Basic AI Insight card

---

### Phase 1 (Core Enhancements) — Recommended for Next Sprint
**Delivery:** 3–4 weeks  
**Effort:** Medium  
**Value:** High (unlocks Freight Manager + AP Analyst workflows)

#### 1.1 Time-to-Location Comparison Card
**Where:** Directly above "OTIF by Lane" table  
**Content:**
```
┌─ Time-to-Location: Dallas → Nashville (Last 30 days) ──────────────┐
│ Old Dominion:   2.3 days  |████████ 93.2% OTIF  | $2.18/lb         │
│ FedEx Freight:  2.8 days  |██████   85.6% OTIF  | $2.09/lb         │
│ SAIA LTL:       2.5 days  |█████████ 93.2% OTIF | $2.24/lb         │
│ [↓ More] [Compare Mode] [Show All Lanes]                           │
└────────────────────────────────────────────────────────────────────┘
```

**Interactivity:**
- Tap any carrier → highlights row in OTIF by Lane table
- "↓ More" expands to show distribution (10th, 25th, 50th, 75th, 90th percentile)
- "Compare Mode" opens side-by-side detailed comparison view
- Sortable: by transit time, OTIF, cost

**Data Source:** Aggregated from 30-day shipment records (timestamp pickup → final delivery)

**AI Enhancement:** "✦ Show fastest option" highlights lowest-cost fastest alternative

---

#### 1.2 Carrier Alternatives Sidebar
**Where:** Right edge of OTIF by Lane table (collapsible, 280px width)  
**Trigger:** Click on any red/amber row in lane table

**Content for Dallas → Nashville (selected):**
```
┌─ Alternatives ───────────────────────────┐
│ FedEx 85.6% OTIF (selected)              │
│                                          │
│ Top alternatives for this lane:          │
│                                          │
│ 1. Old Dominion                          │
│    OTIF: 93.2% (+7.6 pts)               │
│    Transit: 2.3 days (-0.5d)            │
│    Cost: $2.18/lb (+4.3%)               │
│    [Details] [Shift Volume →]           │
│                                          │
│ 2. SAIA LTL                              │
│    OTIF: 93.2% (+7.6 pts)               │
│    Transit: 2.5 days (-0.3d)            │
│    Cost: $2.24/lb (+7.2%)               │
│    [Details] [Shift Volume →]           │
│                                          │
│ 3. Estes Express                         │
│    OTIF: 89.1% (+3.5 pts)               │
│    Transit: 2.9 days (+0.1d)            │
│    Cost: $2.03/lb (-2.9%)               │
│    [Details] [Shift Volume →]           │
│                                          │
│ [✦ AI Recommendation] [Dismiss]         │
└─────────────────────────────────────────┘
```

**Logic:**
- Only show carriers that have actually carried shipments on this lane in past 90 days
- Rank by OTIF delta vs. selected carrier, then by cost
- Show cost trade-offs (some will be +%, some -%,  some neutral)
- Max 3–5 alternatives

**AI Enhancement:** "✦ AI Recommendation" button shows AI's ranked suggestion with reasoning

**Phase 2 Extension:** "[Shift Volume →]" button opens modal to create reallocation plan

---

#### 1.3 Payment Status KPI Row
**Where:** Directly below main KPI tiles (OTIF, Transit, Invoice Accuracy)  
**Visibility:** Only if on a carrier detail page (not on carrier list)

**Content:**
```
┌─────────────────────────────────────────────────────────────┐
│ Payment Status (FedEx Freight · Last 30 days)              │
├──────────┬──────────┬──────────┬──────────┬──────────────┐
│ Paid     │ Pending  │ In       │ Disputed │ Outstanding  │
│          │ Audit    │ Dispute  │          │              │
├──────────┼──────────┼──────────┼──────────┼──────────────┤
│ $42.3K   │ $12.1K   │ $3.8K    │ $2.4K    │ $18.3K       │
│ (156 inv)│ (42 inv) │ (14 inv) │ (8 inv)  │ (64 inv)     │
│          │          │          │          │              │
│ ✓ Click  │ ⚠ Click  │ ✗ Click  │ ? Click  │ → Click      │
│ to view  │ to view  │ to view  │ to view  │ to view      │
└──────────┴──────────┴──────────┴──────────┴──────────────┘
```

**Interactivity:**
- Each box is clickable
- Clicking "Pending Audit" filters BOL Discrepancy table to show only pending items
- Clicking "In Dispute" shows only disputed items with resolution buttons
- Clicking "Outstanding" shows aging breakdown + escalation buttons

**Data Source:** Real-time from payment processing system (< 15 min latency)

---

#### 1.4 Enhanced AI Insight Card
**Current:** Single static insight with 2 action buttons  
**Enhanced:** Context-aware insights with follow-up capability

**Content Example:**
```
┌─ ✦ AI Insight ────────────────────────────────────────────┐
│ Insight: FedEx Freight's OTIF decline is concentrated on  │
│ Monday and Tuesday pickups at the Dallas terminal —        │
│ consistent with known congestion at their DFW facility.   │
│                                                            │
│ Alternatives: Old Dominion and SAIA both cover this lane  │
│ with 93%+ OTIF at within 4% of FedEx's rate.             │
│                                                            │
│ Recommendation: Shift 30% of Dallas → Nashville volume    │
│ to SAIA as a trial for Q4 (estimated +2.1 pts OTIF).     │
│                                                            │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [✦ Show Alternatives] [✦ Draft Reallocation Plan]   │  │
│ │ [Feedback: 👍 👎] [Dismiss]                          │  │
│ └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

**Enhancements:**
- Show confidence level: "This analysis is based on 42 shipments from Dallas DFW over 30 days"
- Include evidence links: "[See the data]" button shows underlying chart/table
- Follow-up capability: "Ask about this" → opens AI query bar with context pre-filled
- Dismissible but remembered: "Don't show this type of alert again" option
- Multiple insights rotated: Show top 3 opportunities on page load

---

### Phase 2 (Advanced Features) — Planned for 2–3 Sprints Out
**Delivery:** Weeks 5–8  
**Effort:** High  
**Value:** Very High (unlocks CFO workflows + advanced Freight Manager scenarios)

#### 2.1 Carrier Comparison Mode
**Trigger:** "Compare Mode" button in Time-to-Location card or Alternatives sidebar

**Layout:**
```
Split view: Left (FedEx) | Right (Old Dominion)

Metric                  | FedEx        | Old Dominion | Δ
────────────────────────┼──────────────┼──────────────┼─────
OTIF %                  | 85.6%        | 93.2%        | +7.6
On-Time %               | 82.3%        | 94.1%        | +11.8
In-Full %               | 99.0%        | 99.1%        | +0.1
Avg Transit             | 2.8d         | 2.3d         | -0.5d
Invoice Accuracy        | 96.2%        | 97.8%        | +1.6
Exception Rate          | 2.1%         | 1.2%         | -0.9
Cost ($/lb, avg)        | $2.09        | $2.18        | +4.3%
Days to Pay             | 18.3d        | 17.2d        | -1.1d

Trend Charts (side-by-side):
[OTIF 12W]              | [OTIF 12W]
[Invoice Accuracy 12W]  | [Invoice Accuracy 12W]
```

**Interactivity:**
- Select 2–3 carriers to compare
- Pivot between views: "OTIF", "Cost", "Execution", "Payment"
- Export comparison as PDF for carrier negotiation
- "Simulate reallocation" → ROI calculator

---

#### 2.2 Executive Summary Card
**Where:** Above all current content (visible on carrier list view, not just detail)

**Content:**
```
┌─ Carrier Performance — Program Overview ───────────────────┐
│ Period: Last 30 days                                       │
├────────────┬─────────────┬──────────────┬─────────────────┤
│ OTIF Rate  │ Audit $     │ Cost vs      │ Carrier Health  │
│ 87.3%      │ Recovery    │ Benchmark    │ Score           │
│ vs 90% ⚠   │ $0.8M YTD   │ -2.3%        │ 7.2 / 10        │
│ (-2.7pts)  │ (+12% YoY)  │ (vs peer)    │ [→ Details]     │
├────────────┴─────────────┴──────────────┴─────────────────┤
│ Key trends:                                                 │
│ • OTIF declining: -1.2 pts this month (caused by FedEx)   │
│ • Exception rate stable: 1.8% (below 2% target)           │
│ • Audit recovery strong: $0.8M YTD, up 12% YoY            │
│ • Benchmarking: Below peers on OTIF, above on cost        │
│                                                            │
│ Top opportunity: Reallocate FedEx Dallas → Nashville       │
│ volume to SAIA → +2.1 pts OTIF, -0.3% cost delta          │
└────────────────────────────────────────────────────────────┘
```

---

#### 2.3 Invoice Accuracy Benchmarking Card
**Where:** Right side of OTIF by Lane table (or collapsible section)

**Content:**
```
┌─ Invoice Accuracy Benchmarking ─────────────────────────┐
│ FedEx Freight · Last 30 days                            │
├──────────┬──────────────┬──────────────┬──────────────┤
│ This     │ Program      │ Industry     │ Trend        │
│ Carrier  │ Average      │ Benchmark    │              │
├──────────┼──────────────┼──────────────┼──────────────┤
│ 96.2%    │ 97.1%        │ 98.0%        │ ↓ -1.2 pts   │
│          │              │              │ (vs last mo) │
│ -0.9 pts │ (3 carriers  │ (peer        │              │
│ vs avg   │ below, 2     │ median)      │              │
│          │ above)       │              │              │
│                                                        │
│ [↓ Drill into accuracy issues]                        │
│ [↓ Show corrective actions]                           │
└────────────────────────────────────────────────────────┘
```

**Detail View (expandable):**
- Accuracy by exception type: Freight Class Mismatch (94.1%), Weight Overages (95.8%), Accessorial Issues (88.2%)
- Accuracy by commodity: Certain commodity types more error-prone?
- Trend: 12-month history + peer comparison

---

#### 2.4 Exception Aging Summary
**Where:** Below BOL Discrepancy table

**Content:**
```
┌─ Exception Aging (FedEx Freight) ──────────────────────┐
│                                                        │
│ 0–7 days:    3 exceptions   | $340    | [Resolve]    │
│ 8–14 days:   5 exceptions   | $1,240  | [Escalate]   │
│ 15–30 days:  2 exceptions   | $680    | [Escalate]   │
│ 30+ days:    2 exceptions   | $2,100  | [Force]      │
│             ────────────────────────                 │
│ Total:      12 exceptions   | $4,360  | Aging Report │
│                                                        │
│ Action: Close 30+ day exceptions (oldest 45 days)     │
└────────────────────────────────────────────────────────┘
```

**Interactivity:**
- Click any age bucket → filters BOL Discrepancy table to that age range
- "Resolve" button opens quick-action modal (approve/dispute/escalate)
- Bulk action: Select multiple exceptions → batch approve or dispute

---

#### 2.5 Program Benchmark Overlay
**Where:** On OTIF Trend chart (in addition to 12-week trend)

**Enhancement:**
- Add shaded band for benchmark range (industry peer median ± 1 std dev)
- Add line for "Program Average" (all carriers aggregated)
- Legend shows: This Carrier, Program Avg, Benchmark Median, Target
- Toggle on/off

**Example:**
```
OTIF Trend — FedEx Freight & Benchmarking Context
100% ─────────────────────────────────────────────
  │          Program Avg (88%) ────────────────
  │         /                    \
  │        /                      \ Declining
 90% ────/ ← Benchmark Band (90±5%) \────────
  │   /  (peer median)             \
  │  /                              \
 80% ───────────────────────────────── FedEx
  │                                  85.6%
    May  Jun  Jul  Aug  Sep  Oct
```

---

#### 2.6 Cost Impact Widget
**Where:** After BOL Discrepancies table

**Content:**
```
┌─ Cost Impact & ROI ───────────────────────────────────────┐
│ Based on last 30 days of FedEx Freight activity           │
├───────────────────────┬─────────────┬─────────────────────┤
│ Recovered             │ $0.28K      │ BOL discrepancies   │
│ (via dispute)         │ (0.65%)     │ caught & recovered   │
│                       │             │                     │
│ Avoided (via          │ $0.12K      │ Freight class       │
│ accuracy detection)   │ (0.28%)     │ mismatches disputed  │
│                       │             │                     │
│ Opportunity           │ $0.84K      │ If reallocated to   │
│ (if reallocated)      │ (1.95%)     │ better carrier      │
├───────────────────────┼─────────────┼─────────────────────┤
│ Total Impact          │ $1.24K      │ (2.88% of this      │
│ (30-day annualized)   │             │ carrier spend)      │
└───────────────────────┴─────────────┴─────────────────────┘
```

---

### Phase 3 (Conversational AI + Workflow) — Future Roadmap
**Delivery:** Weeks 9–16  
**Effort:** Very High  
**Value:** Transformational (enables AI-native experience)

- [ ] Natural language query context from page
- [ ] "Why is [Metric] changing?" multi-step explanations
- [ ] "Draft reallocation plan" workflow with modeling
- [ ] Volume shift tendering (integration with TMS)
- [ ] Carrier performance predictions (next 30 days)
- [ ] Automated anomaly detection & proactive alerts

---

## AI Use Cases: Detailed Scenarios

### Scenario 1: Freight Manager — "Why is FedEx declining?"

**User Action:** Sees red indicator on Dallas → Nashville lane. Clicks "✦ Explain" button on alert or AI Insight card.

**AI Processing:**
1. Retrieves: Last 30 days of FedEx shipments on this lane
2. Breaks down by pickup day, time window, destination zone
3. Compares to historical baseline (last 12 weeks)
4. Identifies pattern: Monday/Tuesday pickups from Dallas DFW terminal are significantly slower
5. Correlates with external data (if available): Known congestion at DFW during peak hours
6. Generates explanation + evidence

**Response:**
```
FedEx OTIF Decline Explained

Your Dallas → Nashville lane has seen FedEx's OTIF drop 8.6 pts 
in the last 3 weeks. Here's what's driving it:

Breakdown by pickup day:
  Monday:     78.2% OTIF (vs 93% avg) ⚠ Worst
  Tuesday:    81.1% OTIF (vs 93% avg) ⚠
  Wednesday:  92.4% OTIF ✓
  Thursday:   94.7% OTIF ✓
  Friday:     93.1% OTIF ✓

Root cause: Monday and Tuesday pickups at the Dallas DFW 
terminal are consistently delayed. This correlates with known 
peak congestion periods at FedEx's DFW facility (confirmed with 
their ops team in our network intel).

Evidence: Of the 12 late shipments last week, 10 picked up 
Mon/Tue from DFW.

Recommendation: 
→ Shift high-priority Dallas → Nashville shipments to 
  Wednesday+ pickup windows OR
→ Use SAIA or Old Dominion on Mon/Tue (both >93% on this lane)

Next steps:
[Show alternatives] [Create reallocation plan] [Confirm with FedEx]
```

**Follow-Up Capability:**
- User asks: "What if we shifted 30% of volume to SAIA?"
- AI models ROI: Cost impact, OTIF improvement, carrier capacity constraints
- User asks: "Draft the reallocation plan"
- AI outputs: Tendering strategy, volume targets, recommended effective date

---

### Scenario 2: AP Analyst — "What's holding up reconciliation?"

**User Action:** Clicks on "Pending Audit" in Payment Status KPI row.

**AI Processing:**
1. Retrieves: All pending-audit invoices for this carrier (last 30 days)
2. Groups by exception type and dollar amount
3. Correlates with BOL discrepancy table
4. Identifies resolvable items (patterns that match known overcharges)
5. Calculates aging and escalation risk

**Response:**
```
FedEx Freight — Reconciliation Summary

Pending Audit: 42 invoices, $12.1K

Exception breakdown:
  Freight class mismatch (70→85):  18 inv | $3.2K | Auto-fixable?
  Weight overage (>5%):             12 inv | $2.8K | Review sample
  Liftgate/Accessorial:              8 inv | $3.1K | Requires review
  Dimensional class upgrade:          4 inv | $3.0K | Pattern issue?

Aging:
  0–7 days:    15 inv | $2.4K ✓ Process normally
  8–14 days:   18 inv | $5.8K ⚠ Review by EOW
  15–30 days:    6 inv | $2.2K ⚠ Escalate now
  30+ days:      3 inv | $1.7K ✗ Force resolution

AI Recommendations:
1. Auto-approve class 70→85 freight: Often valid for LTL commodity mix
   → Saves 30 min, resolves $3.2K
   
2. Dispute weight overages >7%: Beyond typical scale variance
   → Review sample of 3 invoices, then bulk action
   
3. Escalate liftgate charges: 8 invoices spanning 2 weeks
   → Suggests pattern; request FedEx explanation
   
4. Force close 30+ day exceptions: 3 invoices, oldest 45 days
   → Suggest: Approve with adjustment OR write off

Next actions:
[Bulk Approve Classes] [Review Weight Sample] [Escalate Accessories] 
[Force Close Old Items]
```

---

### Scenario 3: CFO — "How does our program compare to industry?"

**User Action:** Loads Carrier Performance page in program-view mode (not specific carrier detail).

**AI-Generated Insight:**
```
Freight Program Benchmarking — Your Position

Program Metrics (Last 30 days):
  Avg OTIF:           87.3%  | Peer median: 89.0% | You're below (-1.7 pts)
  Avg Transit Time:   2.7d   | Peer median: 2.8d  | You're faster ✓ (+0.1d)
  Invoice Accuracy:   97.1%  | Peer median: 96.8% | You're better ✓ (+0.3)
  Spend per Unit:     $2.14  | Peer median: $2.26 | You're cheaper ✓ (-5.3%)
  Exception Rate:     1.8%   | Peer median: 2.1%  | You're better ✓ (-0.3)

Your Position:
  Spend: $2.14/unit (5% cheaper than peers — good cost position)
  Service: 87.3% OTIF (below benchmark, driven by FedEx underperformance)
  Execution: Better-than-peer accuracy and exception rates

Opportunity:
If you close the OTIF gap (-1.7 pts) through carrier optimization 
and reallocation (est. $0.2K cost delta), you'd move to peer parity 
with only minimal cost increase. Potential working capital benefit: 
Better delivery performance → lower inventory safety stock.

ROI: +1.7 pts OTIF | Cost delta: +0.1% | Estimated inventory benefit: 
$120K–$180K annual (working capital relief).

Recommendation:
1. Reallocate underperforming lanes (FedEx, UPS) to higher-OTIF alternatives
2. Monitor OTIF weekly for next 8 weeks
3. Recalculate benchmark position in Q3 close

[Show Reallocation Scenarios] [Request Carrier Data] [Export to CFO]
```

---

## Information Architecture & Content Requirements

### Data Dependencies

**For Time-to-Location Card:**
- Shipment-level timestamps: Pickup, Delivery
- Carrier assignment
- Origin/Destination
- Aggregation: 30-day window, percentiles by lane

**For Payment Status:**
- Invoice status (Paid, Pending, Disputed, Outstanding)
- Invoice amount and carrier
- Status history / aging

**For AI Insights:**
- Shipment-level: BOL data, carrier, lane, date, OTIF result, exception codes
- Historical: 12+ weeks of performance data per lane per carrier
- External (optional): FedEx/XPO facility data, weather data, holiday calendar

**For Benchmarking:**
- Peer network data (anonymized and aggregated)
- Industry data (from US Bank Freight Payment Index)
- User's own historical data (12+ months)

### New UI Components Needed

| Component | Scope | Reusable? | Status |
|---|---|---|---|
| Time-to-Location Card | Carrier page | Yes (use on comparison page too) | Design in Design System |
| Alternatives Sidebar | Carrier page, Comparison mode | Yes | New |
| Payment Status KPI Row | Carrier page | Yes | New badge/widget |
| Aging Summary Widget | Carrier page, Exceptions page | Yes | New widget |
| Benchmark Overlay (chart) | Any trend chart | Yes | Chart library extension |
| Executive Summary Card | Carrier page, Dashboard | Yes | New card type |
| Cost Impact Widget | Carrier page, Finance section | Yes | New widget |
| AI Insight Card (enhanced) | Already exists | Yes | Enhancement |

### Design System Extensions Needed
- [ ] New color for "pending" state (if not already present)
- [ ] New badge variants for exception aging
- [ ] Sidebar panel component (if not already present)
- [ ] Comparison view split-screen pattern
- [ ] Widget-style cards (smaller stat cards for summary)

---

## Success Metrics & Measurement

### Engagement Metrics
| Metric | Baseline | 3-Month Target | 6-Month Target |
|---|---|---|---|
| AI Query interactions per session | — | 1.5 | 3.0 |
| % using Time-to-Location comparison | — | 35% | 60% |
| % using Alternatives sidebar | — | 20% | 45% |
| Avg time to "identify + decide on carrier change" | — | 5 min | 2 min |

### Business Metrics
| Metric | Baseline | Target | Impact |
|---|---|---|---|
| OTIF improvement (via reallocation) | — | +1.5–2.0 pts | Reduce stockouts, improve SLA compliance |
| Invoice exception reduction | — | -15% | Faster reconciliation, lower dispute costs |
| Carrier relationship ROI | — | +$200K/year | Cost savings from better routing |

### Product Metrics
| Metric | Baseline | Target |
|---|---|---|
| Page load time | < 2s | < 2s (maintain) |
| AI query response time | — | < 8s (standard queries) |
| Feature adoption (Time-to-Location + Alternatives) | — | 50%+ within 6 weeks |

---

## Open Questions for Stakeholder Review

1. **Tendering Integration (Phase 2):** Should "Shift Volume" button trigger a modal workflow, or integrate directly with TMS? This affects scope significantly.

2. **AI Model Scope:** Should AI recommendations consider only historical US Bank data, or also external factors (weather, fuel prices, facility-level performance)?

3. **Benchmarking Privacy:** Can we include anonymized peer comparison data, or is this too sensitive for initial release?

4. **Real-Time vs. Batch:** Payment status currently shows 15-min latency. Is this acceptable, or do we need true real-time (<1 min)?

5. **Invoice-Level Drill-Down:** Should clicking a BOL discrepancy row open the full invoice detail, or stay on this page in a modal/overlay?

6. **Phasing Cadence:** Can we deliver Phase 1 in 3–4 weeks, or should we extend to 6 weeks with more testing?

---

## Appendix: Competitive Differentiation

### How These Enhancements Close Gaps vs. Competitors

| Feature | Cass | Trax | Freehand | This Dashboard |
|---|---|---|---|---|
| Natural language "Why?" explanations | ❌ | Partial | ❌ | ✅ Full AI context |
| Time-to-location comparison | ❌ | Partial | ❌ | ✅ Visual + data |
| Smart alternative recommendations | ❌ | ✅ (paid service) | ❌ | ✅ In-dashboard |
| Real-time payment visibility | ✅ | Partial | ❌ | ✅ Enhanced KPI |
| Benchmarking context on chart | ✅ | ❌ | ❌ | ✅ Overlay |
| Conversational follow-up (future) | ❌ | ❌ | ❌ | ✅ Planned |

---

## Next Steps

1. **Prioritization:** Which Phase 1 features are must-have vs. nice-to-have? (Recommend: All Phase 1 features are necessary for MVP)

2. **Design Review:** Schedule design system review for new components (Time-to-Location, Alternatives sidebar, etc.)

3. **Data Assessment:** Confirm data availability and latency for each new metric (especially payment status and benchmarking)

4. **Scoping:** Finalize Phase 1 vs. Phase 2 split and secure development resources

5. **Prototyping:** Build interactive prototype of Phase 1 features for user testing (Freight Manager + AP Analyst personas)

6. **Roadmap Communication:** Share Phase 2 + Phase 3 roadmap with customer to build confidence in AI competitive positioning

---

**Document prepared by:** Slalom Product Team  
**Date:** August 14, 2026  
**Status:** Ready for Stakeholder Review
