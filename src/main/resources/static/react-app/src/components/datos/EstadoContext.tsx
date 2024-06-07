/**
 * @module EstadoContext
 * @description  Este módulo proporciona un contexto de estado y un hook personalizado para gestionar y acceder
 * a los estados globales de la aplicación. El contexto de estado contiene variables y funciones
 * relacionadas con el estado de la aplicación, como contadores de actualización, valores de menú,
 * identificadores de tablas y funciones para modificar estos estados.
 * El contexto de estado se crea utilizando React's Context API y se proporciona a los componentes
 * descendientes utilizando el componente `EstadoProvider`. El hook `useEstado` permite a los
 * componentes acceder al contexto de estado y utilizar sus estados y funciones asociadas.
 * @returns {JSX.Element} Elemento JSX que representa el componente.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface EstadoContextType {
  updateTrigger: number
  incrementTrigger: () => void
  variableMenu: string
  setvariableMenu: (value: string) => void
  updateTriggerTareas: number
  incrementTriggerTareas: () => void

  table: string
  setTable: (value: string) => void
  tableID: string
  setTableID: (value: string) => void

  confiVar: number
  incrementConfiVar: () => void

}

const EstadoContext = createContext<EstadoContextType | undefined>(undefined)

interface EstadoProviderProps {
  children: ReactNode
}
/**
 * Proveedor de estado que proporciona el contexto de estado a los componentes descendientes.
 * @param {EstadoProviderProps} props - Propiedades del proveedor de estado.
 * @returns {JSX.Element} Elemento JSX que representa el proveedor de estado.
 */
export const EstadoProvider: React.FC<EstadoProviderProps> = ({ children }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0)
  const [variableMenu, setvariableMenu] = useState('')
  const [updateTriggerTareas, setUpdateTriggerTareas] = useState(0)
  const [confiVar, setUpdateConfiVar] = useState(0)

  const [table, setTable] = useState('')
  const [tableID, setTableID] = useState('')

  const incrementTrigger = (): void => {
    setUpdateTrigger((prev) => prev + 1)
  }

  const incrementTriggerTareas = (): void => {
    setUpdateTriggerTareas((prev) => prev + 1)
  }

  const incrementConfiVar = (): void => {
    setUpdateConfiVar((prev) => prev + 1)
  }

  return (
    <EstadoContext.Provider value={{
      updateTrigger,
      incrementTrigger,
      updateTriggerTareas,
      incrementTriggerTareas,
      confiVar,
      incrementConfiVar,
      variableMenu,
      setvariableMenu,
      table,
      setTable,
      tableID,
      setTableID
    }}
    >
      {children}
    </EstadoContext.Provider>
  )
}
/**
 * Hook personalizado que permite acceder al contexto de estado.
 * @returns {EstadoContextType} Objeto con el contexto de estado.
 */
export const useEstado = (): EstadoContextType => {
  const context = useContext(EstadoContext)
  if (context == null) {
    throw new Error('useEstado debe usarse dentro de un EstadoProvider')
  }
  return context
}
