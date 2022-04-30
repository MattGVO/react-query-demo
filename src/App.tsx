import { VStack } from '@chakra-ui/react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import TodoProvider from './context/TodoProvider';

function App() {
  return (
    <main
      style={{
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        padding: '20vh',
        width: '100vw',
      }}
    >
      <VStack>
        <TodoProvider>
          <TodoForm />
          <TodoList />
        </TodoProvider>
      </VStack>
    </main>
  );
}

export default App;
