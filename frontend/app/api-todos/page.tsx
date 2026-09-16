import React from 'react';
import ApiTodoList from './components/ApiTodoList';
import { getTasks } from '@/lib/tasks';

export default async function ApiTodosPage() {
  // Mengambil data dari server sebelum dikirim ke komponen Client
  const initialTasks = await getTasks(15);

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-fit">
        <header className="mb-6 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>
        
        {/* Mengirimkan initialTasks ke komponen list */}
        <ApiTodoList initialTasks={initialTasks} />
      </div>
    </main>
  );
}