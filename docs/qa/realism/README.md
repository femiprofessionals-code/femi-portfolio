# Realism pass on Home (Femi: "do your very best")

## What still gave the room away, and what changed
| Tell | Fix |
|---|---|
| A pale **oval** behind the name at golden hour, and a **band** behind the captions at night: shapes on the plaster that no real wall has | Washes removed. Each line now carries its own soft halo that hugs the letters, like light catching lettering. On the smallest lines only (dates, golden eyebrow), there's a faint pool of light the size of the line, feathered to nothing. |
| The travel caption at night: dark ink on a wall in shade | Light ink with a dark halo, like the name at night |
| **Dark slivers** at the screen's bottom corners | The side extensions had dark fades over their last ~12 rows. These are replaced with the room's own floor and ceiling rows (`docs/asset-lock/scripts/edgefix.py`). The outer columns are untouched: the cover layout never shows them. |
| Small date lines hard to read | 10 → 11 px minimum (`.64cqw`) |

## Verified
- **Contrast:** 132 checks pass (2560×1080, 1920×1080, 1440×900 and 1366×657 × morning, golden and night × 11 text elements). Each is measured against the rendered background including the text's own halo, on the letters' area (`contrast-check.js`). The minimum is 4.2, on the name in golden light, which is large text (≥ 24 px); its threshold is 3:1. All small text is ≥ 4.5.
- **Screenshots:** before and after at 1920 for golden and night, after for all lights, and 1366 golden.

## Already true, so not redone
The paintings already carry the room's own light and leaf shadows (DL-31): they're relit from the blank mats in each light.
