"""Lock every frame of a clip to the v5 master's wall plane. Usage: lock.py clip.mp4 master.webp outdir"""
import cv2, numpy as np, sys
clip, master, od = sys.argv[1:4]
M = cv2.imread(master); cap = cv2.VideoCapture(clip); fr = []
while True:
    ok, f = cap.read()
    if not ok: break
    fr.append(f)
sift = cv2.SIFT_create(6000); bf = cv2.BFMatcher(); gm = cv2.cvtColor(M, cv2.COLOR_BGR2GRAY)
wall = np.zeros_like(gm); wall[110:700, 462:1030] = 255
km, dm = sift.detectAndCompute(gm, wall); P = []
for f in fr:
    k, d = sift.detectAndCompute(cv2.cvtColor(f, cv2.COLOR_BGR2GRAY), None)
    m = [a for a, b in bf.knnMatch(d, dm, k=2) if a.distance < .72 * b.distance]
    p = np.float32([k[a.queryIdx].pt for a in m]); q = np.float32([km[a.trainIdx].pt for a in m])
    A, _ = cv2.estimateAffinePartial2D(p, q, method=cv2.RANSAC, ransacReprojThreshold=2, maxIters=5000)
    P.append([np.hypot(A[0, 0], A[1, 0]), np.arctan2(A[1, 0], A[0, 0]), A[0, 2], A[1, 2]])
P = np.array(P); kk = np.hanning(15); kk /= kk.sum()
Ps = np.stack([np.convolve(np.pad(P[:, j], 7, mode='edge'), kk, 'valid') for j in range(4)], 1)
np.save(od + '/params.npy', Ps)
L = []
for f, (s, t, tx, ty) in zip(fr, Ps):
    A = np.array([[s * np.cos(t), -s * np.sin(t), tx], [s * np.sin(t), s * np.cos(t), ty]])
    L.append(cv2.warpAffine(f, A, (1536, 1024), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT))
L = np.array(L); np.save(od + '/locked.npy', L)
def ecc(a, b):
    w = np.eye(2, 3, dtype=np.float32)
    _, w = cv2.findTransformECC(cv2.cvtColor(a, cv2.COLOR_BGR2GRAY).astype(np.float32), cv2.cvtColor(b, cv2.COLOR_BGR2GRAY).astype(np.float32), w, cv2.MOTION_TRANSLATION, (3, 100, 1e-5), None, 5)
    return round(float(w[0, 2]), 2), round(float(w[1, 2]), 2)
for i in (0, 96, 191):
    print(i, 'wall', ecc(M[300:520, 480:1010], L[i][300:520, 480:1010]), 'sofa', ecc(M[560:800, 1180:1520], L[i][560:800, 1180:1520]))
