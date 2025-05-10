// Script principal
document.addEventListener('DOMContentLoaded', function() {
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
        // CORREÇÃO: Botões de navegação para carrossel em dispositivos móveis
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
    
    // CORREÇÃO: Adicionando lightbox para visualização de projetos
    initLightbox();

    // CORREÇÃO: Enviando formulário para WhatsApp
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
    
    // Inicialização de efeitos adicionais
    setTimeout(() => {
        initRevealText();
        initHorizontalScroll();
        initMasonryLayout();
        initFilterMenu();
        initTextFollowCursor();
        initAdvancedParallax();
    }, 1000);
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

// Efeito de texto revelado caractere por caractere
function initRevealText() {
    const revealTextElements = document.querySelectorAll('.reveal-text');
    
    revealTextElements.forEach(element => {
        // Pegar o texto original
        const text = element.textContent;
        element.textContent = '';
        
        // Criar spans para cada caractere
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text[i];
            charSpan.style.opacity = '0';
            charSpan.style.transition = `opacity 0.03s ease ${i * 0.03}s`;
            element.appendChild(charSpan);
        }
        
        // Observador para animar quando visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        Array.from(entry.target.children).forEach((span, i) => {
                            setTimeout(() => {
                                span.style.opacity = '1';
                            }, i * 30);
                        });
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Efeito de scroll horizontal para seção selecionada
function initHorizontalScroll() {
    const horizontalSections = document.querySelectorAll('.horizontal-scroll-section');
    
    horizontalSections.forEach(section => {
        const container = section.querySelector('.horizontal-scroll-container');
        if (!container) return;
        
        // Calcular a largura total do conteúdo
        const items = container.querySelectorAll('.horizontal-scroll-item');
        let totalWidth = 0;
        
        items.forEach(item => {
            totalWidth += item.offsetWidth;
        });
        
        // Configurar o container
        container.style.width = totalWidth + 'px';
        section.style.height = (totalWidth - window.innerWidth + window.innerHeight) + 'px';
        
        // Atualizar transformação no scroll
        window.addEventListener('scroll', () => {
            const sectionRect = section.getBoundingClientRect();
            const sectionStart = window.pageYOffset + sectionRect.top;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionStart && scrollPosition <= (sectionStart + section.offsetHeight - window.innerHeight)) {
                const scrolled = scrollPosition - sectionStart;
                const maxScroll = section.offsetHeight - window.innerHeight;
                const transformValue = (scrolled / maxScroll) * (totalWidth - window.innerWidth);
                
                container.style.transform = `translateX(-${transformValue}px)`;
            }
        });
    });
}

// Inicializar Masonry Layout para grids
function initMasonryLayout() {
    const grids = document.querySelectorAll('.masonry-grid');
    
    grids.forEach(grid => {
        // Configuração inicial
        const items = grid.querySelectorAll('.masonry-item');
        const columns = parseInt(grid.getAttribute('data-columns')) || 3;
        
        // Criar colunas
        const columnElements = [];
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'masonry-column';
            columnElements.push(column);
            grid.appendChild(column);
        }
        
        // Distribuir itens pelas colunas
        items.forEach((item, index) => {
            const targetColumn = columnElements[index % columns];
            targetColumn.appendChild(item);
        });
    });
}

// Menu de filtro para projetos
function initFilterMenu() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterableItems = document.querySelectorAll('.filterable-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrar itens
            filterableItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Efeito de texto que segue o cursor
function initTextFollowCursor() {
    const followTexts = document.querySelectorAll('.follow-cursor-text');
    
    followTexts.forEach(text => {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            const rect = text.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distX = (x - centerX) * 0.05;
            const distY = (y - centerY) * 0.05;
            
            text.style.transform = `translate(${distX}px, ${distY}px)`;
        });
    });
}

// Efeito de Parallax avançado com diferentes velocidades
function initAdvancedParallax() {
    const parallaxLayers = document.querySelectorAll('[data-parallax-speed]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-parallax-speed'));
            const offset = scrollY * speed;
            
            layer.style.transform = `translateY(${offset}px)`;
        });
    });
}