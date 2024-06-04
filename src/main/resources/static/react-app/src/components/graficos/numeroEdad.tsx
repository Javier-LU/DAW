/**
 * @module agregarCSComp
 * @description Componente funcional que representa un gráfico de barras personalizado utilizando Recharts.
 * Este gráfico muestra una gráfica de rango de poblacion por edad.
 * @returns {JSX.Element} Elemento JSX que representa el gráfico de barras.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import * as datos from '../datos/datosGlobales'

const MyBarChart = (): JSX.Element => (
  <div style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #E5E8EB', borderRadius: '20px' }}>
    <div>
      <h3 style={{ marginLeft: '20px', fontSize: '16px', color: '#333' }}>Número de casos</h3>
      <BarChart
        layout='vertical' // Configurar el gráfico para ser horizontal
        width={370}
        height={200}
        data={datos.initialDatosEdad} // Usar los datos correctos
        margin={{
          top: 20, right: 5, left: 0, bottom: 5
        }}
        barSize={20}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type='number' tick={{ fontSize: 0, fill: '#ffffff' }} />
        <YAxis type='category' dataKey='nombre' tick={{ fontSize: 14, fill: '#b5651d' }} />
        <Tooltip />
        <Bar dataKey='valor' fill='#dcdcdc' />
      </BarChart>
    </div>
  </div>
)

export default MyBarChart/*  */
