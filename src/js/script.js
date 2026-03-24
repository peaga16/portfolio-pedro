// =========================================================
// 1. SEU BANCO DE DADOS LOCAL (Sistema de 12 Colunas)
// =========================================================
            // 6 = Metade (2 por linha)
            // 4 = Um terço (3 por linha)
            // 12 = Tela cheia
const projetosGaleria = {
 'estilounico': {
        titulo: 'Loja de Roupas - Social Media',
        pasta: 'src/img/estilounico/', 
        fotos: [
            ['1.png', 30],
            ['2.png', 30], 
            ['3.png', 20],
            ['4.png', 20],
            ['5.png', 20],
            ['6.png', 60],
            ['7.png', 60]
        ]
    },
    'lojasuplementos': {
        titulo: 'Loja de Suplementos - Social Media',
        pasta: 'src/img/lojasuplementos/',
        fotos: [
            ['1.png', 20],
            ['2.jpg', 20],
            ['3.png', 20], 
            ['4.png', 20],
            ['5.png', 20],
            ['6.png', 20],
            ['7.jpg', 20],
            ['8.png', 20],
            ['9.png', 20]
        ]
    },
    'estetica': {
        titulo: 'Estética - Social Media',
        pasta: 'src/img/estetica/',
        fotos: [
            ['1.png', 30],
            ['2.png', 30],
            ['3.png', 30], 
            ['4.png', 30],
            ['5.png', 60],
            ['6.png', 60]
        ]
    },
    'protecaov': {
        titulo: 'Proteção Veicular - Social Media',
        pasta: 'src/img/protecaov/',
        fotos: [
            ['1.png', 15],
            ['2.png', 15],
            ['3.png', 15],
            ['4.png', 15],
            ['5.png', 20],
            ['6.png', 20],
            ['7.png', 20],
            ['8.png', 20],
            ['9.png', 20],
            ['10.png', 20],
            ['11.png', 20],
            ['12.png', 20],
            ['13.png', 20],
            ['destaque1.png', 10],
            ['destaque2.png', 10],
            ['destaque3.png', 10],
            ['destaque4.png', 10],
            ['destaque5.png', 10],
            ['destaque6.png', 10]
        ]
    },
    'prefeitura': {
        titulo: 'Prefeitura - Social Media',
        pasta: 'src/img/prefeitura/',
        fotos: [
            ['1.jpg', 20],
            ['2.png', 20],
            ['3.png', 20],
            ['4.png', 15],
            ['5.jpg', 15],
            ['6.png', 15],
            ['7.png', 15],
            ['8.jpg', 20],
            ['9.png', 20],
            ['10.jpg', 20],
            ['11.png', 15],
            ['12.png', 15],
            ['13.png', 15],
            ['14.png', 15]
        ]
    },
    'pincaecia': {
        titulo: 'Pinca & Cia - Social Media',
        pasta: 'src/img/pincaecia/',
        fotos: [
            ['1.png', 20],
            ['2.png', 20],
            ['3.png', 20],
            ['4.png', 30],
            ['5.png', 30],
            ['6.png', 20],
            ['7.png', 20],
            ['8.png', 20],
        ]
    },
        'consorcio': {
        titulo: 'Consórcio - Social Media',
        pasta: 'src/img/consorcio/',
        fotos: [
            ['1.png', 20],
            ['2.png', 20],
            ['3.png', 20],
            ['4.png', 24],
            ['5.png', 24],
            ['6.jpg', 12],
            ['7.png', 30],
            ['8.jpg', 30],
            ['9.jpg', 60]
        ]
    }
};

// =========================================================
// 2. ANIMAÇÕES BASE DO SITE
// =========================================================
const navbar = document.getElementById('navbar');
if(navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) reveal.classList.add('active');
    });
}
window.addEventListener('scroll', revealOnScroll);
setTimeout(revealOnScroll, 100); 

// Efeito de Digitação
const typingTextElement = document.getElementById("typing-text");
if (typingTextElement) {
    const textArray = ["Desenvolvedor de Sistemas", "Especialista em Mídia OOH", "Automação em Python", "Identidade Visual"];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentText = textArray[textIndex];
        if (isDeleting) { typingTextElement.textContent = currentText.substring(0, charIndex - 1); charIndex--; } 
        else { typingTextElement.textContent = currentText.substring(0, charIndex + 1); charIndex++; }

        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentText.length) { speed = 2000; isDeleting = true; } 
        else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % textArray.length; speed = 500; }
        setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, 1000);
}

// Menu Mobile
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
if(menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(item => item.addEventListener('click', () => navLinks.classList.remove('active')));
}

// =========================================================
// 3. CARROSSÉIS ARRASTÁVEIS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.carousel-viewport').forEach(viewport => {
        let isDown = false, startX, scrollLeft, isDragging = false, autoScrollInterval;
        const track = viewport.querySelector('.carousel-track.auto-scroll');
        if (track) track.innerHTML += track.innerHTML;

        function startAutoScroll() {
            if (!track) return;
            autoScrollInterval = setInterval(() => {
                viewport.scrollLeft += 1; 
                if (viewport.scrollLeft >= track.scrollWidth / 2) viewport.scrollLeft = 0;
            }, 20); 
        }
        function stopAutoScroll() { clearInterval(autoScrollInterval); }
        if (track) startAutoScroll();

        viewport.addEventListener('mousedown', (e) => {
            isDown = true; isDragging = false; 
            startX = e.pageX - viewport.offsetLeft; scrollLeft = viewport.scrollLeft; stopAutoScroll(); 
        });
        viewport.addEventListener('mouseleave', () => { isDown = false; if (track) startAutoScroll(); });
        viewport.addEventListener('mouseup', () => { isDown = false; if (track) startAutoScroll(); });
        viewport.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const walk = ((e.pageX - viewport.offsetLeft) - startX) * 2; 
            if (Math.abs(walk) > 5) isDragging = true;
            viewport.scrollLeft = scrollLeft - walk;
        });

        viewport.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (isDragging) { e.preventDefault(); e.stopPropagation(); }
            }, true);
        });
    });
});

// =========================================================
// 4. LÓGICA DE ABERTURA DOS MODAIS (Com o Grid Inteligente)
// =========================================================
function abrirGaleria(idProjeto) {
    const projeto = projetosGaleria[idProjeto];
    if(!projeto) return; 

    document.getElementById('galeria-titulo').innerText = projeto.titulo;
    const grid = document.getElementById('galeria-grid');
    grid.innerHTML = ''; 
    
    projeto.fotos.forEach(fotoInfo => {
        const nomeArquivo = fotoInfo[0];
        const colunas = fotoInfo[1]; // Puxa o número mágico (12, 6, 4)
        const urlCompleta = projeto.pasta + nomeArquivo;

        const img = document.createElement('img');
        img.src = urlCompleta;
        img.loading = "lazy";
        
        // Aplica o tamanho na hora usando o sistema de colunas
        img.style.gridColumn = `span ${colunas}`;

        img.onclick = () => abrirLightbox(urlCompleta);
        grid.appendChild(img);
    });

    document.getElementById('modal-galeria').classList.add('ativo');
    document.body.style.overflow = 'hidden'; 
}

function abrirLightbox(urlImagem) {
    document.getElementById('lightbox-img').src = urlImagem;
    document.getElementById('lightbox').classList.add('ativo');
}

function fecharLightbox() {
    document.getElementById('lightbox').classList.remove('ativo');
    setTimeout(() => { document.getElementById('lightbox-img').src = ''; }, 300);
}

function fecharModalDireto(idModal) {
    document.getElementById(idModal).classList.remove('ativo');
    document.body.style.overflow = 'auto'; 
    if (idModal === 'modal-app') setTimeout(() => { document.getElementById('iframe-app').src = ''; }, 400); 
}

function fecharModal(idModal, event) {
    if (event.target === document.getElementById(idModal)) fecharModalDireto(idModal);
}

function abrirAppFuncional(urlDoSite) {
    const iframeApp = document.getElementById('iframe-app');
    if(iframeApp) iframeApp.src = urlDoSite;
    document.getElementById('modal-app').classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

// Efeito Brilho do Mouse
const glow = document.getElementById('mouse-glow');
if (glow) {
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => glow.style.opacity = '0');
}


// =========================================================
// EFEITO PARALLAX NO SCROLL DA TELA INICIAL
// =========================================================
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (heroContent) {
        let scrollY = window.scrollY;
        
        // Conforme desce, a opacidade diminui (some em 600px de rolagem)
        let opacidade = 1 - (scrollY / 600); 
        
        // Faz o texto ir descendo um pouco (mais devagar que a rolagem)
        let movimentoY = scrollY * 0.4; 
        
        heroContent.style.opacity = opacidade > 0 ? opacidade : 0;
        heroContent.style.transform = `translateY(${movimentoY}px)`;
    }
});
