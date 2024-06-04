/**
 * @module login
 * @description Componente que representa el configuracion de la aplicación.
 * @returns {JSX.Element} Elemento JSX que contiene la estructura del configuracion.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Main from '../components/main/main'

const Configuracion: React.FC = (): JSX.Element => {
  return (
    <div id='bodyDiv'>
      <Header activeButton='Configuración' />
      <Main condition='Configuración' />
      <Footer activeButton='Configuración' />
    </div>
  )
}

export default Configuracion
