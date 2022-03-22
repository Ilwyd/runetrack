import React, { useState } from 'react';
import './App.css';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useSigninCheck } from 'reactfire';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')
  );
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  if(signInCheckResult.signedIn !== true) {
    return(
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }}>
          <Home />
        </MantineProvider>
      </ColorSchemeProvider>
    )
  }
  else {
    return (
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }}>
          <Login />
        </MantineProvider>
      </ColorSchemeProvider>
    )
  }
}

export default App;
