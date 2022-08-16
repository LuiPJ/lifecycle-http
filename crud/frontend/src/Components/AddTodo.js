import { useState } from "react";

function AddTodo({ addTodo, getTodo }) {
  const [text, setText] = useState("");

  return (
    <>
      <div className="addTodoContainer">
        <input
          className="todoInputButton refresh"
          type="button"
          value="Refresh"
          onClick={(e) => {
            getTodo();
          }}
        />
        <input
          className="todoInputText"
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo here..."
          id="todoText"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              addTodo(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <input
          className="todoInputButton"
          type="button"
          value="ADD"
          onClick={(e) => {
            addTodo(text);
          }}
        />
      </div>
    </>
  );
}

export default AddTodo;
