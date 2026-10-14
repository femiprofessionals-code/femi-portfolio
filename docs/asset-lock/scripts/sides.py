"""Real side extensions from Femi's clip (frame 191, AI-upscaled), in the master coordinate system, per light."""
import cv2, numpy as np, json
R = '/home/user/femi-portfolio/public/room/v5/'
E = 180                                       # extension per side, source px
P = np.load('params.npy'); s, t, tx, ty = P[191]
up = cv2.imread('f191-x4.png').astype(np.float32)
S = 2                                         # output at 2x source px (matches the 3072 room)
A = np.array([[s * np.cos(t), -s * np.sin(t), tx + E], [s * np.sin(t), s * np.cos(t), ty]]) * S
A[:, :2] /= 4                                 # input is the 4x-upscaled frame
Wc, Hc = (1536 + 2 * E) * S, 1024 * S
ext = cv2.warpAffine(up, A, (Wc, Hc), flags=cv2.INTER_AREA, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0))
cov = cv2.warpAffine(np.ones(up.shape[:2], np.float32), A, (Wc, Hc), flags=cv2.INTER_LINEAR, borderValue=0)
cov = cv2.erode(cov, np.ones((9, 9), np.uint8))
# light falloff toward the outer edge, ending in the page's dark surround where the clip has no picture
xs = np.arange(Wc, dtype=np.float32)[None, :] / S
edge_d = np.minimum(xs, (1536 + 2 * E) - xs)                       # distance (source px) from the outer edge
vign = np.ones_like(edge_d)   # no vignette: the fill layout never shows past real coverage
cov = cv2.GaussianBlur(cov, (0, 0), 6)
dark = np.array([32, 37, 43], np.float32)                           # #2b2520 BGR
morning3072 = cv2.imread(R + 'morning-3072.webp').astype(np.float32)
out = {}
for mode in ('morning', 'golden', 'night'):
    room = cv2.imread(R + f'{mode}-3072.webp').astype(np.float32)
    img = ext.copy()
    if mode != 'morning':
        # relight with a smooth per-row light ratio measured on the room's own outer columns (this light ÷ morning)
        for side, (a0, a1) in (('L', (0, 90)), ('R', (3072 - 90, 3072))):
            sl = slice(0, E * S) if side == 'L' else slice(Wc - E * S, Wc)
            num = np.median(room[:, a0:a1], axis=1); den = np.median(morning3072[:, a0:a1], axis=1)
            ratio = np.clip((num + 2) / (den + 2), .05, 3.0)
            ratio = cv2.GaussianBlur(ratio[None].astype(np.float32), (0, 0), sigmaX=24, sigmaY=0)[0] if False else cv2.GaussianBlur(ratio.reshape(-1, 1, 3).astype(np.float32), (1, 0), sigmaX=0, sigmaY=10).reshape(-1, 3)
            img[:, sl] = img[:, sl] * ratio[:, None, :]
    # exposure match at the seam: per row, scale each side so its inner columns equal the room's edge columns
    for side in ('L', 'R'):
        if side == 'L': inner = img[:, E * S - 24:E * S - 4]; edge = room[:, 4:24]; sl = slice(0, E * S)
        else: inner = img[:, Wc - E * S + 4:Wc - E * S + 24]; edge = room[:, -24:-4]; sl = slice(Wc - E * S, Wc)
        g = (np.median(edge, axis=1) + 3) / (np.median(inner, axis=1) + 3)
        g = cv2.GaussianBlur(np.clip(g, .5, 2).reshape(-1, 1, 3).astype(np.float32), (1, 0), sigmaX=0, sigmaY=14).reshape(-1, 3)
        img[:, sl] = img[:, sl] * g[:, None, :]
    img = img * (cov * vign)[..., None] + dark * (1 - cov * vign)[..., None]
    # seam: the outermost columns of the actual room take over within 10 px of the edge (no visible line)
    for side in ('L', 'R'):
        if side == 'L':
            band = img[:, E * S - 20:E * S]; edge = room[:, :1]
        else:
            band = img[:, Wc - E * S:Wc - E * S + 20]; edge = room[:, -1:]
        w = np.linspace(0, 1, 20)[None, :, None] if side == 'L' else np.linspace(1, 0, 20)[None, :, None]
        band[:] = band * (1 - w * .5) + edge * (w * .5)
    for side, sl in (('left', slice(0, E * S)), ('right', slice(Wc - E * S, Wc))):
        cv2.imwrite(R + f'edge-{side}-{mode}.webp', np.clip(img[:, sl], 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 84])
    comp = img.copy(); comp[:, E * S:E * S + 3072] = room
    cv2.imwrite(f'sides-{mode}.jpg', cv2.resize(comp, (Wc // 3, Hc // 3)), [1, 88])
np.save('ext_cov.npy', cv2.resize(cov, ((1536 + 2 * E), 1024)))
print('ok', Wc, Hc)
