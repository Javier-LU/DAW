
import '../css/cuerpo.scss'
import { useTableData } from '../../datos/funcionesGlobales'
import * as datos from '../../datos/datosGlobales'

const Counter: React.FC = () => {
  const {
    data = [],
    dataCS = [],
    dataEn = [],
    dataE = [],
    dataEx = [],
    sortConfig,
    selectedRows = [],
    selectedHeader,
    handleInputChange,
    toggleHistorico,
    toggleResidencia,
    handleSelectChange,
    showDialog,
    formatDateString,
    sortData,
    handleRowClick
  } = useTableData('agregarTarea')

  return (
    <div className='main-container-cuerpo'>
      <div className='box box-borde'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th className={`id ${selectedHeader === 'id' ? 'selected' : ''}`} onClick={() => sortData?.('id')}>id</th>
              <th className={`historico ${selectedHeader === 'historico' ? 'selected' : ''}`} onClick={() => sortData?.('historico')}>Historico
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaHistorico' className={`flecha ${selectedHeader === 'historico' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`equipo ${selectedHeader === 'equipo' ? 'selected' : ''}`} onClick={() => sortData?.('equipo')}>Equipo
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaEquipo' className={`flecha ${selectedHeader === 'equipo' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`tarea ${selectedHeader === 'tarea' ? 'selected' : ''}`} onClick={() => sortData?.('tarea')}>Tarea
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaTarea' className={`flecha ${selectedHeader === 'tarea' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`fechaIngreso ${selectedHeader === 'fechaIngreso' ? 'selected' : ''}`} onClick={() => sortData?.('fechaIngreso')}>Fecha de ingreso
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaFechaIngreso' className={`flecha ${selectedHeader === 'fechaIngreso' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`nombre ${selectedHeader === 'nombre' ? 'selected' : ''}`} onClick={() => sortData?.('nombre')}>Nombre
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaNombre' className={`flecha ${selectedHeader === 'nombre' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`dni ${selectedHeader === 'dni' ? 'selected' : ''}`} onClick={() => sortData?.('dni')}>DNI
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaDni' className={`flecha ${selectedHeader === 'dni' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`nacimiento ${selectedHeader === 'nacimiento' ? 'selected' : ''}`} onClick={() => sortData?.('nacimiento')}>Nacimiento, edad
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaNacimiento' className={`flecha ${selectedHeader === 'nacimiento' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`residencia ${selectedHeader === 'residencia' ? 'selected' : ''}`} onClick={() => sortData?.('residencia')}>¿Está en residencia?
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaResidencia' className={`flecha ${selectedHeader === 'residencia' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`direccion ${selectedHeader === 'direccion' ? 'selected' : ''}`} onClick={() => sortData?.('direccion')}>Dirección, telefono
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaDireccion' className={`flecha ${selectedHeader === 'direccion' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`centroSalud ${selectedHeader === 'centroSalud' ? 'selected' : ''}`} onClick={() => sortData?.('centroSalud')}>Centro de salud
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaCentroSalud' className={`flecha ${selectedHeader === 'centroSalud' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`enfermedad ${selectedHeader === 'enfermedad' ? 'selected' : ''}`} onClick={() => sortData?.('enfermedad')}>Enfermedad
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaEnfermedad' className={`flecha ${selectedHeader === 'enfermedad' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
              <th className={`fechaSalidaLugar ${selectedHeader === 'fechaSalida' ? 'selected' : ''}`} onClick={() => sortData?.('fechaSalida')}>Salida, Fecha, Lugar
                <svg xmlns='http://www.w3.org/2000/svg' id='flechaFechaSalidaLugar' className={`flecha ${selectedHeader === 'fechaSalida' && sortConfig?.direction === 'ascending' ? 'asc' : ''}`} fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1' />
                </svg>
              </th>
            </tr>

          </thead>
          <tbody>
            {data.map((row: datos.RowData, index: number) => (
              <tr
                key={index}
                className={selectedRows.includes(row.id) ? 'selected' : ''}
                onClick={(event) => handleRowClick?.(index, event)}
              >
                <td className='id'>
                  <input className='id idEvaluar' type='text' value={row.id} readOnly />
                </td>
                <td className='historico'>
                  <button className='settings-icon' onClick={() => toggleHistorico?.(index)}>{row.historico}</button>
                </td>
                <td className='equipo'>
                  <select
                    name='equipo'
                    id='equipo'
                    value={row.equipo}
                    onChange={(e) => handleSelectChange?.(index, 'equipo', e.target.value)}
                  >
                    <option value={row.equipo} disabled selected>{row.equipo}</option>
                    <option value='disabled' disabled>........</option>
                    {dataE.map((equipo: datos.RowDataEquipo, equipoIndex: number) => (
                      <option key={equipoIndex} value={equipo.equipo}>{equipo.equipo}</option>
                    ))}
                  </select>
                </td>
                <td className='tarea'>
                  <button id='botonSettings' className='settings-icon' onClick={() => showDialog?.(index)}>{row.tarea} / Añadir</button>
                </td>
                <td className='fechaIngreso'><input className='fechaIngreso' type='date' value={formatDateString?.(row.fechaIngreso)} onChange={(e) => handleInputChange?.(index, 'fechaIngreso', e.target.value)} /></td>
                <td className='nombre'>
                  <input className='nombre' type='text' value={row.nombre} onChange={(e) => handleInputChange?.(index, 'nombre', e.target.value)} />
                  <input className='primerApellido' type='text' value={row.primerApellido} onChange={(e) => handleInputChange?.(index, 'primerApellido', e.target.value)} />
                  <input className='segundoApellido' type='text' value={row.segundoApellido} onChange={(e) => handleInputChange?.(index, 'segundoApellido', e.target.value)} />
                </td>
                <td className='dni'><input className='dni' type='text' value={row.dni} onChange={(e) => handleInputChange?.(index, 'dni', e.target.value)} /></td>
                <td className='nacimiento'>
                  <input className='nacimiento' type='date' value={formatDateString?.(row.nacimiento)} onChange={(e) => handleInputChange?.(index, 'nacimiento', e.target.value)} />
                  <input className='edad' type='text' value={row.edad.toString()} readOnly />
                </td>
                <td className='residencia'>
                  <button className='settings-icon settings-icon-personalizado' onClick={() => toggleResidencia?.(index)}>{row.residencia}</button>

                </td>
                <td className='direccion'>
                  <input className='direccion' type='text' value={row.direccion} onChange={(e) => handleInputChange?.(index, 'direccion', e.target.value)} />
                  <input className='telefono' type='text' value={row.telefono} onChange={(e) => handleInputChange?.(index, 'telefono', e.target.value)} />

                </td>
                <td className='centroSalud'>
                  <select
                    name='centroSalud'
                    id='centroSalud'
                    value={row.centroSalud}
                    onChange={(e) => handleSelectChange?.(index, 'centroSalud', e.target.value)}
                  >
                    <option value={row.centroSalud} disabled selected>{row.centroSalud}</option>
                    <option value='disabled' disabled>........</option>
                    {dataCS.map((cs: datos.RowDataCS, csIndex: number) => (
                      <option key={csIndex} value={cs.cs}>{cs.cs}</option>
                    ))}
                  </select>
                </td>
                <td className='enfermedad'>
                  <select
                    name='enfermedad'
                    id='enfermedad'
                    value={row.enfermedad}
                    onChange={(e) => handleSelectChange?.(index, 'enfermedad', e.target.value)}
                  >
                    <option value={row.enfermedad} disabled selected>{row.enfermedad}</option>
                    <option value='disabled' disabled>........</option>
                    {dataEn.map((en: datos.RowDataEnfermedad, enIndex: number) => (
                      <option key={enIndex} value={en.enfermedad}>{en.enfermedad}</option>
                    ))}
                  </select>
                </td>
                <td className='fechaSalidaLugar'>
                  <select
                    name='salida'
                    id='salida'
                    value={row.salida}
                    onChange={(e) => handleSelectChange?.(index, 'salida', e.target.value)}
                  >
                    <option value={row.salida} disabled selected>{row.salida}</option>
                    <option value='disabled' disabled>........</option>
                    {dataEx.map((ex: datos.RowDataSa, exIndex: number) => (
                      <option key={exIndex} value={ex.salida}>{ex.salida}</option>
                    ))}
                  </select>
                  <input className='fechaSalidaLugar' type='date' value={formatDateString?.(row.fechaSalida)} onChange={(e) => handleInputChange?.(index, 'fechaSalida', e.target.value)} />
                  <input className='fechaSalidaLugar' type='text' value={` ${row.lugarSalida}`} onChange={(e) => handleInputChange?.(index, 'lugarSalida', e.target.value)} />
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
