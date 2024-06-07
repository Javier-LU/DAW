/**
 * @module loadDatosConfiguracion
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadEquipoData = async (): Promise<void> => {
  const response = await axiosInstance.get('/equipo/counts')
  const transformedData: datos.RowDatosConf[] = []

  const item = response.data
  const transformedItem: datos.RowDatosConf = {
    totalEquipos: item.Total,
    totalProfesionales: item.TotalProfesionales,
    TotalEquipo: item.Total,
    Medicos: item.Médicos,
    Enfermeras: item.Enfermeros,
    Auxiliar: item.AuxiliaresMédicos,
    Administrativo: item.Administrativos
  }
  transformedData.push(transformedItem)

  // Actualizar los datos globales
  datos.updateDatosConf(transformedData)
}

export default loadEquipoData
