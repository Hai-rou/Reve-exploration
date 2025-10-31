// Script pour gérer l'effet sticky du header et les interactions
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav a');
    
    // Effet sticky au scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Optionnel : Cacher le header au scroll vers le bas, montrer au scroll vers le haut
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Menu burger pour mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Fermer le menu mobile en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Gestion des liens actifs
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === '/') ||
            (currentPage === 'index.html' && linkPage === '/')) {
            link.classList.add('active');
        }
    });
    
    // Effet de particules sur le logo (optionnel)
    const logo = document.querySelector('h1');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            // Ajouter des particules ou effets visuels ici si souhaité
        });
    }
});

// Empêcher le scroll du body quand le menu mobile est ouvert
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});