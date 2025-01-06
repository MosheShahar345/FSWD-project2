
function createHeader() {
    const header = document.createElement('header');

    const title = document.createElement('h1');
    title.textContent = "Welcome to GamesHub";

    const nav = document.createElement('div');
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
        nav.appendChild(a);
    });

    header.appendChild(title);
    header.appendChild(nav);

    document.body.insertAdjacentElement("afterbegin", header);
    return header;
}