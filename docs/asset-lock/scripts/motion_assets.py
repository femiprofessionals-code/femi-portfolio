"""Stage 7 motion assets, all in the 1536x1024 master coordinate system."""
import cv2, numpy as np, json
R = '/home/user/femi-portfolio/public/room/v5/'; O = R + 'motion/'
W, H = 1536, 1024
M = cv2.imread(R + 'morning-1536.webp').astype(np.float32); N = cv2.imread(R + 'night-1536.webp').astype(np.float32)
win = cv2.imread(R + 'masks/window.png', 0) > 127
bM, gM, rM = M[..., 0], M[..., 1], M[..., 2]
gray = cv2.cvtColor(M.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
# ── sky: smooth + blue-ish, connected to the top of the glass (flood from the top), never the skyline
tex = cv2.GaussianBlur(np.abs(cv2.Laplacian(cv2.GaussianBlur(gray, (0, 0), 1), cv2.CV_32F)), (0, 0), 3)
smoothblue = win & (bM - rM > 8) & (tex < 2.2)
n, lab, st, _ = cv2.connectedComponentsWithStats(smoothblue.astype(np.uint8), 4)
sky = np.zeros((H, W), np.uint8)
for i in range(1, n):
    if st[i, cv2.CC_STAT_TOP] < 200 and st[i, 4] > 3000: sky[lab == i] = 1
sky = cv2.morphologyEx(sky, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
sky = (sky.astype(bool) & win).astype(np.float32)
sky = cv2.GaussianBlur(sky, (0, 0), 1.2)
# fade clouds out toward the horizon so they read as distant
yy = np.arange(H)[:, None].astype(np.float32)
sky_soft = sky * np.clip((470 - yy) / 120, 0, 1)
def alpha_png(path, m):
    small = cv2.resize(m, (768, 512), interpolation=cv2.INTER_AREA)
    a = (np.clip(small, 0, 1) * 255).astype(np.uint8)
    cv2.imwrite(path, np.dstack([np.full_like(a, 255)] * 3 + [a]), [cv2.IMWRITE_PNG_COMPRESSION, 9])
alpha_png(O + 'mask-sky.png', sky_soft)
# ── sun patches (morning/golden): wall, rug, floor and bench streaks brighter than their surroundings
def sunmask(img):
    L = cv2.cvtColor(img.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
    resid = L - cv2.GaussianBlur(L, (0, 0), 16)
    m = np.clip((resid - 7) / 16, 0, 1)
    room = (~win).astype(np.float32)
    room[:112] = 0                                                   # not the ceiling
    for x, y, w, h in ((470, 300, 535, 205), (1150, 520, 386, 400), (500, 585, 485, 135), (125, 585, 185, 145), (1400, 690, 136, 210)):
        room[y:y + h, x:x + w] = 0                                   # frames+lamps, sofa, bench, pot, side table: objects, not light
    room[:, :462][np.arange(H) < 690] = 0                            # left windows/pillar zone above the floor
    room[:, 1030:][np.arange(H) < 690] = 0                           # right windows above the floor
    return cv2.GaussianBlur(m * room, (0, 0), 2.5)
for mode in ('morning', 'golden'):
    img = cv2.imread(R + f'{mode}-1536.webp').astype(np.float32)
    sm = sunmask(img); alpha_png(O + f'mask-sun-{mode}.png', sm); np.save(f'sun-{mode}.npy', sm)
# ── canopy cutouts per light (canopy only: above the trunk fork), feathered
tree = cv2.imread(R + 'masks/tree.png', 0).astype(np.float32) / 255
canopy = tree.copy(); canopy[470:] = 0
canopy = cv2.GaussianBlur(canopy, (0, 0), .8)
x0, y0, x1, y1 = 20, 200, 450, 480               # canopy box (source px)
boxes = {'canopy': [x0, y0, x1 - x0, y1 - y0]}
for mode in ('morning', 'golden', 'night'):
    big = cv2.imread(R + f'{mode}-3072.webp')
    crop = big[y0 * 2:y1 * 2, x0 * 2:x1 * 2]
    a = cv2.resize(canopy[y0:y1, x0:x1], (crop.shape[1], crop.shape[0]), interpolation=cv2.INTER_LINEAR)
    rgba = np.dstack([crop, (a * 255).astype(np.uint8)])
    cv2.imwrite(O + f'canopy-{mode}.webp', rgba, [cv2.IMWRITE_WEBP_QUALITY, 82])
# ── clouds: horizontally tileable soft cumulus texture, tinted per light
rng = np.random.default_rng(7)
def clouds(w, h, seed, scale):
    r = np.random.default_rng(seed); acc = np.zeros((h, w), np.float32)
    for octave, amp in ((scale, 1), (scale / 2, .5), (scale / 4, .25), (scale / 8, .12)):
        gw, gh = max(2, int(w / octave)), max(2, int(h / octave))
        g = r.random((gh, gw)).astype(np.float32); g = np.hstack([g, g[:, :1]])          # wrap horizontally
        up = cv2.resize(g, (w + int(w / gw), h), interpolation=cv2.INTER_CUBIC)[:, :w]
        acc += amp * up
    acc /= acc.max()
    a = np.clip((acc - .52) / .3, 0, 1) ** 1.4
    a *= np.clip(1 - np.abs(np.linspace(-1, 1, h))[:, None] ** 3, 0, 1)                  # soft top/bottom
    return cv2.GaussianBlur(a, (0, 0), 2)
tints = {'morning': (255, 255, 252), 'golden': (215, 225, 255), 'night': (120, 108, 105)}   # BGR: white, peach, dusky
for name, (w, h, seed, sc, op) in {'far': (2048, 360, 11, 170, .55), 'near': (2048, 420, 23, 240, .8)}.items():
    a = clouds(w, h, seed, sc) * op
    # volume: compare each point with the cloud density just above it -> lit tops, shaded undersides
    dens = cv2.GaussianBlur(a, (0, 0), 7); above = np.roll(dens, 9, axis=0)
    under = np.clip((above - dens) * 6 + .5, 0, 1)                       # 1 = underside
    for mode, c in tints.items():
        top = np.array(c, np.float32)
        shadow = {'morning': (205, 186, 172), 'golden': (150, 140, 185), 'night': (78, 68, 70)}[mode]
        shade = top * (1 - under[..., None] * .75) + np.array(shadow, np.float32) * (under[..., None] * .75)
        boost = {'morning': 1.35, 'golden': 1.0, 'night': .6}[mode]
        alpha = np.clip(a * boost, 0, .92)
        rgba = np.dstack([np.clip(shade, 0, 255).astype(np.uint8), (alpha * 255).astype(np.uint8)])
        cv2.imwrite(O + f'clouds-{name}-{mode}.webp', rgba, [cv2.IMWRITE_WEBP_QUALITY, 80])
# ── night: lit city windows (small, bright, warm, inside the glass, below the horizon) → twinkle points
lumN = cv2.cvtColor(N.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
peak = (lumN > 150) & (lumN - cv2.GaussianBlur(lumN, (0, 0), 3) > 30) & win & (yy > 300)
n, lab, st, cen = cv2.connectedComponentsWithStats(peak.astype(np.uint8), 8)
pts = [(float(cen[i][0]), float(cen[i][1])) for i in range(1, n) if 1 <= st[i, 4] <= 12]
rng.shuffle(pts); pts = pts[:70]
json.dump({'boxes': boxes, 'twinkles': [[round(x, 1), round(y, 1)] for x, y in pts]}, open(O + 'motion.json', 'w'), indent=0)
# review
v = M.copy()
v[sky_soft > .1] = v[sky_soft > .1] * .5 + np.array([255, 160, 0]) * .5
sm = np.load('sun-morning.npy') > .25; v[sm] = v[sm] * .5 + np.array([0, 220, 255]) * .5
for x, y in pts: cv2.circle(v, (int(x), int(y)), 4, (0, 0, 255), 1)
cv2.rectangle(v, (x0, y0), (x1, y1), (0, 255, 0), 1)
cv2.imwrite('motion-review.jpg', v.astype(np.uint8), [1, 88])
print('sky px', int((sky_soft > .1).sum()), 'twinkles', len(pts))
