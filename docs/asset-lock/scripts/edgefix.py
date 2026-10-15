"""Side extensions: replace the dark fades at the top and bottom edges with the room's own
neighbouring pixels, so no dark slivers show at the screen corners."""
import cv2, numpy as np, sys
D = sys.argv[1]
for side in ('left', 'right'):
    for m in ('morning', 'golden', 'night'):
        p = f'{D}/edge-{side}-{m}.webp'; e = cv2.imread(p).astype(np.float32); H, W = e.shape[:2]
        g = e @ np.array([.114, .587, .299], np.float32)
        def run(vals, ref):                                   # length of the dark fade from index 0 (at most 30 rows)
            n = 0
            while n < min(len(vals), 30) and vals[n] < ref * .88: n += 1
            return n if n < 30 else 0                         # a long dark run is real (ceiling shadow), not a fade
        rows = g.mean(1); ref = np.median(rows[300:1700])
        top = run(rows, np.median(rows[60:200])); bot = run(rows[::-1], np.median(rows[-200:-60]))
        oc = 0                                                # outer columns are never on screen (cover layout ≤ 59% of the strip)
        for i in range(top): e[i] = e[top + 2]                # repeat the first good row (ceiling)
        for i in range(bot): e[H - 1 - i] = e[H - bot - 3]    # repeat the last good row (floor)
        if oc:
            src = e[:, oc + 2] if side == 'left' else e[:, W - oc - 3]
            for i in range(oc):
                if side == 'left': e[:, i] = src
                else: e[:, W - 1 - i] = src
        # soften the repeated bands so they don't read as stripes
        if top: e[:top + 6] = cv2.GaussianBlur(e[:top + 6], (0, 0), sigmaX=.1, sigmaY=2)
        if bot: e[H - bot - 6:] = cv2.GaussianBlur(e[H - bot - 6:], (0, 0), sigmaX=.1, sigmaY=2)
        cv2.imwrite(p, np.clip(e, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 88])
        print(side, m, 'top', top, 'bottom', bot, 'outer cols', oc)
