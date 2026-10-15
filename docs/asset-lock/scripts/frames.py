"""Lift the three frames out of the room photo so they can move (hover flip).
- sprites: each frame (with its blank mat) cropped per light, 2x;
- plate: the wall behind each frame rebuilt: light interpolated across the hole along the sun-streak direction and
  vertically (lamp falloff), plus the plaster's own fine texture; the frames' baked shadows go with them (CSS redraws them).
Usage: frames.py in_dir out_dir"""
import cv2, numpy as np, sys
IN, OUT = sys.argv[1:3]; S = 2
FR = {'trowe': (502, 343, 148, 151), 'carlyle': (674, 343, 148, 151), 'gs': (845, 343, 149, 151)}
SLOPE = {'morning': .324, 'golden': .394, 'night': 0.0}
PAD = (5, 5, 11, 13)                                  # hole margin l, t, r, b (master px): frame + its cast shadow
for mode in ('morning', 'golden', 'night'):
    im = cv2.imread(f'{IN}/{mode}-3072.webp').astype(np.float32); H, W = im.shape[:2]
    hole = np.zeros((H, W), bool)
    for fid, (x, y, w, h) in FR.items():
        cv2.imwrite(f'{OUT}/frame-{mode}-{fid}.webp', im[y * S:(y + h) * S, x * S:(x + w) * S].astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 90])
        l, t, r, b = PAD
        hole[(y - t) * S:(y + h + b) * S, (x - l) * S:(x + w + r) * S] = True
    low = cv2.GaussianBlur(im, (0, 0), 3)
    hp = im - cv2.GaussianBlur(im, (0, 0), 5)
    valid = ~hole
    s = SLOPE[mode]
    d = np.array([1.0, s]); d /= np.linalg.norm(d)            # streak direction (x, y)
    ys, xs = np.nonzero(hole)
    def march(px, py, dx, dy):
        """step from each hole pixel along (dx, dy) until leaving the hole; return the value there and the distance"""
        fx, fy = px.astype(np.float32), py.astype(np.float32); dist = np.zeros(len(px), np.float32)
        alive = np.ones(len(px), bool)
        for k in range(1, 800):
            nx = np.clip((px + dx * k).round().astype(int), 0, W - 1); ny = np.clip((py + dy * k).round().astype(int), 0, H - 1)
            out = valid[ny, nx] & alive
            fx[out], fy[out], dist[out] = nx[out], ny[out], k
            alive &= ~out
            if not alive.any(): break
        return low[fy.astype(int), fx.astype(int)], dist
    a1, d1 = march(xs, ys, d[0], d[1]); a2, d2 = march(xs, ys, -d[0], -d[1])
    v_streak = (a1 * d2[:, None] + a2 * d1[:, None]) / (d1 + d2)[:, None]
    # smooth (harmonic) fill from every edge of the hole: natural falloff for the lamp light, no column artefacts
    q = 4; sh = cv2.resize(low, (W // q, H // q), interpolation=cv2.INTER_AREA); hm = cv2.resize(hole.astype(np.uint8), (W // q, H // q), interpolation=cv2.INTER_NEAREST) > 0
    hm = cv2.dilate(hm.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
    u = sh.copy(); u[hm] = sh[~hm].mean(0)
    for it in range(1500):
        avg = (np.roll(u, 1, 0) + np.roll(u, -1, 0) + np.roll(u, 1, 1) + np.roll(u, -1, 1)) / 4
        u[hm] = avg[hm]
    harm = cv2.resize(u, (W, H), interpolation=cv2.INTER_CUBIC)[ys, xs]
    ws = {'morning': .7, 'golden': .7, 'night': 0.0}[mode]           # day: keep the sun streaks; night: smooth lamp light
    v = v_streak * ws + harm * (1 - ws)
    fill = im.copy(); fill[ys, xs] = v
    # soften the interpolation inside the hole only, then add plaster texture from clean wall above the paintings
    soft = cv2.GaussianBlur(fill, (0, 0), 2.0)
    tex = hp[(112 + 20) * S:300 * S, 470 * S:1020 * S]; tile = np.concatenate([tex, tex[::-1]], 0); tile = np.concatenate([tile, tile[:, ::-1]], 1)
    tl = np.tile(tile, (int(np.ceil(H / tile.shape[0])), int(np.ceil(W / tile.shape[1])), 1))[:H, :W]
    m = cv2.GaussianBlur(cv2.erode(hole.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(np.float32), (0, 0), 3)[..., None]
    plate = im * (1 - m) + (soft + tl) * m
    for wd in (3072, 2048, 1536):
        cv2.imwrite(f'{OUT}/{mode}-{wd}.webp', cv2.resize(np.clip(plate, 0, 255), (wd, wd * 2 // 3), interpolation=cv2.INTER_AREA).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
    cv2.imwrite(f'{OUT}/review-{mode}.jpg', np.hstack([im[600:1250, 950:2050], plate[600:1250, 950:2050]]).astype(np.uint8), [1, 85])
    print(mode, 'hole px', int(hole.sum()))
