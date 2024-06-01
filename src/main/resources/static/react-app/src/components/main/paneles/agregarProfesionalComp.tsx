import { useRef, useEffect, useState } from 'react'
import * as datos from '../../datos/datosGlobales'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'
function AgregarTarea (): JSX.Element {
  const [pro] = useState<datos.RowDataProfe[]>(datos.initialDataProfe)
  const [selectedCualificacion, setSelectedCualificacion] = useState<string>('default')
  const dialogRef = useRef<HTMLDialogElement>(null)

  const cualificacionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCualificacion(e.target.value)
  }

  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }
/*    useEffect(() => {
    if (dialogRef.current != null) {
      dialogRef.current.showModal()
    }
  }, [])  */

  const submit = (event: React.FormEvent): void => {
    event.preventDefault()
            
    const fields = [
      '#cualificacionProPanel',
      '#passwordProPanel',
      '#emailProPanel',
      '#DNIProPanel',
      '#segundoApeProPanel',
      '#primerApeProPanel',
      '#nombreProPanel'

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
        cualificacionId: selectedCualificacion,
        nombre: $('#nombreProPanel').val(),
        primerApellido: $('#primerApeProPanel').val(),
        segundoApellido: $('#segundoApeProPanel').val(),
        DNI: $('#DNIProPanel').val(),
        email: $('#emailProPanel').val(),
        password: $('#passwordProPanel').val()
      }
      console.log('Formulario enviado:', dataToSend)
      closeDialog()
    }
  }


  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarProfesional' className='login-dialog'>

        <div className='login'>
          <h2>Agregar a un profesional</h2>
          <form onSubmit={submit}>

            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='nombrePro'>Nombre</label>
                <input type='text' id='nombreProPanel' name='nombrePro' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='primerApePro'>Primer apellido</label>
                <input type='text' id='primerApeProPanel' name='primerApePro' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
              </div>
            </div>
            
            <div className='form-group-duo '>
              <div className='form-group'>
                <label htmlFor='segundoApePro'>Segundo apellido</label>
                <input type='text' id='segundoApeProPanel' name='segundoApePro' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
              </div>
              <div className='form-group '>
                <label htmlFor='DNIPro'>DNI</label>
                <input type='text' id='DNIProPanel' name='DNIPro' placeholder='--------' pattern='\d{8}[A-Za-z]' title='Formato de DNI: 8 dígitos seguidos de una letra' />
              </div>
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='emailPro'>Email</label>
              <input type='text' id='emailProPanel' name='emailPro' placeholder='--------' pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' title='Introduce un correo electrónico válido' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='passwordPro'>Password</label>
              <input type='tel' id='passwordProPanel' name='passwordPro' placeholder='--------' pattern='\d{10}' title='Debe contener 10 dígitos consecutivos' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='cualificacionPro'>Cualificación</label>

              
              <select
                name='cualificacionPro'
                id='cualificacionProPanel'
                value={selectedCualificacion}
                onChange={cualificacionChange}
              >
                <option value='default' disabled>....</option>
                {pro.map((profesion) => (
                  <option key={profesion.id} value={profesion.id}>{profesion.profesion}</option>
                ))}
              </select>

        


            </div>
            <div className='button-group'>
              <button className='buttonPanelRed botonModificado' type='submit'>Aceptar</button>
              <button className='buttonPanelCancel botonModificado' type='button' onClick={closeDialog}>Cancelar</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default AgregarTarea
