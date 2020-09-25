import React, { Component } from 'react';

class Summoner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: 'loading..'
        }
    }

    async handleButtonClick() {
        const info = await fetch('http://localhost:9000/table');
        const jsonInfo = await info.json();
        this.setState({
            info: JSON.stringify(jsonInfo)
        })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleButtonClick() }>Search Summoner</button>
                <h6>Info: {this.state.info}</h6>
            </div>
        );
    }
}

export default Summoner;