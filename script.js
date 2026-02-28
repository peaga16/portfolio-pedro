// --- NAVBAR & ANIMAÇÕES BÁSICAS ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) reveal.classList.add('active');
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// --- MÁQUINA DE ESCREVER (Apenas na Home) ---
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
    document.addEventListener("DOMContentLoaded", () => { setTimeout(typeEffect, 1000); });
}

// --- MENU MOBILE ---
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(item => item.addEventListener('click', () => navLinks.classList.remove('active')));

// --- BANCO DE DADOS (SEUS PROJETOS REAIS) ---
const projetosGaleria = {
    'estilounico': {
        titulo: 'Estilo Único - Identidade Visual',
        imagens: [
            { url: 'img/projetos/estilounico/1.png', formato: 'retrato' },
            { url: 'img/projetos/estilounico/2.png', formato: 'retrato' },
            { url: 'img/projetos/estilounico/3.png', formato: 'retrato' },
            { url: 'img/projetos/estilounico/4.png', formato: 'retrato' },
            { url: 'img/projetos/estilounico/5.png', formato: 'retrato' },
            { url: 'img/projetos/estilounico/6.png', formato: 'retrato' },
            { url: 'img/projetos/estilounico/7.png', formato: 'carrossel' },
            { url: 'img/projetos/estilounico/8.png', formato: 'carrossel' }
        ]
    }
};

// --- MOTOR DE DRAG & AUTO-SCROLL (Apenas onde tem carrossel) ---
document.addEventListener("DOMContentLoaded", () => {
    const viewports = document.querySelectorAll('.carousel-viewport');
    
    if(viewports.length > 0) {
        viewports.forEach(viewport => {
            let isDown = false;
            let startX;
            let scrollLeft;
            let isDragging = false;
            let autoScrollInterval;
            
            const track = viewport.querySelector('.carousel-track.auto-scroll');
            if (track) { track.innerHTML += track.innerHTML; }

            function startAutoScroll() {
                if (!track) return;
                autoScrollInterval = setInterval(() => {
                    viewport.scrollLeft += 1; 
                    if (viewport.scrollLeft >= track.scrollWidth / 2) { viewport.scrollLeft = 0; }
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
                const x = e.pageX - viewport.offsetLeft;
                const walk = (x - startX) * 2; 
                if (Math.abs(walk) > 5) { isDragging = true; }
                viewport.scrollLeft = scrollLeft - walk;
            });
            viewport.addEventListener('touchstart', () => { stopAutoScroll(); isDragging = false; });
            viewport.addEventListener('touchend', () => { if (track) startAutoScroll(); });
            viewport.addEventListener('touchmove', () => { isDragging = true; });

            viewport.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (isDragging) { e.preventDefault(); e.stopPropagation(); }
                }, true);
            });
        });
    }
});

// --- SISTEMA DE MODAIS (BEHANCE E IFRAME) ---
function abrirGaleria(idProjeto) {
    const projeto = projetosGaleria[idProjeto];
    if(!projeto) return; 

    document.getElementById('galeria-titulo').innerText = projeto.titulo;
    const grid = document.getElementById('galeria-grid');
    if(!grid) return;
    
    grid.innerHTML = ''; 
    
    projeto.imagens.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData.url;
        img.loading = "lazy";
        
        if (imgData.formato === 'carrossel') img.className = 'item-carrossel';
        else if (imgData.formato === 'stories') img.className = 'item-stories';
        else img.className = 'item-retrato';

        img.onclick = () => abrirLightbox(imgData.url);
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

function abrirAppFuncional(urlDoSite) {
    const iframe = document.getElementById('iframe-app');
    if(iframe) iframe.src = urlDoSite;
    document.getElementById('modal-app').classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

function fecharModalDireto(idModal) {
    document.getElementById(idModal).classList.remove('ativo');
    document.body.style.overflow = 'auto'; 
    if (idModal === 'modal-app') setTimeout(() => { 
        const iframe = document.getElementById('iframe-app');
        if(iframe) iframe.src = ''; 
    }, 400); 
}

function fecharModal(idModal, event) {
    const modal = document.getElementById(idModal);
    if (event.target === modal) fecharModalDireto(idModal);
}