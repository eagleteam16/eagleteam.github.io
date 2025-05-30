// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Initialize scroll reveal effect
function initScrollReveal() {
    // Select all elements with reveal class
    const reveals = document.querySelectorAll('.reveal');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each reveal element
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Add animation to gallery images when they come into view
function animateGallery() {
    const galleryItems = document.querySelectorAll('.gallery img');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transform = 'translateY(30px)';
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Call the gallery animation function after page load
window.addEventListener('load', animateGallery);
