"""Light each painting with the room's own light: lighting map = blank mat in each mode ÷ the same mat's morning median."""
import cv2, numpy as np, json
R = '/home/user/femi-portfolio/public/room/v5/'; ART = '/home/user/femi-portfolio/docs/assets/supplied-art/'
OUT = '/home/user/femi-portfolio/public/art/lit/'
frames = {'trowe': ([526, 368, 99, 102], 'trowe-painting-supplied.webp'), 'carlyle': ([698, 368, 100, 102], 'carlyle-painting-supplied.jpg'), 'gs': ([870, 368, 100, 102], 'gs-painting-supplied.webp')}
S = 2  # 3072 render = 2x master px
rooms = {m: cv2.imread(f'{R}{m}-3072.webp').astype(np.float32) for m in ('morning', 'golden', 'night')}
stats = {}
for fid, ((x, y, w, h), src) in frames.items():
    art = cv2.resize(cv2.imread(ART + src), (480, 480), interpolation=cv2.INTER_AREA).astype(np.float32)
    inset = 3  # stay inside the mat's bevel line; CSS draws the edge shadow
    crop = lambda im: im[(y + inset) * S:(y + h - inset) * S, (x + inset) * S:(x + w - inset) * S]
    ref = np.median(crop(rooms['morning']).reshape(-1, 3), 0)
    for m, im in rooms.items():
        mat = cv2.GaussianBlur(crop(im), (0, 0), 2.0)
        light = np.clip(mat / ref, 0, 1.3)
        Y = (light @ np.array([.0722, .7152, .2126], np.float32))[..., None] + 1e-4   # BGR luminance of the light
        light = Y * (light / Y) ** .4          # full brightness pattern, ~40% of its colour cast: warm light, brand blues stay blue
        light = cv2.resize(light, (480, 480), interpolation=cv2.INTER_CUBIC)
        lit = np.clip(art * light, 0, 255).astype(np.uint8)
        cv2.imwrite(f'{OUT}{m}-{fid}.webp', lit, [cv2.IMWRITE_WEBP_QUALITY, 86])
        stats[f'{m}-{fid}'] = {'mean_light_bgr': [round(float(v), 3) for v in light.reshape(-1, 3).mean(0)], 'min': round(float(light.min()), 3), 'max': round(float(light.max()), 3)}
json.dump(stats, open('relight-stats.json', 'w'), indent=1)
for k, v in stats.items(): print(k, v)
# contact sheet: modes (rows) × paintings (cols)
rows = [np.hstack([cv2.imread(f'{OUT}{m}-{f}.webp') for f in frames]) for m in ('morning', 'golden', 'night')]
cv2.imwrite('relight-sheet.jpg', cv2.resize(np.vstack(rows), None, fx=.6, fy=.6), [1, 88])
