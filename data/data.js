export let userData = JSON.parse(localStorage.getItem('userData'))
 ||
[{
    userEmail : 'sudhakarsuresh4321@gmail.com',
    userName : 'sudhakar-890',
    userPassword : '123'
}];

function saveUserData(){
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
export let currentUser = [];

function getCurrentUser(){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
}

export function saveNewUser(newUser){
    userData.push(newUser);
    saveUserData();
    saveCurrentUser(newUser);
}

