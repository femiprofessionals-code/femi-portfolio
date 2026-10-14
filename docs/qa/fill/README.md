# Home fills the screen (Femi: "I want it to fill the screen")

**Desktop and laptop layout** (≥ 860 px wide, ≥ 528 px tall, aspect ≥ 4:3)
- The room covers the whole viewport, with no bars and no dark edges.
- **Room width:** `W = max(87.77vw, 100svh × 1.5)`. This guarantees the visible sides never go past the 107 source px of real room detail from Femi's clip on either side, and that the room is at least screen-tall.
- **Vertical position:** the wall text sits just below the nav, and any surplus height is trimmed from the floor.

**Measured at 12 sizes** (`fill-report.json`):
- Every desktop size is covered, with real sides only.
- The wall text is never under the nav, and all paintings and captions are in view.
- Painting clicks open the right company; no horizontal overflow.

**Trade-offs, by design:**
- On ultra-wide 2560×1080 the rug's front edge sits about 120 px below the fold. On 1366×657 it is about 24 px below.
- At 1024×768 the outermost ~64 px of each side of the room are cropped.

**Portrait and tablet** (aspect < 4:3) and **phones** keep the earlier layouts: the whole room, or the close crop, with text below.

**Seams:** the side extensions are matched row by row to the room's edge columns in all three lights (`sides.py`). The stage clips everything, so tablets no longer scroll sideways.
