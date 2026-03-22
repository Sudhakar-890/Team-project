const logoutBox = document.querySelector('.logoutBox img')
const deleteBox = document.querySelector('.deleteBox')

const overlay = document.querySelector('.overlay');
const deletePopup = document.querySelector('#deletePopup');
const logoutPopup = document.querySelector('#logoutPopup');

const yes = document.querySelectorAll('.yes');
const no = document.querySelectorAll('.no')

logoutBox.addEventListener('click', showPopupFunc);
deleteBox.addEventListener('click', showPopupFunc2) 

function showPopupFunc(){
    overlay.classList.add('showOverlay');
    logoutPopup.classList.add('showPopup');
    logoutBox.removeEventListener('click',showPopupFunc)
    yes.forEach((yesBtn)=>{
        yesBtn.onclick = () =>{
            window.location.href = '/Team-project/';
        }
    });
    no.forEach((noBtn)=>{
        noBtn.onclick = () =>{
            overlay.classList.remove('showOverlay');
            logoutPopup.classList.remove('showPopup');
            logoutBox.addEventListener('click', showPopupFunc);
        }

    });
}

function showPopupFunc2(){
    overlay.classList.add('showOverlay');
    deletePopup.classList.add('showPopup');
    deleteBox.removeEventListener('click', showPopupFunc2);
    yes.forEach((yesBtn) => {
        yesBtn.onclick = () => {
            window.location.href = '/Team-project/';
        }
    });
    no.forEach((noBtn) => {
        noBtn.onclick = () => {
            overlay.classList.remove('showOverlay');
            deletePopup.classList.remove('showPopup');
            deleteBox.addEventListener('click', showPopupFunc2);
        }
    });
}