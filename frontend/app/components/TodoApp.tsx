'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Button } from '@/app/components/ui/button';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import { ApiError } from '@/services/api';
import { Todo } from '@/types/todo';

export default function TodoApp() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth Guard & Pemuatan Data Awal saat halaman dibuka
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodos();
        
        // Memetakan struktur data dari Backend (Express) ke struktur frontend (Todo)
        const formatted: Todo[] = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString().split('T')[0],
        }));
        
        setTodos(formatted);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          // Token expired atau tidak valid
          authService.logout();
          router.replace('/login');
        } else {
          console.error("Gagal memuat todo:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadTodos();
  }, [router]);

  // Handler Tambah Tugas Baru (Create - POST /api/todos)
  const handleAddTodo = async (title: string) => {
    try {
      const created = await todoService.createTodo(title);
      const newTodo: Todo = {
        id: created.id,
        title: created.todo,
        completed: Boolean(created.completed),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal menambah tugas: ${message}`);
    }
  };

  // Handler Checklist / Toggle Status Completed (Update - PUT /api/todos/:id)
  const handleToggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    
    const nextCompleted = !target.completed;
    
    // Optimistic Update UI (memperbarui UI secara langsung agar responsif)
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    );
    
    try {
      // Memanggil API backend untuk membarui status
      await todoService.updateTodo(id, { is_completed: nextCompleted });
    } catch (err) {
      // Revert/batalkan update UI jika API gagal
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !nextCompleted } : t))
      );
      alert('Gagal memperbarui status tugas');
    }
  };

  // Handler Hapus Tugas (Delete - DELETE /api/todos/:id)
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert('Gagal menghapus tugas');
    }
  };
  
  // Handler Logout
  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-8">Memuat data tugas...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
          Logout
        </Button>
      </div>
      
      {/* 
        Komponen Form untuk menambah tugas baru 
        PERBAIKAN: Mengubah onAdd menjadi onAddTodo 
      */}
      <TodoForm onAddTodo={handleAddTodo} />
      
      {/* 
        Komponen List untuk merender daftar tugas dari state 
        PERBAIKAN: Mengubah onToggle menjadi onToggleTodo dan onDelete menjadi onDeleteTodo
      */}
      <TodoList 
        todos={todos} 
        onToggleTodo={handleToggleTodo} 
        onDeleteTodo={handleDeleteTodo} 
      />
    </div>
  );
}