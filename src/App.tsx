import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

const tabs = ["Dailies", "Weeklies", "Monthlies", "Favourites"]

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles>
        <Header tabs={tabs} />
        <Footer />
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
