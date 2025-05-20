// Função para garantir que os ícones do Font Awesome estejam carregados corretamente
function verificarIcones() {
    // Verificar se a biblioteca Font Awesome foi carregada corretamente
    if (typeof FontAwesome === 'undefined' && !window.FontAwesomeTimeoutStarted) {
        window.FontAwesomeTimeoutStarted = true;
        console.warn('Font Awesome não foi detectado. Tentando carregar novamente...');
        
        // Tentar carregar o CSS do Font Awesome novamente
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
        
        // Verificar se os ícones estão visíveis após um atraso
        setTimeout(function() {
            const icones = document.querySelectorAll('.fas, .fab, .far, .fa');
            if (icones.length === 0) {
                console.error('Não foi possível carregar os ícones do Font Awesome.');
            } else {
                console.log('Ícones do Font Awesome carregados com sucesso!');
            }
        }, 2000);
    }
}

// Inicialização da animação de digitação
document.addEventListener('DOMContentLoaded', function() {
    // Verificar carregamento dos ícones
    verificarIcones();
    
    // Adicionar ícones contextuais aos elementos do site
    adicionarIconesContextuais();
    
    // Typed.js para animação de texto na hero section
    const typedOptions = {
        strings: ['ELEGÂNCIA', 'SOFISTICAÇÃO', 'QUALIDADE', 'EXCLUSIVIDADE'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    };
    
    if (document.querySelector('.typed-element')) {
        new Typed('.typed-element', typedOptions);
    }
    
    // Inicialização do AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false
    });
    
    // Inicialização das animações Lottie com fallback garantido
    const lottieContainers = document.querySelectorAll('[data-lottie-container]');
    lottieContainers.forEach(container => {
        const type = container.getAttribute('data-lottie-container');
        let path = '';
        let iconClass = '';
        
        // Definir path e ícone de fallback para cada tipo
        switch(type) {
            case 'quality':
                path = 'https://assets5.lottiefiles.com/packages/lf20_tfb3estx.json'; // Ícone de madeira/árvore
                iconClass = 'fas fa-tree';
                break;
            case 'design':
                path = 'https://assets9.lottiefiles.com/private_files/lf30_rdghasit.json'; // Nova URL para o ícone de design
                iconClass = 'fas fa-drafting-compass'; // Ícone de compasso de desenho
                break;
            case 'sustain':
                path = 'https://assets8.lottiefiles.com/packages/lf20_ky4luhot.json'; // Ícone de sustentabilidade/folha
                iconClass = 'fas fa-leaf';
                break;
            case 'delivery':
                path = 'https://assets2.lottiefiles.com/packages/lf20_to91uv3t.json'; // Ícone de ferramentas/instalação
                iconClass = 'fas fa-tools';
                break;
        }
        
        // Exibir imediatamente o ícone de fallback
        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.style.fontSize = '48px';
        icon.style.color = '#7d5a44'; // Cor marrom para contraste
        icon.style.display = 'block';
        icon.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
        container.appendChild(icon);
        
        // Tentar carregar a animação Lottie
        if (path && typeof lottie !== 'undefined') {
            try {
                const anim = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: path
                });
                
                // Se a animação carregar, esconder o ícone de fallback
                anim.addEventListener('DOMLoaded', function() {
                    if (icon && icon.parentNode) {
                        icon.style.display = 'none';
                    }
                });
                
                // Se ocorrer erro, garantir que o ícone permaneça visível
                anim.addEventListener('error', function() {
                    if (icon && icon.parentNode) {
                        icon.style.display = 'block';
                    }
                });
            } catch (error) {
                console.warn('Erro ao carregar animação Lottie:', error);
                // Garantir que o ícone de fallback esteja visível
                if (icon && icon.parentNode) {
                    icon.style.display = 'block';
                }
            }
        }
    });
    
    // Efeito Parallax
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        let scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Funcionalidade da barra de pesquisa no header
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    
    if (searchIcon && searchBar) {
        searchIcon.addEventListener('click', function() {
            searchBar.classList.add('active');
            searchInput.focus();
        });
        
        searchClose.addEventListener('click', function() {
            searchBar.classList.remove('active');
            searchInput.value = '';
        });
    }
    
    // Funcionalidade da pesquisa principal na seção de destaques
    const mainSearchInput = document.getElementById('main-search-input');
    const mainSearchClear = document.getElementById('main-search-clear');
    const destaqueItems = document.querySelectorAll('.destaque-item');
    const destaquesNaoEncontrados = document.querySelector('.destaques-nao-encontrados');
    const limparPesquisaDestaques = document.getElementById('limpar-pesquisa-destaques');
    
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let encontrados = 0;
            
            destaqueItems.forEach(item => {
                const produtoNome = item.getAttribute('data-nome').toLowerCase();
                if (produtoNome.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                    encontrados++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            if (encontrados === 0 && searchTerm !== '') {
                destaquesNaoEncontrados.style.display = 'flex';
            } else {
                destaquesNaoEncontrados.style.display = 'none';
            }
        });
        
        if (mainSearchClear) {
            mainSearchClear.addEventListener('click', function() {
                mainSearchInput.value = '';
                mainSearchInput.dispatchEvent(new Event('input'));
            });
        }
        
        if (limparPesquisaDestaques) {
            limparPesquisaDestaques.addEventListener('click', function() {
                mainSearchInput.value = '';
                mainSearchInput.dispatchEvent(new Event('input'));
            });
        }
    }
    
    // Slider de destaques
    const sliderContainer = document.querySelector('.destaques-slider');
    const sliderArrowLeft = document.querySelector('.slider-arrow-left');
    const sliderArrowRight = document.querySelector('.slider-arrow-right');
    
    if (sliderContainer && sliderArrowLeft && sliderArrowRight) {
        let slidePosition = 0;
        const slideWidth = 300; // Largura do slide em px
        const slidesCount = document.querySelectorAll('.destaque-item').length;
        const visibleSlides = window.innerWidth > 768 ? 3 : 1;
        const maxSlidePosition = slidesCount - visibleSlides;
        
        sliderArrowLeft.addEventListener('click', function() {
            if (slidePosition > 0) {
                slidePosition--;
                updateSliderPosition();
            }
        });
        
        sliderArrowRight.addEventListener('click', function() {
            if (slidePosition < maxSlidePosition) {
                slidePosition++;
                updateSliderPosition();
            }
        });
        
        function updateSliderPosition() {
            sliderContainer.style.transform = `translateX(-${slidePosition * slideWidth}px)`;
        }
        
        // Atualizar quando a janela for redimensionada
        window.addEventListener('resize', function() {
            const newVisibleSlides = window.innerWidth > 768 ? 3 : 1;
            const newMaxSlidePosition = slidesCount - newVisibleSlides;
            
            if (slidePosition > newMaxSlidePosition) {
                slidePosition = newMaxSlidePosition;
                updateSliderPosition();
            }
        });
    }
    
    // Navegação Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle && menuClose && mainNav && menuOverlay) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        function closeMenu() {
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        menuClose.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu);
        
        // Fechar menu ao clicar em links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // Animação de cards ao passar o mouse
    const animatedCards = document.querySelectorAll('.animated-card');
    
    animatedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
    
    // Modal do produto para orçamento
    const btnsOrcamento = document.querySelectorAll('.btn-solicitar');
    const productModal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (btnsOrcamento.length > 0 && productModal && closeModal) {
        btnsOrcamento.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Verificar se é um pedido de redirecionamento direto (Ctrl+Click)
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    // Obter dados do produto diretamente do elemento pai
                    const produtoItem = this.closest('.produto-item') || this.closest('.destaque-item');
                    if (!produtoItem) return;
                    
                    const produtoNome = produtoItem.getAttribute('data-nome');
                    
                    // Redirecionar diretamente para WhatsApp com informações básicas
                    const mensagemRapida = `*Solicitação Rápida de Orçamento - DESIGNWOOD*%0A%0A*Produto:* ${produtoNome}%0A`;
                    window.open(`https://wa.me/5583991816152?text=${mensagemRapida}`, '_blank');
                    return;
                }
                
                // Comportamento normal de abrir o modal
                const produtoItem = this.closest('.produto-item') || this.closest('.destaque-item');
                if (!produtoItem) return;
                
                const produtoId = produtoItem.getAttribute('data-id');
                const produtoNome = produtoItem.getAttribute('data-nome');
                const produtoImg = produtoItem.getAttribute('data-img');
                
                document.querySelector('.product-title').textContent = produtoNome;
                document.querySelector('.product-image img').src = produtoImg;
                document.querySelector('.product-image img').alt = produtoNome;
                
                productModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Fechar modal ao clicar fora do conteúdo
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Otimização do redirecionamento para WhatsApp
    const solicitarOrcamentoBtn = document.querySelector('.solicitar-orcamento');
    
    if (solicitarOrcamentoBtn) {
        solicitarOrcamentoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega os valores do formulário
            const produtoTitulo = document.querySelector('.product-title').textContent;
            const ambiente = document.getElementById('ambiente').value;
            const medidas = document.getElementById('medidas').value;
            const observacoes = document.getElementById('obs-orcamento').value;
            
            // Construir a mensagem para o WhatsApp
            let mensagem = `*Solicitação de Orçamento - DESIGNWOOD*%0A%0A`;
            mensagem += `*Produto:* ${produtoTitulo}%0A`;
            mensagem += ambiente ? `*Ambiente:* ${ambiente}%0A` : '';
            mensagem += medidas ? `*Medidas:* ${medidas}%0A` : '';
            mensagem += observacoes ? `*Observações:* ${observacoes}%0A` : '';
            
            // Redirecionar imediatamente para o WhatsApp com a mensagem
            window.open(`https://wa.me/5583991816152?text=${mensagem}`, '_blank');
            
            // Fechar o modal após o redirecionamento
            document.querySelector('.product-modal').classList.remove('active');
        });
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Simulação de envio de formulário
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            // Timeout para simular envio
            setTimeout(function() {
                // Aqui você pode implementar o envio real do formulário via AJAX
                // Para fins de demonstração, vamos apenas mostrar um alerta
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                
                // Redefinir formulário e botão
                contactForm.reset();
                submitBtn.textContent = 'ENVIAR MENSAGEM';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Tooltip para botão WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const tooltip = document.getElementById('tooltip');
    
    if (whatsappBtn && tooltip) {
        whatsappBtn.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            // Posicionamento do tooltip
            const btnRect = whatsappBtn.getBoundingClientRect();
            tooltip.style.top = (btnRect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (btnRect.left + (btnRect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    }
    
    // Função para rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Considerar a altura do header
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Função para adicionar ícones contextuais aos elementos do site
function adicionarIconesContextuais() {
    // Adicionar ícones aos botões de orçamento
    document.querySelectorAll('.btn-solicitar').forEach(btn => {
        // Verificar se o botão já tem um ícone
        if (!btn.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-calculator';
            icon.style.marginRight = '8px';
            btn.prepend(icon);
        }
    });
    
    // Adicionar ícones aos campos do formulário no modal
    if (document.getElementById('ambiente')) {
        adicionarIconeAoLabel('ambiente', 'fas fa-home');
    }
    if (document.getElementById('medidas')) {
        adicionarIconeAoLabel('medidas', 'fas fa-ruler-combined');
    }
    if (document.getElementById('obs-orcamento')) {
        adicionarIconeAoLabel('obs-orcamento', 'fas fa-comment-alt');
    }
    
    // Adicionar ícones aos botões de solicitar orçamento
    const btnSolicitarOrcamento = document.querySelector('.solicitar-orcamento');
    if (btnSolicitarOrcamento && !btnSolicitarOrcamento.querySelector('i')) {
        const icon = document.createElement('i');
        icon.className = 'fab fa-whatsapp';
        icon.style.marginRight = '8px';
        btnSolicitarOrcamento.prepend(icon);
    }
    
    // Adicionar ícones aos campos do formulário de contato
    if (document.getElementById('nome')) {
        adicionarIconeAoLabel('nome', 'fas fa-user');
    }
    if (document.getElementById('telefone')) {
        adicionarIconeAoLabel('telefone', 'fas fa-phone-alt');
    }
    if (document.getElementById('email')) {
        adicionarIconeAoLabel('email', 'fas fa-envelope');
    }
    if (document.getElementById('mensagem')) {
        adicionarIconeAoLabel('mensagem', 'fas fa-comment');
    }
    
    // Adicionar ícones aos links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let iconClass = '';
        
        switch(href) {
            case '#home':
                iconClass = 'fas fa-home';
                break;
            case '#sobre':
                iconClass = 'fas fa-info-circle';
                break;
            case '#produtos':
                iconClass = 'fas fa-couch';
                break;
            case '#contato':
                iconClass = 'fas fa-envelope';
                break;
        }
        
        if (iconClass && !link.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = iconClass;
            icon.style.marginRight = '8px';
            link.prepend(icon);
        }
    });
    
    // Adicionar ícones aos links do footer
    document.querySelectorAll('.footer-links ul li a').forEach(link => {
        const href = link.getAttribute('href');
        let iconClass = '';
        
        if (href.includes('#home')) {
            iconClass = 'fas fa-home';
        } else if (href.includes('#sobre')) {
            iconClass = 'fas fa-info-circle';
        } else if (href.includes('#produtos')) {
            iconClass = 'fas fa-couch';
        } else if (href.includes('#contato')) {
            iconClass = 'fas fa-envelope';
        } else if (href.includes('privacidade')) {
            iconClass = 'fas fa-shield-alt';
        } else if (href.includes('termos')) {
            iconClass = 'fas fa-file-contract';
        } else if (href.includes('garantia')) {
            iconClass = 'fas fa-certificate';
        } else if (href.includes('instalacao')) {
            iconClass = 'fas fa-tools';
        }
        
        if (iconClass && !link.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = iconClass;
            icon.style.marginRight = '8px';
            link.prepend(icon);
        }
    });
    
    // Melhorar os ícones da seção de vantagens
    adicionarIconesVantagens();
    
    // Adicionar ícones aos botões de ação principais
    const btnPrimary = document.querySelector('.hero-content .btn-primary');
    if (btnPrimary && !btnPrimary.querySelector('i')) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-arrow-right';
        icon.style.marginLeft = '8px';
        btnPrimary.appendChild(icon);
    }
}

// Função para adicionar ícone a um label de campo de formulário
function adicionarIconeAoLabel(fieldId, iconClass) {
    // Não adicionar ícones aos labels - apenas usar os ícones dentro dos campos
    // Esta função foi modificada para evitar duplicação
    return;
}

// Função para adicionar ícones às vantagens como fallback para Lottie
function adicionarIconesVantagens() {
    const vantagemItems = document.querySelectorAll('.vantagem-item');
    
    vantagemItems.forEach(item => {
        const title = item.querySelector('h4');
        if (!title) return;
        
        let iconClass = '';
        const titleText = title.textContent.trim();
        
        if (titleText.includes('MATÉRIA-PRIMA')) {
            iconClass = 'fas fa-tree';
        } else if (titleText.includes('DESIGN')) {
            iconClass = 'fas fa-drafting-compass';
        } else if (titleText.includes('SUSTENTÁVEL')) {
            iconClass = 'fas fa-leaf';
        } else if (titleText.includes('INSTALAÇÃO')) {
            iconClass = 'fas fa-tools';
        }
        
        // Verificar se já existe um ícone de fallback visível
        const lottieContainer = item.querySelector('.lottie-container');
        const existingIcon = lottieContainer.querySelector('i');
        
        if (iconClass && !existingIcon) {
            lottieContainer.setAttribute('data-fallback-icon', iconClass);
            
            // Adicionar ícone de fallback adicional caso o anterior não tenha funcionado
            const icon = document.createElement('i');
            icon.className = iconClass;
            icon.style.fontSize = '48px';
            icon.style.color = '#7d5a44'; // Cor marrom para contraste
            icon.style.display = 'block';
            icon.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
            lottieContainer.appendChild(icon);
        }
    });
}