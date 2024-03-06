import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (title: string, description: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="input input-bordered w-full max-w-xs"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="textarea textarea-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
