let allRecommendations = [];
let currentCategory = 'restaurantes';
let lastFocusedElement = null;

async function loadRecommendations() {
    try {
        const response = await fetch('data/recommendations.json');
        const data = await response.json();
        allRecommendations = data.recommendations;
        renderRecommendations();
    } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
        displayErrorMessage();
    }
}

function renderRecommendations() {
    const grid = document.getElementById('recommendations-grid');
    
    const filtered = currentCategory === 'all' 
        ? allRecommendations 
        : allRecommendations.filter(rec => rec.category === currentCategory);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1/-1;">Nenhuma recomendação encontrada.</p>';
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
                    <span class="card-category">${getCategoryLabel(rec.category)}</span>
                </div>
            </div>
            <p class="card-description">${rec.description}</p>
            ${detailsHTML ? `<div class="card-details">${detailsHTML}</div>` : ''}
            ${extraButtonHTML}
            ${linkHTML}
        </div>
    `;
}

function getCategoryLabel(category) {
    const labels = {
        'restaurantes': 'Restaurante',
        'museos': 'Museo',
        'parques': 'Parque',
        'dicas': 'Consejo',
        'ninos': 'Niños',
        'descuentos': 'Descuentos'
    };
    return labels[category] || category;
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

function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-pressed', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-pressed', 'true');
            
            currentCategory = tab.dataset.category;
            renderRecommendations();
        });
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
                        <span class="price-original">${info.adultOriginal}</span>
                        <span class="price-discount">${info.adultDiscount}</span>
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
    setupCategoryTabs();
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
