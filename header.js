
class Header {
    constructor() {
        this.header = document.createElement('header');
        this.nav = document.createElement('div');
    }
    createHeader() {
        const title = document.createElement('h1');
        title.textContent = "Welcome to GamesHub";

        const links = [
            { href: '#', text: 'Login', id: 'login-button' },
            { href: '#', text: 'Sign In', id: 'sign-in-button' },
        ];

        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (link.id) a.id = link.id;
            a.classList.add('header-button');
            this.nav.appendChild(a);
        });

        this.header.appendChild(title);
        this.header.appendChild(this.nav);

        document.body.insertAdjacentElement("afterbegin", this.header);
    }
    LoggedInUI() {

        this.header.removeChild(this.nav);

        const title = document.createElement('h1');
        title.textContent = "Welcome to GamesHub";

        this.nav = document.createElement('div');

        const a = document.createElement('a');
        a.href = "#";
        a.textContent = 'Logged In';
        a.classList.add('header-button');
        this.nav.appendChild(a);
        this.header.appendChild(this.nav);
    }
}