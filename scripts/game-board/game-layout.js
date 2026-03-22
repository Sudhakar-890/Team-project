import { playerCount,playerNameList } from "../../data/game-configure.js";
import { coinSelect } from "../../data/data.js";

let quardrants = ['','','',''];
let playerBoxes;

document.addEventListener('DOMContentLoaded', () => {
    // const unsortedQuadrants = document.querySelectorAll('div[id^="quadrant"]');
    // console.log(unsortedQuadrants);

    // quardrants[0] = unsortedQuadrants[2];
    // quardrants[1] = unsortedQuadrants[0];
    // quardrants[2] = unsortedQuadrants[1];
    // quardrants[3] = unsortedQuadrants[3];

    playerBoxes = document.querySelectorAll('.player');

    disableBox();
    
    changePlayerCoins();

    changePlayerNames();
});



function disableBox(){
    if(playerCount==2){
        playerBoxes[0].classList.remove('disableBoxes');
        // quardrants[0].classList.remove('disableBoxes');

        playerBoxes[1].classList.remove('disableBoxes');
        // quardrants[1].classList.remove('disableBoxes');

        playerBoxes[2].classList.add('disableBoxes');
        // quardrants[2].classList.add('disableBoxes');

        playerBoxes[3].classList.add('disableBoxes');
        // quardrants[3].classList.add('disableBoxes');
    }

    else if (playerCount == 3) {
        playerBoxes[0].classList.remove('disableBoxes');
        // quardrants[0].classList.remove('disableBoxes');

        playerBoxes[1].classList.remove('disableBoxes');
        // quardrants[1].classList.remove('disableBoxes');

        playerBoxes[2].classList.remove('disableBoxes');
        // quardrants[2].classList.remove('disableBoxes');

        playerBoxes[3].classList.add('disableBoxes');
        // quardrants[3].classList.add('disableBoxes');
    }

    else if (playerCount == 4) {
        playerBoxes[0].classList.remove('disableBoxes');
        // quardrants[0].classList.remove('disableBoxes');

        playerBoxes[1].classList.remove('disableBoxes');
        // quardrants[1].classList.remove('disableBoxes');

        playerBoxes[2].classList.remove('disableBoxes');
        // quardrants[2].classList.remove('disableBoxes');

        playerBoxes[3].classList.remove('disableBoxes');
        // quardrants[3].classList.remove('disableBoxes');
    }
}

function changePlayerCoins(){
    let imgString = coinSelect? 'pawn' : 'coin';
    console.log(coinSelect)
    for(let i=0;i<=3;i++){
        let playerCoin = document.querySelectorAll(`.coin${i+1}Img`);
        console.log(playerCoin);
        playerCoin.forEach((coin)=>{
            if(i===0){
                coin.setAttribute('src',`./assets/coins/green-${imgString}.png`);
            }

            else if(i===1){
                coin.setAttribute('src', `./assets/coins/red-${imgString}.png`);
            }

            else if (i === 2) {
                coin.setAttribute('src', `./assets/coins/blue-${imgString}.png`);
            }

            else if (i === 3) {
                coin.setAttribute('src', `./assets/coins/yellow-${imgString}.png`);
            }


            if (coinSelect === 1) {
                coin.classList.add('pawnSize');
            }
        })
    }
}

function changePlayerNames(){
    playerBoxes.forEach((player,i)=>{
        const boxName = player.querySelector('.playerName');
        playerNameList.forEach((name,i2)=>{
            if(i===i2){
                boxName.innerText = name;
            }
        })
    })
}