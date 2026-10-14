# Stage 7 — movement in the Home room

**What it is:** programmatic movement (CSS transforms and opacity), built from masks cut from the room image itself. It is **not video and not AI-generated**.

| Layer | Light | How it moves | Bound to the room by |
|---|---|---|---|
| Clouds, two depths | all (white / peach / dusky) | Drift across both window walls, 170 s and 260 s per pass | `mask-sky.png`: open sky only, so clouds pass *behind* the skyline, tree, mullions and frames, fading toward the horizon |
| Passing-cloud shade | morning, golden | Sun streaks on the wall, rug and floor dim by up to 26%, then return (53 s and 61 s cycles) | `mask-sun-*.png`: the room's own sun patches; objects excluded |
| Olive canopy | all | Sways at most ±0.3° around the trunk fork (9.7 s cycle) | Canopy cut along `masks/tree.png`; the trunk and pot don't move |
| Dust in the beams | morning, golden | 12 motes drifting up and across (22–40 s each) | Placed in the light above the bench |
| City windows | night | 70 of the city's actual lit windows switch on and off at random (5–21 s) | Positions detected from the night image |
| Picture lights | night | Glow breathes softly (11 s) | Lamp positions from `scene.json` |
| Aircraft | night | Beacon and strobe cross the upper sky every 84 s | Inside the sky mask |

**Never moves:** the walls, ceiling, windows, frames, paintings, wall text, bench, sofa, rug, trunk and pot. `what-moves.jpg` highlights in red the pixels that changed over 6 s; nothing outside the layers above changes.

**Behaviour:**
- Paused while the room is off-screen or the tab is hidden: running animations drop from 16 to 1, the remaining one being the light-selector clock.
- **Off completely with reduced motion**: the layer isn't rendered and nothing runs.
- Only the active light's motion images load; the other lights load at idle, like the room itself.

**Performance (1440×900, `motion-report.json`):**
- 52–60 fps, with 0 layouts and about 12 ms of script over 6 s.
- No canvas, no JS animation loop, no new dependencies.

Assets: `public/room/v5/motion/`. Generator: `docs/asset-lock/scripts/motion_assets.py`.
