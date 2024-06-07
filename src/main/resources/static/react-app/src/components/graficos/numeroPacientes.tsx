/**
 * @module numeroPacientes
 * @description Componente funcional que representa un gráfico de barras personalizado utilizando Recharts.
 * Este gráfico muestra datos sobre equipos.
 * @returns {JSX.Element} Elemento JSX que representa el gráfico de barras.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import * as datos from '../datos/datosGlobales'

const MyBarChart = (): JSX.Element => (
  <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #E5E8EB', borderRadius: '20px' }}>
    <div>
      <h3 style={{ fontSize: '16px', color: '#333' }}>Equipos</h3>
      <BarChart
        width={800}
        height={200}
        data={datos.initialDatosPaMe}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5
        }}
        barSize={30}
      >

        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey='nombre' tick={{ fontSize: 14, fill: '#b5651d' }} />
        {/* Ocultamos el eje Y */}
        <YAxis hide />
        <Tooltip />
        <Bar dataKey='valor' fill='#dcdcdc' />
      </BarChart>
    </div>
  </div>
)

export default MyBarChart
