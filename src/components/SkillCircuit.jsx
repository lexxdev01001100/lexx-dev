import viteLogo from '../assets/vite-symbol.svg'
import MobileCircuitTraces from './MobileCircuitTraces'
import pythonLogo from '../assets/python.svg'
import { createElement, useRef } from 'react'
import logo from '../assets/logo-perfil.svg'
import { techStack } from '../data/techStack'
import './SkillCircuit.css'

const categories = [
  { id: 'frontend', label: 'Frontend', skills: ['JavaScript', 'TypeScript', 'React', 'HTML5', 'Tailwind CSS', 'CSS'] },
  { id: 'backend', label: 'Backend', skills: ['Python', 'Django', 'Node.js', 'REST APIs'] },
  { id: 'data', label: 'Data', skills: ['PostgreSQL'] },
  { id: 'deploy', label: 'Deploy', skills: ['Nginx', 'Gunicorn'] },
  { id: 'tools', label: 'Dev tools', skills: ['Git', 'GitHub', 'Vite'] },
  { id: 'ai', label: 'Inteligencia artificial', skills: ['Codex', 'LLM APIs'] },
]
export default function SkillCircuit() {
  const containerRef = useRef(null)
  return (
    <div ref={containerRef} className="skill-circuit" role="group" aria-label="Tecnologías organizadas por especialidad">
      <MobileCircuitTraces containerRef={containerRef} />
      <div className="circuit-chip" aria-label="Lexx Producciones">
        <span className="chip-pins chip-pins--horizontal" aria-hidden="true" />
        <span className="chip-pins chip-pins--vertical" aria-hidden="true" />
        <div className="chip-core"><img src={logo} alt="" /></div>
      </div>
      {categories.map(category => (
        <section key={category.id} className={`circuit-category circuit-category--${category.id}`} aria-label={category.label}>
          <h2>{category.label}</h2>
          <ul>
            {category.skills.map(name => {
              const tech = techStack.find(item => item.name === name)
              return <li key={name} className={`circuit-skill ${tech.className}`}>
                {['Python', 'Vite'].includes(name) ? <img src={name === 'Python' ? pythonLogo : viteLogo} alt="" /> : createElement(tech.icon, { 'aria-hidden': true })}
                <span>{name}</span>
              </li>
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
