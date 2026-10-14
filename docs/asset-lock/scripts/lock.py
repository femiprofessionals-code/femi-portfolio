import cv2, numpy as np
M = cv2.imread('/home/user/femi-portfolio/docs/reference/portfolio-pack/assets/room-master-morning.png')
cap = cv2.VideoCapture("/root/.claude/uploads/fa995a3c-f538-5402-b036-48c8149e74de/b801f54f-Apartment_interior_with_drifting__20261014184208.mp4"); fr = []
while True:
    ok, f = cap.read()
    if not ok: break
    fr.append(f)
sift = cv2.SIFT_create(6000); bf = cv2.BFMatcher()
gm = cv2.cvtColor(M, cv2.COLOR_BGR2GRAY)
# anchor on the wall plane only (wall, frames, lamps, bench): what the paintings and text sit on
wall = np.zeros_like(gm); wall[110:700, 462:1030] = 255
km, dm = sift.detectAndCompute(gm, wall)
P = []
for f in fr:
    k, d = sift.detectAndCompute(cv2.cvtColor(f, cv2.COLOR_BGR2GRAY), None)
    m = [a for a, b in bf.knnMatch(d, dm, k=2) if a.distance < .72 * b.distance]
    p = np.float32([k[a.queryIdx].pt for a in m]); q = np.float32([km[a.trainIdx].pt for a in m])
    A, inl = cv2.estimateAffinePartial2D(p, q, method=cv2.RANSAC, ransacReprojThreshold=2, maxIters=5000)
    P.append([np.hypot(A[0, 0], A[1, 0]), np.arctan2(A[1, 0], A[0, 0]), A[0, 2], A[1, 2]])
P = np.array(P); kk = np.hanning(15); kk /= kk.sum()
Ps = np.stack([np.convolve(np.pad(P[:, j], 7, mode='edge'), kk, 'valid') for j in range(4)], 1)
np.save('params.npy', Ps)
W, H = 1536, 1024
L = []
for f, (s, t, tx, ty) in zip(fr, Ps):
    A = np.array([[s * np.cos(t), -s * np.sin(t), tx], [s * np.sin(t), s * np.cos(t), ty]])
    L.append(cv2.warpAffine(f, A, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT))
L = np.array(L, np.float32); np.save('locked.npy', L.astype(np.uint8))
# temporal motion map (std over time, luminance)
Y = L @ np.array([.114, .587, .299], np.float32)
sd = Y.std(0)
v = M.astype(np.float32) * .4; v[..., 2] = np.maximum(v[..., 2], np.clip(sd * 10, 0, 255))
cv2.imwrite('motion-map.jpg', v.astype(np.uint8), [1, 88])
# drift check on the wall vs master: ECC on frames area at start/mid/end
def ecc(a, b):
    w = np.eye(2, 3, dtype=np.float32)
    _, w = cv2.findTransformECC(cv2.cvtColor(a, cv2.COLOR_BGR2GRAY).astype(np.float32), cv2.cvtColor(b, cv2.COLOR_BGR2GRAY).astype(np.float32), w, cv2.MOTION_TRANSLATION, (3, 100, 1e-5), None, 5)
    return round(float(w[0, 2]), 2), round(float(w[1, 2]), 2)
for i in (0, 96, 191):
    print(i, 'wall', ecc(M[300:520, 480:1010], L[i][300:520, 480:1010].astype(np.uint8)), 'sofa', ecc(M[560:800, 1180:1520], L[i][560:800, 1180:1520].astype(np.uint8)), 'tree', ecc(M[230:600, 40:430], L[i][230:600, 40:430].astype(np.uint8)))
