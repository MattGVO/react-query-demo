import { Checkbox, HStack, IconButton } from '@chakra-ui/react';

import { MdDeleteForever } from 'react-icons/md';

import { Todo } from '../types';

interface Props {
  todo: Todo;
  deleteTodo: (idToDelete: number) => Promise<void>;
  toggleTodoComplete: (todoId: number, complete: boolean) => Promise<void>;
  isUpdating?: boolean;
}

const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  toggleTodoComplete,
  isUpdating,
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
            onChange={() => toggleTodoComplete(id, complete)}
            disabled={isUpdating}
          />
          <IconButton
            aria-label="delete"
            color="red"
            onClick={() => deleteTodo(id)}
            icon={<MdDeleteForever />}
            variant="link"
            disabled={isUpdating}
          />
        </HStack>
      </HStack>
    </li>
  );
};

export default TodoItem;
