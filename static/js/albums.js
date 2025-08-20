document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            if (mainNav) mainNav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Album click handler
    const albumCards = document.querySelectorAll('.album-card');
    albumCards.forEach(card => {
        card.addEventListener('click', function() {
            const albumSlug = this.getAttribute('data-album');
            window.location.href = `/album/${albumSlug}`;
        });
    });
    
    // Animation on scroll for albums
    const animateAlbumsOnScroll = function() {
        const albums = document.querySelectorAll('.album-card');
        
        albums.forEach(album => {
            const albumPosition = album.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (albumPosition < screenPosition) {
                album.style.opacity = '1';
                album.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated albums
    const albumElements = document.querySelectorAll('.album-card');
    albumElements.forEach(album => {
        album.style.opacity = '0';
        album.style.transform = 'translateY(20px)';
        album.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateAlbumsOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateAlbumsOnScroll);
    
    // Image lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js';
        document.body.appendChild(script);
        
        script.onload = function() {
            const observer = lozad();
            observer.observe();
        };
    }
});