// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Add active class to navigation links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  function highlightNavLink() {
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  
  // Animation on scroll
  const fadeInElements = document.querySelectorAll('.fade-in');
  const slideUpElements = document.querySelectorAll('.slide-up');
  
  function checkElementVisibility() {
    const triggerPosition = window.innerHeight * 0.85;
    
    fadeInElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < triggerPosition) {
        element.classList.add('visible');
      }
    });
    
    slideUpElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < triggerPosition) {
        element.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkElementVisibility);
  window.addEventListener('load', checkElementVisibility);
  
  // Portfolio filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-category');
      
      portfolioItems.forEach(item => {
        if (filterValue === '*' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Form validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const formElements = contactForm.elements;
      
      // Check required fields
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
          isValid = false;
          formElements[i].classList.add('error');
        } else {
          formElements[i].classList.remove('error');
        }
      }
      
      // Check email format
      const emailField = document.getElementById('email');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
        }
      }
      
      if (!isValid) {
        alert('Please fill out all required fields correctly.');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Add animation classes to elements
  function addAnimationClasses() {
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.section-subtitle').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.about-image').forEach(el => el.classList.add('slide-up'));
    document.querySelectorAll('.about-content').forEach(el => el.classList.add('slide-up'));
    document.querySelectorAll('.skill-item').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.portfolio-item').forEach(el => el.classList.add('slide-up'));
    document.querySelectorAll('.testimonial-item').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.contact-info').forEach(el => el.classList.add('slide-up'));
    document.querySelectorAll('.contact-form').forEach(el => el.classList.add('slide-up'));
  }
  
  // Call the function to add animation classes
  addAnimationClasses();
  
  // Initialize testimonials slider if needed
  // This is a placeholder for a slider implementation
  // You might want to use a library like Swiper.js for this
  function initTestimonialsSlider() {
    // Slider initialization code would go here
    console.log('Testimonials slider initialized');
  }
  
  // Call slider initialization
  // initTestimonialsSlider();
});
