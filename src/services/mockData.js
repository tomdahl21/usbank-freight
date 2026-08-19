// ─── Carriers ────────────────────────────────────────────────────────────────
export const CARRIERS = [
  { id: 'fedex',  name: 'FedEx Freight',  mode: 'LTL', otif: 87.3, trend: -2.1, onTime: 84, late: 11, short: 5,  spend: 14200000, invoices: 4820, exceptions: 48, topLane: 'ORD→ATL' },
  { id: 'ups',    name: 'UPS Freight',    mode: 'LTL', otif: 91.4, trend: +0.8, onTime: 89, late: 7,  short: 4,  spend: 9800000,  invoices: 3210, exceptions: 21, topLane: 'LAX→DEN' },
  { id: 'saia',   name: 'SAIA LTL',       mode: 'LTL', otif: 95.1, trend: +1.2, onTime: 93, late: 4,  short: 3,  spend: 7600000,  invoices: 2540, exceptions: 9,  topLane: 'DFW→BNA' },
  { id: 'xpo',    name: 'XPO Logistics',  mode: 'TL',  otif: 96.8, trend: +0.3, onTime: 96, late: 3,  short: 1,  spend: 5400000,  invoices: 1820, exceptions: 5,  topLane: 'MEM→PHL' },
  { id: 'od',     name: 'Old Dominion',   mode: 'LTL', otif: 94.2, trend: +0.6, onTime: 92, late: 5,  short: 3,  spend: 3800000,  invoices: 1290, exceptions: 7,  topLane: 'CIN→MCI' },
  { id: 'abf',    name: 'ABF Freight',    mode: 'LTL', otif: 89.6, trend: -0.9, onTime: 87, late: 8,  short: 5,  spend: 1300000,  invoices: 660,  exceptions: 14, topLane: 'ATL→BAL' },
]

// ─── Invoices ─────────────────────────────────────────────────────────────────
export const INVOICES = [
  { id: 'INV-2026-00041897', pro: '4829-01847', carrier: 'FedEx Freight',  carrierId: 'fedex', mode: 'LTL', route: 'Chicago → Atlanta',         freightClass: 'Class 85',    billedLbs: 1240, contracted: 4180.00, billed: 4218.34, delta: 38.34,   otif: 'On Time', status: 'Paid',          exception: false, flagged: false },
  { id: 'INV-2026-00041721', pro: '2210-88432', carrier: 'UPS Freight',    carrierId: 'ups',   mode: 'LTL', route: 'LA → Denver',               freightClass: 'Class 70',    billedLbs: 580,  contracted: 810.00,  billed: 892.10,  delta: 82.10,   otif: 'Late',    status: 'Pending Audit', exception: true,  flagged: true,  flagReason: 'Freight class mismatch — BOL declares Class 70, billed as Class 85' },
  { id: 'INV-2026-00041654', pro: '9914-22019', carrier: 'SAIA LTL',       carrierId: 'saia',  mode: 'LTL', route: 'Dallas → Nashville',         freightClass: 'Class 92.5',  billedLbs: 340,  contracted: 1320.00, billed: 1441.75, delta: 121.75,  otif: 'Short',   status: 'Exception',     exception: true,  flagged: true,  flagReason: 'Short delivery — 2 of 5 pallets not received' },
  { id: 'INV-2026-00041523', pro: '7701-56234', carrier: 'XPO Logistics',  carrierId: 'xpo',   mode: 'TL',  route: 'Memphis → Philadelphia',     freightClass: 'N/A (TL)',    billedLbs: null, contracted: 12888.00,billed: 12888.00,delta: 0,       otif: 'On Time', status: 'Processed',     exception: false, flagged: false },
  { id: 'INV-2026-00041488', pro: '3308-77601', carrier: 'Old Dominion',   carrierId: 'od',    mode: 'LTL', route: 'Cincinnati → Kansas City',    freightClass: 'Class 100',   billedLbs: 1240, contracted: 2056.70, billed: 2104.50, delta: 47.80,   otif: 'On Time', status: 'Paid',          exception: false, flagged: false },
  { id: 'INV-2026-00041401', pro: '1102-66781', carrier: 'ABF Freight',    carrierId: 'abf',   mode: 'LTL', route: 'Atlanta → Baltimore',        freightClass: 'Class 125',   billedLbs: 760,  contracted: 1890.00, billed: 2114.50, delta: 224.50,  otif: 'On Time', status: 'Exception',     exception: true,  flagged: true,  flagReason: 'Freight class upgraded from 100 to 125 without authorization' },
  { id: 'INV-2026-00041388', pro: '9903-41220', carrier: 'FedEx Freight',  carrierId: 'fedex', mode: 'LTL', route: 'Chicago → Detroit',          freightClass: 'Class 70',    billedLbs: 920,  contracted: 1260.00, billed: 1405.00, delta: 145.00,  otif: 'On Time', status: 'Exception',     exception: true,  flagged: true,  flagReason: 'Fuel surcharge applied above contracted rate cap' },
  { id: 'INV-2026-00041322', pro: '5508-92034', carrier: 'Old Dominion',   carrierId: 'od',    mode: 'LTL', route: 'Cincinnati → Kansas City',    freightClass: 'Class 100',   billedLbs: 1240, contracted: 2056.70, billed: 2056.70, delta: 0,       otif: 'On Time', status: 'Paid',          exception: false, flagged: false },
]

// ─── Customers / Consignees ───────────────────────────────────────────────────
export const CUSTOMERS = {
  dicks:     { name: "Dick's Sporting Goods", id: 'dicks',    segment: 'Retail – Sporting Goods' },
  nike:      { name: 'Nike',                  id: 'nike',     segment: 'Retail – Apparel & Footwear' },
  adidas:    { name: 'Adidas',                id: 'adidas',   segment: 'Retail – Apparel & Footwear' },
  nordstrom: { name: 'Nordstrom',             id: 'nordstrom',segment: 'Retail – Department Store' },
  rei:       { name: 'REI',                   id: 'rei',      segment: 'Retail – Outdoor & Recreation' },
  academy:   { name: 'Academy Sports',        id: 'academy',  segment: 'Retail – Sporting Goods' },
}

// ─── Shipments / POs ──────────────────────────────────────────────────────────
export const SHIPMENTS = [
  {
    po: '90142-C', bol: 'BOL-10041', pro: 'PRO-88291', carrier: 'FedEx Freight', carrierId: 'fedex',
    route: 'ORD → ATL', origin: 'Chicago, IL', dest: 'Atlanta, GA',
    consignee: CUSTOMERS.dicks,
    dcName: "Dick's Sporting Goods DC – Atlanta",
    dcAddress: '2200 Commerce Dr, Atlanta, GA 30318',
    status: 'In Transit', otif: 'At Risk', etaSlip: 6,
    pickup: 'Aug 12', eta: 'Aug 14 7 PM', window: 'Aug 14 5 PM',
    legs: [
      { bol: 'BOL-10041', route: 'ORD→ATL', status: 'In Transit', otif: 'At Risk' },
      { bol: 'BOL-10038', route: 'DFW→BNA', status: 'Delayed',    otif: 'At Risk', note: '6-hr ETA slip, terminal congestion at DFW' },
      { bol: 'BOL-10031', route: 'LAX→DEN', status: 'Delivered',  otif: 'On Time' },
    ],
    weight: '2,400 lbs', pallets: 8, mode: 'LTL',
    contents: 'Athletic footwear – seasonal drop',
  },
  {
    po: '90138-A', bol: 'BOL-10055', pro: 'PRO-77401', carrier: 'SAIA LTL', carrierId: 'saia',
    route: 'DFW → BNA', origin: 'Dallas, TX', dest: 'Nashville, TN',
    consignee: CUSTOMERS.nike,
    dcName: 'Nike Regional DC – Nashville',
    dcAddress: '1800 Vantage Way, Nashville, TN 37228',
    status: 'Delivered', otif: 'On Time', etaSlip: 0,
    pickup: 'Aug 10', eta: 'Aug 13', window: 'Aug 13',
    legs: [{ bol: 'BOL-10055', route: 'DFW→BNA', status: 'Delivered', otif: 'On Time' }],
    weight: '340 lbs', pallets: 2, mode: 'LTL',
    contents: 'Apparel – training collection',
  },
  {
    po: '90129-B', bol: 'BOL-10022', pro: 'PRO-66120', carrier: 'UPS Freight', carrierId: 'ups',
    route: 'LAX → DEN', origin: 'Los Angeles, CA', dest: 'Denver, CO',
    consignee: CUSTOMERS.adidas,
    dcName: 'Adidas West Coast FC – Denver',
    dcAddress: '4500 Globeville Rd, Denver, CO 80216',
    status: 'In Transit', otif: 'On Track', etaSlip: 0,
    pickup: 'Aug 13', eta: 'Aug 15', window: 'Aug 15',
    legs: [{ bol: 'BOL-10022', route: 'LAX→DEN', status: 'In Transit', otif: 'On Track' }],
    weight: '580 lbs', pallets: 3, mode: 'LTL',
    contents: 'Footwear – Ultraboost restock',
  },
  {
    po: '90115-D', bol: 'BOL-10010', pro: 'PRO-55009', carrier: 'XPO Logistics', carrierId: 'xpo',
    route: 'MEM → PHL', origin: 'Memphis, TN', dest: 'Philadelphia, PA',
    consignee: CUSTOMERS.nordstrom,
    dcName: 'Nordstrom Fulfillment Center – Philadelphia',
    dcAddress: '1 Fulfillment Way, Philadelphia, PA 19153',
    status: 'Delivered', otif: 'On Time', etaSlip: 0,
    pickup: 'Aug 9', eta: 'Aug 11', window: 'Aug 11',
    legs: [{ bol: 'BOL-10010', route: 'MEM→PHL', status: 'Delivered', otif: 'On Time' }],
    weight: '18,000 lbs', pallets: null, mode: 'TL',
    contents: 'Luxury apparel & accessories – fall floor set',
  },
  {
    po: '90108-E', bol: 'BOL-10003', pro: 'PRO-44881', carrier: 'Old Dominion', carrierId: 'od',
    route: 'CIN → MCI', origin: 'Cincinnati, OH', dest: 'Kansas City, MO',
    consignee: CUSTOMERS.rei,
    dcName: 'REI Regional DC – Kansas City',
    dcAddress: '8800 NE Underground Dr, Kansas City, MO 64161',
    status: 'Exception', otif: 'Short', etaSlip: 0,
    pickup: 'Aug 11', eta: 'Aug 13', window: 'Aug 13',
    legs: [{ bol: 'BOL-10003', route: 'CIN→MCI', status: 'Exception', otif: 'Short', note: '3 of 5 pallets short-delivered' }],
    weight: '1,240 lbs', pallets: 5, mode: 'LTL',
    contents: 'Outdoor gear – camping equipment',
  },
  {
    po: '90099-F', bol: 'BOL-09988', pro: 'PRO-33201', carrier: 'ABF Freight', carrierId: 'abf',
    route: 'ATL → BAL', origin: 'Atlanta, GA', dest: 'Baltimore, MD',
    consignee: CUSTOMERS.academy,
    dcName: 'Academy Sports DC – Baltimore',
    dcAddress: '3600 Port Covington Dr, Baltimore, MD 21230',
    status: 'In Transit', otif: 'On Track', etaSlip: 0,
    pickup: 'Aug 13', eta: 'Aug 16', window: 'Aug 16',
    legs: [{ bol: 'BOL-09988', route: 'ATL→BAL', status: 'In Transit', otif: 'On Track' }],
    weight: '920 lbs', pallets: 4, mode: 'LTL',
    contents: 'Sporting goods – back-to-school promotion',
  },
]

// ─── Exceptions ───────────────────────────────────────────────────────────────
export const EXCEPTIONS = [
  { id: 'EX-0481', type: 'BOL Mismatch',      carrier: 'UPS Freight',   carrierId: 'ups',   invoice: 'INV-2026-00041721', route: 'LAX→DEN',  age: 3,  amount: 82.10,  status: 'Open',     priority: 'High' },
  { id: 'EX-0479', type: 'BOL Mismatch',      carrier: 'FedEx Freight', carrierId: 'fedex', invoice: 'INV-2026-00041388', route: 'ORD→DTW',  age: 5,  amount: 145.00, status: 'Open',     priority: 'High' },
  { id: 'EX-0478', type: 'Short Delivery',    carrier: 'Old Dominion',  carrierId: 'od',    invoice: null,                route: 'CIN→MCI',  age: 2,  amount: null,   status: 'Open',     priority: 'High' },
  { id: 'EX-0477', type: 'Class Upgrade',     carrier: 'ABF Freight',   carrierId: 'abf',   invoice: 'INV-2026-00041401', route: 'ATL→BAL',  age: 8,  amount: 224.50, status: 'Open',     priority: 'Medium' },
  { id: 'EX-0471', type: 'Short Delivery',    carrier: 'SAIA LTL',      carrierId: 'saia',  invoice: 'INV-2026-00041654', route: 'DFW→BNA',  age: 12, amount: 121.75, status: 'Disputed', priority: 'Medium' },
  { id: 'EX-0465', type: 'Fuel Surcharge',    carrier: 'FedEx Freight', carrierId: 'fedex', invoice: 'INV-2026-00041388', route: 'ORD→DTW',  age: 14, amount: 145.00, status: 'Disputed', priority: 'Low' },
  { id: 'EX-0441', type: 'BOL Mismatch',      carrier: 'UPS Freight',   carrierId: 'ups',   invoice: null,                route: 'LAX→DEN',  age: 21, amount: 82.10,  status: 'Resolved', priority: 'Low' },
  { id: 'EX-0418', type: 'Accessorial Charge',carrier: 'ABF Freight',   carrierId: 'abf',   invoice: null,                route: 'ATL→BAL',  age: 31, amount: 67.00,  status: 'Resolved', priority: 'Low' },
]

// ─── Summary stats ─────────────────────────────────────────────────────────────
export const SUMMARY = {
  totalSpend:        42100000,
  spendMTD:          3840000,
  otifOverall:       94.2,
  otifTrend:         +1.4,
  activeShipments:   127,
  openExceptions:    12,
  exceptionRecovery: 284000,
  invoicesTotal:     18340,
  invoicesPending:   3210,
  invoicesException: 248,
  topCarrier:        'XPO Logistics',
  bottomCarrier:     'FedEx Freight',
  worstLane:         'DFW → BNA (FedEx Freight, 81.4% OTIF)',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function findByCustomer(query) {
  const q = query.toLowerCase()
  return SHIPMENTS.filter(s =>
    s.consignee?.name.toLowerCase().includes(q) ||
    s.consignee?.id.toLowerCase().includes(q)
  )
}

export function findShipment(query) {
  const q = query.toUpperCase()
  return SHIPMENTS.find(s =>
    s.po.toUpperCase().includes(q) ||
    s.bol.toUpperCase().includes(q) ||
    s.pro.toUpperCase().includes(q)
  ) || null
}

export function findCarrier(query) {
  const q = query.toLowerCase()
  return CARRIERS.find(c =>
    c.name.toLowerCase().includes(q) ||
    c.id.toLowerCase().includes(q)
  ) || null
}

export function findInvoice(query) {
  const q = query.toUpperCase()
  return INVOICES.find(i =>
    i.id.toUpperCase().includes(q) ||
    i.pro.toUpperCase().includes(q)
  ) || null
}

export function getOpenExceptions() {
  return EXCEPTIONS.filter(e => e.status === 'Open')
}

export function getExceptionsByCarrier(carrierId) {
  return EXCEPTIONS.filter(e => e.carrierId === carrierId)
}

export function formatMoney(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}
