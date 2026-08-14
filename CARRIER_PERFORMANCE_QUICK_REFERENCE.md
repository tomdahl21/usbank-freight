# Carrier Performance — Quick Reference: Persona Journeys & AI Examples

## Three-Persona Quick Reference

### 🚚 FREIGHT MANAGER — "Should I switch carriers on this lane?"

**Current Pain Point:** Takes 10 minutes to manually check alternatives  
**Enhanced Experience:** 30 seconds

```
1. SEE problem: FedEx red-flagged on Dallas → Nashville (OTIF 81.4%, target 90%)
2. TAP "Dallas → Nashville" row
3. TIME-TO-LOCATION card appears: Shows transit time + OTIF for all carriers
4. ALTERNATIVES sidebar appears: Top 3 carriers ranked by OTIF improvement
5. DECIDE: "SAIA +7.6 pts OTIF, -0.5d transit, +4.3% cost"
6. ACTION: [✦ AI Recommendation] → "Shift 30% volume to SAIA for Q4"
7. CONFIRM: [Draft Reallocation Plan] → Opens workflow
```

**AI Use Cases:**
- "Which carriers are meeting OTIF on my southeast lanes?" → AI filters + ranks
- "Why is FedEx declining?" → AI shows root cause (DFW terminal congestion on Mon/Tue)
- "What if I shifted 30% volume?" → AI models ROI, cost delta, capacity impact
- **Proactive:** "SAIA is outperforming FedEx on 4 of your 6 lanes. Consider shift."

---

### 💰 AP/FINANCE ANALYST — "How do I clear the FedEx invoice queue?"

**Current Pain Point:** Scattered data across multiple screens  
**Enhanced Experience:** Single carrier detail view

```
1. NAVIGATE to FedEx Freight carrier detail
2. PAYMENT STATUS row shows: 42 pending, 3 disputed, $12.1K total
3. CLICK "Pending Audit" → Filters BOL Discrepancy table to pending items
4. EXCEPTION AGING summary shows: 
   - 0–7d: 15 invoices (process normally)
   - 8–14d: 18 invoices (review by EOW)
   - 15–30d: 6 invoices (escalate now) ⚠
   - 30+d: 3 invoices (force close) ✗
5. AI INSIGHT explains: 
   - Top issue: Freight class mismatches (18 inv, $3.2K)
   - Recommendation: Auto-approve class 70→85 (saves 30 min)
6. ACTION: [Bulk Approve Classes] → Resolves $3.2K in 2 clicks
7. ESCALATE: 30+ day exceptions → Force resolution workflow
```

**AI Use Cases:**
- "What's holding up our FedEx reconciliation?" → Breakdown by type + aging + top actions
- "Which exceptions can we auto-approve?" → Pattern detection (small weight deltas <5%)
- "Why is accuracy dropping?" → Trend + root cause (commodity types, facilities, days)
- **Proactive:** "12 weight overages in the last 7 days — pattern detected. Auto-flag for review."

---

### 📊 CFO / VP SUPPLY CHAIN — "Is our freight program optimized?"

**Current Pain Point:** No peer context, hidden opportunities  
**Enhanced Experience:** Program-level visibility

```
1. LOAD carrier performance page (program view, not carrier-specific)
2. EXECUTIVE SUMMARY card shows:
   - OTIF: 87.3% (vs 90% target, vs 89% peer median) ⚠
   - Audit Recovery: $0.8M YTD (+12% YoY) ✓
   - Cost vs Benchmark: -2.3% (we're cheaper) ✓
3. BENCHMARK OVERLAY on OTIF trend chart:
   - Shows: This carrier, Program Average, Peer Median, Target
   - Shaded band shows peer range
4. AI INSIGHT: "FedEx decline = Dallas terminal congestion. 
   Shifting 30% to SAIA: +2.1 pts OTIF, +1.8% cost, ROI = $200K working capital relief"
5. COST IMPACT widget shows: $0.28K recovered + $0.84K opportunity (if reallocated)
6. ACTION: [Show Reallocation Scenarios] → Models 3 options
7. EXPORT: [Export to CFO] → PDF with recommendations
```

**AI Use Cases:**
- "How does our program compare to industry?" → Benchmark position + recommendations
- "What would reallocate 30% to better carriers achieve?" → ROI modeling (cost, OTIF, working capital)
- "What's our audit recovery trend?" → $ recovered, % of spend, breakdown by type, YoY comparison
- **Proactive:** "Opportunity identified: Your freight program is 1.7 pts OTIF below peer. 
   Reallocating underperformers could close gap with <1% cost increase. Estimated inventory savings: $150K/year."

---

## Feature Spotlights: Before/After

### 1️⃣ TIME-TO-LOCATION COMPARISON

**BEFORE (Current):**
```
Lane              OTIF   On-Time  In-Full  Avg Transit  vs Target
Dallas → Nashville 81.4% 82.3%   99.0%    3.2 days    −8.6 pts ⚠
```
User has to: Click each carrier, check OTIF, manually compare transit times → 5 min

**AFTER (Enhanced):**
```
┌─ Time-to-Location: Dallas → Nashville (Last 30 days) ──────────────┐
│                                                                      │
│ Old Dominion:   2.3 days  |████████████ 93.2% OTIF  | $2.18/lb    │
│ FedEx Freight:  2.8 days  |██████      85.6% OTIF  | $2.09/lb    │
│ SAIA LTL:       2.5 days  |████████████ 93.2% OTIF  | $2.24/lb    │
│ Estes Express:  2.9 days  |████████   89.1% OTIF  | $2.03/lb    │
│                                                                      │
│ ✓ Tap any carrier to highlight in lane table below                 │
│ ✓ [Compare Mode] — Side-by-side detailed comparison               │
│ ✓ [✦ Show fastest option] — AI recommendation                     │
│ ✓ [↓ More] — Expand to see distribution (10th/90th percentile)   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```
User can: See all carriers, compare in 10 seconds → Uses Alternatives sidebar to decide

---

### 2️⃣ CARRIER ALTERNATIVES SIDEBAR

**BEFORE (Current):**
User manually checks competitor rates in external system OR calls sales team
→ 15–20 min delay, incomplete data

**AFTER (Enhanced):**
```
┌─ Alternatives ─────────────────────────────┐
│ FedEx 85.6% OTIF (currently selected)       │
│                                             │
│ ✦ AI Recommendation:                       │
│ "SAIA is 7.6 pts better on this lane"     │
│                                             │
│ Top alternatives for Dallas → Nashville:   │
│                                             │
│ 1. Old Dominion                             │
│    OTIF: 93.2% (+7.6 pts) ✓                │
│    Transit: 2.3 days (-0.5d) ✓             │
│    Cost: $2.18/lb (+4.3%)                  │
│    Your volume: 2,400 units/mo             │
│    [✦ Show details] [Shift Volume →]      │
│                                             │
│ 2. SAIA LTL                                 │
│    OTIF: 93.2% (+7.6 pts) ✓                │
│    Transit: 2.5 days (-0.3d) ✓             │
│    Cost: $2.24/lb (+7.2%)                  │
│    Your volume: 800 units/mo               │
│    [✦ Show details] [Shift Volume →]      │
│                                             │
│ 3. Estes Express                            │
│    OTIF: 89.1% (+3.5 pts)                  │
│    Transit: 2.9 days (+0.1d)               │
│    Cost: $2.03/lb (-2.9%) ✓                │
│    [✦ Show details] [Shift Volume →]      │
│                                             │
│ [Dismiss]                                  │
└─────────────────────────────────────────────┘
```
User can: Decide in 1 minute + trigger reallocation workflow instantly

---

### 3️⃣ PAYMENT STATUS KPI ROW

**BEFORE (Current):**
No payment status visible on carrier detail page
User has to: Navigate to separate Exceptions page OR look at invoices

**AFTER (Enhanced):**
```
┌─ Payment Status (FedEx Freight · Last 30 days) ─────────────────┐
│                                                                  │
│  Paid        │  Pending Audit   │  Disputed    │  Outstanding   │
│  ────────────────────────────────────────────────────────────   │
│  $42.3K      │  $12.1K          │  $3.8K       │  $18.3K        │
│  156 invoices│  42 invoices     │  14 invoices │  64 invoices   │
│              │                   │              │                │
│  ✓ View All  │  ⚠ Click to View │  ✗ Dispute  │  → Outstanding │
│              │  & Resolve       │  Details     │  Invoices      │
│                                                                  │
│ Exception Aging:                                                 │
│  0–7d:   15 | 8–14d:   18 | 15–30d:  6 | 30+d:  3             │
│  $2.4K   |  $5.8K    |  $2.2K    |  $1.7K                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```
User can: Click any status → filters table, see top actions, bulk resolve in 2 min

---

### 4️⃣ AI INSIGHT CARD (ENHANCED)

**BEFORE (Current):**
```
┌─ ✦ AI Insight ────────────────────────────────────────┐
│ FedEx Freight's OTIF decline is concentrated on       │
│ Monday and Tuesday pickups at the Dallas terminal.    │
│ This has persisted for 3 weeks.                       │
│                                                       │
│ Old Dominion and SAIA both cover this lane with      │
│ 93%+ OTIF at within 4% of FedEx's rate.             │
│                                                       │
│ Recommend shifting 30% of Dallas → Nashville volume  │
│ to SAIA as a trial for Q4.                           │
│                                                       │
│ [✦ Show alternatives] [✦ Draft reallocation plan]   │
│ [Dismiss]                                             │
└───────────────────────────────────────────────────────┘
```

**AFTER (Enhanced):**
```
┌─ ✦ AI Insight ────────────────────────────────────────────────┐
│                                                                │
│ Context: FedEx Freight · Dallas → Nashville · Last 30 days   │
│ Confidence: High (based on 42 shipments, 3-week pattern)     │
│ Learn more: [See the data]                                   │
│                                                                │
│ FINDING:                                                      │
│ Your OTIF decline is concentrated on Monday & Tuesday        │
│ pickups at the Dallas DFW terminal (78.2% vs 93% avg).       │
│ This correlates with known FedEx facility congestion.        │
│                                                                │
│ ALTERNATIVES:                                                 │
│ Old Dominion (93.2% OTIF, -0.5d transit, +4.3% cost)       │
│ SAIA LTL (93.2% OTIF, -0.3d transit, +7.2% cost)           │
│ Estes Express (89.1% OTIF, -2.9% cost, slightly slower)    │
│                                                                │
│ RECOMMENDATION:                                               │
│ Shift 30% Dallas → Nashville volume to SAIA trial (Q4):     │
│  → Estimated +2.1 pts OTIF                                  │
│  → Cost impact: +$1,800/mo (1.8% premium)                   │
│  → Payback: Reduced stockouts, better SLA compliance        │
│                                                                │
│ NEXT STEPS:                                                   │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [✦ Show All Alternatives] [✦ Draft Plan] [Feedback]     │ │
│ │ [Ask AI for Details] [Dismiss]                          │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                                │
│ Questions? Ask AI: "What if we shifted 30%?" or "Why 30%?" │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

User can: Understand the full context + next steps in one card; follow-up questions remain in scope

---

## AI Query Examples (Conversational Capability)

These queries can be asked via the top-bar AI query bar, with context from the current page:

### Freight Manager Queries

**Q1: "Which carriers are meeting OTIF on my southeast lanes?"**
```
A: Based on your southeast lanes (Atlanta, Memphis, Charlotte hubs):

Carriers meeting 90%+ OTIF:
  • Old Dominion: 93.4% (11/13 lanes)
  • SAIA LTL: 92.1% (9/13 lanes)
  • XPO Logistics: 91.7% (8/13 lanes)

Carriers below 90%:
  • FedEx Freight: 84.2% (2/13 lanes) ⚠
  • UPS Freight: 86.9% (3/13 lanes) ⚠

[Show lane details] [Compare FedEx alternatives] [Drill into FedEx performance]
```

**Q2: "Compare transit time: FedEx vs XPO vs Old Dominion on Chicago lanes"**
```
A: Chicago origin lanes — Transit time comparison (30-day avg)

                 FedEx  │  XPO   │  Old Dominion
Chicago → Detroit 2.1d  │  2.0d  │  1.4d ✓ Fastest
Chicago → Atlanta 3.2d  │  2.8d  │  2.6d ✓ Fastest
Chicago → Nashville 2.9d │  2.7d  │  2.4d ✓ Fastest
Chicago → Charlotte 3.5d │  3.1d  │  3.0d ✓ Fastest

Distribution details (tap to expand):
  XPO: 2.6d avg, range 1.8–4.2d (high variability)
  Old Dominion: 2.4d avg, range 1.2–3.1d (consistent)
  FedEx: 2.9d avg, range 2.1–4.8d (very high variability)

Recommendation: Old Dominion is fastest AND most consistent on Chicago lanes.

[Show cost comparison] [Show OTIF comparison] [Drill into an example lane]
```

**Q3: "Show me shipments from Dallas that arrived late last week"**
```
A: Shipments from Dallas DFW terminal · Arrived late · Aug 7–13

Count: 8 shipments (0.9% of total Dallas volume)

Breakdown by destination:
  Nashville: 4 (50%) — FedEx, all Mon pickups ⚠
  Memphis:   2 (25%) — FedEx, Tuesday pickup
  Charlotte: 2 (25%) — XPO, weather delay

Details:
[INV-2026-00041890] FedEx Dallas→Nashville "8/7 Mon pickup, delivered 2 hrs late"
[INV-2026-00041891] FedEx Dallas→Nashville "8/8 Tue pickup, delivered 1.5 hrs late"
[INV-2026-00041892] FedEx Dallas→Nashville "8/9 Wed pickup, on-time"
... [show all 8]

Pattern detected: FedEx Mon/Tue pickups from Dallas are systematically late 
(consistent with DFW congestion noted in AI insight above).

[Show OTIF by time-of-day] [Reallocate Mon/Tue to alternative] [See trend]
```

### AP/Finance Analyst Queries

**Q4: "What's holding up our FedEx reconciliation?"**
```
A: FedEx Freight — Invoice Reconciliation Status (Last 30 days)

Summary:
  Total invoices:   212
  Paid:            156 ($42.3K) ✓
  Pending audit:    42 ($12.1K)
  In dispute:       14 ($3.8K)
  
Exception breakdown (Pending + Disputed):
  Freight class mismatch:    18 inv │ $3.2K │ Auto-fixable? ✓
  Weight overages (>5%):     12 inv │ $2.8K │ Review sample
  Liftgate/Accessorial:       8 inv │ $3.1K │ Requires review
  Dimensional upgrade:        4 inv │ $3.0K │ Pattern issue?

Aging of open exceptions:
  0–7 days:   15 inv │ $2.4K (process normally)
  8–14 days:  18 inv │ $5.8K (review by EOW)
  15–30 days:  6 inv │ $2.2K (escalate now) ⚠
  30+ days:    3 inv │ $1.7K (force resolution) ✗

AI Recommendations:
1. Auto-approve freight class 70→85 (18 invoices, $3.2K)
   → Reason: Valid for LTL commodity mix; patterns align with BOL
   → Saves: 30 min
   
2. Review weight overage sample (pick 3, then bulk action)
   → Reason: 12 overages spanning 2 weeks; check for scale variance issue
   
3. Escalate liftgate charges (8 invoices)
   → Reason: Pattern across time period; request FedEx explanation
   
4. Force close 30+ day exceptions (3 invoices, oldest 45 days)
   → Reason: SLA exceeded; approve with adjustment or write off

[Bulk Approve Classes] [Review Weight Sample] [Escalate Accessories] [Force Close Old]
```

### CFO/VP Supply Chain Queries

**Q5: "How does our freight program compare to industry?"**
```
A: Freight Program Benchmarking (Your Position vs. Peers, Last 30 days)

Metrics:
  Metric              │ Your Program  │ Peer Median  │ Position
  ────────────────────┼───────────────┼──────────────┼───────────
  Avg OTIF            │ 87.3%         │ 89.0%        │ Below (−1.7 pts)
  Avg Transit Time    │ 2.7d          │ 2.8d         │ Better (+0.1d) ✓
  Invoice Accuracy    │ 97.1%         │ 96.8%        │ Better (+0.3) ✓
  Exception Rate      │ 1.8%          │ 2.1%         │ Better (−0.3) ✓
  Spend per Unit      │ $2.14         │ $2.26        │ Cheaper (−5.3%) ✓

Your Strengths:
  ✓ 5% cheaper than peers (excellent cost position)
  ✓ Better exception rate (1.8% vs 2.1%)
  ✓ Superior invoice accuracy (97.1% vs 96.8%)
  ✓ Faster transit (2.7d vs 2.8d)

Your Opportunity:
  ⚠ 1.7 pts OTIF below peer median (main gap)
  → Driven primarily by FedEx underperformance on Dallas/Atlanta lanes

ROI of Closing the Gap:
  Reallocation scenario: Shift underperforming volume to top performers
  → OTIF improvement: +1.7 pts
  → Cost impact: +0.1% (~$2K/month)
  → Estimated inventory savings: $120K–$180K/year (less safety stock needed)
  → Net ROI: Positive (working capital benefit > cost increase)

Action Plan:
1. Reallocate FedEx Dallas→Nashville to SAIA (30% trial)
2. Monitor OTIF weekly for 8 weeks
3. Recalculate peer position in Q3 close

[Show detailed scenario] [Model 3-carrier reallocation] [Export analysis]
```

---

## Implementation Roadmap Summary

| Phase | Features | Effort | Timeline | Value |
|---|---|---|---|---|
| **Phase 1** | Time-to-Location Card, Alternatives Sidebar, Payment Status KPI, Enhanced AI | 3–4 weeks | Next sprint | High (enables core workflows) |
| **Phase 2** | Comparison Mode, Executive Summary, Accuracy Benchmarking, Aging Report | 3–4 weeks | Sprint +2 | Very High (executive visibility) |
| **Phase 3** | Conversational multi-turn queries, Reallocation workflow, Predictive alerts | 4–6 weeks | Quarter +2 | Transformational (AI-native) |

---

## Quick Wins (Can Ship First)

If you need to prioritize, these provide immediate value:

1. **Time-to-Location Card** (1 week) — Directly answers "which carrier is fastest?"
2. **Alternatives Sidebar** (1.5 weeks) — Answers "what's my option?"
3. **Payment Status KPI** (1 week) — Answers "what's pending?"
4. **Enhanced AI Insight** (0.5 weeks) — Better explanations + follow-up buttons

**Total: 4 weeks to MVP. Then layer in Phase 2 over next month.**

---

**Created:** August 14, 2026  
**For:** Slalom Consulting & US Bank Freight Payments Team
