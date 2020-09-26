import React from 'react';
import MatchHistory from './components/matchHistory';
import NavBar from './components/navbar';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MatchHistory></MatchHistory>
        </header>
      </div>
    );
  }
}



export default App;
