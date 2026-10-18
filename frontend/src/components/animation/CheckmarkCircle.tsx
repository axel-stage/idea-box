export default function CheckmarkCircleSVG() {
  return (
    <svg width="160" height="160" viewBox="0 0 100 100">
      {/* <-- Animated circle --> */}
      <circle
        cx="50" cy="50" r="35"
        fill="none"
        stroke="#22c55e"
        strokeWidth="4"
        strokeDasharray="220"
        strokeDashoffset="220"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="220" to="0"
          dur="1.2s"
          fill="freeze"
        />
      </circle>

      {/* <-- Animated checkmark --> */}
      <path
        d="M30 50 L44 64 L70 36"
        fill="none"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset="60"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="60" to="0"
          begin="0.8s"
          dur="0.6s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}
