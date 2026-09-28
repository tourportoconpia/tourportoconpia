let allRecommendations = [];
let currentCategory = 'restaurantes';
let lastFocusedElement = null;

const CATEGORIES = [
    {
        id: 'restaurantes',
        title: 'Restaurantes',
        icon: '🍽️',
        desc: 'Francesinhas, comida tradicional y dulces típicos',
        countLabel: 'lugares'
    },
    {
        id: 'museos',
        title: 'Museos y Monumentos',
        icon: '🏛️',
        desc: 'Iglesias icónicas, azulejos y patrimonio histórico',
        countLabel: 'lugares'
    },
    {
        id: 'parques',
        title: 'Parques y Miradores',
        icon: '🌳',
        desc: 'Vistas panorámicas sobre el río Duero y jardines',
        countLabel: 'lugares'
    },
    {
        id: 'dicas',
        title: 'Consejos Prácticos',
        icon: '💡',
        desc: 'Transporte, trucos locales y excursiones cercanas',
        countLabel: 'consejos'
    },
    {
        id: 'descuentos',
        title: 'Descuentos y Ofertas',
        icon: '🏷️',
        desc: 'Cruceros por los 6 puentes y promociones',
        countLabel: 'ofertas'
    },
    {
        id: 'ninos',
        title: 'Con Niños',
        icon: '🎈',
        desc: 'Planes y actividades para toda la familia',
        countLabel: 'lugares'
    }
];

function getCategoryCount(categoryId) {
    return allRecommendations.filter(rec => 
        rec.category === categoryId || (categoryId === 'museos' && rec.category === 'locais')
    ).length;
}

async function loadRecommendations() {
    try {
        const response = await fetch('data/recommendations.json');
        const data = await response.json();
        allRecommendations = data.recommendations;
        
        renderCategoryCards();
        
        // Si hay una categoría en el hash de la URL, abrirla directamente
        const hash = window.location.hash;
        if (hash.startsWith('#categoria=')) {
            const catId = hash.replace('#categoria=', '');
            const exists = CATEGORIES.some(c => c.id === catId);
            if (exists) {
                openCategory(catId, false);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
        displayErrorMessage();
    }
}

function renderCategoryCards() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    
    grid.innerHTML = CATEGORIES.map(cat => {
        const count = getCategoryCount(cat.id);
        return `
            <div class="category-card" role="button" tabindex="0" onclick="openCategory('${cat.id}')" onkeydown="handleCategoryKeydown(event, '${cat.id}')" aria-label="Explorar ${cat.title}, ${count} ${cat.countLabel}">
                <div class="category-card-top">
                    <div class="category-card-icon-wrapper" aria-hidden="true">${cat.icon}</div>
                    <span class="category-card-count">${count} ${cat.countLabel}</span>
                </div>
                <div class="category-card-body">
                    <h3 class="category-card-title">${cat.title}</h3>
                    <p class="category-card-desc">${cat.desc}</p>
                </div>
                <div class="category-card-footer">
                    <span>Explorar</span>
                    <span class="category-card-arrow" aria-hidden="true">→</span>
                </div>
            </div>
        `;
    }).join('');
    
    animateCategoryCards();
}

function handleCategoryKeydown(event, categoryId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCategory(categoryId);
    }
}

function animateCategoryCards() {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 40);
    });
}

function openCategory(categoryId, scrollToTop = true) {
    currentCategory = categoryId;
    const cat = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
    
    const categoriesView = document.getElementById('categories-view');
    const detailView = document.getElementById('category-detail-view');
    const subtitle = document.getElementById('recommendations-subtitle');
    
    if (categoriesView && detailView) {
        categoriesView.classList.add('hidden');
        detailView.classList.remove('hidden');
    }
    
    if (subtitle) {
        subtitle.textContent = `Descubre mis recomendaciones de ${cat.title.toLowerCase()}`;
    }
    
    const badgeIcon = document.getElementById('category-badge-icon');
    const badgeTitle = document.getElementById('category-badge-title');
    const badgeCount = document.getElementById('category-badge-count');
    
    const count = getCategoryCount(cat.id);
    if (badgeIcon) badgeIcon.textContent = cat.icon;
    if (badgeTitle) badgeTitle.textContent = cat.title;
    if (badgeCount) badgeCount.textContent = `${count} ${cat.countLabel}`;
    
    renderRecommendations();
    
    if (window.location.hash !== `#categoria=${categoryId}`) {
        history.pushState({ category: categoryId }, '', `#categoria=${categoryId}`);
    }
    
    if (scrollToTop) {
        const target = document.getElementById('recommendations');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function showCategoriesView(scrollToTop = true) {
    const categoriesView = document.getElementById('categories-view');
    const detailView = document.getElementById('category-detail-view');
    const subtitle = document.getElementById('recommendations-subtitle');
    const floatingBtn = document.getElementById('floating-back-btn');
    
    if (categoriesView && detailView) {
        categoriesView.classList.remove('hidden');
        detailView.classList.add('hidden');
    }
    
    if (floatingBtn) {
        floatingBtn.classList.add('hidden');
    }
    
    if (subtitle) {
        subtitle.textContent = 'Elige una categoría para descubrir mis lugares favoritos';
    }
    
    if (window.location.hash.startsWith('#categoria=')) {
        history.pushState(null, '', window.location.pathname + window.location.search);
    }
    
    if (scrollToTop) {
        const target = document.getElementById('recommendations');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function renderRecommendations() {
    const grid = document.getElementById('recommendations-grid');
    if (!grid) return;
    
    const filtered = allRecommendations.filter(rec => 
        rec.category === currentCategory || (currentCategory === 'museos' && rec.category === 'locais')
    );
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1/-1; padding: 40px 0;">No se encontraron recomendaciones en esta categoría.</p>';
        return;
    }
    
    grid.innerHTML = filtered.map(rec => createRecommendationCard(rec)).join('');
    
    animateCards();
}

function createRecommendationCard(rec) {
    const detailsHTML = rec.details ? rec.details.map(detail => 
        `<div class="card-detail">
            <span class="detail-icon">${detail.icon}</span>
            <span>${detail.text}</span>
        </div>`
    ).join('') : '';
    
    const linkHTML = rec.link ? 
        `<div class="card-link">
            <span id="map-help-${rec.id}" class="sr-only">Este enlace abre en una nueva ventana o pestaña</span>
            <a href="${rec.link}" target="_blank" rel="noopener" aria-describedby="map-help-${rec.id}">
                Ver no mapa →
            </a>
        </div>` : '';
    
    const extraButtonHTML = rec.extraInfo ? 
        `<div class="card-price">
            <button class="btn-price" onclick="openExtraModal(${rec.id})">ℹ️ Ver más</button>
        </div>` : '';
    
    return `
        <div class="recommendation-card" data-category="${rec.category}">
            <div class="card-header">
                <div class="card-icon">${rec.icon}</div>
                <div class="card-title-section">
                    <h3 class="card-title">${rec.title}</h3>
                </div>
            </div>
            <p class="card-description">${rec.description}</p>
            ${detailsHTML ? `<div class="card-details">${detailsHTML}</div>` : ''}
            ${extraButtonHTML}
            ${linkHTML}
        </div>
    `;
}

function animateCards() {
    const cards = document.querySelectorAll('.recommendation-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function displayErrorMessage() {
    const grid = document.getElementById('recommendations-grid');
    grid.innerHTML = `
        <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
            <p style="color: var(--text-light); font-size: 1.1rem;">
                Ops! Não foi possível carregar as recomendações. 
                Por favor, tenta novamente mais tarde.
            </p>
        </div>
    `;
}

function setupScrollListeners() {
    const floatingBtn = document.getElementById('floating-back-btn');
    const detailView = document.getElementById('category-detail-view');
    const recommendationsSection = document.getElementById('recommendations');
    
    window.addEventListener('scroll', () => {
        if (!floatingBtn || !detailView || !recommendationsSection) return;
        
        const isDetailActive = !detailView.classList.contains('hidden');
        if (!isDetailActive) {
            floatingBtn.classList.add('hidden');
            return;
        }
        
        const rect = recommendationsSection.getBoundingClientRect();
        // Mostrar botón flotante si el usuario ha hecho scroll hacia abajo dentro de recomendaciones
        const isScrolledPast = rect.top < -180 && rect.bottom > 250;
        
        if (isScrolledPast) {
            floatingBtn.classList.remove('hidden');
        } else {
            floatingBtn.classList.add('hidden');
        }
    }, { passive: true });
}

function setupHistoryNavigation() {
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash.startsWith('#categoria=')) {
            const catId = hash.replace('#categoria=', '');
            const exists = CATEGORIES.some(c => c.id === catId);
            if (exists) {
                openCategory(catId, false);
            }
        } else {
            showCategoriesView(false);
        }
    });
}

function setupSmoothScroll() {
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
}

function trackReviewClicks() {
    const reviewButtons = document.querySelectorAll('.btn-primary, .btn-google, .btn-primary-small, .btn-google-small');
    
    reviewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.textContent.includes('TripAdvisor') ? 'TripAdvisor' : 'Google';
            console.log(`Review button clicked: ${platform}`);
        });
    });
}

function copyReviewText() {
    const reviewText = document.getElementById('review-text').textContent;
    const successMsg = document.getElementById('copy-success');
    
    navigator.clipboard.writeText(reviewText).then(() => {
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }).catch(err => {
        console.error('Error al copiar texto:', err);
    });
}

function trackBookingClicks() {
    const bookingButtons = document.querySelectorAll('.tour-booking .btn-primary');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tourName = button.closest('.tour-card').querySelector('h3').textContent;
            console.log(`Booking button clicked: ${tourName}`);
        });
    });
}

function openExtraModal(id) {
    const item = allRecommendations.find(rec => rec.id === id);
    if (!item || !item.extraInfo) return;
    
    // Save last focused element for accessibility
    lastFocusedElement = document.activeElement;
    
    const modal = document.getElementById('price-modal');
    const content = document.getElementById('price-modal-content');
    
    const info = item.extraInfo;
    
    if (info.type === 'price') {
        let childHTML = '';
        
        if (info.child4_12) {
            childHTML += `
                <div class="price-row">
                    <span class="price-label">Niños (4-12):</span>
                    <span class="price-value">${info.child4_12}</span>
                </div>
            `;
        }
        
        if (info.child0_3) {
            childHTML += `
                <div class="price-row">
                    <span class="price-label">Niños (0-3):</span>
                    <span class="price-value">${info.child0_3}</span>
                </div>
            `;
        }
        
        content.innerHTML = `
            <h2>${info.title}</h2>
            <div class="price-details">
                <div class="price-row">
                    <span class="price-label">Adulto:</span>
                    <span class="price-value">
                        <span class="price-original">
                            <span class="sr-only">Precio original: </span>${info.adultOriginal}
                        </span>
                        <span class="price-discount">
                            <span class="sr-only">Precio con descuento: </span>${info.adultDiscount}
                        </span>
                    </span>
                </div>
                ${childHTML}
                <div class="price-note">
                    <p>💡 ${info.discountNote}</p>
                </div>
            </div>
        `;
    } else {
        // Generic text content for other types
        content.innerHTML = `
            <h2>${info.title || item.title}</h2>
            <div class="price-details">
                <p>${info.content || ''}</p>
            </div>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeExtraModal() {
    const modal = document.getElementById('price-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to last focused element for accessibility
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();
    setupScrollListeners();
    setupHistoryNavigation();
    setupSmoothScroll();
    trackReviewClicks();
    trackBookingClicks();
    
    // Close modal on background click
    document.getElementById('price-modal').addEventListener('click', (e) => {
        if (e.target.id === 'price-modal') {
            closeExtraModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeExtraModal();
        }
    });
});
