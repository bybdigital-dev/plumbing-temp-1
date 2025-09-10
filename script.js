// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.value-item, .service-card, .gallery-item, .contact-item');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Special animations for about section
    const aboutContent = document.querySelector('.about-content');
    const serviceAreas = document.querySelector('.service-areas');
    
    if (aboutContent) {
        aboutContent.classList.add('slide-in-left');
        observer.observe(aboutContent);
    }
    
    if (serviceAreas) {
        serviceAreas.classList.add('slide-in-right');
        observer.observe(serviceAreas);
    }

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
});

// Reviews Carousel
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');
const indicators = document.querySelectorAll('.indicator');

function showReview(index) {
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        indicators[i].classList.remove('active');
    });
    
    reviews[index].classList.add('active');
    indicators[index].classList.add('active');
}

// Auto-advance reviews
function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}

// Start auto-advance
let reviewInterval = setInterval(nextReview, 5000);

// Manual controls
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentReview = index;
        showReview(currentReview);
        
        // Reset auto-advance
        clearInterval(reviewInterval);
        reviewInterval = setInterval(nextReview, 5000);
    });
});

// Pause auto-advance on hover
const reviewsSection = document.querySelector('.reviews-carousel');
if (reviewsSection) {
    reviewsSection.addEventListener('mouseenter', () => {
        clearInterval(reviewInterval);
    });
    
    reviewsSection.addEventListener('mouseleave', () => {
        reviewInterval = setInterval(nextReview, 5000);
    });
}

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05) rotate(1deg)';
        item.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotate(0deg)';
        item.style.boxShadow = 'none';
    });
});

// Service cards hover animation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Hero background animation enhancement
document.addEventListener('DOMContentLoaded', () => {
    const waterFlow = document.querySelector('.water-flow');
    const electricalSparks = document.querySelector('.electrical-sparks');
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (waterFlow) {
            waterFlow.style.transform = `translateY(${rate}px)`;
        }
        
        if (electricalSparks) {
            electricalSparks.style.transform = `translateY(${rate * 0.8}px)`;
        }
    });
});

// Form enhancements
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
        
        // Add validation styling
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.style.borderColor = '#10b981';
            } else {
                input.style.borderColor = '#ef4444';
            }
        });
    });
    
    // Form submission handling
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Reset button after a delay (for demo purposes)
        setTimeout(() => {
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Add click animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    const waterFlow = document.querySelector('.water-flow');
    const electricalSparks = document.querySelector('.electrical-sparks');
    const scrolled = window.pageYOffset;
    
    // Navbar background
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effect
    const rate = scrolled * -0.5;
    if (waterFlow) {
        waterFlow.style.transform = `translateY(${rate}px)`;
    }
    if (electricalSparks) {
        electricalSparks.style.transform = `translateY(${rate * 0.8}px)`;
    }
}, 16);

window.addEventListener('scroll', throttledScroll);

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations to hero elements
    setTimeout(() => {
        document.querySelector('.hero-title').style.animation = 'slideInDown 1s ease-out';
        document.querySelector('.hero-subtitle').style.animation = 'fadeInUp 1s ease-out 0.3s both';
        document.querySelector('.hero-tagline').style.animation = 'fadeInUp 1s ease-out 0.6s both';
        document.querySelector('.hero-buttons').style.animation = 'fadeInUp 1s ease-out 0.9s both';
        document.querySelector('.scroll-indicator').style.animation = 'fadeInUp 1s ease-out 1.2s both';
    }, 100);
    
    console.log('ProFlow Solutions website loaded successfully!');
});