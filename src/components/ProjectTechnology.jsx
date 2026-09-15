import { FaReact, FaCss3Alt } from 'react-icons/fa'
import { SiTypescript, SiDjango } from 'react-icons/si'
import { FiCpu, FiLink } from 'react-icons/fi'
import pythonLogo from '../assets/python.svg'
import viteLogo from '../assets/vite-symbol.svg'

export default function ProjectTechnology({ name }) {
  const icons = {
    React: <FaReact color="#61dafb" />,
    Vite: <img src={viteLogo} alt="" />,
    TypeScript: <SiTypescript color="#3178c6" />,
    CSS: <FaCss3Alt color="#1572b6" />,
    Python: <img src={pythonLogo} alt="" />,
    Django: <SiDjango color="#44b78b" />,
    IA: <FiCpu color="#b79aff" />,
    APIs: <FiLink color="#00e99a" />,
  }
  return <span className="project-technology"><i aria-hidden="true">{icons[name]}</i>{name}</span>
}
