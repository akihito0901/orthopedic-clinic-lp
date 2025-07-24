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
    
    // Don't trigger fadeIn hero animation, use typing effect instead
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
    console.log('Initializing typing effect...');
    const typingText = document.querySelector('.typing-text');
    const typingText2 = document.querySelector('.typing-text-2');
    
    console.log('Found typing text:', typingText);
    console.log('Found typing text 2:', typingText2);
    
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else if (typingText2) {
                // Start second typing effect after first completes
                setTimeout(() => {
                    const text2 = typingText2.textContent;
                    typingText2.textContent = '';
                    typingText2.style.opacity = '1'; // Make visible before typing
                    
                    let j = 0;
                    function typeWriter2() {
                        if (j < text2.length) {
                            typingText2.textContent += text2.charAt(j);
                            j++;
                            setTimeout(typeWriter2, 60);
                        }
                    }
                    typeWriter2();
                }, 300);
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
    
    // Check if element should display percentage
    const isPercentage = element.classList.contains('stat-number') || element.textContent.includes('%');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + (isPercentage ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + (isPercentage ? '%' : '');
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
    
    // Observe all animated elements (exclude typing elements)
    const animatedElements = document.querySelectorAll('.slide-in-left, .fade-in, .zoom-in, .slide-up, .random-fade');
    animatedElements.forEach(element => {
        // Skip typing elements
        if (!element.classList.contains('typing-text') && !element.classList.contains('typing-text-2')) {
            observer.observe(element);
        }
    });
}

function triggerSectionAnimations(sectionIndex) {
    const section = document.getElementById(`section-${sectionIndex + 1}`);
    if (!section) return;
    
    // Add specific animations based on section
    switch (sectionIndex) {
        case 0: // Hero section - use typing effect instead
            // triggerHeroAnimation(section); // Disabled for typing effect
            break;
        case 1: // Problem section
            triggerStatsAnimation(section);
            break;
        case 2: // Empathy section
            triggerStoryAnimation(section);
            break;
        case 3: // Results highlight section
            triggerResultsHighlightAnimation(section);
            break;
        case 4: // Turning point section
            triggerTurningAnimation(section);
            break;
        case 5: // Method section
            triggerMethodAnimation(section);
            break;
        case 6: // Results section
            triggerResultsAnimation(section);
            break;
        case 7: // Support section
            triggerResultsAnimation(section);
            break;
        case 8: // Testimonials section
            triggerTestimonialsAnimation(section);
            break;
    }
}

function triggerHeroAnimation(section) {
    if (!section) return;
    
    const heroTitle = section.querySelector('.hero-title');
    const heroSubtitle = section.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        // Add animate class and apply animation
        heroTitle.classList.add('animate');
        heroTitle.style.animation = 'none';
        heroTitle.offsetHeight; // Trigger reflow
        heroTitle.style.animation = 'fadeInUp 1.2s ease-out forwards';
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            // Add animate class and apply animation
            heroSubtitle.classList.add('animate');
            heroSubtitle.style.animation = 'none';
            heroSubtitle.offsetHeight; // Trigger reflow
            heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, 300);
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
    // Section 3 - Success story animation
    const successImage = section.querySelector('.success-image');
    const solutionText = section.querySelector('.solution-text');
    
    if (successImage) {
        successImage.style.animation = 'zoomIn 1s ease-out forwards';
    }
    if (solutionText) {
        setTimeout(() => {
            solutionText.style.animation = 'fadeIn 0.8s ease-out forwards';
        }, 300);
    }
}

function triggerResultsHighlightAnimation(section) {
    // Section 3.5 - Results highlight animation
    const resultsStats = section.querySelector('.results-stats');
    const resultNumbers = section.querySelectorAll('.result-number');
    const resultText = section.querySelector('.result-text');
    
    if (resultsStats) {
        resultsStats.style.animation = 'slideUp 0.8s ease-out forwards';
    }
    
    resultNumbers.forEach((number, index) => {
        setTimeout(() => {
            if (number.dataset.count) {
                animateCountUp(number);
            } else {
                number.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        }, 300 + (index * 200));
    });
    
    if (resultText) {
        setTimeout(() => {
            resultText.style.animation = 'fadeIn 0.8s ease-out forwards';
        }, 800);
    }
}

function triggerTurningAnimation(section) {
    // Section 4 - Strategy grid animation
    const strategyGrid = section.querySelector('.strategy-grid');
    const strategyItems = section.querySelectorAll('.strategy-item');
    
    if (strategyGrid) {
        strategyGrid.style.animation = 'slideUp 0.8s ease-out forwards';
    }
    strategyItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeIn 0.6s ease-out forwards';
        }, index * 200);
    });
}

function triggerMethodAnimation(section) {
    // Section 5 - Video support animation
    const videoImage = section.querySelector('.video-image');
    const videoPoints = section.querySelector('.video-points');
    
    if (videoImage) {
        videoImage.style.animation = 'zoomIn 0.8s ease-out forwards';
    }
    if (videoPoints) {
        setTimeout(() => {
            videoPoints.style.animation = 'slideUp 0.6s ease-out forwards';
        }, 300);
    }
}

function triggerResultsAnimation(section) {
    // Section 6 - Final support animation
    const videoPoints = section.querySelector('.video-points');
    const sectionTitle = section.querySelector('.section-title');
    
    if (videoPoints) {
        videoPoints.style.animation = 'slideUp 0.8s ease-out forwards';
    }
    if (sectionTitle) {
        setTimeout(() => {
            sectionTitle.style.animation = 'fadeIn 0.6s ease-out forwards';
        }, 300);
    }
}

function triggerTestimonialsAnimation(section) {
    // Section 7 - Final CTA animation
    const benefits = section.querySelector('.benefits');
    const lineButton = section.querySelector('.line-button');
    
    if (benefits) {
        benefits.style.animation = 'fadeIn 0.8s ease-out forwards';
    }
    if (lineButton) {
        setTimeout(() => {
            lineButton.style.animation = 'slideUp 0.6s ease-out forwards';
        }, 300);
    }
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
                    
                    // Trigger animations for the current section
                    triggerSectionAnimations(sectionIndex);
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
    
    /* Ensure hero elements can be animated */
    .hero-title.animate,
    .hero-subtitle.animate {
        animation-play-state: running !important;
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