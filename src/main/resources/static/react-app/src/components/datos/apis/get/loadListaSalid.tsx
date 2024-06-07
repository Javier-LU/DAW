/**
 * @module loadListaSalid
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadTareaData = async (): Promise<void> => {
  const response = await axiosInstance.get('/allSalida')
  const transformedData: datos.RowDataSa[] = []

  for (const item of response.data) {
    const transformedItem: datos.RowDataSa = {
      id: item.id.toString(),
      salida: item.listaSalida ?? '......'
    }
    transformedData.push(transformedItem)
  }

  // Actualizar los datos globales
  datos.updateDataSa(transformedData)
}
export default loadTareaData
