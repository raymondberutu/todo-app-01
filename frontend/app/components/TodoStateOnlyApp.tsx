'use client';

import React, { useState } from 'react';
import { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

type Props = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Gunakan timestamp sebagai ID sementara
      title,
      // description: '', => BARIS INI DIHAPUS menyesuaikan skema database
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList 
        todos={todos} 
        onToggle={handleToggleTodo} 
        onDelete={handleDeleteTodo} 
      />
    </div>
  );
}