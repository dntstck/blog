// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: binds control keys for navigation

document.addEventListener("keydown", (e) => {
    const sections = [
        `${base}/`,
        `${base}/boot.html`,
        `${base}/advanced.html`,
        `${base}/info.html`
        `${base}/exit.html`
    ];

    let current = sections.indexOf(window.location.pathname.replace(window.location.origin, ""));

    // down - next section
    if (e.key === "ArrowDown") {
        current = (current + 1) % sections.length;
        window.location = sections[current];
    }

    // up - previous section
    if (e.key === "ArrowUp") {
        current = (current - 1 + sections.length) % sections.length;
        window.location = sections[current];
    }

    // f10 
    if (e.key === "F10") {
        window.location = `${base}/exit.html`;
    }

    // f1 
    if (e.key === "F1") {
        window.location = `${base}/info.html`;
    }

    // esc 
    if (e.key === "Escape") {
        window.location = `${base}/`;
    }
});

function biosExit() {
    window.location = `${base}/exit.html`;
}

function biosMain() {
    window.location = `${base}/`;
}

function biosInfo() {
    window.location = `${base}/info.html`;
}
