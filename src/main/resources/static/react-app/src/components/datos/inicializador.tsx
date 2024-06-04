/**
 * @module agregarCSComp
 * @description  * Componente que maneja la carga inicial de datos y la autenticación del usuario.
 * @param {InitialLoaderProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que representa el componente.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React, { useState, useEffect, ComponentType } from 'react'
import axiosInstance from './apis/axiosInstance' // Ajusta la ruta según tu estructura de proyecto

interface InitialLoaderProps {
  Component: ComponentType
  loadData: () => Promise<void>
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ Component, loadData }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('auth_token')
        if (typeof token === 'string' && token.trim() !== '') {
          const response = await axiosInstance.get('/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (response.data.valid === true) {
            setIsAuthenticated(true)
            await loadData()
          } else {
            setIsAuthenticated(false)
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error al cargar los datos iniciales:', error)
        setIsLoading(false)
        setIsAuthenticated(false)
      }
    }

    void fetchInitialData()
  }, [loadData])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>
  }

  return <Component />
}

export default InitialLoader
