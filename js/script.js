/* 
    Pas un jour ne passe sans que je me demande comment ce code fonctionne tourne sans erreur...
*/

document.addEventListener('DOMContentLoaded', function() {
    
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    function getAutoTheme() {
        const hour = new Date().getHours();
        return (hour >= 20 || hour < 7) ? 'dark' : 'light';
    }
    
    if (themeToggle) {
        const manualTheme = localStorage.getItem('theme-manual');
        const savedTheme = localStorage.getItem('theme');
        
        if (manualTheme === 'true' && savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        } else {
            const autoTheme = getAutoTheme();
            html.setAttribute('data-theme', autoTheme);
            localStorage.setItem('theme', autoTheme);
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('theme-manual', 'true');
            showThemeToast(`Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
        });
        
        setInterval(() => {
            if (localStorage.getItem('theme-manual') !== 'true') {
                const autoTheme = getAutoTheme();
                const currentTheme = html.getAttribute('data-theme');
                if (autoTheme !== currentTheme) {
                    html.setAttribute('data-theme', autoTheme);
                    localStorage.setItem('theme', autoTheme);
                }
            }
        }, 60000);
    }
    
    function showThemeToast(message) {
        const toast = document.createElement('div');
        toast.className = 'theme-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-size: 14px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    /*
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
    */
    
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
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Je vous répondrai bientôt.');
            this.reset();
        });
    }
    
    function initAppCarousel() {
        const appCarousels = document.querySelectorAll('.app-carousel');
        
        appCarousels.forEach(carousel => {
            const images = carousel.querySelectorAll('.app-screenshot');
            const prevBtn = carousel.querySelector('.app-carousel-prev');
            const nextBtn = carousel.querySelector('.app-carousel-next');
            const dotsContainer = carousel.querySelector('.app-carousel-dots');
            let currentIndex = 0;
            let loadedImages = 0;
            
            if (images.length === 0) return;
            
            images.forEach((img, index) => {
                img.addEventListener('load', () => {
                    loadedImages++;
                });
                
                img.addEventListener('error', () => {
                    console.log('Image non trouvée:', img.src);
                    img.style.display = 'none';
                    
                    // Si aucune image ne charge, afficher un message
                    if (loadedImages === 0 && index === images.length - 1) {
                        carousel.innerHTML = `
                            <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                                <i class="fas fa-images" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                                <p>Screenshots à venir prochainement...</p>
                            </div>
                        `;
                    }
                });
            });
            
            if (dotsContainer) {
                images.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = 'app-carousel-dot';
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }
            
            function updateCarousel(index) {
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });
                
                const dots = dotsContainer?.querySelectorAll('.app-carousel-dot');
                dots?.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            
            function goToSlide(index) {
                currentIndex = index;
                updateCarousel(currentIndex);
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % images.length;
                updateCarousel(currentIndex);
            }
            
            function prevSlide() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateCarousel(currentIndex);
            }
            
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            let autoplayInterval = setInterval(nextSlide, 4000);
            carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            carousel.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(nextSlide, 4000);
            });
        });
    }
    
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.setAttribute('aria-label', 'Retour en haut');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
            scrollBtn.style.boxShadow = 'var(--shadow-glow)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'translateY(0) scale(1)';
            scrollBtn.style.boxShadow = 'var(--shadow-lg)';
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    initAppCarousel();
    initScrollToTop();
    initRandomHeroImage();
    
    console.log('Portfolio JavaScript chargé avec succès ! 🚀');
});

function initRandomHeroImage() {
    const imageElement = document.getElementById('random-hero-image');
    
    if (!imageElement) {
        console.warn('⚠️ Élément image hero non trouvé');
        return;
    }
    
    const heroImages = [
        'assets/hero-images/image1.jpg',
        'assets/hero-images/image2.jpg',
        'assets/hero-images/image3.jpg',
        'assets/hero-images/image4.jpg',
        'assets/hero-images/image5.jpg',
        'assets/hero-images/image6.jpg',
        'assets/hero-images/image7.jpg',
        'assets/hero-images/image8.jpg',
        'assets/hero-images/image9.jpg',
        'assets/hero-images/image10.jpg',
        'assets/hero-images/image11.jpg',
        'assets/hero-images/image12.jpg',
        'assets/hero-images/image13.jpg',
        'assets/hero-images/image14.jpg',
        'assets/hero-images/image15.jpg',
        'assets/hero-images/image16.jpg',
        'assets/hero-images/image17.jpg'
    ];
    
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    const selectedImage = heroImages[randomIndex];
    
    console.log('🖼️ Image hero sélectionnée:', selectedImage, `(${randomIndex + 1}/17)`);
    
    imageElement.src = selectedImage;
    imageElement.onload = function() {
        console.log('✅ Image hero chargée avec succès !');
    };
    imageElement.onerror = function() {
        console.error('❌ Erreur de chargement de l\'image:', selectedImage);
    };
}