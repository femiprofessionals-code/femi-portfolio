# Asset lock — Stage 3

Prepared 14 Oct 2026. Locked **room assets, masks and geometry** for the build. No page layout or app code changed in this stage.

## Room: which image, and why
- **Home scene = the pack master `room-master-morning.png`** (concept, sha256 `cf276d3e…`), per Femi's "use all you have" (DL-22). It is the only room image that shows the rug, tree and sofa in full, as the Home brief requires.
- The existing room (`public/room/v4/`) is **kept untouched** and nothing references v5 yet, so this choice is fully reversible.
- No logos, furniture or frames were regenerated. The frames stay blank in the image, and the artwork goes in as live layers at the measured mat positions.

## Do the three lighting concepts share geometry?
**Yes, within 0.6 px.**
- Method: patch-wise ECC on lighting-normalised edge maps across 13 regions (frames, bench, pot and trunk, canopy, sofa, side table, both mullion sets, both wall edges, rug). Full numbers are in [asset-lock/ecc.json](asset-lock/ecc.json).
- Golden hour: every region moves |dx|,|dy| ≤ 0.62 px, with correlation 0.93–0.99.
- Night: every region moves ≤ 0.55 px; correlation is lower (0.63–0.96) only because of the lighting change.
- The first SIFT pass ([asset-lock/alignment.json](asset-lock/alignment.json)) reported a 170 px "frames" offset for night. That came from matching identical frames to their neighbours; ECC on each frame individually settles it.
- **Decision:** lighting modes can crossfade between the real images (Stage 6), with no warping and no deterministic relight overlays needed.
- **Watch item for Stage 6:** at night the picture lights wash the mats bright, so the artwork layer needs per-mode tone matching.
- Visual: [asset-lock/review-modes.jpg](asset-lock/review-modes.jpg).

## Sharpness
- The masters are 1536×1024, which would look soft on retina screens.
- Each mode was upscaled with Real-ESRGAN (60% x4plus + 40% general-x4v3, plus 30% of the source's own fine detail and light grain), then exported at 3072, 2048 and 1536 wide.
- This is AI upscaling of AI-generated concepts; neither is a photograph.
- Comparison: [asset-lock/review-sharpness.jpg](asset-lock/review-sharpness.jpg) (left: source enlarged, right: 3072 export).

## Masks and geometry (one coordinate system: source px of the 1536×1024 master)
**Data file:** `public/room/v5/scene.json`, which holds:
- frames: outer, mat opening, lamp, and a hitbox covering frame plus caption;
- zones: wall, identity text, captions, mobile crop;
- window polygons (and the mullion);
- the horizon line;
- file checksums.

**Masks** (`public/room/v5/masks/`, 1536×1024, white = region):
- `window.png`: visible glass with mullions, tree and furniture removed. Use it to clip anything that happens *outside* (sky, clouds, city lights, plane).
- `tree.png`: canopy, trunk and pot. This is foreground over the left windows.
- `furniture.png`: sofa, cushions and side table where they overlap the right glass.

**How they were built:** pane polygons were measured from the frame and mullion lines. Foreground was separated by comparing the master with the night concept: interior objects are warm-lit at night while the view goes blue or dark. Leaf fragments were grouped before filtering, and the bark and pot were added by shape.

**Review overlay:** [asset-lock/review-masks-hitboxes.jpg](asset-lock/review-masks-hitboxes.jpg). Blue = window, green = tree, magenta = furniture, red = hitboxes, yellow = mat openings.

**Known residue:** a few tree-mask pixels at the pot's sides and the pillar edge fall on floor or wall, never on glass, so they can't cause occlusion errors.

**Scripts** (for provenance): [asset-lock/scripts/](asset-lock/scripts/). They expect the ESRGAN intermediates, which are not committed because of their size.

## Frame measurements (source px)
| Frame | Outer | Mat opening | Lamp bar | Hitbox (frame + caption) |
|---|---|---|---|---|
| T. Rowe Price | 502,343 · 148×151 | 526,368 · 99×102 | 516,318 · 119×26 | 498,339 · 156×247 |
| The Carlyle Group | 674,343 · 148×151 | 698,368 · 100×102 | 688,318 · 119×26 | 670,339 · 156×247 |
| Goldman Sachs | 845,343 · 149×151 | 870,368 · 100×102 | 859,318 · 119×26 | 841,339 · 157×247 |

The bench and bowl tops are at y≈587, so the caption zone ends at y 586.

## Files
| File | Bytes | sha256 (16) |
|---|---|---|
| `public/room/v5/morning-3072.webp` | 683,494 | 8d14d1be38c7bc9c |
| `public/room/v5/morning-2048.webp` | 382,874 | 58ade3c6e73cdb63 |
| `public/room/v5/morning-1536.webp` | 254,672 | ff9deadf7f656db5 |
| `public/room/v5/golden-3072.webp` | 652,552 | 1b4c70a274897883 |
| `public/room/v5/golden-2048.webp` | 375,088 | 320e95b57c34a3ef |
| `public/room/v5/golden-1536.webp` | 251,782 | ae9550bcc408bbac |
| `public/room/v5/night-3072.webp` | 580,474 | f6b05ab3f7f32b08 |
| `public/room/v5/night-2048.webp` | 327,308 | 6a9c5b220001efc9 |
| `public/room/v5/night-1536.webp` | 215,414 | 3167fa00f09b46d5 |
| `public/room/v5/masks/window.png` | 30,635 | 73ba3ddd4f2d2b43 |
| `public/room/v5/masks/tree.png` | 30,003 | 75e2f3e0ae3e1021 |
| `public/room/v5/masks/furniture.png` | 3,670 | a86838aafcbad336 |

## Portrait and résumé
- **Portrait:** the real asset exists (`public/images/femi-headshot.jpg` / `femi-portrait.webp`).
- **Résumé:** no real file exists, so it is not included (D-14).
