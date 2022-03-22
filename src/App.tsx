import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { MantineProvider } from '@mantine/core';

const tabs = ["Dailies", "Weeklies", "Monthlies", "Favourites"]

function App() {
  return (
    <>
      <MantineProvider theme={{colorScheme: 'dark'}}>
        <Header tabs={tabs} user={{name: "test", image: ""}}/>
      </MantineProvider>
    </>
  );
}

export default App;
