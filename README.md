# US Bank Freight Payment Analytics — Dashboard Prototype

## Overview

This is a collaborative static HTML prototype for the US Bank Freight Payment Analytics dashboard. It is designed for the **Freight Manager** persona — focused on OTIF performance, carrier scorecards, and shipment origin/destination visibility. There is no build step; open the files directly in a browser.

---

## Getting Started

1. Clone the repo and open `index.html` in your browser — that's it.
2. **Important:** open files from the project root so relative CSS paths (`../assets/css/`) resolve correctly. Do not open a page file directly from Finder/Explorer by double-clicking it from inside `pages/`.
3. Recommended: install the **VS Code Live Server** extension (`ritwickdey.LiveServer`). Right-click `index.html` → "Open with Live Server" for auto-reload on save.

---

## Page Inventory

| Page | File | Description | Status |
|---|---|---|---|
| Dashboard | `index.html` | Primary landing page — summary KPIs, trends, AI suggestions | ✅ Built |
| Invoices | `pages/invoices.html` | Invoice list with BOL data and line-item detail | ✅ Built |
| Carrier Performance | `pages/carrier-performance.html` | Carrier OTIF scorecards and lane-level detail | ✅ Built |
| Shipment Status | `pages/shipment-status.html` | Active shipment tracking with milestone steps | ✅ Built |
| Exceptions | `pages/exceptions.html` | Exception queue and triage workflow | ✅ Built |
| AI Assistant | `pages/ai-assistant.html` | Conversational chat — daily digest, PO lookup, cost-leak finder | ✅ Built |

---

## Working on This Project

### Which CSS file to edit

| Change type | File |
|---|---|
| Colors, spacing, type scale, shadows | `assets/css/tokens.css` — edit here first |
| Sidebar, topbar, navigation, app shell layout | `assets/css/shell.css` |
| Reusable UI components (cards, tables, badges, buttons) | `assets/css/components.css` |
| Styles specific to one page | `<style>` block at the top of that page's `.html` file |

Keep page-specific styles out of the shared CSS files. If you find yourself writing the same local style on two pages, move it to `components.css`.

### Adding a new page

1. Copy an existing page (e.g., `pages/shipment-status.html`) as your starting point — it has the full app shell (sidebar, topbar, content wrapper).
2. Update the active nav item: find the `<a>` with `class="nav-item active"` and move `active` to the link for your new page.
3. Add a row for it in the Page Inventory table above.

### Commit conventions

Write short, descriptive commit messages in imperative mood:

```
Add OTIF trend chart to carrier performance page
Fix badge color for overdue exceptions
Update tokens.css navy shade to match design system
```

Avoid generic messages like "updates" or "WIP changes."

### Housekeeping

- `.DS_Store` files are already in `.gitignore` — don't force-add them.
- Don't commit commented-out blocks of dead code. Delete it; git history is the undo button.

---

## Design System Reference

Open `context/design/02-design-system.html` in a browser for the full component library — colors, type, spacing, every component with live examples.

Key design decisions:

- **Palette:** Navy (`#0C2340`) / Cerulean (`#009FDA`) / Amber (`#F5A623`) — navy for structure, cerulean for primary actions and data highlights, amber reserved exclusively for AI-generated content.
- **Data seam:** A thin cerulean left-border stripe is the signature element on data cards and stat surfaces — use `.stat-card` and `.table-card` to get it automatically.
- **Amber = AI only.** Never use amber for status, warnings, or decoration. It signals AI provenance. Use `.badge-amber` and `.ai-card` / `.btn-ai` for AI content exclusively.
- **Monospace for data:** DM Mono is applied via `.td-mono` for all numbers, invoice IDs, PRO numbers, and freight identifiers. Do not render numeric data in the body font.

The PRD is at `context/product/USBank-Freigh-PRD.md` for product/persona context.

---

## Key CSS Classes

Quick reference — all defined in `assets/css/components.css` unless noted.

### Layout (`shell.css`)
| Class | Purpose |
|---|---|
| `.app` | Root flex container (sidebar + main) |
| `.sidebar` | Left navigation panel |
| `.main` | Right content area |
| `.content` | Padded content wrapper inside `.main` |
| `.topbar` | Top bar with page title and actions |
| `.suggestions` | AI suggestion strip below topbar |
| `.page-filter-bar` | Filter/search bar row at top of page content |

### Typography
| Class | Purpose |
|---|---|
| `.page-title` | H1-level page heading |
| `.page-meta` | Subdued metadata line below page title |
| `.chart-title` | Card/chart heading |
| `.chart-subtitle` | Secondary label beneath chart title |

### Stat Cards
| Class | Purpose |
|---|---|
| `.stat-row` | Flex row of stat cards (3-up default) |
| `.stat-row-4` | Flex row of stat cards (4-up) |
| `.stat-card` | Individual stat card with data seam |
| `.stat-card.featured` | Larger emphasized stat card |
| `.stat-label` | Label above the number |
| `.stat-value` | The big number |
| `.stat-delta` | Delta / change indicator |
| `.delta-up` | Green upward delta |
| `.delta-down` | Red downward delta |
| `.delta-neutral` | Slate neutral delta |

### Tables
| Class | Purpose |
|---|---|
| `.table-card` | Card wrapper for a data table |
| `.table-header` | Header row inside `.table-card` |
| `.td-mono` | DM Mono cell — use on all IDs and numbers |
| `.td-right` | Right-aligned cell |
| `.td-sub` | Subdued secondary text within a cell |
| `.row-flagged` | Amber-tinted row for items needing attention |
| `.row-error` | Red-tinted row for error/critical state |

### Badges
| Class | Purpose |
|---|---|
| `.badge-success` | Green — on-time, approved, delivered |
| `.badge-amber` | Amber — AI-generated content only |
| `.badge-danger` | Red — late, rejected, critical |
| `.badge-blue` | Cerulean — in transit, active |
| `.badge-navy` | Navy — neutral informational |
| `.badge-slate` | Slate — secondary/muted state |

### Buttons
| Class | Purpose |
|---|---|
| `.btn-primary` | Cerulean fill — primary action |
| `.btn-ghost` | Outlined — secondary action |
| `.btn-ai` | Amber fill — AI-triggered action only |
| `.btn-danger` | Red — destructive action |
| `.btn-success` | Green — confirm/approve action |
| `.btn-sm` | Size modifier — applies to any button variant |

### AI Elements
| Class | Purpose |
|---|---|
| `.ai-card` | Amber-accented card for AI-generated content |
| `.ai-badge` | Small "AI" label pill |
| `.ai-card-text` | Body text inside an AI card |
| `.ai-card-actions` | Action row at the bottom of an AI card |

### Exceptions
| Class | Purpose |
|---|---|
| `.exception-row` | Single exception item row |
| `.exc-type-dot` | Colored dot indicating exception category |
| `.exc-body` | Main text content of the exception |
| `.exc-meta` | Metadata line (carrier, route, invoice ref) |
| `.exc-age` | Time-since indicator |

### Shipments
| Class | Purpose |
|---|---|
| `.shipment-card` | Card for a single active shipment |
| `.milestone-steps` | Container for milestone step track |
| `.milestone-step` | Individual step in the milestone track |
| `.step-dot` | Circle indicator for a milestone step |

---

## Data & Content

All data in the prototype is placeholder/static. When adding new pages or components, use realistic freight data formats:

- **Invoice IDs:** `INV-2026-XXXXXXXX` (e.g., `INV-2026-00041829`)
- **PRO numbers:** `XXXX-XXXXX` (e.g., `8821-94302`)
- **Freight classes (NMFC):** 50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500
- **Carrier names:** Use real LTL/TL carrier names (XPO Logistics, Old Dominion, Estes Express, Saia, FedEx Freight, UPS Freight, R+L Carriers, etc.)

Avoid lorem ipsum or obviously fake data — realistic placeholder content makes the prototype easier to evaluate in client reviews.
