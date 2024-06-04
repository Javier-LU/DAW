/**
 * @module agregarCSComp
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import LoadPacienteData from '../get/loadPacienteData'
import LoadEquipo from '../get/loadEquipo'
import LoadCS from '../get/loadCS'
import LoadEnfermedad from '../get/loadEnfermedad'
import LoadSalida from '../get/loadListaSalid'
import LoadTareas from '../get/loadListaTareas'
import LoadListaProfesiones from '../get/loadListaProfesiones'

const loadAllData = async (): Promise<void> => {
  try {
    await LoadPacienteData('historicosF', '0X')
    await LoadEquipo()
    await LoadCS()
    await LoadEnfermedad()
    await LoadSalida()
    await LoadTareas()
    await LoadListaProfesiones()
  } catch (error) {
    console.error('Error loading all data:', error)
  }
}

export default loadAllData
