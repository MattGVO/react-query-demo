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

  useEffect(() => {
    const fetchAndSetTodos = async () => {
      const res = await fetchTodos();

      setTodos(res);
    };

    fetchAndSetTodos();
  }, []);

  const addTodo = async (text: string) => {
    const newTodo = await postTodo(text);

    setTodos(todos => [...todos, newTodo]);
  };

  const deleteTodo = async (idToDelete: number) => {
    await destroyTodo(idToDelete);

    setTodos(todos => todos.filter(({ id }) => id !== idToDelete));
  };

  const toggleTodoComplete = async (todoId: number, complete: boolean) => {
    await updateTodo(todoId, {
      complete: !complete,
    });

    setTodos(todos =>
      todos.map(todo => {
        const { id } = todo;

        return id === todoId ? { ...todo, complete: !complete } : todo;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodoComplete, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
