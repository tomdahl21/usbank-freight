import {
  CARRIERS, INVOICES, SHIPMENTS, EXCEPTIONS, SUMMARY, CUSTOMERS,
  findShipment, findCarrier, findInvoice, findByCustomer,
  getOpenExceptions, getExceptionsByCarrier, formatMoney,
} from './mockData.js'

// ─── Intent detection ─────────────────────────────────────────────────────────

const INTENTS = [
  { id: 'briefing',     patterns: [/briefing/i, /morning/i, /digest/i, /summary/i, /overview/i, /catch me up/i, /what.s new/i] },
  { id: 'po_lookup',    patterns: [/\bPO[-\s]?\d/i, /\bBOL[-\s]?\d/i, /\bPRO[-\s]?\d/i, /order\s+\d/i, /shipment\s+\d/i, /find.*order/i, /check on/i, /status of/i, /where is/i, /track/i] },
  { id: 'otif',         patterns: [/\botif\b/i, /on.time/i, /delivery performance/i, /performance/i, /late/i, /on time/i] },
  { id: 'carrier',      patterns: [/carrier/i, /fedex/i, /ups/i, /saia/i, /xpo/i, /old dominion/i, /abf/i, /who.*best/i, /best carrier/i, /worst carrier/i] },
  { id: 'exceptions',   patterns: [/exception/i, /dispute/i, /mismatch/i, /flag/i, /discrepan/i, /overcharg/i, /short/i, /issue/i] },
  { id: 'invoices',     patterns: [/invoice/i, /\bINV-/i, /billing/i, /billed/i, /payment/i, /audit/i] },
  { id: 'spend',        patterns: [/spend/i, /cost/i, /spend analysis/i, /how much/i, /total/i, /budget/i, /saving/i, /recover/i] },
  { id: 'alternatives', patterns: [/alternative/i, /switch/i, /replace/i, /instead of/i, /better than/i, /recommend.*carrier/i] },
  { id: 'customer',     patterns: [/dick.?s/i, /nike/i, /adidas/i, /nordstrom/i, /\brei\b/i, /academy/i, /consignee/i, /customer/i, /shipping to/i, /going to/i, /deliver.*to/i] },
]

function detectIntent(text) {
  for (const intent of INTENTS) {
    if (intent.patterns.some(p => p.test(text))) return intent.id
  }
  return 'unknown'
}

// ─── Extract entity references from query ─────────────────────────────────────

function extractRef(text) {
  const poMatch  = text.match(/PO[-\s]?(\d[\w-]*)/i)
  const bolMatch = text.match(/BOL[-\s]?([\w-]+)/i)
  const proMatch = text.match(/PRO[-\s]?([\w-]+)/i)
  const invMatch = text.match(/INV[-\s]?([\w-]+)/i)
  return {
    po:  poMatch  ? poMatch[0]  : null,
    bol: bolMatch ? bolMatch[0] : null,
    pro: proMatch ? proMatch[0] : null,
    inv: invMatch ? invMatch[0] : null,
  }
}

function extractCustomerName(text) {
  const names = ["Dick's Sporting Goods", "Dicks", "Nike", "Adidas", "Nordstrom", "REI", "Academy Sports", "Academy"]
  return names.find(n => text.toLowerCase().includes(n.toLowerCase())) || null
}

function extractCarrierName(text) {
  const names = ['FedEx Freight', 'UPS Freight', 'SAIA LTL', 'SAIA', 'XPO Logistics', 'XPO', 'Old Dominion', 'ABF Freight', 'ABF', 'FedEx', 'UPS']
  return names.find(n => text.toLowerCase().includes(n.toLowerCase())) || null
}

// ─── Response builders ────────────────────────────────────────────────────────

function buildBriefing() {
  const open = getOpenExceptions()
  const bolMismatches = open.filter(e => e.type === 'BOL Mismatch')
  const worstCarrier = CARRIERS.slice().sort((a, b) => a.otif - b.otif)[0]
  return {
    type: 'briefing',
    title: 'Morning Freight Briefing',
    lines: [
      { label: 'OTIF', value: `${SUMMARY.otifOverall}% overall — ${SUMMARY.otifTrend > 0 ? '+' : ''}${SUMMARY.otifTrend} pts vs last period` },
      { label: 'Exceptions', value: `${open.length} open exceptions · ${bolMismatches.length} are BOL class mismatches` },
      { label: 'Recovery', value: `${formatMoney(SUMMARY.exceptionRecovery)} identified in audit recovery opportunities` },
      { label: 'Watch', value: `${worstCarrier.name} on ${SUMMARY.worstLane} — lowest OTIF at ${worstCarrier.otif}%` },
    ],
    cta: bolMismatches.length > 0
      ? `I can batch-dispute the ${bolMismatches.length} BOL mismatches in one action. Want me to draft those?`
      : null,
  }
}

function buildPoLookup(query) {
  const ref = extractRef(query)
  const key = ref.po || ref.bol || ref.pro || query
  const shipment = findShipment(key)

  if (!shipment) {
    return {
      type: 'not_found',
      text: `I couldn't find a shipment matching **${key.trim()}**. Try a PO number (e.g. PO 90142-C), BOL number, or PRO number.`,
    }
  }

  return {
    type: 'po_lookup',
    shipment,
    note: shipment.otif === 'At Risk'
      ? `This shipment is at risk — ETA slip of ${shipment.etaSlip}h detected. Current projected delivery misses the ${shipment.window} window.`
      : shipment.otif === 'Short'
      ? `Short delivery exception active on this PO. Not all pallets received.`
      : null,
  }
}

function buildOtif(query) {
  const carrierName = extractCarrierName(query)
  if (carrierName) {
    const carrier = findCarrier(carrierName)
    if (carrier) {
      const excs = getExceptionsByCarrier(carrier.id)
      return {
        type: 'carrier_otif',
        carrier,
        exceptions: excs,
        text: `**${carrier.name}** is running at **${carrier.otif}% OTIF** (${carrier.trend > 0 ? '+' : ''}${carrier.trend} pts trend). ${carrier.onTime}% on-time, ${carrier.late}% late, ${carrier.short}% short. They have ${excs.filter(e => e.status === 'Open').length} open exceptions.`,
      }
    }
  }

  const sorted = CARRIERS.slice().sort((a, b) => b.otif - a.otif)
  return {
    type: 'otif_summary',
    carriers: sorted,
    text: `Overall OTIF is **${SUMMARY.otifOverall}%**, up ${SUMMARY.otifTrend} pts from last period.`,
  }
}

function buildCarrier(query) {
  const carrierName = extractCarrierName(query)
  if (carrierName) return buildOtif(query)

  const isWorst = /worst|lowest|bottom|poor|bad/i.test(query)
  const sorted  = CARRIERS.slice().sort((a, b) => isWorst ? a.otif - b.otif : b.otif - a.otif)
  const top     = sorted[0]

  return {
    type: 'carrier_rank',
    carriers: sorted,
    highlight: top,
    text: isWorst
      ? `Your lowest-performing carrier is **${top.name}** at ${top.otif}% OTIF. Their worst lane is ${top.topLane}.`
      : `Your best-performing carrier is **${top.name}** at ${top.otif}% OTIF, with ${formatMoney(top.spend)} in managed spend.`,
  }
}

function buildExceptions(query) {
  const carrierName = extractCarrierName(query)
  const open = getOpenExceptions()

  if (carrierName) {
    const carrier = findCarrier(carrierName)
    if (carrier) {
      const carrierExcs = open.filter(e => e.carrierId === carrier.id)
      return {
        type: 'exceptions_carrier',
        carrier,
        exceptions: carrierExcs,
        text: `**${carrier.name}** has ${carrierExcs.length} open exception${carrierExcs.length !== 1 ? 's' : ''} totaling ${formatMoney(carrierExcs.reduce((s, e) => s + (e.amount || 0), 0))}.`,
      }
    }
  }

  const byType = open.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1
    return acc
  }, {})
  const totalRecovery = EXCEPTIONS.filter(e => e.status !== 'Resolved' && e.amount)
    .reduce((s, e) => s + e.amount, 0)

  return {
    type: 'exceptions_summary',
    open,
    byType,
    totalRecovery,
    text: `There are **${open.length} open exceptions** across ${[...new Set(open.map(e => e.carrierId))].length} carriers. Potential recovery: **${formatMoney(totalRecovery)}**.`,
  }
}

function buildInvoices(query) {
  const ref = extractRef(query)
  if (ref.inv) {
    const inv = findInvoice(ref.inv)
    if (inv) {
      return {
        type: 'invoice_detail',
        invoice: inv,
        text: `**${inv.id}** — ${inv.carrier}, ${inv.route}. Contracted: ${formatMoney(inv.contracted)}, Billed: ${formatMoney(inv.billed)}, Delta: ${inv.delta > 0 ? '+' : ''}${formatMoney(inv.delta)}.${inv.flagReason ? ` Flag: ${inv.flagReason}` : ''}`,
      }
    }
  }

  const exceptions = INVOICES.filter(i => i.exception)
  const totalDelta  = INVOICES.reduce((s, i) => s + i.delta, 0)
  return {
    type: 'invoice_summary',
    exceptions,
    totalDelta,
    text: `${SUMMARY.invoicesException} invoices flagged with exceptions this period. Pending audit: ${SUMMARY.invoicesPending.toLocaleString()} invoices. Total billing delta: +${formatMoney(totalDelta)}.`,
  }
}

function buildSpend(query) {
  const sorted = CARRIERS.slice().sort((a, b) => b.spend - a.spend)
  return {
    type: 'spend_summary',
    carriers: sorted,
    text: `Total freight spend: **${formatMoney(SUMMARY.totalSpend)}** across ${CARRIERS.length} carriers. MTD spend is ${formatMoney(SUMMARY.spendMTD)}. Largest carrier by spend: **${sorted[0].name}** at ${formatMoney(sorted[0].spend)}.`,
  }
}

function buildAlternatives(query) {
  const carrierName = extractCarrierName(query)
  const source = carrierName ? findCarrier(carrierName) : CARRIERS.slice().sort((a, b) => a.otif - b.otif)[0]
  const alts = CARRIERS.filter(c => c.id !== source?.id && c.otif > (source?.otif || 0)).sort((a, b) => b.otif - a.otif).slice(0, 3)

  return {
    type: 'alternatives',
    source,
    alternatives: alts,
    text: source
      ? `Alternatives to **${source.name}** (${source.otif}% OTIF): ${alts.map(a => `${a.name} at ${a.otif}%`).join(', ')}.`
      : `Top performers available for reallocation: ${alts.map(a => `${a.name} (${a.otif}%)`).join(', ')}.`,
  }
}

function buildCustomer(query) {
  const name = extractCustomerName(query)
  const shipments = name ? findByCustomer(name) : SHIPMENTS

  if (name && shipments.length === 0) {
    return {
      type: 'not_found',
      text: `I don't have any active shipments on record for **${name}** right now.`,
    }
  }

  const atRisk   = shipments.filter(s => s.otif === 'At Risk' || s.otif === 'Short')
  const active   = shipments.filter(s => s.status === 'In Transit')
  const label    = name || 'all customers'

  return {
    type: 'customer_shipments',
    customer: name,
    shipments,
    atRisk,
    text: name
      ? `**${shipments[0].consignee.name}** has ${shipments.length} shipment${shipments.length !== 1 ? 's' : ''} on record — ${active.length} in transit${atRisk.length ? `, ${atRisk.length} at risk` : ', all on track'}.`
      : `Across all customers: ${shipments.length} shipments — ${active.length} in transit, ${atRisk.length} at risk.`,
  }
}

function buildUnknown(query) {
  return {
    type: 'unknown',
    text: `I don't have specific data on that yet. Try asking about a PO or BOL number, carrier performance, open exceptions, invoice details, or spend breakdown.`,
    suggestions: ['Morning briefing', 'Show open exceptions', 'OTIF by carrier', 'Check on PO 90142-C'],
  }
}

// ─── Main resolve function ────────────────────────────────────────────────────

export function resolveQuery(text) {
  const intent = detectIntent(text)
  switch (intent) {
    case 'briefing':     return buildBriefing()
    case 'po_lookup':    return buildPoLookup(text)
    case 'otif':         return buildOtif(text)
    case 'carrier':      return buildCarrier(text)
    case 'exceptions':   return buildExceptions(text)
    case 'invoices':     return buildInvoices(text)
    case 'spend':        return buildSpend(text)
    case 'alternatives': return buildAlternatives(text)
    case 'customer':     return buildCustomer(text)
    default:             return buildUnknown(text)
  }
}
