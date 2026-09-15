import { useEffect, useState } from 'react'

export default function MobileCircuitTraces({ containerRef }) {
  const [layout, setLayout] = useState(null)
  useEffect(() => {
    const container = containerRef.current
    const media = window.matchMedia('(max-width: 600px)')
    function measure() {
      const bounds = container.getBoundingClientRect()
      const relative = element => {
        const box = element.getBoundingClientRect()
        return { x: box.left - bounds.left, y: box.top - bounds.top, width: box.width, height: box.height }
      }
      setLayout({ mobile: media.matches, width: bounds.width, height: bounds.height, chip: relative(container.querySelector('.circuit-chip')), cards: [...container.querySelectorAll('.circuit-category')].map(relative) })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    container.querySelectorAll('.circuit-category').forEach(element => observer.observe(element))
    media.addEventListener('change', measure)
    measure()
    return () => { observer.disconnect(); media.removeEventListener('change', measure) }
  }, [containerRef])
  if (!layout) return null
  const { width, height, chip, cards } = layout
  if (!layout.mobile) {
    return <svg className="circuit-wires" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <g className="circuit-traces">{cards.flatMap((card, index) => {
        const left = card.x < chip.x
        const endX = left ? card.x + card.width : card.x
        return [0, 1].map(branch => {
          const row = Math.floor(index / 2)
          const direction = left ? -1 : 1
          const endY = card.y + card.height * (.38 + branch * .23)
          let d
          if (row === 1) {
            const startX = left ? chip.x - 4 : chip.x + chip.width + 4
            const startY = chip.y + chip.height * (.44 + branch * .24)
            const midX = (startX + endX) / 2
            const bend = Math.min(12, Math.abs(endY-startY))
            d = `M${startX} ${startY} H${midX-direction*bend} L${midX} ${startY+Math.sign(endY-startY)*bend} V${endY} H${endX}`
          } else {
            const upper = row === 0
            const startX = chip.x + chip.width * (left ? .18 + branch * .14 : .82 - branch * .14)
            const startY = upper ? chip.y - 5 : chip.y + chip.height + 5
            const laneX = startX + direction * (16 + branch * 6)
            const turnY = startY + (upper ? -18 : 18)
            const approachY = endY + (upper ? 18 : -18)
            const lastX = laneX + direction * Math.min(18, Math.abs(laneX-endX))
            d = `M${startX} ${startY} V${turnY} L${laneX} ${turnY + (upper ? -16 : 16)} V${approachY} L${lastX} ${endY} H${endX}`
          }
          return <g key={`${index}-${branch}`} opacity={branch ? .45 : 1}>
            <path d={d} />
            <rect x={endX - 2} y={endY - 2} width="4" height="4" fill="#8af1ba" stroke="none" />
          </g>
        })
      })}</g>
    </svg>
  }
  const center = chip.x + chip.width / 2
  return <svg className="mobile-circuit-traces" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
    <g stroke="#00e99a" strokeWidth="1" strokeLinejoin="round">
      {cards.map((card, index) => {
        const left = index % 2 === 0
        const lane = left ? 10 + index * 3 : width - 10 - index * 3
        const startX = left ? chip.x : chip.x + chip.width
        const startY = chip.y + chip.height * (.48 + index * .085)
        const endX = left ? card.x : card.x + card.width
        const endY = card.y + 36
        const bend = left ? lane + 16 : lane - 16
        return <g key={index} opacity={index === 0 ? .9 : .55}>
          <path d={`M${startX} ${startY} H${bend} L${lane} ${startY + 16} V${endY - 16} L${bend} ${endY} H${endX}`} />
          <circle cx={lane} cy={(startY + endY) / 2} r="2" fill="#65ffc2" stroke="none" />
          <rect x={endX - 2} y={endY - 2} width="4" height="4" fill="#5bffac" stroke="none" />
        </g>
      })}
      <path d={`M${center} ${chip.y + chip.height} V${cards[0].y}`} opacity=".8" />
      {[-1, 1].map(side => {
        const endX = side < 0 ? 20 : width - 20
        const endY = 16
        return <g key={side} opacity=".45">
          <path d={`M${center + side * 20} ${chip.y} V${chip.y - 22} L${center + side * 52} ${endY} H${endX}`} />
          <circle cx={endX} cy={endY} r="3" fill="#020b07" />
        </g>
      })}
      {cards.slice(0, -1).map((card, index) => {
        const next = cards[index + 1]
        const right = index % 2 === 0
        const edge = right ? card.x + card.width : card.x
        const nextEdge = right ? next.x + next.width : next.x
        const lane = right ? width - 5 : 5
        const y = card.y + card.height - 22
        const targetY = next.y + next.height - 22
        return <g key={`bridge-${index}`} opacity=".38">
          <path d={`M${edge} ${y} H${lane} V${targetY} H${nextEdge}`} />
          <circle cx={edge} cy={y} r="2" fill="#5bffac" />
          <circle cx={nextEdge} cy={targetY} r="2" fill="#5bffac" />
        </g>
      })}
    </g>
  </svg>
}
