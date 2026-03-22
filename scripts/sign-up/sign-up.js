import { currentUser, saveCurrentUser, saveNewUser, userData} from "../../data/data.js";

const userName = document.querySelector('#username');
const userEmail = document.querySelector('#email');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');
const signupBtn = document.querySelector('.button');

signupBtn.addEventListener('click', createAccount);

function createAccount() {
    let emailText = userEmail.value;
    let userNameText = userName.value;
    let passText1 = password1.value;
    let passText2 = password2.value;

    if (emailText && userNameText && passText1 && passText2) {

        let existingUSer = userData.filter((user) => {
            if (user.userName === userNameText) {
                window.alert('username already exist');
            }

            else if (user.userEmail === emailText) {
                window.alert('user email already exist');
            }

            else {
                if (passText1 === passText2) {
                    let user = [{
                        userEmail: emailText,
                        userName: userNameText,
                        userPassword: passText1
                    }];
                    console.log(user)
                    saveCurrentUser(user)
                    saveNewUser(user);
                    setTimeout(()=>window.location.href = 'game-lobby.html',500);
                }
                else {
                    window.alert("Password doesn't match");
                }

            }
        });

    }

    else {
        window.alert('Please fill the empty feilds !');
    }
}
