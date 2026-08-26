// ==========================================================================
// Endum Boris — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isDesktop = () => window.innerWidth > 900 && !isCoarsePointer;

    /* ---------- Fixed header height compensation ---------- */
    const headerEl = document.querySelector('.header');
    const setHeaderHeightVar = () => {
        if (headerEl) {
            document.documentElement.style.setProperty('--header-h', `${headerEl.offsetHeight}px`);
        }
    };
    setHeaderHeightVar();
    window.addEventListener('resize', setHeaderHeightVar);

    /* ---------- Navbar glass state on scroll ---------- */
    const onHeaderScroll = () => {
        if (window.scrollY > 40) headerEl?.classList.add('scrolled');
        else headerEl?.classList.remove('scrolled');
    };
    onHeaderScroll();
    window.addEventListener('scroll', onHeaderScroll, { passive: true });

    /* ---------- Scroll progress bar ---------- */
    const progressBar = document.getElementById('scroll-progress-bar');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = `${pct}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    /* ---------- Mobile navigation ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const navbar = document.getElementById('navbar');

    const isNavOpen = () => navbar?.classList.contains('active');

    const openNav = () => {
        navbar?.classList.add('active');
        menuToggle?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };
    const closeNav = () => {
        navbar?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };
    const toggleNav = () => { isNavOpen() ? closeNav() : openNav(); };

    menuToggle?.addEventListener('click', toggleNav);
    menuToggle?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNav(); } });
    closeMenu?.addEventListener('click', closeNav);
    closeMenu?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeNav(); } });
    navbar?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isNavOpen()) closeNav();
    });

    document.addEventListener('click', (e) => {
        if (!isNavOpen()) return;
        const clickedInsideNav = navbar?.contains(e.target);
        const clickedToggle = menuToggle?.contains(e.target);
        if (!clickedInsideNav && !clickedToggle) closeNav();
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

    /* ---------- Scroll reveal (reversible, direction-aware) ---------- */
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-3d';
    const revealTargets = document.querySelectorAll(revealSelectors);

    if (prefersReducedMotion) {
        revealTargets.forEach(el => el.classList.add('in-view'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('in-view', entry.isIntersecting);
            });
        }, { threshold: 0.15, rootMargin: '-4% 0px -4% 0px' });

        revealTargets.forEach(el => revealObserver.observe(el));
    }

    /* ---------- Project card content reveal (adds .in-view for staggered children) ---------- */
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('in-view', entry.isIntersecting);
            });
        }, { threshold: 0.2 });
        projectCards.forEach(card => projectObserver.observe(card));
    }

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (el) => {
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
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));

    /* ---------- Skills: category filtering ---------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
            });

            skillCards.forEach(card => {
                const categories = (card.dataset.category || '').split(' ');
                const show = filter === 'all' || categories.includes(filter);
                card.classList.toggle('filtered-out', !show);
            });
        });
    });

    /* ---------- Generic 3D tilt system for .tilt-card elements ---------- */
    const tiltCards = document.querySelectorAll('.tilt-card');
    const MAX_TILT = 7; // degrees

    if (isDesktop() && !prefersReducedMotion) {
        tiltCards.forEach(card => {
            let rect = null;

            card.addEventListener('mouseenter', () => {
                rect = card.getBoundingClientRect();
            });

            card.addEventListener('mousemove', (e) => {
                if (!rect) rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;
                const py = (e.clientY - rect.top) / rect.height;

                const rx = (0.5 - py) * MAX_TILT * 2;
                const ry = (px - 0.5) * MAX_TILT * 2;

                card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
                card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
                card.style.setProperty('--tz', '10px');
                card.style.setProperty('--mx', `${px * 100}%`);
                card.style.setProperty('--my', `${py * 100}%`);
            });

            card.addEventListener('mouseleave', () => {
                rect = null;
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
                card.style.setProperty('--tz', '0px');
            });
        });
    }

    /* ---------- Hero image: mouse parallax ---------- */
    const imageWrapper = document.getElementById('image-wrapper');
    const homeSection = document.getElementById('home');

    if (imageWrapper && homeSection && isDesktop() && !prefersReducedMotion) {
        homeSection.addEventListener('mousemove', (e) => {
            const rect = homeSection.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;

            const ry = px * 10;
            const rx = py * -10;

            imageWrapper.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        });

        homeSection.addEventListener('mouseleave', () => {
            imageWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    /* ---------- Cursor ambient glow (desktop only) ---------- */
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && isDesktop() && !prefersReducedMotion) {
        let glowVisible = false;
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            if (!glowVisible) {
                cursorGlow.classList.add('visible');
                glowVisible = true;
            }
        });
        document.addEventListener('mouseleave', () => cursorGlow.classList.remove('visible'));
    }

    /* ---------- Magnetic buttons ---------- */
    const magneticEls = document.querySelectorAll('.magnetic');
    if (isDesktop() && !prefersReducedMotion) {
        magneticEls.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const px = e.clientX - rect.left - rect.width / 2;
                const py = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${px * 0.18}px, ${py * 0.35}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    const submitBtn = document.getElementById('submit-btn');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        submitBtn.classList.add('is-loading');
        note.textContent = '';

        setTimeout(() => {
            submitBtn.classList.remove('is-loading');
            submitBtn.classList.add('is-success');
            note.textContent = '> Message received. I\u2019ll reply within 24 hours.';
            form.reset();

            setTimeout(() => {
                submitBtn.classList.remove('is-success');
                note.textContent = '';
            }, 4000);
        }, 1100);
    });

});
