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
// CONTACT FORM VALIDATION

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    // INPUT VALUES

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // EMAIL REGEX

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // VALIDATION

    if(name === ""){
        alert("Full Name is required");
        return;
    }

    if(!emailPattern.test(email)){
        alert("Enter a valid email address");
        return;
    }

    if(phone.length < 8){
        alert("Enter a valid phone number");
        return;
    }

    if(subject === ""){
        alert("Subject is required");
        return;
    }

    if(message.length < 10){
        alert("Message must be at least 10 characters");
        return;
    }

    // SUCCESS

    alert("Message Sent Successfully!");

    form.reset();

});