const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/home/user/femi-portfolio/docs/qa/fill';
const sizes = [[2560, 1080], [1920, 1080], [1920, 970], [1680, 1050], [1536, 730], [1440, 900], [1440, 700], [1366, 657], [1280, 800], [1280, 650], [1024, 768], [900, 1200]];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--headless=new', '--autoplay-policy=no-user-gesture-required'] });
  const rows = [];
  for (const [w, h] of sizes) for (const mode of ['morning', 'night']) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    await ctx.addInitScript(m => localStorage.setItem('ff-time', m), mode);
    const p = await ctx.newPage(); await p.goto('http://localhost:3130/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200); await p.mouse.move(w / 2, h - 5);
    const r = await p.evaluate(() => {
      const R = e => e.getBoundingClientRect(); const sc = R(document.querySelector('.room5__scene'));
      const id = document.querySelector('.room5__identity'); const vis = getComputedStyle(id).display !== 'none';
      const arts = [...document.querySelectorAll('.room5__art')].map(R); const caps = [...document.querySelectorAll('.room5__dates')].map(R);
      const ext = 180 / 1536 * sc.width, cover = 107 / 1536 * sc.width;
      return { layout: vis ? 'wall' : 'other', sceneL: Math.round(sc.left), sceneR: Math.round(innerWidth - sc.right), realSideOK: sc.left <= cover + 0.5 && innerWidth - sc.right <= cover + 0.5,
        coversH: sc.top <= 0.5 && sc.bottom >= innerHeight - 0.5, idTop: vis ? Math.round(R(id).top) : null, navH: Math.round(R(document.querySelector('.nav')).bottom),
        artsInView: arts.every(a => a.left >= 0 && a.right <= innerWidth && a.top >= 0 && a.bottom <= innerHeight), captionsInView: caps.every(c => c.bottom <= innerHeight),
        rugEdgeY: Math.round(sc.top + sc.height * 915 / 1024 - innerHeight), overflowX: document.documentElement.scrollWidth > innerWidth };
    });
    const buf = await p.screenshot(); fs.writeFileSync(`${OUT}/home-${w}x${h}-${mode}.png`, buf);
    // first frame painting click
    await p.mouse.click(...(await p.evaluate(() => { const a = document.querySelectorAll('.room5__art')[1].getBoundingClientRect(); return [a.x + a.width / 2, a.y + a.height / 2] })));
    await p.waitForTimeout(600); r.click = new URL(p.url()).hash;
    r.size = `${w}x${h}`; r.mode = mode; rows.push(r); await ctx.close();
  }
  fs.writeFileSync(`${OUT}/fill-report.json`, JSON.stringify(rows, null, 1));
  for (const r of rows) console.log(r.size.padEnd(10), r.mode.padEnd(8), r.layout, 'covers', r.coversH, 'realSides', r.realSideOK, `(${r.sceneL}/${r.sceneR})`, 'idTop', r.idTop, 'nav', r.navH, 'arts', r.artsInView, 'caps', r.captionsInView, 'rug±', r.rugEdgeY, 'click', r.click, 'ovf', r.overflowX);
  await b.close();
})();
