/**
 * @module botonesConf
 * @description comonentes para manejar los botones de eliminación de la pagina de configuración.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React from 'react'
import { useTableData, select } from '../../datos/funcionesGlobales'
import axiosInstance from '../../datos/apis/axiosInstance'
import { useEstado } from '../../datos/EstadoContext'
import $ from 'jquery'
import '../header/headerMainCss.scss'
import '../../header/headerStyle.scss'
import '../../datos/panelesFlotantes.scss'
import '../css/configuracion.scss'

import LoadEquipo from '../../datos/apis/get/loadEquipo'
import LoadCS from '../../datos/apis/get/loadCS'
import LoadPorfesionales from '../../datos/apis/get/loadPorfesionales'

interface DatosConfProps {
  condicion: string

}
/**
 * Componente que muestra botones de configuración para agregar y eliminar elementos.
 * @module BotonesConf
 * @category Componentes
 * @param {Object} props - Propiedades para el componente.
 * @param {string} props.condicion - Condición para determinar el tipo de botón.
 */
const BotonesConf: React.FC<DatosConfProps> = ({ condicion }) => {
  const { table, tableID, setTable, setTableID } = useEstado()
  let nombre: string
  const index: number = 0
  if (condicion === 'agregarCS') {
    nombre = 'agregarCS'
  } else if (condicion === 'agregarEquipo') {
    nombre = 'agregarEquipo'
  } else {
    nombre = 'agregarProfesional'
  }

  /**
   * Maneja el clic en el botón de eliminación.
   * @function deleteButtonClick
   * @returns {Promise<void>}
   */
  const deleteButtonClick = async (): Promise<void> => {
    const partes: string[] = select.split(',')

    const deleteRequests = $('.idEvaluar').map(async function () {
      const element = $(this)
      const valor = (element[0] as HTMLInputElement).value.trim()

      for (const parte of partes) {
        if (valor === parte.trim()) {
          try {
            await deleteByTableType(table, tableID)

            element.closest('tr').fadeOut(500, function () {
              $(this).remove() // Elimina la fila completa después de la animación
            })
          } catch (error) {
            console.error(`Error deleting with id ${valor}:`, error)
          }
        }
      }
    })

    // Esperar a que todas las solicitudes de eliminación se completen
    await Promise.all(deleteRequests.toArray())
  }

  /**
   * Elimina el elemento de la tabla según su tipo.
   * @function deleteByTableType
   * @param {string} table - Tipo de tabla.
   * @param {string} tableID - ID del elemento en la tabla.
   * @returns {Promise<void>}
   */
  const deleteByTableType = async (table: string, tableID: string): Promise<void> => {
    if (table === 'profesionales') {
      await axiosInstance.delete(`/profesionales/delete/${tableID}`)
      await LoadPorfesionales()
    } else if (table === 'equipo') {
      await axiosInstance.delete(`/equipo/delete/${tableID}`)
      await LoadEquipo()
    } else if (table === 'cs') {
      await axiosInstance.delete(`/CS/delete/${tableID}`)
      await LoadCS()
    }
    setTable('')
    setTableID('')
  }

  const {
    showDialog
  } = useTableData(nombre)

  return (
    <div className='button-group botonesConf-container'>
      <button className='settings-icon botonesConf' type='button' onClick={() => showDialog?.(index)}>Añadir</button>
      <button className='buttonPanelRed botonesConf' type='button' onClick={deleteButtonClick}>Eliminar</button>
    </div>
  )
}

export default BotonesConf
