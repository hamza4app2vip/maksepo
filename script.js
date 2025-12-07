// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.toggle('open');
        document.body.classList.toggle('menu-open');
        // Change icon from hamburger to close
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenuOverlay.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside (on backdrop)
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking any link inside
    mobileMenuOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add 3D Tilt Effect to Cards (optional realism touch)
const cards = document.querySelectorAll('.glass, .card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Theme Toggle (Light/Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
const themeToggleDesktop = document.getElementById('theme-toggle-desktop');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

// Theme toggle function
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');

    // Add animation class for smooth transition
    document.body.style.transition = 'background 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), color 0.3s ease';

    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Add click listeners to both toggles
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', toggleTheme);
}

// ===== COUNTDOWN TIMER =====
// Set the festival date - 80 days from now (February 25, 2026)
const festivalDate = new Date('2026-02-25T10:00:00').getTime();

// Store previous values to detect changes
let prevValues = { days: '', hours: '', minutes: '', seconds: '' };

function updateCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Only run if countdown elements exist on the page
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = festivalDate - now;

    if (distance > 0) {
        const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

        // Update with flip animation
        updateWithFlip(secondsEl, seconds, 'seconds');
        if (prevValues.minutes !== minutes) updateWithFlip(minutesEl, minutes, 'minutes');
        if (prevValues.hours !== hours) updateWithFlip(hoursEl, hours, 'hours');
        if (prevValues.days !== days) updateWithFlip(daysEl, days, 'days');

        prevValues = { days, hours, minutes, seconds };
    } else {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
    }
}

function updateWithFlip(element, newValue, key) {
    if (prevValues[key] !== newValue) {
        element.textContent = newValue;
        element.classList.add('flip');
        setTimeout(() => element.classList.remove('flip'), 600);
    }
}

// Run countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);
