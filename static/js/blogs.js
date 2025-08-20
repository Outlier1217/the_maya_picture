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
    
    // Animation on scroll for blog cards
    const animateBlogCards = function() {
        const cards = document.querySelectorAll('.blog-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateBlogCards();
    
    // Then run on scroll
    window.addEventListener('scroll', animateBlogCards);
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            // Here you would typically send the email to your server
            alert('Thank you for subscribing!');
            emailInput.value = '';
        });
    }
    
    // Image lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.src) {
                console.log('Loading image:', img.src);
            } else {
                console.warn('Image src is empty for:', img);
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        console.log('Using lozad fallback for lazy loading');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js';
        document.body.appendChild(script);
        
        script.onload = function() {
            const observer = lozad();
            observer.observe();
        };
    }
});