import '../css/cuerpo.scss'
import '../css/cuepoSmall.scss'
import { useTableData } from '../../datos/funcionesGlobales'
import * as datos from '../../datos/datosGlobales'
import React, { useState, useEffect } from 'react'

const Counter: React.FC = () => {
  const {
    dataCS = [],
    selectedRows = [],
    handleRowClick
  } = useTableData('cuerpoCS')

  const [localData, setLocalData] = useState(dataCS)
  const [sortConfig, setSortConfig] = useState<{ key: keyof datos.RowDataCS, direction: 'ascending' | 'descending' } | null>(null)
  const [selectedHeader, setSelectedHeader] = useState<keyof datos.RowDataCS | null>(null)

  useEffect(() => {
    setLocalData(dataCS)
  }, [dataCS])

  const handleInputChange = (index: number, field: keyof datos.RowDataCS, value: string | number): void => {
    const newData = [...localData]
    newData[index][field] = value as never
    setLocalData(newData)
  }

  const sortData = (key: keyof datos.RowDataCS): void => {
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

              <th className={`nombre ${selectedHeader === 'cs' ? 'selected' : ''}`} onClick={() => sortData('cs')}>Nombre
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaCS' className={`flecha ${selectedHeader === 'cs' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`calle ${selectedHeader === 'calle' ? 'selected' : ''}`} onClick={() => sortData('calle')}>Dirección
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaCalle' className={`flecha ${selectedHeader === 'calle' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`telefono ${selectedHeader === 'telefono' ? 'selected' : ''}`} onClick={() => sortData('telefono')}>Telefono
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
                onClick={(event) => handleRowClick?.(index, event)}
              >
                <td className='id'>
                  <input className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='cs'>
                  <input className='cs' type='text' value={row.cs} onChange={(e) => handleInputChange(index, 'cs', e.target.value)} />
                </td>
                <td className='calle'>
                  <input className='calle' type='text' value={row.calle} onChange={(e) => handleInputChange(index, 'calle', e.target.value)} />
                </td>
                <td className='telefono'>
                  <input className='telefono' type='text' value={row.telefono} onChange={(e) => handleInputChange(index, 'telefono', e.target.value)} />
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
