// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Scroll suave
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

// Typed Text Effect
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

// Animate numbers on scroll
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

// Animate level bars
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

// Intersection Observer
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

// Observe elements
document.querySelectorAll('.stat-item, .projeto-card, .formacao-card, .timeline-item, .skill-category, .cert-group, .language-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observar seção de habilidades
const skillsSection = document.querySelector('#habilidades');
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

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.projeto-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projects.forEach(project => {
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Obrigado pela mensagem! Entrarei em contato em breve. ✨');
        contactForm.reset();
    });
}

// Back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.id = 'backToTop';
document.body.appendChild(backToTop);

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

// Active nav link on scroll
const sections = document.querySelectorAll('section');
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

// Add hover animation to cards
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

console.log('✨ Portfólio Celso Takahashi carregado com sucesso! ✨');

// ============================================
// ASSISTENTE IA - GEMINI (ADICIONADO NO FINAL)
// ============================================

const btnGemini = document.getElementById('btn-gemini');
const perguntaGemini = document.getElementById('pergunta-gemini');
const respostaGemini = document.getElementById('resposta-gemini');

if (btnGemini) {
    btnGemini.addEventListener('click', () => {
        const pergunta = perguntaGemini.value.trim();
        if (pergunta === '') {
            respostaGemini.innerHTML = '⚠️ Por favor, digite uma pergunta!';
            return;
        }
        
        respostaGemini.innerHTML = '🤔 Processando sua pergunta...';
        
        setTimeout(() => {
            const perguntaLower = pergunta.toLowerCase();
            let resposta = '';
            
            // Formação
            if (perguntaLower.includes('formação') || perguntaLower.includes('faculdade') || perguntaLower.includes('universidade')) {
                resposta = 'Celso cursa Engenharia de Software na UniCEUB (4º semestre). Também tem Ensino Médio completo pelo Leonardo Da Vinci e inglês nível B2 pela Cultura Inglesa.';
            }
            // Habilidades
            else if (perguntaLower.includes('habilidade') || perguntaLower.includes('tecnologia') || perguntaLower.includes('stack') || perguntaLower.includes('programa')) {
                resposta = 'Celso tem mais de 30 certificações em Python, JavaScript, SQL, Power BI, AWS, Inteligência Artificial, automação com VBA e Power Automate, além de desenvolvimento Full Stack.';
            }
            // Certificações
            else if (perguntaLower.includes('certificação') || perguntaLower.includes('curso') || perguntaLower.includes('certificado')) {
                resposta = 'Mais de 30 certificações incluindo Python Impressionador, Full Stack Impressionador, Power BI, AWS, IA, VBA, Power Automate, Análise de Dados, Excel, FlutterFlow, Make, entre outros.';
            }
            // Experiência
            else if (perguntaLower.includes('experiência') || perguntaLower.includes('freelancer') || perguntaLower.includes('trabalho') || perguntaLower.includes('empresa')) {
                resposta = 'Celso trabalha como Freelancer Full Stack Developer desde 2024, desenvolvendo aplicações web, automações e manutenção de sistemas com Java, C#, Python e SQL.';
            }
            // Projetos
            else if (perguntaLower.includes('projeto') || perguntaLower.includes('github') || perguntaLower.includes('repositório')) {
                resposta = 'Os projetos estão disponíveis no GitHub: https://github.com/celsohft. Destaque para o Projeto Ações, que analisa dados financeiros com Python.';
            }
            // Contato
            else if (perguntaLower.includes('contato') || perguntaLower.includes('email') || perguntaLower.includes('telefone') || perguntaLower.includes('whatsapp')) {
                resposta = 'E-mail: celsokakashi@gmail.com | Telefone: (61) 9 8419-5834 | LinkedIn: https://www.linkedin.com/in/celso-takahashi-94a4aa388/';
            }
            // Estágio
            else if (perguntaLower.includes('estágio') || perguntaLower.includes('oportunidade') || perguntaLower.includes('emprego')) {
                resposta = 'Celso está buscando oportunidade de estágio na área de TI para aplicar suas habilidades técnicas e contribuir com projetos de impacto.';
            }
            // Soft Skills
            else if (perguntaLower.includes('soft skill') || perguntaLower.includes('comportamento')) {
                resposta = 'Comunicação eficaz, adaptabilidade técnica, aprendizado autônomo, abertura a feedbacks, flexibilidade e colaboração.';
            }
            // Quem é
            else if (perguntaLower.includes('quem é') || perguntaLower.includes('sobre') || perguntaLower.includes('apresente')) {
                resposta = 'Meu nome é Celso Henrique F. Takahashi. Sou estudante de Engenharia de Software (4º semestre) na UniCEUB, Desenvolvedor Full Stack com mais de 30 certificações técnicas.';
            }
            // Ajuda
            else if (perguntaLower.includes('ajuda') || perguntaLower.includes('o que você sabe')) {
                resposta = 'Posso responder perguntas sobre: formação, habilidades, certificações, experiências, projetos, contato, estágio e soft skills. O que gostaria de saber?';
            }
            // Saudações
            else if (perguntaLower.includes('oi') || perguntaLower.includes('olá') || perguntaLower.includes('ola')) {
                resposta = 'Olá! Sou o assistente virtual do PortfolioHUB. Como posso ajudar você hoje?';
            }
            // Inglês
            else if (perguntaLower.includes('inglês') || perguntaLower.includes('ingles')) {
                resposta = 'Celso possui inglês nível intermediário B2 pela Cultura Inglesa (2021-2026), com fluência técnica para leitura de documentação e comunicação profissional.';
            }
            // Ensino Médio
            else if (perguntaLower.includes('ensino médio') || perguntaLower.includes('medio')) {
                resposta = 'Ensino Médio completo pela escola Leonardo Da Vinci (2020-2023), com formação acadêmica com ênfase em tecnologias e inovação.';
            }
            else {
                resposta = `Desculpe, não entendi sua pergunta sobre "${pergunta}". 😊<br><br>Perguntas que posso responder:<br>📌 Quem é Celso?<br>📌 Formação / Faculdade<br>📌 Habilidades / Tecnologias<br>📌 Certificações / Cursos<br>📌 Experiência / Freelancer<br>📌 Projetos / GitHub<br>📌 Contato / E-mail<br>📌 Estágio / Oportunidade<br>📌 Soft skills<br>📌 Inglês / Ensino Médio`;
            }
            
            respostaGemini.innerHTML = `💬 <strong>Você perguntou:</strong> "${pergunta}"<br><br>🤖 <strong>Resposta:</strong> ${resposta}`;
            perguntaGemini.value = '';
        }, 500);
    });
    
    perguntaGemini.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnGemini.click();
        }
    });
}

console.log('🤖 Assistente IA - Gemini ativado!');
