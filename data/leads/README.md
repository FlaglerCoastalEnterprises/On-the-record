# Source scout leads

Written each morning by the On The Record source scout (a scheduled task run by Claude for Flagler Coastal Enterprises).

- One file per day: `YYYY-MM-DD.json`.
- Each lead lists what happened, where, the official source link (when one was found) and any news coverage.
- `status: "confirmed"` means the official record was found and linked. `status: "unconfirmed"` means only news coverage was found so far. Publish only confirmed leads, citing the official record first.
- Leads are internal working notes. They are not shown on the site.

## Crediting reporters (applies to every lead and every published item)

- For each news link, record the outlet, the reporter's name as bylined ("Staff" if none), the publish date, and whether that outlet broke the story first.
- Published items show: "Reported by <reporter>, <outlet>, <date>" with a link to the original story, plus "first reported by <outlet>" when they broke it, even after the official record confirms it.
- Summarize in our own words; quote no more than a short phrase. Link paywalled stories so readers can subscribe.
- Facts can come from newsrooms of any political viewpoint (outlets marked `"perspective": true` in data/sources.json). Use their reported facts only, never opinion, and confirm them in the official record or a second newsroom first.
