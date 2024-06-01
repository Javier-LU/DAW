/**
 * @module Favoritos
 * @description Definición la pagina de favoritos.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Main from '../components/main/main'

const Simulador: React.FC = (): JSX.Element => {
  return (
    <div id='bodyDiv'>
      <Header activeButton='Configuración' />
      <Main condition='Configuración' />
      <Footer activeButton='Configuración' />
    </div>
  )
}

export default Simulador
