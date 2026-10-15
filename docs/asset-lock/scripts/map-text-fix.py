"""Correct the map's mat text "30 countries visited" -> "30+ countries visited", reusing the artwork's own '+' glyph
(from "60+") and re-centring the line. Multiplicative transfer keeps the anti-aliasing and the mat texture."""
import cv2, numpy as np, sys
src, out = sys.argv[1:3]
m = cv2.imread(src).astype(np.float32)
y0, y1, x0, x1 = 905, 956, 505, 1035
band = m[y0:y1, x0:x1]
lum = band @ np.array([.114, .587, .299], np.float32)
ink = cv2.dilate((lum < 185).astype(np.uint8), np.ones((5, 5), np.uint8))
clean = cv2.inpaint(band.astype(np.uint8), ink, 6, cv2.INPAINT_TELEA).astype(np.float32)
clean = cv2.GaussianBlur(clean, (0, 0), 1.0) * (ink[..., None] > 0) + band * (ink[..., None] == 0)
ratio = np.clip(band / (clean + 1), 0, 1)                    # 1 on the mat, <1 on the letters
new = clean.copy()
def paste(sa, sb, dx):                                        # source columns [sa, sb] (image x), shifted by dx
    a, b = sa - x0, sb - x0 + 1
    new[:, a + dx:b + dx] *= ratio[:, a:b]
# spacing measured from "60+ cities": 4 px from the digit to '+', 10 px word space after it; the line grows 15 px
L = -7                                                        # shift left to keep the line centred
paste(518, 549, L)                                            # "30"
paste(822, 837, (553 + L) - 824)                              # the '+' from "60+" (ink 824-835), 4 px after "30"
paste(553, 1020, 15 + L)                                      # the rest of the line, a word space after '+'
m[y0:y1, x0:x1] = new
cv2.imwrite(out, np.clip(m, 0, 255).astype(np.uint8), [cv2.IMWRITE_WEBP_QUALITY, 92])
c = np.clip(m, 0, 255).astype(np.uint8)[895:960, 480:1060]
cv2.imwrite(out.replace('.webp', '-crop.png'), cv2.resize(c, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC))
