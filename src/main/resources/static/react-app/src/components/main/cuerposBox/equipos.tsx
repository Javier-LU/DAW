/**
 * @module equipos
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
   * Hook personalizado que proporciona datos y funciones para manejar la tabla.
   * @returns {{
   *   dataE: Array<Object>,
   *   selectedRows: Array<number>,
   *   handleRowClick: Function
   * }} Datos y funciones para manejar la tabla.
   */
  const { setTable, setTableID } = useEstado()

  const {
    dataE = [],
    selectedRows = [],
    handleRowClick
  } = useTableData('cuerpoGrupo')

  const [localData, setLocalData] = useState(dataE)

  const [sortConfig, setSortConfig] = useState<{ key: keyof datos.RowDataEquipo, direction: 'ascending' | 'descending' } | null>(null)
  const [selectedHeader, setSelectedHeader] = useState<keyof datos.RowDataEquipo | null>(null)

  useEffect(() => {
    setLocalData(dataE)
  }, [dataE])

  /**
   * Función que maneja el cambio de datos en la tabla.
   * @param {number} index - Índice del dato a modificar.
   * @param {keyof datos.RowDataEquipo} field - Campo del dato a modificar.
   * @param {string | number} value - Nuevo valor para el campo.
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa la actualización.
   */
  const handleChange = async (index: number, field: keyof datos.RowDataEquipo, value: string | number): Promise<void> => {
    const newData = [...localData]
    newData[index][field] = value as never
    setLocalData(newData)
    const updatedRow = newData[index]
    await sendApi(updatedRow)
  }
  /**
   * Función que maneja el ordenamiento de los datos en la tabla.
   * @param {keyof datos.RowDataEquipo} key - Campo por el cual ordenar los datos.
   * @returns {void}
   */
  const sortData = (key: keyof datos.RowDataEquipo): void => {
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

  const normalizeString = (str: string | undefined): string => {
    if (str === undefined) return ''
    return str.toLowerCase().replace(/\s+/g, '')
  }
  const findPersonaId = (persona: datos.Persona, profesion: string, personasList: datos.RowDataPro[]): string | undefined => {
    const pers = persona
    const partes = pers.split(' ')

    const found = personasList.find(
      p =>
        normalizeString(p.nombre) === normalizeString(partes[0]) &&
        normalizeString(p.primerApellido) === normalizeString(partes[1]) &&
        normalizeString(p.segundoApellido) === normalizeString(partes[2]) &&
        normalizeString(p.profesion) === normalizeString(profesion)
    )
    if (found != null) {

    } else {

    }
    return (found != null) ? found.id : undefined
  }

  const findCentroId = (centro: string, centrosList: datos.RowDataCS[]): string | undefined => {
    const found = centrosList.find(
      c => normalizeString(c.cs) === normalizeString(centro)
    )
    if (found != null) {

    } else {

    }
    return (found != null) ? found.id : undefined
  }

  const sendApi = async (dataToSend: any): Promise<void> => {
    let medico = dataToSend.medico.id
    let enfermero = dataToSend.enfermera.id
    let auxiliar = dataToSend.auxiliar.id
    let administrativo = dataToSend.administrativo.id
    let centro = dataToSend.centro.id

    if (medico === undefined) {
      medico = findPersonaId(dataToSend.medico, 'medico', datos.initialDataPro) ?? dataToSend.medico.id
    }
    if (enfermero === undefined) {
      enfermero = findPersonaId(dataToSend.enfermera, 'enfermero', datos.initialDataPro) ?? dataToSend.enfermera.id
    }
    if (auxiliar === undefined) {
      auxiliar = findPersonaId(dataToSend.auxiliar, 'auxiliar', datos.initialDataPro) ?? dataToSend.auxiliar.id
    }
    if (administrativo === undefined) {
      administrativo = findPersonaId(dataToSend.administrativo, 'administrativo', datos.initialDataPro) ?? dataToSend.administrativo.id
    }
    if (centro === undefined) {
      centro = findCentroId(dataToSend.centro, datos.initialDataCS)
    }

    const data = {

      equipo: dataToSend.equipo, // Replace with your desired team name
      medico: { // Replace with actual medico ID
        id: medico
      },
      enfermero: { // Replace with actual enfermero ID
        id: enfermero
      },
      auxiliar: { // Replace with actual auxiliar ID
        id: auxiliar
      },
      administrativo: { // Replace with actual administrativo ID
        id: administrativo
      },
      centro: { // Replace with actual administrativo ID
        id: centro
      } // Replace with your desired center name

    }
    const id: string | number = dataToSend.id
    const datosJSON = JSON.stringify(data, null, 2)

    try {
      await axiosInstance.put(`/equipo/update/${id}`, data)
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const humbleClick = (index: number, event: React.MouseEvent<HTMLTableRowElement>, rowId: string): void => {
    if (handleRowClick != null) {
      handleRowClick(index, event)
    }
    setTable('equipo')
    setTableID(rowId)
  }

  const [sanitarios] = useState<datos.RowDataPro[]>(datos.initialDataPro)
  const [cs] = useState<datos.RowDataCS[]>(datos.initialDataCS)

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

  return (
    <div className='main-container-cuerpo cuerpo-small'>
      <div className='box box-borde cuerpo-small'>
        <table className='custom-table cuerpo-small ta2'>
          <thead>
            <tr>
              <th className={`id ${selectedHeader === 'id' ? 'selected' : ''}`} onClick={() => sortData('id')}>id</th>
              <th className={`nombre ${selectedHeader === 'equipo' ? 'selected' : ''}`} onClick={() => sortData('equipo')}>Nombre
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaNombre' className={`flecha ${selectedHeader === 'equipo' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`centro ${selectedHeader === 'centro' ? 'selected' : ''}`} onClick={() => sortData('centro')}>Centro
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaCentro' className={`flecha ${selectedHeader === 'centro' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`medico ${selectedHeader === 'medico' ? 'selected' : ''}`} onClick={() => sortData('medico')}>Medico
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaMedico' className={`flecha ${selectedHeader === 'medico' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`enfermera ${selectedHeader === 'enfermera' ? 'selected' : ''}`} onClick={() => sortData('enfermera')}>Enfermera
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaEnfermera' className={`flecha ${selectedHeader === 'enfermera' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`auxiliar ${selectedHeader === 'auxiliar' ? 'selected' : ''}`} onClick={() => sortData('auxiliar')}>Auxiliar
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaAuxiliar' className={`flecha ${selectedHeader === 'auxiliar' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`administrativo ${selectedHeader === 'administrativo' ? 'selected' : ''}`} onClick={() => sortData('administrativo')}>Administrativo
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaAdministrativo' className={`flecha ${selectedHeader === 'administrativo' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {localData.map((row: datos.RowDataEquipo, index: number) => (
              <tr
                key={index}
                className={selectedRows.includes(row.id) ? 'selected' : ''}
                onClick={(event) => humbleClick(index, event, row.id)}
              >
                <td className='id'>
                  <input key='equipos' id='equiposIdE' className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='equipo'>
                  <input className='equipo' type='text' value={row.equipo} onChange={async (e) => await handleChange(index, 'equipo', e.target.value)} />
                </td>
                <td className='centro'>
                  <select
                    name='centroSalud'
                    id='centroSaludPanel'
                    value={row.centro}
                    onChange={async (e) => await handleChange(index, 'centro', e.target.value)}
                  >
                    <option value='default' disabled>....</option>
                    {cs.map((centro, csIndex) => (
                      <option key={csIndex} value={centro.cs}>{centro.cs}</option>
                    ))}
                  </select>
                </td>
                <td className='medico'>
                  <select
                    name='medico'
                    id='medicoPanel'
                    value={String(row.medico.nombre)}
                    onChange={async (e) => await handleChange(index, 'medico', e.target.value)}
                  >
                    <option value='default' disabled>....</option>
                    {nombresMedicos.map(({ id, nombreCompleto }) => (
                      <option key={id} value={nombreCompleto}>{nombreCompleto}</option>
                    ))}
                  </select>
                </td>
                <td className='enfermera'>
                  <select
                    name='enfermero'
                    id='enfermeroPanel'
                    value={String(row.enfermera)}
                    onChange={async (e) => await handleChange(index, 'enfermera', e.target.value)}
                  >
                    <option value='default' disabled>....</option>
                    {nombresEnfermera.map(({ id, nombreCompleto }) => (
                      <option key={id} value={nombreCompleto}>{nombreCompleto}</option>
                    ))}
                  </select>
                </td>
                <td className='auxiliar'>
                  <select
                    name='auxiliar'
                    id='auxiliarPanel'
                    value={String(row.auxiliar)}
                    onChange={async (e) => await handleChange(index, 'auxiliar', e.target.value)}
                  >
                    <option value='default' disabled>....</option>
                    {nombresAuxiliar.map(({ id, nombreCompleto }) => (
                      <option key={id} value={nombreCompleto}>{nombreCompleto}</option>
                    ))}
                  </select>
                </td>
                <td className='administrativo'>
                  <select
                    name='administrativo'
                    id='administrativoPanel'
                    value={String(row.administrativo)}
                    onChange={async (e) => await handleChange(index, 'administrativo', e.target.value)}
                  >
                    <option value='default' disabled>....</option>
                    {nombresAdministrativo.map(({ id, nombreCompleto }) => (
                      <option key={id} value={nombreCompleto}>{nombreCompleto}</option>
                    ))}
                  </select>
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
