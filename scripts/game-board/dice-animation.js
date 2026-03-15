// change the dice as per player wise
let diceInit = 0;
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

displayDice(diceInit);

function displayDice(value){
    if(value>=4){
        diceInit = 0;
    }
    playersDice[diceInit].insertAdjacentHTML('afterbegin', diceHTML);
    addDiceEvent();
}

// dice roll

function addDiceEvent(){
    let currentX = 0;
    let currentY = 0;
    const dice = document.querySelector(".dice");
    console.log(dice)
    dice.addEventListener('click',rollDice)
    function rollDice() {
        document
        const random = Math.floor(Math.random() * 6 + 1);
        // const random = 4;
        let x = 0;
        let y = 0;

        console.log(random);
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
        console.log(dice)
        dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        console.log('Rolling')
        setTimeout(() => {
            if (random!=6) {
                playersDice[diceInit].innerHTML = '';
                diceInit+=1;
                console.log(diceInit+'from setTimeout')
                displayDice(diceInit);
                console.log('Rolling completed')
            }

            else{
                addDiceEvent();
            }
        }, 2000)
    }
}

