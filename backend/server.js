const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./db');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Todo API is running!',
    endpoints: {
      getAllTodos: 'GET /api/todos',
      createTodo: 'POST /api/todos',
      updateTodo: 'PUT /api/todos/:id',
      deleteTodo: 'DELETE /api/todos/:id'
    }
  });
});

app.use('/api/todos', todosRouter);

// Start server
const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
