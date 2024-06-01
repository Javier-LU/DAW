import React from 'react'

import { useTableData, select } from '../../datos/funcionesGlobales'
import $ from 'jquery'
import '../header/headerMainCss.scss'
import '../../header/headerStyle.scss'
import '../../datos/panelesFlotantes.scss'
import '../css/configuracion.scss'

interface DatosConfProps {
  condicion: string

}

const BotonesConf: React.FC<DatosConfProps> = ({ condicion }) => {
  let nombre: string
  const index: number = 0
  if (condicion === 'agregarCS') {
    nombre = 'agregarCS'
  } else if (condicion === 'agregarEquipo') {
    nombre = 'agregarEquipo'
  } else {
    nombre = 'agregarProfesional'
  }

  const deleteButtonClick = (): void => {
    // Lógica de la función de eliminación

    const partes: string[] = select.split(',')
    console.log($('.idEvaluar'))
    console.log('--------------------------------------------------------------------')
    $('.idEvaluar').each(function () {
      const element = $(this)
      const valor = (element[0] as HTMLInputElement).value
      console.log(valor)
      // Imprime el elemento jQuery
      partes.forEach(function (parte) {
        console.log(valor, '  __  ', parte)
        if (valor.trim() === parte.trim()) {
          // Si el valor coincide con alguno de los elementos del array partes
          console.log(valor, ' coincide con partes')
          element.closest('tr').fadeOut(500, function () {
            $(this).remove() // Elimina la fila completa después de la animación
          })
        }
      })
    })
  }


  const {
    showDialog
  } = useTableData(nombre)

  return (
    <div className='button-group botonesConf-container'>
      <button className='settings-icon botonesConf' type='button' onClick={() => showDialog?.(index)}>Añadir</button>
      <button className='buttonPanelRed botonesConf' type='button' onClick={deleteButtonClick}>Eliminar</button>
    </div>
  )
}

export default BotonesConf
