// Formulario de la Aplicacion(App.jsx)
import {useState,useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes,setPacientes,paciente}) => {
  const [nombre,setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email,setEmail] = useState('');
  const [fecha,setFecha] = useState('');
  const [sintomas,setSintomas] = useState('');

  const [error,setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del Formulario
    if([nombre,propietario,email,fecha,sintomas].includes('')) {
        setError(true)
    } else{
      setError(false)

      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,
      }

      if(paciente.id) {
       // Editando el Registro
       objetoPaciente.id = paciente.id

        const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
        setPacientes(pacientesActualizados)
        setPaciente({})

      }else{
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes,objetoPaciente]);
      }

      

      //Reiniciar el Formulario
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')
    }
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
          Añade Pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
          
          {error && < Error mensaje='Todos los campos son obligatorios'/>}
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
              Nombre Mascota
              </label>

            <input type="text"
            id="mascota"
            placeholder="Nombre de la Mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propetario" className="block text-gray-700 uppercase font-bold">
              Nombre del Propietario
              </label>

            <input type="text"
            id="propetario"
            placeholder="Nombre del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                Email
              </label>

            <input type="email"
            id="email"
            placeholder="Email del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                Alta
              </label>

            <input type="date"
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                Síntomas
              </label>

            <textarea 
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md"
              placeholder="Describe los Síntomas"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
            />
          </div>

            <input type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
            value={paciente.id ? 'Editar Paciente' : 'Agregar PAciente'}
            />
        </form>
    </div>
  )
}

export default Formulario