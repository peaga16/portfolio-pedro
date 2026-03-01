import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. SUAS CHAVES DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyB3lBK0OuQiwM5trQcP1iQrPqTUdCJGNgM",
  authDomain: "northdesignv2.firebaseapp.com",
  projectId: "northdesignv2",
  storageBucket: "northdesignv2.firebasestorage.app",
  messagingSenderId: "357871231893",
  appId: "1:357871231893:web:f44690a3e42cd2daa9cc9c",
  measurementId: "G-5HTYRY74VG"
};


// 2. DADOS DE SEGURANÇA (Para o site abrir instantaneamente)
let projetosGaleria = {
    'estilounico': {
        titulo: 'Loja de Roupas - Social Media',
        imagens: [
            { url: 'img/projetos/estilounico/1.png', formato: 'feed' },
            { url: 'img/projetos/estilounico/2.png', formato: 'feed' },
            { url: 'img/projetos/estilounico/3.png', formato: 'stories' },
            { url: 'img/projetos/estilounico/4.png', formato: 'stories' },
            { url: 'img/projetos/estilounico/5.png', formato: 'stories' },
            { url: 'img/projetos/estilounico/6.png', formato: 'carrossel' },
            { url: 'img/projetos/estilounico/7.png', formato: 'carrossel' },
            { url: 'img/projetos/estilounico/8.png', formato: 'carrossel' }
        ]
    }
};

// =================================================================
// 3. INICIALIZA O VISUAL PRIMEIRO (Resolve a Tela Preta)
// =================================================================

// Força os elementos a aparecerem na hora
setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
}, 100);

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) document.getElementById('navbar').classList.add('scrolled');
    else document.getElementById('navbar').classList.remove('scrolled');
    
    document.querySelectorAll('.reveal').forEach((reveal) => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) reveal.classList.add('active');
    });
});

// Máquina de Escrever
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

// =================================================================
// 4. FIREBASE EM SEGUNDO PLANO (Não trava o site)
// =================================================================
async function carregarProjetos() {
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "projetos"));
        
        if (!querySnapshot.empty) {
            projetosGaleria = {}; 
            querySnapshot.forEach((doc) => {
                projetosGaleria[doc.id] = doc.data(); 
            });
            console.log("Projetos carregados do Firebase com sucesso!");
        }
    } catch (error) {
        console.warn("Usando projetos locais. Erro no Firebase:", error);
    }
}
carregarProjetos(); // Chama sem travar a tela

// =================================================================
// 5. LÓGICA DE MODAIS E CARROSSEL
// =================================================================

window.abrirGaleria = function(idProjeto) {
    const projeto = projetosGaleria[idProjeto];
    if(!projeto) return; 

    document.getElementById('galeria-titulo').innerText = projeto.titulo;
    const grid = document.getElementById('galeria-grid');
    grid.innerHTML = ''; 
    
    projeto.imagens.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData.url;
        img.loading = "lazy";
        
        if (imgData.formato === 'carrossel') img.className = 'item-carrossel';
        else if (imgData.formato === 'stories') img.className = 'item-stories';
        else img.className = 'item-feed';

        img.onclick = () => window.abrirLightbox(imgData.url);
        grid.appendChild(img);
    });

    document.getElementById('modal-galeria').classList.add('ativo');
    document.body.style.overflow = 'hidden'; 
};

window.abrirLightbox = function(urlImagem) {
    document.getElementById('lightbox-img').src = urlImagem;
    document.getElementById('lightbox').classList.add('ativo');
};
window.fecharLightbox = function() {
    document.getElementById('lightbox').classList.remove('ativo');
    setTimeout(() => { document.getElementById('lightbox-img').src = ''; }, 300);
};
window.fecharModalDireto = function(idModal) {
    document.getElementById(idModal).classList.remove('ativo');
    document.body.style.overflow = 'auto'; 
};
window.fecharModal = function(idModal, event) {
    if (event.target === document.getElementById(idModal)) window.fecharModalDireto(idModal);
};
window.abrirAppFuncional = function(urlDoSite) {
    document.getElementById('iframe-app').src = urlDoSite;
    document.getElementById('modal-app').classList.add('ativo');
    document.body.style.overflow = 'hidden';
};

// Motor do Carrossel Arrastável
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
            card.addEventListener('click', (e) => { if (isDragging) { e.preventDefault(); e.stopPropagation(); } }, true);
        });
    });
});