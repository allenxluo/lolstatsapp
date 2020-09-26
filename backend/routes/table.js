var express = require('express');   
var router = express.Router();
var championKeys = require('./championData.json');
var summonerSpells = require('./SummonerSpells.json');
var runes = require('./Runes.json');

const api_key = 'RGAPI-fdadd9cf-d224-404a-bb43-0b2970cf404b';
var summonerName = 'one dance';

const { Kayn } = require('kayn');
const kayn = Kayn(api_key)({ requestOptions: { burst: true }})

router.post('/', function(req, res) {
    summonerName = req.body.value;
  });

router.get('/', async function(req, res) {

    const summonerInfo = await kayn.Summoner.by.name(summonerName);
    const summonerId = summonerInfo.accountId;
    const matchList = await kayn.Matchlist.by.accountID(summonerId).query({ beginIndex: 0, endIndex: 10, queue: [420], season: 13});

    const allGames = [];
    const otherInfo = {};

    otherInfo['profileIconId'] = summonerInfo.profileIconId;
    otherInfo['name'] = summonerInfo.name;
    otherInfo['summonerLevel'] = summonerInfo.summonerLevel;

    const rankedInfo = {};
    const rankedData = await kayn.League.Entries.by.summonerID(summonerInfo.id);

    for (i = 0; i < rankedData.length; i++) {
        const queueInfo = rankedData[i];
        if (queueInfo.queueType == 'RANKED_SOLO_5x5') {
            rankedInfo['queueType'] = queueInfo.queueType;
            rankedInfo['tier'] = queueInfo.tier;
            rankedInfo['rank'] = queueInfo.rank;
            rankedInfo['wins'] = queueInfo.wins;
            rankedInfo['losses'] = queueInfo.losses;
            otherInfo['rankedInfo'] = rankedInfo;
        }
    }

    allGames.push(otherInfo);

    for (i = 0; i < matchList.matches.length; i++) {
        const matchId = matchList.matches[i].gameId;
        const match = await kayn.Match.get(matchId);
        const allStats = {};
        
        function findSummonerName(id) {
            for (j = 0; j < 10; j++) {
                const player = match.participantIdentities[j];
                if (player.participantId == id) {
                    return player.player.summonerName;
                }
            }
        }

        function findRune(id) {
            for (j = 0; j < runes.length; j++) {
                if (runes[j].id == id) {
                    return runes[j].name;
                }
                else if (runes[j].id / 100 == Math.floor(id / 100)) {
                    for (k = 0; k < runes[j].slots.length; k++) {
                        for (n = 0; n < runes[j].slots[k].runes.length; n++) {
                            if (id == runes[j].slots[k].runes[n].id) {
                                return runes[j].slots[k].runes[n].name;
                            }
                        }
                    }
                }
            }
        }

        function findChampionName(id) {
            return championKeys[id];
        }

        function findSummonerSpell(id) {
            return summonerSpells[id];
        }

        function findTimeAgo(time) {
            if ((Date.now() - time) / 1000 < 60) {
                return Math.floor((Date.now() - time) / 60).toString() +  ' seconds ago';
            }
            if ((Date.now() - time) / 60000 < 60) {
                return Math.floor((Date.now() - time) / 60000).toString() + ' minutes ago';
            }
            if ((Date.now() - time) / 3600000 < 24) {
                return Math.floor((Date.now() - time) / 3600000).toString() + ' hours ago';
            }
            if ((Date.now() - time) / 86400000 < 31) {
                return Math.floor((Date.now() - time) / 86400000).toString() + ' days ago';
            }
            if ((Date.now() - time) / 2592000000 < 12) {
                return Math.floor((Date.now() - time) / 2592000000).toString() + ' months ago';
            }
        }
    
        allStats['gameDuration'] = { 'minutes': Math.floor(parseInt(match.gameDuration) / 60), 'seconds': parseInt(match.gameDuration) % 60 };
        allStats['gameType'] = (match.queueId == 420 ? 'Ranked Solo' : 'Normals');
        allStats['daysAgo'] = findTimeAgo(parseInt(match.gameCreation));
    
        const teams = {};
        teams[match.teams[0].teamId] = match.teams[0].win;
        teams[match.teams[1].teamId] = match.teams[1].win;
        allStats['winner'] = teams;
    
        const playerStats = {};
        var killParticipation = 0;
        var totalTeamKillsTeam1 = 0;
        var totalTeamKillsTeam2 = 0;
        var playerTeamId = ''
        for (j = 0; j < 10; j++) {
            const stats = {};
            const player = match.participants[j];
    
            stats['team'] = player.teamId;
            stats['championLevel'] = player.stats.champLevel;
            stats['player'] = findSummonerName(player.participantId);
            stats['champion'] = await findChampionName(player.championId);
            stats['summonerSpells'] = { 'spell1': findSummonerSpell(player.spell1Id), 'spell2': findSummonerSpell(player.spell2Id) };
            stats['runes'] = { 'primaryRune': findRune(player.stats.perk0), 'secondaryRune': findRune(player.stats.perkSubStyle) };
    
            const kills = parseInt(player.stats.kills);
            const assists = parseInt(player.stats.assists);
            const deaths = parseInt(player.stats.deaths);
            stats['kda'] = { 'kills': kills, 'deaths': deaths, 'assists': assists, 'kda': ((kills + assists) / deaths).toFixed(2) };
    
            stats['damage'] = player.stats.totalDamageDealtToChampions;
            stats['wards'] = player.stats.wardsPlaced;
            stats['cs'] = { 'totalCS': player.stats.totalMinionsKilled, 'cspm': (parseInt(player.stats.totalMinionsKilled) / (parseInt(match.gameDuration) / 60)).toFixed(1) };
            stats['items'] = { 'item1': player.stats.item0, 'item2': player.stats.item1, 'item3': player.stats.item2, 'item4': player.stats.item3, 'item5': player.stats.item4, 'item6': player.stats.item5, 'item7': player.stats.item6};
    
            if (player.teamId == '100') {
                totalTeamKillsTeam1 = totalTeamKillsTeam1 + kills;
            } else {
                totalTeamKillsTeam2 = totalTeamKillsTeam2 + kills;
            }

            playerStats[stats.player] = stats;

            if (findSummonerName(player.participantId) == summonerInfo.name) {
                playerTeamId = player.teamId;
                allStats['win'] = (allStats['winner'][player.teamId] == 'Win' ? 'Victory' : 'Defeat');
                killParticipation = kills + assists;
            }
        }
        allStats['players'] = playerStats;
        const totalTeamKills = (playerTeamId == '100' ? totalTeamKillsTeam1 : totalTeamKillsTeam2);
        allStats['killParticipation'] = Math.floor(killParticipation / totalTeamKills * 100);

        allGames.push(allStats);
        console.log(i);
    }

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(allGames, null, 4));
});

module.exports = router;