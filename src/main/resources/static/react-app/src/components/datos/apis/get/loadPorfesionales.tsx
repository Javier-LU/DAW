/**
 * @module loadPorfesionales
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadProfesionalesData = async (): Promise<void> => {
  const response = await axiosInstance.get('/profesionales/all')
  const transformedData: datos.RowDataPro[] = []

  for (const item of response.data) {
    if (item.nombre === 'Admin') {
      continue
    }

    const transformedItem: datos.RowDataPro = {
      id: item.id?.toString() ?? '......',
      nombre: item.nombre ?? '......',
      primerApellido: item.primerApellido ?? '......',
      segundoApellido: item.segundoApellido ?? '......',
      dni: item.dni ?? '......',
      profesion: item.cualificacion ?? '......', // Mapping cualificacion to profesion
      email: item.email ?? '......',
      telefono: item.telefono ?? '......', // Assuming no telefono in the response
      password: '........'
    }

    transformedData.push(transformedItem)
  }

  // Actualizar los datos globales
  datos.updateDataPro(transformedData)
}

export default loadProfesionalesData
