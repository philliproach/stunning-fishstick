// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the data.json file
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      // Apply the data to the website
      populateSiteInfo(data.siteInfo);
      populateNavigation(data.navigation);
      populateHeroSection(data.heroSection);
      populateAboutSection(data.aboutSection);
      populateSkillsSection(data.skillsSection);
      populatePortfolioSection(data.portfolioSection);
      populateTestimonialsSection(data.testimonialsSection);
      populateContactSection(data.contactSection);
      populateFooter(data.footer);
    })
    .catch(error => console.error('Error loading data:', error));
});

// Populate site info (title, favicon, etc.)
function populateSiteInfo(siteInfo) {
  document.title = siteInfo.title;
  // Set favicon if it exists
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = siteInfo.favicon;
  }
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = siteInfo.description;
  }
}

// Populate navigation menu
function populateNavigation(navItems) {
  const navList = document.querySelector('nav ul');
  if (!navList) return;
  
  navList.innerHTML = '';
  navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.link;
    a.textContent = item.text;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

// Populate hero section
function populateHeroSection(heroData) {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;
  
  // Update greeting, name, title, and description
  const greeting = heroSection.querySelector('.greeting');
  if (greeting) greeting.textContent = heroData.greeting;
  
  const name = heroSection.querySelector('.name');
  if (name) name.textContent = heroData.name;
  
  const title = heroSection.querySelector('.title');
  if (title) title.textContent = heroData.title;
  
  const description = heroSection.querySelector('.description');
  if (description) description.textContent = heroData.description;
  
  // Update CTA button
  const ctaButton = heroSection.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.textContent = heroData.ctaButton.text;
    ctaButton.href = heroData.ctaButton.link;
  }
  
  // Update contact button
  const contactButton = heroSection.querySelector('.contact-button');
  if (contactButton) {
    contactButton.textContent = heroData.contactButton.text;
    contactButton.href = heroData.contactButton.link;
  }
  
  // Update profile image
  const profileImage = heroSection.querySelector('.profile-image img');
  if (profileImage && heroData.profileImage) {
    profileImage.src = heroData.profileImage;
    profileImage.alt = heroData.name;
  }
}

// Populate about section
function populateAboutSection(aboutData) {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  
  // Update title
  const title = aboutSection.querySelector('.section-title');
  if (title) title.textContent = aboutData.title;
  
  // Update paragraphs
  const contentDiv = aboutSection.querySelector('.about-content');
  if (contentDiv) {
    const paragraphs = contentDiv.querySelectorAll('p');
    aboutData.paragraphs.forEach((text, index) => {
      if (paragraphs[index]) {
        paragraphs[index].textContent = text;
      } else {
        const newP = document.createElement('p');
        newP.textContent = text;
        contentDiv.appendChild(newP);
      }
    });
  }
  
  // Update image
  const aboutImage = aboutSection.querySelector('.about-image img');
  if (aboutImage && aboutData.image) {
    aboutImage.src = aboutData.image;
    aboutImage.alt = "About Me";
  }
  
  // Update stats
  const statsContainer = aboutSection.querySelector('.stats-container');
  if (statsContainer && aboutData.stats) {
    statsContainer.innerHTML = '';
    aboutData.stats.forEach(stat => {
      const statDiv = document.createElement('div');
      statDiv.className = 'stat-item';
      
      const value = document.createElement('h3');
      value.textContent = stat.value;
      
      const label = document.createElement('p');
      label.textContent = stat.label;
      
      statDiv.appendChild(value);
      statDiv.appendChild(label);
      statsContainer.appendChild(statDiv);
    });
  }
}

// Populate skills section
function populateSkillsSection(skillsData) {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  // Update title and subtitle
  const title = skillsSection.querySelector('.section-title');
  if (title) title.textContent = skillsData.title;
  
  const subtitle = skillsSection.querySelector('.section-subtitle');
  if (subtitle) subtitle.textContent = skillsData.subtitle;
  
  // Update skills
  const skillsContainer = skillsSection.querySelector('.skills-container');
  if (skillsContainer && skillsData.skills) {
    skillsContainer.innerHTML = '';
    skillsData.skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      
      const skillInfo = document.createElement('div');
      skillInfo.className = 'skill-info';
      
      const nameSpan = document.createElement('span');
      nameSpan.className = 'skill-name';
      nameSpan.textContent = skill.name;
      
      const percentageSpan = document.createElement('span');
      percentageSpan.className = 'skill-percentage';
      percentageSpan.textContent = `${skill.percentage}%`;
      
      skillInfo.appendChild(nameSpan);
      skillInfo.appendChild(percentageSpan);
      
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      
      const progress = document.createElement('div');
      progress.className = 'progress';
      progress.style.width = `${skill.percentage}%`;
      
      // Add icon if available
      if (skill.icon) {
        const icon = document.createElement('i');
        icon.className = skill.icon;
        skillItem.appendChild(icon);
      }
      
      progressBar.appendChild(progress);
      skillItem.appendChild(skillInfo);
      skillItem.appendChild(progressBar);
      skillsContainer.appendChild(skillItem);
    });
  }
}

// Populate portfolio section
function populatePortfolioSection(portfolioData) {
  const portfolioSection = document.getElementById('portfolio');
  if (!portfolioSection) return;
  
  // Update title and subtitle
  const title = portfolioSection.querySelector('.section-title');
  if (title) title.textContent = portfolioData.title;
  
  const subtitle = portfolioSection.querySelector('.section-subtitle');
  if (subtitle) subtitle.textContent = portfolioData.subtitle;
  
  // Update filter categories
  const filterContainer = portfolioSection.querySelector('.portfolio-filter');
  if (filterContainer && portfolioData.categories) {
    filterContainer.innerHTML = '';
    portfolioData.categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'filter-btn';
      button.setAttribute('data-category', category === 'All' ? '*' : category);
      button.textContent = category;
      if (category === 'All') button.classList.add('active');
      filterContainer.appendChild(button);
    });
    
    // Add event listeners to filter buttons
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        filterPortfolioItems(category);
      });
    });
  }
  
  // Update portfolio items
  const portfolioContainer = portfolioSection.querySelector('.portfolio-container');
  if (portfolioContainer && portfolioData.projects) {
    portfolioContainer.innerHTML = '';
    portfolioData.projects.forEach(project => {
      const portfolioItem = document.createElement('div');
      portfolioItem.className = 'portfolio-item';
      portfolioItem.setAttribute('data-category', project.category);
      
      const portfolioImg = document.createElement('div');
      portfolioImg.className = 'portfolio-img';
      
      const img = document.createElement('img');
      img.src = project.image;
      img.alt = project.title;
      
      const overlay = document.createElement('div');
      overlay.className = 'portfolio-overlay';
      
      const overlayContent = document.createElement('div');
      overlayContent.className = 'overlay-content';
      
      const projectTitle = document.createElement('h3');
      projectTitle.textContent = project.title;
      
      const projectCategory = document.createElement('p');
      projectCategory.textContent = project.category;
      
      const projectLinks = document.createElement('div');
      projectLinks.className = 'project-links';
      
      if (project.link) {
        const demoLink = document.createElement('a');
        demoLink.href = project.link;
        demoLink.target = '_blank';
        demoLink.innerHTML = '<i class="fas fa-link"></i>';
        projectLinks.appendChild(demoLink);
      }
      
      if (project.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.github;
        githubLink.target = '_blank';
        githubLink.innerHTML = '<i class="fab fa-github"></i>';
        projectLinks.appendChild(githubLink);
      }
      
      overlayContent.appendChild(projectTitle);
      overlayContent.appendChild(projectCategory);
      overlayContent.appendChild(projectLinks);
      overlay.appendChild(overlayContent);
      portfolioImg.appendChild(img);
      portfolioImg.appendChild(overlay);
      portfolioItem.appendChild(portfolioImg);
      portfolioContainer.appendChild(portfolioItem);
    });
  }
  
  // Function to filter portfolio items
  function filterPortfolioItems(category) {
    const items = portfolioContainer.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      if (category === '*' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// Populate testimonials section
function populateTestimonialsSection(testimonialsData) {
  const testimonialsSection = document.querySelector('.testimonials-section');
  if (!testimonialsSection) return;
  
  // Update title and subtitle
  const title = testimonialsSection.querySelector('.section-title');
  if (title) title.textContent = testimonialsData.title;
  
  const subtitle = testimonialsSection.querySelector('.section-subtitle');
  if (subtitle) subtitle.textContent = testimonialsData.subtitle;
  
  // Update testimonials
  const testimonialsContainer = testimonialsSection.querySelector('.testimonials-container');
  if (testimonialsContainer && testimonialsData.testimonials) {
    testimonialsContainer.innerHTML = '';
    testimonialsData.testimonials.forEach(testimonial => {
      const testimonialItem = document.createElement('div');
      testimonialItem.className = 'testimonial-item';
      
      const quote = document.createElement('p');
      quote.className = 'testimonial-text';
      quote.textContent = testimonial.text;
      
      const authorInfo = document.createElement('div');
      authorInfo.className = 'testimonial-author';
      
      if (testimonial.image) {
        const authorImg = document.createElement('img');
        authorImg.src = testimonial.image;
        authorImg.alt = testimonial.author;
        authorInfo.appendChild(authorImg);
      }
      
      const authorDetails = document.createElement('div');
      authorDetails.className = 'author-details';
      
      const authorName = document.createElement('h4');
      authorName.textContent = testimonial.author;
      
      const authorPosition = document.createElement('p');
      authorPosition.textContent = testimonial.position;
      
      authorDetails.appendChild(authorName);
      authorDetails.appendChild(authorPosition);
      authorInfo.appendChild(authorDetails);
      
      testimonialItem.appendChild(quote);
      testimonialItem.appendChild(authorInfo);
      testimonialsContainer.appendChild(testimonialItem);
    });
  }
}

// Populate contact section
function populateContactSection(contactData) {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  // Update title and subtitle
  const title = contactSection.querySelector('.section-title');
  if (title) title.textContent = contactData.title;
  
  const subtitle = contactSection.querySelector('.section-subtitle');
  if (subtitle) subtitle.textContent = contactData.subtitle;
  
  const description = contactSection.querySelector('.contact-description');
  if (description) description.textContent = contactData.description;
  
  // Update contact info
  const contactInfo = contactSection.querySelector('.contact-info');
  if (contactInfo) {
    const emailEl = contactInfo.querySelector('.email-info .info-text');
    if (emailEl) emailEl.textContent = contactData.email;
    
    const phoneEl = contactInfo.querySelector('.phone-info .info-text');
    if (phoneEl) phoneEl.textContent = contactData.phone;
    
    const locationEl = contactInfo.querySelector('.location-info .info-text');
    if (locationEl) locationEl.textContent = contactData.location;
  }
  
  // Update social media links
  const socialLinks = contactSection.querySelector('.social-links');
  if (socialLinks && contactData.socialMedia) {
    socialLinks.innerHTML = '';
    contactData.socialMedia.forEach(social => {
      const link = document.createElement('a');
      link.href = social.link;
      link.target = '_blank';
      link.setAttribute('aria-label', social.platform);
      
      const icon = document.createElement('i');
      icon.className = social.icon;
      
      link.appendChild(icon);
      socialLinks.appendChild(link);
    });
  }
  
  // Update contact form
  const contactForm = contactSection.querySelector('form');
  if (contactForm && contactData.formFields) {
    const formContent = contactForm.querySelector('.form-content');
    if (formContent) {
      formContent.innerHTML = '';
      contactData.formFields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;
        
        let input;
        if (field.type === 'textarea') {
          input = document.createElement('textarea');
          input.rows = 5;
        } else {
          input = document.createElement('input');
          input.type = field.type;
        }
        
        input.id = field.id;
        input.name = field.id;
        input.placeholder = field.placeholder;
        if (field.required) input.required = true;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        formContent.appendChild(formGroup);
      });
    }
    
    // Update submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton && contactData.formSubmitButton) {
      submitButton.textContent = contactData.formSubmitButton;
    }
  }
}

// Populate footer
function populateFooter(footerData) {
  const footer = document.querySelector('footer');
  if (!footer) return;
  
  // Update copyright
  const copyright = footer.querySelector('.copyright');
  if (copyright) copyright.textContent = footerData.copyright;
  
  // Update footer links
  const footerLinks = footer.querySelector('.footer-links');
  if (footerLinks && footerData.links) {
    footerLinks.innerHTML = '';
    footerData.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.link;
      a.textContent = link.text;
      footerLinks.appendChild(a);
    });
  }
}
