
/**
 * @module agregarPacienteComp
 * @description Componente para agregar un nuevo paciente.
 * Este componente maneja la lógica para enviar los datos de un nuevo paciente al servidor y actualizar los datos correspondientes.
 * @returns {JSX.Element} Elemento JSX que contiene el formulario para agregar un nuevo paciente.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

import { useRef, useState } from 'react'
import '../../datos/panelesFlotantes.scss'
import * as datos from '../../datos/datosGlobales'
import axiosInstance from '../../datos/apis/axiosInstance'
import { useEstado } from '../../datos/EstadoContext'
import LoadPacienteData from '../../datos/apis/get/loadPacienteData'
import $ from 'jquery'

function AgregarTarea (): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [dataEn] = useState<datos.RowDataEnfermedad[]>(datos.initialDataEnfermedad)
  const [dataCS] = useState<datos.RowDataCS[]>(datos.initialDataCS)
  const [dataEqu] = useState<datos.RowDataEquipo[]>(datos.initialDataEquipo)
  const [selectedCS, setSelectedCS] = useState<string>('default')
  const [selectedEnfermedad, setSelectedEnfermedad] = useState<string>('default')
  const [selectedEquipo, setSelectedEquipo] = useState<string>('default')
  const { variableMenu, incrementTrigger } = useEstado()
  const closeDialog = (): void => {
    if (dialogRef.current != null) {
      dialogRef.current.close()
    }
  }
  const CSChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCS(e.target.value)
  }

  const enfermedadChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedEnfermedad(e.target.value)
  }

  const equipoChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedEquipo(e.target.value)
  }

  const enmascaramientoSubmit = (event: React.FormEvent): void => {
    submit(event).catch(error => {
      console.error('Error submitting form:', error)
    })
  }

  const submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const fields = [
      '#nombrePaciente',
      '#primerPaciente',
      '#segundoPaciente',
      '#fechaPaciente',
      '#DNIPaciente',
      '#direcciónPaciente',
      '#telefonoPaciente',
      '#centroSaludPanelPaciente',
      '#enfermedadPanelPaciente',
      '#equipoPanelPaciente'
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
      const normalizeString = (str: string): string => {
        return str.replace(/\s+/g, '').toLowerCase()
      }

      const getCentroSaludId = (nombreCentro: string): string | null => {
        const centro = dataCS.find(c => normalizeString(c.cs) === normalizeString(nombreCentro))

        return (centro != null) ? centro.id : null
      }

      const getEnfermedadId = (idEnfermedad: string): string | null => {
        const enfermedad = dataEn.find(e => normalizeString(e.enfermedad) === normalizeString(idEnfermedad))
        return (enfermedad != null) ? enfermedad.id : null
      }

      const getEquipoId = (idEquipo: string): string | null => {
        const equipo = dataEqu.find(e => normalizeString(e.equipo) === normalizeString(idEquipo))

        return (equipo != null) ? equipo.id : null
      }

      const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      }
      let centro = getCentroSaludId(selectedCS)
      console.log(centro)
      if (centro.includes('cs')) {
        centro = centro.split('_')[1]
      }
      console.log('selectedCS', centro, selectedCS)
      let equipo = selectedEquipo
      console.log(equipo)
      if (equipo.includes('equipo')) {
        equipo = equipo.split('_')[1]
      }
      console.log('selectedEnfermedad', selectedEnfermedad)
      // equipo = getEquipoId(equipo)
      // console.log('equipo', equipo)
      // getEnfermedadId(selectedEnfermedad)

      const dataToSend = {
        enPrograma: true,
        ingreso: formatDate(new Date()),
        equipoId: equipo, // Valor por defecto si es null
        nombre: $('#nombrePaciente').val(),
        primerApellido: $('#primerPaciente').val(),
        segundoApellido: $('#segundoPaciente').val(),
        dni: $('#DNIPaciente').val(),
        direccionResidencia: $('#direcciónPaciente').val(),
        telefonoResidencia: $('#telefonoPaciente').val(),
        fechaNacimiento: '1960-01-01', // Datos inventados
        edad: 64, // Datos inventados
        enfermedadId: selectedEnfermedad, // Valor por defecto si es null
        tipoSalidaId: 1, // Datos inventados
        lugarSalida: 'Hospital Central', // Datos inventados
        lugarFecha: '2024-04-27', // Datos inventados
        centroSaludId: centro, // Valor por defecto si es null
        historico: false
      }
      const jsonData = JSON.stringify(dataToSend, null, 2);

      console.log(jsonData)
      await axiosInstance.post('/usuarios/createUsuario', dataToSend)

      closeDialog()
      const findEquipoId = (equipo: string): string | undefined => {
        const found = datos.initialDataEquipo.find((item) => item.equipo === equipo)
        return found?.id
      }

      if (variableMenu === 'Activos') {
        await LoadPacienteData('historicosF', '0X')
        incrementTrigger()
      } else if (variableMenu === 'Historicos') {
        await LoadPacienteData('historicosV', '0X')
        incrementTrigger()
      } else {
        const id = findEquipoId(variableMenu)
        if (id !== null && id !== undefined) {
          await LoadPacienteData('equipo', id)
          incrementTrigger()
        }
      }
    }
  }

  /*   useEffect(() => {
    if (dialogRef.current != null) {
      dialogRef.current.showModal()
    }
  }, []) */

  return (
    <div className='contenedor-login'>
      <dialog ref={dialogRef} id='agregarPaciente' className='login-dialog'>
        <div className='login'>
          <h2>Agregar un nuevo paciente</h2>
          <form onSubmit={enmascaramientoSubmit}>
            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='nombrePaciente'>Nombre</label>
                <input type='text' id='nombrePaciente' name='nombrePaciente' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='primerPaciente'>Primer apellido</label>
                <input type='text' id='primerPaciente' name='primerPaciente' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
              </div>
            </div>
            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='segundoPaciente'>Segundo apellido</label>
                <input className='form-group-small' type='text' id='segundoPaciente' name='segundoPaciente' placeholder='--------' pattern='[A-Za-z\s]+' title='Solo letras y espacios' />
              </div>
              <div className='form-group duo-tres'>
                <label htmlFor='fechaPaciente'>Fecha</label>
                <input className='imput-small' type='date' id='fechaPaciente' name='fechaPaciente' placeholder='--------' pattern='\d{2}/\d{2}/\d{4}' title='Formato de fecha: dd/mm/yyyy' />
              </div>
              <div className='form-group duo-tres'>
                <label htmlFor='DNIPaciente'>DNI</label>
                <input className='imput-small' type='text' id='DNIPaciente' name='DNIPaciente' placeholder='--------' pattern='\d{8}[A-Za-z]' title='Formato de DNI: 8 dígitos seguidos de una letra' />
              </div>
            </div>
            <div className='form-group-duo form-group-duo-personalizado'>
              <div className='form-group duo-uno'>
                <label htmlFor='direcciónPaciente'>Dirección</label>
                <input type='text' id='direcciónPaciente' name='direcciónPaciente' placeholder='--------' pattern='[A-Za-z\s,.-]+' title='Solo letras, espacios y caracteres especiales comunes (coma, punto, guión)' />
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='telefonoPaciente'>Telefono</label>
                <input type='text' id='telefonoPaciente' name='telefonoPaciente' placeholder='--------' pattern='\d{10}' title='Debe contener 10 dígitos consecutivos' />
              </div>
            </div>
            <div className='form-group-duo'>
              <label className='form-group-duo-label-personalizado'>
                <input id='residencia' type='checkbox' name='condiciones' /> Vive actualmente en una residencia.
              </label>
            </div>
            <div className='form-group-duo'>
              <div className='form-group duo-uno'>
                <label htmlFor='centroSalud'>Centro de salud</label>
                <select
                  name='centroSalud'
                  className='selectStandar'
                  id='centroSaludPanelPaciente'
                  value={selectedCS}
                  onChange={CSChange}
                >
                  <option value='default' disabled>........</option>
                  {dataCS.map((cs: datos.RowDataCS, csIndex: number) => (
                    <option key={csIndex} value={cs.cs}>{cs.cs}</option>
                  ))}
                </select>
              </div>
              <div className='form-group duo-dos'>
                <label htmlFor='enfermedad'>Enfermedad</label>
                <select
                  name='enfermedad'
                  className='selectStandar'
                  id='enfermedadPanelPaciente'
                  value={selectedEnfermedad}
                  onChange={enfermedadChange}
                >
                  <option value='default' disabled>........</option>
                  {dataEn.map((enfermedad: datos.RowDataEnfermedad) => (
                    <option key={enfermedad.id} value={enfermedad.id}>{enfermedad.enfermedad}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className='form-group form-group-parche'>
              <label htmlFor='enfermedad'>Equipo</label>
              <select
                name='equipo'
                className='selectStandar'
                id='equipoPanelPaciente'
                value={selectedEquipo}
                onChange={equipoChange}
              >
                <option value='default' disabled>........</option>
                {dataEqu.map((equipo: datos.RowDataEquipo) => (
                  <option key={equipo.id} value={equipo.id}>{equipo.equipo}</option>
                ))}
              </select>
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
