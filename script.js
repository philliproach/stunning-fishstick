/**
 * Main JavaScript for Phillip Roach's Personal Website
 * Author: Phillip Roach
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load data from JSON file
    loadData();
    
    // Initialize navigation menu
    initNavigation();
    
    // Initialize sticky header
    initStickyHeader();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize portfolio filter
    initPortfolioFilter();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Add fade-in animation to elements when they become visible
    initScrollAnimations();
});

/**
 * Load data from JSON file and populate the website
 */
function loadData() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            // Populate personal information
            populatePersonalInfo(data.personalInfo);
            
            // Populate skills
            populateSkills(data.skills);
            
            // Populate services
            populateServices(data.services);
            
            // Populate portfolio
            populatePortfolio(data.portfolio);
            
            // Populate testimonials
            populateTestimonials(data.testimonials);
            
            // Populate blog posts
            populateBlogPosts(data.blogPosts);
        })
        .catch(error => console.error('Error loading data:', error));
}

/**
 * Populate personal information across the website
 */
function populatePersonalInfo(info) {
    // Update name
    document.querySelectorAll('#name, #full-name').forEach(element => {
        element.textContent = info.name;
    });
    
    // Update profession
    if (document.getElementById('profession')) {
        document.getElementById('profession').textContent = info.profession;
    }
    
    // Update short bio
    if (document.getElementById('short-bio')) {
        document.getElementById('short-bio').textContent = info.shortBio;
    }
    
    // Update about description
    if (document.getElementById('about-description')) {
        document.getElementById('about-description').textContent = info.aboutDescription;
    }
    
    // Update about title
    if (document.getElementById('about-title')) {
        document.getElementById('about-title').textContent = info.aboutTitle;
    }
    
    // Update contact info
    document.querySelectorAll('#email, #contact-email').forEach(element => {
        element.textContent = info.email;
    });
    
    document.querySelectorAll('#phone, #contact-phone').forEach(element => {
        element.textContent = info.phone;
    });
    
    document.querySelectorAll('#location, #contact-address').forEach(element => {
        element.textContent = info.location;
    });
    
    if (document.getElementById('contact-website')) {
        document.getElementById('contact-website').textContent = info.website;
    }
    
    // Update social links
    const socialLinks = document.querySelectorAll('.social-icon');
    if (socialLinks.length && info.socialLinks) {
        for (let i = 0; i < socialLinks.length && i < info.socialLinks.length; i++) {
            socialLinks[i].href = info.socialLinks[i].url;
        }
    }
}

/**
 * Populate skills section
 */
function populateSkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-name">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        `;
        
        skillsContainer.appendChild(skillItem);
    });
}

/**
 * Populate services section
 */
function populateServices(services) {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;
    
    servicesContainer.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        
        servicesContainer.appendChild(serviceCard);
    });
}

/**
 * Populate portfolio section
 */
function populatePortfolio(portfolio) {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (!portfolioContainer) return;
    
    portfolioContainer.innerHTML = '';
    
    portfolio.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.dataset.category = item.category;
        
        portfolioItem.innerHTML = `
            <div class="portfolio-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-links">
                    <a href="${item.demoLink}" class="portfolio-link" target="_blank">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="${item.codeLink}" class="portfolio-link" target="_blank">
                        <i class="fas fa-code"></i>
                    </a>
                </div>
            </div>
        `;
        
        portfolioContainer.appendChild(portfolioItem);
    });
}

/**
 * Populate testimonials section
 */
function populateTestimonials(testimonials) {
    const testimonialContainer = document.getElementById('testimonial-container');
    const dotsContainer = document.querySelector('.testimonial-dots');
    if (!testimonialContainer || !dotsContainer) return;
    
    testimonialContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
        
        testimonialItem.innerHTML = `
            <div class="testimonial-img">
                <img src="${testimonial.image}" alt="${testimonial.name}">
            </div>
            <div class="testimonial-text">
                <i class="fas fa-quote-left"></i>${testimonial.text}
            </div>
            <div class="testimonial-author">
                <h4>${testimonial.name}</h4>
                <p>${testimonial.position}</p>
            </div>
        `;
        
        testimonialContainer.appendChild(testimonialItem);
        
        // Create dot for this testimonial
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        
        dot.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index);
            showTestimonial(idx);
        });
        
        dotsContainer.appendChild(dot);
    });
}

/**
 * Populate blog posts section
 */
function populateBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = '';
    
    // Get only the latest 3 posts
    const latestPosts = posts.slice(0, 3);
    
    latestPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        
        // Format date
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        blogCard.innerHTML = `
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-date">${formattedDate}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-preview">${post.preview}</p>
                <a href="blog-single.html?id=${post.id}" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        blogContainer.appendChild(blogCard);
    });
}

/**
 * Initialize navigation menu for mobile devices
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Initialize sticky header
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;
    
    // Auto slide testimonials every 5 seconds
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

/**
 * Show testimonial at the given index
 */
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    testimonials.forEach(item => {
        item.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

/**
 * Initialize portfolio filter
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter portfolio items
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <h3>Thank you for your message!</h3>
                <p>I'll get back to you as soon as possible.</p>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Log form data to console (for demo purposes)
            console.log('Form submitted:', formObject);
        });
    }
}

/**
 * Initialize dark mode toggle
 */
function initDarkModeToggle() {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check if dark mode is saved in local storage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if needed
    if (savedDarkMode || prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Add dark mode toggle to the header if it exists
    const navbar = document.querySelector('.nav-menu');
    
    if (navbar) {
        const darkModeToggle = document.createElement('li');
        darkModeToggle.className = 'dark-mode-toggle';
        
        darkModeToggle.innerHTML = `
            <a href="#" id="dark-mode-btn">
                <i class="fas ${document.body.classList.contains('dark-mode') ? 'fa-sun' : 'fa-moon'}"></i>
            </a>
        `;
        
        navbar.appendChild(darkModeToggle);
        
        // Add event listener to toggle dark mode
        const darkModeBtn = document.getElementById('dark-mode-btn');
        
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Toggle dark mode
                document.body.classList.toggle('dark-mode');
                
                // Update icon
                const icon = this.querySelector('i');
                if (document.body.classList.contains('dark-mode')) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
                
                // Save preference to local storage
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
        }
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .service-card, .about-content, .portfolio-item, .blog-card, .contact-card, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}
