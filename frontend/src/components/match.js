import React from 'react';
import './match.css';
import {FaAngleDown} from 'react-icons/fa';

import Precision from './images/runes/Precision.png'
import Conqueror from './images/runes/Conqueror.png';
import FleetFootwork from './images/runes/FleetFootwork.png';
import LethalTempo from './images/runes/LethalTempoTemp.png';
import PressTheAttack from './images/runes/PressTheAttack.png';

import Sorcery from './images/runes/Sorcery.png';
import ArcaneComet from './images/runes/ArcaneComet.png';
import PhaseRush from './images/runes/PhaseRush.png';
import SummonAery from './images/runes/SummonAery.png';

import Resolve from './images/runes/Resolve.png'
import GraspOfTheUndying from './images/runes/GraspOfTheUndying.png';
import AfterShock from './images/runes/AfterShock.png';
import Guardian from './images/runes/Guardian.png';

import Inspiration from './images/runes/Inspiration.png';
import GlacialAugment from './images/runes/GlacialAugment.png';
import UnsealedSpellbook from './images/runes/UnsealedSpellbook.png';
import MasterKey from './images/runes/MasterKey.png';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: this.props.data.win,
            buttonBackgroundColor: 'showFullMatchInfoContainer' + this.props.data.win 
        }
    }

    findRuneImage(imageName) {
        const runes = {
            Precision: Precision,
            Conqueror: Conqueror,
            FleetFootwork: FleetFootwork,
            LethalTempo: LethalTempo,
            PressTheAttack: PressTheAttack,
            Sorcery: Sorcery,
            PhaseRush: PhaseRush,
            ArcaneComet: ArcaneComet,
            SummonAery: SummonAery,
            Resolve: Resolve,
            "Grasp of the Undying": GraspOfTheUndying,
            AfterShock: AfterShock,
            Guardian: Guardian,
            Inspiration: Inspiration,
            GlacialAugment: GlacialAugment,
            UnsealedSpellbook: UnsealedSpellbook,
            MasterKey: MasterKey
        }
        return runes[imageName];
    }

    findChampionIcon(championName) {
        return 'http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/' + championName + '.png'
    }

    findSummonerSpell(summonerName) {
        return 'http://ddragon.leagueoflegends.com/cdn/10.19.1/img/spell/' + summonerName + '.png'
    }

    findItem(itemId) {
        return 'http://ddragon.leagueoflegends.com/cdn/10.19.1/img/item/'+ itemId + '.png'
    }

    returnItem(itemNumber, className) {
        const item = this.props.data.players['one dance'].items[itemNumber];
        if (item != 0) {
            return <img src={this.findItem(item)} className={className}/>
        } else {
            return <div className='emptyItem'></div>
        }
    }
    
    returnTeam(teamNumber) {
        const team = [];
        for (let p in this.props.data.players) {
            if (this.props.data.players[p].team == teamNumber) {
                team.push(this.props.data.players[p])
            }
        }
        return team;
    }

    returnPlayers() {
        const teamOne = this.returnTeam(100);
        const teamTwo = this.returnTeam(200);
        return (
            <div className='playersContainer'>
                <div className='teamContainer'>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamOne[0].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamOne[0].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamOne[1].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamOne[1].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamOne[2].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamOne[2].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamOne[3].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamOne[3].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamOne[4].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamOne[4].player}
                        </div>
                    </div>
                </div>
                <div className='teamContainer'>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamTwo[0].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamTwo[0].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamTwo[1].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamTwo[1].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamTwo[2].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamTwo[2].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamTwo[3].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamTwo[3].player}
                        </div>
                    </div>
                    <div className='player'>
                        <img src={this.findChampionIcon(teamTwo[4].champion)} className='miniChampionIcon'/>
                        <div className='playerName'>
                            {teamTwo[4].player}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={this.state.backgroundColor} background-color='black'>
                <div className='time'>
                    <div className='queueType'>{this.props.data.gameType}</div>
                    <div className='timeAgo'>{this.props.data.daysAgo}</div>
                    <div className='win'>{this.props.data.win}</div>
                    <div className='gameLength'>{this.props.data.gameDuration.minutes}m {this.props.data.gameDuration.seconds}s</div>
                </div>
                <div className='championIcon'>
                    <img src={this.findChampionIcon(this.props.data.players['one dance'].champion)} className='championIconImg'/>
                </div>
                <div className='summonerSpellsAndRunes'>
                    <div className='spellOrRuneSet'>
                        <img src={this.findSummonerSpell(this.props.data.players['one dance'].summonerSpells.spell1)} className='summonerSpell'/>
                        <img src={this.findSummonerSpell(this.props.data.players['one dance'].summonerSpells.spell2)} className='summonerSpell'/>
                    </div>
                    <div className='spellOrRuneSet'>
                        <img src={this.findRuneImage(this.props.data.players['one dance'].runes.primaryRune)} className='rune'/>
                        <img src={this.findRuneImage(this.props.data.players['one dance'].runes.secondaryRune)} className='rune'/>
                    </div>
                </div>
                <div className='kdaContainer'>
                    <div className='killsDeathsAssists'>{this.props.data.players['one dance'].kda.kills} / {this.props.data.players['one dance'].kda.deaths} / {this.props.data.players['one dance'].kda.assists}</div>
                    <div className='kda'>{this.props.data.players['one dance'].kda.kda} KDA</div>
                </div>
                <div className='levelCSKPContainer'>
                    <div className='levelCSKP'>Level {this.props.data.players['one dance'].championLevel}</div>
                    <div className='levelCSKP'>{this.props.data.players['one dance'].cs.totalCS} ({this.props.data.players['one dance'].cs.cspm}) CS</div>
                    <div className='levelCSKP'>Kill P: {this.props.data.killParticipation}%</div>
                </div>
                <div className='itemContainer'>
                    {this.returnItem('item1', 'item1-4')}
                    {this.returnItem('item2', 'item1-4')}
                    {this.returnItem('item3', 'item1-4')}
                    {this.returnItem('item7', 'item1-4')}
                    {this.returnItem('item4', 'item5-7')}
                    {this.returnItem('item5', 'item5-7')}
                    {this.returnItem('item6', 'item5-7')}
                    <div className='wards'>Wards: {this.props.data.players['one dance'].wards}</div>
                </div>
                <div>
                    {this.returnPlayers()}
                </div>
                <div className={this.state.buttonBackgroundColor}>
                    <button className='showFullMatchInfoButton'>
                        <FaAngleDown size='20' color='blue'/>
                    </button>
                </div>
            </div>
        )
    }
}

export default Match;