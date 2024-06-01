import { useRef, useEffect, useState } from 'react'
import '../../datos/panelesFlotantes.scss'
import * as datos from '../../datos/datosGlobales'
import $ from 'jquery'

function AgregarTarea(): JSX.Element {
  const [cs] = useState<datos.RowDataCS[]>(datos.initialDataCS)
  const [sanitarios] = useState<datos.RowDataPro[]>(datos.initialDataPro)
  const [formData, setFormData] = useState({
    centroSalud: 'default',
    nombreGrupo: '',
    medico: 'default',
    enfermero: 'default',
    auxiliar: 'default',
    administrativo: 'default'
  })
  const medicos = sanitarios.filter(persona => persona.profesion === 'medico')
  const nombresMedicos = medicos.map(medico => `${medico.nombre} ${medico.primerApellido} ${medico.segundoApellido}`)

  const enfermeras = sanitarios.filter(persona => persona.profesion === 'enfermera')
  const nombresEnfermera = enfermeras.map(enfermera => `${enfermera.nombre} ${enfermera.primerApellido} ${enfermera.segundoApellido}`)

  const auxiliares = sanitarios.filter(persona => persona.profesion === 'administrativo')
  const nombresAuxiliar = auxiliares.map(uxiliar => `${uxiliar.nombre} ${uxiliar.primerApellido} ${uxiliar.segundoApellido}`)

  const administrativos = sanitarios.filter(persona => persona.profesion === 'auxiliar')
  const nombresAdministrativo = administrativos.map(administrativo => `${administrativo.nombre} ${administrativo.primerApellido} ${administrativo.segundoApellido}`)


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
  }, [])  */

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const submit = (event: React.FormEvent): void => {
    event.preventDefault()
   
    const fields = [
      '#enfermeroPanel',
      '#medicoPanel',
      '#centroSaludPanel',
      '#nombreGrupoPanel',
      '#auxiliarPanel',
      '#administrativoPanel'

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
      const getProfesionalId = (nombreCompleto: string) => {
        const profesional = sanitarios.find(pro => `${pro.nombre} ${pro.primerApellido} ${pro.segundoApellido}` === nombreCompleto)
        return profesional ? profesional.id : null
      }
      const getCentroSaludId = (nombreCentro: string) => {
        const centro = cs.find(c => c.cs === nombreCentro)
        return centro ? centro.id : null
      }

      const dataToSend = {
        centroSalud: getCentroSaludId(formData.centroSalud),
        nombreGrupo: formData.nombreGrupo,
        medicoId: getProfesionalId(formData.medico),
        enfermeroId: getProfesionalId(formData.enfermero),
        auxiliarId: getProfesionalId(formData.auxiliar),
        administrativoId: getProfesionalId(formData.administrativo)
      }
      console.log('Formulario enviado:', dataToSend)

      closeDialog()
    }
  }


  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarEquipo' className='login-dialog'>

        <div className='login'>
          <h2>Crear un equipo</h2>
          <form onSubmit={submit}>

            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <div className='form-group'>
                  <label htmlFor='nombreGrupo'>Nombre</label>
                  <input type='text' id='nombreGrupoPanel' name='nombreGrupo' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios'  onChange={handleInputChange}/>
                </div>
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='centroReferencia'>Centro</label>
               
                <select
                  name='centroSalud'
                  id='centroSaludPanel'
                  value={formData.centroSalud}
                  onChange={handleInputChange}           
                >
                  <option value='default' disabled>....</option>
                  {cs.map((centro, csIndex) => (
                    <option key={csIndex} value={centro.cs}>{centro.cs}</option>
                  ))}
                </select>

              </div>

            </div>

            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='medico'>Médico/a</label>
                
                <select
                  name='medico'
                  id='medicoPanel'
                  value={formData.medico}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresMedicos.map((nombre, index) => (
                    <option key={index} value={nombre}>{nombre}</option>
                  ))}
                </select>
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='enfermero'>Enfermero/a</label>

                <select
                  name='enfermero'
                  id='enfermeroPanel'
                  value={formData.enfermero}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresEnfermera.map((nombre, index) => (
                    <option key={index} value={nombre}>{nombre}</option>
                  ))}
                </select>

              </div>
            </div>

            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='auxiliar'>Auxiliar</label>
               
                <select
                  name='auxiliar'
                  id='auxiliarPanel'
                  value={formData.auxiliar}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresAuxiliar.map((nombre, index) => (
                    <option key={index} value={nombre}>{nombre}</option>
                  ))}
                </select>

              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='administrativo'>Administrativo</label>
                
                <select
                  name='administrativo'
                  id='administrativoPanel'
                  value={formData.administrativo}
                  onChange={handleInputChange}
                >
                  <option value='default' disabled>....</option>
                  {nombresAdministrativo.map((nombre, index) => (
                    <option key={index} value={nombre}>{nombre}</option>
                  ))}
                </select>

              </div>
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
