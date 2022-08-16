import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodoItem }) {
  return (
    <div className="todoListContainer">
      <div className="todosText">Todos</div>
      {todos.map((todo, i) => (
        <TodoItem todo={todo} key={i} deleteTodoItem={deleteTodoItem} />
      ))}
    </div>
  );
}

export default TodoList;
