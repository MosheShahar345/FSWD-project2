const loginButton = document.getElementById('login-button');
const loginBox = document.getElementById('login-box');
const SignInButton = document.getElementById('sign-in-button');
const SignInBox = document.getElementById('sign-in-box');
const overlay = document.getElementById('overlay');
const closeLogin = document.getElementById('close-login');
const closeSignIn = document.getElementById('close-sing-in');

loginButton.addEventListener('click', () => {
    loginBox.style.display = 'block';
    overlay.style.display = 'block';
});

SignInButton.addEventListener('click', () => {
    SignInBox.style.display = 'block';
    overlay.style.display = 'block';
});

closeLogin.addEventListener('click', () => {
    loginBox.style.display = 'none';
    overlay.style.display = 'none';
});

closeSignIn.addEventListener('click', () => {
    SignInBox.style.display = 'none';
    overlay.style.display = 'none';
});


overlay.addEventListener('click', () => {
    loginBox.style.display = 'none';
    SignInBox.style.display = 'none';
    overlay.style.display = 'none';
});