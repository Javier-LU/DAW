/**
 * @module agregarCSComp
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadEstadisticasData = async (): Promise<void> => {
  const transformData = (key1: string, key2: string, array: any[], target: { key1Name: string, key2Name: string }): any[] => {
    const conjunto = []
    for (let i = 0; i < array.length; i++) {
      const item = {
        [target.key1Name]: array[i][0],
        [target.key2Name]: array[i][1]
      }
      conjunto.push(item)
    }

    return conjunto
  }

  let response
  response = await axiosInstance.get('/usuarios/usuariosPorEnfermedad')
  const transformedData: datos.RowDatosEnfe[] = response.data.map((item: [string, number]) => {
    let nombre = item[0].toLowerCase().replace(/_/g, ' ')
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1)

    return {
      nombre,
      total: item[1]
    }
  })

  datos.updateDatosEnfe(transformedData)
  // --------------------------------------------------------------------------------------------------------------------
  response = await axiosInstance.get('/usuarios/usuariosPorEquipo')
  const transformedPaMeData = transformData('nombre', 'valor', response.data, { key1Name: 'nombre', key2Name: 'valor' })

  datos.updateDatosPaMe(transformedPaMeData)
  // --------------------------------------------------------------------------------------------------------------------
  response = await axiosInstance.get('/usuarios/usuariosPorRangoEdad')
  const transformedEdadData = transformData('nombre', 'valor', response.data, { key1Name: 'nombre', key2Name: 'valor' })

  datos.updateDatosEdad(transformedEdadData)
  // --------------------------------------------------------------------------------------------------------------------
  response = await axiosInstance.get('/usuarios/usuariosPorCentroSalud')
  const transformedNCSData = transformData('nombre', 'valor', response.data, { key1Name: 'nombre', key2Name: 'valor' })

  datos.updateDatosNCS(transformedNCSData)
  // --------------------------------------------------------------------------------------------------------------------
}
export default loadEstadisticasData
