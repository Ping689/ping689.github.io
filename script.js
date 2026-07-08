document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Theme Switcher (Dark / Light)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check saved preference or system default
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        bodyElement.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        bodyElement.classList.toggle('light-theme');
        const activeTheme = bodyElement.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', activeTheme);
    });

    // ==========================================================================
    // Mobile Drawer Menu Navigation
    // ==========================================================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        bodyElement.classList.toggle('no-scroll');
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInside = navMenu.contains(event.target) || mobileMenuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ==========================================================================
    // Sticky Header & Active Section Navigation Links
    // ==========================================================================
    const header = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on init

    // ==========================================================================
    // Projects Ingestion/Streaming/Cloud Filter
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class on filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card displays using transition opacity
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // Contact Form Validation & Submission Mock
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successStatus = document.getElementById('form-success');
    const failureStatus = document.getElementById('form-failure');

    const inputs = contactForm.querySelectorAll('input, textarea');

    const validateInput = (input) => {
        const formGroup = input.parentElement;
        let isValid = true;

        if (input.required && !input.value.trim()) {
            isValid = false;
        } else if (input.type === 'email' && input.value) {
            // Simple email regex pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailPattern.test(input.value);
        }

        if (isValid) {
            formGroup.classList.remove('invalid');
        } else {
            formGroup.classList.add('invalid');
        }

        return isValid;
    };

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        // Clear status alerts
        successStatus.style.display = 'none';
        failureStatus.style.display = 'none';

        if (isFormValid) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Mock server sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Envoi en cours...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                successStatus.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successStatus.style.display = 'none';
                }, 5000);
            }, 1200);
        } else {
            failureStatus.style.display = 'block';
            setTimeout(() => {
                failureStatus.style.display = 'none';
            }, 5000);
        }
    });

    // ==========================================================================
    // Intersection Observer for Scroll Reveal Animations
    // ==========================================================================
    const revealElements = document.querySelectorAll('section, .about-info, .about-skills, .project-card');
    
    // Add reveal class dynamically to elements
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
