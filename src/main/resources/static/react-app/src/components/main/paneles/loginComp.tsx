
import { useRef } from 'react'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'

function LoginForm (): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }

  const submit = (event: React.FormEvent): void => {
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
        name: $('#name').val(),
        password: $('#password').val()
      }
      console.log('Formulario enviado:', dataToSend)
      // Aquí puedes añadir la lógica para manejar el envío de datos

      closeDialog()
    }
  }

  return (
    <div className='contenedor-login contenedor-login-personalizado'>
      <div className='login  login-shadow'>
        <h2>Bienvenido a ESAD</h2>
        <p>Introduce tu nombre y contraseña</p>
        <form onSubmit={submit}>
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
