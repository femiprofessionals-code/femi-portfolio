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

---
## Revision: real clouds from Femi's clip (replaces the code layers, DL-38/39)
**Input:** `Apartment_interior_with_drifting__20261014184208.mp4` (Femi, AI image-to-video from the v5 morning master), 1280×720, 8 s.

**Findings**
- The camera trucks sideways about 30 source px, so the skyline, tree and sofa show parallax against the wall: 24 px early, 4 px late (`clip-parallax-map.jpg`).
- The clip is zoomed out ~1.41× with outpainted sides, so it is softer than the still.

**Approach** (scripts: `docs/asset-lock/scripts/lock.py`, `sky.py`)
- Every frame is locked to the **wall plane** (SIFT + RANSAC + temporal smoothing). The wall residual is ≤ 1 px.
- **Only open sky** is taken from the clip. It is colour-graded to the still's sky and masked by the still's own open-sky mask, so the skyline, tree and frames always come from the sharp still and nothing slides.
- Clip artefacts inside the sky are removed per frame, filled from neighbouring sky in each row:
  - the AI-shifted window bars;
  - the parallax-ghosted Empire State spire;
  - leaves drifting by parallax.
- Seamless 6 s loop (48-frame crossfade). Encoded at 1536×480 for the sky band only: VP9 647 KB / H.264 271 KB.

**On the site:** `RoomSky`
- A masked video band over the still, under the paintings and text.
- Loads after the page and only in morning light; golden and night have no clip yet.
- Pauses off-screen or in a hidden tab; never loads with reduced motion or Save-Data.

**Verified:**
- Video playing.
- Overlay geometry unchanged during playback.
- Paused in a hidden tab.
- Reduced motion: no request and no video.
- `sky-what-moves.jpg`: only cloud pixels change.
- Real-time sample: `home-sky-realtime-sample.mp4`.
