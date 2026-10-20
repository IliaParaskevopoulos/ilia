// Perceptual map: SVG scatter on a 0–10 grid, quadrants split at 5.
// PAJ in brand orange, rivals in neutral ink; every point direct-labelled.
function perceptualMap({ players, x, y, size = 520, quads, mini = false }) {
  const pad = mini ? { l: 26, r: 14, t: 14, b: 26 } : { l: 44, r: 24, t: 24, b: 44 };
  const W = size, H = size, iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const sx = v => pad.l + (v / 10) * iw, sy = v => pad.t + ih - (v / 10) * ih;
  const fs = mini ? 10 : 13, rOther = mini ? 4.5 : 6.5, rUs = mini ? 6.5 : 9;
  const pts = players.map(n => ({ n, label: n === 'PAJ' ? 'PAJ GPS' : n, us: n === 'PAJ',
    cx: sx(SCORES[n][x]), cy: sy(SCORES[n][y]) }));

  // Label placement: first candidate that stays inside and clears dots + placed labels.
  const boxes = pts.map(p => ({ x0: p.cx - rUs, y0: p.cy - rUs, x1: p.cx + rUs, y1: p.cy + rUs }));
  const hit = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
  pts.forEach(p => {
    const w = p.label.length * fs * (p.us ? 0.64 : 0.58), h = fs, g = (p.us ? rUs : rOther) + 4;
    const cands = [
      [p.cx + g, p.cy + h * 0.35, 'start'], [p.cx - g, p.cy + h * 0.35, 'end'],
      [p.cx, p.cy - g - 2, 'middle'], [p.cx, p.cy + g + h, 'middle'],
      [p.cx + g, p.cy - g, 'start'], [p.cx - g, p.cy - g, 'end'],
      [p.cx + g, p.cy + g + h * 0.5, 'start'], [p.cx - g, p.cy + g + h * 0.5, 'end'],
    ];
    for (const [tx, ty, a] of cands) {
      const x0 = a === 'start' ? tx : a === 'end' ? tx - w : tx - w / 2;
      const b = { x0, y0: ty - h, x1: x0 + w, y1: ty + 2 };
      if (b.x0 < pad.l || b.x1 > W - 2 || b.y0 < 2 || b.y1 > pad.t + ih) continue;
      if (boxes.some(o => hit(o, b))) continue;
      boxes.push(b); Object.assign(p, { tx, ty, a }); return;
    }
    Object.assign(p, { tx: p.cx + g, ty: p.cy + h * 0.35, a: 'start' });
  });

  const mx = sx(5), my = sy(5), q = mini ? 8.5 : 10.5;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">`;
  s += `<rect x="${mx}" y="${pad.t}" width="${pad.l + iw - mx}" height="${my - pad.t}" fill="#fde8e0"/>`;
  s += `<rect x="${pad.l}" y="${pad.t}" width="${iw}" height="${ih}" fill="none" stroke="#e4e4e4"/>`;
  s += `<line x1="${mx}" y1="${pad.t}" x2="${mx}" y2="${pad.t + ih}" stroke="#cfcfcf" stroke-dasharray="3 3"/>`;
  s += `<line x1="${pad.l}" y1="${my}" x2="${pad.l + iw}" y2="${my}" stroke="#cfcfcf" stroke-dasharray="3 3"/>`;
  if (quads && !mini) {
    const st = `font-size="${q}" font-weight="700" letter-spacing="1" fill="#8a8a8a"`;
    s += `<text x="${pad.l + iw - 8}" y="${pad.t + 16}" text-anchor="end" font-size="${q}" font-weight="700" letter-spacing="1" fill="#f05123">${quads[0].toUpperCase()}</text>`;
    s += `<text x="${pad.l + 8}" y="${pad.t + 16}" ${st}>${quads[1].toUpperCase()}</text>`;
    s += `<text x="${pad.l + 8}" y="${pad.t + ih - 8}" ${st}>${quads[2].toUpperCase()}</text>`;
    s += `<text x="${pad.l + iw - 8}" y="${pad.t + ih - 8}" text-anchor="end" ${st}>${quads[3].toUpperCase()}</text>`;
  }
  const al = `font-size="${mini ? 9.5 : 11.5}" font-weight="600" fill="#4a4a4a"`;
  s += `<text x="${pad.l + iw}" y="${H - (mini ? 8 : 14)}" text-anchor="end" ${al}>${VARS[x]} →</text>`;
  s += `<text x="${pad.l}" y="${H - (mini ? 8 : 14)}" ${al} fill="#8a8a8a">Low</text>`;
  s += `<text transform="translate(${mini ? 12 : 18},${pad.t}) rotate(-90)" text-anchor="end" ${al}>${VARS[y]} →</text>`;
  s += `<text transform="translate(${mini ? 12 : 18},${pad.t + ih}) rotate(-90)" ${al} fill="#8a8a8a">Low</text>`;
  pts.filter(p => !p.us).concat(pts.filter(p => p.us)).forEach(p => {
    s += `<circle cx="${p.cx}" cy="${p.cy}" r="${p.us ? rUs : rOther}" fill="${p.us ? '#f05123' : '#4a4a4a'}" stroke="#fff" stroke-width="2"/>`;
  });
  pts.forEach(p => {
    s += `<text x="${p.tx}" y="${p.ty}" text-anchor="${p.a}" font-size="${fs}" font-weight="${p.us ? 800 : 500}" fill="#111">${p.label}</text>`;
  });
  return s + '</svg>';
}
