const segs = [
  { label: "Food", value: 12480, pct: 26 },
  { label: "Shopping", value: 8320, pct: 17 },
  { label: "Transport", value: 6900, pct: 14 },
  { label: "Others", value: 20620, pct: 43 },
];

export default function SpendDonut() {
  const total = 48320;
  const R = 54;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col min-[420px]:flex-row flex-wrap min-[420px]:flex-nowrap items-center gap-4 sm:gap-5 min-w-0 w-full overflow-hidden">
      <svg viewBox="0 0 140 140" className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 max-w-full" role="img" aria-label="Spending split of Rs 48,320">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#E5E5E5" strokeWidth="16" />
        {segs.map((s, i) => {
          const frac = s.pct / 100;
          const dash = frac * C;
          const gap = C - dash;
          const rot = (segs.slice(0, i).reduce((sum, x) => sum + x.pct, 0) / 100) * 360;
          const color = i === 0 ? "#1B4332" : i === 1 ? "#1A1A1A" : i === 2 ? "#6B6B6B" : "#D8D8D8";
          return (
            <circle
              key={s.label}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={color}
              strokeWidth="16"
              strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${-90 + rot} 70 70)`}
            />
          );
        })}
        <text x="70" y="66" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="#1A1A1A">Rs 48k</text>
        <text x="70" y="82" textAnchor="middle" fontSize="10" fill="#6B6B6B">spent</text>
      </svg>
      <ul className="text-xs space-y-1.5 min-w-0 w-full flex-1 overflow-hidden">
        {segs.map((s) => (
          <li key={s.label} className="flex justify-between gap-3 font-mono tabular-nums min-w-0">
            <span className="text-muted truncate min-w-0">{s.label}</span>
            <span className="shrink-0">{s.pct}%</span>
          </li>
        ))}
        <li className="pt-1 border-t border-border font-mono tabular-nums break-all">Total Rs {total.toLocaleString("en-IN")}</li>
      </ul>
    </div>
  );
}
