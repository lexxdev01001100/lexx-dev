import logoPortada from '../assets/logo-portada.svg'
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img
          src={logoPortada}
          alt="Lexx"
          className="footer-logo"
        />
      </div>

      <div className="footer__social">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <FaGithub />
          <span>GitHub</span>
        </a>

        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedin />
          <span>LinkedIn</span>
        </a>

        <a href="mailto:lexxdev@gmail.com">
          <FaEnvelope />
          <span>lexxdev@gmail.com</span>
        </a>

        <a href="https://wa.me/541112345678" target="_blank" rel="noreferrer">
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>

        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
          <span>Instagram</span>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
          <span>Facebook</span>
        </a>
      </div>
      <p className="footer__copyright">
        <span>© 2026 Lucas Villar // LexxDev</span>{' '}
        <span className="footer__description">Programación y diseño de software</span>
      </p>
    </footer>
  )
}

export default Footer
