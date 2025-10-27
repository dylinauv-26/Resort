// SVG Animation Library
class SVGAnimator {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupHoverAnimations();
        this.setupScrollAnimations();
    }

    // Animation on hover
    setupHoverAnimations() {
        const animatedIcons = document.querySelectorAll('.icon-animated');

        animatedIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                this.pulse(icon);
            });
        });
    }

    // Animation on scroll
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.fadeIn(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.icon').forEach(icon => {
            observer.observe(icon);
        });
    }

    // Pulse animation
    pulse(element, duration = 600) {
        element.style.animation = `icon-pulse ${duration}ms ease-in-out`;

        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // Fade in animation
    fadeIn(element, duration = 800) {
        if (element.classList.contains('animated')) return;

        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `all ${duration}ms ease-out`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            element.classList.add('animated');
        }, 100);
    }

    // Rotation animation
    rotate(element, duration = 1000, degrees = 360) {
        element.style.animation = `icon-rotate ${duration}ms ease-in-out`;
        element.style.setProperty('--rotate-degrees', `${degrees}deg`);

        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // Wobble animation
    wobble(element, duration = 800) {
        element.style.animation = `icon-wobble ${duration}ms ease-in-out`;

        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // Bounce animation
    bounce(element, duration = 600) {
        element.style.animation = `icon-bounce ${duration}ms ease-in-out`;

        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
}

// Initialize animation library
document.addEventListener('DOMContentLoaded', () => {
    window.svgAnimator = new SVGAnimator();

    // Demo animations
    const demoButton = document.createElement('button');
    demoButton.textContent = 'Demo Animations';
    demoButton.className = 'demo-btn';
    demoButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        background: var(--bs-primary);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
    `;

    demoButton.addEventListener('click', () => {
        const icons = document.querySelectorAll('.icon');
        const animations = ['pulse', 'rotate', 'wobble', 'bounce'];

        icons.forEach((icon, index) => {
            const animation = animations[index % animations.length];
            setTimeout(() => {
                window.svgAnimator[animation](icon);
            }, index * 200);
        });
    });

    document.body.appendChild(demoButton);
});
