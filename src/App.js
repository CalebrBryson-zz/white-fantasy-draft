import React from 'react';
import logo from './logo.svg';
import './App.css';
import FantasyContainer from './components/FantasyContainer';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FantasyContainer />
      </header>
    </div>
  );
}

export default App;
