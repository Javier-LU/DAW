import React from 'react'
import { useNavigate } from 'react-router-dom'
import './footer.scss'

interface HeaderProps {
  activeButton: string
}

const Footer: React.FC<HeaderProps> = ({ activeButton }): JSX.Element => {
  const navigate = useNavigate()
  const navigateTo = (path: string): void => {
    navigate(path)
  }
  return (
    <footer>
      <div className='footer-content'>
        <p>&copy; 2024 ESAD. Todos los derechos reservados.</p>
      </div>
      <div className='navCentralFooter'>
        <nav>
          <ul>
            <li>
              <button className={`botonHeader botonHeaderFooter grupoBotones ${activeButton === 'Pacientes' ? 'active' : ''}`} onClick={() => navigateTo('/pacientes')}>
                <svg xmlns='http://www.w3.org/2000/svg' className='svgLogoFooter' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                  <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z' />
                </svg>
                <p>Pacientes</p>
              </button>
            </li>
            <li>
              <button className={`botonHeader botonHeaderFooter grupoBotones ${activeButton === 'Tareas' ? 'active' : ''}`} onClick={() => navigateTo('/tareas')}>
                <svg xmlns='http://www.w3.org/2000/svg' className='svgLogoFooter' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                  <path d='m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05' />
                </svg>
                <p>Tareas</p>
              </button>
            </li>
            <li>
              <button className={`botonHeader botonHeaderFooter grupoBotones ${activeButton === 'Estadisticas' ? 'active' : ''}`} onClick={() => navigateTo('/estadisticas')}>
                <svg xmlns='http://www.w3.org/2000/svg' className='svgLogoFooter' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z' />
                </svg>
                <p>Estadísticas</p>
              </button>
            </li>
            <li>
              <button className={`botonHeader botonHeaderFooter grupoBotones ${activeButton === 'Configuración' ? 'active' : ''}`} onClick={() => navigateTo('/configuracion')}>
                <svg xmlns='http://www.w3.org/2000/svg' id='exitLogo' className='svgLogoFooter' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                </svg>
                <p>Configuración</p>
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
