// A lightweight, animated starfield used as a fixed background behind the app.
// Pure SVG + CSS (no JS at runtime, no images). Rendered on the server.
//
// Star positions are derived from a deterministic pseudo-random function so the
// server and client produce identical markup (no React hydration mismatch).

function rand(seed: number): number {
  const v = Math.sin(seed) * 43758.5453;
  return v - Math.floor(v); // fractional part → stable 0..1 value
}

const STAR_COUNT = 90;

export default function Starfield() {
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
    cx: rand(i + 1) * 100,
    cy: rand(i + 101) * 100,
    r: 0.12 + rand(i + 201) * 0.45,
    delay: rand(i + 301) * 4, // seconds
    duration: 2.5 + rand(i + 401) * 3.5, // seconds
  }));

  return (
    <svg
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="white"
          className="twinkle"
          style={{
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </svg>
  );
}
