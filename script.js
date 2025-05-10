// Funções adicionais para efeitos visuais interativos
// Estas funções devem ser adicionadas ao arquivo script.js existente

// Efeito de galeria com lightbox para projetos
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
    
    // Adicionar estilo CSS inline para o lightbox
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .lightbox-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox-container {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .lightbox-overlay.active .lightbox-container {
            transform: scale(1);
        }
        
        .lightbox-image {
            display: block;
            max-width: 100%;
            max-height: 80vh;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: -40px;
            left: 0;
            width: 100%;
            color: white;
            text-align: center;
            padding: 10px 0;
            font-family: 'Montserrat', sans-serif;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            width: 30px;
            height: 30px;
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .lightbox-close:hover {
            transform: rotate(90deg);
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-nav:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-50%) scale(1.1);
        }
        
        .lightbox-prev {
            left: -60px;
        }
        
        .lightbox-next {
            right: -60px;
        }
    `;
    document.head.appendChild(style);
    
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

// Efeito de cursor personalizado
function initCustomCursor() {
    // Criar elementos do cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Adicionar estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s, opacity 0.2s;
        }
        
        .cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: transform 0.15s ease-out, width 0.3s, height 0.3s, background-color 0.3s;
            opacity: 0.5;
        }
        
        a:hover ~ .cursor-follower,
        button:hover ~ .cursor-follower,
        .colecao-item:hover ~ .cursor-follower,
        .destaque-item:hover ~ .cursor-follower {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: rgba(var(--primary-color-rgb), 0.1);
            border-color: transparent;
        }
        
        body:active .custom-cursor {
            transform: translate(-50%, -50%) scale(0.7);
        }
        
        @media (max-width: 768px) {
            .custom-cursor, .cursor-follower {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Atualizar posição do cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Atraso suave para o seguidor do cursor
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Efeitos especiais para links e botões
    const interactiveElements = document.querySelectorAll('a, button, .colecao-item, .destaque-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.mixBlendMode = 'difference';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.opacity = '0.3';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = '';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.opacity = '0.5';
        });
    });
    
    // Ocultar cursor ao sair da janela
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

// Efeito de slider 3D para projetos em destaque
function init3DSlider() {
    const slider = document.querySelector('.destaques-slider');
    if (!slider) return;
    
    // Adicionar classe para estilo 3D
    slider.classList.add('slider-3d');
    
    // Aplicar transformação 3D aos itens
    const items = slider.querySelectorAll('.destaque-item');
    items.forEach((item, index) => {
        // Posicionar os itens em círculo
        const angle = (index / items.length) * Math.PI * 2;
        const radius = 400;
        
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        item.style.transform = `translateX(${x}px) translateZ(${z}px)`;
    });
    
    // Adicionar rotação ao slider
    let rotation = 0;
    const rotateSlider = (direction) => {
        rotation += direction * (360 / items.length);
        slider.style.transform = `rotateY(${rotation}deg)`;
    };
    
    // Eventos para os botões de navegação
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => rotateSlider(1));
        nextBtn.addEventListener('click', () => rotateSlider(-1));
    }
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

// Inicialização de todos os efeitos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os efeitos interativos
    setTimeout(() => {
        initLightbox();
        initRevealText();
        initHorizontalScroll();
        
        // Verificar preferência do usuário para cursor personalizado
        const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!preferReducedMotion) {
            initCustomCursor();
        }
        
        initMasonryLayout();
        initFilterMenu();
        initTextFollowCursor();
        initAdvancedParallax();
    }, 1000);
});