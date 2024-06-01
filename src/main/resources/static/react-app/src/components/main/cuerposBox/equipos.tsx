import '../css/cuerpo.scss'
import '../css/cuepoSmall.scss'
import { useTableData } from '../../datos/funcionesGlobales'
import * as datos from '../../datos/datosGlobales'
import React, { useState, useEffect } from 'react'

const Counter: React.FC = () => {
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

  const handleInputChange = (index: number, field: keyof datos.RowDataEquipo, value: string | number): void => {
    const newData = [...localData]
    newData[index][field] = value as never
    setLocalData(newData)
  }

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

  return (
    <div className='main-container-cuerpo cuerpo-small'>
      <div className='box box-borde cuerpo-small'>
        <table className='custom-table cuerpo-small'>
          <thead>
            <tr>
              <th className={`id ${selectedHeader === 'id' ? 'selected' : ''}`} onClick={() => sortData('id')}>id</th>

              <th className={`nombre ${selectedHeader === 'equipo' ? 'selected' : ''}`} onClick={() => sortData('equipo')}>Nombre
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaNombre' className={`flecha ${selectedHeader === 'equipo' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
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
                onClick={(event) => handleRowClick?.(index, event)}
              >
                <td className='id'>
                  <input className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='equipo'>
                  <input className='equipo' type='text' value={row.equipo} onChange={(e) => handleInputChange(index, 'equipo', e.target.value)} />
                </td>
                <td className='centro'>
                  <input className='centro' type='text' value={row.centro} onChange={(e) => handleInputChange(index, 'centro', e.target.value)} />
                </td>
                <td className='medico'>
                  <input className='medico' type='text' value={row.medico} onChange={(e) => handleInputChange(index, 'medico', e.target.value)} />
                </td>
                <td className='enfermera'>
                  <input className='enfermera' type='text' value={row.enfermera} onChange={(e) => handleInputChange(index, 'enfermera', e.target.value)} />
                </td>
                <td className='auxiliar'>
                  <input className='auxiliar' type='text' value={row.auxiliar} onChange={(e) => handleInputChange(index, 'auxiliar', e.target.value)} />
                </td>
                <td className='administrativo'>
                  <input className='administrativo' type='text' value={row.administrativo} onChange={(e) => handleInputChange(index, 'administrativo', e.target.value)} />
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
