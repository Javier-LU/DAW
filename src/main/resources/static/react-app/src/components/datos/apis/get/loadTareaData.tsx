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
  const response = await axiosInstance.get('/tareas/all')

  const transformedData: datos.RowDataTareas[] = []

  for (const item of response.data) {
    const transformedItem: datos.RowDataTareas = {
      id: item.id.toString(),
      nombre: {
        nombre: item.usuario.nombre ?? '......',
        primerApellido: item.usuario.primerApellido ?? '......',
        segundoApellido: item.usuario.segundoApellido ?? '......'
      },
      tarea: item.tipoTarea.listaTarea ?? '......',
      fecha: item.fecha ?? '......',
      equipo: item.usuario.equipo.equipo ?? '......',
      nacimiento: item.usuario.fechaNacimiento ?? '......',
      direccion: item.usuario.direccionResidencia ?? '......',
      centroSalud: item.usuario.centroSalud.cs ?? '......',
      telefono: item.usuario.centroSalud.telefono ?? '......',
      idUsuario: item.usuario.id.toString() ?? '......'
    }

    transformedData.push(transformedItem)
  }

  // Actualizar los datos globales
  datos.updateDataTareas(transformedData)
}

export default loadTareaData
