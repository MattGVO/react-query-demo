import { useQuery, useMutation, useQueryClient } from 'react-query';

import axios from 'axios';

import { Todo } from '../types';

const fetchTodos = async () => {
  const { data } = await axios.get('http://localhost:5000/todos');

  return data;
};

export default () => {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<Todo[]>('todos', fetchTodos);

  const { mutateAsync: addTodo } = useMutation(
    async (text: string) => {
      const { data } = await axios.post('http://localhost:5000/todos', {
        text,
        complete: false,
      });
      return data;
    },
    {
      onSuccess: data => {
        queryClient.setQueryData('todos', todos => [
          ...(todos as Todo[]),
          data,
        ]);
      },
    }
  );

  const { mutateAsync: deleteTodo } = useMutation(
    async (idToDelete: number) => {
      await axios.delete(`http://localhost:5000/todos/${idToDelete}`);
    },
    {
      onMutate: (idToDelete: number) =>
        queryClient.setQueryData<Todo[]>('todos', (todos = []) =>
          todos.filter(({ id }) => id !== idToDelete)
        ),
    }
  );

  const { mutateAsync: toggleTodoComplete } = useMutation(
    async ({ todoId, complete }: { todoId: number; complete: boolean }) => {
      await axios.patch(`http://localhost:5000/todos/${todoId}`, {
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

  return { addTodo, todos, deleteTodo, toggleTodoComplete };
};
