import React from 'react';
import Match from './match.js';
import axios from 'axios';
import './matchHistory.css';
import Navbar from '../../node_modules/react-bootstrap/Navbar';

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
        axios.post('http://localhost:3001/app', this.state);
        const info = await axios.get('http://localhost:3001/app');
        const jsonInfo = await info.data;
        this.setState({
            info: JSON.stringify(jsonInfo),
            showMatches: true
        });
        console.log(info)
    }

    renderMatches() {
        return (
        <div>
            <Match data={JSON.parse(this.state.info)[1]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[2]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[3]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[4]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[5]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[6]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[7]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[8]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[9]} playerName={JSON.parse(this.state.info)[0]}></Match>
            <Match data={JSON.parse(this.state.info)[10]} playerName={JSON.parse(this.state.info)[0]}></Match>
        </div>
        );
    }

    returnIcon(iconId) {
        return 'http://ddragon.leagueoflegends.com/cdn/10.19.1/img/profileicon/' + iconId + '.png';
    }

    renderIconName() {
        return (
            <div className='iconName'>
                <img src={this.returnIcon(JSON.parse(this.state.info)[0].profileIconId)} className='icon'/>
                <div className='summonerName'>{JSON.parse(this.state.info)[0].name}</div>
            </div>
        );
    }

    render() {
        return (
            <div className='page'>
                {this.state.showMatches && this.renderIconName()}
                <Navbar bg="primary" variant="dark" className='navbar'>
                    <text className='pageName'>A.GG</text>
                </Navbar>
                <form onSubmit={this.handleSubmit} className='searchBar'>
                    <label>
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Search'/>
                    </label>
                    <input type="submit" value="Search"/>
                </form>
                <div className='matchHistory'>
                    {this.state.showMatches && this.renderMatches()}
                </div>
            </div>
        );
    }
}

export default MatchHistory