document.addEventListener('click',(e)=>{
    if(e.target.closest('#lessThen')){
        window.location.href = '/game-lobby.html';
    }
})