// Global Variables
let currentSection = 0;
const totalSections = 9;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrolling();
    initializeAnimations();
    initializeNavigationDots();
    initializeProgressBar();
    initializeTypingEffect();
    initializeCountUpAnimations();
});

// Section Scrolling
function initializeScrolling() {
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;
    
    // Wheel event for desktop
    document.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        e.preventDefault();
        isScrolling = true;
        
        if (e.deltaY > 0) {
            // Scroll down
            scrollToSection(currentSection + 1);
        } else {
            // Scroll up
            scrollToSection(currentSection - 1);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }, { passive: false });
    
    // Touch events for mobile
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        
        if (Math.abs(touchDiff) > 50) {
            isScrolling = true;
            
            if (touchDiff > 0) {
                // Swipe up - go to next section
                scrollToSection(currentSection + 1);
            } else {
                // Swipe down - go to previous section
                scrollToSection(currentSection - 1);
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            scrollToSection(currentSection - 1);
        }
    });
}

// Scroll to specific section
function scrollToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    currentSection = sectionIndex;
    const targetSection = document.getElementById(`section-${sectionIndex + 1}`);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        updateNavigationDots();
        updateProgressBar();
        triggerSectionAnimations(sectionIndex);
    }
}

// Navigation Dots
function initializeNavigationDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSection(index);
        });
    });
}

function updateNavigationDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach((dot, index) => {
        if (index === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Progress Bar
function initializeProgressBar() {
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progress = ((currentSection + 1) / totalSections) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

// Typing Effect
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
}

// Count Up Animations
function initializeCountUpAnimations() {
    const countElements = document.querySelectorAll('[data-count]');
    
    countElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(element);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

function animateCountUp(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Section Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.slide-in-left, .fade-in, .zoom-in, .slide-up, .random-fade');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function triggerSectionAnimations(sectionIndex) {
    const section = document.getElementById(`section-${sectionIndex + 1}`);
    if (!section) return;
    
    // Add specific animations based on section
    switch (sectionIndex) {
        case 1: // Problem section
            triggerStatsAnimation(section);
            break;
        case 2: // Empathy section
            triggerStoryAnimation(section);
            break;
        case 3: // Turning point section
            triggerTurningAnimation(section);
            break;
        case 4: // Method section
            triggerMethodAnimation(section);
            break;
        case 5: // Results section
            triggerResultsAnimation(section);
            break;
        case 6: // Testimonials section
            triggerTestimonialsAnimation(section);
            break;
    }
}

function triggerStatsAnimation(section) {
    const statNumbers = section.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            animateCountUp(stat);
        }, index * 200);
    });
}

function triggerStoryAnimation(section) {
    const storyItems = section.querySelectorAll('.story-item');
    storyItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `fadeIn 0.8s ease-out forwards`;
        }, index * 300);
    });
}

function triggerTurningAnimation(section) {
    const turningItems = section.querySelectorAll('.turning-item');
    turningItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `zoomIn 0.8s ease-out forwards`;
        }, index * 200);
    });
}

function triggerMethodAnimation(section) {
    const methodCards = section.querySelectorAll('.method-card');
    methodCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `slideUp 0.8s ease-out forwards`;
        }, index * 200);
    });
}

function triggerResultsAnimation(section) {
    const mainResult = section.querySelector('.result-number');
    const subResults = section.querySelectorAll('.sub-number');
    
    if (mainResult) {
        animateCountUp(mainResult);
    }
    
    subResults.forEach((result, index) => {
        setTimeout(() => {
            animateCountUp(result);
        }, 500 + (index * 200));
    });
}

function triggerTestimonialsAnimation(section) {
    const testimonialCards = section.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeIn 0.8s ease-out forwards`;
        }, index * 300);
    });
    
    // Animate stars
    const stars = section.querySelectorAll('.star');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.animation = `twinkle 1s infinite alternate`;
        }, index * 100);
    });
}

// Intersection Observer for section detection
function initializeSectionObserver() {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const sectionIndex = parseInt(sectionId.split('-')[1]) - 1;
                
                if (sectionIndex !== currentSection) {
                    currentSection = sectionIndex;
                    updateNavigationDots();
                    updateProgressBar();
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Prevent default scroll behavior
document.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });

// Initialize section observer
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeSectionObserver, 100);
});

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Preload images
    const images = [
        'assets/images/hero-bg.jpg',
        'assets/images/problem-bg.jpg',
        'assets/images/empathy-bg.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add CSS classes for smooth animations
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation-play-state: running !important;
    }
    
    .slide-in-left {
        opacity: 0;
        transform: translateX(-100px);
        animation: slideInLeft 0.8s ease-out forwards;
        animation-play-state: paused;
    }
    
    .fade-in {
        opacity: 0;
        animation: fadeIn 0.8s ease-out forwards;
        animation-play-state: paused;
    }
    
    .zoom-in {
        opacity: 0;
        transform: scale(0.5);
        animation: zoomIn 0.8s ease-out forwards;
        animation-play-state: paused;
    }
    
    .slide-up {
        opacity: 0;
        transform: translateY(100px);
        animation: slideUp 0.8s ease-out forwards;
        animation-play-state: paused;
    }
    
    .random-fade {
        opacity: 0;
        animation: fadeIn 0.8s ease-out forwards;
        animation-play-state: paused;
    }
`;
document.head.appendChild(style);