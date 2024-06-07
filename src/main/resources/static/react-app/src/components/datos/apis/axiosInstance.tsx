/**
 * @module axiosInstance
 * @description  Configuración de Axios para realizar solicitudes HTTP a una API.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import axios from 'axios'

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8070' // Cambia esto a la URL base de tu API
})

/**
 * Interceptor para agregar el token de autorización a todas las solicitudes salientes.
 * @param {import('axios').AxiosRequestConfig} config - Configuración de la solicitud.
 * @returns {Promise<import('axios').AxiosRequestConfig>} - Configuración de la solicitud con el token de autorización agregado.
 */
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token')
    if (typeof token === 'string' && token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

export default axiosInstance
