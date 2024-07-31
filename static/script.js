document.addEventListener("DOMContentLoaded", function() {
    const langSwitch = document.querySelector('.language-switch');
    const langUAElem = document.getElementById('language-ua');
    const langENElem = document.getElementById('language-en');

    langSwitch.addEventListener('click', function(event) {
        if (event.target.id === 'language-ua' || event.target.id === 'language-en') {
            setLanguage(event.target.id.split('-')[1]);
        }
    });

    function setLanguage(language) {
        fetch(`/static/i18n/${language}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(translations => {
                document.querySelectorAll('[data-translate-key]').forEach(element => {
                    const key = element.getAttribute('data-translate-key');
                    if (translations[key]) {
                        element.innerHTML = translations[key];
                    }
                });
                updateLanguageSwitch(language);
            })
            .catch(error => {
                console.error('Error loading language file:', error);
            });
    }

    function updateLanguageSwitch(activeLang) {
        if (activeLang === 'ua') {
            langUAElem.classList.add('active');
            langENElem.classList.remove('active');
        } else {
            langUAElem.classList.remove('active');
            langENElem.classList.add('active');
        }
    }

    // Set default language
    setLanguage('ua');
});

// Existing functions
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

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.icon');

    if (answer.style.height && answer.style.height !== '0px') {
        // Згорнути відповідь
        answer.style.height = '0';
        answer.style.opacity = '0';
        icon.textContent = "+";
    } else {
        // Відкрити відповідь
        answer.style.height = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        icon.textContent = "−";
    }
}
