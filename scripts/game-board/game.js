import { nextTurn } from "./dice-animation.js";

const players = [
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 },
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 },
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 },
    { coin0: 0, coin1: 0, coin2: 0, coin3: 0 }
];

const coinNames = ["coin0", "coin1", "coin2", "coin3"];

const origin = [1, 14, 27, 40];
const home = [51,12,25,38];
const safeBox = [1,9,14,22,27,35,40,48];
const homeCoins = [];

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
        else if(position!==null) {
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
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function moveCoin(playerIndex, coinIndex, diceValue) {
    const coin = document.querySelector(`.coin${playerIndex + 1}Img[data-coin="${coinIndex}"]`);

    coin.classList.add('movingCoin');

    if(homeCoins.includes(coin)){
         console.log('already');
         homePath(playerIndex,coin,diceValue);
         return;
        };

    const coinName = coinNames[coinIndex];

    let playerHome = home[playerIndex];
    let targetBox;
    
    let current = players[playerIndex][coinName];
    let next = current + diceValue;

    if (next > 52) next -= 52;

    players[playerIndex][coinName] = next;

    for (let i = 1; i <= diceValue; i++) {
        let temp = current + i;
        if (temp > 52) temp -= 52;

        if(temp==playerHome+1){
            homeCoins.push(coin);
            homePath(playerIndex,coin,diceValue-i);
            return;
        }

        else{
            targetBox = document.querySelector(`.index-${temp}`);
        }
        
        if (targetBox) {
            targetBox.appendChild(coin);
            await delay(250);
        }
    }

    checkIndexBox(playerIndex, current, next);
    checkAttack(playerIndex, next);
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
function checkIndexBox(playerIndex, preBoxIndex, boxIndex) {
    const box = document.querySelector(`.index-${boxIndex}`);
    if (!box) return;
    
    function updateBoxUI () {
        const coinsInBox = box.querySelectorAll(`.coin${playerIndex + 1}Img`);
        const existingSpan = box.querySelector('.coinCount');
        
        if (existingSpan) existingSpan.remove();

        if (coinsInBox.length > 1) {
            const spanHtml = `<span class='coinCount coinCountSpan${boxIndex}'>${coinsInBox.length}</span>`;
            
            coinsInBox[0].insertAdjacentHTML('beforebegin', spanHtml);
        }
    };

    requestAnimationFrame(updateBoxUI);

    if (preBoxIndex !== null) {
        checkIndexBox(playerIndex, null, preBoxIndex);
    }
}

function checkAttack(playerIndex, boxIndex){
    let box = document.querySelector(`.index-${boxIndex}`);
    if (!box || safeBox.includes(boxIndex)) return;
    
    function updateBoxUI(){
        const myCoin  = box.querySelectorAll(`.coin${playerIndex+1}Img`);
        const coinInBox = box.querySelectorAll('img');
        if(myCoin.length==coinInBox.length) return;
        else{
            players.forEach((player,i)=>{
                if(playerIndex!=i){
                    console.log('player :',i);
                
                    let coinData = Object.entries(player);
                    coinData.forEach((coin,i2)=>{
                        if(coin[1]!==0){
                            let enemyCoin = box.querySelectorAll(`.coin${i + 1}Img[data-coin="${i2}"]`);

                            console.log(enemyCoin, i, i2)
                            if(enemyCoin){
                                const coinName = coinNames[i2];
                                players[i][coinName] = 0;
                                handleAttack(enemyCoin,i,i2);
                            }
                        }
                    }); 
                }
            })
        }
    }

    requestAnimationFrame(updateBoxUI);
}

function handleAttack(lostCoin,enemyPlayerIndex,coinIndex){
    let coinSlots = document.querySelectorAll(`.coin${enemyPlayerIndex+1}`);

    coinSlots.forEach((coinSlot,i)=>{

        if(coinIndex===i){
            let targetCoinSlot = coinSlot;
            lostCoin[0].classList.remove('movingCoin');
            targetCoinSlot.appendChild(lostCoin[0]);
        }
    });
}

async function homePath(playerIndex,coin,remainDiceValue){
    // console.log(playerIndex, coin, remainDiceValue);

    let initial = coin.parentElement.dataset.home || 1;

    for (let i = initial; i <= remainDiceValue +1;i++){

        if(i==6){
            const targetBox = document.querySelector(`.q${playerIndex+1}-home-origin`);
            coin.classList.add('homeCoin');
            coin.classList.remove('movingCoin');
            let coinIndex = coin.dataset.coin;
            let coinName = coinNames[coinIndex];
            players[playerIndex][coinName] = null;
            targetBox.appendChild(coin);
            return;
        }

        else{
            const targetBox = document.querySelector(`.h${playerIndex + 1}-Index-${i}`);
            targetBox.appendChild(coin);
        }
        
        await delay(250);
        
    }
    
}
