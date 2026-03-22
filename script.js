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
// ASSISTENTE IA - GEMINI (VERSÃO MELHORADA)
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
            
            // ========== PERGUNTAS SOBRE EXPERIÊNCIA ==========
            if (perguntaLower.includes('experiência') || perguntaLower.includes('trabalho') || perguntaLower.includes('fez') || perguntaLower.includes('atuou') || perguntaLower.includes('profissional') || perguntaLower.includes('qual a experiência')) {
                resposta = 'Celso trabalha como <strong>Freelancer Full Stack Developer</strong> desde 2024. Suas principais atividades incluem:<br><br>✅ Manutenção e melhoria contínua de sistemas<br>✅ Desenvolvimento com Java, C#, Python e SQL<br>✅ Documentação técnica detalhada<br>✅ Criação de relatórios estratégicos<br>✅ Atendimento direto a clientes e sugestões de melhorias';
            }
            
            // ========== PERGUNTAS SOBRE FORMAÇÃO ==========
            else if (perguntaLower.includes('formação') || perguntaLower.includes('faculdade') || perguntaLower.includes('universidade') || perguntaLower.includes('estuda') || perguntaLower.includes('onde estuda') || perguntaLower.includes('cursa') || perguntaLower.includes('onde ele estuda')) {
                resposta = '🎓 <strong>Formação Acadêmica:</strong><br><br>📚 <strong>Engenharia de Software</strong> - UniCEUB (2024-2028)<br>📖 4º semestre cursando<br><br>📚 <strong>Ensino Médio</strong> - Leonardo Da Vinci (2020-2023)<br>🇬🇧 <strong>Inglês B2</strong> - Cultura Inglesa (2021-2026)';
            }
            
            // ========== PERGUNTAS SOBRE HABILIDADES ==========
            else if (perguntaLower.includes('habilidade') || perguntaLower.includes('sabe fazer') || perguntaLower.includes('tecnologia') || perguntaLower.includes('programa') || perguntaLower.includes('linguagem') || perguntaLower.includes('stack') || perguntaLower.includes('o que ele sabe')) {
                resposta = '💻 <strong>Principais Habilidades Técnicas:</strong><br><br>🔹 <strong>Back-end:</strong> Python, Java, C#, SQL, APIs REST<br>🔹 <strong>Front-end:</strong> JavaScript, HTML5, CSS3<br>🔹 <strong>Dados:</strong> Power BI, Análise de Dados<br>🔹 <strong>Automação:</strong> VBA, Power Automate, Make<br>🔹 <strong>Cloud:</strong> AWS (Fundamentos)<br>🔹 <strong>IA:</strong> Inteligência Artificial, APIs de IA<br>🔹 <strong>No-Code:</strong> FlutterFlow, Power Apps';
            }
            
            // ========== PERGUNTAS SOBRE CERTIFICAÇÕES ==========
            else if (perguntaLower.includes('certificação') || perguntaLower.includes('curso') || perguntaLower.includes('certificado') || perguntaLower.includes('formação complementar') || perguntaLower.includes('tem certificado')) {
                resposta = '📜 <strong>Certificações e Cursos (30+):</strong><br><br>✅ Python Impressionador<br>✅ Full Stack Impressionador<br>✅ SQL Impressionador<br>✅ Power BI Impressionador<br>✅ AWS Impressionador<br>✅ IA Impressionador<br>✅ VBA Impressionador<br>✅ Power Automate<br>✅ FlutterFlow Impressionador<br>✅ Make (Integromat)<br>✅ Trilha NoCodeIA<br>✅ Análise de Dados<br>✅ Excel Impressionador';
            }
            
            // ========== PERGUNTAS SOBRE PROJETOS ==========
            else if (perguntaLower.includes('projeto') || perguntaLower.includes('github') || perguntaLower.includes('repositório') || perguntaLower.includes('criou') || perguntaLower.includes('desenvolveu') || perguntaLower.includes('tem projeto')) {
                resposta = '🚀 <strong>Projetos em Destaque:</strong><br><br>📌 <strong>GitHub:</strong> https://github.com/celsohft<br><br>📌 <strong>Projeto Ações:</strong> Site para acompanhar ações da B3 em tempo real, desenvolvido com HTML, CSS e JavaScript.<br><br>📌 <strong>PortfolioHUB:</strong> Este portfólio profissional desenvolvido com HTML, CSS e JavaScript.<br><br>📌 <strong>Outros:</strong> Dashboards Power BI, automações VBA, aplicações low-code com FlutterFlow.';
            }
            
            // ========== PERGUNTAS SOBRE CONTATO ==========
            else if (perguntaLower.includes('contato') || perguntaLower.includes('email') || perguntaLower.includes('telefone') || perguntaLower.includes('whatsapp') || perguntaLower.includes('falar') || perguntaLower.includes('entrar em contato') || perguntaLower.includes('como falar')) {
                resposta = '📞 <strong>Contato:</strong><br><br>📧 <strong>E-mail:</strong> celsokakashi@gmail.com<br>📱 <strong>Telefone/WhatsApp:</strong> (61) 9 8419-5834<br>🔗 <strong>LinkedIn:</strong> https://www.linkedin.com/in/celso-takahashi-94a4aa388/<br>💻 <strong>GitHub:</strong> https://github.com/celsohft';
            }
            
            // ========== PERGUNTAS SOBRE ESTÁGIO ==========
            else if (perguntaLower.includes('estágio') || perguntaLower.includes('oportunidade') || perguntaLower.includes('emprego') || perguntaLower.includes('vaga') || perguntaLower.includes('procura') || perguntaLower.includes('busca')) {
                resposta = '🎯 <strong>Busca por Estágio:</strong><br><br>Celso está buscando oportunidade de estágio na área de <strong>Tecnologia da Informação (TI)</strong>.<br><br><strong>Objetivo:</strong> Aplicar suas habilidades técnicas, versatilidade e capacidade de aprendizado acelerado em projetos de impacto na área de desenvolvimento de software, análise de dados ou automação.';
            }
            
            // ========== PERGUNTAS SOBRE SOFT SKILLS ==========
            else if (perguntaLower.includes('soft skill') || perguntaLower.includes('comportamento') || perguntaLower.includes('qualidades') || perguntaLower.includes('perfil')) {
                resposta = '🌟 <strong>Soft Skills:</strong><br><br>✅ Comunicação eficaz<br>✅ Adaptabilidade técnica<br>✅ Aprendizado autônomo e rápido<br>✅ Abertura a feedbacks construtivos<br>✅ Flexibilidade diante de mudanças<br>✅ Colaboração em equipes multidisciplinares';
            }
            
            // ========== PERGUNTAS SOBRE QUEM É ==========
            else if (perguntaLower.includes('quem é') || perguntaLower.includes('sobre') || perguntaLower.includes('apresente') || perguntaLower.includes('quem é celso')) {
                resposta = '👨‍💻 <strong>Sobre Celso:</strong><br><br>Meu nome é <strong>Celso Henrique F. Takahashi</strong>. Sou estudante de <strong>Engenharia de Software</strong> (4º semestre) na UniCEUB, <strong>Desenvolvedor Full Stack</strong> com mais de <strong>30 certificações técnicas</strong>. Tenho experiência em criação de aplicações web responsivas, automações inteligentes e integração de APIs de IA. Busco oportunidade de estágio para aplicar minha versatilidade técnica e capacidade de aprendizado acelerado.';
            }
            
            // ========== PERGUNTAS SOBRE INGLÊS ==========
            else if (perguntaLower.includes('inglês') || perguntaLower.includes('ingles') || perguntaLower.includes('fala inglês') || perguntaLower.includes('sabe inglês')) {
                resposta = '🇬🇧 <strong>Inglês:</strong><br><br>Celso possui inglês nível <strong>intermediário B2</strong> pela <strong>Cultura Inglesa</strong> (2021-2026).<br><br>✅ Fluência técnica para leitura de documentação<br>✅ Comunicação profissional<br>✅ Compreensão de textos técnicos em inglês';
            }
            
            // ========== PERGUNTAS SOBRE ENSINO MÉDIO ==========
            else if (perguntaLower.includes('ensino médio') || perguntaLower.includes('medio') || perguntaLower.includes('segundo grau')) {
                resposta = '📚 <strong>Ensino Médio:</strong><br><br>Ensino Médio completo pela escola <strong>Leonardo Da Vinci</strong> (2020-2023), com formação acadêmica com ênfase em tecnologias e inovação.';
            }
            
            // ========== PERGUNTAS SOBRE AJUDA ==========
            else if (perguntaLower.includes('ajuda') || perguntaLower.includes('o que você sabe') || perguntaLower.includes('o que pode fazer')) {
                resposta = '🤖 <strong>Como posso ajudar:</strong><br><br>Posso responder perguntas sobre:<br><br>📌 <strong>Quem é Celso</strong> (apresentação)<br>📌 <strong>Formação acadêmica</strong> (faculdade, inglês, ensino médio)<br>📌 <strong>Habilidades técnicas</strong> (tecnologias, stacks)<br>📌 <strong>Certificações e cursos</strong><br>📌 <strong>Experiência profissional</strong><br>📌 <strong>Projetos no GitHub</strong><br>📌 <strong>Contato</strong> (e-mail, telefone)<br>📌 <strong>Estágio e oportunidades</strong><br>📌 <strong>Soft skills</strong><br><br>Pergunte de forma natural! 😊';
            }
            
            // ========== SAUDAÇÕES ==========
            else if (perguntaLower.includes('oi') || perguntaLower.includes('olá') || perguntaLower.includes('ola') || perguntaLower.includes('bom dia') || perguntaLower.includes('boa tarde') || perguntaLower.includes('boa noite')) {
                resposta = 'Olá! 😊 Sou o assistente virtual do PortfolioHUB. Como posso ajudar você hoje?<br><br>Pergunte sobre formação, habilidades, projetos, experiência ou contato do Celso.';
            }
            
            // ========== RESPOSTA PADRÃO ==========
            else {
                resposta = `🤔 <strong>Não entendi sua pergunta sobre "${pergunta}".</strong><br><br>Mas posso ajudar com perguntas como:<br><br>📌 "Qual a experiência do Celso?"<br>📌 "Onde ele estuda?"<br>📌 "O que ele sabe fazer?"<br>📌 "Quais projetos ele tem?"<br>📌 "Como entro em contato?"<br>📌 "Ele está procurando estágio?"<br><br>Tente perguntar de forma natural! 😊`;
            }
            
            respostaGemini.innerHTML = `💬 <strong>Você perguntou:</strong> "${pergunta}"<br><br>🤖 <strong>Resposta:</strong><br>${resposta}`;
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
