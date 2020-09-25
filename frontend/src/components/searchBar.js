import React from 'react';
import axios from 'axios';
import './searchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          info: 'loading...'
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    render() {
      return (
          <form className='searchBar' onSubmit={this.handleSubmit}>
              <label>
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
      );
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        //axios.post('http://localhost:9000/table', this.state);
        const info = await fetch('http://localhost:9000/table');
        const jsonInfo = await info.json();
        this.setState({
            info: JSON.stringify(jsonInfo)
        });
      }
  }

  export default SearchBar

