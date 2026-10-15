// Contrast of every wall text element vs the rendered background *including its own halo* (text made transparent, shadow kept).
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--headless=new'] });
  const fails = []; let n = 0, min = 99;
  for (const [w, h] of [[2560, 1080], [1920, 1080], [1440, 900], [1366, 657]]) for (const mode of ['morning', 'golden', 'night']) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    await ctx.addInitScript(m => localStorage.setItem('ff-time', m), mode);
    const p = await ctx.newPage(); await p.goto('http://localhost:3130/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1800); await p.waitForFunction(() => [...document.querySelectorAll('img.room5__layer')].some(i => i.complete && i.naturalWidth > 0 && getComputedStyle(i).opacity === '1'), null, { timeout: 15000 }); await p.waitForTimeout(400);
    await p.evaluate(() => document.querySelector('.room5__sky')?.remove());   // measure on the still (the sky never sits behind text)
    const els = await p.$$('.room5__eyebrow, .room5__name, .room5__intro, .room5__company, .room5__dates');
    const row = [];
    for (const el of els) {
      const bb0 = await el.boundingBox(); const pad = await el.evaluate(e => { const c = getComputedStyle(e); return [c.paddingLeft, c.paddingTop, c.paddingRight, c.paddingBottom].map(parseFloat) }); const bb = { x: bb0.x + pad[0], y: bb0.y + pad[1], width: bb0.width - pad[0] - pad[2], height: bb0.height - pad[1] - pad[3] }; const ink = await el.evaluate(e => getComputedStyle(e).color);
      await el.evaluate(e => { e.dataset.c = e.style.color; e.style.color = 'transparent' });
      const shot = await p.screenshot({ clip: bb }); await el.evaluate(e => { e.style.color = e.dataset.c });
      const v = await p.evaluate(async ([b64, ink]) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }; const L = []; for (let i = 0; i < d.length; i += 4) L.push(.2126 * f(d[i]) + .7152 * f(d[i + 1]) + .0722 * f(d[i + 2])); L.sort((a, b) => a - b); const m = ink.match(/\d+/g).map(Number); const li = .2126 * f(m[0]) + .7152 * f(m[1]) + .0722 * f(m[2]); const wv = li > .5 ? L[Math.floor(L.length * .95)] : L[Math.floor(L.length * .05)]; return (Math.max(li, wv) + .05) / (Math.min(li, wv) + .05) }, [shot.toString('base64'), ink]);
      const cls = await el.evaluate(e => e.className.replace('room5__', '') + (e.closest('[data-frame]') ? ':' + e.closest('[data-frame]').dataset.frame : ''));
      const fs = await el.evaluate(e => parseFloat(getComputedStyle(e).fontSize)); const big = fs >= 24;
      n++; min = Math.min(min, v); row.push(`${cls} ${v.toFixed(1)}`);
      if (v < (big ? 3 : 4.5)) fails.push(`${w}x${h} ${mode} ${cls} ${v.toFixed(2)} (${fs.toFixed(0)}px)`);
    }
    console.log(`${w}x${h} ${mode}: ` + row.join(' | '));
    await ctx.close();
  }
  console.log('checks', n, 'min', min.toFixed(2), 'fails', fails.length); fails.forEach(f => console.log('  FAIL', f));
  await b.close();
})();
