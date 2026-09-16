'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';
import { Button } from '@/app/components/ui/button';

export default function TodoCachedApp({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('TODO_LIST_CACHE', initialTodos);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = { id: Date.now(), title, description: '', completed: false, createdAt: new Date().toISOString() };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleReset = () => {
    setTodos(initialTodos);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-blue-50 p-3 rounded text-sm text-blue-700">
        <p>✅ Data tersimpan di Local Storage</p>
        <Button variant="outline" size="xs" onClick={handleReset}>Reset Data</Button>
      </div>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}