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

        this.submitLoginForm = document.getElementById('submit-login-form');
        this.submitSigninForm = document.getElementById('submit-signin-form');

        this.SignInButton = document.getElementById('sign-in-button');
        this.SignInBox = document.getElementById('sign-in-box');
        this.closeLogin = document.getElementById('close-login');
        this.closeSignIn = document.getElementById('close-sing-in');
        this.createEventListeners();

        let currentUser = localStorage.getItem("currentUser");
        if(currentUser) {
            this.goLoggedIn();
        }
    }

    goLoggedOut() {
        this.loggedIn.style.display = 'none';
        this.loggedOut.style.display = 'block';
        localStorage.removeItem("currentUser");
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

        /*
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.formData = new FormData(e.target);
            var object = {};
            this.formData.forEach(function(value, key){
                object[key] = value;
            });
            localStorage.setItem("user", JSON.stringify(object));

            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';

        });*/
        this.submitSigninForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(e.target);
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            console.log(formData);
            this.signinAttempt(formData);
            //localStorage.setItem(object["username"], JSON.stringify(object));

            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';

        });

        this.submitLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(e.target);
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            this.loginAttempt(object["username"], object["password"]);

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

    signinAttempt(formData) {

        let checkUsername = localStorage.getItem(formData["username"]);
        if(checkUsername !== null) return false;//username already exists

        localStorage.setItem(formData["username"], JSON.stringify(formData));
        localStorage.setItem("currentUser", JSON.stringify(formData));
        this.goLoggedIn();
        return true;
    }

    loginAttempt(username, password) {
        let userData = localStorage.getItem(username);
        let user = JSON.parse(userData);
        let passwordLS = user["password"];
        if(passwordLS !== password) {
            let loginAttempts = localStorage.getItem("loginAttempts");
            if(loginAttempts > 4) {
                alert("too many attempts");
            } else {
                alert("password incorrect");
                let newLoginAttempts = loginAttempts + 1;
                localStorage.setItem("loginAttempts", newLoginAttempts);
            }
        } else {
            localStorage.setItem("currentUser", userData);
            this.goLoggedIn();
        }
    }
}

const login = new Login();