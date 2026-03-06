// =========================================================
// 1. SEU BANCO DE DADOS LOCAL (Sistema de 12 Colunas)
// =========================================================
const projetosGaleria = {
    'estilounico': {
        titulo: 'Loja de Roupas - Social Media',
        pasta: 'img/projetos/estilounico/', 
        fotos: [
            // 6 = Metade (2 por linha)
            // 4 = Um terço (3 por linha)
            // 12 = Tela cheia
            ['1.png', 6], 
            ['2.png', 6], 
            ['3.png', 4],
            ['4.png', 4],
            ['5.png', 4],
            ['6.png', 12],
            ['7.png', 12]
        ]
    },
    'lojasuplementos': {
        titulo: 'Loja de Suplementos - Social Media',
        pasta: 'img/projetos/lojasuplementos/',
        fotos: [
            ['1.png', 4],
            ['2.jpg', 4],
            ['3.png', 4], 
            ['4.png', 4],
            ['5.png', 4],
            ['6.png', 4],
            ['7.jpg', 4],
            ['8.png', 4],
            ['9.png', 4]
        ]
    },
    'estetica': {
        titulo: 'Estética - Social Media',
        pasta: 'img/projetos/estetica/',
        fotos: [
            ['1.png', 6],
            ['2.png', 6],
            ['3.png', 6], 
            ['4.png', 6],
            ['5.png', 12],
            ['6.png', 12]
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