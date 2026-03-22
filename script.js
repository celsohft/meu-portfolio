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
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// ============================================
// ASSISTENTE IA - GEMINI (SIMULAÇÃO)
// ============================================

const btnGemini = document.getElementById('btn-gemini');
const perguntaGemini = document.getElementById('pergunta-gemini');
const respostaGemini = document.getElementById('resposta-gemini');

// Base de conhecimento do assistente
const respostasPredefinidas = {
    // Saudações
    'oi': 'Olá! Sou o assistente virtual do PortfolioHUB. Como posso ajudar você hoje?',
    'olá': 'Olá! Sou o assistente virtual do PortfolioHUB. Como posso ajudar você hoje?',
    'ola': 'Olá! Sou o assistente virtual do PortfolioHUB. Como posso ajudar você hoje?',
    'tudo bem': 'Estou bem, obrigado! E você? Como posso ajudar com o portfólio do Celso?',
    
    // Sobre Celso
    'quem é': 'Meu nome é Celso Henrique F. Takahashi. Sou estudante de Engenharia de Software (4º semestre) na UniCEUB, Desenvolvedor Full Stack com mais de 30 certificações técnicas.',
    'sobre': 'Celso é estudante de Engenharia de Software, desenvolvedor Full Stack com experiência em Python, JavaScript, Java, C#, e mais de 30 certificações técnicas.',
    'apresente': 'Olá! Meu nome é Celso Henrique F. Takahashi, sou estudante de Engenharia de Software na UniCEUB e trabalho como Freelancer Full Stack Developer.',
    
    // Formação
    'formação': 'Celso cursa Engenharia de Software na UniCEUB (4º semestre). Também tem Ensino Médio completo pelo Leonardo Da Vinci e inglês nível B2 pela Cultura Inglesa.',
    'faculdade': 'UniCEUB - Engenharia de Software, 4º semestre (2024-2028).',
    'universidade': 'Universidade UniCEUB, cursando Engenharia de Software.',
    'ensino medio': 'Ensino Médio completo pela escola Leonardo Da Vinci (2020-2023).',
    'ingles': 'Inglês nível intermediário B2 pela Cultura Inglesa (2021-2026).',
    
    // Habilidades
    'habilidades': 'Celso tem mais de 30 certificações em Python, JavaScript, SQL, Power BI, AWS, Inteligência Artificial, automação com VBA e Power Automate, além de desenvolvimento Full Stack.',
    'tecnologias': 'Principais tecnologias: Python, JavaScript, HTML5/CSS3, SQL, Java, C#, Power BI, AWS, FlutterFlow e Inteligência Artificial.',
    'certificações': 'Mais de 30 certificações incluindo Python Impressionador, Full Stack Impressionador, Power BI, AWS, IA, VBA, Power Automate, entre outras.',
    'cursos': 'Cursos: Python Impressionador, Full Stack, SQL, Power BI, AWS, IA, VBA, Power Automate, Análise de Dados, Excel, FlutterFlow, Make, entre outros.',
    
    // Experiência
    'experiência': 'Celso trabalha como Freelancer Full Stack Developer desde 2024, desenvolvendo aplicações web, automações e manutenção de sistemas com Java, C#, Python e SQL.',
    'freelancer': 'Trabalha como Freelancer Full Stack Developer desde 2024, com experiência em Java, C#, Python, SQL, desenvolvimento front-end e back-end.',
    'empresa': 'Atua como Freelancer Full Stack Developer para empresas de TI desde 2024.',
    
    // Projetos
    'projetos': 'Os projetos estão disponíveis no GitHub: https://github.com/celsohft. Destaque para o Projeto Ações, que analisa dados financeiros com Python.',
    'github': 'GitHub: https://github.com/celsohft - repositórios com projetos Full Stack, automações e estudos.',
    'projeto ações': 'Projeto Ações é uma análise de dados financeiros com integração de APIs e automação de indicadores usando Python.',
    
    // Contato
    'contato': 'E-mail: celsokakashi@gmail.com | Telefone: (61) 9 8419-5834 | LinkedIn: https://www.linkedin.com/in/celso-takahashi-94a4aa388/',
    'email': 'celsokakashi@gmail.com',
    'telefone': '(61) 9 8419-5834',
    'whatsapp': '(61) 9 8419-5834',
    'linkedin': 'LinkedIn: https://www.linkedin.com/in/celso-takahashi-94a4aa388/',
    
    // Estágio
    'estágio': 'Celso está buscando oportunidade de estágio na área de TI para aplicar suas habilidades técnicas e contribuir com projetos de impacto.',
    'oportunidade': 'Busca estágio em TI para ampliar experiência prática e contribuir com soluções inovadoras.',
    
    // Soft Skills
    'soft skills': 'Comunicação eficaz, adaptabilidade técnica, aprendizado autônomo, abertura a feedbacks, flexibilidade e colaboração.',
    
    // Site
    'site': 'Este é o PortfolioHUB, um portfólio profissional desenvolvido com HTML, CSS e JavaScript, hospedado no GitHub Pages.',
    'portfolio': 'Portfólio profissional desenvolvido para apresentar habilidades, experiências e projetos acadêmicos.',
    
    // Ajuda
    'ajuda': 'Posso responder perguntas sobre: formação, habilidades, experiências, projetos, contato, certificações e estágio. O que gostaria de saber?',
    'o que você sabe': 'Sei sobre a formação, habilidades, certificações, experiência profissional, projetos, contato e estágio do Celso. Pergunte-me qualquer coisa!',
};

function buscarResposta(pergunta) {
    const perguntaLower = pergunta.toLowerCase();
    
    for (let [chave, resposta] of Object.entries(respostasPredefinidas)) {
        if (perguntaLower.includes(chave)) {
            return resposta;
        }
    }
    
    return `Desculpe, não entendi sua pergunta sobre "${pergunta}". 😊<br><br>Perguntas que posso responder:<br>
    📌 Quem é Celso?<br>
    📌 Formação / Faculdade / Ensino médio / Inglês<br>
    📌 Habilidades / Tecnologias / Certificações<br>
    📌 Experiência / Freelancer<br>
    📌 Projetos / GitHub<br>
    📌 Contato / E-mail / Telefone<br>
    📌 Estágio / Oportunidade<br>
    📌 Soft skills / Ajuda`;
}

if (btnGemini) {
    btnGemini.addEventListener('click', () => {
        const pergunta = perguntaGemini.value.trim();
        if (pergunta === '') {
            respostaGemini.innerHTML = '⚠️ Por favor, digite uma pergunta!';
            return;
        }
        
        respostaGemini.innerHTML = '🤔 Processando sua pergunta...';
        
        setTimeout(() => {
            const resposta = buscarResposta(pergunta);
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

console.log('✨ Portfólio Celso Takahashi carregado com sucesso! ✨');
console.log('🤖 Assistente IA - Gemini ativado!');
