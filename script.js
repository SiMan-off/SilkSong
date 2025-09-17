// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Media tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        createLightbox(item.src, item.alt);
    });
});

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;

    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
    `;

    const img = lightbox.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;

    document.body.appendChild(lightbox);

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Simulate form submission
        submitBtn.textContent = 'Отправляется...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Отправлено ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                this.reset();

                // Show success notification
                showNotification('Сообщение отправлено!', 'success');
            }, 2000);
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';

            // Animate statistics numbers
            if (entry.target.classList.contains('stat')) {
                animateNumber(entry.target.querySelector('.stat-number'));
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.news-card, .stat, .gallery-item, .contact-form').forEach(el => {
    observer.observe(el);
});

// Number animation
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(progress * target);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + (target > 99 ? '+' : '');
        }
    }

    requestAnimationFrame(updateNumber);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showEasterEgg();
        konamiCode = [];
    }
});

function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = '🦋 Хорнет одобряет! 🦋';
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: easterEggPulse 2s ease;
    `;

    document.body.appendChild(easterEgg);

    setTimeout(() => {
        easterEgg.remove();
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes easterEggPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🦋 Silksong.ru загружен успешно!');

    // Add loading animation completion
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Here you would integrate with your analytics service
    console.log('Event tracked:', eventName, eventData);

    // Example for Yandex.Metrika
    if (typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', eventName, eventData);
    }
}

// Track important user interactions
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', (e) => {
        const elementText = e.target.textContent.trim();
        const elementType = e.target.tagName.toLowerCase();

        trackEvent('element_click', {
            element_type: elementType,
            element_text: elementText,
            page_url: window.location.href
        });
    });
});

// Модальное окно для новостей
const newsData = {
    1: {
        title: "Team Cherry показали новый геймплей Silksong",
        content: `
            <p><strong>15 сентября 2025 года</strong> стало историческим днем для всех фанатов Hollow Knight! Team Cherry наконец-то представили долгожданный 15-минутный геймплей-трейлер Hollow Knight: Silksong, который показал невероятные возможности игры и новые механики.</p>

            <p>В новом видео мы увидели:</p>
            <ul>
                <li><strong>Улучшенную боевую систему Хорнет</strong> - более быстрые и акробатические движения, новые комбо-атаки</li>
                <li><strong>Разнообразные локации королевства Фарлум</strong> - от мрачных пещер до ярких цветущих садов</li>
                <li><strong>Новых уникальных врагов</strong> - более 20 различных типов противников в одном трейлере</li>
                <li><strong>Систему крафта и улучшений</strong> - Хорнет может создавать новое снаряжение из найденных материалов</li>
                <li><strong>Боссы невиданного масштаба</strong> - противники размером с целый экран!</li>
            </ul>

            <p>Особое внимание привлекли новые способности Хорнет: она может использовать свою иглу как крюк-кошку, создавать временные платформы из паутины и выполнять серию воздушных рывков.</p>

            <p><strong>Кристофер Ларкин</strong>, композитор игры, также поделился фрагментами нового саундтрека, который звучит еще более эпично, чем в оригинальной Hollow Knight.</p>

            <p>Team Cherry заявили, что это лишь малая часть того, что ждет игроков в полной версии игры!</p>
        `
    },
    2: {
        title: "Официальная дата выхода",
        content: `
            <p><strong>НАКОНЕЦ-ТО!</strong> После долгих лет ожидания Team Cherry официально объявили дату выхода Hollow Knight: Silksong.</p>

            <p><strong>Игра выйдет 12 февраля 2026 года</strong> одновременно на всех заявленных платформах.</p>

            <p>В официальном заявлении студии говорится:</p>
            <p><em>"Мы понимаем, что фанаты ждали этой новости очень долго. Silksong - это не просто продолжение, это совершенно новый опыт, который мы создавали с особой тщательностью. Мы хотели убедиться, что каждая деталь игры соответствует нашим высоким стандартам качества."</em></p>

            <p><strong>Что известно о релизе:</strong></p>
            <ul>
                <li><strong>Одновременный выход</strong> на PC, Nintendo Switch, PlayStation 5, Xbox Series X|S</li>
                <li><strong>День первый в Game Pass</strong> - игра будет доступна подписчикам сразу после релиза</li>
                <li><strong>Цена:</strong> $29.99 / 2499₽ в России</li>
                <li><strong>Коллекционное издание</strong> с артбуком, саундтреком и фигуркой Хорнет</li>
                <li><strong>Предзаказы</strong> откроются уже на следующей неделе</li>
            </ul>

            <p>Team Cherry также подтвердили, что владельцы оригинальной Hollow Knight получат <strong>10% скидку</strong> на покупку Silksong.</p>

            <p>Ави Адар и Уильям Пеллен из Team Cherry: <em>"Спасибо за терпение. Silksong стоит каждого дня ожидания."</em></p>
        `
    },
    3: {
        title: "Silksong выйдет на всех платформах",
        content: `
            <p>Team Cherry подтвердили, что <strong>Hollow Knight: Silksong будет доступна на всех основных игровых платформах</strong> в день релиза без каких-либо эксклюзивных периодов.</p>

            <p><strong>Подтвержденные платформы:</strong></p>
            <ul>
                <li><strong>PC (Steam, Epic Games Store, GOG)</strong> - с поддержкой Steam Deck</li>
                <li><strong>Nintendo Switch</strong> - оптимизирована для портативного режима</li>
                <li><strong>PlayStation 5</strong> - с поддержкой DualSense и 4K</li>
                <li><strong>PlayStation 4</strong> - полная совместимость</li>
                <li><strong>Xbox Series X|S</strong> - Smart Delivery и Quick Resume</li>
                <li><strong>Xbox One</strong> - обратная совместимость</li>
            </ul>

            <p><strong>Технические особенности по платформам:</strong></p>

            <p><strong>PlayStation 5:</strong></p>
            <ul>
                <li>Нативное разрешение 4K при 60 FPS</li>
                <li>Поддержка тактильной отдачи DualSense</li>
                <li>Мгновенная загрузка благодаря SSD</li>
                <li>3D-звук в совместимых наушниках</li>
            </ul>

            <p><strong>Xbox Series X:</strong></p>
            <ul>
                <li>4K при 120 FPS в режиме производительности</li>
                <li>Поддержка Auto HDR</li>
                <li>Smart Delivery - автоматическая лучшая версия</li>
                <li>Quick Resume для мгновенного возобновления</li>
            </ul>

            <p><strong>Nintendo Switch:</strong></p>
            <ul>
                <li>1080p в док-режиме, 720p в портативном</li>
                <li>Стабильные 60 FPS</li>
                <li>Оптимизированное управление для Joy-Con</li>
                <li>Поддержка HD Rumble</li>
            </ul>

            <p><strong>PC:</strong></p>
            <ul>
                <li>Поддержка разрешений до 8K</li>
                <li>Безлимитный FPS</li>
                <li>Ультрашироие мониторы</li>
                <li>Полная поддержка модификаций</li>
            </ul>

            <p>Также подтверждена <strong>кроссплатформенная синхронизация сохранений</strong> между всеми платформами!</p>
        `
    }
};

// Инициализация модального окна новостей
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('newsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.news-modal-close');
    const readMoreBtns = document.querySelectorAll('.read-more');

    // Открытие модального окна
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newsId = this.getAttribute('data-news-id');
            const news = newsData[newsId];

            if (news) {
                modalTitle.textContent = news.title;
                modalContent.innerHTML = news.content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Предотвращаем скролл страницы

                // Трекинг события
                trackEvent('news_modal_opened', { news_id: newsId, news_title: news.title });
            }
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Закрытие по клику на фон
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        const modalContent = modal.querySelector('.news-modal-content');
        modalContent.style.animation = 'slideDownModal 0.3s ease-out forwards';

        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalContent.style.animation = '';
        }, 300);
    }
});

// Добавляем анимацию закрытия в CSS
const newsModalStyles = document.createElement('style');
newsModalStyles.textContent = `
    @keyframes slideDownModal {
        from {
            bottom: 20px;
            opacity: 1;
        }
        to {
            bottom: -100%;
            opacity: 0;
        }
    }
`;
document.head.appendChild(newsModalStyles);