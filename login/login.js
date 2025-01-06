// Call the function to create the elements
class Login {
    constructor(user, LoggedInUI) {
        this.createLoginAndSignInBoxes();
        this.loginButton = document.getElementById('login-button');
        this.loginBox = document.getElementById('login-box');
        this.submitLogin = document.getElementById('submit-login');

        this.SignInButton = document.getElementById('sign-in-button');
        this.SignInBox = document.getElementById('sign-in-box');
        this.overlay = document.getElementById('overlay');
        this.closeLogin = document.getElementById('close-login');
        this.closeSignIn = document.getElementById('close-sing-in');
        this.createEventListeners();

        this.user = user;

        this.formData = null;
        this.loggedInUI = LoggedInUI;
    }

    createLoginAndSignInBoxes() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        document.body.appendChild(overlay);

        // Create login box
        const loginBox = document.createElement('div');
        loginBox.className = 'login-box';
        loginBox.id = 'login-box';

        const loginHeader = document.createElement('h3');
        loginHeader.textContent = 'Login';
        loginBox.appendChild(loginHeader);

        const loginForm = document.createElement('form');

        const loginUsernameLabel = document.createElement('label');
        loginUsernameLabel.htmlFor = 'login-username';
        loginUsernameLabel.textContent = 'Username:';
        loginForm.appendChild(loginUsernameLabel);
        loginForm.appendChild(document.createElement('br'));

        const loginUsernameInput = document.createElement('input');
        loginUsernameInput.type = 'text';
        loginUsernameInput.id = 'login-username';
        loginUsernameInput.name = 'username';
        loginForm.appendChild(loginUsernameInput);
        loginForm.appendChild(document.createElement('br'));
        loginForm.appendChild(document.createElement('br'));

        const loginPasswordLabel = document.createElement('label');
        loginPasswordLabel.htmlFor = 'login-password';
        loginPasswordLabel.textContent = 'Password:';
        loginForm.appendChild(loginPasswordLabel);
        loginForm.appendChild(document.createElement('br'));

        const loginPasswordInput = document.createElement('input');
        loginPasswordInput.type = 'password';
        loginPasswordInput.id = 'login-password';
        loginPasswordInput.name = 'password';
        loginForm.appendChild(loginPasswordInput);
        loginForm.appendChild(document.createElement('br'));
        loginForm.appendChild(document.createElement('br'));

        const SubmitLogin = document.createElement('button');
        SubmitLogin.type = 'submit';
        SubmitLogin.id = 'submit-login';
        SubmitLogin.textContent = 'Login';
        loginForm.appendChild(SubmitLogin);

        const closeLoginButton = document.createElement('button');
        closeLoginButton.type = 'button';
        closeLoginButton.id = 'close-login';
        closeLoginButton.textContent = 'Close';
        loginForm.appendChild(closeLoginButton);

        loginBox.appendChild(loginForm);
        document.body.appendChild(loginBox);

        // Create sign-in box
        const signInBox = document.createElement('div');
        signInBox.className = 'sign-in-box';
        signInBox.id = 'sign-in-box';

        const signInHeader = document.createElement('h3');
        signInHeader.textContent = 'Sign In';
        signInBox.appendChild(signInHeader);

        const signInForm = document.createElement('form');

        const signInUsernameLabel = document.createElement('label');
        signInUsernameLabel.htmlFor = 'sign-in-username';
        signInUsernameLabel.textContent = 'Username:';
        signInForm.appendChild(signInUsernameLabel);
        signInForm.appendChild(document.createElement('br'));

        const signInUsernameInput = document.createElement('input');
        signInUsernameInput.type = 'text';
        signInUsernameInput.id = 'sign-in-username';
        signInUsernameInput.name = 'username';
        signInForm.appendChild(signInUsernameInput);
        signInForm.appendChild(document.createElement('br'));
        signInForm.appendChild(document.createElement('br'));

        const signInEmailLabel = document.createElement('label');
        signInEmailLabel.htmlFor = 'sign-in-email';
        signInEmailLabel.textContent = 'Email:';
        signInForm.appendChild(signInEmailLabel);
        signInForm.appendChild(document.createElement('br'));

        const signInEmailInput = document.createElement('input');
        signInEmailInput.type = 'text';
        signInEmailInput.id = 'sign-in-email';
        signInEmailInput.name = 'email';
        signInForm.appendChild(signInEmailInput);
        signInForm.appendChild(document.createElement('br'));
        signInForm.appendChild(document.createElement('br'));

        const signInPasswordLabel = document.createElement('label');
        signInPasswordLabel.htmlFor = 'sign-in-password';
        signInPasswordLabel.textContent = 'Password:';
        signInForm.appendChild(signInPasswordLabel);
        signInForm.appendChild(document.createElement('br'));

        const signInPasswordInput = document.createElement('input');
        signInPasswordInput.type = 'password';
        signInPasswordInput.id = 'sign-in-password';
        signInPasswordInput.name = 'password';
        signInForm.appendChild(signInPasswordInput);
        signInForm.appendChild(document.createElement('br'));
        signInForm.appendChild(document.createElement('br'));

        const verifyPasswordLabel = document.createElement('label');
        verifyPasswordLabel.htmlFor = 'sign-in-verify-password';
        verifyPasswordLabel.textContent = 'Verify Password:';
        signInForm.appendChild(verifyPasswordLabel);
        signInForm.appendChild(document.createElement('br'));

        const verifyPasswordInput = document.createElement('input');
        verifyPasswordInput.type = 'password';
        verifyPasswordInput.id = 'sign-in-verify-password';
        verifyPasswordInput.name = 'verify-password';
        signInForm.appendChild(verifyPasswordInput);
        signInForm.appendChild(document.createElement('br'));
        signInForm.appendChild(document.createElement('br'));

        const signInButton = document.createElement('button');
        signInButton.type = 'submit';
        signInButton.id = 'submit-sign-in';
        signInButton.textContent = 'Login';
        signInForm.appendChild(signInButton);

        const closeSignInButton = document.createElement('button');
        closeSignInButton.type = 'button';
        closeSignInButton.id = 'close-sing-in';
        closeSignInButton.textContent = 'Close';
        signInForm.appendChild(closeSignInButton);

        signInBox.appendChild(signInForm);
        document.body.appendChild(signInBox);
    }

    createEventListeners() {
        this.loginButton.addEventListener('click', () => {
            this.loginBox.style.display = 'block';
            this.overlay.style.display = 'block';
            console.log("here 1");
        });

        this.SignInButton.addEventListener('click', () => {
            this.SignInBox.style.display = 'block';
            this.overlay.style.display = 'block';
            console.log("here 2");
        });

        this.closeLogin.addEventListener('click', () => {
            this.loginBox.style.display = 'none';
            this.overlay.style.display = 'none';
            console.log("here 3");
        });

        this.closeSignIn.addEventListener('click', () => {
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';
            console.log("here 4");
        });


        this.overlay.addEventListener('click', () => {
            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';
            console.log("here 5");
        });

        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("here 6")
            this.formData = new FormData(e.target);
            var object = {};
            this.formData.forEach(function(value, key){
                object[key] = value;
            });
            this.user.info = object;
            console.log(object);
            this.loginBox.style.display = 'none';
            this.SignInBox.style.display = 'none';
            this.overlay.style.display = 'none';

            this.loggedInUI();
        });
    }
}

//const loginui = new Login();
//loginui.initUI();