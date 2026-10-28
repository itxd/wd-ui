/* 轻量 SVG 图表：返回 SVG 字符串。标记规范：2px 线、≤24px 柱宽、4px 圆角数据端、10% 面积填充、1px 实线网格 */
(function () {
  const fmtK = (v) => (v >= 10000 ? `${+(v / 10000).toFixed(1)}万` : v >= 1000 ? `${+(v / 1000).toFixed(1)}K` : `${v}`);

  function niceMax(max) {
    if (max <= 0) return 1;
    const p = 10 ** Math.floor(Math.log10(max));
    const m = max / p;
    const step = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
    return step * p;
  }

  /* Catmull-Rom 转三次贝塞尔，得到平滑曲线 */
  function smoothPath(pts) {
    if (pts.length < 2) return '';
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }
  const linePath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  /* 顶部圆角、底部直角的柱子 */
  function barPath(x, y, w, h, r = 4) {
    if (h <= 0) return '';
    const rr = Math.min(r, w / 2, h);
    return `M${x},${y + h} V${y + rr} Q${x},${y} ${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h} Z`;
  }
  function hBarPath(x, y, w, h, r = 4) {
    if (w <= 0) return '';
    const rr = Math.min(r, h / 2, w);
    return `M${x},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h - rr} Q${x + w},${y + h} ${x + w - rr},${y + h} H${x} Z`;
  }

  function yAxis(w, h, pad, max, ticks) {
    let s = '';
    for (let i = 0; i <= ticks; i++) {
      const v = (max / ticks) * i;
      const y = h - pad.b - ((h - pad.t - pad.b) * i) / ticks;
      s += `<line x1="${pad.l}" x2="${w - pad.r}" y1="${y}" y2="${y}" style="stroke:var(--grid)" stroke-width="1"/>`;
      s += `<text x="${pad.l - 8}" y="${y + 3}" text-anchor="end">${fmtK(Math.round(v))}</text>`;
    }
    return s;
  }
  function xLabels(labels, xs, h, pad, every = 1) {
    return labels.map((l, i) => (i % every === 0 ? `<text x="${xs[i]}" y="${h - pad.b + 16}" text-anchor="middle">${l}</text>` : '')).join('');
  }

  /* 折线 / 面积图 */
  function line(o) {
    const w = o.w || 560, h = o.h || 220;
    const pad = Object.assign({ t: 12, r: 12, b: 26, l: 38 }, o.pad);
    const all = o.series.flatMap((s) => s.data);
    const max = niceMax(Math.max(...all) * 1.05);
    const n = o.series[0].data.length;
    const xs = Array.from({ length: n }, (_, i) => pad.l + ((w - pad.l - pad.r) * i) / (n - 1));
    const yOf = (v) => h - pad.b - ((h - pad.t - pad.b) * v) / max;
    let s = `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.title || '折线图'}">`;
    if (o.axis !== false) s += yAxis(w, h, pad, max, o.ticks || 4);
    o.series.forEach((se) => {
      const pts = se.data.map((v, i) => [xs[i], yOf(v)]);
      const d = o.smooth === false ? linePath(pts) : smoothPath(pts);
      if (o.area !== false) {
        s += `<path d="${d} L${xs[n - 1]},${h - pad.b} L${xs[0]},${h - pad.b} Z" style="fill:${se.color}" fill-opacity="${se.fillOpacity || 0.1}"/>`;
      }
      s += `<path d="${d}" fill="none" style="stroke:${se.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${se.dash ? ' stroke-dasharray="4 4"' : ''}/>`;
      const last = pts[n - 1];
      s += `<circle cx="${last[0]}" cy="${last[1]}" r="4" style="fill:${se.color};stroke:var(--card)" stroke-width="2"/>`;
    });
    if (o.labels && o.axis !== false) s += xLabels(o.labels, xs, h, pad, o.labelEvery || 1);
    /* 悬浮命中区：每个 x 一列 */
    const colW = (w - pad.l - pad.r) / (n - 1);
    xs.forEach((x, i) => {
      const tip = `${o.labels ? o.labels[i] : i + 1}　${o.series.map((se) => `${se.name} ${Atlas.fmt(se.data[i])}`).join('　')}`;
      s += `<rect x="${x - colW / 2}" y="${pad.t}" width="${colW}" height="${h - pad.t - pad.b}" fill="transparent" data-tt="${tip}"/>`;
    });
    return `${s}</svg>`;
  }

  /* 分组柱状图 / 堆叠柱状图 */
  function bars(o) {
    const w = o.w || 560, h = o.h || 220;
    const pad = Object.assign({ t: 12, r: 12, b: 26, l: 38 }, o.pad);
    const n = o.labels.length;
    const totals = o.labels.map((_, i) => o.series.reduce((a, se) => a + se.data[i], 0));
    const max = niceMax((o.stacked ? Math.max(...totals) : Math.max(...o.series.flatMap((s) => s.data))) * 1.05);
    const band = (w - pad.l - pad.r) / n;
    const groups = o.stacked ? 1 : o.series.length;
    const bw = Math.min(o.barW || 24, (band * 0.7 - (groups - 1) * 2) / groups);
    const plotH = h - pad.t - pad.b;
    let s = `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.title || '柱状图'}">`;
    if (o.axis !== false) s += yAxis(w, h, pad, max, o.ticks || 4);
    const xs = [];
    o.labels.forEach((lab, i) => {
      const cx = pad.l + band * i + band / 2;
      xs.push(cx);
      if (o.stacked) {
        let acc = 0;
        o.series.forEach((se, k) => {
          const bh = (plotH * se.data[i]) / max;
          const y = h - pad.b - ((plotH * acc) / max) - bh;
          const isTop = k === o.series.length - 1;
          const gap = k > 0 ? 2 : 0;
          const d = isTop ? barPath(cx - bw / 2, y, bw, bh - gap) : `M${cx - bw / 2},${y} h${bw} v${bh - gap} h${-bw} Z`;
          s += `<path d="${d}" style="fill:${se.color}" data-tt="${lab}　${se.name} ${Atlas.fmt(se.data[i])}"/>`;
          acc += se.data[i];
        });
      } else {
        const gw = groups * bw + (groups - 1) * 2;
        o.series.forEach((se, k) => {
          const bh = (plotH * se.data[i]) / max;
          const x = cx - gw / 2 + k * (bw + 2);
          const fill = o.highlight !== undefined && o.highlight !== i ? `color-mix(in srgb, ${se.color} 35%, transparent)` : se.color;
          s += `<path d="${barPath(x, h - pad.b - bh, bw, bh)}" style="fill:${fill}" data-tt="${lab}　${se.name} ${Atlas.fmt(se.data[i])}"/>`;
        });
      }
    });
    if (o.axis !== false) s += xLabels(o.labels, xs, h, pad, o.labelEvery || 1);
    return `${s}</svg>`;
  }

  /* 水平条形图 */
  function hbars(o) {
    const w = o.w || 360, rowH = o.rowH || 28;
    const pad = { l: o.labelW || 64, r: 44 };
    const h = o.items.length * rowH;
    const max = Math.max(...o.items.map((i) => i.v));
    let s = `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.title || '条形图'}">`;
    o.items.forEach((it, i) => {
      const y = i * rowH + (rowH - 12) / 2;
      const bw = ((w - pad.l - pad.r) * it.v) / max;
      s += `<text x="${pad.l - 8}" y="${y + 10}" text-anchor="end" style="fill:var(--fg-2)">${it.label}</text>`;
      s += `<rect x="${pad.l}" y="${y}" width="${w - pad.l - pad.r}" height="12" rx="4" style="fill:var(--bg-2)"/>`;
      s += `<path d="${hBarPath(pad.l, y, bw, 12)}" style="fill:${it.color || o.color || 'var(--s1)'}" data-tt="${it.label} ${Atlas.fmt(it.v)}"/>`;
      s += `<text x="${pad.l + bw + 6}" y="${y + 10}" style="fill:var(--fg-2)">${Atlas.fmt(it.v)}</text>`;
    });
    return `${s}</svg>`;
  }

  /* 环形图：2px 表面色间隙分隔扇区 */
  function donut(o) {
    const size = o.size || 160, th = o.thickness || 20;
    const r = (size - th) / 2, c = 2 * Math.PI * r;
    const total = o.items.reduce((a, b) => a + b.v, 0);
    let off = 0;
    let s = `<svg class="chart-svg" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="${o.title || '环形图'}">`;
    s += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" style="stroke:var(--bg-2)" stroke-width="${th}"/>`;
    o.items.forEach((it) => {
      const len = (c * it.v) / total;
      const gap = o.items.length > 1 ? 2 : 0;
      s += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" style="stroke:${it.color}" stroke-width="${th}"
        stroke-dasharray="${Math.max(len - gap, 0)} ${c}" stroke-dashoffset="${-off}" transform="rotate(-90 ${size / 2} ${size / 2})"
        data-tt="${it.name} ${Atlas.fmt(it.v)}（${((it.v / total) * 100).toFixed(1)}%）"/>`;
      off += len;
    });
    if (o.center) {
      s += `<text x="50%" y="${size / 2 - 2}" text-anchor="middle" style="fill:var(--fg);font-size:${size / 7}px;font-weight:700">${o.center.value}</text>`;
      s += `<text x="50%" y="${size / 2 + size / 9}" text-anchor="middle" style="font-size:${size / 14}px">${o.center.label}</text>`;
    }
    return `${s}</svg>`;
  }

  /* 仪表盘：240° 圆弧 */
  function gauge(o) {
    const size = o.size || 180, th = o.thickness || 14;
    const r = (size - th) / 2 - 4, cx = size / 2, cy = size / 2 + 8;
    const start = 150, sweep = 240;
    const pt = (deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
    const arc = (a0, a1) => {
      const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
      return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
    };
    const v = Math.max(0, Math.min(1, o.value / (o.max || 100)));
    let s = `<svg class="chart-svg" viewBox="0 0 ${size} ${size * 0.86}" style="max-width:${size}px" role="img" aria-label="仪表盘">`;
    s += `<path d="${arc(start, start + sweep)}" fill="none" style="stroke:var(--bg-2)" stroke-width="${th}" stroke-linecap="round"/>`;
    s += `<path d="${arc(start, start + sweep * v)}" fill="none" style="stroke:${o.color || 'var(--primary)'}" stroke-width="${th}" stroke-linecap="round" data-tt="${o.label || '完成度'} ${o.value}${o.unit || '%'}"/>`;
    s += `<text x="${cx}" y="${cy + 2}" text-anchor="middle" style="fill:var(--fg);font-size:${size / 5.5}px;font-weight:700">${o.value}<tspan style="font-size:${size / 12}px;fill:var(--fg-3)">${o.unit || '%'}</tspan></text>`;
    s += `<text x="${cx}" y="${cy + size / 7}" text-anchor="middle" style="font-size:${size / 15}px">${o.label || ''}</text>`;
    return `${s}</svg>`;
  }

  /* 雷达图 */
  function radar(o) {
    const size = o.size || 220, cx = size / 2, cy = size / 2, r = size / 2 - 30;
    const n = o.axes.length;
    const pt = (i, f) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      return [cx + r * f * Math.cos(a), cy + r * f * Math.sin(a)];
    };
    let s = `<svg class="chart-svg" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="雷达图">`;
    [0.25, 0.5, 0.75, 1].forEach((f) => {
      s += `<polygon points="${o.axes.map((_, i) => pt(i, f).join(',')).join(' ')}" fill="none" style="stroke:var(--grid)" stroke-width="1"/>`;
    });
    o.axes.forEach((ax, i) => {
      const [x, y] = pt(i, 1);
      const [lx, ly] = pt(i, 1.18);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" style="stroke:var(--grid)" stroke-width="1"/>`;
      s += `<text x="${lx}" y="${ly + 3}" text-anchor="middle">${ax}</text>`;
    });
    o.series.forEach((se) => {
      const pts = se.data.map((v, i) => pt(i, v / 100));
      s += `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" style="fill:${se.color};stroke:${se.color}" fill-opacity=".12" stroke-width="2" stroke-linejoin="round"/>`;
      pts.forEach((p, i) => {
        s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" style="fill:${se.color};stroke:var(--card)" stroke-width="2" data-tt="${se.name} · ${o.axes[i]} ${se.data[i]}"/>`;
      });
    });
    return `${s}</svg>`;
  }

  /* 热力图（单色顺序色阶） */
  function heat(o) {
    const rows = o.rows || 7, cols = o.cols || 24, cell = o.cell || 12, gap = 3;
    const r = Atlas.rand(o.seed || 7);
    const w = cols * (cell + gap), h = rows * (cell + gap);
    const steps = [0, 0.25, 0.45, 0.7, 1];
    const color = o.color || 'var(--s1)';
    let s = `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="热力图">`;
    for (let c = 0; c < cols; c++) {
      for (let k = 0; k < rows; k++) {
        const v = r();
        const lvl = v < 0.25 ? 0 : v < 0.5 ? 1 : v < 0.72 ? 2 : v < 0.9 ? 3 : 4;
        const fill = lvl === 0 ? 'var(--bg-2)' : `color-mix(in srgb, ${color} ${Math.round(steps[lvl] * 100)}%, var(--card))`;
        s += `<rect x="${c * (cell + gap)}" y="${k * (cell + gap)}" width="${cell}" height="${cell}" rx="3" style="fill:${fill}" data-tt="第 ${c + 1} 周 · 周${'一二三四五六日'[k % 7]}　${lvl * 3} 次"/>`;
      }
    }
    return `${s}</svg>`;
  }

  /* 迷你走势图 */
  function spark(o) {
    const w = o.w || 120, h = o.h || 36;
    const min = Math.min(...o.data), max = Math.max(...o.data);
    const pts = o.data.map((v, i) => [(w * i) / (o.data.length - 1), h - 3 - ((h - 6) * (v - min)) / (max - min || 1)]);
    const d = smoothPath(pts);
    let s = `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="height:${h}px">`;
    if (o.area !== false) s += `<path d="${d} L${w},${h} L0,${h} Z" style="fill:${o.color}" fill-opacity=".12"/>`;
    s += `<path d="${d}" fill="none" style="stroke:${o.color}" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
    return `${s}</svg>`;
  }

  /* 散点图 */
  function scatter(o) {
    const w = o.w || 360, h = o.h || 200;
    const pad = { t: 10, r: 10, b: 24, l: 34 };
    let s = `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="散点图">`;
    s += yAxis(w, h, pad, 100, 4);
    o.series.forEach((se) => {
      const r = Atlas.rand(se.seed);
      for (let i = 0; i < (se.n || 26); i++) {
        const x = r() * 100, y = Math.min(98, Math.max(4, x * se.k + se.b + (r() - 0.5) * 34));
        const px = pad.l + ((w - pad.l - pad.r) * x) / 100, py = h - pad.b - ((h - pad.t - pad.b) * y) / 100;
        s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" style="fill:${se.color};stroke:var(--card)" stroke-width="2" fill-opacity=".85" data-tt="${se.name}　x ${x.toFixed(0)} · y ${y.toFixed(0)}"/>`;
      }
    });
    return `${s}</svg>`;
  }

  Atlas.chart = { line, bars, hbars, donut, gauge, radar, heat, spark, scatter, niceMax };
  Atlas.C = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--s5)', 'var(--s6)', 'var(--s7)', 'var(--s8)'];
})();
