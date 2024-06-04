/**
 * @module agregarCSComp
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import LoadPacienteData from '../get/loadPacienteData'
import LoadEquipo from '../get/loadEquipo'
import LoadTareas from '../get/loadListaTareas'

import LoadTareasData from '../get/loadTareaData'

const loadAllData = async (): Promise<void> => {
  try {
    try {
      await LoadPacienteData('historicosF', '0X')
    } catch (error) {
      console.error('Error loading LoadPacienteData:', error)
    }

    try {
      await LoadEquipo()
    } catch (error) {
      console.error('Error loading LoadEquipo:', error)
    }

    try {
      await LoadTareas()
    } catch (error) {
      console.error('Error loading LoadTareas:', error)
    }

    try {
      await LoadTareasData()
    } catch (error) {
      console.error('Error loading LoadTareasData:', error)
    }
  } catch (error) {
    console.error('Error loading all data:', error)
  }
}

export default loadAllData
