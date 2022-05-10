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

  const {
    data: todos = [],
    isFetching,
    status,
  } = useQuery<Todo[]>('todos', fetchTodos);

  const { mutateAsync: addTodo } = useMutation(postTodo, {
    // use onSuccess when you need the data return from the mutation function
    onSuccess: data => {
      queryClient.setQueryData('todos', todos => [...(todos as Todo[]), data]);
    },
  });

  const { mutateAsync: deleteTodo } = useMutation(destroyTodo, {
    // use onMutate when you need the data passed into the mutation function
    onMutate: (idToDelete: number) =>
      queryClient.setQueryData<Todo[]>('todos', (todos = []) =>
        todos.filter(({ id }) => id !== idToDelete)
      ),
  });

  const { mutateAsync: toggleTodoComplete } = useMutation(
    async ({ todoId, complete }: { todoId: number; complete: boolean }) => {
      await updateTodo(todoId, {
        complete: !complete,
      });
    },
    {
      onMutate: ({
        todoId,
        complete,
      }: {
        todoId: number;
        complete: boolean;
      }) => {
        queryClient.setQueryData<Todo[]>('todos', (todos = []) =>
          todos.map(todo => {
            const { id } = todo;
            return id === todoId ? { ...todo, complete: !complete } : todo;
          })
        );
      },
    }
  );

  return { addTodo, todos, deleteTodo, toggleTodoComplete, isFetching, status };
};
