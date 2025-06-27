// ==========================================
// Portfolio JavaScript - Tristan Devaux
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Theme Switcher (code existant)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // ==========================================
    // Image Carousel avec vos mèmes
    // ==========================================
    let currentImageIndex = 0;
    let carouselInterval;
    let carouselImages = [];
    
    // Charger la configuration des images
    async function loadImagesConfig() {
        try {
            const response = await fetch('assets/images/images-config.json');
            const config = await response.json();
            return config.images;
        } catch (error) {
            console.log('Config JSON non trouvé, utilisation de la liste par défaut');
            // Liste de fallback avec vos images
            return [
                {
                    src: 'assets/images/2024-coder-sur-papier.jpg',
                    caption: 'Quand on code encore sur papier en 2024... 📝'
                },
                {
                    src: 'assets/images/anakin-instance-aws.jpg',
                    caption: 'Anakin découvre les coûts AWS... 💸'
                },
                {
                    src: 'assets/images/batman-frontend-backend.jpg',
                    caption: 'Batman choisit son camp : Frontend ou Backend ? 🦇'
                },
                {
                    src: 'assets/images/bug-fin-de-journee-fck.jpg',
                    caption: 'Ce moment où un bug apparaît à 17h59... 😤'
                },
                {
                    src: 'assets/images/chmod-r-777-meme.jpg',
                    caption: 'chmod -R 777 : la solution universelle ! 🔓'
                },
                {
                    src: 'assets/images/console-build-snoop-doggy-dog.jpg',
                    caption: 'Console log et chill avec Snoop 🎵'
                },
                {
                    src: 'assets/images/debug-console-log-border-red.jpg',
                    caption: 'Debug avec console.log et border: 1px solid red 🔍'
                },
                {
                    src: 'assets/images/dev-senior-regex-chatgpt.jpg',
                    caption: 'Dev senior vs regex vs ChatGPT 🤔'
                },
                {
                    src: 'assets/images/node_modules-olive-js.jpg',
                    caption: 'Le dossier node_modules et ses 500 000 dépendances 📁'
                },
                {
                    src: 'assets/images/planetes-morts-javascript.jpg',
                    caption: 'JavaScript a tué plus de planètes que l\'Empire 🌍'
                },
                {
                    src: 'assets/images/prod-tests-unitaires-philippe-etchebest.jpg',
                    caption: 'Prod sans tests unitaires = Philippe Etchebest en cuisine 👨‍🍳'
                },
                {
                    src: 'assets/images/salt-bae-css-important.jpg',
                    caption: 'Quand tu saupoudres du !important partout 🧂'
                },
                {
                    src: 'assets/images/warnings-zero-erreur-bob-eponge.jpg',
                    caption: '0 erreur mais 47 warnings... Bob l\'éponge approuve 🧽'
                },
                {
                    src: 'assets/images/mep-vendredi-trump-order.jpg',
                    caption: 'MEP le vendredi... Ordre présidentiel ! 🚀'
                },
                {
                    src: 'assets/images/utilisateurs-linux-public-dicaprio.jpg',
                    caption: 'Les utilisateurs Linux face au grand public 🐧'
                }
            ];
        }
    }
    
    async function initializeCarousel() {
        const carouselImage = document.getElementById('carouselImage');
        const imageCaption = document.getElementById('imageCaption');
        const carouselDots = document.getElementById('carouselDots');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (!carouselImage) return;
        
        // Charger les images
        carouselImages = await loadImagesConfig();
        
        // Image aléatoire au chargement
        currentImageIndex = Math.floor(Math.random() * carouselImages.length);
        
        // Créer les dots
        carouselDots.innerHTML = '';
        carouselImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (index === currentImageIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        // Fonction pour changer d'image
        function updateImage(index) {
            const image = carouselImages[index];
            carouselImage.classList.remove('active', 'slide-in');
            
            setTimeout(() => {
                carouselImage.src = image.src;
                carouselImage.alt = image.caption;
                imageCaption.textContent = image.caption;
                carouselImage.classList.add('active', 'slide-in');
                
                // Mettre à jour les dots
                document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }, 100);
        }
        
        // Fonction pour aller à une slide spécifique
        function goToSlide(index) {
            currentImageIndex = index;
            updateImage(currentImageIndex);
            resetAutoplay();
        }
        
        // Navigation
        function nextSlide() {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            updateImage(currentImageIndex);
        }
        
        function prevSlide() {
            currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
            updateImage(currentImageIndex);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
        
        // Gestion des erreurs d'images
        carouselImage.addEventListener('error', function() {
            console.log('Erreur de chargement pour:', this.src);
            // Passer à l'image suivante en cas d'erreur
            nextSlide();
        });
        
        // Autoplay
        function startAutoplay() {
            carouselInterval = setInterval(nextSlide, 5000); // Change toutes les 5 secondes
        }
        
        function resetAutoplay() {
            clearInterval(carouselInterval);
            startAutoplay();
        }
        
        // Pause autoplay au hover
        const carousel = document.getElementById('imageCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
            carousel.addEventListener('mouseleave', startAutoplay);
        }
        
        // Support du clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoplay();
            }
        });
        
        // Initialiser avec la première image
        updateImage(currentImageIndex);
        startAutoplay();
        
        console.log('Carrousel initialisé avec', carouselImages.length, 'mèmes de dev !');
    }
    
    // ==========================================
    // Navigation et autres fonctionnalités (code existant)
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Navigation active link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length > 0 && sections.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.offsetHeight;
                if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Je vous répondrai bientôt.');
            this.reset();
        });
    }
    
    // Initialiser le carrousel
    initializeCarousel();
    
    console.log('Portfolio JavaScript chargé avec succès ! 🚀');
});