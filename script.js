// ==========================================
// GLOBAL VARIABLES AND CONFIGURATIONS
// ==========================================

let currentTestimonial = 0;
let statsAnimated = false;
let ticking = false;
let lastScroll = 0;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ==========================================
// LOADING SCREEN
// ==========================================

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');

    if (!loader || !loaderText) return;

    const codeSnippets = [
        'Initializing components...',
        'Loading portfolio...',
        'Setting up animations...',
        'Almost ready...',
        'Welcome!'
    ];

    let snippetIndex = 0;

    const typeCode = () => {
        if (snippetIndex < codeSnippets.length) {
            loaderText.textContent = codeSnippets[snippetIndex];
            snippetIndex++;
            setTimeout(typeCode, 400);
        } else {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 500);
        }
    };

    typeCode();
});

// ==========================================
// CUSTOM CURSOR
// ==========================================

const initCustomCursor = () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');

    if (!cursor || !cursorTrail) return;

    // Only enable custom cursor on non-touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorTrail.style.display = 'none';
        document.body.classList.add('touch-device');
        return;
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Enhanced cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--accent)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--secondary)';
        });
    });
};

// ==========================================
// NAVIGATION
// ==========================================

const initNavigation = () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    // Enhanced scroll effect
    const handleScroll = debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');

    const updateActiveLink = debounce(() => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 10);

    window.addEventListener('scroll', updateActiveLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offset = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ==========================================
// THEME TOGGLE
// ==========================================

const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            localStorage.setItem('theme', 'light');
        } else {
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            localStorage.setItem('theme', 'dark');
        }
    });
};

// ==========================================
// TYPING ANIMATION
// ==========================================

const initTypingAnimation = () => {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const words = ['Web Developer', 'UI/UX Designer', 'Digital Creator', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
};

// ==========================================
// PARTICLES.JS INITIALIZATION
// ==========================================

const initParticles = () => {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js not loaded. Using fallback animation.');
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.background = 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="1" fill="%2300D4FF" opacity="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23pattern)"/%3E%3C/svg%3E")';
        }
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00D4FF'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00D4FF',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
};

// ==========================================
// STATS ANIMATION
// ==========================================

const initStatsAnimation = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num + '+';
    };

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = formatNumber(target);
                }
            };

            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }
};

// ==========================================
// PORTFOLIO FILTERING
// ==========================================

const initPortfolioFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (filterButtons.length === 0 || portfolioItems.length === 0) return;

    // Initialize filter counts
    const updateFilterCounts = () => {
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            const count = filter === 'all' ? portfolioItems.length :
                document.querySelectorAll(`[data-category="${filter}"]`).length;
            const countElement = button.querySelector('.filter-count');
            if (countElement) {
                countElement.textContent = count;
            }
        });
    };

    // Advanced filtering with smooth animations
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });

            // Add active class and animation to clicked button
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';

            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);

            const filter = button.getAttribute('data-filter');

            // Add loading state
            if (portfolioGrid) {
                portfolioGrid.style.opacity = '0.7';
                portfolioGrid.style.transform = 'scale(0.98)';
            }

            // Filter items with staggered animation
            portfolioItems.forEach((item, index) => {
                const shouldShow = filter === 'all' || item.getAttribute('data-category') === filter;

                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.9)';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 100 + (index * 50));
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-30px) scale(0.9)';

                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Remove loading state
            setTimeout(() => {
                if (portfolioGrid) {
                    portfolioGrid.style.opacity = '1';
                    portfolioGrid.style.transform = 'scale(1)';
                }
            }, 400);
        });
    });

    // Initialize on page load
    updateFilterCounts();

    // Add entrance animation to portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
};

// ==========================================
// PORTFOLIO HOVER EFFECTS
// ==========================================

const initPortfolioHoverEffects = () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image img');

        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
            if (image) {
                image.style.transform = 'scale(1.1) rotate(1deg)';
            }
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
};

// ==========================================
// PORTFOLIO PARTICLE EFFECTS
// ==========================================

const initPortfolioParticles = () => {
    // Create particle element
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        particle.className = 'portfolio-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, var(--secondary), var(--accent));
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: particleFloat 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    };

    // Add CSS for particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Add particle effect to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const rect = item.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createParticle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 100);
            }
        });
    });
};

// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================

const initTestimonialsCarousel = () => {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');

    if (testimonials.length === 0) return;

    const showTestimonial = (index) => {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    };

    // Auto-scroll testimonials
    const autoScroll = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Manual testimonial navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            // Reset auto-scroll
            clearInterval(autoScroll);
            setTimeout(() => {
                autoScroll = setInterval(() => {
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(currentTestimonial);
                }, 5000);
            }, 5000);
        });
    });

    // Initialize first testimonial
    showTestimonial(0);
};

// ==========================================
// CONTACT FORM
// ==========================================
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const projectTypeSelect = document.getElementById('projectType');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('.submit-button');

    // Add real-time validation
    nameInput.addEventListener('input', () => validateField(nameInput, 'name'));
    emailInput.addEventListener('input', () => validateField(emailInput, 'email'));
    messageInput.addEventListener('input', () => validateField(messageInput, 'message'));

    // Add floating label animation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            projectType: projectTypeSelect.value,
            message: messageInput.value.trim()
        };

        // Clear previous errors
        clearAllErrors();

        // Validate all fields
        const isValid = validateAllFields(formData);

        if (!isValid) {
            showErrorMessage('Please fix the errors above.');
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Build a FormData object for Formspree
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('email', formData.email);
            payload.append('projectType', formData.projectType);
            payload.append('message', formData.message);

            const response = await fetch('https://formspree.io/f/xpwredeo', {
                method: 'POST',
                body: payload,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            // Optional: inspect JSON response
            const json = await response.json();
            console.log('Formspree response:', json);

            showSuccessState();
            resetForm();

        } catch (error) {
            console.error('Form submission error:', error);
            showErrorState();
        } finally {
            setLoadingState(false);
        }

    });

    // Validation functions
    function validateField(input, type) {
        const value = input.value.trim();
        const formGroup = input.parentElement;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        clearError(formGroup);

        switch (type) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name can only contain letters and spaces';
                    isValid = false;
                }
                break;

            case 'email':
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            showError(formGroup, errorMessage);
        }

        return isValid;
    }

    function validateAllFields(formData) {
        const nameValid = validateField(nameInput, 'name');
        const emailValid = validateField(emailInput, 'email');
        const messageValid = validateField(messageInput, 'message');

        let projectTypeValid = true;
        if (!formData.projectType) {
            showError(projectTypeSelect.parentElement, 'Please select a project type');
            projectTypeValid = false;
        }

        return nameValid && emailValid && messageValid && projectTypeValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(formGroup, message) {
        formGroup.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    function clearError(formGroup) {
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function clearAllErrors() {
        const errorElements = contactForm.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());

        const errorGroups = contactForm.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => group.classList.remove('error'));
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    }

    function showSuccessState() {
        submitButton.classList.add('success');
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';

        // Show success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    function showErrorState() {
        submitButton.classList.add('error');
        submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';

        // Show error notification
        showNotification('Failed to send message. Please try again.', 'error');
    }

    function resetForm() {
        contactForm.reset();

        // Reset form groups
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('has-value', 'focused');
        });

        // Reset button after delay
        setTimeout(() => {
            submitButton.classList.remove('success', 'error');
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }, 3000);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;

        const existingError = contactForm.querySelector('.form-error-message');
        if (existingError) {
            existingError.remove();
        }

        contactForm.insertBefore(errorDiv, submitButton);

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Simulate form submission (replace with your actual API)
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) {
                    console.log('Form submitted successfully:', data);
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
};

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);
// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const initBackToTop = () => {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    const handleScroll = debounce(() => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Add rocket animation
        backToTopButton.style.transform = 'translateY(-100vh)';
        setTimeout(() => {
            backToTopButton.style.transform = '';
        }, 1000);
    });
};

// ==========================================
// SKILL BARS ANIMATION
// ==========================================

const initSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    entry.target.style.width = width + '%';
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
};

// ==========================================
// PROFILE PARALLAX EFFECT
// ==========================================

const initProfileParallax = () => {
    const profileImage = document.querySelector('.profile-image img');
    if (!profileImage) return;

    const handleMouseMove = debounce((e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        profileImage.style.transform = `scale(1.1) translate(${xPos}px, ${yPos}px)`;
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);
};

// ==========================================
// TECH STACK TOOLTIPS
// ==========================================

const initTechTooltips = () => {
    const techItems = document.querySelectorAll('.tech-item[data-tooltip]');

    techItems.forEach(item => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = item.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-light, #333);
            color: var(--text-light, #fff);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        item.appendChild(tooltip);
        item.style.position = 'relative';

        item.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        });
    });
};

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
};

// ==========================================
// MAGNETIC BUTTON EFFECTS
// ==========================================

const initMagneticButtons = () => {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
};

// ==========================================
// FLOATING ELEMENTS PARALLAX
// ==========================================

const initFloatingElements = () => {
    const floatingElements = document.querySelectorAll('.floating-icon, .floating-emoji, .floating-cube');
    if (floatingElements.length === 0) return;

    const handleMouseMove = debounce((e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 2;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;

            el.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);
};

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight : 0;

                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

const initPerformanceOptimizations = () => {
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });

    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll('img[data-lazy]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.lazy;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Update footer year
    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
};

// ==========================================
// MAIN INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initCustomCursor();
    initNavigation();
    initThemeToggle();
    initTypingAnimation();
    initParticles();
    initStatsAnimation();
    initPortfolioFiltering();
    initPortfolioHoverEffects();
    initPortfolioParticles();
    initTestimonialsCarousel();
    initContactForm();
    initBackToTop();
    initSkillBars();
    initProfileParallax();
    initTechTooltips();
    initScrollAnimations();
    initMagneticButtons();
    initFloatingElements();
    initSmoothScrolling();
    initPerformanceOptimizations();

    // Hero section reveal animation
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .animate-fade-up');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('animated');
            }, index * 100);
        });
    }, 500);

    console.log('🚀 All components initialized successfully!');
});

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ==========================================
// EXPORT FOR TESTING (if needed)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCustomCursor,
        initNavigation,
        initThemeToggle,
        initTypingAnimation,
        initPortfolioFiltering,
        debounce
    };
}

// ==========================================
// PROCESS TIMELINE ANIMATIONS
// ==========================================

const initProcessAnimations = () => {
    const progressLine = document.querySelector('.progress-line');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const processSection = document.querySelector('.process');

    if (!progressLine || timelineItems.length === 0) return;

    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress line
                progressLine.classList.add('animate');

                // Animate timeline items with stagger
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 200);
                });

                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (processSection) {
        processObserver.observe(processSection);
    }
};

// Add to your main initialization
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing init functions
    initProcessAnimations();
});

// ==========================================
// SERVICES SECTION INTERACTIONS
// ==========================================

const initServicesInteractions = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceButtons = document.querySelectorAll('.service-button');

    // Add interactive hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
            if (card.classList.contains('featured')) {
                card.style.transform = 'scale(1.05) translateY(-15px)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
        });
    });

    // Handle service button clicks
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceCard = button.closest('.service-card');
            const serviceType = serviceCard.getAttribute('data-service');

            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            // Handle different service types
            switch (serviceType) {
                case 'student':
                    handleStudentPortfolio();
                    break;
                case 'single':
                    handleSinglePage();
                    break;
                case 'business':
                    handleBusinessWebsite();
                    break;
                case 'custom':
                    handleCustomSolution();
                    break;
            }
        });
    });
};

// Service handlers
const handleStudentPortfolio = () => {
    // Redirect to contact with service parameter
    window.location.href = '#contact?service=student-portfolio';
};

const handleSinglePage = () => {
    window.location.href = '#contact?service=single-page';
};

const handleBusinessWebsite = () => {
    window.location.href = '#contact?service=business-website';
};

const handleCustomSolution = () => {
    window.location.href = '#contact?service=custom-solution';
};

// Initialize services section
document.addEventListener('DOMContentLoaded', () => {
    initServicesInteractions();

    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, index * 100);
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        servicesObserver.observe(card);
    });

    // Animate stats counters
    const statsNumbers = document.querySelectorAll('.services-stats .stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Animate stats counter
const animateStatsCounter = (element) => {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');

    if (isNaN(number)) return;

    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < number) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = number + suffix;
        }
    };

    element.textContent = '0' + suffix;
    updateCounter();
};

// Add service comparison functionality
const initServiceComparison = () => {
    const compareButton = document.createElement('button');
    compareButton.className = 'compare-services-btn';
    compareButton.innerHTML = `
        <i class="fas fa-balance-scale"></i>
        <span>Compare Services</span>
    `;

    // Add compare button to services header
    const servicesHeader = document.querySelector('.services-header');
    if (servicesHeader) {
        servicesHeader.appendChild(compareButton);
    }

    compareButton.addEventListener('click', () => {
        showServiceComparison();
    });
};

// Show service comparison modal
const showServiceComparison = () => {
    const modal = document.createElement('div');
    modal.className = 'service-comparison-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Service Comparison</h3>
                    <button class="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Student Portfolio</th>
                                <th>Single Page</th>
                                <th>Business Website</th>
                                <th>Custom Solution</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Price</td>
                                <td>₹499</td>
                                <td>₹799</td>
                                <td>₹1999</td>
                                <td>Custom</td>
                            </tr>
                            <tr>
                                <td>Pages</td>
                                <td>1</td>
                                <td>1</td>
                                <td>5-10</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>Responsive Design</td>
                                <td>✅</td>
                                <td>✅</td>
                                <td>✅</td>
                                <td>✅</td>
                            </tr>
                            <tr>
                                <td>Contact Form</td>
                                <td>Basic</td>
                                <td>❌</td>
                                <td>✅</td>
                                <td>✅</td>
                            </tr>
                            <tr>
                                <td>Free Hosting</td>
                                <td>✅</td>
                                <td>✅</td>
                                <td>✅</td>
                                <td>Optional</td>
                            </tr>
                            <tr>
                                <td>SEO Optimization</td>
                                <td>Basic</td>
                                <td>Basic</td>
                                <td>Advanced</td>
                                <td>Advanced</td>
                            </tr>
                            <tr>
                                <td>Support</td>
                                <td>Email</td>
                                <td>Email</td>
                                <td>Email + Chat</td>
                                <td>Dedicated</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });

    // Animate modal in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
};

// Add service calculator functionality
const initServiceCalculator = () => {
    const calculatorBtn = document.createElement('button');
    calculatorBtn.className = 'service-calculator-btn';
    calculatorBtn.innerHTML = `
        <i class="fas fa-calculator"></i>
        <span>Price Calculator</span>
    `;

    const servicesHeader = document.querySelector('.services-header');
    if (servicesHeader) {
        servicesHeader.appendChild(calculatorBtn);
    }

    calculatorBtn.addEventListener('click', () => {
        showServiceCalculator();
    });
};

// Show service calculator modal
const showServiceCalculator = () => {
    const modal = document.createElement('div');
    modal.className = 'service-calculator-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Project Price Calculator</h3>
                    <button class="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="calculator-form">
                    <div class="form-group">
                        <label>Project Type</label>
                        <select id="projectType">
                            <option value="499">Student Portfolio - ₹499</option>
                            <option value="799">Single Page - ₹799</option>
                            <option value="1999">Business Website - ₹1999</option>
                            <option value="custom">Custom Solution - Let's Discuss</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Additional Features</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" value="299" data-feature="contact-form">
                                <span>Advanced Contact Form (+₹299)</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" value="499" data-feature="seo">
                                <span>SEO Optimization (+₹499)</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" value="399" data-feature="analytics">
                                <span>Analytics Setup (+₹399)</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" value="599" data-feature="custom-domain">
                                <span>Custom Domain Setup (+₹599)</span>
                            </label>
                        </div>
                    </div>
                    <div class="calculator-result">
                        <div class="price-breakdown">
                            <div class="base-price">
                                <span>Base Price:</span>
                                <span id="basePrice">₹499</span>
                            </div>
                            <div class="additional-features" id="additionalFeatures">
                                <!-- Dynamic features will be added here -->
                            </div>
                            <div class="total-price">
                                <span>Total Price:</span>
                                <span id="totalPrice">₹499</span>
                            </div>
                        </div>
                        <button class="get-quote-btn">Get Quote</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Calculator functionality
    const projectTypeSelect = modal.querySelector('#projectType');
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    const basePrice = modal.querySelector('#basePrice');
    const additionalFeatures = modal.querySelector('#additionalFeatures');
    const totalPrice = modal.querySelector('#totalPrice');
    const getQuoteBtn = modal.querySelector('.get-quote-btn');

    const updateCalculator = () => {
        const baseValue = parseInt(projectTypeSelect.value) || 0;
        let additionalValue = 0;

        // Clear additional features
        additionalFeatures.innerHTML = '';

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const featureValue = parseInt(checkbox.value);
                additionalValue += featureValue;

                // Add to breakdown
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `
                    <span>${checkbox.nextElementSibling.textContent}</span>
                    <span>₹${featureValue}</span>
                `;
                additionalFeatures.appendChild(featureItem);
            }
        });

        if (projectTypeSelect.value === 'custom') {
            basePrice.textContent = 'Custom';
            totalPrice.textContent = 'Let\'s Discuss';
        } else {
            basePrice.textContent = `₹${baseValue}`;
            totalPrice.textContent = `₹${baseValue + additionalValue}`;
        }
    };

    projectTypeSelect.addEventListener('change', updateCalculator);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCalculator);
    });

    getQuoteBtn.addEventListener('click', () => {
        const selectedFeatures = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.dataset.feature);

        // Redirect to contact with calculator data
        const params = new URLSearchParams();
        params.set('service', projectTypeSelect.value);
        params.set('features', selectedFeatures.join(','));
        params.set('total', totalPrice.textContent);

        window.location.href = `#contact?${params.toString()}`;
        modal.remove();
    });

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });

    // Animate modal in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
};

// Add FAQ section toggle
const initServicesFAQ = () => {
    const faqData = [
        {
            question: "What's included in the Student Portfolio package?",
            answer: "The Student Portfolio includes a complete 1-page website built from your resume, featuring sections for projects, skills, and contact information. It's fully responsive and includes free hosting on GitHub Pages."
        },
        {
            question: "How long does it take to complete a project?",
            answer: "Student Portfolio: 2-3 days, Single Page: 3-5 days, Business Website: 7-10 days, Custom Solution: Depends on complexity but typically 2-4 weeks."
        },
        {
            question: "Do you provide ongoing support?",
            answer: "Yes! All packages include 30 days of free support. For ongoing maintenance, we offer separate support packages."
        },
        {
            question: "Can I request revisions?",
            answer: "Absolutely! Each package includes 3 free revisions. Additional revisions can be requested for a small fee."
        },
        {
            question: "What if I need a custom domain?",
            answer: "We can help you set up a custom domain for an additional ₹599. This includes domain registration assistance and DNS configuration."
        }
    ];

    const faqSection = document.createElement('div');
    faqSection.className = 'services-faq';
    faqSection.innerHTML = `
        <div class="faq-header">
            <h3>Frequently Asked Questions</h3>
            <p>Everything you need to know about our services</p>
        </div>
        <div class="faq-list">
            ${faqData.map((item, index) => `
                <div class="faq-item">
                    <button class="faq-question" data-index="${index}">
                        <span>${item.question}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <p>${item.answer}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Insert FAQ before services CTA
    const servicesCTA = document.querySelector('.services-cta');
    if (servicesCTA) {
        servicesCTA.parentNode.insertBefore(faqSection, servicesCTA);
    }

    // FAQ toggle functionality
    const faqQuestions = faqSection.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            // Toggle active state
            faqItem.classList.toggle('active');

            // Animate answer
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
};

// Initialize all service enhancements
document.addEventListener('DOMContentLoaded', () => {
    initServicesInteractions();
    initServiceComparison();
    initServiceCalculator();
    initServicesFAQ();
});

console.log('🎯 Enhanced Services Section Loaded!');