'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`p-4 rounded-md border flex items-center justify-between gap-3 transition-colors ${
        todo.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
      }`}
    >
      {/* Bagian Kiri: Checkbox & Judul */}
      <div className="flex items-center gap-3 overflow-hidden">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500 cursor-pointer accent-blue-500 shrink-0"
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`text-base font-medium truncate cursor-pointer transition-all ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </label>
      </div>
      
      {/* Bagian Kanan: Link Detail & Tombol Hapus */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href={`/task/${todo.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Detail &rarr;
        </Link>
        
        {onDelete && (
          <Button
            type="button"
            onClick={() => onDelete(todo.id)}
            title="Hapus tugas"
            variant="destructive"
            size="xs"
            className="text-xs font-medium"
          >
            Hapus
          </Button>
        )}
      </div>
    </div>
  );
}