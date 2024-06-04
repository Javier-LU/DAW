/**
 * @module profesionales
 * @description Componente  para mostrar la tabla de profesionales.
 * Este componente muestra una tabla de profesionales con sus datos, incluyendo nombre, apellidos, DNI,
 * profesión, correo electrónico, teléfono y contraseña. Permite editar los datos de los profesionales,
 * seleccionar una profesión de un menú desplegable y ordenar la tabla por columnas.
 * @returns {JSX.Element} Elemento JSX que representa el contador para profesionales.
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
  const { setTable, setTableID } = useEstado()

  const {
    dataPr = [],
    selectedRows = [],
    handleRowClick
  } = useTableData('cuerpoPro')
  const [pro] = useState<datos.RowDataProfe[]>(datos.initialDataProfe)
  const [localData, setLocalData] = useState(dataPr)
  const [sortConfig, setSortConfig] = useState<{ key: keyof datos.RowDataPro, direction: 'ascending' | 'descending' } | null>(null)
  const [selectedHeader, setSelectedHeader] = useState<keyof datos.RowDataPro | null>(null)

  useEffect(() => {
    setLocalData(dataPr)
  }, [dataPr])
  /**
   * Función asíncrona para enviar datos actualizados a la API.
   * @param {Object} dataToSend - Los datos a enviar.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del envío.
   */
  const sendApi = async (dataToSend: any): Promise<void> => {
    let rol
    const cualificacion = dataToSend.profesion.toLowerCase().replace(/\s+/g, '')

    const pro = dataToSend.profesion.toUpperCase().replace(/\s+/g, '')
    if (cualificacion === 'medico' || cualificacion === 'enfermero') {
      rol = 'SANITARY'
    } else if (cualificacion === 'auxiliar') {
      rol = 'MANAGER'
    } else if (cualificacion === 'administrativo') {
      rol = 'ADMINISTRATIVE'
    }
    let password2
    if (dataToSend.password === '........') {
      password2 = '1234'
    } else {
      password2 = dataToSend.password
    }

    const data = {

      nombre: dataToSend.nombre,
      primerApellido: dataToSend.primerApellido,
      segundoApellido: dataToSend.segundoApellido,
      dni: dataToSend.dni,
      password: password2,
      email: dataToSend.email,
      cualificacion: pro,
      roles: [rol],
      isEnabled: true,
      accountNoExpired: true,
      accountNoLocked: true,
      credentialsNoExpired: true
    }
    const id = dataToSend.id
    try {
      await axiosInstance.put(`/profesionales/update/${id}`, data)
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }
  /**
   * Maneja el cambio de selección en el menú desplegable de profesiones.
   * @param {number} index - El índice del profesional.
   * @param {string} value - El nuevo valor de la profesión.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del cambio.
   */
  const handleSelectChange = async (index: number, value: string): Promise<void> => {
    const newData = [...localData]
    newData[index].profesion = value
    setLocalData(newData)
    const updatedRow = getRowData(index, newData)

    await sendApi(updatedRow)
  }
  /**
   * Maneja el cambio de entrada en los campos de entrada.
   * @param {number} index - El índice del profesional.
   * @param {string} field - El campo que ha cambiado.
   * @param {string | number} value - El nuevo valor del campo.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del cambio.
   */
  const handleInputChange = async (index: number, field: keyof datos.RowDataPro, value: string | number): Promise<void> => {
    const newData = [...localData]
    newData[index][field] = value as never
    setLocalData(newData)
    const updatedRow = getRowData(index, newData)

    await sendApi(updatedRow)
  }
  /**
   * Obtiene los datos de una fila específica.
   * @param {number} index - El índice de la fila.
   * @param {datos.RowDataPro[]} data - Los datos de la fila.
   * @returns {datos.RowDataPro} Los datos de la fila especificada.
   */
  const getRowData = (index: number, data: datos.RowDataPro[]): datos.RowDataPro => {
    return data[index]
  }
  /**
   * Ordena los datos en función de la clave especificada.
   * @param {keyof datos.RowDataPro} key - La clave por la que se va a ordenar.
   * @returns {void}
   */
  const sortData = (key: keyof datos.RowDataPro): void => {
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
   * Maneja el clic en una fila de la tabla.
   * @param {number} index - El índice de la fila.
   * @param {React.MouseEvent<HTMLTableRowElement>} event - El evento de clic.
   * @param {string} rowId - El ID de la fila.
   * @returns {void}
   */
  const humbleClick = (index: number, event: React.MouseEvent<HTMLTableRowElement>, rowId: string): void => {
    if (handleRowClick != null) {
      handleRowClick(index, event)
    }
    setTable('profesionales')
    setTableID(rowId)
  }

  return (
    <div className='main-container-cuerpo cuerpo-small'>
      <div className='box box-borde cuerpo-small'>
        <table className='custom-table cuerpo-small'>
          <thead>
            <tr>
              <th className={`id ${selectedHeader === 'id' ? 'selected' : ''}`} onClick={() => sortData('id')}>id</th>

              <th className={`nombre ${selectedHeader === 'nombre' ? 'selected' : ''}`} onClick={() => sortData('nombre')}>Nombre
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaNombre' className={`flecha ${selectedHeader === 'nombre' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`primerApellido ${selectedHeader === 'primerApellido' ? 'selected' : ''}`} onClick={() => sortData('primerApellido')}>Primer apellido
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaPrimerApellido' className={`flecha ${selectedHeader === 'primerApellido' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`segundoApellido ${selectedHeader === 'segundoApellido' ? 'selected' : ''}`} onClick={() => sortData('segundoApellido')}>Segundo apellido
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaSegundoApellido' className={`flecha ${selectedHeader === 'segundoApellido' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`dni ${selectedHeader === 'dni' ? 'selected' : ''}`} onClick={() => sortData('dni')}>DNI
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaDNI' className={`flecha ${selectedHeader === 'dni' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`profesion ${selectedHeader === 'profesion' ? 'selected' : ''}`} onClick={() => sortData('profesion')}>Profesion
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaProfesion' className={`flecha ${selectedHeader === 'profesion' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`email ${selectedHeader === 'email' ? 'selected' : ''}`} onClick={() => sortData('email')}>Email
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaEmail' className={`flecha ${selectedHeader === 'email' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`telefono ${selectedHeader === 'telefono' ? 'selected' : ''}`} onClick={() => sortData('telefono')}>Telefono
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaTelefono' className={`flecha ${selectedHeader === 'telefono' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`password ${selectedHeader === 'password' ? 'selected' : ''}`} onClick={() => sortData('password')}>Password
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaPassword' className={`flecha ${selectedHeader === 'password' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {localData.map((row: datos.RowDataPro, index: number) => (
              <tr
                key={index}
                className={selectedRows.includes(row.id) ? 'selected' : ''}
                onClick={(event) => humbleClick(index, event, row.id)}
              >
                <td className='id'>
                  <input key='profesionales' id='profesionalesIDE' className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='nombre'>
                  <input className='nombre' type='text' value={row.nombre} onChange={async (e) => await handleInputChange(index, 'nombre', e.target.value)} />
                </td>
                <td className='primerApellido'>
                  <input className='primerApellido' type='text' value={row.primerApellido} onChange={async (e) => await handleInputChange(index, 'primerApellido', e.target.value)} />
                </td>
                <td className='segundoApellido'>
                  <input className='segundoApellido' type='text' value={row.segundoApellido} onChange={async (e) => await handleInputChange(index, 'segundoApellido', e.target.value)} />
                </td>
                <td className='dni'>
                  <input className='dni' type='text' value={row.dni} onChange={async (e) => await handleInputChange(index, 'dni', e.target.value)} />
                </td>
                <td className='profesion'>

                  <select
                    name='cualificacionPro'
                    id='cualificacionProPanel'
                    value={row.profesion}
                    onChange={async (e) => await handleSelectChange(index, e.target.value)}
                  >

                    {pro.map((profesion) => (
                      <option key={profesion.id} value={profesion.profesion}>{profesion.profesion}</option>
                    ))}
                  </select>

                </td>
                <td className='email'>
                  <input className='email' type='text' value={row.email} onChange={async (e) => await handleInputChange(index, 'email', e.target.value)} />
                </td>
                <td className='telefono'>
                  <input className='telefono' type='text' value={row.telefono} onChange={async (e) => await handleInputChange(index, 'telefono', e.target.value)} />
                </td>
                <td className='password'>
                  <input className='password' type='text' value={row.password} onChange={async (e) => await handleInputChange(index, 'password', e.target.value)} />
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
