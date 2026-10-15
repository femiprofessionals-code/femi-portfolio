# Stage 6 QA — lighting (Home)

## What changed
- **Paintings lit by the room's own light.** Each light's blank mat (`public/room/v5/{mode}-3072`) is divided by that mat's morning median to give a lighting map. Each painting is multiplied by that map: the full brightness pattern (leaf shadows, lamp fall-off) and about 40% of its colour cast, so the brand blues stay blue. Output: `public/art/lit/{mode}-{id}.webp`; script: `docs/asset-lock/scripts/relight.py`.
- **Cross-fade.** The room and the lit paintings fade together over 1.4 s. With reduced motion the change is instant (transition ≈ 0 s).
- **Loading.** Only the active light (room and three paintings, ≈400 KB) is fetched before the load event. The other two follow when the browser is idle, so a change of light fades between images that are already loaded. Without JavaScript, the morning room and paintings show as CSS backgrounds.
- **Selector.**
  - Options are pressed-state buttons (`aria-pressed`).
  - Opening the menu moves focus to the current choice.
  - Escape, or making a choice, closes it and returns focus to the toggle.
  - Focus leaving the menu closes it.
  - The toggle's accessible name gives the current light, and whether it is automatic or manual.
- **Wall layout on laptops** (Femi's feedback). The threshold is now "the room can be drawn at least 860 px wide" (min-width 860, min-height 646), not 980×700. 1366×657, 1280×650, 1440×700 and 1536×730 all get the wall layout with the whole room in view.
- **Paintings clickable in every layout** (Femi's feedback). In the tablet and phone layouts, mouse and touch targets sit over the frames (`aria-hidden`, `tabindex=-1`); keyboard and screen-reader users use the labelled list below.

## Results
- `layout-report.json`: 13 window sizes. No horizontal overflow, one visible `h1`, and no console errors.
  - Every painting click opens the right `/experience#…` anchor, in every layout.
  - In the wall layout, the identity sits inside the wall and clears the art, and captions never overlap.
- `lighting-report.json`:
  - keyboard selection of Night works;
  - the pressed states update;
  - mid-fade opacity is morning 0.01 → night 0.99, and scene, art, identity and caption geometry are **unchanged** mid-fade and after it.
- Screenshots: `home-<size>.png`, `crossfade-midpoint.png`, `home-1440x900-night.png`, `home-1440x900-no-js.png`.

## Design pass (after Femi's "Don't you have UI/UX ability")
**Critique of the first build:**
- Blurred side bars took up to a quarter of a laptop screen.
- The whole image (ceiling included) plus a separate button band made the room small.
- An ivory strip and a black footer edge stacked at the bottom of the first screen.
- Bold uppercase years outweighed the company names.
- "Manual" in the nav was jargon.

**Changes:**
- **Wall layout fills the screen.**
  - Only the band from the wall text (plus nav clearance) to the rug's edge must be visible, so the ceiling and floor are trimmed before any width is given up: `W = min(100vw, (100svh − 100px) × 2.008)`. The scene is anchored so the rug ends 16 px above the bottom.
  - 1440×900, 1280×800 and 1024×768 are edge to edge. 16:9 laptops keep bars of ≈ 90–135 px, filled by the room's own edge columns extended with growing blur (`public/room/v5/edge-*`).
  - The tree, rug, sofa, wall text and paintings are always fully in view; there's a check for each in `layout-report.json`.
- **Button strip removed on the wall layout.** The nav already carries Work, Résumé and the Contact button, and the strip was costing room height. It is kept on tablets and phones, under the company list.
- **Captions:** company names in serif 500 lead; the years are smaller, at a lighter weight.
- **Selector:** shows "NYC 1:27 PM" when it follows New York time, and only the light's name when chosen manually.

**Re-verified:**
- 13 sizes in `layout-report.json`.
- Contrast: 108 elements across 4 sizes × 3 lights, 0 failures, minimum 5.11:1 (`contrast.json`).
- Selector, loading and fade geometry in `lighting-report.json`: only the active light, ≈ 400 KB, is fetched before load; geometry is unchanged mid-fade.
