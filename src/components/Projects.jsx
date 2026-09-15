import './Projects.css'
import ProjectTechnology from './ProjectTechnology'
import { createElement, useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight, FiChevronRight, FiCode, FiCpu, FiGrid, FiLayers, FiUsers, FiX } from 'react-icons/fi'
import { projectSlots } from '../data/content'
import frameHero from '../assets/projects/frame-hero.png'
import lexxcoreOffice from '../assets/projects/lexxcore-office.png'


const projectImages = {
  frame: frameHero,
  lexxcore: lexxcoreOffice,
}

const detailData = {
  frame: {
    eyebrow: 'Presentación interactiva de productos y experiencia digital.',
    title: 'FRAME',
    description: 'Frame es una experiencia web diseñada para transformar un catálogo de productos en una interfaz visual e interactiva. El proyecto combina comercio digital, diseño inspirado en relojería mecánica y una navegación construida alrededor de un reloj monumental compuesto por engranajes, gemas y mecanismos animados.',
    image: frameHero,
    imageAlt: 'Interfaz principal de Frame con mecanismo de relojería y accesos al catálogo, contacto y carrito',
    meta: [
      ['ROL', 'Design & Development'],
      ['TIPO', 'Web Application'],
      ['ESTADO', 'Producción'],
      ['AÑO', '2026'],
    ],
    features: [
      [FiLayers, 'EXPERIENCIA INMERSIVA', 'Navegación inspirada en relojería mecánica.'],
      [FiGrid, 'CATÁLOGO DINÁMICO', 'Arquitectura preparada para productos y búsqueda.'],
      [FiCode, 'DISEÑO A MEDIDA', 'Interfaz construida desde cero alrededor de la identidad visual.'],
      [FiCpu, 'LISTO PARA ESCALAR', 'Componentes reutilizables y estructura modular.'],
    ],
    visitLabel: 'VISITAR FRAME',
    liveUrl: null,
    repositoryUrl: null,
  },
  lexxcore: {
    eyebrow: 'Miniverse Agents Platform',
    title: 'LEXXCORE — MINIVERSE',
    description: 'LexxCore es una plataforma de agentes IA diseñada para automatizar tareas y coordinar especialistas dentro de un espacio de trabajo visual. Miniverse convierte la arquitectura multiagente en una oficina interactiva: cada agente ocupa un rol, colabora con otros y puede integrarse con herramientas, modelos y APIs.',
    image: lexxcoreOffice,
    imageAlt: 'Oficina pixel art de LexxCore con departamentos y agentes especializados',

    meta: [
      ['ROL', 'Product & Development'],
      ['TIPO', 'AI Agent Platform'],
      ['ESTADO', 'Por confirmar'],
      ['AÑO', '2026'],
    ],
    features: [
      [FiUsers, 'EJÉRCITO DE AGENTES', 'Especialistas coordinados por rol y proyecto.'],
      [FiCpu, 'AUTOMATIZACIÓN REAL', 'Modelos, APIs y herramientas conectadas al flujo.'],
      [FiGrid, 'OFICINA INTERACTIVA', 'Miniverse convierte los agentes en un entorno visual.'],
      [FiLayers, 'ESCALABLE Y MODULAR', 'Arquitectura preparada para múltiples proyectos.'],
    ],
    visitLabel: 'VISITAR LEXXCORE',
    liveUrl: null,
    repositoryUrl: null,
  },
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const detailRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (!activeProject) return
    detailRef.current?.focus({ preventScroll: true })
    detailRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }, [activeProject])

  function closeProject() {
    setActiveProject(null)
    openerRef.current?.focus({ preventScroll: true })
    document.getElementById('proyectos')?.scrollIntoView({ block: 'start' })
  }

  function openProject(id) {
    if (!detailData[id]) return
    setActiveProject(id)

  }

  const detail = activeProject ? detailData[activeProject] : null

  return (
    <>
      <section id="proyectos" className="section-block section-shell projects-section">
        <div className="section-heading projects-heading">
          <div>
            <p className="terminal-line">user@lexxdev:~/proyectos$</p>
            <h2>PROYECTOS DESTACADOS</h2>
          </div>
        </div>

        <div className="projects-grid">
          {projectSlots.map((project, index) => (
            <article className={`project-card ${project.disabled ? 'project-card--disabled' : ''}`} key={project.id}>
              <div
                className={`project-card__image project-card__image--${project.image}`}
                style={projectImages[project.image] ? { backgroundImage: `linear-gradient(180deg, transparent 48%, rgba(0,0,0,.34)), url(${projectImages[project.image]})` } : undefined}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="project-card__content">
                <p className="tag">{project.disabled ? 'SLOT RESERVADO' : project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {project.stack.length > 0 && (
                  <div className="project-stack" aria-label={`Tecnologías de ${project.title}`}>
                    {project.stack.map(item => <ProjectTechnology key={item} name={item} />)}
                  </div>
                )}

                {!project.disabled && (
                  <button className="project-open" type="button" aria-expanded={activeProject === project.id} aria-controls={activeProject === project.id ? `proyecto-${project.id}` : undefined} onClick={event => { openerRef.current = event.currentTarget; openProject(project.id) }}>
                    VER PROYECTO <FiChevronRight aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {detail && (
        <section tabIndex={-1} aria-label={`Detalle de ${detail.title}`} ref={detailRef} className="project-detail section-shell" id={`proyecto-${activeProject}`}>
          <button className="project-detail__close" type="button" onClick={closeProject} aria-label="Cerrar detalle del proyecto">
            <FiX aria-hidden="true" />
          </button>

          <div className="project-detail__main">
            <div className="project-detail__copy">
              <p className="terminal-line">user@lexxdev:~/proyectos/{activeProject}$</p>
              <h2>{detail.title}</h2>
              <p className="project-detail__eyebrow">{detail.eyebrow}</p>
              <div className="project-detail__rule" />
              <p className="project-detail__description">{detail.description}</p>

              <div className="project-detail__meta">
                {detail.meta.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="project-detail__actions">
                {detail.liveUrl ? <a className="project-action project-action--primary" href={detail.liveUrl} target="_blank" rel="noreferrer">{detail.visitLabel}<FiArrowUpRight aria-hidden="true" /></a> : <button className="project-action project-action--primary" type="button" disabled title="URL pendiente">{detail.visitLabel}<FiArrowUpRight aria-hidden="true" /></button>}
                {detail.repositoryUrl ? <a className="project-action project-action--secondary" href={detail.repositoryUrl} target="_blank" rel="noreferrer">VER CÓDIGO<FaGithub aria-hidden="true" /></a> : <button className="project-action project-action--secondary" type="button" disabled title="Repositorio pendiente">VER CÓDIGO<FaGithub aria-hidden="true" /></button>}
              </div>
            </div>

            <div className="project-detail__visual">
              <img src={detail.image} alt={detail.imageAlt} />

            </div>
          </div>

          <div className="project-features">
            {detail.features.map(([Icon, title, text]) => (
              <article key={title}>
                <div className="project-feature__icon">{createElement(Icon, { 'aria-hidden': true })}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default Projects
