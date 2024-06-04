/**
 * @module agregarProfesionalComp
* @description Componente para agregar un nuevo profesional.
 * Este componente maneja la lógica para enviar los datos de un nuevo profesional al servidor y actualizar los datos correspondientes.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario para agregar un nuevo profesional.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { useRef, useState } from 'react'
import * as datos from '../../datos/datosGlobales'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'
import { useEstado } from '../../datos/EstadoContext'
import axiosInstance from '../../datos/apis/axiosInstance'
import LoadPorfesionales from '../../datos/apis/get/loadPorfesionales'

function AgregarTarea (): JSX.Element {
  const { incrementConfiVar } = useEstado()
  const [pro] = useState<datos.RowDataProfe[]>(datos.initialDataProfe)
  const [selectedCualificacion, setSelectedCualificacion] = useState<string>('default')
  const [parametroS, setSParametro] = useState<string>('default')
  const dialogRef = useRef<HTMLDialogElement>(null)

  const cualificacionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCualificacion(e.target.value)
  }
  const parametro = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSParametro(e.target.selectedOptions[0].text)
  }
  const combinedChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    cualificacionChange(event)
    parametro(event)
  }

  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }

  const enmascaramientoSubmit = (event: React.FormEvent): void => {
    submit(event).catch(error => {
      console.error('Error submitting form:', error)
    })
  }

  const submit = async (event: React.FormEvent): Promise<void> => {
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
      let rol
      const cualificacion = parametroS.toLowerCase().replace(/\s+/g, '')

      const pro = parametroS.toUpperCase().replace(/\s+/g, '')
      if (cualificacion === 'medico' || cualificacion === 'enfermera') {
        rol = 'SANITARY'
      } else if (cualificacion === 'auxiliar') {
        rol = 'MANAGER'
      } else if (cualificacion === 'administrativo') {
        rol = 'ADMINISTRATIVE'
      }

      const dataToSend = {

        nombre: $('#nombreProPanel').val(),
        primerApellido: $('#primerApeProPanel').val(),
        segundoApellido: $('#segundoApeProPanel').val(),
        dni: $('#DNIProPanel').val(),
        password: $('#passwordProPanel').val(),
        email: $('#emailProPanel').val(),
        cualificacion: pro,
        roles: [rol],
        isEnabled: true,
        accountNoExpired: true,
        accountNoLocked: true,
        credentialsNoExpired: true

      }

      await axiosInstance.post('/profesionales/createProfesional', dataToSend)
      await LoadPorfesionales()
      incrementConfiVar()
      closeDialog()
    }
  }

  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarProfesional' className='login-dialog'>

        <div className='login'>
          <h2>Agregar a un profesional</h2>
          <form onSubmit={enmascaramientoSubmit}>

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
              <input type='tel' id='passwordProPanel' name='passwordPro' placeholder='--------' title='Debe contener 10 dígitos consecutivos' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='cualificacionPro'>Cualificación</label>

              <select
                name='cualificacionPro'
                id='cualificacionProPanel'
                value={selectedCualificacion}
                onChange={combinedChange}

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
