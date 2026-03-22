export let userData = JSON.parse(localStorage.getItem('userData'))
 ||
[{
    userEmail : 'sudhakarsuresh4321@gmail.com',
    userName : 'sudhakar-890',
    userPassword : '123'
},{
    userEmail: ' ',
    userName: 'sudhakar-890',
    userPassword: ' '

}];

export function saveUserData(){
    localStorage.setItem('userData',JSON.stringify(userData));
    userData = JSON.parse(localStorage.getItem('userData')) || [{
        userEmail: 'sudhakarsuresh4321@gmail.com',
        userName: 'sudhakar-890',
        userPassword: '123'
    }];
}

export function saveCurrentUser(verify){
    localStorage.setItem('currentUser', JSON.stringify(verify));
    getCurrentUser();
}

// get the current user from localStorage
export let currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];

function getCurrentUser(){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
}

export function saveNewUser(newUser){
    userData.push(newUser[0]);
    saveUserData();
    saveCurrentUser(newUser);
}

export function deleteAccount(newUserData){
    userData = newUserData;
    saveCurrentUser([]);
    saveUserData();
    return userData;
}

/* theme board */

export let coinSelect = JSON.parse(localStorage.getItem('coinSelect')) || 0;

export function changeCoinSelect(option){
    localStorage.setItem('coinSelect',JSON.stringify(option));
    coinSelect = JSON.parse(localStorage.getItem('coinSelect')) || 0;
}


