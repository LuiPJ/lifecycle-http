function TodoItem({ todo, editTodoItem, deleteTodoItem }) {
  return (
    <>
      <div className="todoItem">
        <div className="todoItemText">{todo.todoText}</div>
        <div className="todoItemControls">
          <i className="todoItemControlDelete">
            <button
              className="bg-danger"
              onClick={() => deleteTodoItem(todo.id)}
            >
              Del
            </button>
          </i>
        </div>
      </div>
    </>
  );
}

export default TodoItem;
