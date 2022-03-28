import React, { useState } from 'react';
import './App.css';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Loader } from '@mantine/core';
import Home from './Components/Home/Home';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')
  );

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <Home />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App;
