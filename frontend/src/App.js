import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

// URL API Backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos saat komponen dimuat
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/todos`);
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Tambah todo baru
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo })
      });
      const data = await response.json();
      setTodos([data, ...todos]);
      setNewTodo('');
    } catch (err) {
      setError('Gagal menambah todo');
    }
  };

  // Toggle status completed
  const toggleTodo = async (id, currentStatus, title) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: !currentStatus })
      });
      const data = await response.json();
      setTodos(todos.map(todo => todo.id === id ? data : todo));
    } catch (err) {
      setError('Gagal mengupdate todo');
    }
  };

  // Hapus todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Gagal menghapus todo');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>📝 Todo App</h1>
          <p className="subtitle">Fullstack dengan Render</p>
        </header>

        {/* Form tambah todo */}
        <form onSubmit={addTodo} className="add-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Tambah todo baru..."
            className="input"
          />
          <button type="submit" className="btn btn-primary">
            ➕ Tambah
          </button>
        </form>

        {/* Error message */}
        {error && <div className="error">{error}</div>}

        {/* Loading state */}
        {loading ? (
          <div className="loading">⏳ Memuat data...</div>
        ) : (
          <div className="todo-list">
            {todos.length === 0 ? (
              <p className="empty">🎉 Tidak ada todo! Tambah yang baru.</p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        )}

        {/* Stats */}
        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Selesai: {todos.filter(t => t.completed).length}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
