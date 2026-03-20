document.querySelector('.computerMatch').onclick = () =>{
    window.location.href = '/computer.html';
}

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
})



