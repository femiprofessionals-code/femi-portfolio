"""No shadow round the olive tree (Femi: "the tree should not have any shadow").
With the moving sky on, the still's own sky stays visible in the band the sky mask keeps round the canopy (and between
the leaves, and in the breeze layer's background patch). That still sky did not match the clip's colour (at night it
was ~30% warmer and brighter), so the tree wore a pale outline. Here the still's sky in the two tree-side panes is
re-coloured to the clip's own average (a smooth colour field, sky pixels only; leaves, branches and frames untouched),
so the band disappears. Re-run tree.py afterwards (the breeze sprites carry these pixels).
Usage: halo.py room_dir vmean_dir   (rewrites {mode}-{3072,2048,1536}.webp in room_dir)"""
import cv2, numpy as np, sys
R, V = sys.argv[1:3]; S = 2
E = 180                                                    # the sky band starts 180 master px left of the room
for mode in ('morning', 'golden', 'night'):
    im = cv2.imread(f'{R}/{mode}-3072.webp').astype(np.float32); H, W = im.shape[:2]
    vm = cv2.imread(f'{V}/vmean-{mode}.png').astype(np.float32)[:, E:E + 1536]
    vm = cv2.resize(vm, (W, 480 * S), interpolation=cv2.INTER_CUBIC)
    tree = cv2.imread(f'{R}/tree/tree-{mode}.webp', -1)[..., 3].astype(np.float32) / 255     # canopy matte, box 0,180 460x424
    leaf = np.zeros((H, W), np.float32); leaf[180 * S:604 * S, 0:460 * S] = tree
    leaf = cv2.dilate(leaf, np.ones((3, 3), np.uint8))
    X = np.arange(W)[None, :] // S; Y = np.arange(H)[:, None] // S
    panes = ((X < 136) | ((X >= 245) & (X < 400))) & (Y >= 4) & (Y < 470)                    # glass beside the tree, above the skyline
    glass = cv2.imread(f'{R}/masks/window.png', 0)                                         # outside view, minus the tree
    glass = cv2.morphologyEx(glass, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61)))   # ... with the tree's area filled
    glass = cv2.resize(cv2.erode(glass, np.ones((3, 3), np.uint8)), (W, H)).astype(np.float32) / 255
    sky = panes * (1 - leaf) * glass                                                         # sky pixels, gaps between leaves included
    sky = sky.astype(np.float32)
    top = im[:480 * S]
    w = (sky[:480 * S] > .9).astype(np.float32)
    def nc(a, s):
        return cv2.GaussianBlur(a * w[..., None], (0, 0), s) / np.maximum(cv2.GaussianBlur(w, (0, 0), s)[..., None], 1e-3)
    G = np.clip(nc(vm, 14 * S) / np.maximum(nc(top, 14 * S), 1), .5, 1.6)                  # clip average / still, smooth
    k = cv2.GaussianBlur(sky[:480 * S], (0, 0), 1.0)[..., None]
    im[:480 * S] = top * (1 - k) + top * G * k
    for wd in (3072, 2048, 1536):
        cv2.imwrite(f'{R}/{mode}-{wd}.webp', cv2.resize(np.clip(im, 0, 255), (wd, wd * 2 // 3), interpolation=cv2.INTER_AREA).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
    g = G[w > 0].mean(0)
    print(mode, 'mean gain BGR', np.round(g, 3))
