import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {

  //Defino el State para que desde el formulario me envie los datos de la busqueda realizada por el usuario
  const [busquedaLetra, guardarBusquedaLetra] = useState({});

  //Creo un state para la letra de la cancion
  const [letra, guardarLetra] = useState('');

  //Creo un state para la la informacion del artista
  const [info, guardarInfo] = useState({});

  //Una vez que tengo los datos que quiere buscar el usuario, consulto la API con useEffect para traer la informacion, como dependencia le paso "Busqueda letra" ya que cuando cambie realizaré la consulta
  useEffect(() => {

    //La primera vez "Busqueda letra" estara vacia, por lo que para evitar que consulte automaticamente a las API realizo lo siguiente:
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const url = `https://api.lyrics.ovh/v1/${busquedaLetra.artista}/${busquedaLetra.cancion}`;
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${busquedaLetra.artista}`

      //Para que se ejecuten las dos busquedas al mismo tiempo y no esperar a que se ejecute una consulta para ejecutar la otra a la otra API, realizo la siguiente Promise:
      //De esta forma inician al mismo tiempo y terminan en su propio tiempo cada una (se gana mucho performance)
      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ])

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
    }

    consultarApiLetra();
  }, [busquedaLetra, info])

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
