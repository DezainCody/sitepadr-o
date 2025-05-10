// Script principal para o site Modern Designs - Versão simplificada

document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Funções para o menu mobile
    function toggleMenu() {
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Adicionar os event listeners para menu mobile
    if (menuToggle && menuClose && menuOverlay) {
        menuToggle.addEventListener('click', toggleMenu);
        menuClose.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
    }
    
    // Header com efeito de scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Inicializar controles do slider de projetos em destaque - SOLUÇÃO SIMPLIFICADA
    const slider = document.querySelector('.destaques-slider');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');
    
    if (slider && prevBtn && nextBtn) {
        // Definir quantidade de rolagem - usar uma quantidade fixa para simplicidade
        const scrollAmount = 300;
        
        // Função para rolar para a esquerda
        prevBtn.addEventListener('click', function() {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Função para rolar para a direita
        nextBtn.addEventListener('click', function() {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Formulário enviado com sucesso!');
            contactForm.reset();
        });
    }
});