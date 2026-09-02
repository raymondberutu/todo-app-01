import { todoService } from '@/services/todoService';
import { DummyJsonTodo } from '@/types/api-todo';
import { Todo } from '@/types/todo';

const formatTask = (item: DummyJsonTodo): Todo => ({
  id: item.id,
  title: item.todo,
  description: '',
  completed: item.completed,
  createdAt: new Date().toISOString(),
  userId: item.userId
});

export const getTasks = async (limit: number = 10) => {
  const response = await todoService.getAll(limit);
  return response.todos.map(formatTask);
};