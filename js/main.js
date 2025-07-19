// Main JavaScript for Cyberpunk Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize portfolio filtering
    initPortfolioFilter();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize glitch effects
    initGlitchEffects();
});

// Loading Screen
function initLoadingScreen() {
    // Create loading screen element
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            // Remove loading screen after transition
            setTimeout(function() {
                loadingScreen.remove();
            }, 500);
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Change navigation style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.padding = '10px 0';
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Animate skill bars when in viewport
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        const windowHeight = window.innerHeight;
        
        skillLevels.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            const skillWidth = skill.style.width;
            
            if (skillTop < windowHeight - 100) {
                skill.classList.add('animate');
                skill.style.setProperty('--width', skillWidth);
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Animate portfolio items when in viewport
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    function animatePortfolioItems() {
        const windowHeight = window.innerHeight;
        
        portfolioItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight - 100) {
                // Add delay based on index
                setTimeout(() => {
                    item.classList.add('show');
                }, 100 * index);
            }
        });
    }
    
    // Initial check
    animatePortfolioItems();
    
    // Check on scroll
    window.addEventListener('scroll', animatePortfolioItems);
    
    // Animate service cards when in viewport
    const serviceCards = document.querySelectorAll('.service-card');
    
    function animateServiceCards() {
        const windowHeight = window.innerHeight;
        
        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 100) {
                // Add delay based on index
                setTimeout(() => {
                    card.classList.add('show');
                }, 100 * index);
            }
        });
    }
    
    // Initial check
    animateServiceCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateServiceCards);
}

// Portfolio Filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate inputs
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subject is required');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="btn-text">SENDING...</span>';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = 'Message sent successfully!';
                    
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 3 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Helper functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = message;
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        formGroup.appendChild(errorMessage);
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Add cursor trail effect
    let trailElements = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailLength) * 0.5;
        document.body.appendChild(trail);
        trailElements.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    document.addEventListener('mousemove', function(e) {
        // Update first trail element position
        trailElements[0].x = e.clientX;
        trailElements[0].y = e.clientY;
        
        // Update trail elements position with delay
        for (let i = 1; i < trailElements.length; i++) {
            const current = trailElements[i];
            const previous = trailElements[i - 1];
            
            current.x += (previous.x - current.x) * 0.3;
            current.y += (previous.y - current.y) * 0.3;
            
            current.element.style.left = current.x + 'px';
            current.element.style.top = current.y + 'px';
        }
    });
}

// Glitch Effects
function initGlitchEffects() {
    // Text scramble effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="glitch-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble effect to elements with class 'text-scramble'
    const textScrambleElements = document.querySelectorAll('.text-scramble');
    
    textScrambleElements.forEach(el => {
        const originalText = el.textContent;
        const fx = new TextScramble(el);
        
        el.addEventListener('mouseenter', () => {
            fx.setText(originalText);
        });
    });
    
    // Add random glitch effect to glitch elements
    const glitchElements = document.querySelectorAll('.glitch');
    
    function randomGlitch() {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (randomElement) {
            randomElement.classList.add('active-glitch');
            
            setTimeout(() => {
                randomElement.classList.remove('active-glitch');
            }, 200);
        }
        
        // Schedule next glitch
        setTimeout(randomGlitch, Math.random() * 5000 + 2000);
    }
    
    // Start random glitch effect
    setTimeout(randomGlitch, 3000);
    
    // Matrix rain effect
    function createMatrixRain() {
        const matrixRain = document.createElement('div');
        matrixRain.className = 'matrix-rain';
        document.body.appendChild(matrixRain);
        
        const width = window.innerWidth;
        const columns = Math.floor(width / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = i * 20 + 'px';
            column.style.animationDuration = Math.random() * 3 + 2 + 's';
            column.innerHTML = generateMatrixChars();
            matrixRain.appendChild(column);
        }
    }
    
    function generateMatrixChars() {
        const length = Math.floor(Math.random() * 20 + 10);
        let result = '';
        
        for (let i = 0; i < length; i++) {
            const char = String.fromCharCode(Math.random() * 93 + 33);
            result += char + '<br>';
        }
        
        return result;
    }
    
    // Create matrix rain effect
    createMatrixRain();
}
