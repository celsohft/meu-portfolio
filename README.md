# PortfolioHUB - Celso Henrique F. Takahashi

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-brightgreen)](https://celsohft.github.io/meu-portfolio/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/celsohft/meu-portfolio)](https://github.com/celsohft/meu-portfolio/commits/main)

## 📌 Sobre o Projeto

O **PortfolioHUB** é um portfólio profissional digital desenvolvido como parte do desafio de implantação do curso. O projeto tem como objetivo centralizar e apresentar de forma organizada e profissional minhas habilidades acadêmicas, experiências profissionais, projetos desenvolvidos e certificações técnicas.

Este portfólio foi desenvolvido seguindo as melhores práticas de desenvolvimento web, segurança e versionamento, utilizando **Git** e **GitHub** como ferramentas principais, e integrando o **Google Gemini** como assistente virtual para auxiliar na experiência do usuário.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **HTML5** | Estrutura semântica do site |
| **CSS3** | Estilização responsiva, tema escuro e efeitos glassmorphism |
| **JavaScript** | Interatividade, scroll suave, botão "voltar ao topo" |
| **Git** | Controle de versão |
| **GitHub** | Hospedagem do código e GitHub Pages |
| **Google Gemini** | Assistente virtual integrado para suporte ao usuário |
| **Font Awesome** | Ícones profissionais |
| **Google Fonts** | Tipografia moderna (Plus Jakarta Sans) |

---

## 🔒 Segurança Implementada

Como parte do desafio, foram implementadas as seguintes políticas e práticas de segurança:

### ✅ Medidas de Segurança

| Medida | Descrição |
|--------|-----------|
| **HTTPS Obrigatório** | GitHub Pages força conexão segura |
| **Validação de Formulários** | Todos os inputs são validados antes do envio |
| **Sanitização de Dados** | Proteção contra XSS e injeção de código |
| **Políticas de Segurança** | Arquivo `SECURITY.md` documenta processo de reporte de vulnerabilidades |
| **Código de Conduta** | Arquivo `CODE_OF_CONDUCT.md` define padrões de comportamento |
| **Controle de Versão** | Todo código versionado no GitHub |

### 📁 Arquivos de Segurança

- [`SECURITY.md`](./SECURITY.md) - Políticas de segurança e reporte de vulnerabilidades
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) - Código de conduta para colaboradores

---

## 🤖 Integração com Google Gemini

O PortfolioHUB conta com um assistente virtual alimentado pelo **Google Gemini**, que permite aos visitantes:

- Fazer perguntas sobre o portfólio
- Obter informações sobre minhas habilidades e experiências
- Receber orientações sobre navegação no site

### Como funciona

1. O usuário digita uma pergunta no campo de chat
2. A requisição é enviada para a API do Google Gemini
3. O modelo de IA processa a pergunta e retorna uma resposta contextualizada
4. A resposta é exibida na interface de forma clara e amigável

### Documentação de Uso

O Gemini foi utilizado durante todo o processo de desenvolvimento para:
- **Auxílio na escrita** de textos profissionais
- **Revisão de código** e boas práticas
- **Sugestões de melhorias** de segurança
- **Geração de conteúdo** para documentação

---

## 📁 Estrutura do Repositório
meu-portfolio/
│
├── index.html # Página principal do portfólio
├── style.css # Estilos e animações
├── script.js # Interatividade e integração com Gemini
├── README.md # Documentação completa (este arquivo)
├── SECURITY.md # Políticas de segurança
├── CODE_OF_CONDUCT.md # Código de conduta
│
└── .gitignore # Arquivos ignorados pelo Git
---

## 🌐 Acesso ao PortfolioHUB

O site está disponível publicamente através do GitHub Pages:

🔗 **https://celsohft.github.io/meu-portfolio/**

---

## 📋 Seções do Site

| Seção | Conteúdo |
|-------|----------|
| **Início** | Apresentação pessoal, título profissional e contato |
| **Sobre mim** | Resumo profissional, formação e objetivos |
| **Experiência** | Histórico como Freelancer Full Stack Developer |
| **Formação** | Engenharia de Software (UniCEUB), Ensino Médio e Inglês B2 |
| **Competências** | Stacks técnicas e certificações (30+ cursos) |
| **Soft Skills** | Habilidades comportamentais |
| **Portfólio** | Links para GitHub, Projeto Ações e LinkedIn |
| **Contato** | E-mail, WhatsApp e redes sociais |
| **Assistente IA** | Chatbot integrado com Google Gemini |

---

## 🧪 Testes Realizados

### Testes de Funcionalidade

| Teste | Resultado |
|-------|-----------|
| Navegação entre seções | ✅ Suave e funcional |
| Botão "Voltar ao topo" | ✅ Aparece após scroll e funciona |
| Links externos (GitHub/LinkedIn) | ✅ Abrem em nova aba |
| Formulário de contato | ✅ Validação e alerta de sucesso |
| Responsividade mobile | ✅ Layout adaptado para telas pequenas |
| Integração Gemini | ✅ API responde corretamente |

### Testes de Segurança

| Teste | Resultado |
|-------|-----------|
| HTTPS | ✅ Forçado pelo GitHub Pages |
| Validação de inputs | ✅ Impede envio de campos vazios |
| Sanitização | ✅ Código limpo sem XSS |

---

## 🎥 Vídeo de Apresentação

Como parte do desafio, foi gravado um vídeo demonstrando o processo de implantação do PortfolioHUB:

🔗 **https://youtu.be/SEU-LINK-AQUI**

### Conteúdo do Vídeo

1. **Introdução ao PortfolioHUB** (0:00 - 1:00)
2. **Configuração do GitHub e repositório** (1:00 - 2:00)
3. **Estrutura do site e tecnologias** (2:00 - 3:00)
4. **Medidas de segurança implementadas** (3:00 - 4:00)
5. **Integração com Google Gemini** (4:00 - 5:00)
6. **Desafios e soluções** (5:00 - 6:00)
7. **Demonstração do site funcionando** (6:00 - 8:00)

---

## 🔧 Como Executar Localmente

Caso queira executar o projeto em sua máquina:

```bash
# Clone o repositório
git clone https://github.com/celsohft/meu-portfolio.git

# Acesse a pasta do projeto
cd meu-portfolio

# Abra o arquivo index.html no navegador
# Ou utilize uma extensão como Live Server no VS Code👤 Autor
Celso Henrique F. Takahashi

Rede	Link
GitHub	@celsohft
LinkedIn	Celso Takahashi
E-mail	celsokakashi@gmail.com
Telefone	(61) 9 8419-5834
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🙏 Agradecimentos
Google Gemini - Assistente IA que auxiliou no desenvolvimento

GitHub - Plataforma de hospedagem e versionamento

UniCEUB - Instituição de ensino que proporcionou este desafio

📅 Histórico de Versões
Versão	Data	Descrição
1.0.0	22/03/2026	Lançamento inicial do PortfolioHUB
1.1.0	22/03/2026	Adicionada integração com Google Gemini
1.2.0	22/03/2026	Implementadas políticas de segurança
