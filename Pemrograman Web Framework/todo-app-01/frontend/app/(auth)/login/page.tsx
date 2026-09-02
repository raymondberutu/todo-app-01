import React from 'react';
import { getTodos } from '@/lib/todos';
import TodoStateOnlyApp from './components/TodoStateOnlyApp';

export default async function TodoPage() {
  // Mengambil data awal di sisi server (Server Component)
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        {/* Menggantikan TodoForm dan TodoList terpisah dengan satu Container Utama */}
        <TodoStateOnlyApp initialTodos={initialTodos} />
      </div>
    </main>
  );
}