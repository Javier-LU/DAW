/**
 * @module mainHeader
 * @description Componente de encabezado principal para la interfaz de usuario.
 * Este componente muestra el título principal, botón de configuración y elementos de navegación.
 * Permite realizar acciones como cargar datos, buscar y eliminar elementos.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.principal - Título principal a mostrar.
 * @param {string} props.boton - Texto del botón de configuración.
 * @param {string[]} props.navItems - Elementos de navegación.
 * @param {boolean} props.mostrarElementos - Indicador de si se deben mostrar los elementos de navegación y el botón de configuración.
 * @param {boolean} props.mostrarElementosPapeleraLupa - Indicador de si se deben mostrar los elementos de búsqueda y eliminación.
 * @returns {JSX.Element} Elemento JSX que representa el encabezado principal.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React, { useState, useEffect } from 'react'
import { useTableData, select } from '../../datos/funcionesGlobales'
import LoadPacienteData from '../../datos/apis/get/loadPacienteData'
import axiosInstance from '../../datos/apis/axiosInstance'
import * as datos from '../../datos/datosGlobales'
import { useEstado } from '../../datos/EstadoContext'
import './headerMainCss.scss'
import '../../header/headerStyle.scss'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'

interface HeaderMainPTProps {
  principal: string
  boton: string
  navItems: string[]
  mostrarElementos: boolean
  mostrarElementosPapeleraLupa: boolean
}

const HeaderMainPT: React.FC<HeaderMainPTProps> = ({ principal, boton, navItems, mostrarElementos, mostrarElementosPapeleraLupa }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { incrementTrigger, setvariableMenu } = useEstado()
  const {
    showDialog

  } = useTableData('agregarTarea')
  const index = 0
  /**
   * Encuentra el ID de un equipo basado en su nombre.
   * @param {string} equipo - El nombre del equipo.
   * @returns {string | undefined} El ID del equipo o undefined si no se encuentra.
   */
  const findEquipoId = (equipo: string): string | undefined => {
    const found = datos.initialDataEquipo.find((item) => item.equipo === equipo)
    return found?.id
  }
  /**
   * Maneja el clic en el botón de navegación.
   * @param {number} index - El índice del elemento de navegación.
   * @param {string} text - El texto del elemento de navegación.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del clic.
   */
  const handleButtonClick = async (index: number, text: string): Promise<void> => {
    if (text === 'Activos') {
      await LoadPacienteData('historicosF', '0X')
      incrementTrigger()
    } else if (text === 'Historicos') {
      await LoadPacienteData('historicosV', '0X')
      incrementTrigger()
    } else {
      const id = findEquipoId(text)
      if (id !== null && id !== undefined) {
        await LoadPacienteData('equipo', id)
        incrementTrigger()
      }
    }
    setvariableMenu(text)
    setActiveIndex(index)
  }
  /**
   * Maneja el clic en el botón de eliminación.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del clic.
   */
  const deleteButtonClick = async (): Promise<void> => {
    const partes: string[] = select.split(',')

    const deleteRequests = $('.idEvaluar').map(async function () {
      const element = $(this)
      const valor = (element[0] as HTMLInputElement).value.trim()

      for (const parte of partes) {
        if (valor === parte.trim()) {
          try {
            await axiosInstance.delete(`/usuarios/delete/${valor}`)
            // Si la solicitud de eliminación es exitosa, elimina la fila de la tabla
            element.closest('tr').fadeOut(500, function () {
              $(this).remove() // Elimina la fila completa después de la animación
            })
          } catch (error) {
            console.error(`Error deleting user with id ${valor}:`, error)
          }
        }
      }
    })

    // Esperar a que todas las solicitudes de eliminación se completen
    await Promise.all(deleteRequests.toArray())
  }
  /**
   * Maneja el clic en el botón de búsqueda.
   * @returns {Promise<void>} Promesa vacía que indica la finalización del clic.
   */
  const searchButtonClick = async (): Promise<void> => {
    const searchString = $('#buscar').val() as string
    const searchParams = searchString.split(' ').reduce((acc, curr, index) => {
      if (index === 0) return acc + `?nombre=${curr}`
      if (index === 1) return acc + `&primerApellido=${curr}`
      if (index === 2) return acc + `&segundoApellido=${curr}`
      return acc
    }, '')

    await LoadPacienteData('buscar', searchParams)
    incrementTrigger()
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
                    <button onClick={async () => await handleButtonClick(index, item)}>{item}</button>
                  </li>
                ))}
              </ul>
            </nav>
            {mostrarElementosPapeleraLupa && (
              <div className='menuBuscarEliminar'>
                <div className='form-group lupaContainer'>
                  <input type='search' id='buscar' name='q' placeholder='Buscar...' />
                  <svg className='search-icon' id='lupa' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' onClick={searchButtonClick}>
                    <path d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </div>
                <button className='delete-button' onClick={deleteButtonClick}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='svgLogo' fill='currentColor' viewBox='0 0 16 16'>
                    <path fillRule='evenodd' d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5' />
                  </svg>
                </button>
              </div>)}
          </div>
        )}
      </div>
    </div>

  )
}

export default HeaderMainPT
