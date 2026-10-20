"""Lean Femi's travel map against the olive tree's planter, on the floor, in all three lights (baked into the room).
The frame leans back slightly (perspective), is lit like the planter's sunward face in each light, and casts a soft
contact shadow on the floor and on the pot. Usage: lean.py plate_dir map.webp"""
import cv2, numpy as np, sys
D, MAPSRC = sys.argv[1:3]; S = 2
DX = int(sys.argv[3]) if len(sys.argv) > 3 else 0      # the tree and pot moved left by -DX master px (treeshift2.py)
art = cv2.imread(MAPSRC)[24:995, 18:1518].astype(np.float32)          # the frame itself
h0, w0 = art.shape[:2]
# target quad (master px): bottom on the floor, top leaning back against the pot
Q = (np.float32([[232, 664], [326, 664], [332, 732], [226, 732]]) + np.float32([DX, 0])) * S   # propped against the pot's right side
src = np.float32([[0, 0], [w0, 0], [w0, h0], [0, h0]])
M = cv2.getPerspectiveTransform(src, Q)
POT = (200 + DX, 640, 80, 60)                                             # planter face used to read the light (master)
ref = None
for mode in ('morning', 'golden', 'night'):
    p = f'{D}/{mode}-3072.webp'; im = cv2.imread(p).astype(np.float32); H, W = im.shape[:2]
    x, y, w, h = POT; pot = np.median(im[y * S:(y + h) * S, x * S:(x + w) * S].reshape(-1, 3), 0)
    if ref is None: ref = pot
    light = np.clip(pot / ref, 0, 1.3) * .94                         # morning: the pot's own (bright) light, slightly shaded
    Y = float(light @ np.array([.0722, .7152, .2126])); light = Y * (light / Y) ** .4
    # shadows first: contact shadow on the floor behind/below the frame, and the frame's shade on the pot to its left
    sh = np.zeros((H, W), np.float32)
    cv2.fillConvexPoly(sh, np.int32([[(226 + DX) * S, 727 * S], [(334 + DX) * S, 727 * S], [(352 + DX) * S, 739 * S], [(222 + DX) * S, 739 * S]]), 1)
    sh = cv2.GaussianBlur(sh, (0, 0), 3 * S) * .7
    pot_sh = np.zeros((H, W), np.float32); cv2.fillConvexPoly(pot_sh, np.int32(Q + np.float32([6 * S, -3 * S])), 1)
    sh = np.maximum(sh, cv2.GaussianBlur(pot_sh, (0, 0), 5 * S) * .42)   # occlusion where the frame rests on the pot
    im *= (1 - sh)[..., None]
    warped = cv2.warpPerspective(art * light, M, (W, H), flags=cv2.INTER_AREA if False else cv2.INTER_LINEAR)
    alpha = cv2.warpPerspective(np.ones((h0, w0), np.float32), M, (W, H), flags=cv2.INTER_LINEAR)
    # a little shading toward the bottom (closer to the floor, less light) and a soft edge
    gy = np.linspace(0, 1, H, dtype=np.float32)[:, None]
    shade = 1 - .12 * np.clip((gy * H - 667 * S) / (66 * S), 0, 1)
    edge = np.zeros((H, W), np.float32)
    cv2.fillConvexPoly(edge, np.int32([Q[1], Q[1] + [5, 2], Q[2] + [5, 1], Q[2]]), 1)      # right side of the frame
    cv2.fillConvexPoly(edge, np.int32([Q[3], Q[2], Q[2] + [3, 4], Q[3] + [0, 4]]), 1)     # bottom edge on the floor
    edge = cv2.GaussianBlur(edge, (0, 0), .8)[..., None]
    im = im * (1 - edge) + (np.array([40, 52, 66], np.float32) * light) * edge
    out = im * (1 - alpha[..., None]) + warped * shade[..., None] * alpha[..., None]
    cv2.imwrite(p, np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
    for wd in (2048, 1536):
        cv2.imwrite(f'{D}/{mode}-{wd}.webp', cv2.resize(np.clip(out, 0, 255), (wd, wd * 2 // 3), interpolation=cv2.INTER_AREA).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
    cv2.imwrite(f'{D}/lean-{mode}.jpg', np.clip(out, 0, 255).astype(np.uint8)[1150:1560, max(0, 250 + 2 * DX):900 + 2 * DX], [1, 88])
    print(mode, 'light', np.round(light, 3))
