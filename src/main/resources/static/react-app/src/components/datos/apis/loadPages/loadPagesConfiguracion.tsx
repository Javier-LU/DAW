/**
 * @module agregarCSComp
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import LoadEquipo from '../get/loadEquipo'
import LoadCS from '../get/loadCS'
import LoadListaProfesiones from '../get/loadListaProfesiones'
import LoadPorfesionales from '../get/loadPorfesionales'
import LoadDatosConfiguracion from '../get/loadDatosConfiguracion'

const loadAllData = async (): Promise<void> => {
  try {
    await LoadDatosConfiguracion()
    await LoadEquipo()
    await LoadCS()
    await LoadPorfesionales()
    await LoadListaProfesiones()
  } catch (error) {
    console.error('Error loading all data:', error)
  }
}

export default loadAllData
