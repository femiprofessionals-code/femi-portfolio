"""Olive tree for the wind shader (RoomTree): per light, a tree sprite (RGBA, leaves + branches + trunk above the pot)
and a background patch (RGBA: the room with the tree removed, only within a few px of the tree) so moving leaves reveal
window, not doubled leaves. Leaf matte from the morning light (geometry is shared). Box: master x 0-428, y 180-604."""
import cv2, numpy as np, sys
R, OUT = sys.argv[1:3]; S = 2
X0, Y0, X1, Y1 = 0, 180, 428, 604                  # stops where the wall begins (x 428): the moving tree never draws on the plaster
tree = cv2.imread(R + '/masks/tree.png', 0)
mo = cv2.imread(R + '/morning-3072.webp').astype(np.float32)
lum = mo @ np.array([.114, .587, .299], np.float32)
# leaves/branches/trunk vs. what's behind them (sky, the smooth beige window column, dark mullions):
gb = mo[..., 1] - mo[..., 0]
sd = np.sqrt(np.clip(cv2.GaussianBlur(lum * lum, (0, 0), 2) - cv2.GaussianBlur(lum, (0, 0), 2) ** 2, 0, None))
tex = np.clip((sd - 5) / 8, 0, 1)
strict = np.clip((gb - 27) / 10, 0, 1)                            # clearly olive: G-B 34-53 (column ~24, sky < 0)
loose = np.clip((gb - 6) / 10, 0, 1) * tex                        # sunlit/shaded leaves, textured
def box(x0, y0, x1, y1, s=8):
    m = np.zeros_like(lum); m[y0 * S:y1 * S, x0 * S:x1 * S] = 1; return cv2.GaussianBlur(m, (0, 0), s)
column = box(152, 180, 230, 604)                                  # the beige window column behind the tree
leaf = np.maximum(strict, loose * (1 - column))
trunk = np.clip((135 - lum) / 30, 0, 1) * tex * box(160, 400, 265, 604)   # bark: darker and textured (the column is smooth)
leaf = np.maximum(leaf, trunk)
leaf = cv2.morphologyEx(leaf, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
zone = cv2.resize((cv2.dilate(tree, np.ones((5, 5), np.uint8)) > 0).astype(np.uint8), (3072, 2048), interpolation=cv2.INTER_NEAREST)
zone = cv2.GaussianBlur(zone.astype(np.float32), (0, 0), 6)       # soft zone edge, no blocky cut-outs
a = leaf * np.clip(zone * 1.5, 0, 1)
a[(Y1 - 6) * S:] = 0                                              # stop above the pot rim (the pot stays put)
xs = np.arange(a.shape[1], dtype=np.float32)[None, :] / S
a *= np.clip((424 - xs) / 4, 0, 1)                                # and fade out before the wall edge
a = cv2.GaussianBlur(a, (0, 0), .6)
y0, y1, x0, x1 = Y0 * S, Y1 * S, X0 * S, X1 * S
A = a[y0:y1, x0:x1]
hole = (cv2.dilate((A > .05).astype(np.uint8), np.ones((15, 15), np.uint8)) > 0)    # where the picture can change
leafy = cv2.dilate((A > .3).astype(np.uint8), np.ones((3, 3), np.uint8))           # what to paint away
for mode in ('morning', 'golden', 'night'):
    im = cv2.imread(f'{R}/{mode}-3072.webp')
    crop = im[y0:y1, x0:x1]
    # tree sprite: un-premultiply nothing; the matte edges carry a little sky colour, as in the photo
    spr = np.dstack([crop, (np.clip(A, 0, 1) * 255).astype(np.uint8)])
    cv2.imwrite(f'{OUT}/tree-{mode}.webp', spr, [cv2.IMWRITE_WEBP_QUALITY, 88])
    # background: inpaint the tree away (at half size, then up), keep it only near the tree
    small = cv2.resize(crop, None, fx=.5, fy=.5, interpolation=cv2.INTER_AREA)
    hs = cv2.resize(leafy, (small.shape[1], small.shape[0]), interpolation=cv2.INTER_NEAREST)
    fill = cv2.inpaint(small, hs, 6, cv2.INPAINT_TELEA)
    fill = cv2.resize(fill, (crop.shape[1], crop.shape[0]), interpolation=cv2.INTER_CUBIC)
    Af = np.clip(A * 1.4, 0, 1)[..., None]                       # the real photo in the gaps between leaves; fill only under leaves
    bg = (crop * (1 - Af) + fill * Af).astype(np.uint8)
    ba = cv2.GaussianBlur(hole.astype(np.float32), (0, 0), 2) * 255
    cv2.imwrite(f'{OUT}/bg-{mode}.webp', np.dstack([bg, ba.astype(np.uint8)]), [cv2.IMWRITE_WEBP_QUALITY, 85])
    prev = bg.copy()
    cv2.imwrite(f'{OUT}/prev-{mode}.jpg', np.hstack([crop, prev, cv2.cvtColor((A * 255).astype(np.uint8), cv2.COLOR_GRAY2BGR)]), [1, 80])
    print(mode, 'sprite', spr.shape)
