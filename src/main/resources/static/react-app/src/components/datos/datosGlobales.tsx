// Datos generales para Pacientes
export interface RowData {
  id: string
  historico: string
  equipo: string
  tarea: number
  fechaIngreso: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  edad: number
  dni: string
  nacimiento: string
  residencia: string
  direccion: string
  telefono: number
  centroSalud: string
  enfermedad: string
  salida: string
  fechaSalida: string
  lugarSalida: string

}

export const initialData: RowData[] = [
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
    nombre: 'Maria',
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

export interface RowDataTareas {
  id: string
  persona: string
  tarea: string
  fecha: string
}

export const initialDataTareas: RowDataTareas[] = [
  {
    id: 'uiyudsfsdyt',
    persona:'uiyuyt',
    tarea: 'LLamar',
    fecha: '09/09/1940'


  },
  {
    id: 'uiyuwerweyt',
    persona:'afdgretert',
    tarea: 'Historia',
    fecha:'09/09/1940'

  },
  {
    id: 'uiyutreyryt',
    persona:'uiyuyt',
    tarea: 'Visita',
    fecha:'09/09/1940'

  }

]

// Datos generales para equipo
export interface RowDataEquipo {
  id: string
  equipo: string
  centro: string
  medico: string
  enfermera: string
  auxiliar: string
  administrativo: string
}

export const initialDataEquipo: RowDataEquipo[] = [
  {
    id: 'asdafas',
    equipo: 'Elena',
    centro: 'Centro de Salud Norte',
    medico: 'Dr. Juan Pérez',
    enfermera: 'Ana López',
    auxiliar: 'Carlos Fernández',
    administrativo: 'María García'

  },
  {
    id: 'a534sdafas',
    equipo: 'Robert',
    centro: 'Centro de Salud Este',
    medico: 'Dra. Carla Fernández',
    enfermera: 'Elena García',
    auxiliar: 'Luis Rodríguez',
    administrativo: 'Marta González'

  },
  {
    id: 'as647dafas',
    equipo: 'Paco',
    centro: 'Centro de Salud Sur',
    medico: 'Dr. Pedro Ramírez',
    enfermera: 'Lucía Martín',
    auxiliar: 'Laura Méndez',
    administrativo: 'Jose Martínez'

  }

]

// Datos generales para enfermedad
export interface RowDataEnfermedad {
  id: string
  enfermedad: string
}

export const initialDataEnfermedad: RowDataEnfermedad[] = [
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

// Datos generales para CS
export interface RowDataCS {
  id: string
  cs: string
  telefono: number
  calle: string
}

export const initialDataCS: RowDataCS[] = [
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

// Datos generales para CS
export interface RowDataSa {
  id: string
  salida: string
}

export const initialDataSa: RowDataSa[] = [
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

export interface RowDataVF {
  valoresFijos: string
}

export const initialDataVF: RowDataVF[] = [

  {
    valoresFijos: 'Activos'

  },
  {
    valoresFijos: 'Historicos'

  }

]

export interface RowDataT {
  id: string
  tareas: string
}

export const initialDataT: RowDataT[] = [
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

export const initialDataPro: RowDataPro[] = [
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

export interface RowDataProfe {

  id: string
  profesion: string
}

export const initialDataProfe: RowDataProfe[] = [
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

// Datossss

export interface RowDatosConf {

  totalProfesionales: number
  TotalEquipo: number
  Medicos: number
  Enfermeras: number
  Auxiliar: number
  Administrativo: number
}

export const initialDatosConf: RowDatosConf[] = [
  {

    totalProfesionales: 100,
    TotalEquipo: 3,
    Medicos: 40,
    Enfermeras: 30,
    Auxiliar: 20,
    Administrativo: 10

  }

]


export interface RowDatosPaMe {

  nombre: string
  total: number

}

export const initialDatosPaMe: RowDatosPaMe[] = [
  {

    nombre: 'elena',
    total: 40

  },
  {

    nombre: 'Roberto',
    total: 20

  },
  {

    nombre: 'Paco',
    total: 25

  }

]

export interface RowDatosEdad {

  valor: number
  nombre: string


}

export const initialDatosEdad: RowDatosEdad[] = [
  {

    valor: 50,
    nombre: ">90"

  },
  {

   
    valor: 30,
    nombre: ">75"

  },
  {


    valor: 12,
    nombre: ">50"

  },
  {


    valor: 2,
    nombre: "<50"

  }
 

]

export interface RowDatosEnfe {

  nombre: string
  total: number

}

export const initialDatosEnfe: RowDatosEnfe[] = [
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

  },

]

export interface RowDatosNCS {

  nombre: string
  total: number

}

export const initialDatosNCS: RowDatosNCS[] = [
  {

    nombre: 'A',
    total: 40

  },
  {

    nombre: 'B',
    total: 20

  },
  {

    nombre: 'C',
    total: 25

  },
  {

    nombre: 'D',
    total: 55

  },

]