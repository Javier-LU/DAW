import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import * as datos from '../datos/datosGlobales'

const MyBarChart = () => (
    <div style={{ paddingRight: '20px', paddingTop: "20px", paddingBottom:"20px" ,display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #E5E8EB', borderRadius: '20px' }}>
    <div>
      <h3 style={{ marginLeft:"20px", fontSize: '16px', color: '#333' }}>Número de casos</h3>
      <BarChart
        layout="vertical" // Configurar el gráfico para ser horizontal
        width={370}
        height={200}
        data={datos.initialDatosEdad} // Usar los datos correctos
        margin={{
          top: 20, right: 5, left: 0, bottom: 5,
        }}
        barSize={20} // Ajustar el tamaño de las barras
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type="number" tick={{ fontSize: 0, fill: '#ffffff' }} />
        <YAxis type="category" dataKey="nombre" tick={{ fontSize: 14, fill: '#b5651d' }} />
        <Tooltip />
        <Bar dataKey="valor" fill="#dcdcdc" />
      </BarChart>
    </div>
  </div>
);

export default MyBarChart;
