import React from 'react';

interface TodoCardProps {
  title: string;
  description: string;
  onComplete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ title, description, onComplete }) => {
  return (
    // Apply a minimum height using Tailwind CSS. Adjust "min-h-[150px]" as needed.
    <div className="bg-white shadow-md rounded p-4 min-h-[150px]">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onComplete}
      >
        Complete
      </button>
    </div>
  );
};

export default TodoCard;
