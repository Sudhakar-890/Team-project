import { calculateMoves } from "./game.js";

let currentPlayer = 0;
let lastDice = 0;

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

export function nextTurn() {

    if (lastDice !== 6) {
        currentPlayer++;
        if (currentPlayer > 3) currentPlayer = 0;
    }

    renderDice();

}

function renderDice() {

    diceSlots.forEach(s => s.innerHTML = "");

    diceSlots[currentPlayer].insertAdjacentHTML("afterbegin", diceHTML);

    const dice = diceSlots[currentPlayer].querySelector(".dice");

    dice.addEventListener("click", rollDice);

}

function rollDice() {

    const dice = diceSlots[currentPlayer].querySelector(".dice");

    const random = Math.floor(Math.random() * 6) + 1;

    lastDice = random;

    let x = 0, y = 0;

    switch (random) {
        case 2: y = -90; break;
        case 3: y = 90; break;
        case 4: x = 180; break;
        case 5: x = -90; break;
        case 6: x = 90; break;
    }

    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    dice.style.animation = "extraSpin 1s ease";

    setTimeout(() => {

        dice.style.animation = "";

        calculateMoves(currentPlayer, random);

    }, 1200);

}