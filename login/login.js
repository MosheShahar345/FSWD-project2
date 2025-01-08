// Call the function to create the elements
class Login {
    constructor() {
        this.loggedOut = document.getElementById('logged-out');
        this.loggedIn = document.getElementById('logged-in');
        this.loggedInButton = document.getElementById('logged-in-button');
        this.profileInfo = document.getElementById('profile-info');

        this.loginBox = document.getElementById('login-box');
        this.overlay = document.getElementById('overlay');
        this.loginButton = document.getElementById('login-button');
        this.submitLogin = document.getElementById('submit-login');
        this.SignInButton = document.getElementById('sign-in-button');
        this.SignInBox = document.getElementById('sign-in-box');
        this.closeLogin = document.getElementById('close-login');
        this.closeSignIn = document.getElementById('close-sing-in');
        this.createEventListeners();

        this.formData = null;

        let isLoggedIn = localStorage.getItem("isLoggedIn");
        if(isLoggedIn) {
            this.goLoggedIn();
        }
    }

    goLoggedOut() {
        this.loggedIn.style.display = 'none';
        this.loggedOut.style.display = 'block';
    }

    goLoggedIn() {
        this.loggedIn.style.display = 'block';
        this.loggedOut.style.display = 'none';
    }

    createEventListeners() {
        this.loginButton.addEventListener('click', () => {
            this.loginBox.style.display = 'block';
            this.overlay.style.display = 'block';
        });

        this.SignInButton.addEventListener('click', () => {
            this.SignInBox.style.display = 'block';
            this.overlay.style.display = 'block';
        });

        this.closeLogin.addEventListener('click', () => {
            this.loginBox.style.display = 'none';
            this.overlay.style.display = 'none';
        });

        this.closeSignIn.addEventListener('click', () => {
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';
        });


        this.overlay.addEventListener('click', () => {
            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';
        });

        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.formData = new FormData(e.target);
            var object = {};
            this.formData.forEach(function(value, key){
                object[key] = value;
            });
            localStorage.setItem("user", JSON.stringify(object));
            localStorage.setItem("isLoggedIn", true);

            this.goLoggedIn();
            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';

        });

        this.loggedInButton.addEventListener('click', () => {
            if(this.profileInfo.style.display === 'none') {
                this.profileInfo.style.display = 'block';
            } else {
                this.profileInfo.style.display = 'none';
            }
        });
    }
}

const login = new Login();