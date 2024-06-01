import { useState, useEffect } from 'react'
import * as datos from '../datosGlobales'

interface TableDataHook {
  data: datos.RowData[]
  setData: React.Dispatch<React.SetStateAction<datos.RowData[]>>
  dataCS: datos.RowDataCS[]
  dataEn: datos.RowDataEnfermedad[]
  dataE: datos.RowDataEquipo[]
  dataEx: datos.RowDataSa[]
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

export const useTableData = (llaveShowDialog: string): Partial<TableDataHook> => {
  const [data, setData] = useState<datos.RowData[]>(datos.initialData)
  const [dataCS] = useState<datos.RowDataCS[]>(datos.initialDataCS)
  const [dataEn] = useState<datos.RowDataEnfermedad[]>(datos.initialDataEnfermedad)
  const [dataE] = useState<datos.RowDataEquipo[]>(datos.initialDataEquipo)
  const [dataEx] = useState<datos.RowDataSa[]>(datos.initialDataSa)
  const [paciente, setPaciente] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof datos.RowData, direction: 'ascending' | 'descending' } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([])
  const [selectedHeader, setSelectedHeader] = useState<keyof datos.RowData | null>(null)

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

  const handleInputChange = (index: number, field: keyof datos.RowData, value: string | number): void => {
    const newData = [...data]

    if (field === 'nacimiento') {
      newData[index][field] = value as never
      newData[index].edad = calculateAge(value as string) // Update age based on birthdate
    } else if (field === 'edad') {
      newData[index][field] = Number(value)
    } else {
      newData[index][field] = value as never
    }
    setData(newData)
  }

  const toggleHistorico = (index: number): void => {
    const newData = [...data]
    newData[index].historico = newData[index].historico === 'Active' ? 'Inactive' : 'Active'
    setData(newData)
  }

  const toggleResidencia = (index: number): void => {
    const newData = [...data]
    newData[index].residencia = newData[index].residencia === 'Sí' ? 'No' : 'Sí'
    setData(newData)
  }

  const handleSelectChange = <K extends keyof datos.RowData>(index: number, field: K, value: datos.RowData[K]): void => {
    const newData = [...data]
    newData[index][field] = value
    if (field === 'salida' && value === 'activo') {
      newData[index].fechaSalida = '' as never
      newData[index].lugarSalida = '' as never
    }
    setData(newData)
  }

  const showDialog = (index: number): void => {
    if (llaveShowDialog === 'agregarTarea') {
      const selectedId = data[index].id
      setSelectedRows([selectedId])
      const selectedRow = data.find(row => row.id === selectedId)
      console.log(selectedRow)
      if (selectedRow != null) {
        const pacienteNombreCompleto = `${selectedRow.nombre} ${selectedRow.primerApellido} ${selectedRow.segundoApellido}`
        const selectElement = document.getElementById('selectPaciente') as HTMLSelectElement

        const option = document.createElement('option')
        option.value = selectedId
        option.text = pacienteNombreCompleto
        option.selected = true
        selectElement.add(option, selectElement.options[0]) // Insertar como la primera opción
      }
    }
    const dialog = document.getElementById(llaveShowDialog) as HTMLDialogElement | null
    // Comparar el ID de selectedPaciente con todos los IDs en selectedRows

    if (dialog != null) {
      dialog.showModal()
    }
  }

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

  const sortData = (key: keyof datos.RowData): void => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if ((sortConfig != null) && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })

    setSortConfig({ key, direction })
    setData(sortedData)
    setSelectedHeader(key)
  }

  const handleRowClick = (index: number, event: React.MouseEvent): void => {
    const isShiftPressed = event.shiftKey
    const id = data[index].id
    console.log('Row Clicked:', id)

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
    }
    console.log('Selected Rows after click:', selectedRows)
  }

  const handleOutsideClick = (event: MouseEvent): void => {
    if ((event.target as HTMLElement).closest('.custom-table') == null) {
      console.log('elim', selectedRows)
      // setSelectedRows([])
    }
  }

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
  } else {
    return { selectedRows, showDialog }
  }
}
