import React, { useEffect, useState } from 'react';
import TodoCard from '../components/TodoCard';
import AddTodoForm from '../components/AddTodoForm';

interface Todo {
  id: number;
  title: string;
  description: string;
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
    // Re-fetch todos to update the list
    fetchTodos();
  };

  const completeTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    // Re-fetch todos to update the list after deletion
    fetchTodos();
  };

  return (
    <div className="container mx-auto p-4">
      <AddTodoForm onAdd={addTodo} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            onComplete={() => completeTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
