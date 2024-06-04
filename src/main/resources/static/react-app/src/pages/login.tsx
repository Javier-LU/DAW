/**
 * @module login
 * @description Componente que representa el loginPage de la aplicación.
 * @returns {JSX.Element} Elemento JSX que contiene la estructura del loginPage.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import Login from '../components/main/paneles/loginComp'

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <div id='bodyDiv bodyDiv-login'>

      <Login />

    </div>
  )
}

export default LoginPage
