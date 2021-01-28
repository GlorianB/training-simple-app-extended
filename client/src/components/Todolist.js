import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

toast.configure();

function TodoList() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/todos", {
      method: "GET",
      mode: "cors",
    });
    const parseResponse = await response.json();
    setTasks(parseResponse);
  };

  const sendTask = async (task) => {
    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const parseResponse = await response.json();
    if (parseResponse.result === "OK") setTasks([...tasks, task]);
    else console.error("Error sendTask");
  };

  const removeTask = async (key) => {
    const response = await fetch("http://localhost:8000/todos/" + key, {
      method: "DELETE",
      mode: "cors",
    });
    const parseResponse = await response.json();
    if (parseResponse.result === "OK") {
      const array = tasks.filter((task) => task.key !== key);
      setTasks(array);
    }
    return parseResponse;
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const addTask = async (event) => {
    event.preventDefault();
    const newTask = { key: uuidv4(), name: input };
    if (input === "") return;
    await sendTask(newTask);
    setInput("");
    toast.success("Tache ajoutée avec succes");
  };

  const deleteTask = async (event, key) => {
    event.preventDefault();
    await removeTask(key);
    toast.warning("Tache supprimée");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 align="center">Ma Todo list</h1>
      <form className="align-items-center">
        <input
          value={input}
          type="text"
          placeholder="Renseigner un item"
          className="form-control mb-2"
          onChange={handleOnChange}
        />
        <button onClick={addTask} className="btn btn-primary">
          Ajouter
        </button>
      </form>
      <div className="list-group">
        {tasks.map((task) => {
          return (
            <div className="list-group-item" key={task.key}>
              {task.name} |{" "}
              <button
                onClick={(event) => deleteTask(event, task.key)}
                type="button"
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
