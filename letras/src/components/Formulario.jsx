import React, { useState } from 'react'

const Formulario = ({ guardarBusquedaLetra }) => {
  const [busqueda, guardarBusqueda] = useState({
    //Debo asegurarme que en el "input" tenga estos "name" en ambos
    artista: '',
    cancion: ''
  })
  const [error, guardarError] = useState(false)

  //Agrego una funcion a cada "input" para leer su contenido
  const actualizarState = e => {
    guardarBusqueda({
      //Hago una copia del objeto que haya en el state (...busqueda) y le voy agregando lo que haya en la busqueda
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }

  //Cuando haga "Submit" consultaré a las APIS
  const buscarInformacion = e => {
    e.preventDefault()

    //Valido la consulta, en caso de que algun campo este vacio tirará Error
    if (busqueda.artista.trim() === '' || busqueda.cancion.trim() === '') {
      guardarError(true)
      return
    }
    guardarError(false)
    //Si esta todo bien, y se han validado los datos, pasaré la informacion al Componente Principal
    guardarBusquedaLetra(busqueda)
  }

  return (
    <div className='bg-info'>
      {error ? (
        <p className='alert alert-danger text-center p-2'>
          Todos los campos son obligatorios
        </p>
      ) : null}
      <div className='container'>
        <div className='row'>
          <form
            className='col card text-white bg-transparent mb-5 pt-5 pb-2'
            onSubmit={buscarInformacion}
          >
            <fieldset>
              <legend className='text-center'>Buscador Letras Canciones</legend>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Artista</label>
                    <input
                      type='text'
                      className='form-control'
                      name='artista'
                      placeholder='Nombre Artista'
                      onChange={actualizarState}
                      value={busqueda.artista}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Cancion</label>
                    <input
                      type='text'
                      className='form-control'
                      name='cancion'
                      placeholder='Nombre Cancion'
                      onChange={actualizarState}
                      value={busqueda.cancion}
                    />
                  </div>
                </div>
              </div>
              <button type='submit' className='btn btn-primary float-right'>
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Formulario
