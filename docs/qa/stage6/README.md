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
