// sciNeurotech Lab - Main JavaScript

// Language switching functionality
function setLanguage(lang) {
  // Store preference in localStorage
  localStorage.setItem('sciNeurotech-lang', lang);

  // Update button states
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');

  // Update all translatable elements
  document.querySelectorAll('[data-en][data-fr]').forEach(element => {
    const text = element.getAttribute(`data-${lang}`);
    if (text) {
      // Check if element has child elements that should be preserved
      if (element.children.length === 0) {
        element.textContent = text;
      } else {
        // For elements with HTML content (like <br> tags), use innerHTML
        element.innerHTML = text;
      }
    }
  });

  // Update language-specific images
  document.querySelectorAll('[data-en-src][data-fr-src]').forEach(img => {
    const src = img.getAttribute(`data-${lang}-src`);
    if (src) {
      img.src = src;
    }
  });

  // Update document language attribute
  document.documentElement.lang = lang;
}

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.getElementById('nav-menu');
  const toggle = document.querySelector('.menu-toggle');

  if (menu && toggle && !menu.contains(event.target) && !toggle.contains(event.target)) {
    menu.classList.remove('active');
  }
});

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('#nav-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      const menu = document.getElementById('nav-menu');
      if (window.innerWidth <= 768) {
        menu.classList.remove('active');
      }
    });
  });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check for stored language preference
  const storedLang = localStorage.getItem('sciNeurotech-lang');

  // Check browser language if no stored preference
  const browserLang = navigator.language || navigator.userLanguage;
  const isFrench = browserLang.startsWith('fr');

  // Set initial language
  const initialLang = storedLang || (isFrench ? 'fr' : 'en');
  setLanguage(initialLang);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Dropdown menu keyboard accessibility
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const link = dropdown.querySelector('a');
  const menu = dropdown.querySelector('.dropdown-menu');

  if (link && menu) {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (!menu.parentElement.contains(e.target)) {
      menu.style.display = '';
    }
  });
});

// Photo Gallery functionality
function changeGalleryImage(src, thumbElement) {
  // Update main image
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) {
    mainImg.src = src;
  }

  // Update active thumbnail
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.classList.remove('active');
  });
  if (thumbElement) {
    thumbElement.classList.add('active');
  }
}
