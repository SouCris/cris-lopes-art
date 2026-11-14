// Menu mobile independente da página inicial
const toggle=document.querySelector('.menu-toggle');
const nav=document.getElementById('menu-principal');
if(toggle&&nav){const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');toggle.textContent='☰'};toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');toggle.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}

// Navegação acessível: setas, números e gestos de deslizar no celular.
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.folio-carousel-track');
  const cards = [...track.querySelectorAll('.folio-card')];
  const prev = carousel.querySelector('.folio-prev');
  const next = carousel.querySelector('.folio-next');
  const pagesBox = carousel.querySelector('.folio-pages');
  const count = carousel.querySelector('.folio-count');
  let current = 0, positions = [];

  function pagePositions() {
    const visible = Math.max(1, Math.round(track.clientWidth / (cards[0]?.getBoundingClientRect().width || 1)));
    const max = Math.max(0, cards.length - visible);
    const steps = [];
    for (let i = 0; i <= max; i += visible) steps.push(i);
    if (steps[steps.length - 1] !== max) steps.push(max);
    return [...new Set(steps)];
  }
  function goTo(index) {
    current = Math.max(0, Math.min(index, positions.length - 1));
    const cardIndex = positions[current] || 0;
    track.scrollTo({left: cards[cardIndex]?.offsetLeft - cards[0].offsetLeft || 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    update();
  }
  function update() {
    prev.disabled = current === 0;
    next.disabled = current === positions.length - 1;
    [...pagesBox.children].forEach((b,i) => {
      b.classList.toggle('is-active', i === current);
      b.setAttribute('aria-current', i === current ? 'page' : 'false');
    });
    if(count)count.textContent = `${String(current + 1).padStart(2,'0')} / ${String(positions.length).padStart(2,'0')}`;
  }
  function build() {
    positions = pagePositions();
    current = Math.min(current, positions.length - 1);
    carousel.classList.toggle('is-static', positions.length === 1);
    pagesBox.replaceChildren();
    positions.forEach((_,i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'folio-page';
      btn.textContent = String(i + 1).padStart(2,'0');
      btn.setAttribute('aria-label', `Ir para página ${i + 1} de ${positions.length}`);
      btn.addEventListener('click', () => goTo(i));
      pagesBox.append(btn);
    });
    update();
  }
  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  let raf = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const start = cards[0].offsetLeft;
      const relative = track.scrollLeft + start;
      current = positions.reduce((best, pos, i) =>
        Math.abs(cards[pos].offsetLeft - relative) < Math.abs(cards[positions[best]].offsetLeft - relative) ? i : best, 0);
      update();
    });
  }, {passive:true});
  let resize;
  window.addEventListener('resize', () => {
    clearTimeout(resize);
    resize = setTimeout(build, 150);
  });
  build();
});


// Corrige o espaço ocupado pelo cabeçalho fixo nos vários tamanhos.
const portfolioHeader=document.querySelector('.pagina-portfolio > header');
function syncPortfolioHeader(){
  if(portfolioHeader){document.body.style.setProperty('--folio-header-height',Math.ceil(portfolioHeader.getBoundingClientRect().height)+'px');}
}
window.addEventListener('resize',syncPortfolioHeader);
window.addEventListener('load',syncPortfolioHeader);
syncPortfolioHeader();



// Filtros das categorias: exibem uma seção ou todas, sem destruir os carrosséis.
(function(){
 const buttons=[...document.querySelectorAll('.folio-category-filters [data-filter]')];
 const sections=[...document.querySelectorAll('.folio-category[data-filter-section]')];
 if(!buttons.length||!sections.length)return;
 buttons.forEach(button=>button.addEventListener('click',()=>{
   const value=button.dataset.filter;
   buttons.forEach(b=>{
     const selected=b===button;
     b.classList.toggle('is-active',selected);
     b.setAttribute('aria-pressed',String(selected));
   });
   sections.forEach(section=>{section.hidden=value!=='todos'&&section.dataset.filterSection!==value});
   // Atualiza os controles se o carrossel estava escondido ao iniciar.
   window.dispatchEvent(new Event('resize'));
 }));
})();
