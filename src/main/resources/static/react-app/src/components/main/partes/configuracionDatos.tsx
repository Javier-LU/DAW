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
              <td>Total</td>
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
        <table>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{registro.TotalEquipo}</td>
            </tr>
          </tbody>
        </table>
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
