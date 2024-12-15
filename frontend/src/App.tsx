import React, { useState } from 'react';
import { 
  MantineProvider, 
  Button, 
  Container, 
  Title, 
  Card, 
  TextInput 
} from '@mantine/core';
import '@mantine/core/styles.css';

const App: React.FC = () => {
  const [name, setName] = useState('');

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Container size="xs" className="w-full">
          <Card 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            className="bg-white border border-gray-200"
          >
            <Title 
              order={2} 
              className="text-center mb-6 text-blue-600"
            >
              Welcome to Vite + React + TS
            </Title>

            <TextInput 
              label="Your Name" 
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              className="mb-4"
            />

            <Button 
              color="blue" 
              fullWidth 
              className="mt-4 hover:bg-blue-700 transition-colors"
              onClick={() => alert(`Hello, ${name || 'World'}!`)}
            >
              {name ? `Say Hello to ${name}` : 'Say Hello'}
            </Button>
          </Card>

          <div className="text-center mt-4 text-gray-500">
            Powered by Mantine & Tailwind
          </div>
        </Container>
      </div>
    </MantineProvider>
  );
};

export default App;