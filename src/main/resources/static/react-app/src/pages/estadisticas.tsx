/**
 * @module login
 * @description Componente que representa el estadisticas de la aplicación.
 * @returns {JSX.Element} Elemento JSX que contiene la estructura del estadisticas.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Main from '../components/main/main'

const Estadisticas: React.FC = (): JSX.Element => {
  return (
    <div id='bodyDiv'>
      <Header activeButton='Estadisticas' />
      <Main condition='Estadisticas' />
      <Footer activeButton='Estadisticas' />
    </div>
  )
}

export default Estadisticas
