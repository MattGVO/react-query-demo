import { useState, useEffect } from 'react';

import TodoContext from './TodoContext';
import { Todo } from '../types';
import API from '../services/API';
import {
  fetchTodos,
  postTodo,
  updateTodo,
  deleteTodo as destroyTodo,
} from '../services/todos';

interface Props {
  children?: React.ReactNode;
}

const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchAndSetTodos = async () => {
      const res = await fetchTodos();

      setTodos(res);
      setIsLoading(false);
    };

    fetchAndSetTodos();
  }, []);

  const addTodo = async (text: string) => {
    setIsUpdating(true);
    const newTodo = await postTodo(text);

    setTodos(todos => [...todos, newTodo]);
    setIsLoading(false);
  };

  const deleteTodo = async (idToDelete: number) => {
    setIsUpdating(true);
    await destroyTodo(idToDelete);

    setTodos(todos => todos.filter(({ id }) => id !== idToDelete));
    setIsUpdating(false);
  };

  const toggleTodoComplete = async (todoId: number, complete: boolean) => {
    setIsUpdating(true);
    await updateTodo(todoId, {
      complete: !complete,
    });

    setTodos(todos =>
      todos.map(todo => {
        const { id } = todo;

        return id === todoId ? { ...todo, complete: !complete } : todo;
      })
    );
    setIsUpdating(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodoComplete,
        deleteTodo,
        isLoading,
        isUpdating,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
