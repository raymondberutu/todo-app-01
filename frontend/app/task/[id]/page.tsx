'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { todoService } from '@/services/todoService';
import { authService } from '@/services/authService';
import TaskNotFound from './components/TaskNotFound';
import TaskDetailCard from './components/TaskDetailCard';
import { Todo } from '@/types/todo';

export default function TodoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memeriksa status token login pengguna
    const token = authService.getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    if (!id) return;

    // Memanggil fungsi fetch detail todo dari backend
    todoService
      .getTodoById(id)
      .then((data) => {
        if (data) {
          // Mapping data dari backend ke tipe Todo untuk UI
          setTodo({
            id: data.id,
            title: data.todo, // di backend fieldnya 'todo', di UI 'title'
            completed: Boolean(data.completed),
            createdAt: new Date().toISOString().split('T')[0],
          });
        } else {
          setTodo(null);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil detail:", err);
        setTodo(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, router]);

  // Tampilan saat data sedang dimuat (loading)
  if (loading) {
    return (
      <main className="min-h-screen p-6 md:p-10 bg-white text-gray-700">
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">Memuat detail tugas...</p>
        </div>
      </main>
    );
  }

  // Tampilan jika ID tugas tidak ditemukan di database
  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  // Tampilan jika data berhasil ditemukan
  return <TaskDetailCard todo={todo} />;
}