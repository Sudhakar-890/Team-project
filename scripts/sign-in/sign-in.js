import { userData,saveCurrentUser } from "../../data/data.js";
console.log(userData)

document.addEventListener('DOMContentLoaded',()=>{
    console.log('loaded')
    const email = document.querySelector('#emailBar input');
    const password = document.querySelector('#passwordBar input');

    const signinBtn = document.querySelector('#signinBar button');

    signinBtn.addEventListener('click', () => {
        console.log('sign in clicked')
        let emailText = email.value;
        let passwordText = password.value;
        console.log(emailText,passwordText)

        let verify = userData.filter((user) => {
            console.log(user.userEmail === emailText, user.userPassword === passwordText)
            if ((user.userEmail === emailText || user.userName === emailText) && user.userPassword === passwordText) {
                return {
                    userEmail : user.userEmail,
                    userName : user.userName,
                    userPassword : passwordText
                };
            }
        })

        saveCurrentUser(verify);

        setTimeout(()=>{
            if (verify.length ==1) {
                email.value = '';
                password.value = '';
                window.location.href = 'game-lobby.html';
            }

            else {
                window.alert('Invalid userID , Password !')
                email.value = '';
                password.value ='';
            }
        },500)

    })
})

