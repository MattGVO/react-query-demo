import API from '../API';

import { Todo } from '../../types';

type TodoToUpdate = Partial<Omit<Todo, 'id'>>;

export const fetchTodos = async () => {
  const { data } = await API.get('todos');

  return data;
};

export const postTodo = async (text: string) => {
  const { data } = await API.post('todos', {
    text,
    complete: false,
  });

  return data;
};

export const updateTodo = async (
  todoId: number,
  fieldsToUpdate: TodoToUpdate
) => {
  await API.patch(`todos/${todoId}`, fieldsToUpdate);
};

export const deleteTodo = async (idToDelete: number) => {
  await API.delete(`todos/${idToDelete}`);
};
