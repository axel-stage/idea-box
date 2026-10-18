import "./NeonFlow.css";

type NeonFlowProps = {
  className?: string;
  label?: string;
};

export default function NeonFlow() {
  return (
    <div className={`neon-flow ${className}`}>
      <svg
        className="neon-flow__svg"
        viewBox="0 0 800 600"
        role="img"
        aria-label="Abstract flowing neon energy animation"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient>
            <stop offset="0%" stopColor="#ecfeff" />
            <stop offset="12%" stopColor="#67e8f9" />
            <stop offset="38%" stopColor="#6366f1" stopOpacity=".7" />
            <stop offset="72%" stopColor="#8b5cf6" stopOpacity=".15" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id="ribbonId"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="45%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>

          <filter
            id="glowId"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <path
            id="particlePathId"
            d="M -80 340 C 100 40, 340 40, 440 270 S 690 520, 880 180"
            fill="none"
          />
        </defs>

        {/* Ambient energy field */}
        <circle
          className="neon-flow__ambient"
          cx="400"
          cy="300"
          r="230"
          fill={`url(#coreId)`}
        />

        {/* Background orbital rings */}
        <g className="neon-flow__orbit">
          <ellipse
            cx="400"
            cy="300"
            rx="245"
            ry="95"
            transform="rotate(-28 400 300)"
          />
          <ellipse
            cx="400"
            cy="300"
            rx="200"
            ry="125"
            transform="rotate(48 400 300)"
          />
          <ellipse
            cx="400"
            cy="300"
            rx="275"
            ry="155"
            transform="rotate(12 400 300)"
          />
        </g>

        {/* Flowing energy ribbons */}
        <g
          className="neon-flow__ribbons"
          fill="none"
          stroke={`url(#${ribbonId})`}
          strokeLinecap="round"
        >
          <path
            className="neon-flow__ribbon neon-flow__ribbon--one"
            d="M -40 390 C 110 100, 250 100, 390 290 S 650 480, 850 160"
            strokeWidth="2.5"
          />

          <path
            className="neon-flow__ribbon neon-flow__ribbon--two"
            d="M -30 210 C 150 460, 300 450, 430 260 S 680 100, 850 390"
            strokeWidth="1.5"
          />

          <path
            className="neon-flow__ribbon neon-flow__ribbon--three"
            d="M 20 470 C 170 320, 220 150, 400 190 S 650 390, 790 100"
            strokeWidth="1"
          />
        </g>

        {/* Core and luminous rings */}
        <g className="neon-flow__core">
          <circle
            cx="400"
            cy="300"
            r="112"
            fill={`url(#${coreId})`}
          />

          <circle
            className="neon-flow__core-ring"
            cx="400"
            cy="300"
            r="58"
          />

          <circle
            className="neon-flow__core-ring neon-flow__core-ring--inner"
            cx="400"
            cy="300"
            r="36"
          />

          <circle
            cx="400"
            cy="300"
            r="7"
            fill="#ecfeff"
            filter={`url(#${glowId})`}
          />
        </g>

        {/* Moving particles */}
        <g filter={`url(#${glowId})`}>
          <circle r="3.5" fill="#a5f3fc">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#${particlePathId}`} />
            </animateMotion>
          </circle>

          <circle r="2.5" fill="#c4b5fd">
            <animateMotion
              dur="12s"
              begin="-4s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#${particlePathId}`} />
            </animateMotion>
          </circle>

          <circle r="2" fill="#f0abfc">
            <animateMotion
              dur="15s"
              begin="-8s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#${particlePathId}`} />
            </animateMotion>
          </circle>
        </g>

        {/* Decorative stars */}
        <g className="neon-flow__stars">
          <circle cx="155" cy="180" r="2" />
          <circle cx="610" cy="150" r="1.5" />
          <circle cx="670" cy="390" r="2" />
          <circle cx="245" cy="430" r="1.5" />
          <circle cx="520" cy="470" r="2" />
          <circle cx="335" cy="115" r="1.5" />
          <circle cx="125" cy="335" r="1" />
          <circle cx="700" cy="255" r="1" />
        </g>
      </svg>
    </div>
  );
}
