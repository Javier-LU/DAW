import React, { useState, useEffect } from 'react'
import { useTableData, select } from '../../datos/funcionesGlobales'
import './headerMainCss.scss'
import '../../header/headerStyle.scss'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'

interface HeaderMainPTProps {
  principal: string
  boton: string
  navItems: string[]
  mostrarElementos: boolean
  mostrarElementosPapeleraLupa:boolean
}

const HeaderMainPT: React.FC<HeaderMainPTProps> = ({ principal, boton, navItems, mostrarElementos, mostrarElementosPapeleraLupa }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const {
    showDialog

  } = useTableData('agregarPaciente')
  const index = 0
  const handleButtonClick = (index: number): void => {
    setActiveIndex(index)
  }

  const deleteButtonClick = (): void => {
    // Lógica de la función de eliminación

    const partes: string[] = select.split(',')
    console.log($('.idEvaluar'))
    console.log('--------------------------------------------------------------------')
    $('.idEvaluar').each(function () {
      const element = $(this)
      const valor = (element[0] as HTMLInputElement).value
      console.log(valor)
      // Imprime el elemento jQuery
      partes.forEach(function (parte) {
        console.log(valor, '  __  ', parte)
        if (valor.trim() === parte.trim()) {
          // Si el valor coincide con alguno de los elementos del array partes
          console.log(valor, ' coincide con partes')
          element.closest('tr').fadeOut(500, function () {
            $(this).remove() // Elimina la fila completa después de la animación
          })
        }
      })
    })
  }

  useEffect(() => {
    setActiveIndex(0)
  }, [])

  return (
    <div className='main-container'>
      <div className='main-container-level'>

        <div className='main-header'>
          <h2 id='titulo'>{principal}</h2>
          {mostrarElementos && (

            <button className='settings-icon' onClick={() => showDialog?.(index)}>{boton}</button>
          )}
        </div>
        {mostrarElementos && (
          <div className='main-item'>
            <nav>
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className={activeIndex === index ? 'active' : ''}>
                    <button onClick={() => handleButtonClick(index)}>{item}</button>
                  </li>
                ))}
              </ul>
            </nav>
            {mostrarElementosPapeleraLupa && (
            <div className='menuBuscarEliminar'>
              <div className='form-group lupaContainer'>
                <input type='search' id='buscar' name='q' placeholder='Buscar...' />
                <svg className='search-icon' id='lupa' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </div>
              <button className='delete-button' onClick={deleteButtonClick}>
                <svg xmlns='http://www.w3.org/2000/svg' className='svgLogo' fill='currentColor' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5' />
                </svg>
              </button>
            </div>  )}
          </div>
        )}
      </div>
    </div>
   
  )
}

export default HeaderMainPT
