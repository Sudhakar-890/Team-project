
document.addEventListener('click',(e)=>{
    if(e.target.closest('.gameHistory')){
        window.location.href = '/history.html';
    }

    if(e.target.closest('.gameLobby')){
        window.location.href = '/game-lobby.html';
    }

    if (e.target.closest('.themeBoard')) {
        window.location.href = '/board-theme.html';
    }
    
    if(e.target.closest('.computerMatch')){
        window.location.href = '/computer.html';
    }
    
    if(e.target.closest('.localMatch')){
        window.location.href = '/game-board.html';
    }
})



