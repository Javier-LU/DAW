/**
 * @module configuracionDatos
 * @description Componente que muestra los datos correspondientes a la condición proporcionada.
 * @param {Object} props - Propiedades para el componente.
 * @param {string} props.condicion - Condición que determina qué datos mostrar.
 * @returns {JSX.Element} Elemento JSX que muestra los datos según la condición.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React, { useState } from 'react'
import * as datos from '../../datos/datosGlobales'
import '../css/configuracion.scss'
interface DatosConfProps {
  condicion: string

}

const DatosConf: React.FC<DatosConfProps> = ({ condicion }) => {
  const [data] = useState<datos.RowDatosConf[]>(datos.initialDatosConf)
  const registro = data[0]

  if (condicion === 'Registros de profesionales') {
    return (
      <div className='datos'>
        <h3>{condicion}</h3>
        <table>
          <tbody>
            <tr>
              <td>Equipos totales</td>
              <td>{registro.totalEquipos}</td>
            </tr>
            <tr>
              <td>Porfesionales en activo</td>
              <td>{registro.totalProfesionales}</td>
            </tr>
            <tr>
              <td>Médicos</td>
              <td>{registro.Medicos}</td>
            </tr>
            <tr>
              <td>Enfermeras</td>
              <td>{registro.Enfermeras}</td>
            </tr>
            <tr>
              <td>Auxiliar Médico</td>
              <td>{registro.Auxiliar}</td>
            </tr>
            <tr>
              <td>Administrativo</td>
              <td>{registro.Administrativo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else if (condicion === 'Registros de equipos') {
    return (
      <div className='datos'>
        <h3>{condicion}</h3>
      </div>
    )
  } else {
    return (
      <div className='Registros de Centros de Salud'>
        <h3>{condicion}</h3>
      </div>
    )
  }
}

export default DatosConf
