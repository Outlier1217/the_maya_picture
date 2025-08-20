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
    
    // Lightbox functionality
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('.gallery-img');
        return img ? img.src : '';
    }).filter(src => src); // Filter out empty sources
    
    // Open lightbox when clicking on gallery image
    galleryItems.forEach((item, index) => {
        const viewBtn = item.querySelector('.view-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightbox(index);
            });
        }
        
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        if (images.length === 0) return; // Prevent opening if no images
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
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal && lightboxModal.style.display === 'block') {
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
            } else {
                item.style.opacity = '0'; // Reset if out of viewport
                item.style.transform = 'translateY(20px)';
            }
        });
    };
    
    // Set initial state for animated gallery items
    const galleryElements = document.querySelectorAll('.gallery-item');
    galleryElements.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation after a slight delay to ensure images are loaded
    setTimeout(animateGalleryOnScroll, 100);
    
    // Run on scroll
    window.addEventListener('scroll', animateGalleryOnScroll);
    
    // Ensure images are loaded for lazy loading
    const imagesToLoad = document.querySelectorAll('img[loading="lazy"]');
    imagesToLoad.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
});