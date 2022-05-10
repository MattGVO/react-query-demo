import { Checkbox, HStack, IconButton } from '@chakra-ui/react';

import { MdDeleteForever } from 'react-icons/md';

import { Todo } from '../types';

interface Props {
  todo: Todo;
  deleteTodo: (idToDelete: number) => Promise<void>;
  toggleTodoComplete: (arg: {
    todoId: number;
    complete: boolean;
  }) => Promise<void>;
  isFetching?: boolean;
}

const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  toggleTodoComplete,
  isFetching,
}) => {
  const { complete, id, text } = todo;

  return (
    <li style={{ padding: 5 }}>
      <HStack justify="space-between">
        <p style={{ textDecoration: complete ? 'line-through' : 'none' }}>
          {text}
        </p>
        <HStack>
          <Checkbox
            isChecked={complete}
            onChange={() => toggleTodoComplete({ todoId: id, complete })}
            disabled={isFetching}
          />
          <IconButton
            aria-label="delete"
            color="red"
            onClick={() => deleteTodo(id)}
            icon={<MdDeleteForever />}
            variant="link"
            disabled={isFetching}
          />
        </HStack>
      </HStack>
    </li>
  );
};

export default TodoItem;
