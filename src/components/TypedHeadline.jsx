import './TypedHeadline.css'

const words = ['DOY', 'VIDA', 'A', 'TUS', 'IDEAS', 'CON', 'TECNOLOGÍA.']

export default function TypedHeadline() {
  return (
    <h1 className="typed-headline" aria-label="Doy vida a tus ideas con tecnología.">
      {words.map((word, wordIndex) => {
        const offset = words.slice(0, wordIndex).join(' ').length + (wordIndex ? 1 : 0)
        return <span aria-hidden="true" className={`typed-word${wordIndex >= 2 && wordIndex <= 4 ? ' typed-word--accent' : ''}`} key={word}>
          {[...word].map((letter, index) => <span className="typed-letter" key={index} style={{ '--letter-delay': `${(offset + index) * 45}ms` }}>{letter}</span>)}
          {wordIndex < words.length - 1 ? '\u00a0' : <b className="headline-cursor" />}
        </span>
      })}
    </h1>
  )
}
