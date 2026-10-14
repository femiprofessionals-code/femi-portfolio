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
