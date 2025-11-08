// ==========================================
// Portfolio JavaScript - Tristan Devaux
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Theme Switcher avec thème automatique selon l'heure
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Fonction pour déterminer le thème selon l'heure
    function getAutoTheme() {
        const hour = new Date().getHours();
        // Mode sombre entre 20h et 7h
        return (hour >= 20 || hour < 7) ? 'dark' : 'light';
    }
    
    if (themeToggle) {
        // Vérifier si l'utilisateur a une préférence manuelle
        const manualTheme = localStorage.getItem('theme-manual');
        const savedTheme = localStorage.getItem('theme');
        
        if (manualTheme === 'true' && savedTheme) {
            // L'utilisateur a choisi manuellement, respecter son choix
            html.setAttribute('data-theme', savedTheme);
        } else {
            // Appliquer le thème automatique
            const autoTheme = getAutoTheme();
            html.setAttribute('data-theme', autoTheme);
            localStorage.setItem('theme', autoTheme);
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            localStorage.setItem('theme-manual', 'true'); // Marquer comme choix manuel
            
            // Afficher un petit message
            showThemeToast(`Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
        });
        
        // Vérifier toutes les heures si on doit changer le thème auto
        setInterval(() => {
            if (localStorage.getItem('theme-manual') !== 'true') {
                const autoTheme = getAutoTheme();
                const currentTheme = html.getAttribute('data-theme');
                if (autoTheme !== currentTheme) {
                    html.setAttribute('data-theme', autoTheme);
                    localStorage.setItem('theme', autoTheme);
                }
            }
        }, 60000); // Vérifier toutes les minutes
    }
    
    // Toast pour les changements de thème
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
    
    // ==========================================
    // Image Carousel avec vos mèmes (CODE COMMENTÉ - HTML manquant)
    // ==========================================
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
    
    // Initialiser le carrousel de mèmes (commenté - HTML manquant)
    // initializeCarousel();
    
    // ==========================================
    // GitHub Activity Integration
    // ==========================================
    async function loadGitHubActivity() {
        const githubContainer = document.getElementById('github-activity');
        if (!githubContainer) return;
        
        try {
            const username = 'Potaaaaaaaaaaaato'; // Ton username GitHub
            const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`);
            const events = await response.json();
            
            if (events.length === 0) {
                githubContainer.innerHTML = '<p>Aucune activité récente</p>';
                return;
            }
            
            let html = '<div class="github-events">';
            
            events.slice(0, 5).forEach(event => {
                const date = new Date(event.created_at);
                const timeAgo = getTimeAgo(date);
                let eventText = '';
                let icon = 'fa-code';
                
                switch(event.type) {
                    case 'PushEvent':
                        const commits = event.payload.commits?.length || 0;
                        eventText = `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${event.repo.name}`;
                        icon = 'fa-code-branch';
                        break;
                    case 'CreateEvent':
                        eventText = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                        icon = 'fa-plus-circle';
                        break;
                    case 'IssuesEvent':
                        eventText = `${event.payload.action} issue in ${event.repo.name}`;
                        icon = 'fa-exclamation-circle';
                        break;
                    case 'PullRequestEvent':
                        eventText = `${event.payload.action} pull request in ${event.repo.name}`;
                        icon = 'fa-code-pull-request';
                        break;
                    case 'WatchEvent':
                        eventText = `Starred ${event.repo.name}`;
                        icon = 'fa-star';
                        break;
                    case 'ForkEvent':
                        eventText = `Forked ${event.repo.name}`;
                        icon = 'fa-code-fork';
                        break;
                    default:
                        eventText = `Activity in ${event.repo.name}`;
                }
                
                html += `
                    <div class="github-event">
                        <div class="github-event-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="github-event-content">
                            <p class="github-event-text">${eventText}</p>
                            <span class="github-event-time">${timeAgo}</span>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            html += `<a href="https://github.com/Potaaaaaaaaaaaato" target="_blank" class="github-link">
                <i class="fab fa-github"></i> Voir tout sur GitHub
            </a>`;
            
            githubContainer.innerHTML = html;
            
        } catch (error) {
            console.error('Erreur lors du chargement de l\'activité GitHub:', error);
            githubContainer.innerHTML = `
                <p style="color: var(--text-muted); font-size: 14px;">
                    <i class="fab fa-github"></i> 
                    <a href="https://github.com/Potaaaaaaaaaaaato" target="_blank" style="color: var(--primary-color);">
                        Voir mon activité sur GitHub
                    </a>
                </p>
            `;
        }
    }
    
    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        
        if (interval > 1) return Math.floor(interval) + " ans";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " mois";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " jours";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " heures";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes";
        return Math.floor(seconds) + " secondes";
    }
    
    // ==========================================
    // App Screenshots Carousel
    // ==========================================
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
            
            // Vérifier si les images existent
            images.forEach((img, index) => {
                img.addEventListener('load', () => {
                    loadedImages++;
                });
                
                img.addEventListener('error', () => {
                    console.log('Image non trouvée:', img.src);
                    // Masquer l'image qui ne charge pas
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
            
            // Créer les dots
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
            
            // Auto-play (optionnel)
            let autoplayInterval = setInterval(nextSlide, 4000);
            carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            carousel.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(nextSlide, 4000);
            });
        });
    }
    
    // ==========================================
    // Bouton Retour en Haut
    // ==========================================
    function initScrollToTop() {
        // Créer le bouton
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
        
        // Afficher/masquer selon le scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        // Effet hover
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
            scrollBtn.style.boxShadow = 'var(--shadow-glow)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'translateY(0) scale(1)';
            scrollBtn.style.boxShadow = 'var(--shadow-lg)';
        });
        
        // Scroll au clic
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Charger l'activité GitHub
    loadGitHubActivity();
    
    // Initialiser le carousel d'apps
    initAppCarousel();
    
    // Initialiser le bouton scroll to top
    initScrollToTop();
    
    // Initialiser le formulaire de contact Brevo
    initContactForm();
    
    console.log('Portfolio JavaScript chargé avec succès ! 🚀');
});

// ==========================================
// Formulaire de Contact avec API Brevo
// ==========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const messageText = document.getElementById('message-text');
    const submitBtn = document.getElementById('submit-btn');
    
    // ⚠️ IMPORTANT : Remplacez cette clé par votre clé API Brevo réelle
    const BREVO_API_KEY = 'CLE_API_BREVO';
    const SENDER_EMAIL = 'bonjour@tristan-devaux.fr';
    const RECIPIENT_EMAIL = 'tristan@tristan-devaux.fr';
    
    if (!contactForm) {
        console.warn('⚠️ Formulaire de contact non trouvé');
        return;
    }
    
    console.log('✅ Formulaire de contact initialisé avec Brevo');
    console.log('📧 Expéditeur:', SENDER_EMAIL);
    console.log('📬 Destinataire:', RECIPIENT_EMAIL);
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📤 Tentative d\'envoi du formulaire...');
        
        // Récupérer les valeurs du formulaire
        const nom = document.getElementById('contact-nom').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const sujet = document.getElementById('contact-sujet').value.trim() || 'Nouveau message depuis le portfolio';
        const message = document.getElementById('contact-message').value.trim();
        
        // Validation basique
        if (!nom || !email || !message) {
            showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        // Validation email
        if (!isValidEmail(email)) {
            showFormMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        console.log('🔄 Envoi vers Brevo API...');
        console.log('Données:', { nom, email, sujet, destinataire: RECIPIENT_EMAIL });
        
        try {
            // Préparer les données pour l'API Brevo
            const emailData = {
                sender: {
                    name: nom,
                    email: SENDER_EMAIL // Doit être une adresse vérifiée dans Brevo
                },
                to: [
                    {
                        email: RECIPIENT_EMAIL,
                        name: "Tristan Devaux"
                    }
                ],
                subject: `[Portfolio] ${sujet}`,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #ff8cc8; border-bottom: 2px solid #ff8cc8; padding-bottom: 10px;">
                            Nouveau message depuis votre portfolio
                        </h2>
                        
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
                            <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                            <p><strong>Sujet :</strong> ${escapeHtml(sujet)}</p>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-left: 4px solid #ff8cc8; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Message :</h3>
                            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                            <p>Message envoyé depuis votre portfolio le ${new Date().toLocaleString('fr-FR')}</p>
                        </div>
                    </div>
                `,
                replyTo: {
                    email: email,
                    name: nom
                }
            };
            
            // Envoyer via l'API Brevo
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });
            
            if (response.ok) {
                // Succès
                const responseData = await response.json();
                console.log('✅ Email envoyé avec succès:', responseData);
                showFormMessage('✅ Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
                contactForm.reset();
                
                // Réactiver le bouton après 3 secondes
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                }, 3000);
            } else {
                // Erreur de l'API
                const errorData = await response.json();
                console.error('❌ Erreur API Brevo:', errorData);
                console.error('Status:', response.status);
                
                // Message d'erreur détaillé
                let errorMessage = '❌ Erreur lors de l\'envoi. ';
                
                if (response.status === 401) {
                    errorMessage += 'Clé API invalide. Vérifiez votre clé dans le fichier script.js';
                } else if (response.status === 400) {
                    if (errorData.message && errorData.message.includes('sender')) {
                        errorMessage += 'L\'adresse d\'envoi "bonjour@tristan-devaux.fr" n\'est pas vérifiée dans Brevo. Consultez BREVO_CONFIG.md pour la vérifier.';
                    } else {
                        errorMessage += `Erreur de validation : ${errorData.message || 'Données invalides'}`;
                    }
                } else if (response.status === 403) {
                    errorMessage += 'Accès refusé. Vérifiez les permissions de votre clé API.';
                } else {
                    errorMessage += `Code erreur ${response.status}. Consultez la console (F12) pour plus de détails.`;
                }
                
                showFormMessage(errorMessage, 'error');
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
            }
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            showFormMessage('❌ Une erreur est survenue. Veuillez vérifier votre connexion et réessayer.', 'error');
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        }
    });
    
    // Fonction pour afficher les messages de feedback
    function showFormMessage(text, type) {
        messageText.textContent = text;
        formMessage.className = 'form-message show ' + type;
        
        // Changer l'icône selon le type
        const icon = formMessage.querySelector('i');
        if (type === 'success') {
            icon.className = 'fas fa-check-circle';
        } else {
            icon.className = 'fas fa-exclamation-circle';
        }
        
        // Auto-masquer après 7 secondes
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 7000);
        
        // Scroller vers le message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Validation email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Échapper le HTML pour éviter les XSS
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}