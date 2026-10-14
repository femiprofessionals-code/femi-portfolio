"""Stage 3 export: locked room assets in one coordinate system (source px of the 1536x1024 master)."""
import cv2, numpy as np, json, hashlib, os
PACK = '/home/user/femi-portfolio/docs/reference/portfolio-pack/assets/'
OUT = '/home/user/femi-portfolio/public/room/v5/'
DOC = '/home/user/femi-portfolio/docs/asset-lock/'
os.makedirs(OUT + 'masks', exist_ok=True); os.makedirs(DOC, exist_ok=True)
sha = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
rng = np.random.default_rng(5)
W, H = 1536, 1024
modes = {'morning': 'room-master-morning', 'golden': 'room-golden-hour', 'night': 'room-night'}
files = {}
for mode, name in modes.items():
    src = cv2.imread(PACK + name + '.png')
    a = cv2.imread(name + '-x4.png').astype(np.float32); b = cv2.imread(name + '-gen.png').astype(np.float32)
    big = (.6 * a + .4 * b)
    l = cv2.resize(src, big.shape[1::-1], interpolation=cv2.INTER_LANCZOS4).astype(np.float32)
    big += .3 * (l - cv2.GaussianBlur(l, (0, 0), 3))                  # keep the render's own fine texture
    for w in (3072, 2048, 1536):
        im = cv2.resize(big, (w, w * 2 // 3), interpolation=cv2.INTER_AREA)
        im += cv2.GaussianBlur(rng.normal(0, 1.4, im.shape[:2]).astype(np.float32), (0, 0), .6)[..., None]
        p = f'{OUT}{mode}-{w}.webp'
        cv2.imwrite(p, np.clip(im, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 84])
        files[f'{mode}-{w}.webp'] = {'bytes': os.path.getsize(p), 'sha256': sha(p)}
for k in ('window', 'tree', 'furniture'):
    m = cv2.imread(f'm_{k}.png', 0)
    m = cv2.GaussianBlur(m, (0, 0), .6)                                 # anti-aliased edge
    p = f'{OUT}masks/{k}.png'; cv2.imwrite(p, m, [cv2.IMWRITE_PNG_COMPRESSION, 9])
    files[f'masks/{k}.png'] = {'bytes': os.path.getsize(p), 'sha256': sha(p)}

frames = [
    {'id': 'trowe', 'company': 'T. Rowe Price', 'outer': [502, 343, 148, 151], 'mat': [526, 368, 99, 102], 'lamp': [516, 318, 119, 26]},
    {'id': 'carlyle', 'company': 'The Carlyle Group', 'outer': [674, 343, 148, 151], 'mat': [698, 368, 100, 102], 'lamp': [688, 318, 119, 26]},
    {'id': 'gs', 'company': 'Goldman Sachs', 'outer': [845, 343, 149, 151], 'mat': [870, 368, 100, 102], 'lamp': [859, 318, 119, 26]},
]
for f in frames:
    x, y, w, h = f['outer']; f['hitbox'] = [x - 4, y - 4, w + 8, (586 - y) + 4]   # frame + caption zone; stops above bench/bowl (y≈587)
scene = {
    'note': 'All coordinates are source px of the 1536x1024 master (x, y, w, h). Overlays must be positioned as % of the rendered scene box, which keeps the image at its intrinsic 3:2 ratio (no cover-cropping on desktop).',
    'image': {'w': W, 'h': H, 'source': 'docs/reference/portfolio-pack/assets/room-master-morning.png', 'source_sha256': sha(PACK + 'room-master-morning.png'),
              'modes': {m: f'/room/v5/{m}-{{1536,2048,3072}}.webp' for m in modes}},
    'alignment': 'golden and night share the master geometry within 0.6 px (patch ECC on 13 regions) — crossfade the real images; no warping',
    'frames': frames,
    'zones': {'wall': [462, 112, 568, 578], 'identity': [474, 150, 544, 158], 'captions': [490, 498, 520, 88],
              'mobile_crop': [440, 270, 610, 450]},
    'windows': [
        {'id': 'left-corner', 'poly': [[0, 30], [150, 112], [150, 688], [0, 718]]},
        {'id': 'left', 'poly': [[234, 150], [462, 150], [462, 666], [234, 666]]},
        {'id': 'right', 'poly': [[1031, 150], [1352, 150], [1352, 666], [1031, 666]], 'mullion_x': [1271, 1280]},
        {'id': 'right-corner', 'poly': [[1373, 122], [1536, 58], [1536, 722], [1373, 692]]},
    ],
    'horizon_y': {'left': 470, 'right': 470},
    'masks': {'window': '/room/v5/masks/window.png — visible glass minus mullions, tree and furniture (white = outside view)',
              'tree': '/room/v5/masks/tree.png — canopy, trunk and pot; foreground over the left windows',
              'furniture': '/room/v5/masks/furniture.png — sofa, cushions, side table where they overlap the right glass'},
    'files': files,
}
json.dump(scene, open(OUT + 'scene.json', 'w'), indent=1)

# review sheet: masks + hitboxes + zones on the morning image
v = cv2.imread(f'{OUT}morning-1536.webp').astype(np.float32)
for k, c in (('window', (255, 120, 0)), ('tree', (0, 210, 0)), ('furniture', (255, 0, 255))):
    m = cv2.imread(f'{OUT}masks/{k}.png', 0).astype(np.float32)[..., None] / 255
    v = v * (1 - .5 * m) + np.array(c, np.float32) * .5 * m
v = v.astype(np.uint8)
for f in frames:
    x, y, w, h = f['hitbox']; cv2.rectangle(v, (x, y), (x + w, y + h), (0, 0, 255), 2)
    x, y, w, h = f['mat']; cv2.rectangle(v, (x, y), (x + w, y + h), (0, 255, 255), 1)
    cv2.putText(v, f['id'], (f['outer'][0] + 4, f['outer'][1] - 30), cv2.FONT_HERSHEY_SIMPLEX, .5, (0, 0, 255), 1, cv2.LINE_AA)
for k, (x, y, w, h) in scene['zones'].items():
    if k == 'wall': continue
    cv2.rectangle(v, (x, y), (x + w, y + h), (255, 255, 255), 1); cv2.putText(v, k, (x + 4, y + 16), cv2.FONT_HERSHEY_SIMPLEX, .5, (255, 255, 255), 1, cv2.LINE_AA)
cv2.imwrite(DOC + 'review-masks-hitboxes.jpg', v, [cv2.IMWRITE_JPEG_QUALITY, 88])
# three modes side by side, same crop, to show the shared geometry
row = [cv2.imread(f'{OUT}{m}-1536.webp')[280:620, 440:1060] for m in modes]
cv2.imwrite(DOC + 'review-modes.jpg', np.hstack(row), [cv2.IMWRITE_JPEG_QUALITY, 86])
print(json.dumps({k: v['bytes'] for k, v in files.items()}, indent=0))
