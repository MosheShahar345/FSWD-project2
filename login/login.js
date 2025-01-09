// Call the function to create the elements
class Login {
    constructor() {
        this.loggedOut = document.getElementById('logged-out');
        this.loggedIn = document.getElementById('logged-in');
        this.loggedInButton = document.getElementById('logged-in-button');
        this.logOutButton = document.getElementById('log-out-button');

        this.profileInfo = document.getElementById('profile-info');
        this.profileMail = document.getElementById('profile-info-mail');
        this.profileLeaderboardButton = document.getElementById('profile-info-leaderboard');

        this.loginBox = document.getElementById('login-box');
        this.overlay = document.getElementById('overlay');
        this.loginButton = document.getElementById('login-button');

        this.submitLoginForm = document.getElementById('submit-login-form');
        this.submitSigninForm = document.getElementById('submit-signin-form');

        this.SignInButton = document.getElementById('sign-in-button');
        this.SignInBox = document.getElementById('sign-in-box');
        this.closeLogin = document.getElementById('close-login');
        this.closeSignIn = document.getElementById('close-sing-in');
        this.SignInForm = document.getElementById('submit-signin-form');
        console.log(this.SignInForm);

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

        this.profileInfo.style.display = 'none';
    }

    goLoggedIn() {
        this.loggedIn.style.display = 'block';
        this.loggedOut.style.display = 'none';

        //set email
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let gmail = currentUser["email"];
        this.profileMail.textContent = gmail;

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


        this.SignInForm.addEventListener('input', () => {
            this.validateForm();
        });

        this.submitSigninForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(e.target);
            var object = {'snakeHighScore': 0, 'minesweeperScore': 0};
            formData.forEach(function(value, key){
                object[key] = value;
            });
          
            this.signinAttempt(object);
            //localStorage.setItem(object["username"], JSON.stringify(object));

            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';

        });

        this.submitLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(e.target);
            var object = {'snakeHighScore': 0, 'minesweeperScore': 0};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            this.loginAttempt(object["username"], object["password"]);

            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';

        });

        this.logOutButton.addEventListener('click', () => {
            this.goLoggedOut();
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
        if(!userData) {
            alert("password incorrect");
            return;
        }
        let user = JSON.parse(userData);
        let passwordLS = user["password"];
        let loginAttempts = parseInt(localStorage.getItem("loginAttempts"));
        if(loginAttempts > 2) {
            alert("too many attempts");
        } else if(passwordLS !== password) {
            alert("password incorrect");
            let newLoginAttempts = loginAttempts + 1;
            localStorage.setItem("loginAttempts", newLoginAttempts);
        } else {
            localStorage.setItem("currentUser", userData);
            this.goLoggedIn();
        }
    }
    
    validateForm() {
        const username = document.getElementById('sign-in-username').value;
        const password = document.getElementById('sign-in-password').value;
        const confirmPassword = document.getElementById('sign-in-confirm-password').value;
        const submitBtn = document.getElementById('submit-signin-button');
        const errorElement = document.getElementById('password-error');

        let isValid = true;

        if (!username || !password || !confirmPassword) {
            isValid = false;
        }

        if (password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            errorElement.classList.remove('success');
            errorElement.classList.add('error');
            isValid = false;
        } else {
            errorElement.textContent = 'Passwords match';
            errorElement.classList.remove('error');
            errorElement.classList.add('success');
        }

        if (isValid) {
            submitBtn.classList.add('enabled');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('enabled');
            submitBtn.disabled = true;
        }
    }
}

const login = new Login();