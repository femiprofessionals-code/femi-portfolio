"""Remove the map's mat caption "30+ countries visited · 60+ cities explored" (Femi: remove the countries travelled).
Rows 911-949 of the mat are re-drawn by interpolating between the clean mat just above and below, with the mat's own grain."""
import cv2, numpy as np, sys
src, out = sys.argv[1:3]
m = cv2.imread(src).astype(np.float32)
X0, X1, A, B = 480, 1060, 911, 949
top = cv2.GaussianBlur(m[A - 5:A, X0:X1].mean(0, keepdims=True), (0, 0), sigmaX=6, sigmaY=.1)[0]
bot = cv2.GaussianBlur(m[B:B + 5, X0:X1].mean(0, keepdims=True), (0, 0), sigmaX=6, sigmaY=.1)[0]
t = np.linspace(0, 1, B - A, dtype=np.float32)[:, None, None]
base = top[None] * (1 - t) + bot[None] * t
g = m[B:B + 10, X0:X1]; g = g - cv2.GaussianBlur(g, (0, 0), 2)
grain = np.concatenate([g, g[::-1]] * 3, 0)[:B - A]
fx = np.clip(np.minimum(np.arange(X1 - X0), np.arange(X1 - X0)[::-1]) / 12, 0, 1)[None, :, None]   # feather the ends
m[A:B, X0:X1] = m[A:B, X0:X1] * (1 - fx) + (base + grain) * fx
cv2.imwrite(out, np.clip(m, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 95])
