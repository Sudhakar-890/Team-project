import {currentUser,saveCurrentUser,saveUserData,userData} from '../../data/data.js';

const pTag = document.querySelectorAll('.profileUserDetails p');
fetchUserDetails(currentUser);

document.addEventListener('click',(e)=>{
    if(e.target.closest('#profileImg')){
        document.querySelector('.overlay').classList.add('showOverlay');
        closeProfileBox();
    }
});

function closeProfileBox(){
    document.querySelector('.profileUserBox .close').onclick = () =>{
        document.querySelector('.overlay').classList.remove('showOverlay');
    }
}


function fetchUserDetails(user){
    console.log(user)
    pTag[0].innerText = user[0].userEmail;

    const hTag = document.querySelector('.profileUserBox h2');
    hTag.innerText = user[0].userName;
}

pTag[1].onclick = changeInputBox;
    
function changeInputBox(){
    console.log('clicked')
    pTag[1].innerHTML = 
    `
        <input class='changePassInput'>
        <button>change</button>
    `;
    pTag[1].onclick = null;
    pTag[1].querySelector('button').onclick = changePass;
}

function changePass(){
    let input = pTag[1].querySelector('input');
    if(input.value){
        currentUser[0].userPassword = input.value;
        userData.forEach((user)=>{
            if(currentUser[0].userEmail===user.userEmail){
                user.userPassword = input.value; 
            }
        });
        saveCurrentUser(currentUser);
        saveUserData();
        input.value = '';
        pTag[1].innerHTML = '';
        pTag[1].innerText = 'change password';
        pTag[1].onclick = changeInputBox
    }
    else{
        window.alert('Enter password to change');
    }
}
