"""Move the olive tree and its pot left (Femi: the leaves spilled onto the widened wall). Runs on the unwidened renders,
before wall2 / frames / lean, so the wall, plate and travel map are rebuilt around the moved tree.
1. clean plate: the tree, pot and its contact shadow removed from each light with LaMa (big-lama), at master scale,
   so the window, column, sky, city and floor behind them are re-drawn rather than smeared;
2. matte: against that clean plate (sky, frame, column, post: the difference), olive colour/texture over the city,
   the pot from GrabCut on its traced outline, and a feathered floor patch so the pot's contact shadow travels with it;
3. the tree, pot and shadow pasted back D master px to the left, over the clean plate.
Usage: treeshift2.py orig_dir out_dir   (writes {mode}-3072.webp and masks/tree.png, both moved)"""
import cv2, numpy as np, sys, os, subprocess
R, OUT = sys.argv[1:3]; S = 2; DM = 36; D = DM * S
LAMA = os.path.dirname(os.path.abspath(__file__)) + '/../lama'
os.makedirs(OUT + '/masks', exist_ok=True)
CX0, CY0, CX1, CY1 = 0, 140, 488, 768            # work crop (master)
mo = cv2.imread(R + '/morning-3072.webp'); H, W = mo.shape[:2]
mf = mo.astype(np.float32)
lum = mf @ np.array([.114, .587, .299], np.float32)
gb = mf[..., 1] - mf[..., 0]
sd = np.sqrt(np.clip(cv2.GaussianBlur(lum * lum, (0, 0), 2) - cv2.GaussianBlur(lum, (0, 0), 2) ** 2, 0, None))
tex = np.clip((sd - 5) / 8, 0, 1)
tm = cv2.imread(R + '/masks/tree.png', 0)
zone_m = cv2.dilate(tm, np.ones((3, 3), np.uint8)) > 0                 # master
zone = cv2.GaussianBlur(cv2.resize(zone_m.astype(np.uint8), (W, H), interpolation=cv2.INTER_NEAREST).astype(np.float32), (0, 0), 6)
# --- pot: GrabCut seeded with its traced outline (master px)
L = [(152, 603), (147, 620), (144, 642), (145, 660), (149, 680), (157, 697), (170, 713), (182, 720)]
Rr = [(279, 601), (284, 615), (288, 642), (287, 660), (281, 685), (270, 705), (260, 716), (245, 720)]
poly = np.int32(np.array(L + Rr[::-1]) * S)
x0, y0, x1, y1 = 120 * S, 585 * S, 315 * S, 735 * S
seed = np.zeros((H, W), np.uint8); cv2.fillPoly(seed, [poly], 1)
gc = np.full((H, W), cv2.GC_BGD, np.uint8); gc[y0:y1, x0:x1] = cv2.GC_PR_BGD
gc[seed > 0] = cv2.GC_PR_FGD; gc[cv2.erode(seed, np.ones((15, 15), np.uint8)) > 0] = cv2.GC_FGD
sub = gc[y0:y1, x0:x1].copy()
cv2.grabCut(mo[y0:y1, x0:x1], sub, None, np.zeros((1, 65)), np.zeros((1, 65)), 6, cv2.GC_INIT_WITH_MASK)
pot = np.zeros((H, W), np.float32); pot[y0:y1, x0:x1] = np.isin(sub, (cv2.GC_FGD, cv2.GC_PR_FGD))
pot = cv2.morphologyEx(pot, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats((pot > 0).astype(np.uint8))
if n > 1: pot = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.float32)
pot = cv2.GaussianBlur(pot, (0, 0), .8)
# floor around the pot's foot (its contact shadow) travels with it, feathered
floor = np.zeros((H, W), np.float32); floor[704 * S:740 * S, 128 * S:310 * S] = 1
floor = cv2.GaussianBlur(floor, (0, 0), 6 * S) * (np.arange(H)[:, None] > 698 * S)
# --- 1. clean plates (LaMa at master scale over the work crop)
hole_m = zone_m.copy()
hole_m |= cv2.resize((pot > .02).astype(np.uint8), (1536, 1024), interpolation=cv2.INTER_AREA) > 0
hole_m[700:742, 124:318] = True
mos = cv2.resize(mf, (1536, 1024), interpolation=cv2.INTER_AREA); gbs = mos[..., 1] - mos[..., 0]
ry, rx = np.arange(1024)[:, None], np.arange(1536)[None, :]
stray = (rx < 440) & (ry > 190) & (((gbs > 8) & (ry < 430)) | ((gbs > 24) & (ry < 500)))   # tips in the sky; olive only near the skyline
lums = mos @ np.array([.114, .587, .299], np.float32)
stray |= (rx >= 245) & (rx < 420) & (ry >= 425) & (ry < 495) & ((gbs > 6) | (lums < 115))   # twigs crossing the skyline
hole_m |= cv2.dilate(stray.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0     # loose leaf tips beyond the hand mask                                         # the pot's shadow on the floor
hole_m = cv2.dilate(hole_m.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
crop_m = (slice(CY0, CY1), slice(CX0, CX1))
cv2.imwrite(OUT + '/hole.png', hole_m[crop_m].astype(np.uint8) * 255)
clean = {}
for mode in ('morning', 'golden', 'night'):
    im = cv2.imread(f'{R}/{mode}-3072.webp')
    small = cv2.resize(im, (1536, 1024), interpolation=cv2.INTER_AREA)[crop_m]
    cv2.imwrite(f'{OUT}/in-{mode}.png', small)
    if not os.path.exists(f'{OUT}/lama-{mode}.png'):
        subprocess.run([LAMA + '/env/bin/python', LAMA + '/lama.py', f'{OUT}/in-{mode}.png', OUT + '/hole.png', f'{OUT}/lama-{mode}.png'], check=True)
    lm = cv2.imread(f'{OUT}/lama-{mode}.png').astype(np.float32)
    up = cv2.resize(lm, ((CX1 - CX0) * S, (CY1 - CY0) * S), interpolation=cv2.INTER_CUBIC)
    c = im.astype(np.float32).copy()
    hm = cv2.resize(hole_m.astype(np.float32), (W, H), interpolation=cv2.INTER_LINEAR)
    hm = cv2.GaussianBlur(hm, (0, 0), 2)[CY0 * S:CY1 * S, CX0 * S:CX1 * S, None]
    c[CY0 * S:CY1 * S, CX0 * S:CX1 * S] = c[CY0 * S:CY1 * S, CX0 * S:CX1 * S] * (1 - hm) + up * hm
    # frame, column and post (vertical, straight): their own clean top section carried down, following LaMa's light falloff
    vx0, vx1, vy0, vy1 = 136 * S, 245 * S, 150 * S, 598 * S
    top = im[vy0:vy0 + 40 * S, vx0:vx1].astype(np.float32).mean(0)                     # rows 150-190: above the canopy
    lam = c[vy0:vy1, 164 * S:212 * S].mean(1)                                          # the beige column's light down its length
    lw = np.array([.114, .587, .299], np.float32)
    g = cv2.GaussianBlur((lam @ lw)[:, None], (0, 0), sigmaX=.1, sigmaY=30 * S)[:, 0] / float(top[28 * S:76 * S].mean(0) @ lw)
    vert = np.clip(top[None] * np.clip(g, .6, 1.6)[:, None, None], 0, 255)
    hv = cv2.GaussianBlur(cv2.resize(hole_m.astype(np.float32), (W, H))[vy0:vy1, vx0:vx1], (0, 0), 2)[..., None]
    c[vy0:vy1, vx0:vx1] = c[vy0:vy1, vx0:vx1] * (1 - hv) + vert * hv
    clean[mode] = c
# --- 2. matte (geometry from the morning light, shared)
cm = clean['morning']
diff = np.abs(cv2.GaussianBlur(mf, (0, 0), .8) - cv2.GaussianBlur(cm, (0, 0), .8)).sum(2)
a_diff = np.clip((diff - 30) / 40, 0, 1)                                # vs the clean plate: anything that is not the window
strict = np.clip((gb - 27) / 10, 0, 1)
loose = np.clip((gb - 6) / 10, 0, 1) * tex
dark = np.clip((135 - lum) / 30, 0, 1) * tex
Y = np.arange(H)[:, None] // S; X = np.arange(W)[None, :] // S
ty = cv2.GaussianBlur(np.abs(cv2.Sobel(lum, cv2.CV_32F, 0, 1, ksize=3)), (0, 0), 1.2)
tvy = np.clip((ty - 40) / 50, 0, 1)                                     # varies down the image: leaves, not frame/column/post
tvy *= 1 - ((X >= 130) & (X < 250) & (Y < 330))                         # canopy top over the frame/column: olive only
trunkbox = ((X >= 150) & (X < 265) & (Y >= 440)).astype(np.float32)
a_tree = np.clip(a_diff * 2, 0, 1) * np.maximum(np.maximum(strict, tvy), np.maximum(loose * (1 - trunkbox), dark * trunkbox))
a_tree[trunkbox > 0] = cv2.morphologyEx(a_tree, cv2.MORPH_CLOSE, np.ones((11, 11), np.uint8))[trunkbox > 0]
a_tree = cv2.morphologyEx(a_tree, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
a_tree *= np.clip(zone * 1.5, 0, 1); a_tree[606 * S:] = 0
a_tree = cv2.GaussianBlur(a_tree, (0, 0), .6)
alpha = np.maximum(np.maximum(a_tree, pot), floor)
cv2.imwrite(OUT + '/matte.png', (alpha * 255).astype(np.uint8))
def shift(a):
    o = np.zeros_like(a); o[:, :W - D] = a[:, D:]; return o
a_new = shift(alpha)[..., None]
cv2.imwrite(OUT + '/matte-moved.png', (a_new[..., 0] * 255).astype(np.uint8))      # for the breeze sprite (tree2.py)
tm2 = np.zeros_like(tm); tm2[:, :tm.shape[1] - DM] = tm[:, DM:]
cv2.imwrite(OUT + '/masks/tree.png', tm2)
for mode in ('morning', 'golden', 'night'):
    im = cv2.imread(f'{R}/{mode}-3072.webp').astype(np.float32)
    out = clean[mode] * (1 - a_new) + shift(im) * a_new
    cv2.imwrite(f'{OUT}/clean-{mode}-3072.webp', np.clip(clean[mode], 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 95])   # the window without the tree
    cv2.imwrite(f'{OUT}/{mode}-3072.webp', np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 95])
    cv2.imwrite(f'{OUT}/rv-{mode}.jpg', np.hstack([im[300:1500, 0:1000], clean[mode][300:1500, 0:1000], out[300:1500, 0:1000]]).astype(np.uint8), [1, 85])
    print(mode, 'done')
