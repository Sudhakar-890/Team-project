document.addEventListener('click',(e)=>{
    if(e.target.closest('.back')){
        window.location.href = '/game-lobby.html'
    }
})