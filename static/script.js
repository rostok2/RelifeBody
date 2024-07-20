function preventScroll(e) {
    e.preventDefault();
}

function preventScrollKeys(e) {
    const keys = [32, 37, 38, 39, 40]; // Space and arrow keys
    if (keys.includes(e.keyCode)) {
        e.preventDefault();
    }
}

function toggleMenu() {
    const nav = document.querySelector('.nav');
    const html = document.documentElement;
    const overlay = document.querySelector('.overlay');

    document.querySelector('.hamburger-menu').classList.toggle('active');
    nav.classList.toggle('open');
    html.classList.toggle('no-scroll');
    overlay.classList.toggle('active');

    if (nav.classList.contains('open')) {
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventScrollKeys);
    } else {
        window.removeEventListener('wheel', preventScroll, { passive: false });
        window.removeEventListener('touchmove', preventScroll, { passive: false });
        window.removeEventListener('keydown', preventScrollKeys);
    }
}

function closeMenu() {
    const nav = document.querySelector('.nav');
    const html = document.documentElement;
    const overlay = document.querySelector('.overlay');

    document.querySelector('.hamburger-menu').classList.remove('active');
    nav.classList.remove('open');
    html.classList.remove('no-scroll');
    overlay.classList.remove('active');

    window.removeEventListener('wheel', preventScroll, { passive: false });
    window.removeEventListener('touchmove', preventScroll, { passive: false });
    window.removeEventListener('keydown', preventScrollKeys);
}

document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);

document.addEventListener("DOMContentLoaded", function() {
    const offset = 30; // Висота відступу
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }

            // Close the menu after clicking a link
            closeMenu();
        });
    });
});
