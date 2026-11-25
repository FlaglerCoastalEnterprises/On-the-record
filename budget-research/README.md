# Follow the Money: Budget Research Data

This is the research base for On The Record's upcoming budget tracker. It isn't published as a page yet. These files are the single source the tracker page, and the On The Record summary card, will read from.

**As of:** November 25, 2026 · **Fiscal year:** FY2027 (county and cities: Oct 1, 2026 to Sep 30, 2027; schools: Jul 1, 2026 to Jun 30, 2027)

## What's here

| File | What it holds |
| --- | --- |
| `governments/flagler-county.json` | $333,288,593 adopted budget (Sept. 14), general fund revenue and spending by function, millage, reserves, debt, CRA payments, special assessments, staffing |
| `governments/palm-coast.json` | $533,947,885 adopted budget (Sept. 23), 4.1387 mills (rolled-back rate), fund breakdown, timeline |
| `governments/flagler-schools.json` | $353,097,566 adopted budget (Sept. 8), 5.312 mills by component, fund totals, 1.5-mill capital list, voucher history 2020–2027 |
| `governments/flagler-sheriff.json` | Proposed $51.97M budget, law enforcement vs. jail, share of county general fund, Palm Coast contract, Amendment 3 impact |
| `governments/flagler-beach.json` | ~$44.5M adopted budget (Sept. 24), 5.45 mills, pay changes, calendar |
| `governments/bunnell.json` | Tentative 7.93 mills, $7.4M general fund, police, City Hall debt, tax base (final adoption still to confirm) |
| `levies-fy2026.json` | Florida Dept. of Revenue official comparison of every Flagler taxing authority (latest statewide table) |
| `calendar.json` | Yearly budget cycle and every FY2027 hearing date |
| `glossary.json` | Plain-English definitions (millage, rolled-back rate, TRIM, CRA, Amendment 3…) |
| `schema-and-calculator.json` | Standard spending categories for comparing any Florida place, plus "what it costs you" calculator rules |
| `sources.json` | Every source with its link. Every figure in the files points to one by key (`src`). |

## Rules

1. **Every number has a source.** No figure goes on the site without its `src` link.
2. **Label the stage:** proposed, tentative, adopted or amended.
3. **Official documents first.** When a figure only has a news source, replace it with the government document once it's found.
4. **Open questions stay visible.** Each government file has an `open_questions` list. Don't fill those gaps with guesses.

## Biggest gaps to close before launch

- Final adopted FY2027 county millage by levy (resolution not yet posted)
- Bunnell final adopted budget and citywide total
- Flagler Beach exact adopted total (adopted book not yet posted)
- Final Sheriff budget and Palm Coast Sheriff contract amount
- Whether any government posts monthly or quarterly spending reports

## Adding another place

Copy a government file, keep the same field names, map spending to the standard categories in `schema-and-calculator.json`, add its sources to `sources.json`, then run the source check: every `src` key must exist in `sources.json`.
