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
  switch (req.method) {
    case 'GET':
      const todos = getTodos();
      res.status(200).json(todos);
      break;
    case 'POST':
      const newTodo = { id: Date.now(), ...req.body };
      const todosAfterAdd = getTodos();
      todosAfterAdd.push(newTodo);
      saveTodos(todosAfterAdd);
      res.status(201).json(newTodo);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
