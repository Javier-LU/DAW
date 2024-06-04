/**
 * @module agregarTeraComp
 * @description Componente para agregar una nueva tarea.
 * Este componente maneja la lógica para enviar una nueva tarea al servidor y actualizar los datos correspondientes.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario para agregar una nueva tarea.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { useRef, useState } from 'react'
import '../../datos/panelesFlotantes.scss' // Asegúrate de crear este archivo CSS para el estilo
import * as datos from '../../datos/datosGlobales'
import axiosInstance from '../../datos/apis/axiosInstance'
import { useEstado } from '../../datos/EstadoContext'
import loadTareaData from '../../datos/apis/get/loadTareaData'
import $ from 'jquery'

function AgregarTarea (): JSX.Element {
  const [tarea] = useState<datos.RowDataT[]>(datos.initialDataT)
  const [pacientes] = useState<datos.RowData[]>(datos.initialData)
  let [paciente, setPaciente] = useState('')
  const [tipoTarea, setTipoTarea] = useState('')
  const [fechaPrevista, setFechaPrevista] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { incrementTriggerTareas } = useEstado()
  function eliminarPrimerObjetoSelect (): void {
    const selectElement = document.getElementById('selectPaciente') as HTMLSelectElement
    if (selectElement.options.length > 1) {
      // Obtiene la segunda opción (índice 1)
      const secondOption = selectElement.options[1]

      // Compara el valor de la segunda opción con el valor esperado

      if (secondOption.value === 'defaul') {
        selectElement.remove(0)
      }
    }
  }

  const closeDialog = (): void => {
    eliminarPrimerObjetoSelect()
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }

  const submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const selectElement = document.getElementById('selectPaciente') as HTMLSelectElement
    const firstOptionValue = selectElement.options[0].value

    if (paciente === '') {
      paciente = firstOptionValue
    }

    const selectedPaciente = pacientes.find(p => {
      return p.id.trim().toLowerCase() === paciente.trim().toLowerCase()
    })

    const selectedTarea = tarea.find(t => {
      return t.tareas.trim().toLowerCase() === tipoTarea.trim().toLowerCase()
    })
    const formData = {
      pacienteId: selectedPaciente?.id,
      tareaId: selectedTarea?.id,
      fechaPrevista
    }

    const fields = [
      '#selectPaciente',
      '#tipo-tarea',
      '#fecha-prevista'

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
      const transformedData = {
        usuario: {
          id: formData.pacienteId
        },
        fecha: formData.fechaPrevista,
        tipoTarea: {
          id: formData.tareaId
        }
      }

      await axiosInstance.post('/tareas/save', transformedData)
      await loadTareaData()
      incrementTriggerTareas()
      closeDialog()
    }
  }

  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarTarea' className='login-dialog'>
        <div className='login'>
          <h2>Añadir tarea</h2>
          <form onSubmit={submit}>
            <div className='form-group form-group-individual '>

              <label htmlFor='paciente'>Paciente</label>
              <select
                name='paciente'
                id='selectPaciente'
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
              >
                <option value='defaul' disabled>........</option>
                {pacientes.map((paciente: datos.RowData) => (
                  <option key={paciente.id} value={paciente.id}>
                    {`${paciente.nombre} ${paciente.primerApellido} ${paciente.segundoApellido}`}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group form-group-individual '>
              <label htmlFor='tipo-tarea'>Tipo de tarea</label>
              <select
                name='tipo-tarea'
                id='tipo-tarea'
                value={tipoTarea}
                onChange={(e) => setTipoTarea(e.target.value)}
              >
                <option value='' disabled>....</option>
                {tarea.map((ta, taIndex) => (
                  <option key={taIndex} value={ta.tareas}>{ta.tareas}</option>
                ))}
              </select>
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='fecha-prevista'>Fecha prevista</label>
              <input
                type='date'
                id='fecha-prevista'
                name='fecha-prevista'
                value={fechaPrevista}
                onChange={(e) => setFechaPrevista(e.target.value)}
              />
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
