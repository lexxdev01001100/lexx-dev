const traces = [
  'M1040 276H800L650 126H330L250 46H0',
  'M1040 292H784L634 142H314L234 62H0',
  'M1040 344H800L630 514H180L110 584H0',
  'M1040 360H816L646 530H196L142 584',
  'M1056 274V150L966 60H850',
  'M1088 284V180L1180 88H1400',
  'M1088 342H1240L1350 452H1400',
  'M1072 366V440L1186 554H1400',
]

export default function HeroCircuitBackground() {
  return (
    <svg className="hero__circuit-background" viewBox="0 0 1400 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs>
        <pattern id="hero-circuit-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#00ff3c" opacity=".25" /></pattern>
        <linearGradient id="hero-trace-color"><stop stopColor="#00ff3c" stopOpacity=".3" /><stop offset=".42" stopColor="#00ff3c" stopOpacity=".16" /><stop offset=".75" stopColor="#00ffa0" stopOpacity=".4" /><stop offset="1" stopColor="#00ff3c" stopOpacity=".35" /></linearGradient>
      </defs>
      <g stroke="url(#hero-trace-color)" strokeWidth="1">
        {traces.map(d => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}
      </g>
      <g fill="url(#hero-circuit-dots)"><rect x="20" y="20" width="180" height="120" /><rect x="440" y="20" width="140" height="70" /><rect x="540" y="420" width="120" height="160" /><rect x="1320" y="130" width="80" height="160" /></g>
      <g className="hero__circuit-nodes" fill="#00ff78">
        {[[330,126],[180,514],[850,60],[1180,88],[1350,452],[1186,554]].map(([x,y]) => <rect key={`${x}-${y}`} x={x-2} y={y-2} width="4" height="4" rx="1" />)}
      </g>
    </svg>
  )
}
