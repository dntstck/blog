// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: binds control keys for navigation

const base = "{{ site.baseurl }}";

document.addEventListener("keydown", (e) => {
    const sections = [
        `${base}/main.html`,
        `${base}/boot.html`,
        `${base}/adv.html`,
        `${base}/info.html`
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
        window.location = `${base}/main.html`;
    }
});

function biosExit() {
    window.location = `${base}/exit.html`;
}

function biosMain() {
    window.location = `${base}/main.html`;
}

function biosInfo() {
    window.location = `${base}/info.html`;
}
