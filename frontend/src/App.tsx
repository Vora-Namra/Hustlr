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
import HomePage from './Pages/HomePage';

const App: React.FC = () => {

  return (
    <MantineProvider>
      <HomePage/>
    </MantineProvider>
  );
};

export default App;