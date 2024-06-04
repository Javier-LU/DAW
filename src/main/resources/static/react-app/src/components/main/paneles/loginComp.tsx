/**
 * @module loginComp
 * @description Componente de formulario de inicio de sesión.
 * Este componente maneja la lógica para enviar credenciales de inicio de sesión al servidor y redirigir al usuario según la respuesta.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario de inicio de sesión.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginForm (): JSX.Element {
  const navigate = useNavigate()
  const navigateTo = (path: string): void => {
    navigate(path)
  }
  const submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const fields = [
      '#name',
      '#password'
    ]

    let valid = true
    fields.forEach((field) => {
      if ($(field).val() === '' || $(field).val() === null) {
        valid = false
        $(field).css('border', '1px solid red')
      } else {
        $(field).css('border', '')
      }
    })

    if (valid) {
      const dataToSend = {
        username: $('#name').val(),
        password: $('#password').val()
      }

      try {
        const response = await axios.post('http://localhost:8070/auth/log-in', dataToSend)

        localStorage.setItem('auth_token', response.data.jwt)
        navigateTo('/pacientes')
      } catch (error) {
        console.error('Error al enviar el formulario:', error)
        // Aquí puedes manejar errores, como mostrar un mensaje al usuario
      }
    }
  }
  const handleSubmit = (event: React.FormEvent): void => {
    submit(event).catch(error => {
      console.error('Error en el submit:', error)
    })
  }

  return (
    <div className='contenedor-login contenedor-login-personalizado'>
      <div className='login  login-shadow'>
        <h2>Bienvenido a ESAD</h2>
        <p>Introduce tu nombre y contraseña</p>
        <form onSubmit={handleSubmit}>
          <div className='form-group form-group-duo-personalizado-login'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' name='name' placeholder='--------' />
          </div>
          <div className='form-group form-group-duo-personalizado-login'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password' placeholder='--------' />
          </div>
          <button className='buttonPanelRed ' type='submit'>Aceptar</button>
        </form>
        <p className='contact-info'>
          Si no recuerda la contraseña póngase en contacto con la administradora o con el servicio técnico (6520147).
        </p>
        <p className='contact-info-red'>
          Para desarrollo: contraseña: rol/nombre/: admin/
        </p>
      </div>
    </div>
  )
}

export default LoginForm
