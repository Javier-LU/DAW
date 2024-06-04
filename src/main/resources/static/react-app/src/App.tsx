/**
 * @module App
 * @description Componente principal de la aplicación que define las rutas y componentes principales.
 * @returns {JSX.Element} Elemento JSX que representa la estructura principal de la aplicación.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Pacientes from './pages/pacientes'
import Tareas from './pages/tareas'
import Estadisticas from './pages/estadisticas'
import Configuracion from './pages/configuracion'

import Inicializador from './components/datos/inicializador'
import loadEstadisticasData from './components/datos/apis/get/loadEstadisticasData'

import LoadPagesPaciente from './components/datos/apis/loadPages/loadPagesPaciente'
import LoadPagesTareas from './components/datos/apis/loadPages/loadPagesTareas'
import loadPagesConfiguracion from './components/datos/apis/loadPages/loadPagesConfiguracion'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          path='/pacientes'
          element={<Inicializador Component={Pacientes} loadData={LoadPagesPaciente} />}
        />

        <Route
          path='/tareas'
          element={<Inicializador Component={Tareas} loadData={LoadPagesTareas} />}
        />

        <Route
          path='/estadisticas'
          element={<Inicializador Component={Estadisticas} loadData={loadEstadisticasData} />}
        />

        <Route
          path='/configuracion'
          element={<Inicializador Component={Configuracion} loadData={loadPagesConfiguracion} />}
        />
      </Routes>
    </div>
  )
}

export default App
