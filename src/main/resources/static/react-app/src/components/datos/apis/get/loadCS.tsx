/**
 * @module loadCS
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadTareaData = async (): Promise<void> => {
  const response = await axiosInstance.get('/CS/all')
  const transformedData: datos.RowDataCS[] = []

  for (const item of response.data) {
    const transformedItem: datos.RowDataCS = {
      id: item.id.toString() ?? '......',
      cs: item.cs ?? '......',
      telefono: parseInt(item.telefono.replace(/\D/g, ''), 10) ?? '......', // Quitar caracteres no numéricos y convertir a número
      calle: item.calle ?? '......'
    }
    transformedData.push(transformedItem)
  }

  // Actualizar los datos globales
  datos.updateDataCS(transformedData)
}
export default loadTareaData
