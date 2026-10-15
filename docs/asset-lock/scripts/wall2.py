"""Widen the limestone wall symmetrically about the paintings in all three v5 lights (Femi: "make the background where the frames are hanged a bit bigger")
and prepare a place for the travel map beside the Goldman Sachs painting.
Master px (1536x1024); renders are 3072 (S=2). Wall: x 462-1030, y 112-~697. New wall: x 422-1150.
Light: each new column continues the wall's own edge light along the measured sun-streak direction (so streaks carry on);
plaster texture is the wall's own fine detail; the edge profile (light falloff at the corner) is moved to the new edge."""
import cv2, numpy as np, sys
R = sys.argv[2] if len(sys.argv) > 2 else '/home/user/femi-portfolio/public/room/v5/'; OUT = sys.argv[1]   # R: the unwidened renders
S = 2; T, B = 112, 693
L0, L1, R0, R1 = 462, 400, 1030, 1096          # symmetric about the paintings' centre (748)
SLOPE = {'morning': .324, 'golden': .394, 'night': 0.0}
MAP = (1003, 548, 124, 80)                 # travel map (master), hung low beside the bench's empty end; frame ratio 1.545
LAMP = False                               # no picture light at this height
tree = cv2.resize(cv2.imread(R + 'masks/tree.png', 0), (3072, 2048), interpolation=cv2.INTER_LINEAR).astype(np.float32) / 255
mo = cv2.imread(R + 'morning-3072.webp').astype(np.float32)
lum = mo @ np.array([.114, .587, .299], np.float32)
leaf = np.maximum(np.clip((mo[..., 1] - mo[..., 0] + 2) / 14, 0, 1), np.clip((120 - lum) / 30, 0, 1))   # leaves: greener than blue, or dark
tree = (cv2.GaussianBlur(tree, (0, 0), 4) > .02) * cv2.GaussianBlur(leaf, (0, 0), .7)
tree = tree[..., None]
out = {}
for mode in ('morning', 'golden', 'night'):
    im = cv2.imread(f'{R}{mode}-3072.webp').astype(np.float32); H, W = im.shape[:2]
    new = im.copy(); s = SLOPE[mode]
    hp = im - cv2.GaussianBlur(im, (0, 0), 5)                              # plaster fine texture
    texsrc = hp[(T + 20) * S:300 * S, 470 * S:1020 * S]                   # clean plaster above the paintings
    def extend(xa, xb, m0, m1, side):
        """Fill master columns [xa, xb) of rows [T, B) from the wall's margin columns [m0, m1)."""
        marg = im[:, m0 * S:m1 * S]
        light = cv2.GaussianBlur(marg.mean(1)[:, None, :], (0, 0), sigmaX=.1, sigmaY=3)[:, 0, :]   # per-row light of the margin (H x 3)
        if not s:                                     # night: the margin is lit by the neighbouring picture light; split
            amb = light.copy(); g0, g1 = 300 * S, 530 * S   # ambient (glow rows bridged) + that lamp's spill
            for c in range(3): amb[g0:g1, c] = np.linspace(light[g0, c], light[g1, c], g1 - g0)
            spill = light - amb
        xm = (m0 + m1) / 2
        ys = np.arange(T * S, B * S)
        for X in range(xa * S, xb * S):
            dx = (X / S - xm)
            ysrc = np.clip(ys - s * dx * S, (T + 8) * S, (B - 22) * S).astype(int)
            col = light[ysrc] if s else amb[ysrc] + spill[ysrc] * float(np.exp(-max(abs(dx) - 8, 0) ** 2 / 18 ** 2))   # spill fades ~18 px past the old edge
            near = ys >= (B - 22) * S                                       # base of the wall: keep the floor junction level
            col[near] = light[ys[near]]
            top = ys < (T + 8) * S
            col[top] = light[ys[top]]
            new[T * S:B * S, X] = col
        # texture: tile the clean plaster detail (mirrored) over the new area
        h, w = (B - T) * S, (xb - xa) * S
        tile = np.concatenate([texsrc, texsrc[::-1]], 0); tile = np.concatenate([tile, tile[:, ::-1]], 1)
        reps = (int(np.ceil(h / tile.shape[0])), int(np.ceil(w / tile.shape[1])), 1)
        tx = np.tile(tile, reps)[:h, :w]
        new[T * S:B * S, xa * S:xb * S] += tx
        # corner: carry the old edge's light falloff (last 10 master px) to the new edge
        k = 10 * S
        if side == 'right':
            ref = im[T * S:B * S, (R0 - 22) * S:(R0 - 12) * S].mean(1, keepdims=True)
            prof = im[T * S:B * S, R0 * S - k:R0 * S] / (ref + 1)
            new[T * S:B * S, xb * S - k:xb * S] *= cv2.GaussianBlur(prof, (0, 0), 3)
        else:
            ref = im[T * S:B * S, (L0 + 12) * S:(L0 + 22) * S].mean(1, keepdims=True)
            prof = im[T * S:B * S, L0 * S:L0 * S + k] / (ref + 1)
            new[T * S:B * S, xa * S:xa * S + k] *= cv2.GaussianBlur(prof, (0, 0), 3)
    extend(1016, R1, 998, 1014, 'right')                # replaces the old corner shading too
    extend(L1, 478, 480, 496, 'left')
    for xj, m0 in ((1016, 998), (478, 480)):            # 6 px blend from the old wall into the new
        for i in range(-6 * S, 6 * S):
            X = xj * S + i; a = (i + 6 * S) / (12 * S)
            if xj == 478: a = 1 - a
            new[T * S:B * S, X] = new[T * S:B * S, X] * a + im[T * S:B * S, X] * (1 - a)
    # the olive tree stays in front of the new wall
    new = new * (1 - tree) + im * tree
    if not LAMP:
        out[mode] = np.clip(new, 0, 255); print(mode, 'wall', L1, R1)
    if LAMP:
        # picture light: the Goldman Sachs lamp, scaled to the map's width, with its wall glow
        lamp_box = (880, 314, 84, 22)                                         # lamp over the GS frame (master)
        lx, ly, lw, lh = lamp_box
        patch = im[ly * S:(ly + lh) * S, lx * S:(lx + lw) * S]
        wall_ref = im[(ly - 14) * S:(ly - 4) * S, lx * S:(lx + lw) * S].mean((0, 1))
        plum = patch @ np.array([.114, .587, .299], np.float32); wlum = wall_ref @ np.array([.114, .587, .299], np.float32)
        alpha = np.clip((wlum - 18 - plum) / 30, 0, 1)
        alpha = cv2.GaussianBlur(alpha, (0, 0), .8)
        sc = 0.72; nw, nh = int(lw * S * sc), int(lh * S * sc)
        patch = cv2.resize(patch, (nw, nh), interpolation=cv2.INTER_AREA); alpha = cv2.resize(alpha, (nw, nh))[..., None]
        cx = (x + w / 2) * S; py = int((y - 4) * S - nh)
        px = int(cx - nw / 2)
        # glow on the wall below the lamp: measured from the GS lamp (wall just under it vs the plain margin, same rows)
        glow_gs = im[(ly + lh) * S:(ly + lh + 12) * S, (lx + 10) * S:(lx + lw - 10) * S].mean() / (im[(ly + lh) * S:(ly + lh + 12) * S, 1000 * S:1026 * S].mean() + 1)
        gy, gx = np.mgrid[0:H, 0:W].astype(np.float32)
        cone = np.exp(-(((gx - cx) / (w * .42 * S)) ** 2) - ((gy - py - h * .3 * S) / (h * .75 * S)) ** 2)
        gain = max(glow_gs - 1, 0)
        new *= (1 + gain * cone)[..., None]
        reg = new[py:py + nh, px:px + nw]
        new[py:py + nh, px:px + nw] = reg * (1 - alpha) + patch * alpha
        out[mode] = np.clip(new, 0, 255)
        print(mode, 'lamp glow gain', round(float(gain), 3))
    for wd in (3072, 2048, 1536):
        cv2.imwrite(f'{OUT}/{mode}-{wd}.webp', cv2.resize(out[mode], (wd, wd * 2 // 3), interpolation=cv2.INTER_AREA).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
# review: before/after, all lights
rows = []
for mode in out:
    b = cv2.imread(f'{R}{mode}-3072.webp')
    rows.append(np.hstack([b[180:1480, 700:2400], out[mode][180:1480, 700:2400].astype(np.uint8)]))
cv2.imwrite(f'{OUT}/review.jpg', cv2.resize(np.vstack(rows), None, fx=.3, fy=.3), [1, 88])
