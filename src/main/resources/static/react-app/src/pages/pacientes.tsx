/**
 * @module pacientes
 * @description Componente que representa el pacientes de la aplicación.
 * @returns {JSX.Element} Elemento JSX que contiene la estructura del pacientes.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Main from '../components/main/main'

const Pacientes: React.FC = (): JSX.Element => {
  return (
    <div id='bodyDiv'>
      <Header activeButton='Pacientes' />
      <Main condition='Pacientes' />
      <Footer activeButton='Pacientes' />
    </div>
  )
}

export default Pacientes
