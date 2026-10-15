# Stage 4 QA — static homepage

Build: `next build` passes, and `tsc --noEmit` is clean. The repo has no lint script.
Server: `next start`. Checks were run with Playwright and Chromium, with reduced motion on.

## Layouts by screen
| Size | Layout | What shows |
|---|---|---|
| 1440×900, 1280×800, 1024×768 | **wall** | The whole room is fitted at its 3:2 ratio (never cover-cropped), with side bars filled by the room's own light. Identity and captions sit on the wall. The action strip is visible in the first screen. |
| 768×1024 | **full** | The whole room at full width; identity and company links below it |
| 390×844, 360×800 | **crop** | Pictures and bench up close (crop rect from `scene.ts`), with identity, company links and actions below |

## Results (`report.json`, `contrast.json`)
- **Overflow:** no horizontal overflow at any size.
- **Layout shift:** CLS 0.000 everywhere.
- **Images and errors:** no broken images and no console errors.
- **Headings:** exactly one visible `h1`.
- **Wall text:** the identity block clears the artwork, and caption text boxes never overlap.
- **Contrast:** wall text is measured against the rendered pixels (the screenshot taken with the text made transparent):
  - 54 elements across 3 lights × 2 desktop sizes, **0 failures**;
  - the minimum worst-case is 4.9:1 (night, 1024×768);
  - the threshold is 4.5:1, or 3:1 for text 24px and up.
- **Keyboard:**
  - order is skip link → brand → nav → light selector → Contact → three company links → View work → Contact → footer;
  - every stop shows a focus outline;
  - each company link's accessible name includes the website role and dates.
- **Company links:** they open `/experience#t-rowe-price`, `#the-carlyle-group` and `#goldman-sachs`, and each target exists.
- **Fixed in passing:** the light selector's toggle had no accessible name on phones, where it shows only an icon. It now announces the current light and whether it is automatic or manual.

## Screenshots
`home-<size>-morning.png` (first screen), `-full.png` (full page), and `home-1440x900-{golden,night}.png`.
