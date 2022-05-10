import { useQuery, useMutation, useQueryClient } from 'react-query';

import { Todo } from '../types';

import {
  fetchTodos,
  postTodo,
  deleteTodo as destroyTodo,
  updateTodo,
} from '../services/todos';

export default () => {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<Todo[]>('todos', fetchTodos);

  const { mutateAsync: addTodo } = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const { mutateAsync: deleteTodo } = useMutation(destroyTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const { mutateAsync: toggleTodoComplete } = useMutation(
    async ({ todoId, complete }: { todoId: number; complete: boolean }) => {
      await updateTodo(todoId, {
        complete: !complete,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  return { addTodo, todos, deleteTodo, toggleTodoComplete };
};
