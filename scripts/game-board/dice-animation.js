 // extra spins
        let currentX = 0;
        let currentY = 0;
        const dice = document.querySelector(".dice");
        dice.addEventListener('click', rollDice);
        function rollDice() {
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

            dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        }

rollDice();

// change the dice as per player wise

const players = document.querySelectorAll('.player');
console.log(players)