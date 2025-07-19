// Animation JavaScript for Cyberpunk Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle effects
    initParticleEffects();
    
    // Initialize text typing effects
    initTypingEffects();
    
    // Initialize data stream animation
    initDataStreamAnimation();
    
    // Initialize section transitions
    initSectionTransitions();
});

// Particle Effects
function initParticleEffects() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    
    // Random size
    const size = Math.random() * 3 + 1;
    
    // Random color
    const colors = ['var(--color-neon-blue)', 'var(--color-neon-pink)', 'var(--color-neon-green)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Set styles
    particle.style.left = posX + 'px';
    particle.style.top = posY + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;
    particle.style.opacity = opacity;
    
    // Add to container
    container.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    // Random duration
    const duration = Math.random() * 20 + 10;
    
    // Random movement range
    const rangeX = Math.random() * 100 - 50;
    const rangeY = Math.random() * 100 - 50;
    
    // Initial position
    const initialX = parseFloat(particle.style.left);
    const initialY = parseFloat(particle.style.top);
    
    // Animation
    let startTime = null;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
            // Calculate new position using sine wave for smooth back-and-forth movement
            const newX = initialX + Math.sin(progress * Math.PI * 2) * rangeX;
            const newY = initialY + Math.sin(progress * Math.PI * 2 + Math.PI/2) * rangeY;
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            
            requestAnimationFrame(animate);
        } else {
            // Reset animation
            startTime = null;
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Text Typing Effects
function initTypingEffects() {
    const terminalTexts = document.querySelectorAll('.terminal-text');
    
    terminalTexts.forEach(text => {
        // Store original text
        const originalText = text.textContent;
        
        // Clear text
        text.textContent = '';
        
        // Add terminal cursor
        text.classList.add('terminal-typing');
        
        // Type text when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(text, originalText);
                    observer.unobserve(text);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(text);
    });
}

function typeText(element, text, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        
        // Random typing speed for realistic effect
        const speed = Math.random() * 50 + 30;
        
        setTimeout(() => {
            typeText(element, text, index + 1);
        }, speed);
    } else {
        // Remove typing cursor when done
        element.classList.remove('terminal-typing');
    }
}

// Data Stream Animation
function initDataStreamAnimation() {
    const dataStream = document.createElement('div');
    dataStream.className = 'data-stream';
    document.body.appendChild(dataStream);
    
    // Create data lines
    const lineCount = 20;
    
    for (let i = 0; i < lineCount; i++) {
        createDataLine(dataStream);
    }
}

function createDataLine(container) {
    const line = document.createElement('div');
    line.className = 'data-line';
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    
    // Random height
    const height = Math.random() * 300 + 100;
    
    // Random speed
    const speed = Math.random() * 10 + 5;
    
    // Set styles
    line.style.left = posX + 'px';
    line.style.height = height + 'px';
    line.style.animationDuration = speed + 's';
    
    // Add to container
    container.appendChild(line);
    
    // Remove and recreate line after animation completes
    line.addEventListener('animationend', () => {
        line.remove();
        createDataLine(container);
    });
}

// Section Transitions
function initSectionTransitions() {
    // Create transition element
    const transitionElement = document.createElement('div');
    transitionElement.className = 'section-transition';
    document.body.appendChild(transitionElement);
    
    // Get all section links
    const sectionLinks = document.querySelectorAll('.nav-links a');
    
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Activate transition
            transitionElement.classList.add('active');
            
            // After transition completes, scroll to section and hide transition
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'auto'
                });
                
                transitionElement.classList.add('exit');
                
                // After exit transition completes, reset classes
                setTimeout(() => {
                    transitionElement.classList.remove('active', 'exit');
                }, 500);
            }, 500);
        });
    });
}

// Circuit Animation
function initCircuitAnimation() {
    const circuitSvgs = document.querySelectorAll('.circuit-svg');
    
    circuitSvgs.forEach(svg => {
        const paths = svg.querySelectorAll('path');
        
        paths.forEach(path => {
            path.classList.add('circuit-path');
            
            // Get path length
            const length = path.getTotalLength();
            
            // Set up the starting position
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            
            // Trigger animation when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        path.style.animation = 'drawCircuit 3s linear forwards';
                        observer.unobserve(path);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(path);
        });
    });
}

// Glitch Image Effect
function initGlitchImageEffect() {
    const images = document.querySelectorAll('.card-image img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.classList.add('glitch-image');
            
            // Remove class after animation completes
            setTimeout(() => {
                this.classList.remove('glitch-image');
            }, 1000);
        });
    });
}

// Initialize additional effects when window is loaded
window.addEventListener('load', function() {
    // Initialize circuit animation
    initCircuitAnimation();
    
    // Initialize glitch image effect
    initGlitchImageEffect();
});
