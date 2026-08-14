# Carrier Performance Page — Next Steps & Action Items

**Prepared:** August 14, 2026  
**Status:** Ready for Prioritization & Resource Planning

---

## Summary of Deliverables

I've created three documents to guide the enhancement of the Carrier Performance page:

1. **[CARRIER_PERFORMANCE_ENHANCEMENT_PROPOSAL.md](./CARRIER_PERFORMANCE_ENHANCEMENT_PROPOSAL.md)** (19 sections, ~4000 words)
   - Complete feature specifications for Phase 1, 2, 3
   - Detailed persona mapping and use cases
   - Data dependencies and new components needed
   - Success metrics and competitive analysis
   - **Use this for:** Stakeholder review, design system planning, engineering scoping

2. **[CARRIER_PERFORMANCE_QUICK_REFERENCE.md](./CARRIER_PERFORMANCE_QUICK_REFERENCE.md)** (8 sections, ~2000 words)
   - Three-persona quick workflows (before/after)
   - Concrete AI query examples
   - Feature spotlights with visual examples
   - Implementation roadmap summary
   - **Use this for:** User testing, sales demos, team alignment

3. **[/memories/session/carrier-performance-enhancement-strategy.md](/memories/session/carrier-performance-enhancement-strategy.md)**
   - Strategy checklist and key findings
   - **Use this for:** Personal reference, quick lookup during meetings

---

## Decision Framework: What to Build & When

### Must-Have for MVP (Phase 1 — Next 3–4 Weeks)

These three features unlock the core Freight Manager workflow:

- [ ] **Time-to-Location Comparison Card**
  - Shows all carriers' transit times side-by-side for a lane
  - Effort: 1 week (mostly data aggregation + visual)
  - Unblocks: Lane-level routing decisions

- [ ] **Carrier Alternatives Sidebar**
  - Appears when a lane is underperforming
  - Shows top 3 alternatives ranked by OTIF improvement
  - Effort: 1.5 weeks (logic + sidebar component)
  - Unblocks: Quick alternative discovery

- [ ] **Payment Status KPI Row**
  - Shows Paid, Pending, Disputed, Outstanding with counts and $
  - Effort: 1 week (data integration + styling)
  - Unblocks: AP Analyst visibility

- [ ] **Enhanced AI Insight Card**
  - Better explanations, confidence levels, evidence links
  - Context-aware follow-up capability
  - Effort: 0.5 weeks (UI enhancement + prompt tuning)
  - Unblocks: Better user trust in AI

**Phase 1 Total Effort:** ~4 weeks (can be done in parallel by 2–3 engineers)  
**Phase 1 Business Value:** High — unlocks core persona workflows, enables faster decisions

---

### High-Value Additions (Phase 2 — Weeks 5–8)

These deepen engagement and add CFO visibility:

- [ ] **Carrier Comparison Mode** (2 weeks)
  - Side-by-side comparison of 2–3 carriers across all metrics
  - Unblocks: Advanced analysis, carrier negotiation prep

- [ ] **Executive Summary Card** (1.5 weeks)
  - Program-level health metrics + top opportunities
  - Unblocks: CFO dashboard narrative

- [ ] **Invoice Accuracy Benchmarking Card** (1 week)
  - Individual carrier vs. program average vs. peer benchmark
  - Unblocks: AP Analyst performance context

- [ ] **Exception Aging Summary Widget** (1 week)
  - Age buckets with bulk action support
  - Unblocks: SLA management

- [ ] **Program Benchmark Overlay** (1.5 weeks)
  - Add peer/benchmark bands to OTIF trend chart
  - Unblocks: Executive context

**Phase 2 Total Effort:** ~7 weeks (sequential or 2-person parallel)  
**Phase 2 Business Value:** Very High — CFO positioning + retention story

---

### Transformational (Phase 3 — Quarter +2)

- [ ] **Conversational Multi-Turn Queries** (6 weeks)
  - Enable follow-ups with context preservation
  - Unblocks: AI-native experience

- [ ] **Reallocation Workflow** (4 weeks)
  - End-to-end flow from "shift volume" → tendering decision
  - Unblocks: Operational efficiency

- [ ] **Proactive Anomaly Detection** (3 weeks)
  - Automated alerts for unusual patterns
  - Unblocks: Prevent problems before they escalate

**Phase 3 Total Effort:** ~13 weeks (if done in parallel by dedicated team)  
**Phase 3 Business Value:** Transformational — AI-native competitive positioning

---

## Quick-Start Action Items (This Week)

### For Product Manager
- [ ] Schedule stakeholder review of ENHANCEMENT_PROPOSAL.md (30 min)
- [ ] Get alignment on Phase 1 scope (do all 4 features make v1, or prioritize?)
- [ ] Confirm data availability:
  - [ ] Transit time aggregation (shipment pickup → delivery timestamps)
  - [ ] Payment status real-time access (< 15 min latency acceptable?)
  - [ ] Peer benchmarking data access (confidential? anonymized?)
- [ ] Create design system review agenda for new components:
  - Time-to-Location Card
  - Alternatives Sidebar
  - Payment Status KPI row
  - Aging Summary widget

### For Design
- [ ] Review QUICK_REFERENCE.md spotlights (Figures 1–4)
- [ ] Create wireframes for Phase 1 features (use before/after examples as reference)
- [ ] Confirm new components needed in design system:
  - Sidebar panel component (reusable)
  - Benchmark overlay pattern (chart library)
  - Aging bucket widget
  - Cost impact widget
- [ ] Plan design QA: Accessibility, mobile responsiveness, dark mode (if applicable)

### For Engineering
- [ ] Audit data layer:
  - [ ] Can we aggregate transit times from shipment records? (performance impact?)
  - [ ] Is payment status available as a real-time API? (or batch feed?)
  - [ ] Can we access peer benchmarking data securely?
- [ ] Assess effort for each Phase 1 feature:
  - Time-to-Location (data aggregation + charting)
  - Alternatives Sidebar (filtering + ranking logic)
  - Payment Status (data integration + table filtering)
  - AI Insight enhancement (prompt + UI)
- [ ] Identify blockers (security review, data governance, AI model access)

### For AI/ML (if applicable)
- [ ] Review AI use case examples in QUICK_REFERENCE.md
- [ ] Assess what requires new model vs. prompting improvements
- [ ] Plan RAG strategy: What data is needed for each query type?
- [ ] Scope confidence scoring and evidence linking

---

## Stakeholder Discussion Guide

**Use this to frame conversations with leadership:**

### For Freight Manager (Customer Impact)
**Pitch:** "We cut your time to find alternative carriers from 10 min → 30 sec"
- Time-to-Location card + Alternatives sidebar in action
- Demo: Current page → Show red lane → Alternatives sidebar pops
- Win: Make better routing decisions faster

### For AP Analyst (Operational Impact)
**Pitch:** "We consolidated your invoice tracking into one view"
- Payment Status row + Aging Summary
- Demo: See what's pending, disputed, aged; bulk resolve in 2 clicks
- Win: Close invoices 50% faster

### For CFO (Strategic Impact)
**Pitch:** "We added peer benchmarking to show you where you stand + opportunities"
- Executive Summary + Benchmark Overlay
- Demo: "You're 1.7 pts below peer OTIF. Here's the ROI of fixing it."
- Win: Data-driven reallocation strategy + $200K+ annual savings opportunity

### For Executive (Competitive Positioning)
**Pitch:** "We're differentiating with AI-powered insights no competitor offers"
- Show AI query examples (3–5 concrete examples)
- Show phase 3 roadmap (conversational AI, proactive alerts)
- Win: Retention story + proof of AI commitment

---

## Resource & Timeline Estimates

### Option A: Phased Delivery (Recommended)
```
Phase 1 (MVP):    4 weeks  → 2–3 engineers, 1 designer
Phase 2 (Growth): 7 weeks  → 2–3 engineers, 1 designer
Phase 3 (AI):     13 weeks → 2–3 engineers, 1 ML engineer

Total: ~6 months to full capabilities
Benefit: Risk mitigation, iterative user feedback, faster MVP launch
```

### Option B: Accelerated (If needed)
```
Phase 1 (MVP):    3 weeks  → 3–4 engineers, 2 designers (parallel work)
Reduce scope:     Drop "Enhanced AI Insight" from Phase 1 (do in Phase 2)
Risk:             Tighter timeline, less testing, potential quality issues
```

---

## Success Criteria: How Will We Know This Worked?

### Engagement Metrics (Measure in Week 3 of Phase 1 Launch)
- [ ] **Time-to-Location adoption:** >35% of Freight Managers using it
- [ ] **Alternatives sidebar interactions:** >20% click rate on underperforming lanes
- [ ] **Payment Status clicks:** >40% of AP Analysts filtering by status on first visit

### Workflow Time Metrics (Measure in Week 4 of Phase 1 Launch)
- [ ] **Route decision time:** From 10 min → <3 min (timed user testing)
- [ ] **Invoice reconciliation:** Reduced time-to-resolve by 30% (compare before/after)
- [ ] **Query-to-insight time:** <8 seconds for standard AI queries

### Business Metrics (Measure in Month 2 of Phase 1 Launch)
- [ ] **OTIF improvement:** Reallocations enabled by alternatives sidebar → +1–2 pts program OTIF
- [ ] **Exception resolution:** Payment Status integration → 40% reduction in time-to-close
- [ ] **Cost optimization:** Benchmark overlay helps identify $200K+ reallocation savings opportunity

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| **Data latency too high** — Payment status, benchmark data not available in real-time | Can't ship Phase 1 with confidence | Negotiate SLA with data team; consider v1 with 15-min latency, v2 with real-time |
| **AI model limitations** — Can't generate accurate "root cause" explanations | AI credibility suffers | Scope Phase 1 AI to simpler queries; defer advanced analysis to Phase 2 |
| **Scope creep** — Stakeholders want "just a few more features" in Phase 1 | Timeline slips, quality suffers | Define MVP strictly; document Phase 2 clearly; say "we'll do that in Phase 2" frequently |
| **Design system rework** — New components require significant design system changes | Blocks engineering | Audit design system early (this week); flag missing patterns; prioritize reusable components |
| **Integration complexity** — Connecting to payment system requires security review | Legal/compliance delay | Start security review NOW; don't wait for engineering to ask |

---

## Questions for Clarification (Before Starting Phase 1)

1. **MVP Scope:** Are all 4 Phase 1 features (Time-to-Location, Alternatives, Payment Status, Enhanced AI) must-have, or can we cut one?

2. **Data Integration:** 
   - Can we access payment status in real-time or is 15-min batch acceptable for v1?
   - Do we have peer/benchmark data we can safely share (anonymized)?
   - What's the performance cost of aggregating transit times across 30 days of shipments?

3. **AI Model:**
   - Should AI recommendations use only US Bank data, or also external factors (weather, facility intel, fuel prices)?
   - How much explainability do we need for Phase 1 vs. Phase 2?

4. **Competitive Timeline:**
   - When do competitors (Trax, Cass, Freehand) need to see this in action? (informs urgency)
   - Is there a customer pitch deadline that drives Phase 1 launch date?

5. **Infrastructure:**
   - Do we have an AI model (LLM) ready to use, or do we need to select/train one?
   - Is there a security/compliance review needed before shipping any AI features?

---

## Next Meeting Agenda (Suggested)

**Duration:** 60 minutes  
**Attendees:** Product, Design, Engineering, AI/ML (if applicable), Customer Partner (if available)

1. **(5 min)** Executive summary of findings: 3 personas, 3 opportunity gaps
2. **(10 min)** Walk-through QUICK_REFERENCE.md: Before/after examples
3. **(15 min)** Discuss Phase 1 scope: Which 4 features are must-have?
4. **(10 min)** Data availability questions (see section above)
5. **(10 min)** Resource & timeline: Which option (A or B)?
6. **(10 min)** Action items & owners going forward

**Outcome:** Aligned MVP scope, identified blockers, clear next steps

---

## Files & Reference Guide

### Documents Created
- **CARRIER_PERFORMANCE_ENHANCEMENT_PROPOSAL.md** — Full spec document (for design & eng)
- **CARRIER_PERFORMANCE_QUICK_REFERENCE.md** — User-facing examples & demos (for UX testing & sales)
- **/memories/session/carrier-performance-enhancement-strategy.md** — Strategy checklist

### Key Sections to Share with Different Audiences

| Audience | Share | Purpose |
|---|---|---|
| **Freight Manager (Customer)** | QUICK_REFERENCE.md Sections 1–2 | Validate that features address their workflows |
| **AP Analyst (Customer)** | QUICK_REFERENCE.md Sections 1–3, Focus on Persona #2 | Confirm reconciliation improvements |
| **CFO/Executive** | ENHANCEMENT_PROPOSAL.md Sections 2.3, QUICK_REFERENCE.md Persona #3 | Show competitive positioning + ROI |
| **Design Team** | ENHANCEMENT_PROPOSAL.md Sections 5.1–5.2, QUICK_REFERENCE.md Figures 1–4 | Design system requirements + components |
| **Engineering Team** | ENHANCEMENT_PROPOSAL.md Section 6, Full QUICK_REFERENCE.md | Feature specs + data dependencies + effort estimates |
| **AI/ML Team** | QUICK_REFERENCE.md Section "AI Query Examples" + ENHANCEMENT_PROPOSAL.md Section 8 | Scope model requirements |
| **Stakeholders/Exec** | ENHANCEMENT_PROPOSAL.md Sections 1–3, Competitive Differentiation | Business case + competitive window |

---

## Phase 1 Checklist (After Kickoff)

Use this to track progress once Phase 1 launches:

### Week 1: Planning & Design
- [ ] Design kickoff meeting completed
- [ ] Data layer audit completed (identify blockers early)
- [ ] Wireframes completed for all 4 Phase 1 features
- [ ] Design system review scheduled
- [ ] Security review initiated (if needed for payment status)

### Week 2: Design System & Components
- [ ] New components added to design system (sidebar, aging widget, etc.)
- [ ] Component library updated
- [ ] Design QA checklist created (a11y, responsive, etc.)

### Week 3: Engineering & AI
- [ ] Sprint planning completed; engineering tasks broken down
- [ ] Data queries optimized (transit time aggregation tested)
- [ ] AI prompts drafted for Phase 1 insights
- [ ] First feature (Time-to-Location) in dev
- [ ] User testing plan drafted

### Week 4: QA & Launch Prep
- [ ] Phase 1 features in QA
- [ ] Design QA sign-off
- [ ] Security review sign-off (if applicable)
- [ ] User testing completed (Freight Manager + AP Analyst)
- [ ] Launch documentation started

### Launch (End of Week 4–5)
- [ ] A/B test or phased rollout plan
- [ ] User comms drafted
- [ ] Metrics baseline established
- [ ] Support team briefed

---

## Final Recommendation

**Ship Phase 1 in 4 weeks.** The four features directly address articulated user pain points and are technically achievable:

1. ✅ **Time-to-Location** — Low-risk data aggregation + visualization
2. ✅ **Alternatives Sidebar** — Medium-risk logic/UX, high user value
3. ✅ **Payment Status** — Medium-risk data integration, high AP value
4. ✅ **Enhanced AI Insight** — Low-risk prompt tuning + UI polish

This builds credibility, validates the enhancement direction with real users, and gives you momentum for Phase 2.

**Then do Phase 2 (7 weeks) for CFO positioning and benchmark capabilities.**

**Then do Phase 3 (13 weeks) for the AI-native competitive story.**

---

**Questions or feedback?** Review the full ENHANCEMENT_PROPOSAL.md or QUICK_REFERENCE.md, and schedule a debrief to discuss next steps.

**Prepared by:** Slalom Consulting Product Team  
**Date:** August 14, 2026  
**Status:** Ready for Stakeholder Review & Kickoff Planning
