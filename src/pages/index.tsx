import React, { useState } from 'react';
import TodoCard from '../components/TodoCard';
import AddTodoForm from '../components/AddTodoForm';

interface Todo {
  id: number;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, description: string) => {
    const newTodo = { id: Date.now(), title, description };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <AddTodoForm onAdd={addTodo} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map(todo => (
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
