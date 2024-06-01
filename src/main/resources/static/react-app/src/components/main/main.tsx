import React, { useEffect, useState } from 'react'
import HeaderMain from './header/mainHeader'
import Cuerpo from './cuerposBox/pacientes'

import PanelPaciente from '../main/paneles/agregarPacienteComp'
import PanelTarea from '../main/paneles/agregarTeraComp'
import PanelPrefesional from '../main/paneles/agregarProfesionalComp'
import PanelEquipo from '../main/paneles/agregarNuevoEquipoComp'
import PanelCS from '../main/paneles/agregarCSComp'

import Botones from './partes/botonesConf'
import Equipo from './cuerposBox/equipos'
import CS from './cuerposBox/centrosSalud'
import Profesionales from './cuerposBox/profesionales'
import Tareas from './cuerposBox/tareas'

import { initialDataVF, initialDataEquipo } from '../datos/datosGlobales'
import CabeceraConf from './partes/configuracionDatos'

import GraficaPacientes from '../graficos/numeroPacientes'
import GraficaEnfer from '../graficos/numeroEnfermedades'
import GraficaCS from '../graficos/numeroPacientesPorCentro'
import GraficaEdad from '../graficos/numeroEdad'

interface MainProps {
  condition: string
}

const Main: React.FC<MainProps> = ({ condition }): JSX.Element => {
  const [navItems, setNavItems] = useState<string[]>([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const combineNavItems = (): string[] => {
    const vfItems = initialDataVF.map(item => item.valoresFijos)
    const equipoItems = initialDataEquipo.map(item => item.equipo)
    return [...vfItems, ...equipoItems]
  }

  const equipoItems = initialDataEquipo.map(item => item.equipo)

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth <= 900) {
      setNavItems(initialDataEquipo.map(item => item.equipo))
    } else {
      setNavItems(combineNavItems())
    }
  }, [windowWidth])

  if (condition === 'Tareas') {
    return (
      <main id="mainTareas">

        <HeaderMain
          principal='Tareas'
          boton='Nueva Tarea'
          navItems={equipoItems}
          mostrarElementos
          mostrarElementosPapeleraLupa={false}
        />
        <Tareas />


      </main>
    )
  } else if (condition === 'Pacientes') {
    return (
      <main id="mainPacientes">
        <HeaderMain
          principal='Pacientes'
          boton='Nuevo paciente'
          navItems={navItems}
          mostrarElementos
          mostrarElementosPapeleraLupa
        />
        <Cuerpo />
        <PanelPaciente />
        <PanelTarea />
      </main>
    )
  } else if (condition === 'Estadisticas') {
    return (
      <main id="mainEstadisticas">
        <HeaderMain
          principal='Estadísticas'
          boton='Nueva Tarea'
          navItems={['']}
          mostrarElementos={false}
          mostrarElementosPapeleraLupa={false}
        />
        <GraficaPacientes />
        <div id='graficasJuntos'>
          <GraficaEdad />
          <GraficaEnfer />

        </div>
        <GraficaCS />

      </main>
    )
  } else {
    return (
      <main id="mainConfiguracion">
        <div id="one">
          <HeaderMain
            principal='ESAD Plantilla'
            boton='Nueva Tarea'
            navItems={['']}
            mostrarElementos={false}
          />
        </div>
        <div id='cero'>
          <div id="two">
            <CabeceraConf condicion='Registros de profesionales' />
            <Profesionales />
            <Botones condicion='agregarProfesional' />
          </div>
          <div id="three">
            <CabeceraConf condicion='Registros de equipos' />
            <Equipo />
            <Botones condicion='agregarEquipo' />
          </div>
          <div id="four">
            <CabeceraConf condicion='Registros de Centros de Salud' />
            <CS />
            <Botones condicion='agregarCS' />
          </div>
        </div>
        <PanelPrefesional />
        <PanelEquipo />
        <PanelCS />

      </main>
    )
  }
}

export default Main
