# 🇵🇹 Porto Guide - Website de Recomendações

Website simples e apelativo para uma guia turística no Porto, focado em **incentivar clientes a deixarem reviews** após o tour.

## 🎯 Objetivo Principal

Substituir o PDF de recomendações por um website moderno que:
- Reforça a confiança e profissionalismo
- Mostra recomendações locais valiosas
- **Maximiza a conversão de reviews** (TripAdvisor, Google)

## 🚀 Deploy no GitHub Pages

### Setup Inicial

1. **Cria um repositório no GitHub**
   - Nome sugerido: `porto-guide` ou `guia-porto`
   - Público ou privado (ambos funcionam com GitHub Pages)

2. **Faz push do código**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Porto guide website"
   git branch -M main
   git remote add origin https://github.com/SEU-USERNAME/SEU-REPO.git
   git push -u origin main
   ```

3. **Ativa GitHub Pages**
   - Vai a Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Clica em Save

4. **Acede ao site**
   - URL: `https://SEU-USERNAME.github.io/SEU-REPO/`
   - Demora 2-5 minutos a ficar disponível

### Domínio Personalizado (Opcional)

Para usar um domínio próprio (ex: `portowithpia.com`):

1. Compra um domínio (Namecheap, GoDaddy, etc.)
2. Adiciona um ficheiro `CNAME` na raiz com o teu domínio:
   ```
   portowithpia.com
   ```
3. Configura DNS no teu fornecedor:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: SEU-USERNAME.github.io
   ```

## 📝 Como Atualizar Conteúdo

### Adicionar/Editar Recomendações

Edita o ficheiro `data/recommendations.json`:

```json
{
  "id": 13,
  "title": "Nome do Local",
  "category": "restaurantes",  // ou "locais" ou "dicas"
  "icon": "🍕",
  "description": "Descrição apelativa e pessoal do local...",
  "details": [
    {
      "icon": "📍",
      "text": "Morada completa"
    },
    {
      "icon": "💰",
      "text": "Faixa de preço"
    }
  ],
  "link": "https://www.google.com/maps/search/..."  // opcional
}
```

**Categorias disponíveis:**
- `restaurantes` - Restaurantes, cafés, pastelarias
- `locais` - Pontos turísticos, miradouros, atrações
- `dicas` - Dicas práticas, informações úteis

### Atualizar Links de Review

Edita `index.html` e substitui os links:

```html
<!-- TripAdvisor -->
<a href="SEU-LINK-TRIPADVISOR" target="_blank" rel="noopener">

<!-- Google Reviews -->
<a href="SEU-LINK-GOOGLE-REVIEWS" target="_blank" rel="noopener">
```

**Como obter os links:**
- **TripAdvisor**: Vai ao teu perfil → "Write a Review" → copia o URL
- **Google**: Pesquisa o teu negócio no Google Maps → "Write a review" → copia o URL

### Personalizar Mensagens

Edita o texto em `index.html`:
- **Hero section**: Mensagem de boas-vindas
- **CTA primário**: Texto persuasivo para reviews
- **Footer**: Informações de contacto

## 🎨 Personalização Visual

### Cores

Edita as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #0066cc;      /* Cor principal (botões, links) */
    --secondary-color: #ff6b35;    /* Cor secundária */
    --accent-color: #ffd23f;       /* Cor de destaque */
}
```

### Fontes

Substitui a fonte no `<head>` de `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=NOVA-FONTE:wght@300;400;600;700&display=swap" rel="stylesheet">
```

E atualiza em `styles.css`:
```css
body {
    font-family: 'NOVA-FONTE', sans-serif;
}
```

## 💡 Copywriting para Reviews

### Princípios Aplicados

1. **Reciprocidade** - "Ajudas-me muito com a tua review"
2. **Facilidade** - "Demora apenas 2 minutos"
3. **Impacto pessoal** - "Significa o mundo para mim"
4. **Emojis estratégicos** - Criam conexão emocional
5. **Múltiplos CTAs** - Topo e fundo da página

### Variações de Copy (A/B Testing)

Testa diferentes mensagens para ver qual converte melhor:

**Opção 1 (Atual):**
> "Ajuda-me com a tua review! A tua opinião é super importante para mim."

**Opção 2 (Mais direta):**
> "Gostaste do tour? Deixa uma review rápida - ajuda-me imenso! 🙏"

**Opção 3 (Benefício mútuo):**
> "A tua review ajuda outros viajantes a descobrirem o Porto - e a mim a continuar a fazer o que amo!"

## 📊 Tracking & Analytics (Opcional)

### Google Analytics

Adiciona antes do `</head>` em `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Eventos Personalizados

O código já inclui tracking básico de cliques nos botões de review (ver `app.js`).

Para analytics mais avançados, adiciona:

```javascript
// Em app.js, na função trackReviewClicks()
gtag('event', 'review_click', {
  'platform': platform,
  'location': 'primary_cta'
});
```

## 🚀 Otimizações de Performance

### Já Implementadas

- ✅ Mobile-first design
- ✅ CSS otimizado (sem frameworks pesados)
- ✅ Lazy loading de conteúdo via JSON
- ✅ Animações leves com CSS
- ✅ Fontes com `display=swap`
- ✅ Imagens via emojis (zero bytes)

### Melhorias Futuras

1. **Service Worker** para funcionar offline
2. **Compressão de assets** (minify CSS/JS)
3. **CDN** para JSON (se crescer muito)

## 🎯 UX Tricks para Aumentar Conversão

### Implementados

1. **Duplo CTA** - Reviews no topo e fundo
2. **Prova social implícita** - "Outros viajantes" nas mensagens
3. **Redução de fricção** - Links diretos (sem passos extra)
4. **Urgência suave** - "Não te esqueças"
5. **Valor primeiro** - Recomendações antes do segundo CTA
6. **Mobile-optimized** - Botões grandes, fáceis de clicar

### Ideias Extra

1. **Countdown timer** - "Deixa a tua review nas próximas 24h"
2. **Incentivo** - "Quem deixa review recebe um mapa secreto do Porto"
3. **Gamificação** - "Já ajudaste X pessoas a descobrir o Porto"
4. **Prova social** - "123 pessoas já deixaram review este mês"

## 📱 Como Partilhar com Clientes

### Durante o Tour
"No final vou partilhar-te um link com todas as minhas recomendações!"

### Fim do Tour (WhatsApp)
```
Olá! 👋

Foi um prazer mostrar-te o Porto hoje! 🇵🇹

Aqui estão todas as minhas recomendações:
👉 [SEU-LINK]

Se gostaste do tour, ajudava-me IMENSO se deixasses uma review rápida (2min) 🙏
Está tudo no link acima!

Obrigada e aproveita o resto da tua estadia! ❤️
```

### QR Code (Opcional)

Cria um QR code do teu site em:
- https://www.qr-code-generator.com/
- Imprime num cartão bonito
- Entrega no final do tour

## 🔄 Evolução Futura

### Fase 2 (Curto Prazo)
- [ ] Adicionar mais recomendações (objetivo: 20-30)
- [ ] Fotos reais dos locais
- [ ] Secção "Perguntas Frequentes"
- [ ] Mapa interativo

### Fase 3 (Médio Prazo)
- [ ] Blog com artigos sobre o Porto
- [ ] Newsletter (captura de emails)
- [ ] Versão em inglês
- [ ] Integração com Instagram

### Fase 4 (Longo Prazo)
- [ ] Sistema de reservas
- [ ] Tours privados
- [ ] Parcerias com restaurantes
- [ ] App mobile

## 🛠️ Estrutura de Ficheiros

```
guia_pia/
├── index.html              # Página principal
├── styles.css              # Estilos (mobile-first)
├── app.js                  # JavaScript (carrega JSON, filtros)
├── data/
│   └── recommendations.json # Todas as recomendações
├── README.md               # Esta documentação
└── .gitignore             # Ficheiros a ignorar no Git
```

## 🆘 Troubleshooting

### Site não aparece no GitHub Pages
- Verifica que o repositório é público (ou tens GitHub Pro)
- Confirma que o branch está correto (Settings → Pages)
- Aguarda 5-10 minutos após ativar

### Recomendações não aparecem
- Abre a consola do browser (F12)
- Verifica se há erros no carregamento do JSON
- Confirma que o caminho `data/recommendations.json` está correto

### Layout quebrado no mobile
- Testa em https://responsivedesignchecker.com/
- Verifica se não adicionaste CSS que quebra o mobile-first

## 📞 Suporte

Para questões técnicas:
- Consulta a documentação do GitHub Pages: https://pages.github.com/
- Stack Overflow para problemas específicos

## 📄 Licença

Este projeto é de uso pessoal. Sente-te livre para adaptar ao teu negócio!

---

**Feito com ❤️ para guias turísticos que querem fazer a diferença!**
