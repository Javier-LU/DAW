/**
 * @module loadListaTareas
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadTareaData = async (): Promise<void> => {
  const response = await axiosInstance.get('/allTareas')
  const transformedData: datos.RowDataT[] = []

  for (const item of response.data) {
    const transformedItem: datos.RowDataT = {
      id: item.id.toString(),
      tareas: item.listaTarea ?? '......'
    }
    transformedData.push(transformedItem)
  }

  // Actualizar los datos globales
  datos.updateDataT(transformedData)
}
export default loadTareaData
