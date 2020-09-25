import React from 'react';
import SearchBar from './components/searchBar';
import MatchHistory from './components/matchHistory'
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
