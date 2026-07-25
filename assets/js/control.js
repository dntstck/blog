// author: dntstck | dru delarosa
// url: https://github.com/dntstck 
// info: binds control keys for navigation

document.addEventListener("keydown", (e) => {
    const sections = [
        "{{ site.baseurl }}/main.html",
        "{{ site.baseurl }}/boot.html",
        "{{ site.baseurl }}/adv.html",
        "{{ site.baseurl }}/info.html"
    ];

    let current = sections.indexOf(window.location.pathname.replace(window.location.origin, ""));

    // Arrow Down → next section
    if (e.key === "ArrowDown") {
        current = (current + 1) % sections.length;
        window.location = sections[current];
    }

    // Arrow Up → previous section
    if (e.key === "ArrowUp") {
        current = (current - 1 + sections.length) % sections.length;
        window.location = sections[current];
    }

    // F10 → Save & Exit
    if (e.key === "F10") {
        window.location = "{{ site.baseurl }}/exit.html";
    }

    // F1 → Info
    if (e.key === "F1") {
        window.location = "{{ site.baseurl }}/info.html";
    }

    // Esc → back to MAIN
    if (e.key === "Escape") {
        window.location = "{{ site.baseurl }}/main.html";
    }

    
});

function biosExit() {
    window.location = `{{ site.baseurl }}/exit.html`;
}

function biosMain() {
    window.location = `{{ site.baseurl }}/main.html`;
}

function biosInfo() {
    window.location = `{{ site.baseurl }}/info.html`;
}

