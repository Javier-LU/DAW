/**
 * @module agregarCSComp
 * @description  * Hook personalizado que gestiona los datos de la tabla y proporciona funciones para manipularlos.
 * @param {string} llaveShowDialog - Indica qué tipo de diálogo se debe mostrar.
 * @returns {Partial<TableDataHook>} Objeto con propiedades y funciones para manipular los datos de la tabla.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { useState, useEffect } from 'react'
import * as datos from './datosGlobales'
import axiosInstance from './apis/axiosInstance'

interface TableDataHook {
  data: datos.RowData[]
  setData: React.Dispatch<React.SetStateAction<datos.RowData[]>>
  dataCS: datos.RowDataCS[]
  dataEn: datos.RowDataEnfermedad[]
  dataE: datos.RowDataEquipo[]
  dataEx: datos.RowDataSa[]
  dataPr: datos.RowDataPro[]
  paciente: string
  setPaciente: React.Dispatch<React.SetStateAction<string>>
  sortConfig: { key: keyof datos.RowData, direction: 'ascending' | 'descending' } | null
  setSortConfig: React.Dispatch<React.SetStateAction<{ key: keyof datos.RowData, direction: 'ascending' | 'descending' } | null>>
  selectedRows: Array<string | number>
  setSelectedRows: React.Dispatch<React.SetStateAction<Array<string | number>>>
  selectedHeader: keyof datos.RowData | null
  setSelectedHeader: React.Dispatch<React.SetStateAction<keyof datos.RowData | null>>
  calculateAge: (birthdate: string) => number
  handleInputChange: (index: number, field: keyof datos.RowData, value: string | number) => void
  toggleHistorico: (index: number) => void
  toggleResidencia: (index: number) => void
  handleSelectChange: <K extends keyof datos.RowData>(index: number, field: K, value: datos.RowData[K]) => void
  showDialog: (index: number) => void
  formatDateString: (dateString: string) => string
  sortData: (key: keyof datos.RowData) => void
  handleRowClick: (index: number, event: React.MouseEvent) => void
}

export let select: string

export const useTableData = (llaveShowDialog: string): Partial<TableDataHook> => {
  const [data, setData] = useState<datos.RowData[]>(datos.initialData)
  const [dataCS] = useState<datos.RowDataCS[]>(datos.initialDataCS)
  const [dataEn] = useState<datos.RowDataEnfermedad[]>(datos.initialDataEnfermedad)
  const [dataE] = useState<datos.RowDataEquipo[]>(datos.initialDataEquipo)
  const [dataEx] = useState<datos.RowDataSa[]>(datos.initialDataSa)
  const [dataPr] = useState<datos.RowDataPro[]>(datos.initialDataPro)
  const [dataS] = useState<datos.RowDataSa[]>(datos.initialDataSa)

  const [paciente, setPaciente] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof datos.RowData, direction: 'ascending' | 'descending' } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([])
  const [selectedHeader, setSelectedHeader] = useState<keyof datos.RowData | null>(null)
  /**
   * Esta función toma una cadena como entrada y la normaliza eliminando los espacios en blanco y convirtiéndola a minúsculas.
   * @param {string} str - La cadena a normalizar.
   * @returns {string} La cadena normalizada.
   */
  const normalizeString = (str: string): string => {
    return str.replace(/\s+/g, '').toLowerCase()
  }
  /**
   * Esta función busca el ID de un centro de salud dado su nombre en la lista de datos de centros de salud.
   * @param {string} nombreCentro - El nombre del centro de salud.
   * @returns {string | null} El ID del centro de salud si se encuentra, de lo contrario, null.
   */
  const getCentroSaludId = (nombreCentro: string): string | null => {
    const centro = dataCS.find(c => normalizeString(c.cs) === normalizeString(nombreCentro))

    return (centro != null) ? centro.id : null
  }
  /**
   * Esta función busca el ID de una enfermedad dado su nombre en la lista de datos de enfermedades.
   * @param {string} idEnfermedad - El nombre de la enfermedad.
   * @returns {string | null} El ID de la enfermedad si se encuentra, de lo contrario, null.
   */
  const getEnfermedadId = (idEnfermedad: string): string | null => {
    const enfermedad = dataEn.find(e => normalizeString(e.enfermedad) === normalizeString(idEnfermedad))
    return (enfermedad != null) ? enfermedad.id : null
  }
  /**
   * Esta función busca el ID de un equipo dado su nombre en la lista de datos de equipos.
   * @param {string} idEquipo - El nombre del equipo.
   * @returns {string | null} El ID del equipo si se encuentra, de lo contrario, null.
   */
  const getEquipoId = (idEquipo: string): string | null => {
    const equipo = dataE.find(e => normalizeString(e.equipo) === normalizeString(idEquipo))

    return (equipo != null) ? equipo.id : null
  }
  /**
   * Esta función busca el ID de una salida dado su nombre en la lista de datos de salidas.
   * @param {string} nombreCentro - El nombre de la salida.
   * @returns {string | null} El ID de la salida si se encuentra, de lo contrario, null.
   */
  const getSalidadId = (nombreCentro: string): string | null => {
    const centro = dataS.find(c => normalizeString(c.salida) === normalizeString(nombreCentro))
    return (centro != null) ? centro.id : null
  }
  /**
   * Esta función formatea una fecha como una cadena "YYYY-MM-DD".
   * @param {Date} date - La fecha a formatear.
   * @returns {string} La fecha formateada como "YYYY-MM-DD".
   */
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }
  /**
   * Esta función transforma los datos de un objeto de entrada en el formato necesario para enviarlos a la API.
   * @param {any} data - Los datos a transformar.
   * @returns {Object} Los datos transformados.
   */
  const transformData = (data: any): any => {
    return {
      enPrograma: true,
      ingreso: formatDate(new Date()),
      equipoId: getEquipoId(data.equipo),
      nombre: data.nombre,
      primerApellido: data.primerApellido,
      segundoApellido: data.segundoApellido,
      dni: data.dni,
      direccionResidencia: data.direccion,
      telefonoResidencia: parseInt(data.telefono),
      fechaNacimiento: data.nacimiento,
      edad: data.edad,
      enfermedadId: getEnfermedadId(data.enfermedad),

      tipoSalidaId: getSalidadId(data.salida),
      lugarSalida: data.lugarSalida,
      lugarFecha: data.fechaSalida,
      centroSaludId: getCentroSaludId(data.centroSalud),
      historico: data.historico === 'Active',
      residencia: data.residencia === 'Sí'

    }
  }
  /**
   * Esta función envía los datos transformados a la API utilizando una solicitud PUT.
   * @param {string} id - El ID del usuario.
   * @param {any} dataToSend - Los datos a enviar a la API.
   * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la solicitud.
   */
  const sendApi = async (id: string, dataToSend: any): Promise<void> => {
    const transformedData = transformData(dataToSend)
    /*     dataToSend.enPrograma = true
    dataToSend.enfermedad = getEnfermedadId(dataToSend.enfermedadId)
    dataToSend.telefono = dataToSend.telefonoResidencia
    dataToSend.direccion = dataToSend.direccionResidencia
    dataToSend.equipoId = getEquipoId(dataToSend.equipoId)
    dataToSend.ingreso = formatDate(new Date())
    dataToSend.historico = false */
    // Imprimir los datos en JSON

    try {
      await axiosInstance.put(`/usuarios/update/${id}`, transformedData)
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }
  /**
   * Esta función calcula la edad de una persona basándose en su fecha de nacimiento.
   * @param {string} birthdate - La fecha de nacimiento en formato "YYYY-MM-DD".
   * @returns {number} La edad de la persona.
   */
  const calculateAge = (birthdate: string): number => {
    const [year, month, day] = birthdate.split('-').map(Number)
    const today = new Date()
    const birthDate = new Date(year, month - 1, day)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }
  /**
   * Esta función maneja el cambio de valor en un campo de entrada de la tabla.
   * Actualiza los datos en el estado y envía los datos actualizados a la API.
   * @param {number} index - El índice del elemento en los datos.
   * @param {keyof datos.RowData} field - El campo que se está actualizando.
   * @param {string | number} value - El nuevo valor del campo.
   * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización.
   */
  const handleInputChange = async (index: number, field: keyof datos.RowData, value: string | number): Promise<void> => {
    const newData = [...data]

    if (field === 'nacimiento') {
      newData[index][field] = value as never
      newData[index].edad = calculateAge(value as string)
    } else if (field === 'edad') {
      newData[index][field] = Number(value)
    } else {
      newData[index][field] = value as never
    }
    setData(newData)

    const updatedData = {
      ...newData[index],
      [field]: value,
      ...(field === 'nacimiento' && { edad: newData[index].edad })
    }

    await sendApi(newData[index].id, updatedData)
  }
  /**
   * Esta función cambia el estado de historico de un usuario entre "Activo" e "Inactivo".
   * Actualiza los datos en el estado y envía los datos actualizados a la API.
   * @param {number} index - El índice del elemento en los datos.
   * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización.
   */
  const toggleHistorico = async (index: number): Promise<void> => {
    const newData = [...data]
    newData[index].historico = newData[index].historico === 'Active' ? 'Inactive' : 'Active'
    setData(newData)

    const updatedData = newData[index]

    await sendApi(newData[index].id, updatedData)
  }
  /**
   * Esta función cambia el estado de residencia de un usuario entre "Sí" y "No".
   * Actualiza los datos en el estado y envía los datos actualizados a la API.
   * @param {number} index - El índice del elemento en los datos.
   * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización.
   */
  const toggleResidencia = async (index: number): Promise<void> => {
    const newData = [...data]
    newData[index].residencia = newData[index].residencia === 'Sí' ? 'No' : 'Sí'
    setData(newData)

    const updatedData = newData[index]

    await sendApi(newData[index].id, updatedData)
  }
  /**
   * Esta función maneja el cambio de valor en un campo de selección de la tabla.
   * Actualiza los datos en el estado y envía los datos actualizados a la API.
   * @template K
   * @param {number} index - El índice del elemento en los datos.
   * @param {K} field - El campo que se está actualizando.
   * @param {datos.RowData[K]} value - El nuevo valor del campo.
   * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización.
   */
  const handleSelectChange = async <K extends keyof datos.RowData>(index: number, field: K, value: datos.RowData[K]): Promise<void> => {
    const newData = [...data]
    newData[index][field] = value
    if (field === 'salida' && value === 'activo') {
      newData[index].fechaSalida = '' as never
      newData[index].lugarSalida = '' as never
    }
    setData(newData)

    const updatedData = newData[index]

    await sendApi(newData[index].id, updatedData)
  }
  /**
   * Esta función muestra un diálogo específico según la clave proporcionada.
   * Es utilizada para mostrar diferentes tipos de diálogos según la situación.
   * @param {number} index - El índice del elemento en los datos.
   * @returns {void}
   */
  const showDialog = (index: number): void => {
    if (llaveShowDialog === 'agregarTarea') {
      const selectedId = data[index].id
      setSelectedRows([selectedId])
      const selectedRow = data.find(row => row.id === selectedId)

      if (selectedRow != null) {
        const pacienteNombreCompleto = `${selectedRow.nombre} ${selectedRow.primerApellido} ${selectedRow.segundoApellido}`
        const selectElement = document.getElementById('selectPaciente') as HTMLSelectElement

        const option = document.createElement('option')
        option.value = selectedId
        option.text = pacienteNombreCompleto
        option.selected = true
        selectElement.add(option, selectElement.options[0])
      }
    }
    const dialog = document.getElementById(llaveShowDialog) as HTMLDialogElement | null

    if (dialog != null) {
      dialog.showModal()
    }
  }
  /**
   * Esta función formatea una cadena de fecha de diferentes formatos a "YYYY-MM-DD".
   * @param {string | null | undefined} dateString - La cadena de fecha a formatear.
   * @returns {string} La fecha formateada como "YYYY-MM-DD".
   */
  const formatDateString = (dateString: string | null | undefined): string => {
    if (dateString === null || dateString === undefined) {
      return ''
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (datePattern.test(dateString)) {
      return dateString
    }
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }
  /**
   * Esta función ordena los datos de la tabla según la clave proporcionada y la dirección de ordenamiento (ascendente o descendente).
   * @param {keyof datos.RowData} key - La clave por la que se va a ordenar.
   * @returns {void}
   */
  const sortData = (key: keyof datos.RowData): void => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if ((sortConfig != null) && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    const parseDate = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split('/').map(Number)
      return new Date(year, month - 1, day)
    }
    const isDateFormat = (dateStr: string): boolean => {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
      return dateRegex.test(dateStr)
    }
    const sortedData = [...data].sort((a, b) => {
      const aValue = typeof a[key] === 'string' && isDateFormat(a[key] as string) ? parseDate(a[key] as string) : a[key]
      const bValue = typeof b[key] === 'string' && isDateFormat(b[key] as string) ? parseDate(b[key] as string) : b[key]

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })

    setSortConfig({ key, direction })
    setData(sortedData)
    setSelectedHeader(key)
  }
  /**
   * Esta función maneja el clic en una fila de la tabla.
   * Actualiza el estado de las filas seleccionadas.
   * @param {number} index - El índice de la fila que se hizo clic.
   * @param {React.MouseEvent} event - El evento del clic del mouse.
   * @returns {void}
   */
  const handleRowClick = (index: number, event: React.MouseEvent): void => {
    const isShiftPressed = event.shiftKey
    let id: string

    if (llaveShowDialog === 'agregarTarea') {
      id = data[index].id
    } else if (llaveShowDialog === 'cuerpoGrupo') {
      id = dataE[index].id
    } else if (llaveShowDialog === 'cuerpoCS') {
      id = dataCS[index].id
    } else if (llaveShowDialog === 'cuerpoPro') {
      id = dataPr[index].id
    } else if (llaveShowDialog === 'papelEquipo') {
      id = dataPr[index].id
    } else {
      id = data[index].id
    }

    if (isShiftPressed) {
      setSelectedRows(prevSelectedRows => {
        if (prevSelectedRows.includes(id)) {
          return prevSelectedRows.filter(rowId => rowId !== id)
        } else {
          return [...prevSelectedRows, id]
        }
      })
    } else {
      setSelectedRows([id])
      select = selectedRows.join(', ')
    }
  }

  useEffect(() => {
    select = selectedRows.join(', ')
  }, [selectedRows])
  /**
 * Esta función maneja los clics fuera de la tabla para deseleccionar las filas seleccionadas.
 * @param {MouseEvent} event - El evento de clic fuera de la tabla.
 * @returns {void}
 */
  const handleOutsideClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement

    if (target.closest('.custom-table') == null && !target.classList.contains('delete-button')) {
      setSelectedRows([])
      select = selectedRows.join(', ')
    }
  }
  /**
 * Esta función configura un escuchador de eventos para manejar los clics fuera de la tabla.
 * @returns {void}
 */
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  if (llaveShowDialog === 'agregarTarea') {
    return {
      data,
      dataCS,
      dataEn,
      dataE,
      dataEx,
      paciente,
      setPaciente,
      sortConfig,
      setSortConfig,
      selectedRows,
      setSelectedRows,
      selectedHeader,
      setSelectedHeader,
      calculateAge,
      handleInputChange,
      toggleHistorico,
      toggleResidencia,
      handleSelectChange,
      showDialog,
      formatDateString,
      sortData,
      handleRowClick
    }
  } else if (llaveShowDialog === 'cuerpoGrupo') {
    return {
      dataE,
      selectedRows,
      handleRowClick
    }
  } else if (llaveShowDialog === 'cuerpoCS') {
    return {
      dataCS,
      selectedRows,
      handleRowClick
    }
  } else if (llaveShowDialog === 'cuerpoPro') {
    return {
      dataPr,
      selectedRows,
      handleRowClick
    }
  } else if (llaveShowDialog === 'papelEquipo') {
    return {
      dataCS,
      dataPr
    }
  } else {
    return { showDialog }
  }
}
