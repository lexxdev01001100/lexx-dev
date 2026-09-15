import { services } from '../data/content'

function Services() {
  return (
    <section id="servicios" className="section-block section-shell">
      <div className="section-heading">
        <div>
          <p className="terminal-line">user@lexxdev:~/servicios$</p>
          <h2>SERVICIOS</h2>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-card__icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a href="#contacto">&gt;_ mas info</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
