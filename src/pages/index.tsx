import React, { useEffect, useState } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList'; // Import TodoList

interface Todo {
  id: number;
  title: string;
  descriptionw: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title: string, description: string) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    fetchTodos(); // Re-fetch todos to update the list
  };

  const completeTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos(); // Re-fetch todos to update the list after deletion
  };

  return (
    <div className="container mx-auto p-4">
      <AddTodoForm onAdd={addTodo} />
      {/* Use TodoList to render todos */}
      <TodoList todos={todos} onComplete={completeTodo} />
    </div>
  );
};

export default Home;
