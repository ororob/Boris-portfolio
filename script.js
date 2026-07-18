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

    /* ---------- Floating skill cards: tilt + drag (perf-friendly) ---------- */
    const skillCards = document.querySelectorAll('.skill-card');
    const desk = document.getElementById('skills-desk');
    const isDeskLayout = () => window.innerWidth > 900;

    let activeDrag = null; // { card, offsetX, offsetY }
    let hoverRect = null;  // cached rect for the card currently being hovered

    skillCards.forEach(card => {
        const face = card.querySelector('.skill-face');

        // Cache the rect once when the pointer enters — never during mousemove
        card.addEventListener('mouseenter', () => {
            if (activeDrag) return;
            hoverRect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            if (activeDrag || !hoverRect) return;
            const px = (e.clientX - hoverRect.left) / hoverRect.width - 0.5;
            const py = (e.clientY - hoverRect.top) / hoverRect.height - 0.5;
            face.style.transform = `rotate(0deg) scale(1.06) rotateX(${py * -14}deg) rotateY(${px * 14}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            hoverRect = null;
            if (!activeDrag) face.style.transform = '';
        });

        const beginDrag = (clientX, clientY) => {
            if (!isDeskLayout()) return;
            const rect = card.getBoundingClientRect();
            activeDrag = {
                card,
                offsetX: clientX - rect.left,
                offsetY: clientY - rect.top,
                deskRect: desk.getBoundingClientRect()
            };
            card.classList.add('dragging');
            card.style.zIndex = 30;
        };

        card.addEventListener('mousedown', (e) => beginDrag(e.clientX, e.clientY));
        card.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            beginDrag(t.clientX, t.clientY);
        }, { passive: true });
    });

    // One shared listener set for all cards, instead of one per card
    window.addEventListener('mousemove', (e) => {
        if (!activeDrag) return;
        dragTo(e.clientX, e.clientY);
    });
    window.addEventListener('touchmove', (e) => {
        if (!activeDrag) return;
        const t = e.touches[0];
        dragTo(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    function dragTo(clientX, clientY) {
        const { card, offsetX, offsetY, deskRect } = activeDrag;
        let x = clientX - deskRect.left - offsetX;
        let y = clientY - deskRect.top - offsetY;
        x = Math.max(0, Math.min(x, deskRect.width - card.offsetWidth));
        y = Math.max(0, Math.min(y, deskRect.height - card.offsetHeight));
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
    }

    function endDrag() {
        if (!activeDrag) return;
        activeDrag.card.classList.remove('dragging');
        activeDrag.card.style.zIndex = '';
        activeDrag = null;
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        note.textContent = '> Message received. I\u2019ll reply within 24 hours.';
        form.reset();
        setTimeout(() => { note.textContent = ''; }, 5000);
    });

    /* ---------- Form "dance" on scroll ---------- */
    if (form) {
        const danceFields = form.querySelectorAll('.input-box, button, .form-note');
        danceFields.forEach((el, i) => {
            el.style.setProperty('--dance-delay', (i * 0.05) + 's');
        });

        let lastY = window.scrollY;
        let ticking = false;

        const triggerDance = (direction) => {
            form.classList.remove('dancing-up', 'dancing-down');
            void form.offsetWidth; // force reflow so the animation restarts every time
            form.classList.add(direction === 'down' ? 'dancing-down' : 'dancing-up');
        };

        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (Math.abs(y - lastY) > 15) {
                    triggerDance(y > lastY ? 'down' : 'up');
                    lastY = y;
                }
                ticking = false;
            });
        });
    }

});
