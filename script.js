/**
 * ABINESH M - PORTFOLIO INTERACTION ENGINE
 * Clean, minimal & performant DOM interaction script.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // 2. Header Sticky & Navigation Spy
    const siteHeader = document.getElementById('site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (siteHeader) {
            if (window.scrollY > 40) {
                siteHeader.classList.add('sticky');
            } else {
                siteHeader.classList.remove('sticky');
            }
        }

        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Navigation Drawer
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle ? menuToggle.querySelector('i') : null;
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 4. Project Filter Tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length && projectCards.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 5. Toast Notification System
    function showToast(message) {
        let root = document.getElementById('toast-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'toast-root';
            document.body.appendChild(root);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        root.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 6. Copy Email to Clipboard
    const copyEmailCard = document.getElementById('copy-email');
    if (copyEmailCard) {
        copyEmailCard.addEventListener('click', () => {
            const email = 'm.abinesh555@gmail.com';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email address copied to clipboard!');
                }).catch(() => {
                    showToast('Email: m.abinesh555@gmail.com');
                });
            } else {
                showToast('Email: m.abinesh555@gmail.com');
            }
        });
    }

    // 7. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const subject = subjectInput ? subjectInput.value : '';
            const message = messageInput ? messageInput.value : '';

            const mailtoLink = `mailto:m.abinesh555@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            window.location.href = mailtoLink;
            showToast('Opening default email application...');
            contactForm.reset();
        });
    }

    // 8. CV Modal Controls
    const openCvBtns = document.querySelectorAll('#open-cv-btn, .open-cv-btn');
    const cvModal = document.getElementById('cv-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    function openModal() {
        if (cvModal) cvModal.classList.add('active');
    }

    function closeModal() {
        if (cvModal) cvModal.classList.remove('active');
    }

    openCvBtns.forEach(btn => btn.addEventListener('click', (e) => {
        // If button has data-open-modal attribute, prevent default navigation
        if (btn.getAttribute('data-open-modal') === 'true') {
            e.preventDefault();
            openModal();
        }
    }));

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
            closeModal();
        }
    });
});

