import {calculateMoves} from './game.js';


// change the dice as per player wise
let diceIndex = 0;
let playersDice = document.querySelectorAll('.player .diceSlot');

let diceHTML =
 `
    <div class="diceContainer">
        <div class="dice">
            <div class="face1">
                <img src="./assets/dice/one.png">
            </div>
            <div class="face2">
                <img src="./assets/dice/two.png">
            </div>
            <div class="face3">
                <img src="./assets/dice/three.png">
            </div>
            <div class="face4">
                <img src="./assets/dice/four.png">
            </div>
            <div class="face5">
                <img src="./assets/dice/five.png">
            </div>
            <div class="face6">
                <img src="./assets/dice/six.png">
            </div>
        </div>
    </div>

    `;

displayDice(diceIndex);

function displayDice(value) {
 if (value >= 4) {
  diceIndex = 0;
 }
 playersDice[diceIndex].insertAdjacentHTML('afterbegin', diceHTML);
 addDiceEvent();
}

// dice roll
let currentX = 0;
let currentY = 0;
function addDiceEvent() {
 const dice = document.querySelector(".dice");
 
 dice.addEventListener('click', rollDice);
 
 function rollDice() {
   //const random = Math.floor(Math.random() * 6 + 1);
  const random = 6;
     console.log(random, 'dice number');
  let x = 0;
  let y = 0;
  
  switch (random) {
   case 1:
    break;
    
   case 2:
    y = -90;
    break;
    
   case 3:
    y = 90;
    break;
    
   case 4:
    x = 180;
    break;
    
   case 5:
    x = -90;
    break;
    
   case 6:
    x = 90;
    break;
  }
  
  currentX += x + 720;
  currentY += y + 720;
  
  dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
  
  setTimeout(() => {
   if (random != 6){
    currentX = 0
    currentY = 0;
    playersDice[diceIndex].innerHTML = '';
    diceIndex += 1;
    
    displayDice(diceIndex);
   }

    //move coins function
   calculateMoves(diceIndex,random);
  }, 1700)
 }
}