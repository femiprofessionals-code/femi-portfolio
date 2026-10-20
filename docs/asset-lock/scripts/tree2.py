"""Olive tree for the wind shader (RoomTree), after the tree was moved left (treeshift2.py): per light, a tree sprite
(RGBA: the room's own pixels with the moved tree's matte) and a background patch (RGBA: the LaMa clean plate, the window
re-drawn without the tree, only where the picture can change), so swaying leaves reveal real window, not smears.
Box: master x 0-400, y 180-604; the canopy fades out before the wall (x 400) and stops above the pot rim.
Usage: tree2.py plate_dir shift_dir out_dir"""
import cv2, numpy as np, sys
P, SH, OUT = sys.argv[1:4]; S = 2
X0, Y0, X1, Y1 = 0, 180, 400, 604
a = cv2.imread(SH + '/matte-moved.png', 0).astype(np.float32) / 255
# below the skyline the moved matte also carries city around the trunk (harmless in the still, wrong if it sways):
# keep only olive, or dark textured bark, there
mo = cv2.imread(P + '/morning-3072.webp').astype(np.float32)
lum = mo @ np.array([.114, .587, .299], np.float32); gb = mo[..., 1] - mo[..., 0]
sd = np.sqrt(np.clip(cv2.GaussianBlur(lum * lum, (0, 0), 2) - cv2.GaussianBlur(lum, (0, 0), 2) ** 2, 0, None))
leafy = np.maximum(np.clip((gb - 20) / 10, 0, 1), np.clip((140 - lum) / 30, 0, 1) * np.clip((sd - 5) / 8, 0, 1))
leafy = cv2.GaussianBlur(cv2.morphologyEx(leafy, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8)), (0, 0), .8)
low = np.clip((np.arange(a.shape[0], dtype=np.float32)[:, None] / S - 462) / 16, 0, 1)
a *= 1 - low * (1 - leafy)
a[(Y1 - 6) * S:] = 0                                              # the pot stays put
xs = np.arange(a.shape[1], dtype=np.float32)[None, :] / S
a *= np.clip((396 - xs) / 4, 0, 1)
y0, y1, x0, x1 = Y0 * S, Y1 * S, X0 * S, X1 * S
A = a[y0:y1, x0:x1]
hole = cv2.dilate((A > .05).astype(np.uint8), np.ones((15, 15), np.uint8)) > 0
for mode in ('morning', 'golden', 'night'):
    crop = cv2.imread(f'{P}/{mode}-3072.webp')[y0:y1, x0:x1]
    clean = cv2.imread(f'{SH}/clean-{mode}-3072.webp')[y0:y1, x0:x1]
    cv2.imwrite(f'{OUT}/tree-{mode}.webp', np.dstack([crop, (A * 255).astype(np.uint8)]), [cv2.IMWRITE_WEBP_QUALITY, 88])
    ba = cv2.GaussianBlur(hole.astype(np.float32), (0, 0), 2) * 255
    cv2.imwrite(f'{OUT}/bg-{mode}.webp', np.dstack([clean, ba.astype(np.uint8)]), [cv2.IMWRITE_WEBP_QUALITY, 85])
    cv2.imwrite(f'{OUT}/prev-{mode}.jpg', np.hstack([crop, clean, cv2.cvtColor((A * 255).astype(np.uint8), cv2.COLOR_GRAY2BGR)]), [1, 80])
    print(mode, crop.shape)
