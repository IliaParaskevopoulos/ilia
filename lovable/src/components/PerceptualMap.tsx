import { useMemo, useState } from "react";
import { BRAND, SCORES, VARS, type VarKey } from "@/data/paj";

type Props = {
  players: string[];
  x: VarKey;
  y: VarKey;
  quads?: [string, string, string, string];
  compact?: boolean;
};

type Box = { x0: number; y0: number; x1: number; y1: number };
const hit = (a: Box, b: Box) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

// Perceptual map on a 0–10 grid, quadrants split at 5. Upper-right = better for the customer.
export default function PerceptualMap({ players, x, y, quads, compact = false }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const size = compact ? 320 : 600;
  const pad = compact ? { l: 26, r: 14, t: 14, b: 26 } : { l: 44, r: 24, t: 24, b: 44 };
  const iw = size - pad.l - pad.r;
  const ih = size - pad.t - pad.b;
  const sx = (v: number) => pad.l + (v / 10) * iw;
  const sy = (v: number) => pad.t + ih - (v / 10) * ih;
  const fs = compact ? 11 : 14;
  const rOther = compact ? 5 : 7;
  const rUs = compact ? 7 : 10;

  const pts = useMemo(() => {
    const base = players.map((n) => ({
      n, us: n === "PAJ", label: n === "PAJ" ? "PAJ GPS" : n,
      cx: sx(SCORES[n][x] ?? 0), cy: sy(SCORES[n][y] ?? 0),
      tx: 0, ty: 0, a: "start" as "start" | "end" | "middle",
    }));
    // Place each label at the first candidate spot that clears dots and earlier labels.
    const boxes: Box[] = base.map((p) => ({ x0: p.cx - rUs, y0: p.cy - rUs, x1: p.cx + rUs, y1: p.cy + rUs }));
    for (const p of base) {
      const w = p.label.length * fs * (p.us ? 0.64 : 0.58);
      const h = fs;
      const g = (p.us ? rUs : rOther) + 4;
      const cands: [number, number, "start" | "end" | "middle"][] = [
        [p.cx + g, p.cy + h * 0.35, "start"], [p.cx - g, p.cy + h * 0.35, "end"],
        [p.cx, p.cy - g - 2, "middle"], [p.cx, p.cy + g + h, "middle"],
        [p.cx + g, p.cy - g, "start"], [p.cx - g, p.cy - g, "end"],
      ];
      let placed = false;
      for (const [tx, ty, a] of cands) {
        const x0 = a === "start" ? tx : a === "end" ? tx - w : tx - w / 2;
        const b = { x0, y0: ty - h, x1: x0 + w, y1: ty + 2 };
        if (b.x0 < pad.l || b.x1 > size - 2 || b.y0 < 2 || b.y1 > pad.t + ih) continue;
        if (boxes.some((o) => hit(o, b))) continue;
        boxes.push(b);
        Object.assign(p, { tx, ty, a });
        placed = true;
        break;
      }
      if (!placed) Object.assign(p, { tx: p.cx + g, ty: p.cy + h * 0.35, a: "start" });
    }
    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, x, y, compact]);

  const mx = sx(5);
  const my = sy(5);
  const q = { fontSize: 11, fontWeight: 700, letterSpacing: 1 };
  const ax = { fontSize: compact ? 10 : 12, fontWeight: 600 };
  const hovered = pts.find((p) => p.n === hover);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" role="img"
        aria-label={`${VARS[x]} versus ${VARS[y]}`}>
        <rect x={mx} y={pad.t} width={pad.l + iw - mx} height={my - pad.t} fill={BRAND.orangeTint} />
        <rect x={pad.l} y={pad.t} width={iw} height={ih} fill="none" stroke="#e4e4e4" />
        <line x1={mx} y1={pad.t} x2={mx} y2={pad.t + ih} stroke="#cfcfcf" strokeDasharray="3 3" />
        <line x1={pad.l} y1={my} x2={pad.l + iw} y2={my} stroke="#cfcfcf" strokeDasharray="3 3" />
        {quads && !compact && (
          <g style={q}>
            <text x={pad.l + iw - 8} y={pad.t + 16} textAnchor="end" fill={BRAND.orange}>{quads[0].toUpperCase()}</text>
            <text x={pad.l + 8} y={pad.t + 16} fill="#8a8a8a">{quads[1].toUpperCase()}</text>
            <text x={pad.l + 8} y={pad.t + ih - 8} fill="#8a8a8a">{quads[2].toUpperCase()}</text>
            <text x={pad.l + iw - 8} y={pad.t + ih - 8} textAnchor="end" fill="#8a8a8a">{quads[3].toUpperCase()}</text>
          </g>
        )}
        <text x={pad.l + iw} y={size - (compact ? 8 : 14)} textAnchor="end" fill="#4a4a4a" style={ax}>{VARS[x]} →</text>
        <text x={pad.l} y={size - (compact ? 8 : 14)} fill="#8a8a8a" style={ax}>Low</text>
        <text transform={`translate(${compact ? 12 : 18},${pad.t}) rotate(-90)`} textAnchor="end" fill="#4a4a4a" style={ax}>{VARS[y]} →</text>
        <text transform={`translate(${compact ? 12 : 18},${pad.t + ih}) rotate(-90)`} fill="#8a8a8a" style={ax}>Low</text>
        {[...pts.filter((p) => !p.us), ...pts.filter((p) => p.us)].map((p) => (
          <g key={p.n} onMouseEnter={() => setHover(p.n)} onMouseLeave={() => setHover(null)} className="cursor-default">
            <circle cx={p.cx} cy={p.cy} r={16} fill="transparent" />
            <circle cx={p.cx} cy={p.cy} r={p.us ? rUs : rOther} fill={p.us ? BRAND.orange : "#4a4a4a"} stroke="#fff" strokeWidth={2} />
          </g>
        ))}
        {pts.map((p) => (
          <text key={p.n + "-l"} x={p.tx} y={p.ty} textAnchor={p.a} fontSize={fs} fontWeight={p.us ? 800 : 500} fill="#111" pointerEvents="none">
            {p.label}
          </text>
        ))}
      </svg>
      {hovered && (
        <div className="pointer-events-none absolute rounded-md bg-[#111] px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: `${(hovered.cx / size) * 100}%`, top: `${(hovered.cy / size) * 100}%`, transform: "translate(-50%, calc(-100% - 14px))" }}>
          <div className="font-bold">{hovered.label}</div>
          <div>{VARS[x]}: {SCORES[hovered.n][x]}</div>
          <div>{VARS[y]}: {SCORES[hovered.n][y]}</div>
        </div>
      )}
    </div>
  );
}
