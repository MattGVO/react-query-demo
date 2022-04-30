import { Button, HStack, Input } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import useTodos from '../hooks/useTodos';

interface Props {}

const TodoForm: React.FC<Props> = () => {
  const { addTodo } = useTodos();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await addTodo(data.todo);
    reset({ todo: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <Input placeholder="Add Todo" {...register('todo')} />
        <Button type="submit">Add</Button>
      </HStack>
    </form>
  );
};

export default TodoForm;
