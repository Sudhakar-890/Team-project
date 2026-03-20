
document.addEventListener('click',(e)=>{
    if(e.target.closest('.gameHistory')){
        window.location.href = '/Team-project/history.html';
    }

    if(e.target.closest('.gameLobby')){
        window.location.href = '/Team-project/game-lobby.html';
    }

    if (e.target.closest('.themeBoard')) {
        window.location.href = '/Team-project/board-theme.html';
    }
    
    if(e.target.closest('.computerMatch')){
        window.location.href = '/Team-project/computer.html';
    }
    
    if(e.target.closest('.localMatch')){
        window.location.href = 'Team-project/game-board.html';
    }
})



