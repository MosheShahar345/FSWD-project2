
let loginAttempts = localStorage.getItem("loginAttempts");
if(!loginAttempts) {
    localStorage.setItem("loginAttempts", 0);
}