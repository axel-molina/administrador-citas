import React, { Fragment, useState, useEffect } from "react";
import { Cita } from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //UseEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
    
  }, [citas, citasIniciales]);
  
  //Funcion que tome las citas actuales y agregue las nuevas
  const crearCita = cita => {
    guardarCitas(
      [...citas, cita]
    )
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'
  

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
            crearCita={crearCita}
            ></Formulario>
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              ></Cita>
            ))}
          </div>
        </div>
        <p className="firma">Creado por Axel Iván Molina</p>
      </div>
     
    </Fragment>
  );
}

export default App;
