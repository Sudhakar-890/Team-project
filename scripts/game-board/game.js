import { nextTurn } from "./dice-animation.js";

const players = [
    { coin1: 0, coin2: 0, coin3: 0, coin4: 0 },
    { coin1: 0, coin2: 0, coin3: 0, coin4: 0 },
    { coin1: 0, coin2: 0, coin3: 0, coin4: 0 },
    { coin1: 0, coin2: 0, coin3: 0, coin4: 0 }
];

const coinNames = ["coin1", "coin2", "coin3", "coin4"];

const origin = [1, 14, 27, 40];

export function calculateMoves(playerIndex, diceValue) {
    const coins = document.querySelectorAll(`.coin${playerIndex + 1}Img`);

    let movableCoins = [];

    // STEP 1: Determine movable coins
    console.log(coins)
    coins.forEach((coin, i) => {

        const coinName = coinNames[i];
        const position = players[playerIndex][coinName];
        
        // coin in base
        if (position === 0) {

            if (diceValue === 6) {
                movableCoins.push(i);
            }

        }

        // coin already on board
        else {

            movableCoins.push(i);

        }

    });

    // STEP 2: No possible move
    if (movableCoins.length === 0) {
        setTimeout(nextTurn, 800);
        return;
    }

    // STEP 3: Highlight movable coins
    movableCoins.forEach((i,movableCoin) => {
        const coin = movableCoin;
        console.log(i,)
        coin.classList.add("selectCoin");

        coin.onclick = () => {

            const coinName = coinNames[i];
            const current = players[playerIndex][coinName];

            if (current === 0) {

                enterBoard(playerIndex, i);

            }
            else {

                moveCoin(playerIndex, i, diceValue);

            }

            clearSelection(playerIndex);

            nextTurn();

        };

    });

}

function enterBoard(playerIndex, coinIndex) {

    const coins = document.querySelectorAll(`.coin${playerIndex + 1}Img`);

    const coin = coins[coinIndex];

    const coinName = coinNames[coinIndex];

    const start = origin[playerIndex];

    players[playerIndex][coinName] = start;

    document.querySelector(`.index-${start}`).appendChild(coin);

}

function moveCoin(playerIndex, coinIndex, diceValue) {

    const coins = document.querySelectorAll(`.coin${playerIndex + 1}Img`);

    const coin = coins[coinIndex];

    const coinName = coinNames[coinIndex];

    let current = players[playerIndex][coinName];

    let next = current + diceValue;

    if (next > 52) next = next - 52;

    players[playerIndex][coinName] = next;

    document.querySelector(`.index-${next}`).appendChild(coin);

}

function clearSelection(playerIndex) {

    const coins = document.querySelectorAll(`.coin${playerIndex + 1}Img`);

    coins.forEach(c => {
        c.classList.remove("selectCoin");
        c.onclick = null;
    });

}