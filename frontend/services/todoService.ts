import { apiClient } from './api';
import { ApiTodo, TodosApiResponse as DummyJsonTodosResponse } from '@/types/api-todo';

export interface BackendTodo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse {
  success: boolean;
  message: string;
  data: BackendTodo[];
}

export interface SingleTodoResponse {
  success: boolean;
  message: string;
  data: BackendTodo;
}

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export interface CreateTodoInput {
  todo: string;
  completed?: boolean;
  userId?: number;
}

export const todoService = {
  // Mengambil daftar tugas dari database lokal
  async getTodos(): Promise<BackendTodo[]> {
    const res = await apiClient<TodosResponse>('/todos?perPage=50');
    return res.data || [];
  },

  // Mengambil detail satu tugas berdasarkan ID
  async getTodoById(id: number | string): Promise<BackendTodo> {
    const res = await apiClient<SingleTodoResponse>(`/todos/${id}`);
    return res.data;
  },

  // Menambah tugas baru
  async createTodo(payload: string | CreateTodoInput): Promise<BackendTodo> {
    const task = typeof payload === 'string' ? payload : payload.todo;
    const res = await apiClient<SingleTodoResponse>('/todos', {
      method: 'POST',
      body: JSON.stringify({ task }),
    });
    return res.data;
  },

  // Memperbarui tugas (termasuk checklist status)
  async updateTodo(
    id: number | string,
    payload: { task?: string; is_completed?: boolean }
  ): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  // Menghapus tugas
  async deleteTodo(id: number | string): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'DELETE',
    });
  },

  // Adapter function untuk menjaga kompatibilitas jika masih ada UI lama yang bergantung pada format DummyJSON
  async fetchTodos(params: FetchTodosParams = { limit: 15, skip: 0 }): Promise<DummyJsonTodosResponse> {
    try {
      const todos = await this.getTodos();
      const mapped: ApiTodo[] = todos.map((t) => ({
        id: t.id,
        todo: t.todo,
        completed: t.completed,
        userId: 1, // ID dummy karena Express sudah menangani user ID lewat JWT
      }));
      return {
        todos: mapped,
        total: mapped.length,
        skip: params.skip || 0,
        limit: params.limit || 15
      };
    } catch (error) {
      throw error;
    }
  }
};