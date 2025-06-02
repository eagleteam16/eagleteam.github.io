// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    initScrollReveal();
    animateStats();
    initNavbar();
    initMobileMenu();
    
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
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
});

// Initialize navbar scroll behavior
function initNavbar() {
    const navbar = document.querySelector('.main-nav');
    let lastScroll = 0;
    const scrollThreshold = 5; // 滾動多少像素後觸發隱藏/顯示
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 向下滾動超過閾值時隱藏導航欄
        if (currentScroll > lastScroll + scrollThreshold && currentScroll > 100) {
            navbar.classList.add('hidden');
        } 
        // 向上滾動時顯示導航欄
        else if (currentScroll < lastScroll - scrollThreshold) {
            navbar.classList.remove('hidden');
        }
        
        // 在頁面頂部時總是顯示導航欄
        if (currentScroll < 100) {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

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

function animateStats() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        let count = 0;

        const updateCount = () => {
            const increment = Math.ceil(target / 60);
            count += increment;
            if (count < target) {
                counter.innerText = count;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}


// Call the gallery animation function after page load
window.addEventListener('load', animateGallery);
