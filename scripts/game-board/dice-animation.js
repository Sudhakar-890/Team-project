import { playerNameList,playerCount } from "../../data/game-configure.js";
import { calculateMoves } from "./game.js";
import './game-layout.js';
import { coinSelect, saveHistory } from "../../data/data.js";


// dayjs to get time

let today= dayjs();

let time = today.format('hh:mm A');
let date = today.format('DD/MM/YYYY');

console.log(time,date);

let currentPlayer = 0;
let lastDiceValue = 0;

console.log(playerNameList);

export let wonPlayers = [];

const diceSlots = document.querySelectorAll(".diceSlot");

const diceHTML = `
<div class="diceContainer">
 <div class="dice">
  <div class="face1"><img src="./assets/dice/one.png"></div>
  <div class="face2"><img src="./assets/dice/two.png"></div>
  <div class="face3"><img src="./assets/dice/three.png"></div>
  <div class="face4"><img src="./assets/dice/four.png"></div>
  <div class="face5"><img src="./assets/dice/five.png"></div>
  <div class="face6"><img src="./assets/dice/six.png"></div>
 </div>
</div>
`;

renderDice();

export function nextTurn(inc) {
    if(wonPlayers.length!==0){
        let wonIndex = wonPlayers[0];
        saveHistory(wonIndex,playerNameList[wonIndex],coinSelect,playerCount,time,date);
        window.location.href = '/game-lobby.html';
        return;
    }

    if (lastDiceValue !== 6 ) {
        currentPlayer=inc;
        if (currentPlayer > (playerCount-1)) currentPlayer = 0;
        if (wonPlayers.includes(currentPlayer)) nextTurn(currentPlayer+1);
    }
    renderDice();

}

function renderDice() {  
    diceSlots.forEach(s => s.innerHTML = "");
    diceSlots[currentPlayer].insertAdjacentHTML("afterbegin", diceHTML);
    const dice = diceSlots[currentPlayer].querySelector(".dice");
    dice.addEventListener("click", rollDice);
    document.onkeydown = (event) =>{
        if(event.key==' '){
            event.key.preventDefault;
            rollDice();
        }
    }
}

function rollDice() {
    const dice = diceSlots[currentPlayer].querySelector(".dice");
    document.onkeydown = null;
    dice.removeEventListener('click',rollDice);
    const random =  Math.floor(Math.random() * 6) + 1 ; 
    lastDiceValue = random;

    let x = 0, y = 0;

    switch (random) {
        case 1:
            x = 1080;
            y = 720;
            break;
        case 2:
            x = 720;
            y = -90 -1080;
            break;
        case 3:
            x = 720;
            y = 90 + 1080; 
            break;
        case 4: 
            x = 180 + 1080; 
            y = 720;
            break;
        case 5: 
            x = -90 -1080; 
            y = 720;
            break;
        case 6: 
            x = 90 + 1080; 
            y = 720;
            break;
    }

    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    // dice.style.animation = "extraSpin 1s ease-out";

    setTimeout(() => {
        // dice.style.animation = "";
        calculateMoves(currentPlayer, random);
    }, 1500);

}