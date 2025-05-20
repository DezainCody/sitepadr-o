// Script principal para a loja de móveis DESIGNWOOD
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    
    // Inicializar Typed.js na hero section
    if (document.querySelector('.typed-element')) {
        let typed = new Typed('.typed-element', {
            strings: ['ELEGÂNCIA', 'EXCLUSIVIDADE', 'FUNCIONALIDADE', 'MINIMALISMO'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true
        });
    }
    
    // Inicializar animações Lottie
    const lottieContainers = document.querySelectorAll('[data-lottie-container]');

    const lottieUrls = {
        // Ícone de "Matéria-Prima Premium"
        quality: 'https://assets7.lottiefiles.com/packages/lf20_8cxcnczq.json',
        
        // Ícone de "Design Exclusivo"
        design: 'https://assets10.lottiefiles.com/packages/lf20_1pxqjqps.json',
        
        // Ícone de "Produção Sustentável"
        sustain: 'https://assets1.lottiefiles.com/packages/lf20_tnrzlN.json',
        
        // Ícone de "Instalação Profissional"
        delivery: 'https://assets9.lottiefiles.com/packages/lf20_uu0x8lqv.json'
    };
    
    // Verificar se a biblioteca lottie está disponível
    if (typeof lottie !== 'undefined') {
        console.log('Biblioteca Lottie carregada com sucesso!');
        
        // Inicializar cada animação Lottie
        lottieContainers.forEach(container => {
            const type = container.getAttribute('data-lottie-container');
            if (lottieUrls[type]) {
                try {
                    const anim = lottie.loadAnimation({
                        container: container,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: lottieUrls[type]
                    });
                    
                    // Adicionar evento para detectar quando a animação é carregada
                    anim.addEventListener('DOMLoaded', function() {
                        console.log(`Animação ${type} carregada com sucesso!`);
                        
                        // Alterar a cor para preto e branco
                        if (anim.renderer && anim.renderer.elements && anim.renderer.elements.length > 0) {
                            const elements = anim.renderer.elements[0];
                            if (elements && elements.style) {
                                elements.style.filter = 'grayscale(100%)';
                            }
                        }
                    });
                    
                    // Tratar erros de carregamento
                    anim.addEventListener('error', function() {
                        console.error(`Erro ao carregar a animação ${type}`);
                        // Fallback para ícones estáticos caso a animação falhe
                        container.innerHTML = getFallbackIcon(type);
                    });
                    
                } catch (error) {
                    console.error(`Erro ao inicializar a animação ${type}:`, error);
                    container.innerHTML = getFallbackIcon(type);
                }
            } else {
                console.warn(`URL não encontrada para o tipo de animação: ${type}`);
                container.innerHTML = getFallbackIcon(type);
            }
        });
    } else {
        console.warn('Biblioteca Lottie não encontrada. Usando ícones estáticos como fallback.');
        lottieContainers.forEach(container => {
            const type = container.getAttribute('data-lottie-container');
            container.innerHTML = getFallbackIcon(type);
        });
    }
    
    // Função para fornecer ícones fallback quando as animações Lottie falham
    function getFallbackIcon(type) {
        const icons = {
            quality: '<i class="fas fa-award" style="font-size: 2.5rem; color: var(--color-white);"></i>',
            design: '<i class="fas fa-drafting-compass" style="font-size: 2.5rem; color: var(--color-white);"></i>',
            sustain: '<i class="fas fa-leaf" style="font-size: 2.5rem; color: var(--color-white);"></i>',
            delivery: '<i class="fas fa-tools" style="font-size: 2.5rem; color: var(--color-white);"></i>'
        };
        
        return icons[type] || '<i class="fas fa-star" style="font-size: 2.5rem; color: var(--color-white);"></i>';
    }
    
    // Efeito parallax para a hero section
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            let speed = parseFloat(parallaxBg.getAttribute('data-parallax-speed') || 0.2);
            parallaxBg.style.transform = 'translateY(' + (scrollPosition * speed) + 'px)';
        });
    }
    
    // Ativar efeito de menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const nav = document.querySelector('.main-nav');
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

    // Sistema de pesquisa
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    const searchResults = document.querySelector('.search-results');
    
    // Barra de pesquisa principal na seção de destaques
    const mainSearchInput = document.getElementById('main-search-input');
    const mainSearchClear = document.getElementById('main-search-clear');
    const destaquesNaoEncontrados = document.querySelector('.destaques-nao-encontrados');
    const limparPesquisaDestaques = document.getElementById('limpar-pesquisa-destaques');

    // Modal de Produto
    const productModal = document.querySelector('.product-modal');
    const productImage = document.querySelector('.product-image img');
    const productTitle = document.querySelector('.product-title');
    const closeModal = document.querySelector('.close-modal');
    const solicitarOrcamentoBtn = document.querySelector('.solicitar-orcamento');
    
    // Variável para controle do produto atual
    let currentProduct = null;

    // Scroll suave aprimorado para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                // Fechar o menu mobile se estiver aberto
                if (nav && nav.classList.contains('active')) {
                    closeMenu();
                }
                
                // Calcular a posição considerando o header fixo
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Animação de scroll suave com opções personalizadas
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Função para posicionar resultados de pesquisa
    function posicionarResultadosPesquisa() {
        if (!searchBar || !searchResults) return;
        
        // Obter a posição e dimensões da barra de pesquisa
        const searchBarRect = searchBar.getBoundingClientRect();
        
        // Posicionar resultados exatamente abaixo da barra de pesquisa
        searchResults.style.top = (searchBarRect.bottom + 5) + 'px';
        searchResults.style.left = searchBarRect.left + 'px';
        searchResults.style.width = searchBarRect.width + 'px';
    }

    // Função para abrir/fechar a barra de pesquisa
    function toggleSearchBar() {
        searchBar.classList.toggle('active');
        
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
            searchResults.classList.remove('active');
            searchResults.style.display = 'none';
            searchInput.value = '';
            
            setTimeout(() => {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                searchResults.style.top = '';
                searchResults.style.left = '';
                searchResults.style.width = '100%';
            }, 50);
        } else {
            closeSearchBar();
        }
    }

    // Função para fechar a barra de pesquisa
    function closeSearchBar() {
        searchBar.classList.remove('active');
        searchResults.classList.remove('active');
        searchResults.style.display = 'none';
        searchInput.value = '';
    }

    // Função para remover acentos para comparação
    function removerAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    // Função para realizar a pesquisa na barra principal (seção de destaques)
    function realizarPesquisaDestaques(termoPesquisa) {
        // Se o termo de pesquisa estiver vazio, reset tudo
        if (!termoPesquisa || termoPesquisa.trim() === '') {
            // Mostrar todos os destaques
            const itensDestaque = document.querySelectorAll('.destaques-slider .destaque-item');
            itensDestaque.forEach(item => {
                item.classList.remove('destaque-hidden');
            });
            
            // Esconder a mensagem de nenhum resultado
            if (destaquesNaoEncontrados) {
                destaquesNaoEncontrados.classList.remove('active');
                destaquesNaoEncontrados.style.display = 'none';
            }
            
            if (mainSearchClear) {
                mainSearchClear.classList.remove('active');
            }
            
            return;
        }
        
        // Normalizar o termo de pesquisa
        termoPesquisa = removerAcentos(termoPesquisa.trim());
        
        // Selecionar APENAS os produtos da seção "Destaques da Estação"
        const itensDestaque = document.querySelectorAll('.destaques-slider .destaque-item');
        
        let destaquesVisiveis = 0;
        
        itensDestaque.forEach(item => {
            const nomeProduto = removerAcentos(item.dataset.nome);
            
            if (nomeProduto.includes(termoPesquisa)) {
                item.classList.remove('destaque-hidden');
                destaquesVisiveis++;
            } else {
                item.classList.add('destaque-hidden');
            }
        });
        
        // Mostrar ou esconder a mensagem de "nenhum destaque encontrado"
        if (destaquesVisiveis === 0 && destaquesNaoEncontrados) {
            destaquesNaoEncontrados.classList.add('active');
            destaquesNaoEncontrados.style.display = 'flex';
        } else if (destaquesNaoEncontrados) {
            destaquesNaoEncontrados.classList.remove('active');
            destaquesNaoEncontrados.style.display = 'none';
        }
        
        if (mainSearchClear) {
            mainSearchClear.classList.add('active');
        }
    }

    // Função para pesquisa no header (mostra resultados em dropdown e não filtra nada)
    function realizarPesquisa(termoPesquisa) {
        // Se o termo de pesquisa estiver vazio, reset
        if (!termoPesquisa || termoPesquisa.trim() === '') {
            searchResults.classList.remove('active');
            searchResults.style.display = 'none';
            return;
        }
        
        // Normalizar o termo de pesquisa
        termoPesquisa = removerAcentos(termoPesquisa.trim());
        
        // Obter todos os produtos para o dropdown de resultados
        const todosProdutos = document.querySelectorAll('.produto');
        
        // Filtrar para o dropdown
        const resultados = Array.from(todosProdutos).filter(produto => {
            const nomeProduto = removerAcentos(produto.dataset.nome);
            return nomeProduto.includes(termoPesquisa);
        });
        
        // Atualizar o dropdown de resultados
        atualizarResultadosPesquisa(resultados);
    }

    // Função para atualizar os resultados de pesquisa no dropdown
    function atualizarResultadosPesquisa(resultados) {
        searchResults.innerHTML = '';
        
        if (resultados.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results"><i class="fas fa-search"></i>Nenhum projeto encontrado</div>';
        } else {
            resultados.forEach(produto => {
                const resultadoItem = document.createElement('div');
                resultadoItem.className = 'search-result-item';
                resultadoItem.innerHTML = `
                    <img src="${produto.dataset.img}" alt="${produto.dataset.nome}" class="search-result-img">
                    <div class="search-result-details">
                        <h4>${produto.dataset.nome}</h4>
                    </div>
                `;
                
                resultadoItem.addEventListener('click', () => {
                    const productData = {
                        id: produto.dataset.id,
                        name: produto.dataset.nome,
                        image: produto.dataset.img
                    };
                    
                    openProductModal(productData);
                    
                    // Fechar a pesquisa
                    closeSearchBar();
                });
                
                searchResults.appendChild(resultadoItem);
            });
        }
        
        // Mostrar os resultados e posicioná-los corretamente
        searchResults.style.display = 'block';
        
        // Usar setTimeout para garantir que a renderização complete antes de animar
        setTimeout(() => {
            searchResults.classList.add('active');
        }, 10);
    }

    // Efeito de header scroll
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Reposicionar resultados da pesquisa ao fazer scroll
        if (searchResults.classList.contains('active')) {
            posicionarResultadosPesquisa();
        }
    });

    // Controle do slider de destaques
    const destaquesSlider = document.querySelector('.destaques-slider');
    const slideItems = document.querySelectorAll('.destaque-item');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');

    if (destaquesSlider && slideItems.length > 0) {
        // Recalcular após as alterações do tamanho dos itens
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

    // Funções para o modal de produto
    function openProductModal(productData) {
        currentProduct = productData;
        
        // Preencher os dados do produto no modal
        productImage.src = productData.image;
        productTitle.textContent = productData.name;
        
        // Resetar os campos do formulário
        const ambienteSelect = document.getElementById('ambiente');
        const medidasInput = document.getElementById('medidas');
        const obsOrcamento = document.getElementById('obs-orcamento');
        
        if (ambienteSelect) ambienteSelect.value = '';
        if (medidasInput) medidasInput.value = '';
        if (obsOrcamento) obsOrcamento.value = '';
        
        // Mostrar o modal
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners

    // Mostrar modal de produto ao clicar em "Solicitar Orçamento"
    const solicitarButtons = document.querySelectorAll('.btn-solicitar');

    solicitarButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.produto');
            
            if (productItem) {
                const productData = {
                    id: productItem.dataset.id,
                    name: productItem.dataset.nome,
                    image: productItem.dataset.img
                };
                
                openProductModal(productData);
            }
        });
    });

    // Fechar modal de produto
    if (closeModal) {
        closeModal.addEventListener('click', closeProductModal);
    }

    // Enviar solicitação de orçamento para WhatsApp
    if (solicitarOrcamentoBtn) {
        solicitarOrcamentoBtn.addEventListener('click', function() {
            if (!currentProduct) {
                alert('Erro ao identificar o projeto selecionado.');
                return;
            }
            
            // Obter os dados do formulário
            const ambiente = document.getElementById('ambiente').value.trim();
            const medidas = document.getElementById('medidas').value.trim();
            const observacoes = document.getElementById('obs-orcamento').value.trim();
            
            if (!ambiente) {
                alert('Por favor, selecione o tipo de ambiente.');
                return;
            }
            
            // Formatar a mensagem para o WhatsApp
            let whatsappMessage = `*Solicitação de Orçamento - DESIGNWOOD*%0A%0A`;
            whatsappMessage += `*Projeto:* ${currentProduct.name}%0A`;
            whatsappMessage += `*Ambiente:* ${ambiente}%0A`;
            
            if (medidas) {
                whatsappMessage += `*Medidas:* ${medidas}%0A`;
            }
            
            if (observacoes) {
                whatsappMessage += `%0A*Observações:*%0A${observacoes}%0A`;
            }
            
            whatsappMessage += `%0A*Solicito um orçamento para este projeto.*`;
            
            // Redirecionar para o WhatsApp
            window.open(`https://wa.me/5583991816153?text=${whatsappMessage}`, '_blank');
            
            // Fechar o modal
            closeProductModal();
            
            // Mensagem de confirmação
            alert('Sua solicitação de orçamento foi enviada! Em breve entraremos em contato.');
        });
    }

    // Event Listener para o formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !telefone || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Formatar a mensagem para o WhatsApp
            let whatsappMessage = `*Contato via Site - DESIGNWOOD*%0A%0A`;
            whatsappMessage += `*Nome:* ${nome}%0A`;
            whatsappMessage += `*Telefone:* ${telefone}%0A`;
            whatsappMessage += `*Email:* ${email}%0A%0A`;
            whatsappMessage += `*Mensagem:*%0A${mensagem}%0A%0A`;
            
            // Redirecionar para o WhatsApp usando o formato correto
            window.open(`https://wa.me/5583991816153?text=${whatsappMessage}`, '_blank');
            
            // Limpar o formulário
            contactForm.reset();
            
            // Mostrar confirmação
            alert('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
        });
    }

    // Event listeners para a funcionalidade de pesquisa da lupa no header
    if (searchIcon) {
        searchIcon.addEventListener('click', toggleSearchBar);
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            closeSearchBar();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            realizarPesquisa(this.value);
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSearchBar();
            }
        });
    }

    // Fechar resultados de pesquisa quando clicar fora
    document.addEventListener('click', (e) => {
        if (searchBar && searchIcon && searchBar.classList.contains('active') && 
            !searchBar.contains(e.target) && !searchIcon.contains(e.target) && !searchResults.contains(e.target)) {
            // Verificação adicional para não fechar ao clicar nos resultados
            closeSearchBar();
        }
    });

    // Event listeners para a pesquisa principal na seção de destaques
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            realizarPesquisaDestaques(this.value);
        });
        
        mainSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.value = '';
                // Resetar todos os destaques
                const itensDestaque = document.querySelectorAll('.destaques-slider .destaque-item');
                itensDestaque.forEach(item => {
                    item.classList.remove('destaque-hidden');
                });
                
                if (destaquesNaoEncontrados) {
                    destaquesNaoEncontrados.classList.remove('active');
                    destaquesNaoEncontrados.style.display = 'none';
                }
                
                if (mainSearchClear) {
                    mainSearchClear.classList.remove('active');
                }
            }
        });
    }

    // Botão para limpar a pesquisa principal
    if (mainSearchClear) {
        mainSearchClear.addEventListener('click', function() {
            if (mainSearchInput) {
                mainSearchInput.value = '';
            }
            
            // Resetar todos os destaques
            const itensDestaque = document.querySelectorAll('.destaques-slider .destaque-item');
            itensDestaque.forEach(item => {
                item.classList.remove('destaque-hidden');
            });
            
            if (destaquesNaoEncontrados) {
                destaquesNaoEncontrados.classList.remove('active');
                destaquesNaoEncontrados.style.display = 'none';
            }
            
            mainSearchClear.classList.remove('active');
        });
    }

    // Botão para limpar a pesquisa na mensagem de "nenhum destaque encontrado"
    if (limparPesquisaDestaques) {
        limparPesquisaDestaques.addEventListener('click', () => {
            // Resetar todos os destaques
            const itensDestaque = document.querySelectorAll('.destaques-slider .destaque-item');
            itensDestaque.forEach(item => {
                item.classList.remove('destaque-hidden');
            });
            
            if (destaquesNaoEncontrados) {
                destaquesNaoEncontrados.classList.remove('active');
                destaquesNaoEncontrados.style.display = 'none';
            }
            
            if (mainSearchInput) {
                mainSearchInput.value = '';
                if (mainSearchClear) {
                    mainSearchClear.classList.remove('active');
                }
            }
        });
    }

    // Impedir que o formulário de pesquisa envie
    if (searchBar) {
        searchBar.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    // Adicionar evento de redimensionamento para atualizar a posição dos resultados
    window.addEventListener('resize', () => {
        if (searchResults.classList.contains('active')) {
            posicionarResultadosPesquisa();
        }
    });

    // Adicionar manipulador para fechamento de modal ao apertar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (productModal.classList.contains('active')) {
                closeProductModal();
            }
        }
    });
});