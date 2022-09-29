import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = useState();
  const [tareas, setTareas] = useState([]);

  const agregarTareas = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("el campo esta vacio");
      return;
    }

    setTareas([...tareas, { id: nanoid(5), nombreTarea: tarea }]);

    console.log(tareas);
    setTarea("");
  };


  const deleteTarea= (id)=>{

  const nuevoArray  =  tareas.filter((item) => ( item.id !==id ))

  setTareas(nuevoArray)
  console.log(nuevoArray)
  }

  return (
    <div className="container">
      <h1 className="text-center"> CRUD simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center"> Lista de tareas</h4>
          <button 
          className="btn btn-warning btn-sm float-none"
          onClick={e => setTareas([])}
          > Eliminar todas las tareas activas</button>
          <ul className="list-group">
            {  tareas.map((element) => (
              <li className="list-group-item"  key={element.id}>
                <span className="lead">{element.nombreTarea}</span>
                <button className="btn btn-danger btn-sm float-end mx-2"
                onClick={e => deleteTarea(element.id)}
                >
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm float-end  ">
                  Editar
                </button>
              </li>
            ))  }

 
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={agregarTareas}>
            <input
              type="text"
              className="text-control"
              placeholder="tarea nueva"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <button className="btn btn-warning btn-sm  mx-5 mt-5" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
