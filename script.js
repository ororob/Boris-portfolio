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
