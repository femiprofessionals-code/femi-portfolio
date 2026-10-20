# Olive tree, revision 2 (Femi: "does not look hyper realistic enough and its leaves spill into the background of the wall")

## Leaves over the wall
- **Cause:** centring had widened the wall to x 400. The canopy's leaf tips reach ~x 420, so they were laid over the plaster, and the breeze moved them there too.
- **Fix:** the wall is rebuilt at **x 428–1068** (`wall3.py`), still exactly centred on the paintings (748) and still wider than the original render (462–1030). The canopy now finishes in front of the window, as in the original room.
- **Rebuilt to match:**
  - the frameless wall behind the live frames and the map at the planter, per light;
  - the sky masks, re-cut for the new edges.
- **Tree layer:** its box now ends at x 428 (`TREE_BOX`), and its matte fades out before the wall edge, so the moving tree can't draw on the plaster.

## More natural movement
- **Less sway:** the whole-crown sway is reduced by about half. It read as rubbery; an indoor tree barely sways.
- **Two layers of flutter:**
  - clusters of leaves (~15 px) moving independently;
  - faster single-leaf tremble.
- **Light:** leaves catch the light slightly (±5%) as they turn.
- **Still parts:** the trunk base, planter, window column and wall stay still. See `breeze-what-moves.jpg`: only leaves change.

## Verified
- The wall, frames and name share one centre at 1920 and 1366 (Chromium).
- The tree canvas ends at the wall edge, and it runs with no errors in all three lights.
