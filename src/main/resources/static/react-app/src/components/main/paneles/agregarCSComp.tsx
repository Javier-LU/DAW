/**
 * @module agregarCSComp
 * @description Componente para agregar un nuevo Centro de Salud.
 * Este componente maneja la lógica para enviar los datos del nuevo Centro de Salud al servidor y actualizar los datos correspondientes.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario para agregar un nuevo Centro de Salud.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { useRef } from 'react'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'
import { useEstado } from '../../datos/EstadoContext'
import LoadCS from '../../datos/apis/get/loadCS'
import axiosInstance from '../../datos/apis/axiosInstance'

function AgregarTarea (): JSX.Element {
  const { incrementConfiVar } = useEstado()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }
  /**
   * Maneja el envío del formulario y realiza las validaciones necesarias.
   * @param {React.FormEvent} event - Evento del formulario.
   * @returns {void}
   */
  const enmascaramientoSubmit = (event: React.FormEvent): void => {
    submit(event).catch(error => {
      console.error('Error submitting form:', error)
    })
  }
  /**
   * Envía los datos del formulario al servidor.
   * @param {React.FormEvent} event - Evento del formulario.
   * @returns {Promise<void>} Promesa que indica la finalización del envío.
   */
  const submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const fields = [
      '#centroCSPanel',
      '#direccionCSPanel',
      '#telefonoCSPanel'

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
        cs: $('#centroCSPanel').val(),
        calle: $('#direccionCSPanel').val(),
        telefono: $('#telefonoCSPanel').val()
      }

      await axiosInstance.post('/CS/save', dataToSend)
      await LoadCS()
      incrementConfiVar()
      closeDialog()
    }
  }

  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarCS' className='login-dialog'>

        <div className='login'>
          <h2>Agregar un Centro de Salud</h2>
          <form onSubmit={enmascaramientoSubmit}>
            <div className='form-group form-group-individual '>
              <label htmlFor='centroCS'>Centro</label>
              <input type='text' id='centroCSPanel' name='centroCS' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='direccionCS'>Dirección</label>
              <input type='text' id='direccionCSPanel' name='direccionCS' placeholder='--------' pattern='[A-Za-z\s,.-]+' title='Solo letras, espacios y caracteres especiales comunes (coma, punto, guión)' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='telefonoCS'>Telefono</label>
              <input type='tel' id='telefonoCSPanel' name='telefonoCS' placeholder='--------' pattern='\d{10}' title='Debe contener 10 dígitos consecutivos' />
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
