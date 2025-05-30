document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to team members
  const animateTeamMembers = () => {
    const members = document.querySelectorAll('.member');
    
    members.forEach((member, index) => {
      member.style.opacity = '0';
      member.style.transform = 'translateY(20px)';
      member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        member.style.opacity = '1';
        member.style.transform = 'translateY(0)';
      }, index * 100);
    });
  };

  // Add smooth scroll to button
  const setupButton = () => {
    const button = document.querySelector('.button');
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('header');
      target.scrollIntoView({ behavior: 'smooth' });
    });
  };

  // Initialize animations
  const init = () => {
    animateTeamMembers();
    setupButton();
  };

  // Run initialization
  init();
});
