// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MENU MOBILE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TYPED TEXT EFFECT
// ============================================
const typedTexts = ['Desenvolvedor Full Stack', 'Engenheiro de Software', 'Analista de Dados', 'Entusiasta de IA'];
let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed-text');

function typeEffect() {
    if (!typedElement) return;
    const currentText = typedTexts[typedIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typedIndex = (typedIndex + 1) % typedTexts.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

if (typedElement) {
    typeEffect();
}

// ============================================
// ANIMATE NUMBERS ON SCROLL
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        };
        updateNumber();
    });
    animated = true;
}

// ============================================
// ANIMATE LEVEL BARS
// ============================================
function animateLevelBars() {
    const levelBars = document.querySelectorAll('.level-fill');
    levelBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        let width = '0%';
        
        if (level === 'intermediate') width = '66%';
        else if (level === 'advanced') width = '100%';
        
        bar.style.width = width;
    });
}

// ============================================
// INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-item') && !animated) {
                animateNumbers();
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item, .projeto-card, .formacao-card, .timeline-item, .skill-category, .cert-group').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
});

const skillsSection = document.getElementById('habilidades');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLevelBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Obrigado pela mensagem! Entrarei em contato em breve. ✨');
        contactForm.reset();
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SLIDES - APRESENTAÇÃO INTERATIVA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slidesTrack = document.getElementById('slidesTrack');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideDots');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (!slidesTrack || slides.length === 0) return;
    
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slide-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', (function(index) {
                return function() { goToSlide(index); };
            })(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateSlides() {
        slidesTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        const dots = document.querySelectorAll('.slide-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        else if (e.key === 'ArrowRight') nextSlide();
    });
});

console.log('✨ Portfólio Celso Takahashi carregado com sucesso! ✨');
