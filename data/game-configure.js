export let playerCount = JSON.parse(localStorage.getItem('playerCount')) || 2;

export let playerNameList = JSON.parse(localStorage.getItem('playerNameList'));

export function changePlayerCount(count){
    localStorage.setItem('playerCount',JSON.stringify(count));

    playerCount = JSON.parse(localStorage.getItem('playerCount')) || ['Player1', 'Player2', 'Player3', 'Player4'];
}

export function fetchPlayerNames(nameArray){
    localStorage.setItem('playerNameList',JSON.stringify(nameArray));
    playerNameList = JSON.parse(localStorage.getItem('playerNameList')) || ['Player1', 'Player2', 'Player3', 'Player4'];
}