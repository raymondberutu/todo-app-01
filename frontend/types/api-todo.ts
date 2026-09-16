export type DummyJsonTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type DummyJsonResponse = {
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};