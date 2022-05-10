import { CircularProgress } from '@chakra-ui/react';

import { Todo } from '../types';

import TodoItem from './TodoItem';

import useTodos from '../hooks/useTodos';

const TodoList: React.FC = () => {
  const { deleteTodo, todos, toggleTodoComplete, isLoading, isUpdating } =
    useTodos();

  if (isLoading) {
    return <CircularProgress isIndeterminate color="blue.300" />;
  }

  return (
    <ul style={{ listStyleType: 'none', width: '100%' }}>
      {todos.map((todo: Todo) => {
        const { id } = todo;
        return (
          <TodoItem
            key={id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodoComplete={toggleTodoComplete}
            isUpdating={isUpdating}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
