let allRecommendations = [];
let currentCategory = 'all';

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
            ${linkHTML}
        </div>
    `;
}

function getCategoryLabel(category) {
    const labels = {
        'restaurantes': 'Restaurante',
        'museos': 'Museo',
        'parques': 'Parque',
        'dicas': 'Consejo'
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

document.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();
    setupCategoryTabs();
    setupSmoothScroll();
    trackReviewClicks();
    trackBookingClicks();
});
