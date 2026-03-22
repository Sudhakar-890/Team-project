export let userData = JSON.parse(localStorage.getItem('userData'))
 ||
[{
    userEmail : 'hello',
    userPassword : '123'
}];

export function saveCurrentUser(verify){
    localStorage.setItem('currentUser', JSON.stringify(verify));
    getCurrentUser();
}


// get the current user from localStorage
let currentUser = [];

export function getCurrentUser(){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
}