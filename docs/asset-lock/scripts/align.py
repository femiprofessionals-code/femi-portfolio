import cv2, numpy as np, json, sys
A = '/home/user/femi-portfolio/docs/reference/portfolio-pack/assets/'
M = cv2.imread(A + 'room-master-morning.png')
out = {}
sift = cv2.SIFT_create(8000); bf = cv2.BFMatcher()
def feats(im):
    g = cv2.createCLAHE(3, (8, 8)).apply(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)); return sift.detectAndCompute(g, None)
km, dm = feats(M)
for name in ['room-golden-hour', 'room-night']:
    B = cv2.imread(A + name + '.png'); kb, db = feats(B)
    m = [a for a, b in bf.knnMatch(db, dm, k=2) if a.distance < .7 * b.distance]
    p = np.float32([kb[a.queryIdx].pt for a in m]); q = np.float32([km[a.trainIdx].pt for a in m])
    d = np.linalg.norm(p - q, axis=1)
    H, inl = cv2.findHomography(p, q, cv2.RANSAC, 2.0)
    res = np.linalg.norm(cv2.perspectiveTransform(p[None], H)[0] - q, axis=1)[inl[:, 0] > 0]
    # displacement by region (identity mapping), using all good matches
    regions = {'frames+lamps': (480, 300, 1020, 510), 'bench': (500, 590, 990, 720), 'tree': (20, 220, 440, 720),
               'sofa': (1160, 540, 1536, 860), 'left windows': (0, 40, 460, 680), 'right windows': (1030, 40, 1536, 560)}
    reg = {}
    for k, (x0, y0, x1, y1) in regions.items():
        s = (q[:, 0] > x0) & (q[:, 0] < x1) & (q[:, 1] > y0) & (q[:, 1] < y1)
        reg[k] = {'matches': int(s.sum()), 'median_px': round(float(np.median(d[s])), 2) if s.any() else None, 'p90_px': round(float(np.percentile(d[s], 90)), 2) if s.any() else None}
    out[name] = {'matches': len(m), 'median_identity_px': round(float(np.median(d)), 2), 'p90_identity_px': round(float(np.percentile(d, 90)), 2),
                 'homography_inliers': int(inl.sum()), 'homography_resid_px': round(float(res.mean()), 2), 'regions': reg}
    # visual check: edge overlay (master edges red, variant edges green)
    e1 = cv2.Canny(cv2.cvtColor(M, cv2.COLOR_BGR2GRAY), 60, 160); e2 = cv2.Canny(cv2.cvtColor(B, cv2.COLOR_BGR2GRAY), 60, 160)
    vis = np.zeros_like(M); vis[..., 2] = e1; vis[..., 1] = e2
    cv2.imwrite(f'edges-{name}.png', vis)
print(json.dumps(out, indent=1)); json.dump(out, open('alignment.json', 'w'), indent=1)
