import { Todo } from '../types';

import TodoItem from './TodoItem';

import useTodos from '../hooks/useTodos';

const TodoList: React.FC = () => {
  const { deleteTodo, todos, toggleTodoComplete } = useTodos();
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
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
