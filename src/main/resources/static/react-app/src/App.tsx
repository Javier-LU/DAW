
import { Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Pacientes from './pages/pacientes'
import Tareas from './pages/tareas'
import Estadisticas from './pages/estadisticas'
import Configuración from './pages/configuracion'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/pacientes' element={<Pacientes />} />
        <Route path='/tareas' element={<Tareas />} />
        <Route path='/estadisticas' element={<Estadisticas />} />
        <Route path='/Configuración' element={<Configuración />} />
      </Routes>
    </div>
  )
}

export default App
