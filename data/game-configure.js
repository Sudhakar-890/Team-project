export let playerCount = JSON.parse(localStorage.getItem('playerCount')) || 2;

export let playerNameList;

export function changePlayerCount(count){
    localStorage.setItem('playerCount',JSON.stringify(count));

    playerCount = JSON.parse(localStorage.getItem('playerCount'));
}

export function fetchPlayerNames(nameArray){
    playerNameList = nameArray;
}