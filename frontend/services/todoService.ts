import { apiClient } from './api';
import { DummyJsonResponse, DummyJsonTodo } from '@/types/api-todo';

export const todoService = {
  // Pastikan parameter limit secara eksplisit memiliki default value angka 10
  getAll: (limit: number = 10) => apiClient<DummyJsonResponse>(`/todos?limit=${limit}`),
  create: (todo: Partial<DummyJsonTodo>) => apiClient<DummyJsonTodo>('/todos/add', {
    method: 'POST',
    body: JSON.stringify(todo)
  }),
  update: (id: number, data: Partial<DummyJsonTodo>) => apiClient<DummyJsonTodo>(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
};