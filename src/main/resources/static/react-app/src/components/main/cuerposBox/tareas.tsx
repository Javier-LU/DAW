import React, { useState } from 'react';
import * as datos from '../../datos/datosGlobales';
import '../css/tareas.scss';
import '../../datos/panelesFlotantes.scss'


const Counter: React.FC = () => {
    const [tar, setTareas] = useState(datos.initialDataTareas);

    const handleTareaChange = (id: string, field: string, value: string) => {
        setTareas(prevTareas =>
            prevTareas.map(tarea =>
                tarea.id === id ? { ...tarea, [field]: value } : tarea
            )
        );
    };

    const handleDelete = (id: string, ) => {
      
            setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
        
    };

    const formatDateString = (dateString: string | null | undefined): string => {
        if (dateString === null || dateString === undefined) {
          return ''
        }
        const datePattern = /^\d{4}-\d{2}-\d{2}$/
        if (datePattern.test(dateString)) {
          return dateString
        }
        const [day, month, year] = dateString.split('/')
        return `${year}-${month}-${day}`
      }

    return (
        <div>
            {tar.map(tarea => {
                const paciente = datos.initialData.find(p => p.id === tarea.persona);

                if (!paciente) {
                    return <div key={tarea.id}>Paciente no encontrado</div>;
                }

                return (
                    <div key={tarea.id} className="counter-container">
                        <div className="counter-content">
                            <div className="pacienteInfo">
                                <h3>{paciente.nombre} {paciente.primerApellido} {paciente.segundoApellido}</h3>
                                <div className="textoP">
                                    <p>Nacimiento: <span>{paciente.nacimiento}</span> </p>
                                </div>
                                <div className="textoP">
                                    <p>Dirección: <span>{paciente.direccion}</span></p>
                                </div>
                                <div className="textoP">
                                    <p>Centro de Salud: <span>{paciente.centroSalud}</span> </p>
                                </div>
                                <div className="textoP">
                                    <p>Teléfono: <span>{paciente.telefono}</span></p>
                                </div>
                            </div>
                            <div className="tareaInfo">

                                <select
                                    name='tipo-tarea'
                                    id='tipo-tarea'
                                    value={tarea.tarea}
                                    onChange={(e) => handleTareaChange(tarea.id, 'tarea', e.target.value)}
                                >
                                    <option value='' disabled>....</option>
                                    {tar.map((ta, taIndex) => (
                                        <option key={taIndex} value={ta.tarea}>{ta.tarea}</option>
                                    ))}
                                </select>
                      

                          

                                <p className='textoSmall'>Fecha prevista:</p>

                                <input
                                    type='date'
                                    className='textoBig'
                                    id='fecha-prevista'
                                    name='fecha-prevista'
                                    value={formatDateString?.(tarea.fecha)}
                                    onChange={(e) => handleTareaChange(tarea.id, 'fecha', e.target.value)}
                                />
                                
                            </div>
                        </div>
                        <button className='delete-button' onClick={() => handleDelete(tarea.id)}>
                            <svg xmlns='http://www.w3.org/2000/svg' className='svgLogo' fill='currentColor' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5' />
                            </svg>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Counter;



