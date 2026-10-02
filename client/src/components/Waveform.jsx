// Deterministic waveform bars — same seed always renders the same shape,
// so every track has a stable visual identity.
export function barsFor(seed, count = 48) {
  let x = seed * 9301 + 49297;
  const bars = [];
  for (let i = 0; i < count; i++) {
    x = (x * 9301 + 49297) % 233280;
    const r = x / 233280;
    // swell in the middle like a real arrangement (intro → drop → outro)
    const envelope = 0.35 + 0.65 * Math.sin((i / count) * Math.PI);
    bars.push(0.12 + r * 0.88 * envelope);
  }
  return bars;
}

export default function Waveform({ seed = 7, progress = 0, count = 48, className = '' }) {
  const bars = barsFor(seed, count);
  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {bars.map((h, i) => {
        const played = i / bars.length <= progress;
        return (
          <span
            key={i}
            style={{ height: `${Math.round(h * 40)}px` }}
            className={`w-[3px] rounded-full ${played ? 'bg-ember' : 'bg-line'}`}
          />
        );
      })}
    </div>
  );
}
