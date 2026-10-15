import cv2, numpy as np, subprocess, json
R = '/home/user/femi-portfolio/public/room/v5/'
E = 180; WF = 1536 + 2 * E
P = np.load('params.npy'); cap = cv2.VideoCapture("/root/.claude/uploads/fa995a3c-f538-5402-b036-48c8149e74de/b801f54f-Apartment_interior_with_drifting__20261014184208.mp4"); L = []
while True:
    ok, f = cap.read()
    if not ok: break
    s_, t_, tx_, ty_ = P[len(L)]
    A = np.array([[s_ * np.cos(t_), -s_ * np.sin(t_), tx_ + E], [s_ * np.sin(t_), s_ * np.cos(t_), ty_]])
    L.append(cv2.warpAffine(f, A, (WF, 480), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE).astype(np.float32))
L = np.array(L)
room = cv2.imread(R + 'morning-1536.webp').astype(np.float32)
Mst = np.zeros((1024, WF, 3), np.float32)
Mst[:, :E] = cv2.resize(cv2.imread(R + 'edge-left-morning.webp'), (E, 1024), interpolation=cv2.INTER_AREA)
Mst[:, E + 1536:] = cv2.resize(cv2.imread(R + 'edge-right-morning.webp'), (E, 1024), interpolation=cv2.INTER_AREA)
Mst[:, E:E + 1536] = room
win = np.zeros((1024, WF), np.float32); win[:, E:E + 1536] = cv2.imread(R + 'masks/window.png', 0).astype(np.float32) / 255
win[:, :E] = 1; win[:, E + 1536:] = 1          # sides: sky decided by colour/texture below
tree = np.zeros((1024, WF), np.uint8); tree[:, E:E + 1536] = cv2.imread(R + 'masks/tree.png', 0)
H0 = 480                                                           # sky band height (source px); horizon ≈ 470
# master open-sky mask: glass, minus tree (dilated for the clip's parallax), above the skyline
gm = cv2.cvtColor(Mst.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
tex = cv2.GaussianBlur(np.abs(cv2.Laplacian(cv2.GaussianBlur(gm, (0, 0), 1), cv2.CV_32F)), (0, 0), 2)
bM, rM = Mst[..., 0], Mst[..., 2]
edges = cv2.dilate(cv2.Canny(gm.astype(np.uint8), 30, 90), np.ones((5, 5), np.uint8)) > 0
skyM = ((win > .5) & ~edges & (gm > 150) & (bM >= rM - 4)).astype(np.uint8)
skyM[cv2.dilate(tree, np.ones((5, 5), np.uint8)) > 0] = 0
n, lab, st, _ = cv2.connectedComponentsWithStats(skyM, 4)
keep = np.zeros_like(skyM)
for i in range(1, n):
    if st[i, cv2.CC_STAT_TOP] < 200 and st[i, 4] > 2000: keep[lab == i] = 1
yy = np.arange(1024)[:, None].astype(np.float32)
skyMask = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 1.1) * np.clip((455 - yy) / 70, 0, 1)
# per-frame clip sky-likeness (buildings/leaves drifting in from parallax fall back to the still)
def skylike(f):
    g = cv2.cvtColor(f.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
    t = cv2.GaussianBlur(np.abs(cv2.Laplacian(cv2.GaussianBlur(g, (0, 0), 1.2), cv2.CV_32F)), (0, 0), 2.5)
    s = np.clip((11 - t) / 4, 0, 1) * ((f[..., 0] >= f[..., 2] - 10) | (g > 200))
    return cv2.GaussianBlur(cv2.erode(s.astype(np.float32), np.ones((5, 5), np.uint8)), (0, 0), 2)
# colour grade: match the clip's sky to the still's sky (per channel mean/std over the mask, all frames)
m = skyMask[:H0] > .5
cs = np.concatenate([L[i, :H0][m] for i in range(0, 192, 8)])
ms = Mst[:H0][m]
gain = ms.std(0) / (cs.std(0) + 1e-3); gain = np.clip(gain, .55, 1.25)
off = ms.mean(0) - cs.mean(0) * gain
nearTree = cv2.dilate(tree[:H0], np.ones((41, 41), np.uint8)) > 0
# static small dark details in the clip's sky (ghost spires/antennas from parallax): darker than their surroundings in most frames
Ys = np.stack([cv2.cvtColor(L[i, :H0].astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32) for i in range(0, len(L), 4)])
detail = np.median(Ys - np.stack([cv2.GaussianBlur(y, (0, 0), 5) for y in Ys]), 0)
ghost = cv2.dilate((detail < -5).astype(np.uint8), np.ones((5, 5), np.uint8))
nearTree = nearTree.astype(np.uint8)
frames = []
for f in L:
    g = f[:H0] * gain + off
    fg = f[:H0]
    lum = cv2.cvtColor(fg.astype(np.uint8), cv2.COLOR_BGR2GRAY)
    dark = (lum < 125).astype(np.uint8)
    bars = cv2.morphologyEx(dark, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (1, 45)))        # tall, thin, dark = window bar
    mid = (lum < 205).astype(np.uint8)
    thin = mid & (1 - cv2.morphologyEx(mid, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (17, 1))))   # narrower than 17 px
    spires = cv2.morphologyEx(thin, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (1, 10)))            # and tall: spires, antennas
    bars = bars | cv2.dilate(spires, np.ones((11, 5), np.uint8)) | ghost
    rel = lum.astype(np.float32) - cv2.GaussianBlur(lum.astype(np.float32), (0, 0), 4)
    faint = cv2.morphologyEx((rel < -3).astype(np.uint8), cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (1, 9)))   # faint vertical: drifting spire
    bars = bars | cv2.dilate(faint, np.ones((9, 7), np.uint8))
    leaves = ((fg[..., 1] > fg[..., 0] + 6) & (lum < 170)).astype(np.uint8) & nearTree                       # the clip's own leaves drifting by parallax
    bad = (cv2.dilate(bars, np.ones((1, 7), np.uint8)) | cv2.dilate(leaves, np.ones((5, 5), np.uint8))).astype(bool) & (skyMask[:H0] > .02)
    if bad.any():
        xs = np.arange(g.shape[1])
        for y in np.nonzero(bad.any(1))[0]:
            ok = ~bad[y]
            if ok.sum() < 2: continue
            for ch in range(3): g[y, :, ch] = np.where(ok, g[y, :, ch], np.interp(xs, xs[ok], g[y, ok, ch]))
    w = skyMask[:H0][..., None]
    frames.append(np.clip(Mst[:H0] * (1 - w) + g * w, 0, 255))
# seamless loop: crossfade the last 48 frames into the first 48
N = len(frames); K = 48; Lp = N - K; loop = []
for i in range(Lp):
    if i < K:
        t = i / K; t = t * t * (3 - 2 * t); loop.append(frames[i + Lp] * (1 - t) + frames[i] * t)
    else: loop.append(frames[i])
O = R + 'motion/'
for ext, args in (('webm', ['-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2']),
                  ('mp4', ['-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart'])):
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{WF}x{H0}', '-r', '24', '-i', '-', *args, '-an', f'{O}sky-morning.{ext}'], stdin=subprocess.PIPE)
    for f in loop: p.stdin.write(np.clip(f, 0, 255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()
cv2.imwrite(O + 'sky-morning-poster.webp', loop[0].astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 85])
a = (np.clip(skyMask[:H0], 0, 1) * 255).astype(np.uint8)
cv2.imwrite(O + 'mask-sky-band.png', np.dstack([np.full_like(a, 255)] * 3 + [a]))
# review: composite (still + band) at 3 times
for i in (0, 70, 140):
    c = Mst.copy(); c[:H0] = loop[i]; cv2.imwrite(f'comp-{i}.jpg', c.astype(np.uint8), [1, 90])
print('band width', WF)
print('gain', gain.round(2), 'off', off.round(1), 'frames', len(loop))
