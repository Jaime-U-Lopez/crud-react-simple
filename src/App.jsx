import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = useState();
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idArray, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTareas = (e) => {
    e.preventDefault();

    try {
      if (!tarea.trim()) {
        console.log("el campo esta vacio");
        setError("Escriba algúna tareá a realizar ");
        return;
      }
    } catch (error) {
      console.log("omitir Error");
    }

    setTareas([...tareas, { id: nanoid(5), nombreTarea: tarea }]);

    console.log(tareas);
    setTarea("");
    setError(null);
  };

  const deleteTarea = (id) => {
    const nuevoArray = tareas.filter((item) => item.id !== id);

    setTareas(nuevoArray);
    console.log(nuevoArray);
    setError(null);
  };

  const editar = (item) => {
    console.log({ item });
    setModoEdicion(true);
    //con esot lo que hacemos es invocar a la tarea actual del item y
    //pintarla en el fomulario input, ya que el value del input es el array de tarea
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const EditarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError("Escriba algúna tareá a realizar ");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === idArray ? { id: idArray, nombreTarea: tarea } : item
    );
    setTareas(arrayEditado);

    console.log("editando tarea");

    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  console.log(tareas);
  return (
    <div className="container">
      <h1 className="text-center"> CRUD simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center"> Lista de tareas</h4>
          <button
            className="btn btn-warning btn-sm float-none"
            onClick={(e) => setTareas([])}
          >
            {" "}
            Eliminar todas las tareas activas
          </button>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas asignadas</li>
            ) : (
              tareas.map((element) => (
                <li className="list-group-item" key={element.id}>
                  <span className="lead">{element.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={(e) => deleteTarea(element.id)}
                  >
                    Eliminar
                  </button>

                  <button
                    className="btn btn-warning btn-sm float-end  "
                    onClick={() => editar(element)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          {modoEdicion ? (
            <h4 className="text-center"> Editar Tarea </h4>
          ) : (
            <h4 className="text-center"> Agregar Tarea</h4>
          )}

          <form onSubmit={modoEdicion ? EditarTarea : agregarTareas}>
            {error ? <span className="text-danger">{error} </span> : null}

            <input
              type="text"
              className={error ? "form-control my-3" : "form-control my-5"}
              placeholder={modoEdicion ? "Editar tarea" : "tarea nueva"}
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-warning btn-block " type="submit">
                Editar Tarea
              </button>
            ) : (
              <button className="btn btn-dark btn-block " type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
