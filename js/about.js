document.addEventListener('DOMContentLoaded', function() {
  // Animate numbers in stats
  const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateNumber = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target.toLocaleString();
        }
      };
      
      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateNumber();
          observer.unobserve(stat);
        }
      }, { threshold: 0.5 });
      
      observer.observe(stat);
    });
  };

  // Animate team members on scroll
  const animateTeamMembers = () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200); // Stagger the animation
        }
      });
    }, { threshold: 0.2 });
    
    teamMembers.forEach(member => observer.observe(member));
  };

  // Back to top button
  const setupBackToTop = () => {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // Initialize all animations
  const init = () => {
    animateNumbers();
    animateTeamMembers();
    setupBackToTop();
  };

  // Run initialization
  init();
});
