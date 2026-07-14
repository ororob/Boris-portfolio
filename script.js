// ==========================================================================
// Endum Boris — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile navigation ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => navbar.classList.add('active'));
    }
    if (closeMenu && navbar) {
        closeMenu.addEventListener('click', () => navbar.classList.remove('active'));
    }
    navbar?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navbar.classList.remove('active'));
    });

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(sec => spyObserver.observe(sec));

    /* ---------- Typed.js role text ---------- */
    if (window.Typed) {
        new Typed('.multiple-text', {
            strings: [
                'Web Applications',
                'Responsive Interfaces',
                'Database-Driven Systems',
                'Full-Stack Solutions'
            ],
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }

    /* ---------- Scroll reveal ---------- */
    const revealTargets = document.querySelectorAll(
        '.bento-card, .skill-card, .project-card, .contact-info, .contact-form'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('in-view'), i % 6 * 60);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10) || 0;
            const duration = 1200;
            const start = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));

    /* ---------- Skill meter fill on view ---------- */
    const skillFills = document.querySelectorAll('.skill-fill');
    const fillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = `${bar.dataset.level}%`;
                fillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.4 });
    skillFills.forEach(bar => fillObserver.observe(bar));

    /* ---------- Floating skill cards: tilt + drag ---------- */
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        const face = card.querySelector('.skill-face');
        let dragging = false;
        let offsetX = 0, offsetY = 0;

        // Pointer-based 3D tilt on hover
        card.addEventListener('mousemove', (e) => {
            if (dragging) return;
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            face.style.transform = `rotate(0deg) scale(1.06) rotateX(${py * -14}deg) rotateY(${px * 14}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            if (!dragging) face.style.transform = '';
        });

        // Drag to reposition on the desk (desktop only, matches absolute layout)
        const desk = document.getElementById('skills-desk');
        const isDeskLayout = () => window.innerWidth > 900;

        const startDrag = (clientX, clientY) => {
            if (!isDeskLayout()) return;
            dragging = true;
            card.classList.add('dragging');
            card.style.zIndex = 30;
            const rect = card.getBoundingClientRect();
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
        };

        const moveDrag = (clientX, clientY) => {
            if (!dragging) return;
            const deskRect = desk.getBoundingClientRect();
            let x = clientX - deskRect.left - offsetX;
            let y = clientY - deskRect.top - offsetY;
            x = Math.max(0, Math.min(x, deskRect.width - card.offsetWidth));
            y = Math.max(0, Math.min(y, deskRect.height - card.offsetHeight));
            card.style.left = `${x}px`;
            card.style.top = `${y}px`;
        };

        const endDrag = () => {
            if (!dragging) return;
            dragging = false;
            card.classList.remove('dragging');
            card.style.zIndex = '';
        };

        card.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
        window.addEventListener('mouseup', endDrag);

        card.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (!dragging) return;
            const t = e.touches[0];
            moveDrag(t.clientX, t.clientY);
        }, { passive: true });
        window.addEventListener('touchend', endDrag);
    });

    /* ---------- Header shrink on scroll ---------- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -20px rgba(0,0,0,0.6)' : 'none';
    });

    /* ---------- Floating / dancing cards: stagger + scroll reactivity ---------- */
    const danceEls = document.querySelectorAll(
        '.project-card, .contact-info, .contact-form, .skill-card'
    );

    // Give each element its own rhythm so the desk feels alive, not synchronized
    danceEls.forEach((el, i) => {
        el.style.setProperty('--fdelay', `${(i % 9) * 0.28}s`);
        el.style.setProperty('--fdur', `${5.6 + (i % 6) * 0.5}s`);
    });

    let lastScrollY = window.scrollY;
    let scrollStopTimer = null;

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const direction = currentY > lastScrollY ? 1 : -1;
        document.documentElement.style.setProperty('--tilt-sign', direction);
        document.body.classList.add('is-scrolling');
        lastScrollY = currentY;

        clearTimeout(scrollStopTimer);
        scrollStopTimer = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 350);
    }, { passive: true });

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        note.textContent = '> Message received. I\u2019ll reply within 24 hours.';
        form.reset();
        setTimeout(() => { note.textContent = ''; }, 5000);
    });

});
