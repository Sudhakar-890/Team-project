import { nextTurn } from "./dice-animation.js";

const players = [
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 },
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 },
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 },
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 }
];

const coinNames = ["coin0", "coin1", "coin2", "coin3"];

const origin = [1, 14, 27, 40];
const safeBox = [1,9,14,22,27,35,40,48]

let beforeIndexBox = 0;

export function calculateMoves(playerIndex, diceValue) {
    const coinsNodeList = document.querySelectorAll(`.coin${playerIndex + 1}Img`);
    let coins = [0,1,2,3];
    coinsNodeList.forEach((node)=>{
        const id = node.dataset.coin;
        coins[id] = node;
    })

    let movableCoins = [];

    // movable coins
    coins.forEach((coin, i) => {

        const coinName = coinNames[i];
        const position = players[playerIndex][coinName];
        
        // coin in coin base
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

    // no coins to move
    if (movableCoins.length === 0) {
        setTimeout(nextTurn, 800);
        return;
    }

    // select the movable coins

    movableCoins.forEach((i) => {
        const coin = coins[i];
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

// move coin to the board
function enterBoard(playerIndex, coinIndex) {

    const coinsNodeList = document.querySelectorAll(`.coin${playerIndex + 1}Img`);
    let coins = [0, 1, 2, 3];
    coinsNodeList.forEach((node) => {
        const id = node.dataset.coin;
        coins[id] = node;
    })

    const coin = coins[coinIndex];
    coin.classList.add('movingCoin');
    const coinName = coinNames[coinIndex];

    const start = origin[playerIndex];
    players[playerIndex][coinName] = start;
    document.querySelector(`.index-${start}`).appendChild(coin);
    checkIndexBox(playerIndex,null,start);
}

// move the onboard coin
function moveCoin(playerIndex, coinIndex, diceValue) {

    const coinsNodeList = document.querySelectorAll(`.coin${playerIndex + 1}Img`);
    let coins = [0, 1, 2, 3];
    coinsNodeList.forEach((node) => {
        const id = node.dataset.coin;
        coins[id] = node;
    })

    const coin = coins[coinIndex];
    const coinName = coinNames[coinIndex];
    let current = players[playerIndex][coinName];
    let next = current + diceValue;

    if (next > 52){
        next = next - 52
    };

    players[playerIndex][coinName] = next;
     for(let i=current;i<=next;i++){
        setTimeout(()=>{
            document.querySelector(`.index-${i}`).appendChild(coin);
        },0)
    } 
    checkIndexBox(playerIndex,current,next);
}

//clear the selection after a player move

function clearSelection(playerIndex) {

    const coinsNodeList = document.querySelectorAll(`.coin${playerIndex + 1}Img`);
    let coins = [0, 1, 2, 3];
    coinsNodeList.forEach((node) => {
        const id = node.dataset.coin;
        coins[id] = node;
    })

    coins.forEach(c => {
        c.classList.remove("selectCoin");
        c.onclick = null;
    });

}

// coin count in moved box

function checkIndexBox(playerIndex,preBoxIndex,boxIndex){
    const box = document.querySelector(`.index-${boxIndex}`);
    console.log(playerIndex,preBoxIndex,boxIndex)
    let coinsInBox = box.querySelectorAll(`.coin${playerIndex + 1}Img`);
    console.log(coinsInBox.length,'coin length')
    if (coinsInBox.length > 1) {
        if (box.querySelector('.coinCount')){
            box.querySelector('.coinCount').remove()}
        let spanHtml =
            `
                <span class='coinCount coinCountSpan${boxIndex}' >
                    ${coinsInBox.length}
                </span>

            `;
        coinsInBox[0].insertAdjacentHTML('beforebegin', spanHtml);
    }

    else {
        console.log(boxIndex,box)
        if (box.querySelector('.coinCount')) {
            box.querySelector('.coinCount').remove()
        }
    }

    if (preBoxIndex) {
        // temp = boxIndex - preBoxIndex;
        console.log(preBoxIndex,'insidePreBVox')
        checkIndexBox(playerIndex,null,preBoxIndex);
    }
}

// this lebal how coins are in box

/*  */