import { useRef, useEffect } from 'react'
import '../../datos/panelesFlotantes.scss'
import $ from 'jquery'

function AgregarTarea (): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }
/*    useEffect(() => {
    if (dialogRef.current != null) {
      dialogRef.current.showModal()
    }
  }, []) */ 

  const submit = (event: React.FormEvent): void => {
    event.preventDefault()
      
    const fields = [
      '#centroCSPanel',
      '#direccionCSPanel',
      '#telefonoCSPanel',


    ]

    let valid = true
    fields.forEach((field) => {

      if ($(field).val() === '' || $(field).val() === null) {
        valid = false
        $(field).css('border', '1px solid red')
      } else { 
        $(field).css('border', '')   
      }
    })

    if (valid) {
      const dataToSend = {
        centro: $('#centroCSPanel').val(),
        direccion: $('#direccionCSPanel').val(),
        telefono: $('#telefonoCSPanel').val()
      }
      console.log('Formulario enviado:', dataToSend)
      closeDialog()
    }
  }

  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarCS' className='login-dialog'>

        <div className='login'>
          <h2>Agregar un Centro de Salud</h2>
          <form onSubmit={submit}>
            <div className='form-group form-group-individual '>
              <label htmlFor='centroCS'>Centro</label>
              <input type='text' id='centroCSPanel' name='centroCS' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='direccionCS'>Dirección</label>
              <input type='text' id='direccionCSPanel' name='direccionCS' placeholder='--------' pattern='[A-Za-z\s,.-]+' title='Solo letras, espacios y caracteres especiales comunes (coma, punto, guión)' />
            </div>
            <div className='form-group form-group-individual '>
              <label htmlFor='telefonoCS'>Telefono</label>
              <input type='tel' id='telefonoCSPanel' name='telefonoCS' placeholder='--------' pattern='\d{10}' title='Debe contener 10 dígitos consecutivos' />
            </div>
            <div className='button-group'>
              <button className='buttonPanelRed botonModificado' type='submit'>Aceptar</button>
              <button className='buttonPanelCancel botonModificado' type='button' onClick={closeDialog}>Cancelar</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default AgregarTarea
