import { useState, useEffect } from 'react';

import axios from 'axios';

import TodoContext from './TodoContext';
import { Todo } from '../types';

interface Props {
  children?: React.ReactNode;
}

const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('http://localhost:5000/todos');

      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const { data } = await axios.post('http://localhost:5000/todos', {
      text,
      complete: false,
    });

    setTodos(todos => [...todos, data]);
  };

  const deleteTodo = async (idToDelete: number) => {
    await axios.delete(`http://localhost:5000/todos/${idToDelete}`);

    setTodos(todos => todos.filter(({ id }) => id !== idToDelete));
  };

  const toggleTodoComplete = async (todoId: number, complete: boolean) => {
    await axios.patch(`http://localhost:5000/todos/${todoId}`, {
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
