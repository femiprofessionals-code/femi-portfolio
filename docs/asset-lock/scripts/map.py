"""Travel map (Femi's supplied artwork) as a live layer per light, lit by the wall it hangs on (same method as relight.py)."""
import cv2, numpy as np, sys
SRC, WALL, OUT = sys.argv[1:4]
art = cv2.imread(SRC)[24:995, 18:1518].astype(np.float32)          # the frame itself, without the supplied wall around it
W, H = 480, 311
cv2.imwrite(f'{OUT}/map.webp', cv2.resize(art, (W, H), interpolation=cv2.INTER_AREA).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
art = cv2.resize(art, (W, H), interpolation=cv2.INTER_AREA)
walls = {m: np.load(f'{WALL}/maplight-{m}.npy') for m in ('morning', 'golden', 'night')}
ref = np.median(walls['morning'].reshape(-1, 3), 0)
for m, wl in walls.items():
    light = np.clip(cv2.GaussianBlur(wl, (0, 0), 3) / ref, 0, 1.3)
    Y = (light @ np.array([.0722, .7152, .2126], np.float32))[..., None] + 1e-4
    light = Y * (light / Y) ** .4
    light = cv2.resize(light, (W, H), interpolation=cv2.INTER_CUBIC)
    cv2.imwrite(f'{OUT}/lit/{m}-map.webp', np.clip(art * light, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 86])
    print(m, 'mean light', light.reshape(-1, 3).mean(0).round(3))
