// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const videoCases = document.querySelectorAll('.video-case');
const videoModal = document.querySelector('.video-modal');
const closeModal = document.querySelector('.close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const videoIframe = document.querySelector('#video-iframe');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Video Modal functionality
function openVideoModal(videoId) {
    videoModal.style.display = 'flex';
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    videoIframe.src = '';
    document.body.style.overflow = 'auto';
}

// Add click event to all video cases
videoCases.forEach((videoCase, index) => {
    const playButton = videoCase.querySelector('.play-button');
    
    playButton.addEventListener('click', () => {
        // In a real implementation, you would have actual video IDs
        // For demo purposes, using placeholder video IDs
        const videoIds = ['dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'dQw4w9WgXcQ'];
        openVideoModal(videoIds[index]);
    });
});

// Close modal events
closeModal.addEventListener('click', closeVideoModal);
modalOverlay.addEventListener('click', closeVideoModal);

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        closeVideoModal();
    }
});

// Cloud Ecosystem Interactive Visualization
const googleApps = document.querySelectorAll('.google-apps .app');
const thirdPartyApps = document.querySelectorAll('.third-party .app');
const connections = document.querySelectorAll('.connection');

// Add hover effects to apps
googleApps.forEach(app => {
    app.addEventListener('mouseenter', () => {
        const appName = app.getAttribute('data-app');
        highlightConnection(appName, true);
    });
    
    app.addEventListener('mouseleave', () => {
        const appName = app.getAttribute('data-app');
        highlightConnection(appName, false);
    });
});

thirdPartyApps.forEach(app => {
    app.addEventListener('mouseenter', () => {
        const appName = app.getAttribute('data-app');
        highlightConnection(appName, true);
    });
    
    app.addEventListener('mouseleave', () => {
        const appName = app.getAttribute('data-app');
        highlightConnection(appName, false);
    });
});

function highlightConnection(appName, isHighlighted) {
    connections.forEach(connection => {
        const fromApp = connection.getAttribute('data-from');
        const toApp = connection.getAttribute('data-to');
        
        if (fromApp === appName || toApp === appName) {
            if (isHighlighted) {
                connection.classList.add('highlighted');
            } else {
                connection.classList.remove('highlighted');
            }
        }
    });
}

// Horizontal scroll for video cases with mouse wheel
const videoScroll = document.getElementById('video-scroll');
let isDown = false;
let startX;
let scrollLeft;

videoScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - videoScroll.offsetLeft;
    scrollLeft = videoScroll.scrollLeft;
    videoScroll.style.cursor = 'grabbing';
});

videoScroll.addEventListener('mouseleave', () => {
    isDown = false;
    videoScroll.style.cursor = 'grab';
});

videoScroll.addEventListener('mouseup', () => {
    isDown = false;
    videoScroll.style.cursor = 'grab';
});

videoScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - videoScroll.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    videoScroll.scrollLeft = scrollLeft - walk;
});

// Add CSS for connection highlighting
const style = document.createElement('style');
style.textContent = `
    .connection-line.highlighted {
        background-color: var(--secondary-color);
        height: 4px;
    }
    
    .connection-label.highlighted {
        background-color: var(--secondary-color);
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add fade-in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(fadeStyle);

// Form validation (if contact form is added)
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(input);
        }
    });
    
    return isValid;
}

function showError(input, message) {
    clearError(input);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
    input.classList.add('error');
}

function clearError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error-message {
        color: var(--secondary-color);
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
    
    input.error, textarea.error {
        border-color: var(--secondary-color);
    }
`;
document.head.appendChild(errorStyle);