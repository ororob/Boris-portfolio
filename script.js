// js/script.js
// MOBILE MENU

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
};

// ACTIVE NAVBAR LINKS

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {

    sections.forEach(sec => {

        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){

            navLinks.forEach(links => {
                links.classList.remove('active');
            });

            document
                .querySelector('.navbar a[href*=' + id + ']')
                .classList.add('active');
        }

    });

};
const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
'.about-card, .stat-card, .project-box, .skill-box, .home-content, .home-img, .contact form'
).forEach(el=>{

    observer.observe(el);

});
const cards = document.querySelectorAll(
'.project-box,.home-img'
);

cards.forEach(card=>{

    card.addEventListener('mousemove',(e)=>{

        const x = e.offsetX;
        const y = e.offsetY;

        const rotateY =
        (x - card.clientWidth/2)/20;

        const rotateX =
        -(y - card.clientHeight/2)/20;

        card.style.transform =
        `perspective(1000px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)`;

    });

    card.addEventListener('mouseleave',()=>{

        card.style.transform =
        'perspective(1000px) rotateY(0) rotateX(0)';

    });

});
document.querySelectorAll('.dance-text').forEach(text=>{

    text.innerHTML =
    text.textContent
    .split('')
    .map(letter=>
        `<span>${letter}</span>`
    ).join('');

});
const skillSection =
document.querySelector('.skills');

const progressBars =
document.querySelectorAll('.progress');

window.addEventListener('scroll',()=>{

    const sectionTop =
    skillSection.offsetTop - 400;

    if(window.scrollY > sectionTop){

        progressBars.forEach(bar=>{

            const width =
            bar.classList.contains('html') ? '95%' :
            bar.classList.contains('css') ? '90%' :
            bar.classList.contains('js') ? '85%' :
            bar.classList.contains('react') ? '65%' :
            bar.classList.contains('php') ? '75%' :
            bar.classList.contains('mysql') ? '85%' :
            bar.classList.contains('github') ? '90%' :
            '95%';

            bar.style.width = width;

        });

    }

});
// TYPING EFFECT

const typed = new Typed('.multiple-text', {

    strings: [
        'Frontend Developer',
        'Web Designer',
        'JavaScript Developer',
        'React Developer'
    ],

    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true

});
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        }else{

            counter.innerText = target;

        }

    }

    updateCounter();

});
// CONTACT FORM VALIDATION

const form = document.getElementById("contact-form");

const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
};

// =======================
// VALIDATION RULES
// =======================

function showError(input, message) {
    const box = input.parentElement;
    box.classList.add("error");
    box.classList.remove("success");

    let error = box.querySelector(".error-text");

    if (!error) {
        error = document.createElement("small");
        error.classList.add("error-text");
        box.appendChild(error);
    }

    error.innerText = message;
}

function showSuccess(input) {
    const box = input.parentElement;
    box.classList.remove("error");
    box.classList.add("success");

    const error = box.querySelector(".error-text");
    if (error) error.remove();
}

// =======================
// FIELD VALIDATORS
// =======================

function validateName() {
    const value = inputs.name.value.trim();

    if (value.length < 3) {
        showError(inputs.name, "Name must be at least 3 characters");
        return false;
    }

    showSuccess(inputs.name);
    return true;
}

function validateEmail() {
    const value = inputs.email.value.trim();

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {
        showError(inputs.email, "Enter a valid email address");
        return false;
    }

    showSuccess(inputs.email);
    return true;
}

function validatePhone() {
    const value = inputs.phone.value.trim();

    const pattern = /^[0-9+ ]{8,15}$/;

    if (!pattern.test(value)) {
        showError(inputs.phone, "Enter a valid phone number");
        return false;
    }

    showSuccess(inputs.phone);
    return true;
}

function validateSubject() {
    const value = inputs.subject.value.trim();

    if (value.length < 5) {
        showError(inputs.subject, "Subject must be at least 5 characters");
        return false;
    }

    showSuccess(inputs.subject);
    return true;
}

function validateMessage() {
    const value = inputs.message.value.trim();

    if (value.length < 10) {
        showError(inputs.message, "Message must be at least 10 characters");
        return false;
    }

    showSuccess(inputs.message);
    return true;
}

// =======================
// LIVE VALIDATION
// =======================

inputs.name.addEventListener("input", validateName);
inputs.email.addEventListener("input", validateEmail);
inputs.phone.addEventListener("input", validatePhone);
inputs.subject.addEventListener("input", validateSubject);
inputs.message.addEventListener("input", validateMessage);

// =======================
// FORM SUBMIT
// =======================

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid =
        validateName() &
        validateEmail() &
        validatePhone() &
        validateSubject() &
        validateMessage();

    if (isValid) {

        alert("Message sent successfully!");

        form.reset();

        // clear styles
        document.querySelectorAll(".input-box").forEach(box => {
            box.classList.remove("success");
        });

    } else {
        alert("Please fix errors before submitting.");
    }
});
});
