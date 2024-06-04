/**
 * @module agregarCSComp
 * @description   Este archivo contiene definiciones de datos y funciones para gestionar datos iniciales y actualizarlos en diferentes secciones de la aplicación.
 * Define interfaces para estructurar los datos de pacientes, tareas, equipos, enfermedades, centros de salud, salidas, valores fijos, profesionales y profesiones.
 * También proporciona funciones para actualizar estos datos iniciales. Cada sección tiene una interfaz para los datos y una función para actualizar los mismos.
 * @author Francisco Javier Luque Pardo.
 * @date 2024-30-03
 */

// --------------------------------------------
// Datos generales para Pacientes
export interface RowData {
  id?: string | null
  historico?: string | null
  equipo?: string | null
  tarea?: number | null
  fechaIngreso?: string | null
  nombre?: string | null
  primerApellido?: string | null
  segundoApellido?: string | null
  edad?: number | null
  dni?: string | null
  nacimiento?: string | null
  residencia?: string | null
  direccion?: string | null
  telefono?: number | null
  centroSalud?: string | null
  enfermedad?: string | null
  salida?: string | null
  fechaSalida?: string | null
  lugarSalida?: string | null
}
export let initialData: RowData[] = [
  {
    id: 'afdgretert',
    historico: 'Active',
    equipo: 'Elena',
    tarea: 5,
    fechaIngreso: '05/06/2022',
    nombre: 'Manuel',
    primerApellido: 'Garcia',
    segundoApellido: 'Rodriguez',
    edad: 85,
    dni: '12345678Z',
    nacimiento: '05/06/1937',
    residencia: 'No',
    direccion: 'Calle Goya, 23',
    telefono: 9189189180,
    centroSalud: 'Alameda',
    enfermedad: 'Cosasssd',
    salida: 'Exitus',
    fechaSalida: '05/07/2023',
    lugarSalida: 'Hospital'

  },
  {
    id: 'sdfgret',
    historico: 'Inactive',
    equipo: 'Elena',
    tarea: 4,
    fechaIngreso: '10/11/2020',
    nombre: 'Elena',
    primerApellido: 'Lopez',
    segundoApellido: 'Martinez',
    edad: 78,
    dni: '87654321X',
    nacimiento: '12/05/1942',
    residencia: 'Yes',
    direccion: 'Calle Mayor, 15',
    telefono: 9189189180,
    centroSalud: 'Vallecas',
    enfermedad: 'Cosasssd',
    salida: 'exitus',
    fechaSalida: '01/03/2021',
    lugarSalida: 'Home'

  },
  {
    id: 'yjjky',
    historico: 'Active',
    equipo: 'Elena',
    tarea: 0,
    fechaIngreso: '20/08/2021',
    nombre: 'Juan',
    primerApellido: 'Perez',
    segundoApellido: 'Sanchez',
    edad: 65,
    dni: '56789012Y',
    nacimiento: '15/07/1956',
    residencia: 'No',
    direccion: 'Calle Sol, 45',
    telefono: 9189189180,
    centroSalud: 'Vallecas',
    enfermedad: 'Cosasssd',
    salida: 'Transfer',
    fechaSalida: '12/11/2021',
    lugarSalida: 'Another Hospital'

  },
  {
    id: 'kliuokjg',
    historico: 'Active',
    equipo: 'Roberto',
    tarea: 1,
    fechaIngreso: '14/02/2022',
    nombre: 'Luisa',
    primerApellido: 'Fernandez',
    segundoApellido: 'Diaz',
    edad: 72,
    dni: '34567890Z',
    nacimiento: '22/10/1949',
    residencia: 'No',
    direccion: 'Calle Luna, 7',
    telefono: 9189189180,
    centroSalud: 'El Pinar',
    enfermedad: 'Cosasssd',
    salida: 'Exitus',
    fechaSalida: '30/04/2023',
    lugarSalida: 'Hospital'

  },
  {
    id: 'uiyuyt',
    historico: 'Inactive',
    equipo: 'Roberto',
    tarea: 2,
    fechaIngreso: '01/05/2019',
    nombre: 'Carlos',
    primerApellido: 'Gomez',
    segundoApellido: 'Ruiz',
    edad: 80,
    dni: '23456789W',
    nacimiento: '09/09/1940',
    residencia: 'Yes',
    direccion: 'Calle Estrella, 10',
    telefono: 9189189180,
    centroSalud: 'El Pinar',
    enfermedad: 'Cosasssd',
    salida: 'Alta',
    fechaSalida: '15/02/2020',
    lugarSalida: 'Home'

  }
  // Repetir el objeto para cada fila...
]
export const updateData = (newData: RowData[]): void => {
  initialData = newData
}

// --------------------------------------------
// Datos generales para Tareas
export interface RowDataTareas {
  id: string
  nombre: Persona
  tarea: string
  fecha: string
  equipo: string
  nacimiento: string
  direccion: string
  centroSalud: string
  telefono: string
  idUsuario: string
}
export let initialDataTareas: RowDataTareas[] = [
  {
    id: 'uiyudsfsdyt',
    nombre: { nombre: 'cosa', primerApellido: 'nose', segundoApellido: 'si', id: 'asdafas' },
    tarea: 'LLamar',
    fecha: '09/09/1940',
    equipo: 'roberto',
    nacimiento: '09/09/1940',
    direccion: 'no se',
    centroSalud: 'Brunete',
    telefono: '9175683241',
    idUsuario: 'dsadasdasd'

  },
  {
    id: 'uiyuwerweyt',
    nombre: { nombre: 'cosa', primerApellido: 'nose', segundoApellido: 'si', id: 'asdafas' },
    tarea: 'Historia',
    fecha: '09/09/1940',
    equipo: 'roberto',
    nacimiento: '09/09/1940',
    direccion: 'no se',
    centroSalud: 'Brunete',
    telefono: '9175683241',
    idUsuario: 'dsadaerwesdasd'

  },
  {
    id: 'uiyutreyryt',
    nombre: { nombre: 'cosa', primerApellido: 'nose', segundoApellido: 'si', id: 'asdafas' },
    tarea: 'Visita',
    fecha: '09/09/1940',
    equipo: 'roberto',
    nacimiento: '09/09/1940',
    direccion: 'no se',
    centroSalud: 'Brunete',
    telefono: '9175683241',
    idUsuario: 'dsadatrygfsdasd'

  }

]
export const updateDataTareas = (newData: RowDataTareas[]): void => {
  initialDataTareas = newData
}

// --------------------------------------------
// Datos generales para Equipo
export interface Persona {
  nombre: string
  primerApellido: string
  segundoApellido: string
  id: string
}
export interface RowDataEquipo {
  id: string
  equipo: string
  centro: string
  medico: Persona
  enfermera: Persona
  auxiliar: Persona
  administrativo: Persona
}
export let initialDataEquipo: RowDataEquipo[] = [
  {
    id: 'asdafas',
    equipo: 'Elena',
    centro: 'Centro de Salud Norte',
    medico: { nombre: 'Juan', primerApellido: 'Pérez', segundoApellido: '', id: 'asdafas' },
    enfermera: { nombre: 'Ana', primerApellido: 'López', segundoApellido: '', id: 'asdafas' },
    auxiliar: { nombre: 'Carlos', primerApellido: 'Fernández', segundoApellido: '', id: 'asdafas' },
    administrativo: { nombre: 'María', primerApellido: 'García', segundoApellido: '', id: 'asdafas' }

  },
  {
    id: 'a534sdafas',
    equipo: 'Robert',
    centro: 'Centro de Salud Este',
    medico: { nombre: 'Juan', primerApellido: 'Pérez', segundoApellido: '', id: 'asdafas' },
    enfermera: { nombre: 'Ana', primerApellido: 'López', segundoApellido: '', id: 'asdafas' },
    auxiliar: { nombre: 'Carlos', primerApellido: 'Fernández', segundoApellido: '', id: 'asdafas' },
    administrativo: { nombre: 'María', primerApellido: 'García', segundoApellido: '', id: 'asdafas' }

  },
  {
    id: 'as647dafas',
    equipo: 'Paco',
    centro: 'Centro de Salud Sur',
    medico: { nombre: 'Juan', primerApellido: 'Pérez', segundoApellido: '', id: 'asdafas' },
    enfermera: { nombre: 'Ana', primerApellido: 'López', segundoApellido: '', id: 'asdafas' },
    auxiliar: { nombre: 'Carlos', primerApellido: 'Fernández', segundoApellido: '', id: 'asdafas' },
    administrativo: { nombre: 'María', primerApellido: 'García', segundoApellido: '', id: 'asdafas' }

  }

]
export const updateDataEquipo = (newData: RowDataEquipo[]): void => {
  initialDataEquipo = newData
}

// --------------------------------------------
// Datos generales para Enfermedad
export interface RowDataEnfermedad {
  id: string
  enfermedad: string
}
export let initialDataEnfermedad: RowDataEnfermedad[] = [
  {
    id: 'asdhhafas',
    enfermedad: 'Gripe'

  },
  {
    id: 'asdafjkyas',
    enfermedad: 'Covid'

  },
  {
    id: 'asdafasyu5',
    enfermedad: 'Estornudos'

  }

]
export const updateDataEnfermedad = (newData: RowDataEnfermedad[]): void => {
  initialDataEnfermedad = newData
}

// --------------------------------------------
// Datos generales para CS
export interface RowDataCS {
  id: string
  cs: string
  telefono: number
  calle: string
}
export let initialDataCS: RowDataCS[] = [
  {
    id: 'asdafa56es',
    cs: 'Alameda',
    telefono: 912586345,
    calle: 'no se'

  },
  {
    id: 'artersdafas',
    cs: 'Vallecas',
    telefono: 912586345,
    calle: 'no se'

  },
  {
    id: 'asda56rtfgfas',
    cs: 'El Pinar',
    telefono: 912586345,
    calle: 'no se no se'

  }

]
export const updateDataCS = (newData: RowDataCS[]): void => {
  initialDataCS = newData
}

// --------------------------------------------
// Datos generales para Salida
export interface RowDataSa {
  id: string
  salida: string
}
export let initialDataSa: RowDataSa[] = [
  {
    id: 'asday56uhfas',
    salida: 'exitus'

  },
  {
    id: 'asdaghffas',
    salida: 'alta'

  },
  {
    id: 'asdaty5fas',
    salida: 'abandono'

  },
  {
    id: 'asdasdfsesrfas',
    salida: 'activo'

  }

]
export const updateDataSa = (newData: RowDataSa[]): void => {
  initialDataSa = newData
}

// --------------------------------------------
// Datos generales para Valores Fijos
export interface RowDataVF {
  valoresFijos: string
}
export let initialDataVF: RowDataVF[] = [

  {
    valoresFijos: 'Activos'

  },
  {
    valoresFijos: 'Historicos'

  }

]
export const updateDataVF = (newData: RowDataVF[]): void => {
  initialDataVF = newData
}

// --------------------------------------------
// Datos generales para Tareas específicas
export interface RowDataT {
  id: string
  tareas: string
}
export let initialDataT: RowDataT[] = [
  {
    id: 'asdagdfgfas',
    tareas: 'LLamar'

  },
  {
    id: 'asdahfdtfas',
    tareas: 'Historia'

  },
  {
    id: 'asdahtrydfas',
    tareas: 'Visita'

  }

]
export const updateDataT = (newData: RowDataT[]): void => {
  initialDataT = newData
}

// --------------------------------------------
// Datos generales para Profesionales
export interface RowDataPro {

  id: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  dni: string
  profesion: string
  email: string
  telefono: string
  password: string
}
export let initialDataPro: RowDataPro[] = [
  {
    id: '1',
    nombre: 'Juan',
    primerApellido: 'Pérez',
    segundoApellido: 'Gómez',
    dni: '12345678A',
    profesion: 'medico',
    email: 'juan.perez@example.com',
    telefono: '123456789',
    password: 'password1'
  },
  {
    id: '134',
    nombre: 'Juantygf',
    primerApellido: 'Pérez',
    segundoApellido: 'Gómez',
    dni: '12345678A',
    profesion: 'medico',
    email: 'juan.perez@example.com',
    telefono: '123456789',
    password: 'password1'
  },
  {
    id: '153',
    nombre: 'Juaner',
    primerApellido: 'Pérez',
    segundoApellido: 'Gómez',
    dni: '12345678A',
    profesion: 'medico',
    email: 'juan.perez@example.com',
    telefono: '123456789',
    password: 'password1'
  },
  {
    id: '2',
    nombre: 'Ana',
    primerApellido: 'López',
    segundoApellido: 'Martínez',
    dni: '23456789B',
    profesion: 'enfermera',
    email: 'ana.lopez@example.com',
    telefono: '987654321',
    password: 'password2'
  },
  {
    id: '3',
    nombre: 'Carlos',
    primerApellido: 'Fernández',
    segundoApellido: 'Ruiz',
    dni: '34567890C',
    profesion: 'auxiliar',
    email: 'carlos.fernandez@example.com',
    telefono: '567890123',
    password: 'password3'
  },
  {
    id: '4',
    nombre: 'María',
    primerApellido: 'García',
    segundoApellido: 'Sánchez',
    dni: '45678901D',
    profesion: 'administrativo',
    email: 'maria.garcia@example.com',
    telefono: '678901234',
    password: 'password4'
  },
  {
    id: '5',
    nombre: 'Pedro',
    primerApellido: 'Ramírez',
    segundoApellido: 'Hernández',
    dni: '56789012E',
    profesion: 'admin',
    email: 'pedro.ramirez@example.com',
    telefono: '789012345',
    password: 'password5'
  },
  {
    id: '643',
    nombre: 'Lucíafgfgfg',
    primerApellido: 'Martín',
    segundoApellido: 'Jiménez',
    dni: '67890123F',
    profesion: 'enfermera',
    email: 'lucia.martin@example.com',
    telefono: '890123456',
    password: 'password6'
  },
  {
    id: '6',
    nombre: 'Lucía',
    primerApellido: 'Martín',
    segundoApellido: 'Jiménez',
    dni: '67890123F',
    profesion: 'enfermera',
    email: 'lucia.martin@example.com',
    telefono: '890123456',
    password: 'password6'
  }
]
export const updateDataPro = (newData: RowDataPro[]): void => {
  initialDataPro = newData
}

// --------------------------------------------
// Datos generales para Profesiones
export interface RowDataProfe {

  id: string
  profesion: string
}
export let initialDataProfe: RowDataProfe[] = [
  {
    id: 'fs6dfe',
    profesion: 'medico'
  },
  {
    id: 'fsdf3e',
    profesion: 'enfermera'
  },
  {
    id: 'fsd4fe',
    profesion: 'admin'
  },
  {
    id: 'fs5dfe',
    profesion: 'administrativo'
  },
  {
    id: 'fs7dfe',
    profesion: 'auxiliar'
  }
]
export const updateDataProfe = (newData: RowDataProfe[]): void => {
  initialDataProfe = newData
}

// -------------------------------------------------------------------------
// Gráficas
// -------------------------------------------------------------------------
// --------------------------------------------
// Datos necesariós para la pantalla de configuración
export interface RowDatosConf {
  totalEquipos: number
  totalProfesionales: number
  TotalEquipo: number
  Medicos: number
  Enfermeras: number
  Auxiliar: number
  Administrativo: number
}
export let initialDatosConf: RowDatosConf[] = [
  {
    totalEquipos: 2,
    totalProfesionales: 100,
    TotalEquipo: 3,
    Medicos: 40,
    Enfermeras: 30,
    Auxiliar: 20,
    Administrativo: 10
  }

]
export const updateDatosConf = (newDatos: RowDatosConf[]): void => {
  initialDatosConf = newDatos
}
// --------------------------------------------
// Datos de las graficas de los equipos
export interface RowDatosPaMe {
  nombre: string
  valor: number
}
export let initialDatosPaMe: RowDatosPaMe[] = [
  {
    nombre: 'elena',
    valor: 40
  },
  {
    nombre: 'Roberto',
    valor: 20
  },
  {
    nombre: 'Paco',
    valor: 25
  }
]
export const updateDatosPaMe = (newDatos: RowDatosPaMe[]): void => {
  initialDatosPaMe = newDatos
}
// --------------------------------------------
// Datos de las graficas de rango de edad
export interface RowDatosEdad {
  valor: number
  nombre: string
}
export let initialDatosEdad: RowDatosEdad[] = [
  {

    valor: 50,
    nombre: '>90'

  },
  {

    valor: 30,
    nombre: '>75'

  },
  {

    valor: 12,
    nombre: '>50'

  },
  {

    valor: 2,
    nombre: '<50'

  }

]
export const updateDatosEdad = (newDatos: RowDatosEdad[]): void => {
  initialDatosEdad = newDatos
}
// --------------------------------------------
// Datos de las graficas de enfermedades
export interface RowDatosEnfe {

  nombre: string
  total: number

}
export let initialDatosEnfe: RowDatosEnfe[] = [
  {

    nombre: 'covid',
    total: 40

  },
  {

    nombre: 'gripe',
    total: 20

  },
  {

    nombre: 'coso',
    total: 25

  },
  {

    nombre: 'Nino',
    total: 55

  }

]
export const updateDatosEnfe = (newDatos: RowDatosEnfe[]): void => {
  initialDatosEnfe = newDatos
}
// --------------------------------------------
// Datos de las graficas de CS
export interface RowDatosNCS {

  nombre: string
  valor: number

}
export let initialDatosNCS: RowDatosNCS[] = [
  {

    nombre: 'A',
    valor: 40

  },
  {

    nombre: 'B',
    valor: 20

  },
  {

    nombre: 'C',
    valor: 25

  },
  {

    nombre: 'D',
    valor: 55

  }

]
export const updateDatosNCS = (newDatos: RowDatosNCS[]): void => {
  initialDatosNCS = newDatos
}
