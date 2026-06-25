// A pass TIMELINE: the horizontal axis is time (left = rise, right = set), and
// the curve shows the satellite's elevation over the pass. The peak sits at its
// real moment in time (not the centre), and time labels sit under the axis at
// the rise / peak / set points. Pure SVG + HTML — no deps, no extra API calls.
//
// The curve is drawn in an SVG that stretches to full width; the text labels are
// HTML positioned by percentage, so they line up with the axis without the SVG
// stretching the text.

interface PassTimelineProps {
  startUTC: number; // rise (UNIX seconds, UTC)
  maxUTC: number; // peak
  endUTC: number; // set
  maxEl: number; // peak elevation, degrees
  startAzCompass: string; // compass direction at rise
  endAzCompass: string; // compass direction at set
}

// Format a UNIX-seconds timestamp as a local clock time.
function clock(utcSeconds: number): string {
  return new Date(utcSeconds * 1000).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PassTimeline({
  startUTC,
  maxUTC,
  endUTC,
  maxEl,
  startAzCompass,
  endAzCompass,
}: PassTimelineProps) {
  const span = Math.max(endUTC - startUTC, 1);
  // Where the peak falls along the time axis, 0 (rise) → 1 (set).
  const peakFrac = Math.min(Math.max((maxUTC - startUTC) / span, 0), 1);

  // SVG geometry. x = time, y = elevation.
  const W = 300;
  const H = 52;
  const padX = 2;
  const padTop = 8;
  const axisY = 44;
  const usableH = axisY - padTop;
  const elFrac = Math.min(Math.max(maxEl, 0), 90) / 90;

  const startX = padX;
  const endX = W - padX;
  const peakX = startX + peakFrac * (endX - startX);
  const peakY = axisY - elFrac * usableH;

  // Build the curve by sampling a smooth bump that is 0 at the ends and peaks
  // (value 1) exactly at the peak time. Each half is a quarter-sine, so the
  // apex is smooth and the curve never overshoots the time axis.
  const N = 30;
  const points: string[] = [];
  for (let i = 0; i <= N; i++) {
    const frac = i / N;
    const norm =
      frac <= peakFrac
        ? peakFrac === 0
          ? 1
          : Math.sin((frac / peakFrac) * (Math.PI / 2))
        : 1 - peakFrac === 0
          ? 1
          : Math.sin(((1 - frac) / (1 - peakFrac)) * (Math.PI / 2));
    const x = startX + frac * (endX - startX);
    const y = axisY - norm * elFrac * usableH;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const curve = `M ${points.join(" L ")}`;
  const area = `${curve} L ${endX},${axisY} L ${startX},${axisY} Z`;

  // Keep the peak label off the very edges so it can't overlap rise/set.
  const peakLabelLeft = Math.min(Math.max(peakFrac, 0.2), 0.8) * 100;

  return (
    <div className="mt-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-14"
        aria-hidden="true"
      >
        {/* time axis (the horizon) */}
        <line
          x1={startX}
          y1={axisY}
          x2={endX}
          y2={axisY}
          className="stroke-slate-700"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {/* fill under the elevation curve */}
        <path d={area} className="fill-emerald-500/10" />
        {/* elevation curve */}
        <path
          d={curve}
          fill="none"
          className="stroke-emerald-400"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* rise / peak / set markers */}
        <circle cx={startX} cy={axisY} r="2" className="fill-slate-500" vectorEffect="non-scaling-stroke" />
        <circle cx={peakX} cy={peakY} r="2.5" className="fill-emerald-300" vectorEffect="non-scaling-stroke" />
        <circle cx={endX} cy={axisY} r="2" className="fill-slate-500" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Time labels under the axis (real text, positioned along the timeline). */}
      <div className="relative h-9 text-xs">
        <div className="absolute left-0 top-0 text-left">
          <div className="text-slate-300">{clock(startUTC)}</div>
          <div className="text-slate-500">Rise · {startAzCompass}</div>
        </div>
        <div
          className="absolute top-0 -translate-x-1/2 text-center"
          style={{ left: `${peakLabelLeft}%` }}
        >
          <div className="text-emerald-300">{clock(maxUTC)}</div>
          <div className="text-slate-500">Peak {Math.round(maxEl)}°</div>
        </div>
        <div className="absolute right-0 top-0 text-right">
          <div className="text-slate-300">{clock(endUTC)}</div>
          <div className="text-slate-500">Set · {endAzCompass}</div>
        </div>
      </div>
    </div>
  );
}
