export function Botanical({ className, showDot = true }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      className={className}
      style={{ color: "#9A5368" }}
      aria-hidden
    >
      <path
        d="M8 8c14 2 30 10 38 24 6 11 6 24-2 32-7 7-19 6-24-2-4-7-2-16 6-19"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 8c2 18 10 36 26 46 12 8 27 9 36 1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {showDot && <circle cx="46" cy="34" r="2.5" fill="currentColor" />}
    </svg>
  );
}
