document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formMessage = document.getElementById('form-message');
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side validation
            if (!name || !email || !subject || !message) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all fields.';
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            // Prepare form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                formMessage.style.display = 'block';
                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = result.message;
                    contactForm.reset();
                } else {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = result.error;
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'An error occurred while submitting the form.';
            }
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.contact-info, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
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