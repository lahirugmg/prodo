import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const todosFilePath = path.join(process.cwd(), 'data', 'todos.json');

const getTodos = () => {
  const jsonData = fs.readFileSync(todosFilePath, 'utf8');
  return JSON.parse(jsonData);
};

const saveTodos = (todos) => {
  const jsonData = JSON.stringify(todos, null, 2);
  fs.writeFileSync(todosFilePath, jsonData, 'utf8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  let todos = getTodos();

  switch (req.method) {
    case 'DELETE':
      todos = todos.filter((todo) => todo.id !== Number(id));
      saveTodos(todos);
      res.status(200).json({ id });
      break;
    case 'PUT':
      const index = todos.findIndex((todo) => todo.id === Number(id));
      if (index >= 0) {
        todos[index] = { ...todos[index], ...req.body };
        saveTodos(todos);
        res.status(200).json(todos[index]);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
      break;
    default:
      res.setHeader('Allow', ['DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
