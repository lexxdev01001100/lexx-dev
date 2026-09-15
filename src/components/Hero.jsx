import SkillCircuit from './SkillCircuit'
import HeroCircuitBackground from './HeroCircuitBackground'
import './Hero.css'

import TypedHeadline from './TypedHeadline'



function Hero() {

  return (

    <section id="home" className="hero section-shell">
      <HeroCircuitBackground />
      <div className="hero__copy">

        <p className="terminal-line">user@lexxdev:~/home$</p>



        <TypedHeadline />



        <p className="hero__text">

          Desarrollo aplicaciones, soluciones logísticas, administrativas,

          branding y diseño visual con tecnología, creatividad y proposito.

        </p>



      </div>



      <div className="hero__visual">

        <SkillCircuit />





      </div>

      <ul className="hero__notes" aria-label="Especialidades">

        <li>/Código$</li>

        <li>/Creatividad$</li>

        <li>/Diseño$</li>

        <li>/Rendimiento$</li>

        <li>/Escalabilidad$</li>

      </ul>

    </section>

  )

}



export default Hero

