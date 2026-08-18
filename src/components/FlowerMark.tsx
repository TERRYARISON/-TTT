/**
 * 花形标志 — six-petal flower mark, hairline strokes,
 * champagne-gold core. Used in nav, preloader, footer.
 */
export default function FlowerMark({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.1">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse
            key={r}
            cx="24"
            cy="13.5"
            rx="4.4"
            ry="8.5"
            transform={`rotate(${r} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="2.4" stroke="#D8C08F" strokeWidth="1.1" />
    </svg>
  );
}
