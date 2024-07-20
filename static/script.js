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
            const overlay = document.querySelector('.overlay'); // Add this line

            document.querySelector('.hamburger-menu').classList.toggle('active');
            nav.classList.toggle('open');
            html.classList.toggle('no-scroll');
            overlay.classList.toggle('active'); // Add this line

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

        document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);

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