import '../css/cuerpo.scss'
import '../css/cuepoSmall.scss'
import { useTableData } from '../../datos/funcionesGlobales'
import * as datos from '../../datos/datosGlobales'
import React, { useState, useEffect } from 'react'

const Counter: React.FC = () => {
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

  const handleSelectChange = (index: number, value: string): void => {
    const newData = [...localData]
    newData[index].profesion = value
    setLocalData(newData)
  }

  const handleInputChange = (index: number, field: keyof datos.RowDataPro, value: string | number): void => {
    const newData = [...localData]
    newData[index][field] = value as never
    setLocalData(newData)
  }

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
                onClick={(event) => handleRowClick?.(index, event)}
              >
                <td className='id'>
                  <input className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='nombre'>
                  <input className='nombre' type='text' value={row.nombre} onChange={(e) => handleInputChange(index, 'nombre', e.target.value)} />
                </td>
                <td className='primerApellido'>
                  <input className='primerApellido' type='text' value={row.primerApellido} onChange={(e) => handleInputChange(index, 'primerApellido', e.target.value)} />
                </td>
                <td className='segundoApellido'>
                  <input className='segundoApellido' type='text' value={row.segundoApellido} onChange={(e) => handleInputChange(index, 'segundoApellido', e.target.value)} />
                </td>
                <td className='dni'>
                  <input className='dni' type='text' value={row.dni} onChange={(e) => handleInputChange(index, 'dni', e.target.value)} />
                </td>
                <td className='profesion'>
   
                  <select
                    name='cualificacionPro'
                    id='cualificacionProPanel'
                    value={row.profesion}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                  >
          
                    {pro.map((profesion) => (
                      <option key={profesion.id} value={profesion.profesion}>{profesion.profesion}</option>
                    ))}
                  </select>


                </td>
                <td className='email'>
                  <input className='email' type='text' value={row.email} onChange={(e) => handleInputChange(index, 'email', e.target.value)} />
                </td>
                <td className='telefono'>
                  <input className='telefono' type='text' value={row.telefono} onChange={(e) => handleInputChange(index, 'telefono', e.target.value)} />
                </td>
                <td className='password'>
                  <input className='password' type='text' value={row.password} onChange={(e) => handleInputChange(index, 'password', e.target.value)} />
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
