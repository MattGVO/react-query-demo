import { VStack } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from 'react-query';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <TodoForm />
          <TodoList />
        </VStack>
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
