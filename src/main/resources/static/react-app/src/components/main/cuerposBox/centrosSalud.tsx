/**
 * @module centrosSalud
 * @description Componente funcional que muestra una tabla con datos específicos y funcionalidades de manipulación de datos.
 * @returns {JSX.Element} Elemento JSX que representa el componente Counter.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import '../css/cuerpo.scss'
import '../css/cuepoSmall.scss'
import { useTableData } from '../../datos/funcionesGlobales'
import * as datos from '../../datos/datosGlobales'
import React, { useState, useEffect } from 'react'
import { useEstado } from '../../datos/EstadoContext'
import axiosInstance from '../../datos/apis/axiosInstance'
const Counter: React.FC = () => {
  /**
   * Hook personalizado que proporciona el estado y las funciones para manipular el estado del contexto de Estado.
   * @returns {{
    *   setTable: Function,
    *   setTableID: Function
    * }} Funciones para establecer el estado del contexto de Estado.
    */
  const { setTable, setTableID } = useEstado()

  /**
   * Hook personalizado que proporciona datos y funciones para manejar la tabla.
   * @returns {{
  *   dataCS: Array<Object>,
  *   selectedRows: Array<number>,
  *   handleRowClick: Function
  * }} Datos y funciones para manejar la tabla.
  */
  const {
    dataCS = [],
    selectedRows = [],
    handleRowClick
  } = useTableData('cuerpoCS')

  /**
   * Estado local que almacena los datos de la tabla.
   * @type {Array<Object>}
   */
  const [localData, setLocalData] = useState(dataCS)
  /**
   * Estado local que almacena la configuración de ordenamiento de la tabla.
   * @type {{ key: keyof datos.RowDataCS, direction: 'ascending' | 'descending' } | null}
   */
  const [sortConfig, setSortConfig] = useState<{ key: keyof datos.RowDataCS, direction: 'ascending' | 'descending' } | null>(null)
  /**
   * Estado local que almacena el encabezado seleccionado para ordenamiento.
   * @type {keyof datos.RowDataCS | null}
   */
  const [selectedHeader, setSelectedHeader] = useState<keyof datos.RowDataCS | null>(null)

  useEffect(() => {
    setLocalData(dataCS)
  }, [dataCS])

  /**
   * Función que maneja el cambio de datos en la tabla.
   * @param {number} index - Índice del dato a modificar.
   * @param {keyof datos.RowDataCS} field - Campo del dato a modificar.
   * @param {string | number} value - Nuevo valor para el campo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la actualización.
   */
  const handleInputChange = async (index: number, field: keyof datos.RowDataCS, value: string | number): Promise<void> => {
    const newData = [...localData]
    newData[index][field] = value as never

    setLocalData(newData)

    await sendApi(newData[index])
  }

  /**
   * Función que maneja el ordenamiento de los datos en la tabla.
   * @param {keyof datos.RowDataCS} key - Campo por el cual ordenar los datos.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa el ordenamiento.
   */
  const sortData = async (key: keyof datos.RowDataCS): Promise<void> => {
    let direction: 'ascending' | 'descending' = 'ascending'

    if ((sortConfig != null) && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }

    const sortedData = [...localData].sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })
    setSortConfig({ key, direction })
    setLocalData(sortedData)
    setSelectedHeader(key)
  }

  /**
   * Función que envía los datos actualizados a la API.
   * @param {Object} dataToSend - Datos a enviar a la API.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa el envío de datos.
   */
  const sendApi = async (dataToSend: any): Promise<void> => {
    const data = {
      cs: dataToSend.cs,
      calle: dataToSend.calle,
      telefono: dataToSend.telefono
    }

    const id = dataToSend.id

    try {
      await axiosInstance.put(`CS/update/${id}`, data)
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }
  /**
   * Función que maneja el clic en una fila de la tabla.
   * @param {number} index - Índice de la fila clicada.
   * @param {React.MouseEvent<HTMLTableRowElement>} event - Evento del clic.
   * @param {string} rowId - ID de la fila clicada.
   * @returns {void}
   */
  const humbleClick = (index: number, event: React.MouseEvent<HTMLTableRowElement>, rowId: string): void => {
    if (handleRowClick != null) {
      handleRowClick(index, event)
    }
    setTable('cs')
    setTableID(rowId)
  }

  return (
    <div className='main-container-cuerpo cuerpo-small'>
      <div className='box box-borde cuerpo-small'>
        <table className='custom-table cuerpo-small'>
          <thead>
            <tr>
              <th className={`id ${selectedHeader === 'id' ? 'selected' : ''}`} onClick={async () => await sortData('id')}>id</th>

              <th className={`nombre ${selectedHeader === 'cs' ? 'selected' : ''}`} onClick={async () => await sortData('cs')}>Nombre
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaCS' className={`flecha ${selectedHeader === 'cs' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`calle ${selectedHeader === 'calle' ? 'selected' : ''}`} onClick={async () => await sortData('calle')}>Dirección
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaCalle' className={`flecha ${selectedHeader === 'calle' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`telefono ${selectedHeader === 'telefono' ? 'selected' : ''}`} onClick={async () => await sortData('telefono')}>Telefono
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaTelefono' className={`flecha ${selectedHeader === 'telefono' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {localData.map((row: datos.RowDataCS, index: number) => (
              <tr
                key={index}
                className={selectedRows.includes(row.id) ? 'selected' : ''}
                onClick={(event) => humbleClick(index, event, row.id)}
              >
                <td className='id'>
                  <input key='cs' id='csIDE' className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='cs'>
                  <input className='cs' type='text' value={row.cs} onChange={async (e) => await handleInputChange(index, 'cs', e.target.value)} />
                </td>
                <td className='calle'>
                  <input className='calle' type='text' value={row.calle} onChange={async (e) => await handleInputChange(index, 'calle', e.target.value)} />
                </td>
                <td className='telefono'>
                  <input className='telefono' type='text' value={row.telefono} onChange={async (e) => await handleInputChange(index, 'telefono', e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Counter
