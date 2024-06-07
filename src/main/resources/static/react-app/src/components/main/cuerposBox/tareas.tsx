/**
 * @module agregarCSComp
 * @description Componente  para mostrar la tabla de tareas.
 * Este componente muestra una lista de tareas con la información del usuario asociado a cada tarea.
 * Permite cambiar el tipo de tarea y la fecha prevista, así como eliminar tareas.
 * @returns {JSX.Element} Elemento JSX que representa el contador de tareas.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React, { useState } from 'react'
import * as datos from '../../datos/datosGlobales'
import '../css/tareas.scss'
import '../../datos/panelesFlotantes.scss'
import axiosInstance from '../../datos/apis/axiosInstance'
import { useEstado } from '../../datos/EstadoContext'
import loadTareaData from '../../datos/apis/get/loadTareaData'

const Counter: React.FC = () => {
  const [tarea43] = useState<datos.RowDataT[]>(datos.initialDataT)
  const [tar, setTareas] = useState(datos.initialDataTareas)
  const { incrementTriggerTareas } = useEstado()

  const [dataS] = useState<datos.RowDataT[]>(datos.initialDataT)
  /**
   * Normaliza una cadena eliminando espacios y convirtiéndola a minúsculas.
   * @param {string} str - La cadena a normalizar.
   * @returns {string} La cadena normalizada.
   */
  const normalizeString = (str: string): string => {
    return str.replace(/\s+/g, '').toLowerCase()
  }
  /**
   * Obtiene el ID de la tarea basándose en su nombre.
   * @param {string} nombreCentro - El nombre de la tarea.
   * @returns {string | null} El ID de la tarea o null si no se encuentra.
   */
  const getTareaId = (nombreCentro: string): string | null => {
    const centro = dataS.find(c => normalizeString(c.tareas) === normalizeString(nombreCentro))
    return centro
  }
  /**
   * Maneja el cambio en el tipo de tarea o la fecha prevista de una tarea.
   * @param {string} id - El ID de la tarea.
   * @param {string} fecha - La fecha prevista de la tarea.
   * @param {string} tarea - El tipo de tarea.
   * @param {string} idUsuario - El ID del usuario asociado a la tarea.
   * @param {string} field - El campo que ha cambiado ('tarea' o 'fecha').
   * @param {string} value - El nuevo valor del campo.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del cambio.
   */
  const handleTareaChange = async (id: string, fecha: string, tarea: string, idUsuario: string, field: string, value: string): Promise<void> => {
    if (field === 'tarea') {
      tarea = value
    } else if (field === 'fecha') {
      fecha = value
    }

    const tareaID = getTareaId(tarea)

    const transformedData = {
      usuario: {
        id: idUsuario
      },
      fecha,
      tipoTarea: {
        id: tareaID ? tareaID.id : null
      }
    }

    setTareas(prevTareas =>
      prevTareas.map(tarea =>
        tarea.id === id ? { ...tarea, [field]: value } : tarea
      )
    )

    try {
      await axiosInstance.put(`/tareas/update/${id}`, transformedData)
    } catch (error) {
      console.error('Error updating task:', error)
    // Manejo adicional del error, como mostrar un mensaje al usuario
    }
  }
  /**
   * Maneja el evento de eliminación de una tarea.
   * @param {string} id - El ID de la tarea a eliminar.
   * @returns {Promise<void>} Promesa vacía que indica la finalización de la eliminación.
   */
  const handleDelete = async (id: string): Promise<void> => {
    setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id))

    await axiosInstance.delete(`/tareas/delete/${id}`)
    await loadTareaData()
    incrementTriggerTareas()
  }
  /**
   * Formatea una cadena de fecha.
   * @param {string | null | undefined} dateString - La cadena de fecha a formatear.
   * @returns {string} La cadena de fecha formateada.
   */
  const formatDateString = (dateString: string | null | undefined): string => {
    if (dateString === null || dateString === undefined) {
      return ''
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (datePattern.test(dateString)) {
      return dateString
    }
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  /*  <h3 key={tarea.idUsuario}>{tarea.nombre} </h3> */
  return (
    <div>
      {tar.map(tarea => {
        const nomb = `${tarea.nombre.nombre} ${tarea.nombre.primerApellido} ${tarea.nombre.segundoApellido}`

        return (
          <div key={tarea.id} className='counter-container'>
            <div className='counter-content'>
              <div className='pacienteInfo'>
                <h3 key={tarea.idUsuario}>{nomb} </h3>
                <div className='textoP'>
                  <p>Equipo: <span>{tarea.equipo}</span> </p>
                </div>
                <div className='textoP'>
                  <p>Nacimiento: <span>{tarea.nacimiento}</span> </p>
                </div>
                <div className='textoP'>
                  <p>Dirección: <span>{tarea.direccion}</span></p>
                </div>
                <div className='textoP'>
                  <p>Centro de Salud: <span>{tarea.centroSalud}</span> </p>
                </div>
                <div className='textoP'>
                  <p>Teléfono: <span>{tarea.telefono}</span></p>
                </div>
              </div>
              <div className='tareaInfo'>

                <select
                  name='tipo-tarea'
                  id='tipo-tarea'
                  value={tarea.tarea}
                  onChange={async (e) => await handleTareaChange(tarea.id, tarea.fecha, tarea.tarea, tarea.idUsuario, 'tarea', e.target.value)}
                >
                  <option value='' disabled>....</option>
                  {tarea43.map((ta, taIndex) => (
                    <option key={taIndex} value={ta.tareas}>{ta.tareas}</option>
                  ))}

                </select>

                <p className='textoSmall'>Fecha prevista:</p>

                <input
                  type='date'
                  className='textoBig'
                  id='fecha-prevista'
                  name='fecha-prevista'
                  value={formatDateString?.(tarea.fecha)}
                  onChange={async (e) => await handleTareaChange(tarea.id, tarea.fecha, tarea.tarea, tarea.idUsuario, 'fecha', e.target.value)}
                />

              </div>
            </div>
            <button className='delete-button' onClick={async () => await handleDelete(tarea.id)}>
              <svg xmlns='http://www.w3.org/2000/svg' className='svgLogo' fill='currentColor' viewBox='0 0 16 16'>
                <path fillRule='evenodd' d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5' />
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Counter
