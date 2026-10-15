"""Golden-hour sky from Femi's clip "Clouds drift outside apartment" (camera pushes in ~3.5%, clouds drift coherently).
Same method as sky3.py (morning): wall-locked, only open sky taken from the clip, the clip's own bars inpainted, the
tree excluded along its real leaves. Differences: sky geometry comes from the morning master (all lights share geometry,
docs/asset-lock.md) because colour tests can't find an orange sky; leaves are found by darkness/texture, not green;
every frame is exposure-matched to the still (the clips' light drifts), and the loop is a long crossfade.
Lock first with lock-clip.py. Usage: sky4.py clip.mp4 params.npy outdir golden|night"""
import cv2, numpy as np, subprocess, sys
CLIP, PARAMS, OUT, MODE = sys.argv[1:5]
R = '/home/user/femi-portfolio/public/room/v5/'
E = 180; WF = 1536 + 2 * E; H0 = 480; SLOW = 2
# source range and crossfade length per clip: night starts after a flicker in its first second (frames 13-25) and
# crossfades only where no plane is in view (planes: 0-12, 108-150), so the plane flies through whole, mid-loop
START, K = {'golden': (0, 72), 'night': (34, 36)}[MODE]
P = np.load(PARAMS); cap = cv2.VideoCapture(CLIP); F = []; valid = None
while True:
    ok, f = cap.read()
    if not ok: break
    s_, t_, tx_, ty_ = P[len(F)]
    A = np.array([[s_ * np.cos(t_), -s_ * np.sin(t_), tx_ + E], [s_ * np.sin(t_), s_ * np.cos(t_), ty_]])
    F.append(cv2.warpAffine(f, A, (WF, H0), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT))
    v = cv2.warpAffine(np.full(f.shape[:2], 255, np.uint8), A, (WF, H0), flags=cv2.INTER_NEAREST) > 0
    valid = v if valid is None else valid & v
F = np.array(F)[START:]
valid = cv2.erode(valid.astype(np.uint8), np.ones((15, 15), np.uint8))
def still(mode):
    m = np.zeros((H0, WF, 3), np.float32)
    m[:, :E] = cv2.resize(cv2.imread(f'{R}edge-left-{mode}.webp'), (E, 1024), interpolation=cv2.INTER_AREA)[:H0]
    m[:, E + 1536:] = cv2.resize(cv2.imread(f'{R}edge-right-{mode}.webp'), (E, 1024), interpolation=cv2.INTER_AREA)[:H0]
    m[:, E:E + 1536] = cv2.imread(f'{R}{mode}-1536.webp')[:H0]
    return m
Mst, Mmo = still(MODE), still('morning')
# open-sky geometry from the morning master (blue sky separates cleanly from frames, bars and skyline)
win = np.ones((H0, WF), np.float32); win[:, E:E + 1536] = cv2.imread(R + 'masks/window.png', 0)[:H0] / 255.
tree = np.zeros((H0, WF), np.uint8); tree[:, E:E + 1536] = cv2.imread(R + 'masks/tree.png', 0)[:H0]
gmo = cv2.cvtColor(Mmo.astype(np.uint8), cv2.COLOR_BGR2GRAY); gst = cv2.cvtColor(Mst.astype(np.uint8), cv2.COLOR_BGR2GRAY)
edges = cv2.dilate(cv2.Canny(gmo, 30, 90), np.ones((7, 7), np.uint8)) > 0
skyM = ((win > .5) & ~edges & (gmo > 150) & (Mmo[..., 0] >= Mmo[..., 2] - 4) & (valid > 0)).astype(np.uint8)
# tree: the still's leaves plus wherever the clip's leaves pass (dark or busy against the bright sky)
zone = cv2.dilate(tree, np.ones((61, 61), np.uint8)) > 0
def busy(g): return cv2.GaussianBlur(np.abs(cv2.Laplacian(cv2.GaussianBlur(g.astype(np.float32), (0, 0), 1), cv2.CV_32F)), (0, 0), 1.5)
def leafy(f):
    lum = cv2.cvtColor(f.astype(np.uint8), cv2.COLOR_BGR2GRAY)
    if MODE == 'night':                              # sky is dark blue; leaves are lamp-lit, warm and busy
        return (f[..., 2].astype(int) > f[..., 0].astype(int) + 12) & (lum > 30)
    return (lum < 150) | (busy(lum) > 12)            # golden: dark or busy against the bright sky
leaf = zone & (tree > 0) & leafy(Mst)
for f in F[::2]:
    leaf |= zone & leafy(f)
leaf = cv2.morphologyEx(leaf.astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
skyM[cv2.dilate(leaf, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13))) > 0] = 0
n, lab, st, _ = cv2.connectedComponentsWithStats(skyM, 4); keep = np.zeros_like(skyM)
for i in range(1, n):
    if st[i, cv2.CC_STAT_TOP] < 220 and st[i, 4] > 2500: keep[lab == i] = 1
keep = cv2.erode(keep, np.ones((3, 3), np.uint8))
yy = np.arange(H0)[:, None].astype(np.float32)
skyMask = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 4.0 if MODE == 'night' else 2.0) * np.clip((455 - yy) / 70, 0, 1)
hold = np.zeros((H0, WF), np.float32)                # keep the still here, faded in softly
hold[:, :150] = 1; hold[:, 1745:] = 1                # outermost oblique panes
hold[310:, 1315:1415] = 1                            # Empire State (parallax)
if MODE == 'golden': cv2.circle(hold, (E + 1498, 466), 80, 1, -1)   # the sun stays the still's
skyMask *= 1 - np.clip(cv2.GaussianBlur(hold, (0, 0), 14) * 1.6, 0, 1)
# the clip's own window bars: thin, tall and dark in the temporal median -> inpaint
Ymed = np.median(F[::3].astype(np.float32) @ np.array([.114, .587, .299], np.float32), 0)
dark = (Ymed < np.median(Ymed[skyMask > .5]) - 45).astype(np.uint8)
thin = dark & (1 - cv2.morphologyEx(dark, cv2.MORPH_OPEN, np.ones((1, 19), np.uint8)))
bars = cv2.morphologyEx(thin, cv2.MORPH_OPEN, np.ones((31, 1), np.uint8))
struct = cv2.dilate(bars, np.ones((5, 9), np.uint8)) & (skyMask > .01).astype(np.uint8)
m = skyMask > .5
# per-frame grade (smoothed over time): the clips' exposure drifts (night darkens ~50% in 8 s), so every frame is held
# to the still's sky level; otherwise the loop flashes bright once per cycle
ms = Mst[m]; mu = np.array([F[i][m].mean(0) for i in range(len(F))], np.float32); sd = np.array([F[i][m].std(0) for i in range(len(F))], np.float32)
kk = np.hanning(25); kk /= kk.sum()
sm = lambda a: np.stack([np.convolve(np.pad(a[:, j], 12, mode='edge'), kk, 'valid') for j in range(3)], 1)
mu, sd = sm(mu), sm(sd)
G = np.clip(ms.std(0) / (sd + 1e-3), .6, 1.6); O = ms.mean(0) - mu * G
gain = G.mean(0)
bands = []
for i, f in enumerate(F):
    g = np.clip(f.astype(np.float32) * G[i] + O[i], 0, 255).astype(np.uint8)
    if struct.any(): g = cv2.inpaint(g, struct, 7, cv2.INPAINT_TELEA)
    bands.append(g)
# slow down with in-between frames
S = []
for i in range(len(bands) - 1):
    a, b = bands[i].astype(np.float32), bands[i + 1].astype(np.float32)
    for k in range(SLOW): t = k / SLOW; S.append(a * (1 - t) + b * t)
S.append(bands[-1].astype(np.float32))
# loop: the tail crossfades into the head
KS = K * SLOW; Lp = len(S) - KS
def loopframe(i):                                     # long, gentle crossfade: soft clouds dissolve into each other
    if i < KS:                                       # (the flow morph smeared tree and bar edges into the sky)
        t = i / KS; t = t * t * (3 - 2 * t); return S[i + Lp] * (1 - t) + S[i] * t
    return S[i]
w3 = skyMask[..., None]
enc = [('webm', ['-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-crf', '36', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2']),
       ('mp4', ['-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart'])]
procs = [subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{WF}x{H0}', '-r', '24', '-i', '-', *a, '-an', f'{OUT}/sky-{MODE}.{e}'], stdin=subprocess.PIPE) for e, a in enc]
review = {}
for i in range(Lp):
    fr = np.clip(Mst * (1 - w3) + np.clip(loopframe(i), 0, 255) * w3, 0, 255).astype(np.uint8)
    for p in procs: p.stdin.write(fr.tobytes())
    if i in (0, KS // 2, KS, Lp // 2, Lp - 1): review[i] = fr
for p in procs: p.stdin.close(); p.wait()
cv2.imwrite(f'{OUT}/sky-{MODE}-poster.webp', review[0], [cv2.IMWRITE_WEBP_QUALITY, 85])
a = (np.clip(skyMask, 0, 1) * 255).astype(np.uint8)
cv2.imwrite(f'{OUT}/mask-sky-band-{MODE}.png', np.dstack([np.full_like(a, 255)] * 3 + [a]))
cv2.imwrite('review.jpg', np.vstack([review[k] for k in sorted(review)]), [1, 88])
cv2.imwrite('mask.png', a); cv2.imwrite('struct.png', struct * 255)
print('frames', Lp, 'seconds', round(Lp / 24, 1), 'gain', gain.round(2), 'exposure range', mu.mean(1).min().round(1), mu.mean(1).max().round(1), 'struct px', int(struct.sum()))
