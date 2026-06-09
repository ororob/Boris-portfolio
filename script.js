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
            bar.classList.contains('react') ? '75%' :
            bar.classList.contains('php') ? '85%' :
            bar.classList.contains('mysql') ? '80%' :
            bar.classList.contains('github') ? '85%' :
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
const successMessage = document.getElementById("successMessage");

const inputs = form.querySelectorAll("input, textarea");

// VALIDATION FUNCTION
function validateInput(input){

    const parent = input.parentElement;

    if(input.value.trim() === ""){
        parent.classList.add("error");
        parent.classList.remove("success");
        return false;
    }else{
        parent.classList.remove("error");
        parent.classList.add("success");
        return true;
    }

}

// REAL-TIME VALIDATION
inputs.forEach(input=>{

    input.addEventListener("input", ()=> {
        validateInput(input);
    });

});

// FORM SUBMIT
form.addEventListener("submit", function(e){

    e.preventDefault();

    let isValid = true;

    inputs.forEach(input=>{
        if(!validateInput(input)){
            isValid = false;
        }
    });

    if(isValid){

        // SHOW SUCCESS MESSAGE
        successMessage.classList.add("show");

        // RESET FORM
        form.reset();

        // REMOVE SUCCESS BORDER STYLES
        document.querySelectorAll(".input-box")
        .forEach(box=>{
            box.classList.remove("success");
        });

        // HIDE AFTER 3 SECONDS
        setTimeout(()=>{
            successMessage.classList.remove("show");
        },3000);

    }

});
