import ContactAttachments from './ContactAttachments'
import { useState } from 'react'
import { FiMessageSquare, FiBriefcase, FiZap, FiUser, FiMail, FiTag, FiSend } from 'react-icons/fi'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [files, setFiles] = useState([])
  const [sending, setSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name').trim()
    const message = data.get('message').trim()
    if (!name || !message) {
      setStatus('Completá tu nombre y mensaje; no pueden contener solo espacios.')
      return
    }
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    if (endpoint) {
      files.forEach(file => data.append('attachments', file, file.name))
      setSending(true)
      setStatus('Enviando mensaje…')
      try {
        const response = await fetch(endpoint, { method: 'POST', body: data, signal: AbortSignal.timeout(30000) })
        const result = await response.json()
        if (!response.ok || result.success !== true) throw new Error('Envío no confirmado')
        setStatus('Mensaje enviado con sus adjuntos.')
        form.reset()
        setFiles([])
      } catch {
        setStatus('No se pudo confirmar el envío. Conservamos tu mensaje y los adjuntos para que puedas reintentar.')
      } finally { setSending(false) }
      return
    }
    if (files.length) {
      setStatus('El envío de adjuntos todavía no está habilitado. Podés enviarlos desde tu correo a lexxdev@gmail.com.')
      return
    }
    const subject = data.get('subject').trim() || `Consulta de ${name}`
    const body = `Nombre: ${name}\nEmail: ${data.get('email')}\n\n${message}`
    window.location.href = `mailto:hola@lexx.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Mensaje preparado. Completá el envío en tu aplicación de correo.')
  }

  return (
    <section id="contacto" className="contact section-shell" aria-labelledby="contact-title">
      <div className="contact__intro">
        <p className="terminal-line">user@lexxdev:~/contacto$</p>
        <h2 id="contact-title">HABLEMOS.<br />CONVIRTAMOS <span>IDEAS EN PROYECTOS.</span></h2>
        <p className="contact__description">Si tenés una idea, un proyecto o simplemente querés charlar sobre tecnología, escribime. Te respondo lo antes posible.</p>
        <ul className="contact__topics">
          <li><FiMessageSquare aria-hidden="true" /><div><h3>Proyectos</h3><p>Ideas, colaboraciones, desarrollo a medida.</p></div></li>
          <li><FiBriefcase aria-hidden="true" /><div><h3>Oportunidades</h3><p>Freelance, trabajo remoto o temporal.</p></div></li>
          <li><FiZap aria-hidden="true" /><div><h3>Consultas</h3><p>Tecnología, stack, ideas, lo que necesites.</p></div></li>
        </ul>
      </div>
      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form-heading"><h3>ENVIAME UN MENSAJE</h3></div>
        <div className="contact__fields">
          <label className="contact__field"><span>Nombre *</span><div><input name="name" autoComplete="name" required maxLength={100} placeholder="Tu nombre" /><FiUser aria-hidden="true" /></div></label>
          <label className="contact__field"><span>Email *</span><div><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="tu@email.com" /><FiMail aria-hidden="true" /></div></label>
          <label className="contact__field contact__field--full"><span>Asunto</span><div><input name="subject" maxLength={150} placeholder="¿En qué te puedo ayudar?" /><FiTag aria-hidden="true" /></div></label>
          <label className="contact__field contact__field--full"><span>Mensaje *</span><textarea name="message" required rows={4} maxLength={3000} placeholder="Contame sobre tu idea…" /></label>
        </div>
        <ContactAttachments files={files} onChange={setFiles} disabled={sending} />
        <div className="contact__actions"><button className="terminal-button" type="submit" disabled={sending}><FiSend aria-hidden="true" />ENVIAR MENSAJE</button></div>
        <p className="contact__status" role="status">{status}</p>
      </form>
    </section>
  )
}
