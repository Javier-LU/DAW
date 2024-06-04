/**
 * @module agregarCSComp
 * @description  Componente funcional que representa el encabezado de la aplicación.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.activeButton - Nombre del botón activo.
 * @returns {JSX.Element} Elemento JSX que representa el encabezado.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './headerStyle.scss'

interface HeaderProps {
  activeButton: string
}

const Header: React.FC<HeaderProps> = ({ activeButton }): JSX.Element => {
  /**
   * Estado que indica si la pantalla es pequeña.
   * @type {boolean}
   */
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  /**
   * Hook que proporciona una función de navegación.
   * @type {Function}
   */
  const navigate = useNavigate()
  /**
   * Función que verifica el tamaño de la pantalla.
   * @returns {void}
   */
  const checkScreenSize = (): void => {
    setIsSmallScreen(window.innerWidth <= 768)
  }

  useEffect(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])
  /**
   * Función que navega a una ruta específica.
   * @param {string} path - Ruta a la que navegar.
   * @returns {void}
   */
  const navigateTo = (path: string): void => {
    navigate(path)
  }
  return (
    <header id='headerPersonalizado'>
      <div className='logo'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='svgLogo' viewBox='0 0 16 16'>
          <path fillRule='evenodd' d='M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2m-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125M8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132' />
        </svg>
        <div>{isSmallScreen ? activeButton : 'ESAD'}</div>
      </div>
      <div className='navCentral'>
        <nav>
          <ul>
            <li><button className={`botonHeader ${activeButton === 'Pacientes' ? 'active' : ''}`} onClick={() => navigateTo('/pacientes')}>Pacientes</button></li>
            <li><button className={`botonHeader ${activeButton === 'Tareas' ? 'active' : ''}`} onClick={() => navigateTo('/tareas')}>Tareas</button></li>
            <li><button className={`botonHeader ${activeButton === 'Estadisticas' ? 'active' : ''}`} onClick={() => navigateTo('/estadisticas')}>Estadísticas</button></li>
          </ul>
        </nav>
        <button onClick={() => navigateTo('/configuracion')} id='setting' className={`settings-icon ${activeButton === 'Configuración' ? 'active' : ''}`}>
          <svg xmlns='http://www.w3.org/2000/svg' className='svgLogo' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0' />
            <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z' />
          </svg>
        </button>
        <button onClick={() => navigateTo('/')} id='exit' className='settings-icon'>
          <svg xmlns='http://www.w3.org/2000/svg' id='exitLogo' className='svgLogo' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
