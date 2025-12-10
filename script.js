// script.js

// debounce helper
function debounce(fn, wait = 30) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Update toggle icon based on current theme
    function updateToggleIcon(theme) {
        if (!themeToggle) return;
        if (theme === 'light') {
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    }
    updateToggleIcon(savedTheme);

    // Theme toggle event listener
    themeToggle?.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
    });

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll handler
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const heroImage = document.querySelector('.hero-image');

    function onScrollHandler() {
        const scrollY = window.pageYOffset;

        // Navbar shadow
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.boxShadow = 'var(--shadow-subtle)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Subtle parallax on hero image
        if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    }

    window.addEventListener('scroll', debounce(onScrollHandler, 30), { passive: true });
    onScrollHandler();

    // Skill bars animation
    const observerOptions = { threshold: 0.4, rootMargin: '0px' };
    const skillObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 150);
                });
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            // Re-trigger stagger for visible items
            setTimeout(() => {
                const visibleItems = document.querySelectorAll('.portfolio-item[style="display: block;"]');
                visibleItems.forEach((item, index) => {
                    item.classList.remove('visible');
                    setTimeout(() => item.classList.add('visible'), index * 100);
                });
            }, 100);
        });
    });

    // Fade-in and stagger on scroll
    const fadeElements = document.querySelectorAll('.fade-wrapper');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger children if present
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => item.classList.add('visible'), index * 150);
                });
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Gallery functionality (preserved with smooth transitions)
    const galleryModal = document.getElementById('galleryModal');
    const galleryTitle = document.querySelector('.gallery-title');
    const galleryScrollWrapper = document.getElementById('galleryScrollWrapper');
    const closeGallery = document.getElementById('closeGallery');
    const scrollPrev = document.getElementById('scrollPrev');
    const scrollNext = document.getElementById('scrollNext');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');

    const galleries = {
        'E-commerce Website UI': [
            'received_820675560169440.png',
            'received_1104962174675907.jpeg',
            'received_1169530970962850.png',
            'received_950050846808394.png',
            'received_1528031787830413.png',
            'received_489550737273324.jpeg',
            'received_1170056934226368.png',
            'received_1210363136755861.png',
            'received_923047729656099.png'
        ],
        'University Social Media Website UI': [
            'photo_1_2025-11-22_19-28-03.jpg',
            'photo_2_2025-11-22_19-28-03.jpg',
            'photo_3_2025-11-22_19-28-03.jpg',
            'photo_4_2025-11-22_19-28-03.jpg',
            'photo_5_2025-11-22_19-28-03.jpg',
            'photo_6_2025-11-22_19-28-03.jpg',
            'photo_7_2025-11-22_19-28-03.jpg'
        ],
        'Social Media Posters': [
            'Frame 20.png',
            'Frame 21.png',
            'Frame 22.png',
            'Frame 23.png',
            'Frame 24.png',
            'Frame 25.png',
            'Frame 26.png',
            'Frame 27.png',
            'Frame 28.png',
            'Frame 29.png',
            '569464311_122098123329088679_426215371627927437_n.jpg',
            '572483982_122098123371088679_3891104577461017199_n.jpg',
            '570093785_122098123425088679_1454532693680714952_n.jpg',
            '569419301_122098123473088679_7612989317585661060_n.jpg',
            '572964717_122098123521088679_4956605678581720790_n.jpg',
            '571186591_122098123575088679_8624677070516070722_n.jpg',
            '570134135_122098123683088679_1521235448282965028_n.jpg',
            '571289162_122098123869088679_1276910551287427533_n.jpg',
            '570813435_122098123941088679_7749528958575012647_n.jpg'
        ],
        'Product Design': [
            'Document5_upscayl_4x_digital-art-4x.png'
        ]
    };

    function createGalleryItems(images, title) {
        if (!galleryScrollWrapper) return;
        galleryScrollWrapper.innerHTML = '';
        images.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${src}" alt="${title} ${index + 1}" loading="lazy">
                <div class="gallery-item-number">${index + 1}/${images.length}</div>
            `;
            galleryScrollWrapper.appendChild(item);
        });
        if (totalImagesSpan) totalImagesSpan.textContent = images.length;
    }

    function openGallery(title) {
        const images = galleries[title] || [];
        if (images.length === 0) return;
        createGalleryItems(images, title);
        galleryTitle.textContent = title;
        galleryModal?.classList.add('active');
        galleryModal?.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => galleryScrollWrapper?.focus(), 50);
        updateCurrentImage();
    }

    function closeGalleryModal() {
        galleryModal?.classList.remove('active');
        galleryModal?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.querySelector('.portfolio-item[data-category="graphic"]')?.focus();
    }

    function scrollGallery(direction) {
        if (!galleryScrollWrapper) return;
        const scrollAmount = galleryScrollWrapper.clientWidth * 0.9;
        galleryScrollWrapper.scrollBy({ left: direction === 'prev' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }

    function updateCurrentImage() {
        if (!galleryScrollWrapper || !currentImageSpan) return;
        const scrollLeft = galleryScrollWrapper.scrollLeft;
        const itemWidth = galleryScrollWrapper.querySelector('.gallery-item')?.clientWidth + 32 || 420;
        const currentIndex = Math.round(scrollLeft / itemWidth) + 1;
        currentImageSpan.textContent = Math.min(Math.max(currentIndex, 1), parseInt(totalImagesSpan.textContent) || 0);
    }

    closeGallery?.addEventListener('click', closeGalleryModal);
    scrollPrev?.addEventListener('click', () => scrollGallery('prev'));
    scrollNext?.addEventListener('click', () => scrollGallery('next'));
    galleryModal?.addEventListener('click', (e) => { if (e.target === galleryModal) closeGalleryModal(); });
    galleryScrollWrapper?.addEventListener('scroll', debounce(updateCurrentImage, 100));

    document.addEventListener('keydown', (e) => {
        if (galleryModal?.classList.contains('active')) {
            if (e.key === 'Escape') closeGalleryModal();
            if (e.key === 'ArrowLeft') scrollGallery('prev');
            if (e.key === 'ArrowRight') scrollGallery('next');
        }
    });

    // Open gallery
    document.querySelectorAll('.open-gallery').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const title = link.closest('.portfolio-overlay').querySelector('h3').textContent;
            openGallery(title);
        });
    });

    // EmailJS
    const EMAILJS_SERVICE_ID = 'service_kukdq6w';
    const EMAILJS_TEMPLATE_ID = 'template_lavlj3f';
    const EMAILJS_PUBLIC_KEY = 'YQ62fc-QSPhK1mY3j';

    if (window.emailjs && typeof emailjs.init === 'function') {
        try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (err) { console.warn('EmailJS init failed', err); }
    } else {
        console.warn('EmailJS not loaded.');
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton?.textContent || 'Send Message';
        let messageElement = contactForm.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }

        function showMessage(text, isError = false) {
            messageElement.textContent = text;
            messageElement.className = `form-message ${isError ? 'error' : 'success'}`;
            messageElement.style.display = 'block';
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => { messageElement.style.display = 'none'; }, 5000);
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
                showMessage('Please configure EmailJS credentials in script.js', true);
                return;
            }

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name || !email || !subject || !message || !emailRegex.test(email)) {
                showMessage('Please fill in all fields correctly (valid email required)', true);
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = 'Sending.';
            messageElement.style.display = 'none';

            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'aggoun.akram@univ-khenchela.dz'
            };

            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                showMessage(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, false);
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS Error:', error);
                showMessage('Sorry, there was an error sending your message. Please try again later or contact me directly via email.', true);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Dynamic copyright
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Reduced-motion respect
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => el.style.transitionDuration = '0s');
    }
});