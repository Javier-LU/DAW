/**
 * @module agregarNuevoEquipoComp
* @description Componente para crear un nuevo equipo.
 * Este componente maneja la lógica para enviar los datos de un nuevo equipo al servidor y actualizar los datos correspondientes.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario para crear un nuevo equipo.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { useRef, useState } from 'react'
import '../../datos/panelesFlotantes.scss'
import * as datos from '../../datos/datosGlobales'
import $ from 'jquery'
import axiosInstance from '../../datos/apis/axiosInstance'
import { useEstado } from '../../datos/EstadoContext'
import LoadEquipo from '../../datos/apis/get/loadEquipo'

function AgregarTarea (): JSX.Element {
  const [cs] = useState<datos.RowDataCS[]>(datos.initialDataCS)
  const [sanitarios] = useState<datos.RowDataPro[]>(datos.initialDataPro)
  const { incrementConfiVar } = useEstado()
  const [formData, setFormData] = useState({
    centroSalud: 'default',
    nombreGrupo: '',
    medico: 'default',
    enfermero: 'default',
    auxiliar: 'default',
    administrativo: 'default'
  })

  const medicos = sanitarios.filter(persona => persona.profesion.replace(/\s/g, '').toLowerCase() === 'medico')
  const nombresMedicos = medicos.map(medico => ({
    id: medico.id,
    nombreCompleto: `${medico.nombre} ${medico.primerApellido} ${medico.segundoApellido}`
  }))

  const enfermeras = sanitarios.filter(persona => persona.profesion.replace(/\s/g, '').toLowerCase() === 'enfermero')
  const nombresEnfermera = enfermeras.map(enfermera => ({
    id: enfermera.id,
    nombreCompleto: `${enfermera.nombre} ${enfermera.primerApellido} ${enfermera.segundoApellido}`
  }))

  const administrativos = sanitarios.filter(persona => persona.profesion.replace(/\s/g, '').toLowerCase() === 'administrativo')
  const nombresAdministrativo = administrativos.map(administrativo => ({
    id: administrativo.id,
    nombreCompleto: `${administrativo.nombre} ${administrativo.primerApellido} ${administrativo.segundoApellido}`
  }))

  const auxiliares = sanitarios.filter(persona => persona.profesion.replace(/\s/g, '').toLowerCase() === 'auxiliar')
  const nombresAuxiliar = auxiliares.map(auxiliar => ({
    id: auxiliar.id,
    nombreCompleto: `${auxiliar.nombre} ${auxiliar.primerApellido} ${auxiliar.segundoApellido}`
  }))

  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const enmascaramientoSubmit = (event: React.FormEvent): void => {
    submit(event).catch(error => {
      console.error('Error submitting form:', error)
    })
  }

  const submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const fields = [
      '#enfermeroPanel',
      '#medicoPanel',
      '#centroSaludPanel',
      '#nombreGrupoPanel',
      '#auxiliarPanel',
      '#administrativoPanel'
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
      const getCentroSaludId = (nombreCentro: string): string | null => {
        const centro = cs.find(c => c.cs === nombreCentro)
        return (centro != null) ? centro.id : null
      }

      const dataToSend = {
        equipo: formData.nombreGrupo,
        medico: {
          id: formData.medico
        },
        enfermero: {
          id: formData.enfermero
        },
        auxiliar: {
          id: formData.auxiliar
        },
        administrativo: {
          id: formData.administrativo
        },
        centro: {
          id: getCentroSaludId(formData.centroSalud)
        }

      }

      await axiosInstance.post('/equipo/save', dataToSend)
      incrementConfiVar()
      await LoadEquipo()
      closeDialog()
    }
  }

  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarEquipo' className='login-dialog'>
        <div className='login'>
          <h2>Crear un equipo</h2>
          <form onSubmit={enmascaramientoSubmit}>
            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <div className='form-group'>
                  <label htmlFor='nombreGrupo'>Nombre</label>
                  <input
                    type='text'
                    id='nombreGrupoPanel'
                    name='nombreGrupo'
                    placeholder='--------'
                    pattern='[A-Za-z\s]+'
                    title='Solo letras y espacios'
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='centroReferencia'>Centro</label>
                <select
                  name='centroSalud'
                  id='centroSaludPanel'
                  value={formData.centroSalud}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {cs.map((centro, csIndex) => (
                    <option key={csIndex} value={centro.cs}>{centro.cs}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='medico'>Médico/a</label>
                <select
                  name='medico'
                  id='medicoPanel'
                  value={formData.medico}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresMedicos.map(({ id, nombreCompleto }) => (
                    <option key={id} value={id}>{nombreCompleto}</option>
                  ))}
                </select>
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='enfermero'>Enfermero/a</label>
                <select
                  name='enfermero'
                  id='enfermeroPanel'
                  value={formData.enfermero}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresEnfermera.map(({ id, nombreCompleto }) => (
                    <option key={id} value={id}>{nombreCompleto}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='auxiliar'>Auxiliar</label>
                <select
                  name='auxiliar'
                  id='auxiliarPanel'
                  value={formData.auxiliar}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresAuxiliar.map(({ id, nombreCompleto }) => (
                    <option key={id} value={id}>{nombreCompleto}</option>
                  ))}
                </select>
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='administrativo'>Administrativo</label>
                <select
                  name='administrativo'
                  id='administrativoPanel'
                  value={formData.administrativo}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresAdministrativo.map(({ id, nombreCompleto }) => (
                    <option key={id} value={id}>{nombreCompleto}</option>
                  ))}
                </select>
              </div>
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
