import { useState } from 'react';
import { useMouseParallax } from '../../hooks/useMouseParallax';

export function DeskIllustration() {
  const { offset, handleMouseMove, handleMouseLeave } = useMouseParallax(7);
  const [lampBoost, setLampBoost] = useState(false);

  return (
    <div
      id="hero-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setLampBoost((prev) => !prev)}
      title="Move cursor for parallax · Click to toggle lamp brightness"
      className="relative w-full max-w-[300px] cursor-pointer select-none rounded-lg bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md overflow-hidden shadow-xs transition-colors duration-tab-switch"
    >
      <svg
        viewBox="0 0 320 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Editorial illustration of Aygen working at her desk with a laptop, coffee cup, plants, books, and a warm hanging lamp"
      >
        {/* Hanging Lamp Layer (Subtle Parallax) */}
        <g
          style={{
            transform: `translate(${offset.x * 0.4}px, 0px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Hanging Lamp Warm Glow */}
          <ellipse
            className="animate-lamp-glow fill-terracotta"
            cx="226"
            cy="108"
            rx={lampBoost ? '84' : '68'}
            ry={lampBoost ? '72' : '58'}
            fillOpacity={lampBoost ? '0.36' : '0.22'}
          />
          {/* Hanging Lamp Cord & Shade */}
          <line
            x1="226"
            y1="0"
            x2="226"
            y2="42"
            strokeWidth="2"
            className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
          />
          <path
            d="M202 62 C204 44, 248 44, 250 62 Z"
            strokeWidth="1.8"
            className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <circle
            cx="226"
            cy="64"
            r="5"
            className={lampBoost ? 'fill-terracotta' : 'fill-light-surface-container'}
          />
        </g>

        {/* Bookshelf / Floating Wall Detail (Mouse Parallax Layer) */}
        <g
          id="parallax-books"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.18s ease-out',
          }}
        >
          <rect
            x="28"
            y="42"
            width="68"
            height="6"
            rx="2"
            strokeWidth="1.4"
            className="fill-light-outline dark:fill-dark-outline stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="34"
            y="20"
            width="11"
            height="22"
            rx="1.5"
            strokeWidth="1.4"
            className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="47"
            y="24"
            width="9"
            height="18"
            rx="1.5"
            strokeWidth="1.4"
            className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="58"
            y="18"
            width="12"
            height="24"
            rx="1.5"
            strokeWidth="1.4"
            className="fill-light-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="72"
            y="26"
            width="14"
            height="16"
            rx="1.5"
            transform="rotate(-10 72 26)"
            strokeWidth="1.4"
            className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
          />
        </g>

        {/* Female Developer Character at Desk */}
        <g
          id="female-dev"
          style={{
            transform: `translate(${offset.x * -0.25}px, ${offset.y * -0.2}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Hair (back) */}
          <path
            d="M126 88 C118 102, 118 128, 126 142 C136 146, 166 146, 174 140 C182 124, 180 96, 170 86 Z"
            strokeWidth="1.6"
            className="fill-light-on-surface dark:fill-dark-surface stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          {/* Sweater / Shoulders */}
          <path
            d="M114 196 C116 164, 130 152, 150 152 C170 152, 184 164, 188 196 Z"
            strokeWidth="1.8"
            className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          {/* Neck */}
          <rect
            x="144"
            y="138"
            width="12"
            height="16"
            rx="4"
            fill="#E8C5B0"
            strokeWidth="1.5"
            className="stroke-light-on-surface"
          />
          {/* Face */}
          <ellipse
            cx="150"
            cy="116"
            rx="20"
            ry="23"
            fill="#F0D2BF"
            strokeWidth="1.8"
            className="stroke-light-on-surface"
          />
          {/* Hair bangs / framing */}
          <path
            d="M130 112 C131 94, 168 92, 170 112 C164 102, 146 100, 130 112 Z"
            className="fill-light-on-surface dark:fill-dark-surface"
          />
          {/* Glasses & Gentle Eyes */}
          <circle
            cx="142"
            cy="117"
            r="5.5"
            strokeWidth="1.4"
            fill="none"
            className="stroke-light-on-surface"
          />
          <circle
            cx="158"
            cy="117"
            r="5.5"
            strokeWidth="1.4"
            fill="none"
            className="stroke-light-on-surface"
          />
          <line
            x1="147.5"
            y1="117"
            x2="152.5"
            y2="117"
            strokeWidth="1.4"
            className="stroke-light-on-surface"
          />
          <circle cx="142" cy="117" r="1.4" className="fill-light-on-surface" />
          <circle cx="158" cy="117" r="1.4" className="fill-light-on-surface" />
          {/* Soft Smile */}
          <path
            d="M145 127 C148 130, 152 130, 155 127"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="stroke-light-on-surface"
          />
          {/* Hands typing */}
          <ellipse
            cx="128"
            cy="194"
            rx="8"
            ry="5"
            fill="#F0D2BF"
            strokeWidth="1.5"
            className="stroke-light-on-surface"
          />
          <ellipse
            cx="172"
            cy="194"
            rx="8"
            ry="5"
            fill="#F0D2BF"
            strokeWidth="1.5"
            className="stroke-light-on-surface"
          />
        </g>

        {/* Desk Surface */}
        <line
          x1="18"
          y1="198"
          x2="302"
          y2="198"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
        />
        <rect
          x="24"
          y="199"
          width="272"
          height="10"
          rx="2"
          className="fill-light-outline dark:fill-dark-outline"
        />

        {/* Laptop */}
        <path
          d="M114 198 L120 156 C121 153, 123 152, 126 152 L174 152 C177 152, 179 153, 180 156 L186 198 Z"
          strokeWidth="1.8"
          className="fill-light-surface-container dark:fill-dark-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
        />
        <circle cx="150" cy="174" r="3" className="fill-terracotta" />

        {/* Coffee Cup + Animated Steam */}
        <g id="coffee-cup">
          <path
            className="animate-steam-1 stroke-light-on-surface-muted dark:stroke-dark-on-surface-muted"
            d="M214 166 C211 160, 217 154, 214 148"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            className="animate-steam-2 stroke-light-on-surface-muted dark:stroke-dark-on-surface-muted"
            d="M222 164 C225 158, 219 152, 222 146"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="206"
            y="174"
            width="22"
            height="24"
            rx="4"
            strokeWidth="1.6"
            className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <path
            d="M228 180 C235 180, 235 190, 228 190"
            strokeWidth="1.6"
            fill="none"
            className="stroke-light-on-surface dark:stroke-dark-on-surface"
          />
        </g>

        {/* Small Potted Plant with Swaying Leaves */}
        <g
          id="parallax-plant"
          style={{
            transform: `translate(${offset.x * -0.55}px, ${offset.y * -0.35}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <path
            d="M46 198 L50 176 L72 176 L76 198 Z"
            strokeWidth="1.6"
            className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <g className="animate-leaf">
            <path
              d="M61 176 C58 160, 44 152, 42 142 C52 144, 60 156, 61 176 Z"
              strokeWidth="1.4"
              className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            <path
              d="M61 176 C65 156, 76 148, 82 140 C74 152, 66 164, 61 176 Z"
              strokeWidth="1.4"
              className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            <path
              d="M61 176 C60 156, 60 142, 62 132 C66 144, 64 160, 61 176 Z"
              strokeWidth="1.4"
              className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
            />
          </g>
        </g>

        {/* Stacked Notebook & Pen on Desk */}
        <rect
          x="246"
          y="186"
          width="38"
          height="12"
          rx="2"
          strokeWidth="1.5"
          className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
        />
        <rect
          x="250"
          y="177"
          width="32"
          height="9"
          rx="2"
          strokeWidth="1.5"
          className="fill-light-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
        />
      </svg>

      <div className="mt-1 flex items-center justify-between font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
        <span>☕ Living workspace</span>
        <span>{lampBoost ? '💡 Lamp: Cozy Bright' : '💡 Tap lamp to glow'}</span>
      </div>
    </div>
  );
}
