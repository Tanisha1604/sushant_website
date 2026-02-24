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
    // Testimonials
    { sel: '.testimonials-section .section-title', mr: 'विद्यार्थ्यांचे अनुभव', en: 'Student Experiences' },
    { sel: '.testimonials-section .section-subtitle', mr: 'ज्यांनी सुशांत यांच्याकडून शिकलं त्यांच्या प्रतिक्रिया', en: 'Feedback from those who learned from Sushant' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(1) .testimonial-text', mr: '"सुशांत सरांचा कोर्स माझ्या आयुष्यातला सर्वात चांगला निर्णय होता. आज मी स्वतः 3 ब्रँड्ससोबत काम करतो!"', en: '"Sushant sir\'s course was the best decision of my life. Today I am working with 3 brands myself!"' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(1) .author-name', mr: 'प्रशांत पाटील', en: 'Prashant Patil' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(1) .author-role', mr: 'कंटेंट क्रिएटर', en: 'Content Creator' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(2) .testimonial-text', mr: '"मला कंटेंट क्रिएशनबद्दल काहीच माहित नव्हतं. या कोर्सने मला A to Z सर्वकाही शिकवलं. अल्पावधीतच माझ्या पेजवर 50K फॉलोअर्स आले!"', en: '"I knew nothing about content creation. This course taught me everything from A to Z. In a short time, I got 50K followers on my page!"' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(2) .author-name', mr: 'स्नेहा देशमुख', en: 'Sneha Deshmukh' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(2) .author-role', mr: 'YouTuber', en: 'YouTuber' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(3) .testimonial-text', mr: '"ब्रँड डील्स कशा मिळवायच्या हे सुशांत सरांनी इतक्या सोप्या पद्धतीने शिकवलं की आता मी दर महिन्याला ब्रँड कोलॅबोरेशन करतो."', en: '"Sushant sir taught how to get brand deals in such a simple way that now I do brand collaborations every month."' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(3) .author-name', mr: 'राहुल जाधव', en: 'Rahul Jadhav' },
    { sel: '.testimonials-grid .testimonial-card:nth-child(3) .author-role', mr: 'Instagram Creator', en: 'Instagram Creator' },

    // FAQ
    { sel: '.faq-section .section-title', mr: 'वारंवार विचारले जाणारे प्रश्न', en: 'Frequently Asked Questions' },
    { sel: '.faq-section .section-subtitle', mr: 'कोर्सबद्दल तुमच्या मनात असलेल्या प्रश्नांची उत्तरे', en: 'Answers to your questions about the course' },
    { sel: '.faq-list .faq-item:nth-child(1) .faq-question span', mr: 'हा कोर्स कोणासाठी आहे?', en: 'Who is this course for?' },
    { sel: '.faq-list .faq-item:nth-child(1) .faq-answer-inner', mr: 'हा कोर्स प्रत्येकासाठी आहे — जर तुम्हाला कंटेंट क्रिएशन शिकायचं असेल, मग तुम्ही विद्यार्थी असा, नोकरदार असा किंवा बिझनेसमन. कोणत्याही पूर्व अनुभवाची गरज नाही. शून्यापासून शिकवले जाईल.', en: 'This course is for everyone — if you want to learn content creation, whether you are a student, professional, or businessman. No prior experience is needed. Everything will be taught from scratch.' },
    { sel: '.faq-list .faq-item:nth-child(2) .faq-question span', mr: 'कोर्सची भाषा कोणती आहे?', en: 'What is the language of the course?' },
    { sel: '.faq-list .faq-item:nth-child(2) .faq-answer-inner', mr: 'संपूर्ण कोर्स मराठी भाषेत आहे. सुशांत घाडगे स्वतः मराठीतून शिकवतात, त्यामुळे तुम्हाला सर्व काही सहज समजेल.', en: 'The entire course is in Marathi. Sushant Ghadge himself teaches in Marathi, so you will understand everything easily.' },
    { sel: '.faq-list .faq-item:nth-child(3) .faq-question span', mr: 'कोर्समध्ये काय शिकवलं जातं?', en: 'What is taught in the course?' },
    { sel: '.faq-list .faq-item:nth-child(3) .faq-answer-inner', mr: 'व्हिडिओ स्क्रिप्टिंग, शूटिंग टेक्निक्स, प्रोफेशनल एडिटिंग, सोशल मीडिया ग्रोथ स्ट्रॅटेजी, ब्रँड डील्स कसे मिळवायचे, मोनेटायझेशन, YouTube, Instagram, रील्स, शॉर्ट्स — सर्व काही A to Z शिकवलं जातं.', en: 'Video scripting, shooting techniques, professional editing, social media growth strategy, how to get brand deals, monetization, YouTube, Instagram, Reels, Shorts — everything from A to Z is taught.' },
    { sel: '.faq-list .faq-item:nth-child(4) .faq-question span', mr: 'कोर्स किती दिवसांचा आहे?', en: 'What is the duration of the course?' },
    { sel: '.faq-list .faq-item:nth-child(4) .faq-answer-inner', mr: 'कोर्सचा कालावधी आणि तपशील लवकरच जाहीर केला जाईल. तुम्ही एनरोल केल्यावर तुम्हाला सर्व माहिती मिळेल.', en: 'The duration and details of the course will be announced soon. You will receive all information once you enroll.' },
    { sel: '.faq-list .faq-item:nth-child(5) .faq-question span', mr: 'कोर्ससाठी कोणती उपकरणे लागतात?', en: 'What equipment is needed for the course?' },
    { sel: '.faq-list .faq-item:nth-child(5) .faq-answer-inner', mr: 'सुरुवातीला फक्त तुमचा स्मार्टफोन पुरेसा आहे! कोर्समध्ये फोनवरूनच प्रोफेशनल कंटेंट कसा तयार करायचा हे शिकवलं जातं. पुढे गेल्यावर कॅमेरा आणि इतर उपकरणे कोणती घ्यायची याबद्दलही मार्गदर्शन मिळेल.', en: 'Initially, only your smartphone is enough! The course teaches how to create professional content using just a phone. Later, guidance on which camera and other equipment to buy will also be provided.' },
    { sel: '.faq-list .faq-item:nth-child(6) .faq-question span', mr: 'सुशांत यांच्याशी थेट संवाद साधता येतो का?', en: 'Can I communicate directly with Sushant?' },
    { sel: '.faq-list .faq-item:nth-child(6) .faq-answer-inner', mr: 'होय! कोर्समध्ये लाइव्ह Q&A सेशन्स आहेत जिथे तुम्ही सुशांत यांच्याशी थेट बोलू शकता आणि तुमच्या प्रश्नांची उत्तरे मिळवू शकता.', en: 'Yes! The course includes live Q&A sessions where you can speak directly with Sushant and get answers to your questions.' },

    // CTA
    { sel: '.cta-banner h2', mr: 'तुमचा कंटेंट क्रिएशन प्रवास<br><span class="gradient-text">आजच सुरू करा!</span>', en: 'Start your content creation journey<br><span class="gradient-text">today!</span>' },
    { sel: '.cta-banner p', mr: 'सुशांत घाडगे यांच्या मार्गदर्शनाखाली शिका आणि तुमचं कंटेंट क्रिएशन करिअर घडवा.', en: 'Learn under Sushant Ghadge\'s guidance and build your content creation career.' },

    // Footer
    { sel: '.footer-brand h3', mr: 'सुशांत घाडगे', en: 'Sushant Ghadge' },
    { sel: '.footer-brand p', mr: 'कंटेंट क्रिएटर, फिल्ममेकर, अभिनेता आणि मेंटॉर. भारतातील 25+ ब्रँड्ससोबत काम केलेल्या सुशांत घाडगे यांच्याकडून शिका.', en: 'Content Creator, Filmmaker, Actor and Mentor. Learn from Sushant Ghadge who has worked with 25+ brands in India.' },
    { sel: '.footer-links:nth-of-type(1) h4', mr: 'लिंक्स', en: 'Links' },
    { sel: '.footer-links:nth-of-type(1) a[href="#home"]', mr: 'होम', en: 'Home' },
    { sel: '.footer-links:nth-of-type(1) a[href="#about"]', mr: 'माझ्याबद्दल', en: 'About Me' },
    { sel: '.footer-links:nth-of-type(1) a[href="#course"]', mr: 'कोर्स', en: 'Course' },
    { sel: '.footer-links:nth-of-type(1) a[href="#brands"]', mr: 'ब्रँड्स', en: 'Brands' },
    { sel: '.footer-links:nth-of-type(1) a[href="#faq"]', mr: 'FAQ', en: 'FAQ' },
    { sel: '.footer-links:nth-of-type(2) h4', mr: 'संपर्क', en: 'Contact' },
    { sel: '.footer-links:nth-of-type(2) a[href^="mailto"]', mr: 'ईमेल', en: 'Email' },
    { sel: '.footer-bottom', mr: '&copy; 2026 सुशांत घाडगे. सर्व हक्क राखीव.', en: '&copy; 2026 Sushant Ghadge. All rights reserved.' },
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
