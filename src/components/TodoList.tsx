import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TodoCard from './TodoCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Todo {
  id: number;
  title: string;
  description: string;
}

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
  const layout = todos.map((todo, index) => ({
    i: todo.id.toString(),
    x: index % 3 * 4, // Adjust based on your grid preferences
    y: Infinity, // Puts it at the lowest possible spot
    w: 4, // Width of the grid item
    h: 2, // Height of the grid item, adjust as needed
  }));

  return (
    <ResponsiveGridLayout className="layout" layouts={{ lg: layout }} cols={{ lg: 12 }} rowHeight={30}>
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoCard title={todo.title} description={todo.description} onComplete={() => onComplete(todo.id)} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default TodoList;
