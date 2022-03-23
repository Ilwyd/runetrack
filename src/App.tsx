import React, { useState } from 'react';
import './App.css';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Loader } from '@mantine/core';
import { useSigninCheck } from 'reactfire';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')
  );
  const { status, data: signInCheckResult } = useSigninCheck();
  var comp = <></>

  if (status === 'loading') {
    return <Loader />;
  }

  if(signInCheckResult.signedIn !== true) {
    comp = <Login />
  }
  else {
    comp = <Home />
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        {comp}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App;
