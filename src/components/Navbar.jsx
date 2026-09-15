import { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMenu, FiX, FiHome, FiFolder, FiLayers, FiMail, FiChevronRight } from 'react-icons/fi'
import logoPerfil from '../assets/logo-perfil.svg'
import './Navbar.css'

function Navbar() {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 721px)')
    const closeOnDesktop = () => { if (media.matches) dialogRef.current?.close() }
    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [isOpen])

  function openMenu() {
    dialogRef.current.showModal()
    dialogRef.current.querySelector('button').focus({ preventScroll: true })
    setIsOpen(true)
  }

  function closeMenu() {
    dialogRef.current.close()
  }

  return (
    <header className="navbar">
      <a className="navbar__logo" href="#home" aria-label="Inicio">
        <img src={logoPerfil} alt="Lexx Producciones" className="brand-logo" />
      </a>
      <nav className="navbar__menu" aria-label="Navegacion principal">
        <a href="#home">HOME</a>
        <a href="#proyectos">PROYECTOS</a>
        <a href="#servicios">SERVICIOS</a>
        <a href="#contacto">CONTACTO</a>
      </nav>
      <a className="terminal-button navbar__cta" href="#contacto">
        <FaWhatsapp aria-hidden="true" /><span className="button-text">HABLEMOS</span>
      </a>
      <button ref={triggerRef} className="navbar__toggle" type="button" aria-label="Abrir menú" aria-controls="mobile-navigation" aria-expanded={isOpen} onClick={openMenu}><FiMenu aria-hidden="true" /></button>
      <dialog ref={dialogRef} id="mobile-navigation" className="mobile-navigation" aria-label="Menú de navegación" onClose={() => { setIsOpen(false); triggerRef.current?.focus({ preventScroll: true }) }} onClick={event => { if (event.target === event.currentTarget) closeMenu() }}>
        <div className="mobile-navigation__panel">
          <div className="mobile-navigation__header">
            <a href="#home" aria-label="Inicio" onClick={closeMenu}><img src={logoPerfil} alt="Lexx" /></a>
            <button type="button" aria-label="Cerrar menú" onClick={closeMenu}><FiX aria-hidden="true" /></button>
          </div>
          <nav aria-label="Navegación móvil">
            <a href="#home" onClick={closeMenu}><FiHome aria-hidden="true" />HOME</a>
            <a href="#proyectos" onClick={closeMenu}><FiFolder aria-hidden="true" />PROYECTOS</a>
            <a href="#servicios" onClick={closeMenu}><FiLayers aria-hidden="true" />SERVICIOS</a>
            <a href="#contacto" onClick={closeMenu}><FiMail aria-hidden="true" />CONTACTO</a>
          </nav>
          <a href="#contacto" className="terminal-button mobile-navigation__cta" onClick={closeMenu}><FaWhatsapp aria-hidden="true" />HABLEMOS<FiChevronRight aria-hidden="true" /></a>
          <p>IDEAS / CÓDIGO / SOLUCIONES</p>
        </div>
      </dialog>
    </header>
  )
}

export default Navbar
