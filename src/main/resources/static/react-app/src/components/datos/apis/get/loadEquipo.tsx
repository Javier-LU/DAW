/**
 * @module agregarCSComp
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadTareaData = async (): Promise<void> => {
  const response = await axiosInstance.get('/equipo/all')
  const transformedData: datos.RowDataEquipo[] = []

  for (const item of response.data) {
    const transformedItem: datos.RowDataEquipo = {
      id: item.id.toString(),
      equipo: item.equipo ?? '......',
      centro: item.centro ?? '......',
      medico: {
        nombre: item.medico.nombre ?? '......',
        primerApellido: item.medico.primerApellido ?? '......',
        segundoApellido: item.medico.segundoApellido ?? '......',
        id: item.medico.id ?? '......'
      },
      enfermera: {
        nombre: item.enfermero.nombre ?? '......',
        primerApellido: item.enfermero.primerApellido ?? '......',
        segundoApellido: item.enfermero.segundoApellido ?? '......',
        id: item.enfermero.id ?? '......'
      },
      auxiliar: {
        nombre: item.auxiliar.nombre ?? '......',
        primerApellido: item.auxiliar.primerApellido ?? '......',
        segundoApellido: item.auxiliar.segundoApellido ?? '......',
        id: item.auxiliar.id ?? '......'
      },
      administrativo: {
        nombre: item.administrativo.nombre ?? '......',
        primerApellido: item.administrativo.primerApellido ?? '......',
        segundoApellido: item.administrativo.segundoApellido ?? '......',
        id: item.administrativo.id ?? '......'
      }
    }
    transformedData.push(transformedItem)
  }


  // Actualizar los datos globales
  datos.updateDataEquipo(transformedData)
}
export default loadTareaData
