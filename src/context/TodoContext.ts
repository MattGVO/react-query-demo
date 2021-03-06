import React from 'react';

import { Todo } from '../types';

interface ITodoContext {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  deleteTodo: (idToDelete: number) => Promise<void>;
  toggleTodoComplete: (todoId: number, complete: boolean) => Promise<void>;
  isLoading: boolean;
  isUpdating: boolean;
}

const TodoContext = React.createContext<ITodoContext>({
  todos: [],
  addTodo: async (text: string) => {},
  deleteTodo: async (idToDelete: number) => {},
  toggleTodoComplete: async (todoId: number, complete: boolean) => {},
  isLoading: true,
  isUpdating: false,
});

export default TodoContext;
