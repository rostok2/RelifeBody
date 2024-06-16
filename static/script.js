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

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open')
})
