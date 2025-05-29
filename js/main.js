// ==========================================
// Portfolio Cybersécurité - JavaScript Principal
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Variables globales
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ==========================================
    // Navigation - Scroll Effect
    // ==========================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // ==========================================
    // Navigation - Mobile Menu
    // ==========================================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ==========================================
    // Navigation - Active Link
    // ==========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // ==========================================
    // Smooth Scroll pour les liens internes
    // ==========================================
    function handleSmoothScroll(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        }
    }
    
    // ==========================================
    // Animation au scroll
    // ==========================================
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animationDelay = '0.1s';
                element.style.opacity = '1';
            }
        });
    }
    
    // ==========================================
    // Animation typing pour le terminal
    // ==========================================
    function animateTerminalTyping() {
        const typingElements = document.querySelectorAll('.typing');
        
        typingElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typingInterval = setInterval(() => {
                    element.textContent += text.charAt(i);
                    i++;
                    if (i > text.length) {
                        clearInterval(typingInterval);
                    }
                }, 100);
            }, index * 2000);
        });
    }
    
    // ==========================================
    // Animation des barres de progression
    // ==========================================
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // ==========================================
    // Animation des cartes projet
    // ==========================================
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // ==========================================
    // Formulaire de contact
    // ==========================================
    function handleContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Récupération des données du formulaire
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Animation de soumission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                // Simulation d'envoi (remplacer par vraie logique d'envoi)
                setTimeout(() => {
                    submitBtn.textContent = 'Message envoyé !';
                    submitBtn.style.background = 'var(--primary-color)';
                    
                    // Reset après 3 secondes
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        this.reset();
                        showToast('Message envoyé avec succès !', 'success');
                    }, 3000);
                }, 2000);
                
                console.log('Formulaire soumis:', formObject);
            });
        }
    }
    
    // ==========================================
    // Effet de parallaxe pour le hero
    // ==========================================
    function handleParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        if (hero && window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }
    
    // ==========================================
    // Gestion du mode sombre (optionnel)
    // ==========================================
    function initThemeToggle() {
        // Vérifier si un toggle existe dans le HTML
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                localStorage.setItem('theme', 
                    document.body.classList.contains('light-theme') ? 'light' : 'dark'
                );
            });
            
            // Appliquer le thème sauvegardé
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
            }
        }
    }
    
    // ==========================================
    // Effet de machine à écrire pour le titre
    // ==========================================
    function initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typing-text');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i > text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        });
    }
    
    // ==========================================
    // Système de notification toast
    // ==========================================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-dark);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            toast.style.borderLeftColor = 'var(--primary-color)';
        } else if (type === 'error') {
            toast.style.borderLeftColor = 'var(--secondary-color)';
        }
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // ==========================================
    // Animation des éléments au chargement
    // ==========================================
    function initLoadAnimations() {
        // Animation du logo
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                logo.style.transition = 'all 0.6s ease';
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animation des éléments de navigation
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    }
    
    // ==========================================
    // Gestion des raccourcis clavier
    // ==========================================
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Échapper pour fermer le menu mobile
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
            
            // Ctrl + K pour focus sur le premier input du formulaire
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                const firstInput = document.querySelector('input[type="text"], input[type="email"]');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        });
    }
    
    // ==========================================
    // Détection de performance et optimisations
    // ==========================================
    function initPerformanceOptimizations() {
        // Désactiver les animations sur les appareils lents
        const isSlowDevice = navigator.hardwareConcurrency < 4 || 
                             navigator.deviceMemory < 4;
        
        if (isSlowDevice) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
        
        // Préchargement des images importantes
        const importantImages = [
            // Ajouter ici les URLs des images importantes
        ];
        
        importantImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // ==========================================
    // Animation des statistiques (compteur)
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current) + suffix;
                    }, 30);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.7 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // ==========================================
    // Gestion des erreurs JavaScript
    // ==========================================
    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Erreur JavaScript:', e.error);
            // En production, on pourrait envoyer les erreurs à un service de monitoring
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rejetée:', e.reason);
        });
    }
    
    // ==========================================
    // Initialisation de tous les événements
    // ==========================================
    function initEventListeners() {
        // Événements de scroll
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            updateActiveNavLink();
            handleScrollAnimations();
        });
        
        // Menu mobile
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }
        
        // Navigation smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
        
        // Fermeture du menu mobile au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Fermeture du menu mobile au clic en dehors
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
    
    // ==========================================
    // Fonction d'initialisation principale
    // ==========================================
    function init() {
        console.log('🚀 Portfolio Cybersécurité - Initialisation...');
        
        // Initialisation des modules
        initEventListeners();
        initLoadAnimations();
        initKeyboardShortcuts();
        initPerformanceOptimizations();
        initErrorHandling();
        initThemeToggle();
        
        // Animations
        setTimeout(() => {
            initTypewriterEffect();
            animateTerminalTyping();
            animateProgressBars();
            animateProjectCards();
            animateCounters();
        }, 500);
        
        // Formulaire
        handleContactForm();
        
        // Effets visuels
        handleParallaxEffect();
        
        console.log('✅ Portfolio initialisé avec succès !');
        
        // Animation de bienvenue
        setTimeout(() => {
            showToast('Portfolio chargé ! Explorez mes compétences en cybersécurité 🔒', 'success');
        }, 1000);
    }
    
    // ==========================================
    // Démarrage de l'application
    // ==========================================
    init();
    
    // ==========================================
    // Exposition de fonctions utiles globalement
    // ==========================================
    window.portfolioApp = {
        showToast,
        closeMobileMenu,
        initTypewriterEffect
    };
});

// ==========================================
// Service Worker pour le cache (optionnel)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}