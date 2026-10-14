"""Morning sky v3: wall-locked sky from Femi's clip, composited only in open sky, slowed 3x with in-between frames.
Fixes over sky2: no replicated border (only pixels the clip really covers), static clip-structure mask filled by
inpainting (no row smearing / staircase), wider tree exclusion, sharpness matched, standard yuv420p WebM."""
import cv2, numpy as np, subprocess, sys
R = '/home/user/femi-portfolio/public/room/v5/'
C8 = '/tmp/claude-0/-home-user/fa995a3c-f538-5402-b036-48c8149e74de/scratchpad/c8/'
OUT = sys.argv[1] if len(sys.argv) > 1 else R + 'motion/'
CLIP = "/root/.claude/uploads/fa995a3c-f538-5402-b036-48c8149e74de/b801f54f-Apartment_interior_with_drifting__20261014184208.mp4"
E = 180; WF = 1536 + 2 * E; H0 = 480; SLOW = 3
P = np.load(C8 + 'params.npy'); cap = cv2.VideoCapture(CLIP); F = []; valid = None
one = None
while True:
    ok, f = cap.read()
    if not ok: break
    s_, t_, tx_, ty_ = P[len(F)]
    A = np.array([[s_ * np.cos(t_), -s_ * np.sin(t_), tx_ + E], [s_ * np.sin(t_), s_ * np.cos(t_), ty_]])
    F.append(cv2.warpAffine(f, A, (WF, H0), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT))
    if one is None: one = np.full(f.shape[:2], 255, np.uint8)
    v = cv2.warpAffine(one, A, (WF, H0), flags=cv2.INTER_NEAREST, borderMode=cv2.BORDER_CONSTANT) > 0
    valid = v if valid is None else valid & v
F = np.array(F)                                      # uint8 (192, 480, 1896, 3)
valid = cv2.erode(valid.astype(np.uint8), np.ones((15, 15), np.uint8))   # only what every frame really covers
# --- the still, extended
Mst = np.zeros((H0, WF, 3), np.float32)
Mst[:, :E] = cv2.resize(cv2.imread(R + 'edge-left-morning.webp'), (E, 1024), interpolation=cv2.INTER_AREA)[:H0]
Mst[:, E + 1536:] = cv2.resize(cv2.imread(R + 'edge-right-morning.webp'), (E, 1024), interpolation=cv2.INTER_AREA)[:H0]
Mst[:, E:E + 1536] = cv2.imread(R + 'morning-1536.webp')[:H0]
win = np.ones((H0, WF), np.float32); win[:, E:E + 1536] = cv2.imread(R + 'masks/window.png', 0)[:H0] / 255.
tree = np.zeros((H0, WF), np.uint8); tree[:, E:E + 1536] = cv2.imread(R + 'masks/tree.png', 0)[:H0]
gm = cv2.cvtColor(Mst.astype(np.uint8), cv2.COLOR_BGR2GRAY)
edges = cv2.dilate(cv2.Canny(gm, 30, 90), np.ones((7, 7), np.uint8)) > 0
skyM = ((win > .5) & ~edges & (gm > 150) & (Mst[..., 0] >= Mst[..., 2] - 4) & (valid > 0)).astype(np.uint8)
# tree: exclude the still's real leaves plus everywhere the clip's own leaves pass (parallax), as an organic halo
zone = cv2.dilate(tree, np.ones((61, 61), np.uint8)) > 0
leafStill = zone & (tree > 0) & ~((gm > 150) & (Mst[..., 0] >= Mst[..., 2] - 4))
leafClip = np.zeros((H0, WF), bool)
for f in F[::2]:
    lum = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    leafClip |= zone & (((f[..., 1].astype(int) > f[..., 0] + 4) & (lum < 185)) | (lum < 120))
leaf = cv2.morphologyEx((leafStill | leafClip).astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
skyM[cv2.dilate(leaf, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13))) > 0] = 0
n, lab, st, _ = cv2.connectedComponentsWithStats(skyM, 4); keep = np.zeros_like(skyM)
for i in range(1, n):
    if st[i, cv2.CC_STAT_TOP] < 220 and st[i, 4] > 2500: keep[lab == i] = 1
keep = cv2.erode(keep, np.ones((3, 3), np.uint8))
yy = np.arange(H0)[:, None].astype(np.float32)
skyMask = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 2.0) * np.clip((455 - yy) / 70, 0, 1)
hold = np.zeros((H0, WF), np.float32)                # areas that keep the still, faded in softly (no hard seams in moving sky)
hold[:, :150] = 1; hold[:, 1745:] = 1                # outermost oblique panes: reflections
hold[310:, 1315:1415] = 1                            # Empire State: the clip's own spire sits a few px off (parallax)
skyMask *= 1 - np.clip(cv2.GaussianBlur(hold, (0, 0), 14) * 1.6, 0, 1)
# --- static structure in the clip's sky (its own mullions, offset from the still's; ghost spires): fill, don't smear
Ys = F[::3].astype(np.float32) @ np.array([.114, .587, .299], np.float32)
Ymed = np.median(Ys, 0)
detail = np.median(Ys - np.stack([cv2.GaussianBlur(y, (0, 0), 5) for y in Ys]), 0)
struct = ((Ymed < 150) | (detail < -4)).astype(np.uint8)
struct = cv2.morphologyEx(struct, cv2.MORPH_OPEN, np.ones((9, 1), np.uint8))   # vertical-ish things only
struct = cv2.dilate(struct, np.ones((5, 9), np.uint8)) & (skyMask > .01).astype(np.uint8)
# colour grade (mean/std per channel inside the sky, over the whole clip)
m = skyMask > .5
cs = np.concatenate([F[i][m] for i in range(0, len(F), 8)]).astype(np.float32); ms = Mst[m]
gain = np.clip(ms.std(0) / (cs.std(0) + 1e-3), .7, 1.25); off = ms.mean(0) - cs.mean(0) * gain
# sharpness: match the still's sky detail (clip is 720p, softer)
def hf(img): return float(np.abs(cv2.Laplacian(cv2.cvtColor(img.astype(np.uint8), cv2.COLOR_BGR2GRAY), cv2.CV_32F))[m].mean())
w3 = skyMask[..., None]
bands = []
for f in F:
    g = np.clip(f.astype(np.float32) * gain + off, 0, 255).astype(np.uint8)
    if struct.any(): g = cv2.inpaint(g, struct, 7, cv2.INPAINT_TELEA)
    bands.append(g)
amt = 0.0
h_still, h_clip = hf(Mst), hf(bands[0])
for a in (0, .3, .6, .9, 1.2, 1.6):
    b = bands[0].astype(np.float32); s = b + a * (b - cv2.GaussianBlur(b, (0, 0), 1.6))
    if hf(np.clip(s, 0, 255)) <= h_still: amt = a
print('hf still', round(h_still, 2), 'clip', round(h_clip, 2), 'unsharp', amt)
def finish(b):
    b = b.astype(np.float32)
    if amt: b = b + amt * (b - cv2.GaussianBlur(b, (0, 0), 1.6))
    return np.clip(Mst * (1 - w3) + np.clip(b, 0, 255) * w3, 0, 255)
# --- slow 3x: in-between frames (adjacent frames differ only slightly, so a blend is clean), then a seamless loop
S = []
for i in range(len(bands) - 1):
    a, b = bands[i].astype(np.float32), bands[i + 1].astype(np.float32)
    for k in range(SLOW): t = k / SLOW; S.append(a * (1 - t) + b * t)
S.append(bands[-1].astype(np.float32))
K = 48 * SLOW; Lp = len(S) - K
def loopframe(i):
    if i < K:
        t = i / K; t = t * t * (3 - 2 * t); return S[i + Lp] * (1 - t) + S[i] * t
    return S[i]
enc = [('webm', ['-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-crf', '36', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2']),
       ('mp4', ['-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart'])]
procs = [subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{WF}x{H0}', '-r', '24', '-i', '-', *a, '-an', f'{OUT}sky-morning.{e}'], stdin=subprocess.PIPE) for e, a in enc]
review = {}
for i in range(Lp):
    fr = finish(loopframe(i)).astype(np.uint8)
    for p in procs: p.stdin.write(fr.tobytes())
    if i in (0, K // 2, K, Lp // 2, Lp - 1): review[i] = fr
for p in procs: p.stdin.close(); p.wait()
cv2.imwrite(OUT + 'sky-morning-poster.webp', review[0], [cv2.IMWRITE_WEBP_QUALITY, 85])
a = (np.clip(skyMask, 0, 1) * 255).astype(np.uint8)
cv2.imwrite(OUT + 'mask-sky-band.png', np.dstack([np.full_like(a, 255)] * 3 + [a]))
cv2.imwrite('review.jpg', np.vstack([review[k] for k in sorted(review)]), [1, 88])
cv2.imwrite('struct.png', struct * 255); cv2.imwrite('mask.png', a)
print('frames', Lp, 'seconds', round(Lp / 24, 1), 'gain', gain.round(2))
