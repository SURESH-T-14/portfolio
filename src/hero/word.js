const FACE = 'Anton, "Arial Narrow", Impact, sans-serif';

function ctx2d(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c.getContext('2d', { willReadFrequently: false });
}

function metricsFor(ctx, ch) {
  const m = ctx.measureText(ch);
  return {
    advance: m.width,
    left: m.actualBoundingBoxLeft,
    right: m.actualBoundingBoxRight,
    ascent: m.actualBoundingBoxAscent,
    descent: m.actualBoundingBoxDescent
  };
}

export function buildWord(text, capHeightPx, maxTexture = 4096) {
  const TEXT = String(text || 'SURESH').toUpperCase();
  const probe = 400;
  let c = ctx2d(8, 8);
  c.font = `${probe}px ${FACE}`;
  c.textBaseline = 'alphabetic';

  const capAt = metricsFor(c, 'H').ascent || probe * 0.72;
  let size = (capHeightPx / capAt) * probe;

  c.font = `${size}px ${FACE}`;
  const tracking = -0.018 * capHeightPx;
  const per = [...TEXT].map((ch) => metricsFor(c, ch));

  let pen = 0;
  let natL = Infinity;
  let natR = -Infinity;
  const walk = per.map((m, i) => {
    const at = pen;
    natL = Math.min(natL, at - m.left);
    natR = Math.max(natR, at + m.right);
    pen += m.advance + tracking;
    return { char: TEXT[i], pen: at, m };
  });

  const naturalInk = Math.max(1, natR - natL);
  const targetRatio = 2.82;
  const scaleX = (targetRatio * capHeightPx) / naturalInk;
  const pad = Math.ceil(capHeightPx * 0.06);
  const descent = Math.max(0, ...per.map((m) => m.descent));

  const raw = walk.map((r) => ({
    char: r.char,
    penX: r.pen * scaleX,
    x0: (r.pen - r.m.left) * scaleX,
    x1: (r.pen + r.m.right) * scaleX,
    m: r.m
  }));
  const inkL = natL * scaleX;
  const inkR = natR * scaleX;

  let W = Math.ceil(inkR - inkL) + pad * 2;
  let H = Math.ceil(capHeightPx + descent) + pad * 2;
  let fit = 1;
  if (W > maxTexture) fit = maxTexture / W;
  if (H * fit > maxTexture) fit = maxTexture / H;
  if (fit < 1) {
    size *= fit;
    W = Math.floor(W * fit);
    H = Math.floor(H * fit);
  }

  const g = ctx2d(W, H);
  g.font = `${size}px ${FACE}`;
  g.textBaseline = 'alphabetic';
  g.fillStyle = '#fff';
  g.setTransform(scaleX * fit, 0, 0, fit, (-inkL * fit) + pad, capHeightPx * fit + pad);
  raw.forEach((r) => g.fillText(r.char, r.penX / scaleX, 0));
  g.setTransform(1, 0, 0, 1, 0, 0);

  return {
    canvas: g.canvas,
    width: W,
    height: H,
    ink: { x: pad, y: pad, w: (inkR - inkL) * fit, h: capHeightPx * fit }
  };
}

export function computeLayout(w, h) {
  const portrait = h / w > 1.05;
  const wordWidth = 0.78;
  const capHeight = 0.44;
  const targetRatio = 2.82;
  const byWidth = (wordWidth * w) / targetRatio;
  const byHeight = capHeight * h;
  let capH = Math.min(byWidth, byHeight);
  if (portrait) capH = Math.min(byWidth, h * 0.3);

  const wordW = capH * targetRatio;
  const cx = w * 0.5;
  const vCentre = portrait ? h * 0.5 : h * 0.473;
  const capTop = vCentre - capH * 0.5;
  const baseline = vCentre + capH * 0.5;
  let heroH = capH * 1.42;
  let feet = baseline + capH * 0.33;
  if (portrait) {
    heroH = h * 0.54;
    feet = h * 0.885;
  }

  return {
    w,
    h,
    portrait,
    word: { x: cx - wordW * 0.5, y: capTop, w: wordW, h: capH, capH, baseline },
    hero: { h: heroH, cx, feet }
  };
}

export async function fontsReady() {
  if (!document.fonts) return;
  try {
    await document.fonts.load('400 200px Anton');
    await document.fonts.ready;
  } catch {
    /* system fallback */
  }
}

export function makeNoise(size = 256) {
  const ctx = ctx2d(size, size);
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = 90 + Math.random() * 140;
    img.data[i] = n;
    img.data[i + 1] = n * 0.35;
    img.data[i + 2] = n * 0.28;
    img.data[i + 3] = 70 + Math.random() * 90;
  }
  ctx.putImageData(img, 0, 0);
  return ctx.canvas;
}
