import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';

type ScenePhase =
  | 'sitting_working'
  | 'standing_pickup'
  | 'walking_to_coffee'
  | 'brewing_coffee'
  | 'walking_to_desk';

const PHASE_DURATIONS: Record<ScenePhase, number> = {
  sitting_working: 5200,
  standing_pickup: 700,
  walking_to_coffee: 1900,
  brewing_coffee: 3600,
  walking_to_desk: 1900,
};

const PHASE_ORDER: ScenePhase[] = [
  'sitting_working',
  'standing_pickup',
  'walking_to_coffee',
  'brewing_coffee',
  'walking_to_desk',
];

export function DeskIllustration() {
  const { offset, handleMouseMove, handleMouseLeave } = useMouseParallax(6);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASE_ORDER[phaseIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASE_ORDER.length);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const isSitting = phase === 'sitting_working';
  const isBrewing = phase === 'brewing_coffee';
  const isWalkingRight = phase === 'walking_to_coffee';
  const isWalkingLeft = phase === 'walking_to_desk';
  const isStandingAtDesk = phase === 'standing_pickup';

  // Target X position of the standing character group
  const standingTargetX = isStandingAtDesk
    ? 172
    : isWalkingRight || isBrewing
    ? 368
    : 172;

  // Target eye direction for the standing character (+2 looking right at machine, -2 looking left at desk)
  const eyeShiftX = isWalkingLeft ? -2.2 : 2.2;

  return (
    <div
      id="hero-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-lg bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-sm sm:p-md overflow-hidden shadow-xs transition-colors duration-tab-switch"
    >
      <svg
        viewBox="0 0 540 245"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Animated studio illustration where Aygen codes at her desk, walks with her mug to the coffee machine, brews fresh coffee, and returns to her desk"
      >
        {/* 1. BACKGROUND WALL DETAILS (Mouse Parallax) */}
        <g
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.18s ease-out',
          }}
        >
          {/* Left Bookshelf above desk */}
          <rect
            x="28"
            y="46"
            width="78"
            height="6"
            rx="2"
            strokeWidth="1.4"
            className="fill-light-outline dark:fill-dark-outline stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="35"
            y="24"
            width="11"
            height="22"
            rx="1.5"
            strokeWidth="1.4"
            className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="48"
            y="28"
            width="9"
            height="18"
            rx="1.5"
            strokeWidth="1.4"
            className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="59"
            y="21"
            width="12"
            height="25"
            rx="1.5"
            strokeWidth="1.4"
            className="fill-light-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="74"
            y="29"
            width="14"
            height="17"
            rx="1.5"
            transform="rotate(-10 74 29)"
            strokeWidth="1.4"
            className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
          />

          {/* Right Coffee Corner Shelf */}
          <rect
            x="412"
            y="58"
            width="96"
            height="6"
            rx="2"
            strokeWidth="1.4"
            className="fill-light-outline dark:fill-dark-outline stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          {/* Coffee Bean Jar on Shelf */}
          <rect
            x="426"
            y="36"
            width="18"
            height="22"
            rx="3"
            strokeWidth="1.4"
            className="fill-light-surface-container dark:fill-dark-surface stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="424"
            y="33"
            width="22"
            height="4"
            rx="1.5"
            strokeWidth="1.3"
            className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <circle cx="435" cy="47" r="4" className="fill-terracotta/50" />
          {/* Extra Mug on Shelf */}
          <rect
            x="462"
            y="43"
            width="14"
            height="15"
            rx="2.5"
            strokeWidth="1.4"
            className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
          />
        </g>

        {/* 2. HANGING WARM LAMP ABOVE DESK */}
        <g
          style={{
            transform: `translate(${offset.x * 0.35}px, 0px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <ellipse
            className="animate-lamp-glow fill-terracotta"
            cx="196"
            cy="106"
            rx="76"
            ry="62"
            fillOpacity="0.22"
          />
          <line
            x1="196"
            y1="0"
            x2="196"
            y2="42"
            strokeWidth="2"
            className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
          />
          <path
            d="M172 62 C174 44, 218 44, 220 62 Z"
            strokeWidth="1.8"
            className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <circle cx="196" cy="64" r="5" className="fill-terracotta" />
        </g>

        {/* 3. CONTINUOUS FLOOR / BASELINE */}
        <line
          x1="12"
          y1="234"
          x2="528"
          y2="234"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="stroke-light-outline dark:stroke-dark-outline"
        />

        {/* 4. SITTING CHARACTER AT DESK (Visible only during sitting_working) */}
        {isSitting && (
          <g id="female-dev-sitting">
            {/* Chair Back hint */}
            <rect
              x="122"
              y="138"
              width="60"
              height="48"
              rx="10"
              strokeWidth="1.5"
              className="fill-light-surface-muted dark:fill-dark-surface-muted stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            {/* Hair (back) */}
            <path
              d="M128 88 C120 102, 120 128, 128 142 C138 146, 168 146, 176 140 C184 124, 182 96, 172 86 Z"
              strokeWidth="1.6"
              className="fill-light-on-surface dark:fill-dark-surface stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            {/* Sweater / Shoulders */}
            <path
              d="M116 196 C118 164, 132 152, 152 152 C172 152, 186 164, 190 196 Z"
              strokeWidth="1.8"
              className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            {/* Neck */}
            <rect
              x="146"
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
              cx="152"
              cy="116"
              rx="20"
              ry="23"
              fill="#F0D2BF"
              strokeWidth="1.8"
              className="stroke-light-on-surface"
            />
            {/* Hair bangs */}
            <path
              d="M132 112 C133 94, 170 92, 172 112 C166 102, 148 100, 132 112 Z"
              className="fill-light-on-surface dark:fill-dark-surface"
            />
            {/* Glasses & Eyes */}
            <circle
              cx="144"
              cy="117"
              r="5.5"
              strokeWidth="1.4"
              fill="none"
              className="stroke-light-on-surface"
            />
            <circle
              cx="160"
              cy="117"
              r="5.5"
              strokeWidth="1.4"
              fill="none"
              className="stroke-light-on-surface"
            />
            <line
              x1="149.5"
              y1="117"
              x2="154.5"
              y2="117"
              strokeWidth="1.4"
              className="stroke-light-on-surface"
            />
            <circle cx="144" cy="117" r="1.4" className="fill-light-on-surface" />
            <circle cx="160" cy="117" r="1.4" className="fill-light-on-surface" />
            {/* Smile */}
            <path
              d="M147 127 C150 130, 154 130, 157 127"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-light-on-surface"
            />
            {/* Hands typing */}
            <ellipse
              cx="130"
              cy="194"
              rx="8"
              ry="5"
              fill="#F0D2BF"
              strokeWidth="1.5"
              className="stroke-light-on-surface"
            />
            <ellipse
              cx="174"
              cy="194"
              rx="8"
              ry="5"
              fill="#F0D2BF"
              strokeWidth="1.5"
              className="stroke-light-on-surface"
            />
          </g>
        )}

        {/* Empty Chair at Desk when Aygen stands up */}
        {!isSitting && (
          <g id="empty-desk-chair">
            <rect
              x="126"
              y="142"
              width="52"
              height="52"
              rx="10"
              strokeWidth="1.6"
              className="fill-light-surface-muted dark:fill-dark-surface-muted stroke-light-on-surface dark:stroke-dark-on-surface"
            />
          </g>
        )}

        {/* 5. STANDING & WALKING CHARACTER (Visible when getting coffee) */}
        {!isSitting && (
          <motion.g
            id="female-dev-standing"
            initial={{ x: 172, y: 0 }}
            animate={{
              x: standingTargetX,
              y: isWalkingRight || isWalkingLeft ? [0, -4, 0, -4, 0, -4, 0] : 0,
            }}
            transition={{
              x: {
                duration: isStandingAtDesk ? 0.35 : 1.85,
                ease: 'easeInOut',
              },
              y: {
                duration: 1.85,
                ease: 'linear',
              },
            }}
          >
            {/* Walking Legs & Shoes */}
            <motion.line
              x1="-8"
              y1="194"
              x2="-8"
              y2="232"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="stroke-light-on-surface dark:stroke-dark-on-surface"
              animate={{
                x2: isWalkingRight || isWalkingLeft ? [-14, -2, -14, -2, -8] : -8,
              }}
              transition={{ duration: 1.85 }}
            />
            <motion.line
              x1="8"
              y1="194"
              x2="8"
              y2="232"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="stroke-light-on-surface dark:stroke-dark-on-surface"
              animate={{
                x2: isWalkingRight || isWalkingLeft ? [2, 14, 2, 14, 8] : 8,
              }}
              transition={{ duration: 1.85 }}
            />

            {/* Hair (back) */}
            <path
              d="M-22 74 C-30 88, -30 114, -22 128 C-12 132, 18 132, 26 126 C34 110, 32 82, 22 72 Z"
              strokeWidth="1.6"
              className="fill-light-on-surface dark:fill-dark-surface stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            {/* Full Standing Sweater & Skirt/Pants Torso */}
            <path
              d="M-26 196 C-24 152, -16 136, 0 136 C16 136, 24 152, 26 196 Z"
              strokeWidth="1.8"
              className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
            />
            {/* Neck */}
            <rect
              x="-6"
              y="122"
              width="12"
              height="16"
              rx="4"
              fill="#E8C5B0"
              strokeWidth="1.5"
              className="stroke-light-on-surface"
            />
            {/* Face */}
            <ellipse
              cx="0"
              cy="100"
              rx="19"
              ry="22"
              fill="#F0D2BF"
              strokeWidth="1.8"
              className="stroke-light-on-surface"
            />
            {/* Hair bangs */}
            <path
              d="M-19 96 C-18 79, 18 77, 19 96 C14 87, -4 85, -19 96 Z"
              className="fill-light-on-surface dark:fill-dark-surface"
            />
            {/* Glasses & Eyes */}
            <circle
              cx={-7 + eyeShiftX}
              cy="101"
              r="5.2"
              strokeWidth="1.4"
              fill="none"
              className="stroke-light-on-surface"
            />
            <circle
              cx={8 + eyeShiftX}
              cy="101"
              r="5.2"
              strokeWidth="1.4"
              fill="none"
              className="stroke-light-on-surface"
            />
            <line
              x1={-1.8 + eyeShiftX}
              y1="101"
              x2={2.8 + eyeShiftX}
              y2="101"
              strokeWidth="1.4"
              className="stroke-light-on-surface"
            />
            <circle
              cx={-7 + eyeShiftX}
              cy="101"
              r="1.4"
              className="fill-light-on-surface"
            />
            <circle
              cx={8 + eyeShiftX}
              cy="101"
              r="1.4"
              className="fill-light-on-surface"
            />
            {/* Smile */}
            <path
              d="M-4 111 C-1 114, 3 114, 6 111"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-light-on-surface"
            />

            {/* Hand & Held Coffee Mug (Visible while walking or picking up, hidden while mug is under machine) */}
            {!isBrewing && (
              <g transform={isWalkingLeft ? 'translate(-30, 146)' : 'translate(16, 146)'}>
                {/* Steam rising when walking back with fresh coffee */}
                {isWalkingLeft && (
                  <>
                    <path
                      className="animate-steam-1 stroke-terracotta"
                      d="M8 -6 C5 -12, 11 -18, 8 -24"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      className="animate-steam-2 stroke-terracotta"
                      d="M15 -8 C18 -14, 12 -20, 15 -26"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </>
                )}
                {/* Mug in hand */}
                <rect
                  x="0"
                  y="0"
                  width="18"
                  height="20"
                  rx="3.5"
                  strokeWidth="1.5"
                  className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
                />
                <path
                  d="M18 5 C23 5, 23 14, 18 14"
                  strokeWidth="1.5"
                  fill="none"
                  className="stroke-light-on-surface dark:stroke-dark-on-surface"
                />
                {/* Hand holding mug */}
                <ellipse
                  cx="-2"
                  cy="12"
                  rx="6"
                  ry="4.5"
                  fill="#F0D2BF"
                  strokeWidth="1.4"
                  className="stroke-light-on-surface"
                />
              </g>
            )}
          </motion.g>
        )}

        {/* 6. LEFT WORKSPACE DESK & LAPTOP & PLANT */}
        <g id="workspace-desk">
          {/* Desk Surface & Legs */}
          <line
            x1="20"
            y1="198"
            x2="298"
            y2="198"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
          />
          <rect
            x="26"
            y="199"
            width="266"
            height="9"
            rx="2"
            className="fill-light-outline dark:fill-dark-outline"
          />
          <line
            x1="38"
            y1="208"
            x2="38"
            y2="234"
            strokeWidth="2.2"
            className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
          />
          <line
            x1="280"
            y1="208"
            x2="280"
            y2="234"
            strokeWidth="2.2"
            className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
          />

          {/* Laptop on Desk */}
          <path
            d="M116 198 L122 156 C123 153, 125 152, 128 152 L176 152 C179 152, 181 153, 182 156 L188 198 Z"
            strokeWidth="1.8"
            className="fill-light-surface-container dark:fill-dark-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <circle
            cx="152"
            cy="174"
            r="3.2"
            className={isSitting ? 'fill-terracotta animate-pulse' : 'fill-sage'}
          />

          {/* Coffee Mug on Desk (Visible only when Aygen is sitting & working) */}
          {isSitting && (
            <g id="desk-coffee-cup">
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
                width="20"
                height="24"
                rx="4"
                strokeWidth="1.6"
                className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
              />
              <path
                d="M226 180 C233 180, 233 190, 226 190"
                strokeWidth="1.6"
                fill="none"
                className="stroke-light-on-surface dark:stroke-dark-on-surface"
              />
            </g>
          )}

          {/* Potted Plant with Swaying Leaves */}
          <g id="desk-plant">
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

          {/* Stacked Notebooks on Desk */}
          <rect
            x="246"
            y="186"
            width="36"
            height="12"
            rx="2"
            strokeWidth="1.5"
            className="fill-sage stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <rect
            x="250"
            y="177"
            width="30"
            height="9"
            rx="2"
            strokeWidth="1.5"
            className="fill-light-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
          />
        </g>

        {/* 7. RIGHT SIDE COFFEE COUNTER & ESPRESSO MACHINE */}
        <g id="coffee-station">
          {/* Counter Top & Cabinet */}
          <line
            x1="392"
            y1="198"
            x2="520"
            y2="198"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="stroke-light-on-surface dark:stroke-dark-on-surface-muted"
          />
          <rect
            x="398"
            y="199"
            width="116"
            height="35"
            rx="3"
            strokeWidth="1.6"
            className="fill-light-surface-muted dark:fill-dark-surface-muted stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <line
            x1="456"
            y1="199"
            x2="456"
            y2="234"
            strokeWidth="1.4"
            className="stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          <circle cx="448" cy="216" r="2" className="fill-terracotta" />
          <circle cx="464" cy="216" r="2" className="fill-terracotta" />

          {/* Espresso / Coffee Machine Body */}
          <rect
            x="420"
            y="118"
            width="74"
            height="80"
            rx="6"
            strokeWidth="1.8"
            className="fill-light-surface-container dark:fill-dark-surface stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          {/* Machine Top Header Panel */}
          <rect
            x="420"
            y="118"
            width="74"
            height="22"
            rx="5"
            strokeWidth="1.6"
            className="fill-light-primary dark:fill-dark-primary stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          {/* Machine Recess / Brewing Area */}
          <rect
            x="428"
            y="144"
            width="58"
            height="48"
            rx="3"
            strokeWidth="1.4"
            className="fill-light-surface dark:fill-dark-surface-container stroke-light-on-surface dark:stroke-dark-on-surface"
          />
          {/* Power & Brew Status Lights */}
          <circle
            cx="434"
            cy="129"
            r="3.2"
            className={
              isBrewing
                ? 'fill-terracotta animate-ping'
                : 'fill-light-surface-container'
            }
          />
          <circle
            cx="434"
            cy="129"
            r="3.2"
            className={isBrewing ? 'fill-terracotta' : 'fill-sage'}
          />
          {/* Pressure Gauge Dial */}
          <circle
            cx="457"
            cy="129"
            r="6"
            strokeWidth="1.3"
            className="fill-light-surface-container stroke-light-on-surface"
          />
          <line
            x1="457"
            y1="129"
            x2={isBrewing ? '461' : '454'}
            y2="125"
            strokeWidth="1.3"
            className="stroke-terracotta"
          />

          {/* Group Head & Spout */}
          <rect
            x="446"
            y="144"
            width="22"
            height="8"
            rx="2"
            strokeWidth="1.4"
            className="fill-light-on-surface dark:fill-dark-on-surface-muted stroke-light-on-surface"
          />
          <rect
            x="453"
            y="152"
            width="8"
            height="6"
            rx="1"
            className="fill-light-on-surface dark:fill-dark-on-surface"
          />

          {/* Coffee Machine Steam & Flowing Coffee Stream during brewing_coffee */}
          {isBrewing && (
            <g id="active-coffee-brew">
              {/* Machine top steam */}
              <path
                className="animate-steam-1 stroke-terracotta"
                d="M446 112 C443 105, 449 99, 446 92"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                className="animate-steam-2 stroke-terracotta"
                d="M466 110 C469 103, 463 97, 466 90"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              {/* Pouring Hot Coffee Stream from Spout into Mug! */}
              <motion.rect
                x="455.5"
                y="158"
                width="3"
                rx="1.5"
                fill="#6F3E26"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: [0, 16, 16, 0], opacity: [0.3, 1, 1, 0] }}
                transition={{ duration: 3.3, times: [0, 0.15, 0.85, 1] }}
              />

              {/* Mug sitting under coffee spout */}
              <rect
                x="447"
                y="170"
                width="20"
                height="21"
                rx="3.5"
                strokeWidth="1.6"
                className="fill-terracotta stroke-light-on-surface dark:stroke-dark-on-surface"
              />
              <path
                d="M467 175 C473 175, 473 184, 467 184"
                strokeWidth="1.5"
                fill="none"
                className="stroke-light-on-surface dark:stroke-dark-on-surface"
              />
              {/* Rising fresh coffee aroma above mug */}
              <path
                className="animate-steam-1 stroke-terracotta"
                d="M453 166 C451 161, 456 156, 453 151"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
