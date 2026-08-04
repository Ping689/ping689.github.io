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
    // Language Switcher (FR / EN)
    // ==========================================================================
    const langToggleBtn = document.getElementById('lang-toggle');
    
    // Check saved preference or system/document default
    let savedLang = localStorage.getItem('lang');
    if (!savedLang) {
        const systemLang = navigator.language || navigator.userLanguage;
        savedLang = systemLang.startsWith('en') ? 'en' : 'fr';
    }

    const setLanguage = (lang) => {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
        }
        updatePlaceholders(lang);
    };

    const updatePlaceholders = (lang) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.querySelector('.btn-submit');
        const successStatus = document.getElementById('form-success');
        const failureStatus = document.getElementById('form-failure');

        if (lang === 'en') {
            if (nameInput) nameInput.placeholder = 'Your full name';
            if (emailInput) emailInput.placeholder = 'name@example.com';
            if (messageInput) messageInput.placeholder = 'Your project, job position, or proposal...';
            if (submitBtn) {
                submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
            }
            if (successStatus) successStatus.textContent = 'Your message has been sent successfully!';
            if (failureStatus) failureStatus.textContent = 'An error occurred while sending. Please try again.';
        } else {
            if (nameInput) nameInput.placeholder = 'Votre nom et prénom';
            if (emailInput) emailInput.placeholder = 'nom@exemple.com';
            if (messageInput) messageInput.placeholder = 'Votre projet, poste ou proposition...';
            if (submitBtn) {
                submitBtn.innerHTML = 'Envoyer le message <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
            }
            if (successStatus) successStatus.textContent = 'Votre message a été envoyé avec succès !';
            if (failureStatus) failureStatus.textContent = 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.';
        }
    };

    // Initialize Language
    setLanguage(savedLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang');
            const nextLang = currentLang === 'fr' ? 'en' : 'fr';
            setLanguage(nextLang);
        });
    }

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
            const currentLang = document.documentElement.getAttribute('lang');
            
            // Mock server sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = currentLang === 'en' ? 'Sending...' : 'Envoi en cours...';

            setTimeout(() => {
                submitBtn.disabled = false;
                updatePlaceholders(currentLang);
                
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
