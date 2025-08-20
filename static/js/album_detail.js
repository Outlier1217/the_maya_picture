document.addEventListener('DOMContentLoaded', function() {
    // Debugging: Log when script loads
    console.log('album_detail.js loaded');

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
    
    // Lightbox functionality
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const src = item.querySelector('.view-btn').getAttribute('data-src');
        console.log('Gallery item src:', src); // Debug image sources
        return src;
    });
    
    // Open lightbox when clicking on gallery image or view button
    galleryItems.forEach((item, index) => {
        const viewBtn = item.querySelector('.view-btn');
        
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(index);
        });
        
        item.addEventListener('click', function(e) {
            if (e.target !== viewBtn) {
                openLightbox(index);
            }
        });
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = images[currentImageIndex];
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex];
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex];
    }
    
    // Close lightbox when clicking close button or outside image
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // Animation on scroll for gallery items
    const animateGalleryOnScroll = function() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.visibility = 'visible'; // Ensure visibility
            }
        });
    };
    
    // Set initial state for animated gallery items
    const galleryElements = document.querySelectorAll('.gallery-item');
    console.log('Gallery items found:', galleryElements.length); // Debug item count
    galleryElements.forEach(item => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.display = 'block'; // Ensure display
        item.style.visibility = 'visible'; // Ensure visibility
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (itemPosition >= screenPosition) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        } else {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
    
    // Run once on load
    animateGalleryOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateGalleryOnScroll);
    
    // Image lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        console.log('Lazy loading images found:', images.length); // Debug image count
        images.forEach(img => {
            if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
                console.log('Lazy loaded:', img.dataset.src);
            }
            // Ensure image is visible
            img.style.opacity = '1';
            img.style.visibility = 'visible';
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

    // Handle image load errors
    window.handleImageError = function(img) {
        console.error('Failed to load image:', img.dataset.src || img.src);
        img.src = '/static/images/placeholder.jpg'; // Fallback placeholder
    };
});