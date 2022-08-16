import "./main.css";
import { useEffect, useState } from "react";
import AddTodo from "./Components/AddTodo";
import TodoList from "./Components/TodoList";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodo();
  }, []);
  const getTodo = async () => {
    await axios
      .get("http://localhost:7777/notes/")
      .then((result) => setTodos(result.data));
  };

  const addTodo = async (todoText) => {
    if (todoText && todoText.length > 0) {
      const result = await axios.post("http://localhost:7777/notes/", {
        todoText: todoText,
      });
      setTodos([...todos, result?.data]);
    }
    getTodo();
  };
  const deleteTodoItem = async (todo) => {
    await axios.delete("http://localhost:7777/notes/" + todo);
    getTodo();
  };

  return (
    <div>
      <main className="main">
        <AddTodo addTodo={addTodo} getTodo={getTodo} />
        <TodoList todos={todos} deleteTodoItem={deleteTodoItem} />
      </main>
    </div>
  );
}
