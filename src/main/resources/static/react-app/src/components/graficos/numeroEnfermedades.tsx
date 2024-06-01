import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import * as datos from '../datos/datosGlobales'

const MyBarChart = () => (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #E5E8EB', borderRadius:"20px" }}>
    <div>
    <h3 style={{ fontSize: '16px', color: '#333' }}>Número de casos</h3>
      <BarChart
        width={370}
        height={200}
        data={datos.initialDatosEnfe}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
        barSize={30} // Ajustar el tamaño de las barras
      >
        {/* Quitamos la cuadrícula */}
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="nombre" tick={{ fontSize: 14, fill: '#b5651d' }} />
        {/* Ocultamos el eje Y */}
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="total" fill="#dcdcdc" />
      </BarChart>
    </div>
  </div>
);

export default MyBarChart;