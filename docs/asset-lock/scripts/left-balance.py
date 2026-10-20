"""Balance the left side of Home (Femi: "the left side on the screen is too bright and overexposed").
1. The left window extension (edge-left, shown on wide screens) had clipped, detail-less glass (morning 40% pure
   white, golden a blown sun bloom). Those areas are re-drawn by LaMa with the room's left window as context.
2. A soft highlight roll-off + slight exposure cut on the extension, fading out over the room's first 60 master px,
   so the seam stays continuous. Colour kept (luminance ratio applied to RGB).
Usage: bal.py orig_dir public_room_dir   (needs out-{mode}.png / mk-{mode}.png from the LaMa pass, 480x1024 = ext|room 0-300)"""
import cv2, numpy as np, sys
O, P = sys.argv[1:3]; S = 2
CURVE = {'morning': (.95, 175, .5), 'golden': (.93, 150, .5), 'night': (.96, 80, .6)}   # exposure, knee, slope above knee
lw = np.array([.114, .587, .299], np.float32)
def tone(img, e, knee, k):
    L = img @ lw + 1e-3
    out = np.where(L < knee, L * e, knee * e + (L - knee) * e * k)
    return img * (out / L)[..., None]
for mode, (e, knee, k) in CURVE.items():
    ext = cv2.imread(f'{O}/edge-left-{mode}.webp').astype(np.float32)
    room = cv2.imread(f'{O}/{mode}-3072.webp').astype(np.float32)
    lm = cv2.resize(cv2.imread(f'out-{mode}.png').astype(np.float32), (960, 2048), interpolation=cv2.INTER_CUBIC)[:, :360]
    mk = cv2.GaussianBlur(cv2.resize(cv2.imread(f'mk-{mode}.png', 0), (960, 2048))[:, :360].astype(np.float32) / 255, (0, 0), 6)[..., None]
    hp = ext - cv2.GaussianBlur(ext, (0, 0), 2)                         # keep the glass's own fine grain
    ext2 = tone(ext * (1 - mk) + (lm + hp * .5) * mk, e, knee, k)
    n = 60 * S
    w = (1 - np.linspace(0, 1, n, dtype=np.float32)) ** 2
    part = room[:, :n]
    room[:, :n] = part * (1 - w[None, :, None]) + tone(part, e, knee, k) * w[None, :, None]
    cv2.imwrite(f'{P}/edge-left-{mode}.webp', np.clip(ext2, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
    for wd in (3072, 2048, 1536):
        cv2.imwrite(f'{P}/{mode}-{wd}.webp', cv2.resize(np.clip(room, 0, 255), (wd, wd * 2 // 3), interpolation=cv2.INTER_AREA).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
    print(mode, 'ext mean', round(float((ext @ lw).mean()), 1), '->', round(float((ext2 @ lw).mean()), 1), 'clipped', round(float(((ext @ lw) > 245).mean()), 3), '->', round(float(((ext2 @ lw) > 245).mean()), 3))
