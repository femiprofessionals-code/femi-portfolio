import cv2, numpy as np
A = '/home/user/femi-portfolio/docs/reference/portfolio-pack/assets/'
M = cv2.imread(A + 'room-master-morning.png').astype(np.int32); N = cv2.imread(A + 'room-night.png').astype(np.int32)
H, W = M.shape[:2]
poly = lambda pts: cv2.fillPoly(np.zeros((H, W), np.uint8), [np.int32(pts)], 1)
panes = [poly([(0, 30), (150, 112), (150, 688), (0, 718)]), poly([(234, 150), (462, 150), (462, 666), (234, 666)]),
         poly([(1031, 150), (1352, 150), (1352, 666), (1031, 666)]), poly([(1373, 122), (1536, 58), (1536, 722), (1373, 692)])]
win = np.clip(sum(panes), 0, 1)
gm = cv2.cvtColor(M.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.int32)
# frame/mullion: dark in master AND dark in night (structure, not sky)
frame = ((gm < 62) & (cv2.cvtColor(N.astype(np.uint8), cv2.COLOR_BGR2GRAY) < 45)).astype(np.uint8)
frame = cv2.morphologyEx(frame, cv2.MORPH_OPEN, np.ones((1, 3), np.uint8))
# interior objects: warm-lit at night; keep only large components (drops city lights)
bN, gN, rN = N[..., 0], N[..., 1], N[..., 2]
warm = ((rN - bN > 28) & ((rN + gN + bN) / 3 > 55)).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats(warm, 8)
keep = np.zeros_like(warm)
for i in range(1, n):
    if st[i, 4] > 2500: keep[lab == i] = 1
fg = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
# tree: canopy = not sky-blue (morning) and not dark city (night), grouped so fragmented leaves survive
tb = poly([(20, 215), (440, 215), (440, 725), (20, 725)])
bM, gM, rM = M[..., 0], M[..., 1], M[..., 2]
sky = (bM - rM > 22)                                   # morning sky / blue haze
lumN = (rN + gN + bN) / 3
cand = (~sky & ((lumN > 62) | (gm < 120)) & (gN >= bN - 6)).astype(np.uint8) & tb
grp = cv2.dilate(cand, np.ones((5, 5), np.uint8))
n2, lab2, st2, _ = cv2.connectedComponentsWithStats(grp, 8)
big = np.zeros_like(cand)
for i in range(1, n2):
    if st2[i, 4] > 6000: big[lab2 == i] = 1
tree = (cand & big) | (fg & tb)
pot = cv2.fillPoly(np.zeros((H, W), np.uint8), [np.int32([(140, 590), (295, 590), (295, 722), (140, 722)])], 1)
tree[(np.arange(H)[:, None] > 676) & (pot == 0)] = 0           # no floor below the sill except the pot
hsvM = cv2.cvtColor(M.astype(np.uint8), cv2.COLOR_BGR2HSV).astype(np.int32)
leafy = ((hsvM[..., 0] >= 18) & (hsvM[..., 0] <= 50) & (hsvM[..., 1] > 45)).astype(np.uint8)
trunk = poly([(168, 440), (268, 440), (262, 600), (172, 600)])
yy = np.arange(H)[:, None]
below = (yy > 468).astype(np.uint8)                              # city skyline starts ~y470 behind the tree
tree = np.where(below & (1 - trunk) & (1 - pot), tree & leafy & (yy < 530), tree).astype(np.uint8)
pillar = poly([(150, 112), (234, 150), (234, 690), (150, 688)])
tree = np.where(pillar, tree & leafy, tree).astype(np.uint8)    # stone pillar: only leaves in front of it
potE = cv2.ellipse(np.zeros((H, W), np.uint8), (218, 657), (74, 64), 0, 0, 360, 1, -1)
potE[:600] = 0                                                  # pot rim is flat at ~y600
lumM = gm
bark = ((lumM < 170) & (rM - bM > 12) & ~sky).astype(np.uint8) & trunk
tree = (tree | potE | bark).astype(np.uint8)
tree = cv2.morphologyEx(tree, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
tree = cv2.morphologyEx(tree, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
# right-side furniture (sofa, cushions, side table, plant) overlapping the right windows
rb = poly([(1150, 530), (1536, 520), (1536, 900), (1150, 900)])
dark_warm = ((rN > bN + 8) & (lumN < 90) & (rM - bM > 18)).astype(np.uint8) & poly([(1235, 572), (1536, 540), (1536, 705), (1235, 705)])
g2 = cv2.dilate(dark_warm, np.ones((3, 3), np.uint8)); n3, lab3, st3, _ = cv2.connectedComponentsWithStats(g2, 8)
cush = np.zeros_like(dark_warm)
for i in range(1, n3):
    if st3[i, 4] > 1500: cush[lab3 == i] = 1
furn = ((fg & rb) | (dark_warm & cush)).astype(np.uint8)
furn = furn & cv2.dilate(win, np.ones((9, 9), np.uint8))   # occlusion only matters over glass
furn = cv2.morphologyEx(furn, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
window = (win & (1 - frame) & (1 - tree) & (1 - furn)).astype(np.uint8)
window = cv2.morphologyEx(window, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
for k, m in {'window': window, 'tree': tree, 'furniture': furn, 'frame': frame & win}.items():
    cv2.imwrite(f'm_{k}.png', m * 255)
# review overlay: window=blue, tree=green, furniture=magenta
v = M.astype(np.float32).copy()
for m, c in [(window, (255, 120, 0)), (tree, (0, 220, 0)), (furn, (255, 0, 255))]:
    v[m > 0] = v[m > 0] * .45 + np.array(c) * .55
cv2.imwrite('masks_review.jpg', v.astype(np.uint8), [1, 88])
print({k: int(m.sum()) for k, m in {'window': window, 'tree': tree, 'furniture': furn}.items()})
