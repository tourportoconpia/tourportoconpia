# 🎨 Como Personalizar o Teu Website

Guia rápido para adaptares o site às tuas necessidades.

---

## 🔗 1. Atualizar Links de Review (ESSENCIAL)

### TripAdvisor

1. Vai ao teu perfil no TripAdvisor
2. Clica em "Write a Review"
3. Copia o URL completo
4. Substitui em `index.html`:

```html
<!-- Procura por: -->
<a href="https://www.tripadvisor.com" target="_blank">

<!-- Substitui por: -->
<a href="https://www.tripadvisor.com/UserReview-SEU-LINK" target="_blank">
```

### Google Reviews

1. Pesquisa o teu negócio no Google Maps
2. Clica em "Write a review"
3. Copia o URL
4. Substitui em `index.html`:

```html
<!-- Procura por: -->
<a href="https://www.google.com/maps" target="_blank">

<!-- Substitui por: -->
<a href="https://g.page/r/SEU-CODIGO/review" target="_blank">
```

**Nota:** Substitui em TODOS os botões (há 4 no total: 2 no CTA principal, 2 no CTA secundário)

---

## ✍️ 2. Personalizar Textos

### Nome da Guia

Procura e substitui "Pia" pelo teu nome em:
- `index.html` (hero, footer)
- `README.md`
- `GUIA_COPYWRITING.md`

### Mensagem de Boas-Vindas

Em `index.html`, linha ~17:

```html
<h1 class="fade-in">Obrigada por explorares o Porto comigo! 🇵🇹</h1>
<p class="hero-subtitle fade-in-delay-1">
    Espero que tenhas adorado o tour tanto quanto eu adorei partilhá-lo contigo...
</p>
```

Personaliza como quiseres!

### Call-to-Action

Em `index.html`, linha ~25:

```html
<h2>✨ Ajuda-me com a tua review!</h2>
<p class="cta-text">
    A tua opinião é <strong>super importante</strong> para mim...
</p>
```

Usa as sugestões do `GUIA_COPYWRITING.md` para testar diferentes versões.

---

## 🎨 3. Mudar Cores

Edita `styles.css`, linhas 1-10:

```css
:root {
    --primary-color: #0066cc;      /* Azul dos botões principais */
    --secondary-color: #ff6b35;    /* Laranja dos botões secundários */
    --accent-color: #ffd23f;       /* Amarelo de destaque */
    --text-dark: #2c3e50;          /* Texto principal */
    --text-light: #6c757d;         /* Texto secundário */
}
```

**Sugestões de paletas:**

**Elegante (Roxo/Dourado):**
```css
--primary-color: #6B46C1;
--secondary-color: #D97706;
--accent-color: #FCD34D;
```

**Fresco (Verde/Azul):**
```css
--primary-color: #059669;
--secondary-color: #0EA5E9;
--accent-color: #34D399;
```

**Tradicional (Azul/Vermelho PT):**
```css
--primary-color: #1E40AF;
--secondary-color: #DC2626;
--accent-color: #FBBF24;
```

---

## 📝 4. Adicionar/Editar Recomendações

Edita `data/recommendations.json`:

### Adicionar Nova Recomendação

```json
{
  "id": 13,
  "title": "Nome do Local",
  "category": "restaurantes",
  "icon": "🍕",
  "description": "Descrição apelativa...",
  "details": [
    {
      "icon": "📍",
      "text": "Rua Exemplo, 123"
    },
    {
      "icon": "💰",
      "text": "€€ (15-25€)"
    }
  ],
  "link": "https://www.google.com/maps/search/Nome+Local+Porto"
}
```

**Campos obrigatórios:**
- `id` - Número único (incrementa o último)
- `title` - Nome do local
- `category` - `"restaurantes"`, `"locais"` ou `"dicas"`
- `icon` - Emoji representativo
- `description` - Texto descritivo

**Campos opcionais:**
- `details` - Array de detalhes (morada, preço, etc.)
- `link` - Link para Google Maps ou website

### Editar Recomendação Existente

Procura pelo `id` e edita os campos que quiseres.

### Remover Recomendação

Apaga o objeto completo (desde `{` até `}`), não te esqueças das vírgulas!

---

## 🖼️ 5. Adicionar Fotos (Opcional)

### Preparação

1. Cria pasta `images/` na raiz
2. Adiciona fotos (formato: JPG ou WebP)
3. Nomes sugeridos: `cantinho-avillez.jpg`, `livraria-lello.jpg`, etc.

### Otimizar Fotos

Antes de adicionar, reduz o tamanho:
- Largura máxima: 800px
- Qualidade: 80%
- Ferramenta: [TinyPNG.com](https://tinypng.com)

### Adicionar ao JSON

```json
{
  "id": 1,
  "title": "Cantinho do Avillez",
  "image": "images/cantinho-avillez.jpg",
  ...
}
```

### Atualizar JavaScript

Em `app.js`, função `createRecommendationCard`, adiciona antes do `card-header`:

```javascript
const imageHTML = rec.image ? 
    `<div class="card-image">
        <img src="${rec.image}" alt="${rec.title}" loading="lazy">
    </div>` : '';

return `
    <div class="recommendation-card" data-category="${rec.category}">
        ${imageHTML}
        <div class="card-header">
        ...
```

### Adicionar CSS

Em `styles.css`:

```css
.card-image {
    width: 100%;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 16px;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

---

## 🌐 6. Mudar Idioma para Inglês

### Opção Rápida: Traduzir Tudo

Substitui todos os textos em `index.html`:

```html
<!-- PT -->
<h1>Obrigada por explorares o Porto comigo! 🇵🇹</h1>

<!-- EN -->
<h1>Thank you for exploring Porto with me! 🇵🇹</h1>
```

### Opção Avançada: Site Bilíngue

Vê `MELHORIAS_FUTURAS.md` → Fase 4 → Versão Multi-idioma

---

## 📱 7. Adicionar Informações de Contacto

### No Footer

Em `index.html`, linha ~90:

```html
<footer>
    <div class="container">
        <p>Feito com ❤️ no Porto</p>
        <p class="footer-contact">
            📧 pia@portotours.com | 📱 +351 912 345 678
        </p>
        <div class="social-links">
            <a href="https://instagram.com/teu_instagram">📷 Instagram</a>
            <a href="https://wa.me/351912345678">💬 WhatsApp</a>
        </div>
    </div>
</footer>
```

### Adicionar CSS para Social Links

```css
.social-links {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 16px;
}

.social-links a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s;
}

.social-links a:hover {
    opacity: 1;
}
```

---

## 🎭 8. Personalizar Emojis

Substitui os emojis por outros que gostes mais:

**Recomendações:**
- Restaurantes: 🍽️ 🍕 🍝 🥘 🍷 🥐
- Locais: 🏛️ 🌉 📚 🌳 ⛵ 🏰
- Dicas: 💡 ⏰ 🚇 💧 🍷 🗺️

**Botões:**
- Reviews: ⭐ 🌟 ✨ 💫
- Mapas: 📍 🗺️ 🧭
- Contacto: 📧 💬 📱

---

## 🔧 9. Testar Localmente

Antes de fazer deploy, testa no teu computador:

### Opção 1: Python (Mac/Linux)

```bash
cd /Users/rafael.coelho/Documents/guia_pia
python3 -m http.server 8000
```

Abre: `http://localhost:8000`

### Opção 2: VS Code

1. Instala extensão "Live Server"
2. Clica direito em `index.html`
3. "Open with Live Server"

### Opção 3: Browser direto

Arrasta `index.html` para o browser (mas JSON pode não carregar)

---

## 🚀 10. Fazer Deploy

### GitHub Pages (Grátis)

Vê instruções completas no `README.md` → Deploy no GitHub Pages

**Resumo:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TEU-USERNAME/TEU-REPO.git
git push -u origin main
```

Depois ativa em: Settings → Pages

### Atualizar Conteúdo

Sempre que fizeres mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O site atualiza automaticamente em 1-2 minutos!

---

## ✅ Checklist de Personalização

Antes de partilhar o site, confirma:

- [ ] Links de review atualizados (TripAdvisor + Google)
- [ ] Nome personalizado (substitui "Pia")
- [ ] Textos revistos e sem erros
- [ ] Recomendações atualizadas (pelo menos 10)
- [ ] Contactos adicionados (email, WhatsApp, Instagram)
- [ ] Cores ajustadas (se quiseres)
- [ ] Testado no telemóvel
- [ ] Deploy feito no GitHub Pages
- [ ] Link funciona corretamente

---

## 🆘 Problemas Comuns

### JSON não carrega

**Erro:** Recomendações não aparecem

**Solução:**
1. Abre a consola do browser (F12)
2. Verifica se há erros
3. Confirma que `data/recommendations.json` existe
4. Valida JSON em [jsonlint.com](https://jsonlint.com)

### Layout quebrado

**Erro:** Site parece estranho no telemóvel

**Solução:**
1. Não apagues código CSS sem saber o que faz
2. Testa sempre em mobile após mudanças
3. Usa [responsivedesignchecker.com](https://responsivedesignchecker.com)

### Links não funcionam

**Erro:** Botões de review não abrem nada

**Solução:**
1. Confirma que substituíste os links placeholder
2. Testa os links diretamente no browser
3. Verifica se há `target="_blank"` no `<a>`

---

## 💡 Dicas Finais

1. **Faz backups:** Antes de mudanças grandes, copia os ficheiros
2. **Testa sempre:** Mudou algo? Testa no telemóvel!
3. **Itera devagar:** Não mudes tudo de uma vez
4. **Pede feedback:** Mostra a amigos antes de clientes
5. **Mede resultados:** Quantas reviews recebes por semana?

---

**Precisas de ajuda?** Consulta:
- `README.md` - Documentação geral
- `GUIA_COPYWRITING.md` - Textos persuasivos
- `MELHORIAS_FUTURAS.md` - Ideias para evoluir

Boa sorte! 🚀
