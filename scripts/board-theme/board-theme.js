import { changeCoinSelect, coinSelect } from "../../data/data.js";

const coinBar = document.querySelectorAll('.coinCon');

selectCoin(coinSelect);

function selectCoin(coin){
    if(coin==0){
        coinBar[1].classList.remove('coinSelect');
        coinBar[0].classList.add('coinSelect');
    }

    else if (coin == 1) {
        coinBar[0].classList.remove('coinSelect');
        coinBar[1].classList.add('coinSelect');
    }
}

coinBar[0].addEventListener('click',()=>{
    changeCoinSelect(0);
    selectCoin(0);
});

coinBar[1].addEventListener('click', () => {
    changeCoinSelect(1);
    selectCoin(1);
});