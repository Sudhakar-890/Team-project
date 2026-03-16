let player1 = {
    coin1: 0,
    coin2: 0,
    coin3: 0,
    coin4: 0, reachedOrigin: false };

let player2 = {
    coin1: 0,
    coin2: 0,
    coin3: 0,
    coin4: 0, reachedOrigin: false };

let player3 = {
    coin1: 0,
    coin2: 0,
    coin3: 0,
    coin4: 0, reachedOrigin: false };

let player4 = { 
    coin1: 0,
    coin2: 0, 
    coin3: 0, 
    coin4: 0, reachedOrigin:false };

let coinDetails = {
    player1 : {origin:1,home:51},
    player2 : {origin:14,home:12},
    player3 : {origin:27,home:25},
    player4 : {origin:40,home:38}
}

const GamePlayers = [player1,player2,player3,player4];
let preventRunAgain = false;

export function calculateMoves(diceIndex,random){
    let handlers = [];
    let coinsImg = document.querySelectorAll('.coin'+(diceIndex+1)+'Img');
    const findCoin = ['coin1', 'coin2', 'coin3', 'coin4'];

    GamePlayers.forEach((player,index1)=>{
        let targetCoins = Object.entries(player);
        if(index1===diceIndex){
            if(random===6 && !player.reachedOrigin){
             const controller = new AbortController();
                targetCoins.forEach((coin,index2)=>{
                 console.log(targetCoins[4]);
                    if(index2<4 && coin[1]==0){
                        coinsImg[index2].classList.add('selectCoin');
                       /* const handler = () => { enterOrigin(index1, index2); }
                        handlers.push(handler);*/
                        console.log('first if', index2);
                        coinsImg[index2].addEventListener('click',()=>{enterOrigin(index1,index2);controller.abort();},{signal:controller.signal});
                    }
                    else if(index2<4){
                        coinsImg[index2].classList.add('selectCoin');
                       /* const handler = () => moveCoin(index1, index2);
                        handlers.push(handler);*/
                        console.log('second if',index2);
                        coinsImg[index2].addEventListener('click',()=>{moveCoin(index1,index2);controller.abort();},{signal:controller.signal});
                    }
                });
            }

            else{
                targetCoins.forEach((coin,index2) => {
                    coinsImg[index2].classList.add('selectCoin');
                    /*let handler = () => moveCoin(index1, index2);
                    handlers[index2] = handler;*/
                    coinsImg[index2].addEventListener('click',moveCoin,{signal:controller.signal});
                });
            }
        }
    });

    // enter coin into origin
    function enterOrigin(playerIndex,coinIndex){
    
        GamePlayers[playerIndex][findCoin[coinIndex]] = 1;
        let reachedOriginCount = 0;
       /* handlers.forEach((handler,index)=>{
            coinsImg[index].removeEventListener('click', handler);
        })*/
        coinsImg.forEach((coinImg,index)=>{
            if(index===coinIndex){
                console.log(coinIndex)
                coinImg.classList.add('movingCoin');
                document.querySelector('.index-1').appendChild(coinImg);
            }
            if (GamePlayers[playerIndex][findCoin[index]]!=0){
                reachedOriginCount ++;
                console.log(reachedOriginCount,'reachedOriginCount');
            }
            coinImg.classList.remove('selectCoin');
        });

        if(reachedOriginCount===4){
            GamePlayers[playerIndex]['reachedOrigin'] = true;
            console.log('reachedOrigin all');
        }
        console.log(GamePlayers);
    }

    // move coins by rand number
    function moveCoin(playerIndex,coinIndex){
        console.log(coinIndex)
        GamePlayers[playerIndex][findCoin[coinIndex]] += random;
        const coinStep = GamePlayers[playerIndex][findCoin[coinIndex]];

       /* handlers.forEach((handler,index)=>{
            coinsImg[index].removeEventListener('click', handler);
        });*/

        console.log('move coin function');
        coinsImg.forEach((coinImg,index) => {
            if(index===coinIndex){
                console.log(document.querySelector(`.index-${coinStep}`));

                document.querySelector(`.index-${coinStep}`).appendChild(coinImg);
            }
            coinsImg[index].classList.remove('selectCoin');
        });

        console.log(GamePlayers)
    }
}
