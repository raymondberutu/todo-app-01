'use client';

import React, { useState } from 'react';
import { Todo } from '@/types/todo';
import { Badge } from '@/app/components/ui/badge';

interface ApiTodoListProps {
  initialTasks: Todo[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<Todo[]>(initialTasks);

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    const targetStatus = !currentCompleted;

    // 1. Optimistic Update di State Lokal
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: targetStatus } : t)));

    // 2. Update ke Endpoint API Internal (Backend for Frontend)
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: targetStatus })
      });
    } catch (err) {
      console.warn('Simulasi update ke API gagal (fallback state):', err);
      // Revert state jika gagal terhubung
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: currentCompleted } : t)));
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-dark-70">Daftar Tugas</h2>
        <span className="text-xs bg-gray-70 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>

      {/* Empty state + list */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-muted text-sm">Tidak ada tugas.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id, task.completed)}
              className={`group flex items-start justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                task.completed
                  ? 'bg-success-10/20 border-success-20 hover:border-success-40'
                  : 'bg-white border-gray-100 hover:border-primary-70/40'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 pr-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mt-0.5 w-5 h-5 shrink-0 cursor-pointer accent-primary-70"
                />

                <div>
                  <p
                    className={`text-sm text-dark-70 font-medium leading-relaxed transition-all ${
                      task.completed ? 'line-through text-gray-50' : 'text-dark-70 group-hover:text-primary-90'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-[10px] text-muted mt-1">
                    ID #{task.id} · User {task.userId || 1}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <Badge variant="purple" size="default">
                  ID: #{task.id}
                </Badge>
                <Badge variant="blue" size="default">
                  User: {task.userId || 1}
                </Badge>
                <Badge variant={task.completed ? 'green' : 'yellow'} size="default">
                  {task.completed ? 'Selesai' : 'Pending'}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}