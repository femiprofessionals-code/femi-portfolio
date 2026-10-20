"""Tighten the moving sky's mask round the olive tree (part of the "no shadow round the tree" fix, after halo.py):
open sky between and beside the leaves is opened to the clip wherever the still and the clip's own average agree it is
sky, stopping 3 master px short of any leaf (the clip carries the same tree in the same place).
Usage: maskfit.py room_dir vmean_dir orig_mask_dir out_mask_dir"""
import cv2, numpy as np, sys
R, V, MI, MO = sys.argv[1:5]; E = 180
for mode in ('morning', 'golden', 'night'):
    a = cv2.imread(f'{MI}/mask-sky-band-{mode}.png', -1)
    st = cv2.resize(cv2.imread(f'{R}/{mode}-3072.webp'), (1536, 1024), interpolation=cv2.INTER_AREA).astype(np.float32)[:480]
    vm = cv2.imread(f'{V}/vmean-{mode}.png').astype(np.float32)[:, E:E + 1536]
    tree = cv2.imread(f'{R}/tree/tree-{mode}.webp', -1)[..., 3]
    leaf = np.zeros((1024, 1536), np.uint8); leaf[180:604, 0:460] = cv2.resize(tree, (460, 424), interpolation=cv2.INTER_AREA) > 10
    leaf = cv2.dilate(leaf, np.ones((7, 7), np.uint8))[:480]                      # 3 px short of the leaves
    X = np.arange(1536)[None, :]; Y = np.arange(480)[:, None]
    panes = ((X < 134) | ((X >= 247) & (X < 398))) & (Y >= 6) & (Y < 466)
    agree = np.abs(cv2.GaussianBlur(st, (0, 0), 1.5) - cv2.GaussianBlur(vm, (0, 0), 1.5)).sum(2) < 30
    glass = cv2.imread(f'{R}/masks/window.png', 0)
    glass = cv2.morphologyEx(glass, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61)))[:480] > 127
    glass = cv2.erode(glass.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    new = (panes & agree & glass & (leaf == 0)).astype(np.uint8)
    new = cv2.morphologyEx(new, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    soft = cv2.GaussianBlur(new.astype(np.float32), (0, 0), 1.0) * 255
    al = a[..., 3].astype(np.float32); sub = al[:, E:E + 1536]
    before = (sub > 0).sum()
    al[:, E:E + 1536] = np.maximum(sub, soft * (soft > 128) + soft * (soft <= 128) * .5)
    a[..., 3] = al.astype(np.uint8)
    if a.shape[2] == 4: a[..., :3] = np.where(a[..., 3:] > 0, 255, a[..., :3])
    cv2.imwrite(f'{MO}/mask-sky-band-{mode}.png', a)
    print(mode, 'open px', before, '->', int((a[:, E:E + 1536, 3] > 0).sum()))
