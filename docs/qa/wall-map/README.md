# Wider wall and travel map (Femi, 15 Oct)

Requests:
- "make the background where the frames are hanged a bit bigger"
- the travel map Femi supplied

Femi's choices: widen the wall in the room image, and hang the map beside the Goldman Sachs painting.

**Revision (Femi):** "the travel frame should not be on the same line with the company logos, it be below by the empty side of the chair". The map now hangs **low, beside the empty right end of the bench**, below the paintings' row, with no picture light. The wall is rebuilt from the unwidened renders, so there's no leftover lamp or shadow.

## Wall (`docs/asset-lock/scripts/wall.py`, all three lights, 3072/2048/1536)
- **Size:** x 462–1030 → **422–1150** (master px). It stops short of the Empire State Building, and the tree stays in front on the left (leaf matte).
- **Light:** each new column continues the wall's own edge light along the measured sun-streak angle (morning 0.32, golden 0.39), so the streaks carry on. At night, the light is the room's ambient light plus the neighbouring picture light's spill, fading with distance.
- **Texture and corners:** the plaster texture is the wall's own fine detail. The old corner shading moves to the new edges, with a 6 px blend at the joins.
- **Map hanging:** the map gets a soft contact shadow. The picture-light option (`LAMP`) is off for the low hang.
- **Sky masks:** the moving-sky masks and `masks/window.png` no longer include the new wall areas.

## Map (`map.py`)
- **Source:** Femi's artwork, cropped to its frame (1500×971).
- **Lighting:** lit per light by the wall behind it (same method as the paintings), shown as a live layer at mat `[1003, 548, 124, 80]`.
- **Link:** "Travel · 30+ countries", in the same style as the company captions, sitting under the map on its own soft wash (the low wall is in the bench's shade and the sun streaks), linking to `/about#outside-work`. There's a tap target on tablet and phone. The phone close-up now shows the paintings, the map and the bench (crop `[472, 250, 676, 499]`).

## Verified (Chromium)
- **Layout:** at 1920×1080 and 1366×657 in all three lights, the map loads and clicks through to About. At 900×1200 and 390×844 the tap targets work. Nothing overflows the page width. The moving sky stays on.
- **Caption contrast** (rendered pixels, low hang): "Travel" 9.9–12.4, "30+ countries" 6.7–10.6, all ≥ 4.5.

## Content note
The artwork's own text reads **"30 countries visited · 60+ cities explored"**. The website says "30+ countries · 60+ cities". The wall caption uses the website wording (D-25).
