// Mohammed Fahad Asif Portfolio - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Dynamic Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Hero Reveal on Page Load
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 120);
    });

    // 3. Dynamic Typing Effect for Hero Subtitle
    const typingElement = document.getElementById('typingText');
    const words = [
        "Cross-Platform Flutter Apps",
        "Android & iOS Kotlin Solutions",
        "React.js & Next.js Web Systems",
        "Pharmacy Management Systems",
        "ERP & POS Enterprise Software",
        "Interactive Surprise & Wedding Sites",
        "GreyScript Automation Tools"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1600; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    if (typingElement) {
        typeEffect();
    }

    // 4. Scroll-Driven Zoom-In/Zoom-Out & Div Animations
    // User requirement: "jab bu hum scroll Karen Ham niche ki taraf ya Upar ki taraf Jo word hai vah mere pass likhate jaen aur jo divs Honge unko unko Upar niche se upar Jab Ham Karenge to Samne Aaye Jo Ham zoomout ho"
    const animatedDivs = document.querySelectorAll('.scroll-zoom-div');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.classList.remove('out-view');

                // Animate child skill bars if inside
                const bars = entry.target.querySelectorAll('.skill-bar-fill');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) bar.style.width = width;
                });
            } else {
                // When element leaves viewport during scroll
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                if (currentScroll < entry.boundingClientRect.top + window.scrollY) {
                    // Leaving while scrolling up
                    entry.target.classList.remove('in-view');
                    entry.target.classList.add('out-view');
                }
            }
        });
    }, scrollObserverOptions);

    animatedDivs.forEach(div => scrollObserver.observe(div));

    // Handle scroll direction & continuous dynamic animations
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.getElementById('navbar');

        // Navbar blur and shadow update on scroll
        if (st > 50) {
            navbar.classList.add('py-3', 'shadow-2xl', 'bg-[#0b0f19]/95');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-3', 'shadow-2xl', 'bg-[#0b0f19]/95');
        }

        lastScrollTop = st <= 0 ? 0 : st;
    }, { passive: true });

    // 5. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }

    // 6. Interactive 3D Card Tilt Effect on Profile
    const cardWrapper = document.querySelector('.tilt-card-wrapper');
    if (cardWrapper && window.innerWidth > 768) {
        cardWrapper.addEventListener('mousemove', (e) => {
            const rect = cardWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / rect.height) * 14;
            const rotateY = (x / rect.width) * 14;

            cardWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        cardWrapper.addEventListener('mouseleave', () => {
            cardWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // 7. Dynamic Project Filtering
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 8. Initialize React Bits Lightfall Background
    initBackground();
});

// React Bits Lightfall Background with Automatic Fallback
function initBackground() {
    const lightfallCanvas = document.getElementById('lightfallCanvas');
    if (lightfallCanvas && typeof initLightfall === 'function') {
        const lf = initLightfall(lightfallCanvas, {
            colors: ['#6366f1', '#06b6d4', '#a855f7', '#3b82f6', '#ec4899', '#ffffff'],
            backgroundColor: '#0b0f19',
            speed: 0.35,
            streakCount: 3,
            streakWidth: 0.85,
            streakLength: 1.25,
            glow: 1.2,
            density: 0.65,
            twinkle: 0.35,
            zoom: 2.8,
            backgroundGlow: 0.15,
            headGlow: 0.75,
            bloom: 0.45,
            opacity: 0.85,
            mouseInteraction: true,
            holdToWarp: true
        });

        if (lf) {
            return;
        }
    }

    // Fallback if WebGL 2 is not supported on older hardware
    const fallbackCanvas = document.getElementById('particleCanvas');
    if (fallbackCanvas) {
        fallbackCanvas.classList.remove('hidden');
        initCanvasParticles();
    }
}

// Fallback Particle Background Animation
function initCanvasParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 55);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.8,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            alpha: Math.random() * 0.45 + 0.15
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Project Details Modal Content & Functions
const projectData = {
    gym: {
        title: "FitLife Pro - Modern Gym & Fitness Website",
        subtitle: "High-performance Fitness Portal & Member Dashboard",
        tech: ["React.js", "Next.js", "Tailwind CSS", "Lucide Icons", "REST APIs"],
        description: "A state-of-the-art gym web application crafted with an energetic UI, sleek dark theme, and high conversion flow. It includes interactive workout schedulers, personal trainer directory with booking slots, membership tiers with payment gateway simulation, and client testimonials with video showcase.",
        features: [
            "Interactive daily workout & diet plan planner",
            "Gym membership subscription plans with checkout",
            "Real-time BMI & Calorie burning calculator",
            "Trainer profiles with scheduled session bookings",
            "Smooth mobile-first responsive design"
        ]
    },
    school: {
        title: "EduManage - School & College Management App",
        subtitle: "Cross-Platform Mobile Application for Institutions",
        tech: ["Flutter", "Dart", "Kotlin (Android)", "Firebase", "SQLite"],
        description: "An enterprise mobile application built for schools and colleges to automate daily academic administration. Features role-based access for Administrators, Teachers, Students, and Parents with instant updates.",
        features: [
            "Automated student attendance tracking with QR/barcode scan",
            "Exam marks recording and automated computerized report cards",
            "Fee voucher generation and payment status logs",
            "Teacher timetable scheduler and class homework distribution",
            "Direct parent push notifications for notices and alerts"
        ]
    },
    pos: {
        title: "SmartPOS - Retail & Restaurant Point of Sale",
        subtitle: "High-Speed Billing & Inventory Control Software",
        tech: ["Desktop & Web", "Electron / React", "Node.js", "PostgreSQL / SQLite", "Thermal ESC/POS"],
        description: "A fast, resilient POS software engineered for supermarkets, retail shops, and pharmacies. Provides millisecond checkout speeds, barcode scanner capability, and offline data sync.",
        features: [
            "Fast barcode & SKU item scanning with keyboard shortcuts",
            "Automatic invoice calculation with tax & discount percentages",
            "Instant thermal receipt printing (ESC/POS support)",
            "Real-time inventory low-stock alerts",
            "End-of-day sales summary and profit margin analytics"
        ]
    },
    erp: {
        title: "Enterprise ERP Software Solution",
        subtitle: "Full-Scale Enterprise Resource Planning System",
        tech: ["React", "Next.js", "Enterprise Architecture", "Database Relations", "Reporting Engine"],
        description: "A modular, robust ERP system designed to centralize company operations: supply chain tracking, multi-warehouse inventory, double-entry financial accounting, payroll calculation, and executive BI dashboards.",
        features: [
            "Centralized warehouse management & vendor purchase orders",
            "Employee payroll, attendance, and leave management module",
            "Double-entry bookkeeping with automated balance sheets",
            "Interactive graphical sales performance & expense reports",
            "Role-based permission controls and immutable audit trails"
        ]
    },
    birthday: {
        title: "Surprise Spark - Birthday & Celebration Web Experiences",
        subtitle: "Interactive, Highly Animated Celebration Websites",
        tech: ["HTML5 Canvas", "Tailwind CSS", "JavaScript ES6+", "Web Audio API", "Confetti FX"],
        description: "Custom celebratory websites built to surprise loved ones on their birthdays and anniversaries. Packed with personalized multimedia surprises, memory slideshows, and interactive mini-games.",
        features: [
            "Dynamic canvas confetti & floating heart particle animations",
            "Interactive balloon-popping games revealing hidden wishes",
            "Photo timeline memories carousel with background music",
            "Custom countdown timer to the midnight birthday moment",
            "Personalized secret password unlock for private messages"
        ]
    },
    wedding: {
        title: "Elegance - Digital Wedding Invitation Portals",
        subtitle: "Bespoke Luxury Digital Invitation & RSVP System",
        tech: ["Next.js", "React", "CSS 3D Animations", "Google Maps API", "Cloud Database"],
        description: "A luxury digital alternative to traditional paper wedding cards. Incorporates animated wax-seal letter opening, interactive venue directions via Google Maps, itinerary schedule, and instant RSVP guest management.",
        features: [
            "Interactive wax-seal invitation envelope opening animation",
            "Digital RSVP form with automatic guest headcount tally",
            "Integrated Google Maps location pins for all event venues",
            "Wedding itinerary timeline with dress-code recommendations",
            "Couple story gallery with congratulatory message wall"
        ]
    },
    greyscript: {
        title: "GreyScript Suite - Automation & Scripting Tools",
        subtitle: "Custom GreyScript Automation & Tooling Software",
        tech: ["GreyScript", "Terminal Emulation", "Custom CLI", "Automation Scripts"],
        description: "A suite of custom-engineered GreyScript utilities and automated tools designed for game script environments, terminal automation, network utility scripts, and system optimization routines.",
        features: [
            "Automated terminal routines and syntax parsing tools",
            "Network monitoring and penetration script utilities",
            "Lightweight execution footprint with zero memory bloat",
            "Modular code architecture for rapid feature expansion"
        ]
    },
    pharmacy: {
        title: "PharmaCare Pro - Pharmacy & Medical Store Management System",
        subtitle: "Advanced Healthcare POS, Expiry Control & Medical Inventory Suite",
        tech: ["React.js", "Next.js / Desktop", "SQL / SQLite", "Barcode Scanner API", "Thermal ESC/POS"],
        description: "A comprehensive, high-security Pharmacy Management System tailored for retail medical stores, hospital pharmacies, and wholesale distributors. Solves key pharmaceutical challenges like near-expiry drug warnings, batch number tracking, prescription ledger storage, and rapid billing.",
        features: [
            "Smart Batch & Expiry Date Tracker with automatic near-expiry alerts",
            "High-speed barcode scanner billing with formula/generic alternative lookup",
            "Supplier & Distributor ledger accounts with automated purchase orders",
            "Customer prescription history and patient dosage tracking",
            "Restricted drug audit logs and narcotic sales compliance tracking",
            "Daily profit-loss reporting, stock value audit, and thermal receipt printing"
        ]
    }
};

function openModal(projectKey) {
    const data = projectData[projectKey];
    if (!data) return;

    const modal = document.getElementById('projectModal');
    const modalBox = document.getElementById('modalBox');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
        <div class="space-y-4">
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-brand-950 text-cyan-400 border border-brand-800/60 uppercase">Project Spotlight</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">${data.title}</h2>
            <p class="text-sm font-mono text-cyan-400 font-semibold">${data.subtitle}</p>
            
            <div class="flex flex-wrap gap-2 py-2">
                ${data.tech.map(t => `<span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800 text-slate-300 border border-slate-700">${t}</span>`).join('')}
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">${data.description}</p>

            <div class="pt-2">
                <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono">Key Architectural Features:</h4>
                <ul class="space-y-2 text-sm text-slate-400 font-mono">
                    ${data.features.map(f => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-cyan-400 mt-1 text-xs"></i><span>${f}</span></li>`).join('')}
                </ul>
            </div>

            <div class="pt-6 border-t border-slate-800 flex flex-wrap gap-4 items-center">
                <a href="https://wa.me/923084590415?text=Hello%20Fahad,%20I%20am%20interested%20in%20your%20project:%20${encodeURIComponent(data.title)}" target="_blank" class="px-6 py-2.5 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all">
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>Inquire About This Project</span>
                </a>
                <button onclick="closeModal()" class="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">
                    Close
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    const modalBox = document.getElementById('modalBox');

    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

// 9. Contact Form Handler (Direct Email & WhatsApp Bridge)
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('projectSubject').value.trim();
    const message = document.getElementById('projectMessage').value.trim();

    const status = document.getElementById('formStatus');

    if (!name || !email || !message) {
        status.className = "text-center text-xs font-mono py-2 rounded-lg bg-red-950/80 text-red-400 border border-red-800/40";
        status.textContent = "Please fill in all required fields.";
        status.classList.remove('hidden');
        return;
    }

    status.className = "text-center text-xs font-mono py-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/40";
    status.textContent = "Opening your WhatsApp / Email with your message...";
    status.classList.remove('hidden');

    const formattedMessage = `Hello Fahad,%0A%0AMy Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubject: ${encodeURIComponent(subject)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

    // Open WhatsApp directly with pre-composed inquiry
    setTimeout(() => {
        window.open(`https://wa.me/923084590415?text=${formattedMessage}`, '_blank');
    }, 600);
}
