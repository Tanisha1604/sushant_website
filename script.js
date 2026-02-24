// ===== PAGE LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 800);
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Open clicked (if it wasn't already open)
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== VIDEO THUMBNAIL CLICK =====
const videoWrapper = document.querySelector('.video-wrapper');
if (videoWrapper) {
    videoWrapper.addEventListener('click', () => {
        const videoId = videoWrapper.dataset.videoId;
        if (videoId) {
            videoWrapper.innerHTML = `
        <iframe 
          width="100%" 
          style="aspect-ratio:16/9;border:none;border-radius:inherit;" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>`;
        }
    });
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number, .highlight-card .number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
    const text = el.textContent;
    const match = text.match(/^([\d,]+)/);
    if (!match) return;

    const target = parseInt(match[1].replace(/,/g, ''));
    const suffix = text.replace(match[1], '');
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        if (target >= 1000) {
            el.textContent = current.toLocaleString('en-IN') + suffix;
        } else {
            el.textContent = current + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = text;
        }
    }

    requestAnimationFrame(update);
}

// ===== FLOATING PARTICLES IN HERO =====
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const particleCount = 30;
    const colors = ['#FF6B35', '#FFD700', '#a855f7', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const leftPos = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${leftPos}%;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

        container.appendChild(particle);
    }
}

createParticles();

// ===== TILT EFFECT ON COURSE CARD (desktop only) =====
const courseCard = document.querySelector('.course-card');
if (courseCard && window.innerWidth > 768) {
    courseCard.addEventListener('mousemove', (e) => {
        const rect = courseCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        courseCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    courseCard.addEventListener('mouseleave', () => {
        courseCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ===== PARALLAX ON SCROLL FOR HERO =====
const heroParallax = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        if (heroParallax) {
            heroParallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroParallax.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
        }
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHT ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinksAll.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = '#FF6B35';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ===== LANGUAGE TOGGLE (MARATHI ↔ ENGLISH) =====
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'mr';

// Translation map: CSS selector → { mr, en }
const translations = [
    // Nav links
    { sel: '.nav-links li:nth-child(1) a', mr: 'होम', en: 'Home' },
    { sel: '.nav-links li:nth-child(2) a', mr: 'माझ्याबद्दल', en: 'About' },
    { sel: '.nav-links li:nth-child(3) a', mr: 'व्हिडिओ', en: 'Video' },
    { sel: '.nav-links li:nth-child(4) a', mr: 'कोर्स', en: 'Course' },
    { sel: '.nav-links li:nth-child(5) a', mr: 'ब्रँड्स', en: 'Brands' },
    { sel: '.nav-cta', mr: 'कोर्स जॉइन करा', en: 'Join Course' },

    // Hero
    { sel: '.badge-text', mr: 'नवीन कोर्स लाँच!', en: 'New Course Launch!' },
    { sel: '.hero-line-1', mr: 'तुमच्यातील क्रिएटरला', en: 'Give Your Inner Creator' },
    { sel: '.hero-line-2', mr: 'प्रोफेशनल दिशा द्या', en: 'A Professional Direction' },
    { sel: '.hero .subtitle', mr: 'मराठीतून शिका कंटेंट तयार करणं — व्हिडिओ प्रोडक्शन, एडिटिंग, ब्रँड डील्स आणि बरंच काही. भारतातील टॉप ब्रँड्ससोबत काम केलेल्या सुशांत घाडगे यांच्याकडून थेट शिका.', en: 'Learn content creation in Marathi — video production, editing, brand deals and much more. Learn directly from Sushant Ghadge who has worked with India\'s top brands.' },

    // About section header
    { sel: '.about .section-title', mr: 'सुशांत घाडगे कोण आहेत?', en: 'Who is Sushant Ghadge?' },
    { sel: '.about .section-subtitle', mr: 'मराठी कंटेंट क्रिएशन इंडस्ट्रीतील सर्वात प्रभावशाली नावांपैकी एक', en: 'One of the most influential names in the Marathi content creation industry' },
    { sel: '.about-lead', mr: 'सुशांत घाडगे — एक अभिनेता, फिल्ममेकर, आणि मराठी डिजिटल कंटेंटमधील अग्रगण्य नाव. Amazon Prime Video वरील <strong>"Sharmajee Ki Beti"</strong> मध्ये अभिनय केलेल्या सुशांतने कंटेंट क्रिएशनच्या जगात स्वतःचं एक वेगळं स्थान निर्माण केलं आहे.', en: 'Sushant Ghadge — an actor, filmmaker, and a leading name in Marathi digital content. Having acted in <strong>"Sharmajee Ki Beti"</strong> on Amazon Prime Video, Sushant has carved a unique niche in the world of content creation.' },
    { sel: '.about-intro-text p:nth-of-type(2)', mr: 'गेल्या काही वर्षांत त्यांनी <strong>1,000 पेक्षा जास्त व्हिडिओज</strong> तयार करून <strong>2 बिलियन+ व्ह्यूज</strong> मिळवले आहेत. भारतातील सर्वात मोठ्या ब्रँड्ससोबत — Prime Video, Disney Hotstar, Zomato, Cred, Realme सोबत यशस्वी कोलॅबोरेशन्स केले आहेत.', en: 'Over the past few years, he has created <strong>over 1,000 videos</strong> and garnered <strong>2 billion+ views</strong>. He has successfully collaborated with some of India\'s biggest brands — Prime Video, Disney Hotstar, Zomato, Cred, Realme.' },
    { sel: '.about-intro-text p:nth-of-type(3)', mr: '500K+ लोकांचा कम्युनिटी उभा करून सुशांत आज हजारो तरुणांना कंटेंट क्रिएशनची प्रोफेशनल दिशा देत आहेत. आता ते त्यांचा संपूर्ण अनुभव या कोर्सद्वारे तुमच्यापर्यंत आणत आहेत.', en: 'Having built a community of 500K+ people, Sushant is now providing professional direction in content creation to thousands of youth. He is now bringing his entire experience to you through this course.' },

    // Section headers
    { sel: '.video-section .section-title', mr: 'कोर्स बद्दल जाणून घ्या', en: 'Learn About the Course' },
    { sel: '.video-section .section-subtitle', mr: 'सुशांत यांच्या तोंडून ऐका — हा कोर्स कशासाठी आहे, तुम्हाला काय शिकायला मिळेल आणि तुमचं आयुष्य कसं बदलू शकतं.', en: 'Hear from Sushant — what this course is about, what you\'ll learn, and how it can change your life.' },
    { sel: '.course-section .section-title', mr: 'कंटेंट क्रिएशन मास्टर कोर्स', en: 'Content Creation Master Course' },
    { sel: '.course-section .section-subtitle', mr: 'मराठीतून शिका कंटेंट कसा तयार करायचा — शून्यापासून ते प्रो लेव्हलपर्यंत', en: 'Learn how to create content in Marathi — from zero to pro level' },
    { sel: '.brands-section .section-title', mr: 'ज्या ब्रँड्ससोबत काम केलं', en: 'Brands Worked With' },
    { sel: '.brands-section .section-subtitle', mr: 'भारतातील सर्वात मोठ्या ब्रँड्ससोबत कंटेंट तयार केला', en: 'Created content with India\'s biggest brands' },
    { sel: '.testimonials-section .section-title', mr: 'विद्यार्थ्यांचे अनुभव', en: 'Student Experiences' },
    { sel: '.testimonials-section .section-subtitle', mr: 'ज्यांनी सुशांत यांच्याकडून शिकलं त्यांच्या प्रतिक्रिया', en: 'Feedback from those who learned from Sushant' },
    { sel: '.faq-section .section-title', mr: 'वारंवार विचारले जाणारे प्रश्न', en: 'Frequently Asked Questions' },
    { sel: '.faq-section .section-subtitle', mr: 'कोर्सबद्दल तुमच्या मनात असलेल्या प्रश्नांची उत्तरे', en: 'Answers to your questions about the course' },

    // Course card
    { sel: '.course-badge', mr: '🔥 लिमिटेड सीट्स', en: '🔥 Limited Seats' },
    { sel: '.course-card h3', mr: 'कंटेंट क्रिएशन A to Z — मराठीत शिका', en: 'Content Creation A to Z — Learn in Marathi' },
    { sel: '.course-card .course-desc', mr: 'या कोर्समध्ये तुम्हाला शिकायला मिळेल — व्हिडिओ स्क्रिप्टिंग, शूटिंग, एडिटिंग, ब्रँड डील्स कसे मिळवायचे, सोशल मीडिया ग्रोथ स्ट्रॅटेजी, मोनेटायझेशन आणि बरंच काही. सुशांत घाडगे यांच्या वर्षानुवर्षांच्या अनुभवातून तयार झालेला हा कोर्स तुमचं कंटेंट क्रिएशन करिअर बदलू शकतो.', en: 'In this course you\'ll learn — video scripting, shooting, editing, how to get brand deals, social media growth strategy, monetization and much more. This course, built from Sushant Ghadge\'s years of experience, can transform your content creation career.' },

    // CTA
    { sel: '.cta-banner-content p', mr: 'सुशांत घाडगे यांच्या मार्गदर्शनाखाली शिका आणि तुमचं कंटेंट क्रिएशन करिअर घडवा.', en: 'Learn under Sushant Ghadge\'s guidance and build your content creation career.' },

    // Footer
    { sel: '.footer-brand p', mr: 'कंटेंट क्रिएटर, फिल्ममेकर, अभिनेता आणि मेंटॉर. भारतातील 25+ ब्रँड्ससोबत काम केलेल्या सुशांत घाडगे यांच्याकडून शिका.', en: 'Content Creator, Filmmaker, Actor and Mentor. Learn from Sushant Ghadge who has worked with 25+ brands in India.' },
];

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'mr' ? 'en' : 'mr';

        // Update toggle button active state
        document.querySelector('.lang-mr').classList.toggle('active', currentLang === 'mr');
        document.querySelector('.lang-en').classList.toggle('active', currentLang === 'en');

        // Update html lang attribute
        document.documentElement.lang = currentLang;

        // Apply translations
        translations.forEach(t => {
            const el = document.querySelector(t.sel);
            if (el) {
                el.innerHTML = t[currentLang];
            }
        });

        // Handle hero buttons separately (they have child elements)
        const courseBtn = document.querySelector('.hero-buttons .btn-primary');
        if (courseBtn) {
            const icon = courseBtn.querySelector('.btn-icon');
            const shine = courseBtn.querySelector('.btn-shine');
            courseBtn.textContent = '';
            if (icon) courseBtn.appendChild(icon);
            courseBtn.append(currentLang === 'mr' ? ' कोर्स पहा' : ' View Course');
            if (shine) courseBtn.appendChild(shine);
        }

        const aboutBtn = document.querySelector('.hero-buttons .btn-secondary');
        if (aboutBtn) {
            const icon = aboutBtn.querySelector('.btn-icon');
            aboutBtn.textContent = '';
            if (icon) aboutBtn.appendChild(icon);
            aboutBtn.append(currentLang === 'mr' ? ' अधिक जाणून घ्या' : ' Learn More');
        }

        // Enroll buttons
        document.querySelectorAll('#enroll-btn, .cta-banner .btn-primary').forEach(btn => {
            const icon = btn.querySelector('.btn-icon');
            const shine = btn.querySelector('.btn-shine');
            btn.textContent = '';
            if (icon) btn.appendChild(icon);
            btn.append(currentLang === 'mr' ? ' आत्ताच एनरोल करा' : ' Enroll Now');
            if (shine) btn.appendChild(shine);
        });
    });
}
