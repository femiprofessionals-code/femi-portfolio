# Morning sky video, v3 rebuild (Femi: "the video for the morning … is not well")

## Videos in the repo
| File | Used? |
|---|---|
| `public/room/v5/motion/sky-morning.{webm,mp4}` | **Yes**, the only video on the site (Home, morning light, via `RoomSky`) |
| `public/room/v4/{morning,golden,night}.{webm,mp4}` | No (DL-37) |
| `public/videos/hero.mp4` | No (`VideoHero` is not mounted) |

## What was wrong with v2
1. **The clip's clouds re-form instead of drifting.** Measured drift is under 0.2 px/frame. Instead, the cloud shapes are replaced every ~2 s (`clip-clouds-reform.jpg`: frames 0, 48, 96, 144 and 191 show different skies). At real speed with a 6 s loop, the sky churned.
2. **Compositing artefacts** (`before-live-1920.png`):
   - The row-by-row fill used to hide the clip's own window bars left **stair-stepped cloud edges**.
   - The warp's replicated border put **white smeared blocks** where the clip has no real coverage.
   - The tree exclusion followed the blocky tree mask.
   - A second, ghost **Empire State spire** showed through.
3. **The WebM was encoded as VP9 Profile 1 RGB (`gbrp`)**, because no pixel format was set. Hardware decoders and some browsers can't play it, or play it with wrong colours.

## v3 (`docs/asset-lock/scripts/sky3.py`)
- **Coverage:** only sky pixels that every frame of the clip really covers are used. There is no replicated border.
- **Clip structure:** the clip's static structure (its offset mullions and ghost spires) is found from the temporal median and **inpainted**. Nothing is smeared row by row.
- **Tree:** the tree is excluded along its real leaves, plus everywhere the clip's leaves pass, so the boundary is organic.
- **Hard spots:** the outermost oblique panes and the column above the Empire State keep the still, faded in softly so there are no seams.
- **Slowed 3×**, with in-between frames. Clouds evolve calmly rather than churn, and the loop is **17.9 s**. The 6 s crossfade happens during slow motion, so the seam is no larger than a normal frame step (measured: seam 0.50 vs max adjacent 0.53 grey levels, WebM).
- **Encoding:** VP9 **Profile 0, yuv420p** (428 KB) and H.264 High, yuv420p (432 KB). Both are smaller than v2's WebM.

## Verified (Chromium, `next start`)
- WebM selected and playing at 1920×1080 and 1366×657. It loops without a stall; 2–3 of about 400 frames were dropped in the headless run.
- `after-live-*.png`: no stair steps, white blocks or ghost spire. The paintings, text and skyline are unchanged.
- **Not checked:** MP4 playback, because this Chromium build has no H.264 decoder. The MP4 was checked by decoding it with ffmpeg (430 frames, yuv420p, seam 0.93 vs max adjacent 0.91).

## Limits that remain (the clip itself)
- **Low source resolution:** the source is 720p, zoomed out 1.41×, so the clouds are softer than the still's sky.
- **No locked camera:** the camera moves, so the skyline and tree can't come from the clip and stay static.
- A locked-off (tripod) clip at 1080p or higher, with clouds drifting slowly in one direction, would fix both.

## Golden hour and night (Femi's clips, 14 Oct)
| Light | Clip | Camera | Clouds | Result |
|---|---|---|---|---|
| Golden | `Clouds_drift_outside_apartment_w…` | Pushes in ~3.5% over 8 s; wall locked ≤ 0.5 px | Drift coherently, ~0.2 px/frame to the left | `sky-golden.{webm,mp4}`, 12 s loop, 302/342 KB |
| Night | `Clouds_drifting_over_Manhattan_s…` | Pushes in ~5.5%; wall locked ≤ 0.8 px | Nearly still (< 0.1 px/frame); two planes cross the sky | `sky-night.{webm,mp4}`, 12 s loop, 243/338 KB |

Method (`docs/asset-lock/scripts/lock-clip.py`, `sky4.py`):
- Same as morning v3, with these differences:
  - The open-sky geometry comes from the morning master. All lights share one geometry, and an orange or navy sky can't be found by colour.
  - Leaves are detected per light: dark or busy at golden hour, warm and lamp-lit at night.
  - The sun stays the still's.
- Playback is slowed 2×.
- The loop is closed with an **optical-flow morph**, not a plain crossfade, so drifting clouds never double up.

Site:
- Each light has its own mask (`mask-sky-band-{light}.png`, chosen by `data-clip`).
- Only the active light's clip is requested. Switching light swaps the clip.
- Verified in Chromium at 1920×1080 and 1366×657 (`golden-night-live.png`).

Limits:
- The sources are 720p, so the clouds are softer than the stills' skies.
- Planes vanish briefly behind the soft "hold" above the Empire State Building.
- The skyline and city lights are static, because both clips' cameras move.

## Golden and night, revision 2 (Femi: "the golden hour and night video did not go well")
What was wrong:
- **Golden:** the optical-flow loop blend smeared dark ghost shapes into the sky beside the Empire State Building for about 3 s every loop.
- **Night, brightness:** the clip darkens steadily, about −50% over 8 s, as dusk turns to night. The sky flashed bright and faded once per loop (sky luminance 22–42).
- **Night, flicker:** the clip has a flicker in its first second (frames 13–25).
- **Night, planes:** planes ghosted while the loop crossfaded.

Fixes (`sky4.py`):
- **Every frame is exposure-matched** to the still's sky (smoothed over 1 s). Sky luminance now holds within 0.5 level at night and 0.4 at golden hour.
- **The loop is a plain, long crossfade.** The flow morph is removed. Golden hour crossfades over 6 s.
- **Night starts at source frame 34**, after the flicker. It crossfades only over 1.5 s stretches with no plane in view (frames 34–69 and 156–191), so the plane crosses whole, mid-loop.

Loops: golden 10 s, night 10.1 s. Frames are in `golden-v2-frames.jpg` and `night-v2-frames.jpg`.
