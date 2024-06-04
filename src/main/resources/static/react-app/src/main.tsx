/**
 * @module Main
 * @description Renderiza el componente principal de la aplicación en el elemento raíz del DOM, proporcionado por el ID 'root'.
 * Si el elemento raíz no se encuentra, se muestra un mensaje de error en la consola.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Asegúrate de que la extensión del archivo sea correcta si usas TypeScript.
import './components/datos/index.scss'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
} else {
  console.error('Failed to find the root element')
}
