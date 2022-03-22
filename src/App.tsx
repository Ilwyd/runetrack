import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <>
      <Header tabs={["Test"]} user={{name: "test", image: ""}}/>
    </>
  );
}

export default App;
