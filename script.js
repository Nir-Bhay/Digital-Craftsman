// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
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

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

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

// Navigation
// const navbar = document.querySelector('.navbar');
// const navToggle = document.querySelector('.nav-toggle');
// const navMenu = document.querySelector('.nav-menu');
// const navLinks = document.querySelectorAll('.nav-link');

// // Sticky navbar on scroll
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 100) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });

// // Mobile menu toggle
// navToggle.addEventListener('click', () => {
//     navMenu.classList.toggle('active');
//     navToggle.classList.toggle('active');
// });

// Close mobile menu on link click
// navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         navMenu.classList.remove('active');
//         navToggle.classList.remove('active');
//     });
// });

// Smooth scrolling for navigation links
// navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         const targetId = link.getAttribute('href');
//         const targetSection = document.querySelector(targetId);
//         const offset = navbar.offsetHeight;
//         const targetPosition = targetSection.offsetTop - offset;
        
//         window.scrollTo({
//             top: targetPosition,
//             behavior: 'smooth'
//         });
//     });
// });

// // Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// // Typing Animation
// const typingText = document.querySelector('.typing-text');
// const typingWords = ['Web Designer', 'UI Developer', 'Digital Creator'];
// let wordIndex = 0;
// let charIndex = 0;
// let isDeleting = false;

// function typeWriter() {
//     const currentWord = typingWords[wordIndex];
    
//     if (isDeleting) {
//         typingText.textContent = currentWord.substring(0, charIndex - 1);
//         charIndex--;
//     } else {
//         typingText.textContent = currentWord.substring(0, charIndex + 1);
//         charIndex++;
//     }
    
//     if (!isDeleting && charIndex === currentWord.length) {
//         isDeleting = true;
//         setTimeout(typeWriter, 1500);
//     } else if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         wordIndex = (wordIndex + 1) % typingWords.length;
//         setTimeout(typeWriter, 500);
//     } else {
//         setTimeout(typeWriter, isDeleting ? 50 : 100);
//     }
// }

// typeWriter();

// // Particles.js Configuration
// particlesJS('particles-js', {
//     particles: {
//         number: {
//             value: 80,
//             density: {
//                 enable: true,
//                 value_area: 800
//             }
//         },
//         color: {
//             value: '#00D4FF'
//         },
//         shape: {
//             type: 'circle'
//         },
//         opacity: {
//             value: 0.5,
//             random: false
//         },
//         size: {
//             value: 3,
//             random: true
//         },
//         line_linked: {
//             enable: true,
//             distance: 150,
//             color: '#00D4FF',
//             opacity: 0.4,
//             width: 1
//         },
//         move: {
//             enable: true,
//             speed: 2,
//             direction: 'none',
//             random: false,
//             straight: false,
//             out_mode: 'out',
//             bounce: false
//         }
//     },
//     interactivity: {
//         detect_on: 'canvas',
//         events: {
//             onhover: {
//                 enable: true,
//                 mode: 'grab'
//             },
//             onclick: {
//                 enable: true,
//                 mode: 'push'
//             },
//             resize: true
//         },
//         modes: {
//             grab: {
//                 distance: 140,
//                 line_linked: {
//                     opacity: 1
//                 }
//             },
//             push: {
//                 particles_nb: 4
//             }
//         }
//     },
//     retina_detect: true
// });

// // Stats Counter Animation
// const statsSection = document.querySelector('.stats-grid');
// const statNumbers = document.querySelectorAll('.stat-number');
// let statsAnimated = false;

// function animateStats() {
//     statNumbers.forEach(stat => {
//         const target = parseInt(stat.getAttribute('data-count'));
//         const increment = target / 50;
//         let current = 0;
        
//         const updateCount = () => {
//             current += increment;
//             if (current < target) {
//                 stat.textContent = Math.floor(current) + '+';
//                 requestAnimationFrame(updateCount);
//             } else {
//                 stat.textContent = target + '+';
//             }
//         };
        
//         updateCount();
//     });
// }

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate stats when in view
            if (entry.target.classList.contains('stats-grid') && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto-scroll testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Manual testimonial navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        projectType: document.getElementById('projectType').value,
        message: document.getElementById('message').value
    };
    
    // Here you would normally send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitButton.style.background = 'var(--success)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
    }, 3000);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

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

// Add hover effects to interactive elements
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

// Smooth reveal animation for hero section
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero .animate-fade-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.querySelector('.footer p').innerHTML = `&copy; ${currentYear} Digital Craftsman. All rights reserved.`;

// Preload images for better performance
const images = document.querySelectorAll('img');
images.forEach(img => {
    const tempImg = new Image();
    tempImg.src = img.src;
});

// Mobile touch events for better UX
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    cursor.style.display = 'none';
    cursorTrail.style.display = 'none';
}

// Add error handling for Particles.js
if (typeof particlesJS === 'undefined') {
    console.warn('Particles.js not loaded. Falling back to CSS animation.');
    document.getElementById('particles-js').style.background = 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="1" fill="%2300D4FF" opacity="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23pattern)"/%3E%3C/svg%3E")';
}

// Initialize AOS-like scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});




// Enhanced Navigation JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('themeToggle');
    
    // Enhanced scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
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
    });
    
    // Magnetic button effect
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
    
    // Enhanced mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
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
    });
    
    // Enhanced typing effect
    const typingText = document.querySelector('.typing-text');
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
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
    
    // Enhanced particle configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: ['#00D4FF', '#FF0080', '#00FF88']
                },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00D4FF',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
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
    }
    
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-icon, .floating-emoji, .floating-cube');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 2;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;
            
            el.style.transform += ` translate(${xMove}px, ${yMove}px)`;
        });
    });
    
    // Smooth reveal animations
    const animateElements = document.querySelectorAll('.animate-fade-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize animations
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-fade-up').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 100);
        });
    }, 500);
});

// Add this to your existing script.js file

// Skill Bars Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
};

// Enhanced Stats Counter with formatting
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num + '+';
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = formatNumber(target);
                    }
                };
                
                updateCount();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });
};

// Profile Image Parallax Effect
const profileParallax = () => {
    const profileImage = document.querySelector('.profile-image img');
    
    if (profileImage) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            profileImage.style.transform = `scale(1.1) translate(${xPos}px, ${yPos}px)`;
        });
    }
};

// Tech Stack Tooltip
const initTechTooltips = () => {
    const techItems = document.querySelectorAll('.tech-item[data-tooltip]');
    
    techItems.forEach(item => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = item.getAttribute('data-tooltip');
        item.appendChild(tooltip);
        
        item.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(0)';
        });
    });
};

// Smooth Reveal for About Section Elements
const aboutSectionReveal = () => {
    const aboutElements = document.querySelectorAll('.about .animate-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    aboutElements.forEach(el => {
        revealObserver.observe(el);
    });
};

// Initialize all About section features
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateStats();
    profileParallax();
    initTechTooltips();
    aboutSectionReveal();
});

// Add floating animation to shapes
const floatingAnimation = () => {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 2}s`;
    });
};

floatingAnimation();
