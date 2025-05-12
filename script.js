// Script principal com ajustes para responsividade e animações
document.addEventListener('DOMContentLoaded', function() {
    // Função para quebrar o título em duas linhas em dispositivos móveis
    function adjustTitleForMobile() {
        // Seleciona o título na seção hero
        const heroTitle = document.querySelector('.hero-content h2');
        
        if (heroTitle) {
            // Verifica se o texto contém "Design e Funcionalidade"
            if (heroTitle.textContent.includes('Design e Funcionalidade')) {
                // Função para verificar se estamos em um dispositivo móvel
                function isMobile() {
                    return window.innerWidth <= 767;
                }
                
                // Função para ajustar o título
                function updateTitle() {
                    if (isMobile()) {
                        // Em dispositivos móveis, adiciona a quebra de linha
                        if (!heroTitle.innerHTML.includes('<br>')) {
                            heroTitle.innerHTML = 'Design e<br>Funcionalidade';
                        }
                    } else {
                        // Em desktops, remove a quebra de linha
                        if (heroTitle.innerHTML.includes('<br>')) {
                            heroTitle.innerHTML = 'Design e Funcionalidade';
                        }
                    }
                }
                
                // Ajusta o título na carga inicial
                updateTitle();
                
                // Ajusta o título quando a janela for redimensionada
                window.addEventListener('resize', updateTitle);
            }
        }
    }

    // Função para adicionar efeito de entrada com delay nas imagens
    function initScrollAnimations() {
        // Seleciona todos os itens que devem ter animação ao scroll
        const animatedElements = [
            ...document.querySelectorAll('.colecao-item'),
            ...document.querySelectorAll('.destaque-item'),
            ...document.querySelectorAll('.sobre-img'),
            ...document.querySelectorAll('.contato-content > div')
        ];
        
        // Adiciona classe inicial para esconder os elementos
        animatedElements.forEach(element => {
            element.classList.add('scroll-animation');
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 1s ease';
        });
        
        // Função para verificar se um elemento está visível na viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // Função para animar elementos visíveis
        function animateElementsOnScroll() {
            animatedElements.forEach((element, index) => {
                if (isElementInViewport(element) && element.style.opacity === '0') {
                    // Calculando um delay escalonado mais rápido
                    const row = Math.floor(index / 3); // Assume 3 elementos por linha
                    const col = index % 3;
                    const delay = 0.1 + (row * 0.15) + (col * 0.1); // Delays bem mais curtos
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay * 1000);
                }
            });
        }
        
        // Verificar elementos visíveis no carregamento inicial
        setTimeout(() => {
            animateElementsOnScroll();
        }, 200);
        
        // Adicionar listener de scroll para animar elementos quando se tornarem visíveis
        window.addEventListener('scroll', animateElementsOnScroll, { passive: true });
        
        // Executar novamente se a janela for redimensionada (para segurança)
        window.addEventListener('resize', animateElementsOnScroll, { passive: true });
    }

    // Ativar efeito de menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle && menuClose) {
        menuToggle.addEventListener('click', () => {
            nav.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuClose.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    function closeMenu() {
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Efeito de header scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navegação suave ao clicar em links do menu
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    closeMenu();
                    
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Controle do slider de destaques
    const destaquesSlider = document.querySelector('.destaques-slider');
    const slideItems = document.querySelectorAll('.destaque-item');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');
    
    if (destaquesSlider && slideItems.length > 0) {
        // Botões de navegação para carrossel 
        const itemWidth = slideItems[0].offsetWidth;
        const slideGap = parseInt(window.getComputedStyle(destaquesSlider).columnGap) || 24;
        const moveDistance = itemWidth + slideGap;
        
        prevBtn.addEventListener('click', () => {
            destaquesSlider.scrollBy({
                left: -moveDistance,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            destaquesSlider.scrollBy({
                left: moveDistance,
                behavior: 'smooth'
            });
        });
    }
    
    // Tooltip para o botão de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const tooltip = document.getElementById('tooltip');
    
    if (whatsappBtn && tooltip) {
        whatsappBtn.addEventListener('mouseenter', () => {
            const rect = whatsappBtn.getBoundingClientRect();
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.classList.add('visible');
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    }
    
    // Inicialização do lightbox para visualização de projetos
    initLightbox();

    // Enviando formulário para WhatsApp
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const endereco = document.getElementById('endereco').value.trim();
            const ambiente = document.getElementById('ambiente').value.trim();
            const horario = document.getElementById('horario').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !telefone || !ambiente || !horario || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Formatando a mensagem para o WhatsApp
            let whatsappMessage = `*Novo Orçamento - Modern Designs*%0A%0A`;
            whatsappMessage += `*Nome:* ${nome}%0A`;
            whatsappMessage += `*Telefone:* ${telefone}%0A`;
            
            if (endereco) {
                whatsappMessage += `*Endereço:* ${endereco}%0A`;
            }
            
            whatsappMessage += `*Ambiente:* ${document.getElementById('ambiente').options[document.getElementById('ambiente').selectedIndex].text}%0A`;
            whatsappMessage += `*Horário:* ${document.getElementById('horario').options[document.getElementById('horario').selectedIndex].text}%0A`;
            whatsappMessage += `*Detalhes:* ${mensagem}%0A`;
            
            // Redirecionando para o WhatsApp com a mensagem formatada
            window.open(`https://wa.me/5583991816152?text=${whatsappMessage}`, '_blank');
            
            // Limpar formulário
            contactForm.reset();
        });
    }
    
    // Aplicar a função para ajustar o título em dispositivos móveis
    adjustTitleForMobile();
    
    // Iniciar animações de scroll
    initScrollAnimations();
});

// Função Lightbox para projetos
function initLightbox() {
    // Criar elementos do lightbox
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    document.body.appendChild(lightboxOverlay);
    
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    lightboxOverlay.appendChild(lightboxContainer);
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxContainer.appendChild(lightboxImage);
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    lightboxContainer.appendChild(lightboxCaption);
    
    const lightboxClose = document.createElement('button');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '<i class="fas fa-times"></i>';
    lightboxContainer.appendChild(lightboxClose);
    
    const lightboxPrev = document.createElement('button');
    lightboxPrev.className = 'lightbox-nav lightbox-prev';
    lightboxPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    lightboxContainer.appendChild(lightboxPrev);
    
    const lightboxNext = document.createElement('button');
    lightboxNext.className = 'lightbox-nav lightbox-next';
    lightboxNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    lightboxContainer.appendChild(lightboxNext);
    
    // Variáveis para controle do lightbox
    let currentIndex = 0;
    let images = [];
    
    // Selecionar todas as imagens dos projetos
    const projectImages = document.querySelectorAll('.colecao-item img, .destaque-item img');
    
    // Preparar dados das imagens
    projectImages.forEach((img, index) => {
        // Obter título do projeto
        const title = img.closest('.colecao-item, .destaque-item').querySelector('h3')?.textContent || '';
        const subtitle = img.closest('.colecao-item, .destaque-item').querySelector('p')?.textContent || '';
        
        // Adicionar à lista de imagens
        images.push({
            src: img.src,
            title: title,
            subtitle: subtitle,
            element: img
        });
        
        // Adicionar evento de clique para abrir o lightbox
        img.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });
    
    // Função para abrir o lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir rolagem
    }
    
    // Função para fechar o lightbox
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar rolagem
    }
    
    // Função para atualizar o conteúdo do lightbox
    function updateLightbox() {
        const image = images[currentIndex];
        lightboxImage.src = image.src;
        lightboxCaption.innerHTML = `<h3>${image.title}</h3><p>${image.subtitle}</p>`;
        
        // Verificar se deve mostrar os botões de navegação
        lightboxPrev.style.display = currentIndex > 0 ? 'flex' : 'none';
        lightboxNext.style.display = currentIndex < images.length - 1 ? 'flex' : 'none';
    }
    
    // Navegação para próxima imagem
    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    }
    
    // Navegação para imagem anterior
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        }
    }
    
    // Adicionar eventos de clique para navegação
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightboxOverlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
}