import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/db/db.json');

// Reading todos from the database
export async function getTodos() {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data).todos;
}

// Adding a todo to the database
export async function addTodo(todo: { id: number; title: string; description: string; }) {
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    db.todos.push(todo);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

// Example usage:
// await addTodo({
//   id: Date.now(),
//   title: 'Learn Next.js',
//   description: 'Understand the basics of Next.js',
// });
