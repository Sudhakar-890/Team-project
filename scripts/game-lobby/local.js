import {coinSelect} from '../../data/data.js';
import { changePlayerCount, fetchPlayerNames, playerCount } from '../../data/game-configure.js';

const playerBoxes = document.querySelectorAll('.playersContainer>div .playerName');
const coinSlots = document.querySelectorAll('.playersContainer .coin img');
const buttons = document.querySelectorAll('.buttons button');
const playBtn = document.querySelector('.play');
playBtn.addEventListener('click',prepareGame);

changeCoinImg(coinSelect);
selectPlayerCount(playerCount);

function changeCoinImg(coinSelect){
    if(coinSelect!=0){
        coinSlots[0].setAttribute('src','./assets/coins/green-pawn.png');
        coinSlots[1].setAttribute('src', './assets/coins/red-pawn.png')
        coinSlots[2].setAttribute('src','./assets/coins/blue-pawn.png')
        coinSlots[3].setAttribute('src', './assets/coins/yellow-pawn.png')
    }

    else{
        coinSlots[0].setAttribute('src', './assets/coins/green-coin.png');
        coinSlots[1].setAttribute('src', './assets/coins/red-coin.png')
        coinSlots[2].setAttribute('src', './assets/coins/blue-coin.png')
        coinSlots[3].setAttribute('src', './assets/coins/yellow-coin.png')
    }
}

function selectPlayerCount(count){

    buttons.forEach((btn,i)=>{
        if(i==(count-2)){
            btn.classList.add('select');
        }
        else{
            btn.classList.remove('select');
        }
        btn.addEventListener('click', () => {
            changePlayerCount(i + 2);
            selectPlayerCount(i + 2);
        });
    });
    disablePlayerBoxes();
}

function disablePlayerBoxes(){
    if(playerCount==2){
        playerBoxes[0].classList.remove('disableBox');
        playerBoxes[1].classList.remove('disableBox');
        playerBoxes[2].classList.add('disableBox');
        playerBoxes[3].classList.add('disableBox');
    }

    else if (playerCount == 3) {
        playerBoxes[0].classList.remove('disableBox');
        playerBoxes[1].classList.remove('disableBox');
        playerBoxes[2].classList.remove('disableBox');
        playerBoxes[3].classList.add('disableBox');
    }

    else if (playerCount == 4) {
        playerBoxes[0].classList.remove('disableBox');
        playerBoxes[1].classList.remove('disableBox');
        playerBoxes[2].classList.remove('disableBox');
        playerBoxes[3].classList.remove('disableBox');
    }
}

// getting name 

playerBoxes.forEach((box,i)=>{
    box.onclick = () => changeInputBox(i);
});

let boxIndex = 0;

function changeInputBox(index){
    playerBoxes.forEach((box, i) => {
        box.onclick = null;
    });
    boxIndex = index;
    playerBoxes[index].innerHTML = 
    `
    <input class='playerNameInput' placeholder='enter name...'>
    `;
    playerBoxes[boxIndex].querySelector('.playerNameInput').focus();
    setTimeout(() => document.addEventListener('click', changeName),500);
        
}

function changeName(){
    console.log('cliked documenteree')
    document.removeEventListener('click', changeName);
    let inputValue = playerBoxes[boxIndex].querySelector('.playerNameInput');
    if (inputValue.value) {
        playerBoxes[boxIndex].innerHTML = '';
        playerBoxes[boxIndex].innerText = inputValue.value;
        playerBoxes.forEach((box, i) => {
            box.onclick = () => changeInputBox(i);
        });
    }

    else{
        playerBoxes[boxIndex].innerHTML = '';
        playerBoxes[boxIndex].innerText = `Player${boxIndex+1}`;
        playerBoxes.forEach((box, i) => {
            box.onclick = () => changeInputBox(i);
        });
    }
}

function prepareGame(){

    let nameList = [];  
    playerBoxes.forEach((name)=>{
        nameList.push(name.innerText)
    })
    console.log(nameList);

    fetchPlayerNames(nameList);

    setTimeout(()=>window.location.href = '/game-board.html',500);
}