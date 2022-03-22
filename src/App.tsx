import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

const tabs = ["Dailies", "Weeklies", "Monthlies", "Favourites"]

function App() {
  return (
    <>
      <Header tabs={tabs} user={{name: "test", image: ""}}/>
    </>
  );
}

export default App;
