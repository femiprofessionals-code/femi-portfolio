import cv2, numpy as np, json
A = '/home/user/femi-portfolio/docs/reference/portfolio-pack/assets/'
def grad(im):
    g = cv2.GaussianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(np.float32), (0, 0), 1.2)
    m = cv2.magnitude(cv2.Sobel(g, cv2.CV_32F, 1, 0), cv2.Sobel(g, cv2.CV_32F, 0, 1))
    return m / (cv2.GaussianBlur(m, (0, 0), 25) + 4)          # local contrast-normalised edges: lighting-robust
M = grad(cv2.imread(A + 'room-master-morning.png'))
patches = {'frame TRP': (495, 310, 660, 500), 'frame Carlyle': (668, 310, 830, 500), 'frame GS': (838, 310, 1000, 500),
           'bench': (505, 595, 980, 715), 'pot+trunk': (130, 430, 300, 720), 'canopy': (30, 220, 430, 480),
           'sofa': (1170, 540, 1536, 850), 'side table': (1410, 700, 1536, 890), 'left mullions': (140, 100, 470, 680),
           'right mullions': (1030, 130, 1380, 560), 'wall edge L': (440, 100, 490, 700), 'wall edge R': (1010, 100, 1060, 700), 'rug': (60, 700, 1430, 920)}
out = {}
for name in ['room-golden-hour', 'room-night']:
    B = grad(cv2.imread(A + name + '.png')); r = {}
    for k, (x0, y0, x1, y1) in patches.items():
        w = np.eye(2, 3, dtype=np.float32)
        try:
            cc, w = cv2.findTransformECC(M[y0:y1, x0:x1], B[y0:y1, x0:x1], w, cv2.MOTION_TRANSLATION, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 200, 1e-6), None, 5)
            r[k] = {'dx': round(float(w[0, 2]), 2), 'dy': round(float(w[1, 2]), 2), 'corr': round(float(cc), 3)}
        except cv2.error:
            r[k] = 'no convergence'
    out[name] = r
for n, r in out.items():
    print(n)
    for k, v in r.items(): print(f'  {k:15s} {v}')
json.dump(out, open('ecc.json', 'w'), indent=1)
