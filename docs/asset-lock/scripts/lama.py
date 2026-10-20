"""LaMa (big-lama TorchScript) inpainting. Usage: lama.py image.png mask.png out.png  (mask: 255 = fill)"""
import sys, numpy as np, torch, cv2
torch.set_num_threads(max(1, torch.get_num_threads()))
img_p, mask_p, out_p = sys.argv[1:4]
model = torch.jit.load(__file__.rsplit('/', 1)[0] + '/big-lama.pt', map_location='cpu').eval()
im = cv2.cvtColor(cv2.imread(img_p), cv2.COLOR_BGR2RGB).astype(np.float32) / 255
m = (cv2.imread(mask_p, 0) > 127).astype(np.float32)
H, W = m.shape
ph, pw = (8 - H % 8) % 8, (8 - W % 8) % 8
im = np.pad(im, ((0, ph), (0, pw), (0, 0)), mode='reflect'); m = np.pad(m, ((0, ph), (0, pw)), mode='reflect')
with torch.inference_mode():
    out = model(torch.from_numpy(im).permute(2, 0, 1)[None], torch.from_numpy(m)[None, None])
out = out[0].permute(1, 2, 0).numpy()[:H, :W]
cv2.imwrite(out_p, cv2.cvtColor(np.clip(out * 255, 0, 255).astype(np.uint8), cv2.COLOR_RGB2BGR))
