# Centred wall, flipping frames, map at the planter (Femi, 15 Oct)

Femi:
1. "everything … at the centre of the wall. It appears tilted towards one side"
2. "make the frame to flip when mouse ovals around it"
3. "photorealistic movement" (next step)
4. "the travel frame … on the tree verse" (read as the tree's vase)

## 1. Centred
- **Cause:** the wall had been widened more on the right, to hold the map, so its centre sat right of the paintings.
- **Fix:** the wall is rebuilt **symmetrically** about the paintings' centre: x 400–1096, centre 748 (`wall2.py`, from the unwidened renders).
- **Measured:** at 1920, 1366, 900 and 390 widths, the wall centre, the frames' centre and the name's centre are the same pixel.
- **Sky:** the masks are re-cut, so the right window strip (1096–1150) carries the moving sky again.

## 2. Frames are live objects and flip
- **The wall behind them** is rebuilt per light (`frames.py`). Light is interpolated across each hole along the sun-streak direction (day) or solved smoothly from all edges (night lamp light), plus the plaster's own texture.
- **The frames:** each frame is cropped per light as a sprite (`public/room/v5/frames`). It's a 3D object with the lit painting inside and a CSS shadow per light.
- **The flip:** hovering the painting or its caption, or focusing it with the keyboard, turns the frame (1.05 s, perspective). The back shows the dark wooden frame, kraft backing, a hanging wire and a gallery label: company, role, dates, "View experience →". Clicking goes to the company on Experience.
- **Other cases:** reduced motion turns the frame without animation. Touch layouts navigate on tap. Without JavaScript, the frames are shown from a CSS background.

## 4. Travel map at the planter
- **Placement** (`lean.py`): propped against the olive tree's planter on the floor, leaning back slightly in perspective. It's lit like the planter's face in each light, with a contact shadow on the floor, shade where it rests on the pot, and a visible frame edge. It's baked into the room.
- **The old wall map** layer is removed. The phone close-up returns to paintings and bench.
- **The "Travel · 30+ countries" caption** sits on the floor below, with a soft line-sized light (dark at night). It links to About.

## Checks
- **Contrast:** 132/132 pass (min 4.2, large text). The test now waits until the room image is fully shown.
- **Pointer:** the frame objects don't take the pointer, so the links above them do. A first build had them blocking hover and click, and the test caught it.

## 3. Movement: a breeze through the olive tree
`RoomTree` (WebGL), with assets from `docs/asset-lock/scripts/tree.py`:
- **Assets per light:** each light has a tree sprite and a background patch with the tree painted out.
  - The sprite (RGBA) holds the leaves, branches and trunk above the planter rim.
  - The background keeps the real photo in the gaps between leaves, and fills only where leaves can move away from (≤ 7 px).
- **Leaf matte:** taken from the morning light. A pixel counts as tree if it's clearly olive (G−B > 27), or if it's textured with a weaker green away from the beige window column; bark counts as dark and textured. This keeps the smooth window column and the dark mullions behind the tree still.
- **Motion:**
  - The sway grows with height (none at the trunk base) and is larger at the branch tips: up to ~4.5 master px at the crown, with slow gusts.
  - Leaves flutter through a small noise field.
  - The planter, the map and the room don't move.
- **When it's off:** reduced motion, Save-Data, no WebGL, off-screen or a hidden tab. The still tree shows, and nothing is downloaded.
- **Light changes:** the canvas fades out and back in after the room's own crossfade.
- **Performance:** ~30 fps, capped at 2× DPR, about 250 KB per light (loaded after the page).
- **Verified (Chromium, SwiftShader):** it runs in all three lights with no errors and matches the still exactly at rest. Reduced motion means no canvas and no tree or sky requests. See `tree-breeze-frames.jpg`.
