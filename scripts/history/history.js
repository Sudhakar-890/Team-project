import {history} from '../../data/data.js';

document.addEventListener('DOMContentLoaded',()=>{
    buildHistoryHtml();
});

function buildHistoryHtml(){
    let html = '';
    
    if(history.length===0){
        html = 
        `
            <div class='box'>
                <div class='emptyBox'>
                    <h1>-- No history ! --</h1>
                </div>
            </div>
        `
    }

    else{
        history.forEach((h, i) => {
            html =
                `
        <div class="box box-${i}">
            <div class="top">
                <h2 class="winner">winner : ${h.name}</h2>
                <img src="../../assets/coins/${h.coinColor}-${h.coin}.png" class="winnerCoin">
            </div>
            <div class="bottom">
                <h4 class="playerCount">${h.count} players</h4>
                <h4 class="gameTime">${h.time}</h4>
                <h4 class="gameDate">${h.date}</h4>
            </div>
        </div>
        `;
        })
    }

    console.log(document.querySelector('.main'))
    document.querySelector('.main .boxHolder').insertAdjacentHTML('afterbegin',html);
}
