/**
 * @module loadPacienteData
 * @description  Función asincrónica que carga todos los datos necesarios.
 * @returns {Promise<void>} Promesa vacía que indica la finalización de la carga.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import axiosInstance from '../axiosInstance'
import * as datos from '../../datosGlobales'

const loadTareaData = async (condicion: string, equipo: string): Promise<void> => {
  let response

  if (condicion === 'todos') {
    response = await axiosInstance.get('/usuarios/all')
  } else if (condicion === 'equipo') {
    if (equipo.includes('equipo')) {
      equipo = equipo.split('_')[1]
    }
    response = await axiosInstance.get('/usuarios/getEquipo/' + equipo)
  } else if (condicion === 'historicosF') {
    response = await axiosInstance.get('/usuarios/historico?historico=false')
  } else if (condicion === 'buscar') {
    response = await axiosInstance.get('/usuarios/BuscarTresValores/' + equipo)
  } else {
    response = await axiosInstance.get('/usuarios/historico?historico=true')
  }
  console.log(condicion, response)
  const transformedData: datos.RowData[] = []

  for (const item of response.data) {
    const transformedItem: datos.RowData = {
      id: item.id?.toString() ?? '......',
      historico: item.historico === true ? 'Active' : 'Inactive',
      equipo: item.equipo?.equipo ?? '......',
      tarea: item.equipo?.tarea ?? 0,
      fechaIngreso: item.ingreso ?? '......',
      nombre: item.nombre ?? '......',
      primerApellido: item.primerApellido ?? '......',
      segundoApellido: item.segundoApellido ?? '......',
      edad: item.edad ?? 0,
      dni: item.dni ?? '......',
      nacimiento: item.fechaNacimiento ?? '......',
      residencia: item.residencia === true ? 'Yes' : 'No',
      direccion: item.direccionResidencia ?? '......',
      telefono: item.telefonoResidencia ?? '......',
      centroSalud: item.centroSalud?.cs ?? '......',
      enfermedad: item.enfermedad?.enfermedad ?? '......',
      salida: item.tipoSalida?.listaSalida ?? '......',
      fechaSalida: item.lugarFecha ?? '......',
      lugarSalida: item.lugarSalida ?? '......'
    }
    transformedData.push(transformedItem)
  }

  console.log(transformedData)
  datos.updateData(transformedData)

  // Actualizamos los datos globales con el array completo
}

export default loadTareaData
