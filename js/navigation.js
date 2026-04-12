// Smooth scroll and active menu highlight
class Navigation {
    constructor() {
        this.headerHeight = document.querySelector('.header-top')?.clientHeight || 100;
        this.initSmoothScroll();
        this.initActiveMenuObserver();
    }

    initSmoothScroll() {
        document.querySelectorAll('.menu-element__link, .logo').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = e.currentTarget.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                            top: targetPosition - this.headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    initActiveMenuObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        const activeLink = document.querySelector(`.menu-element__link[href="#${id}"]`);
                        if (activeLink) {
                            document.querySelectorAll('.menu-element__link').forEach(l => l.classList.remove('active'));
                            activeLink.classList.add('active');
                        }
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-70px 0px -70px 0px' }
        );

        document.querySelectorAll('.observer-section').forEach(section => observer.observe(section));
    }
}

document.addEventListener('DOMContentLoaded', () => new Navigation());