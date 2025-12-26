import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed, todo.title)}
          className="checkbox"
        />
        <span className="todo-title">{todo.title}</span>
      </div>
      <button 
        onClick={() => onDelete(todo.id)} 
        className="btn btn-danger"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
