import React from 'react';
import Match from './match.js'

class MatchHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: '',
            showMatches: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
      
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
  
    async handleSubmit(e) {
        this.setState({
            showMatches: false
        })
        e.preventDefault();
        //axios.post('http://localhost:9000/table', this.state);
        const info = await fetch('http://localhost:9000/table');
        const jsonInfo = await info.json();
        jsonInfo.shift();
        this.setState({
            info: JSON.stringify(jsonInfo),
            showMatches: true
        });
    }

    renderMatches() {
        return (
        <div>
            <Match data={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[1]}></Match>
            <Match data={JSON.parse(this.state.info)[2]}></Match>
            <Match data={JSON.parse(this.state.info)[3]}></Match>
            <Match data={JSON.parse(this.state.info)[4]}></Match>
            <Match data={JSON.parse(this.state.info)[5]}></Match>
            <Match data={JSON.parse(this.state.info)[6]}></Match>
            <Match data={JSON.parse(this.state.info)[7]}></Match>
            <Match data={JSON.parse(this.state.info)[8]}></Match>
            <Match data={JSON.parse(this.state.info)[9]}></Match>
        </div>
        );
    }

    render() {
        return (
            <div>
                <form className='searchBar' onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                {this.state.showMatches && this.renderMatches()}
            </div>
        );
    }
}

export default MatchHistory