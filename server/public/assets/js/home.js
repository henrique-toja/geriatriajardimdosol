const acomodacoesSlides = document.querySelectorAll('.acomodacoes-slide');
const acomodacoesPrev = document.querySelector('.acomodacoes-carousel-btn.prev');
const acomodacoesNext = document.querySelector('.acomodacoes-carousel-btn.next');
let acomodacoesCurrent = 0;
let acomodacoesAuto = true;
let acomodacoesTimer = null;

function showAcomodacoesSlide(idx) {
  acomodacoesSlides.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
  acomodacoesCurrent = idx;
}

function nextAcomodacoesSlide() {
  let idx = (acomodacoesCurrent + 1) % acomodacoesSlides.length;
  showAcomodacoesSlide(idx);
}
function prevAcomodacoesSlide() {
  let idx = (acomodacoesCurrent - 1 + acomodacoesSlides.length) % acomodacoesSlides.length;
  showAcomodacoesSlide(idx);
}

function startAcomodacoesAuto() {
  acomodacoesAuto = true;
  acomodacoesTimer = setInterval(() => {
    if (acomodacoesAuto) nextAcomodacoesSlide();
  }, 4000);
}
function stopAcomodacoesAuto() {
  acomodacoesAuto = false;
  clearInterval(acomodacoesTimer);
}

acomodacoesNext.addEventListener('click', () => {
  nextAcomodacoesSlide();
  stopAcomodacoesAuto();
});
acomodacoesPrev.addEventListener('click', () => {
  prevAcomodacoesSlide();
  stopAcomodacoesAuto();
});
acomodacoesSlides.forEach(slide => {
  slide.addEventListener('click', stopAcomodacoesAuto);
});
showAcomodacoesSlide(0);
startAcomodacoesAuto();


const serviceCards = document.querySelectorAll('.service-card');
const servicesPrev = document.querySelector('.services-carousel-btn.prev');
const servicesNext = document.querySelector('.services-carousel-btn.next');
const servicesCarousel = document.querySelector('.services-carousel');
let serviceCurrent = 0;

function updateServiceCarousel() {
  // Move o carrossel para mostrar o card atual + metade do próximo
  const cardWidth = 320 + 20; // card + margin
  servicesCarousel.scrollTo({
    left: serviceCurrent * cardWidth,
    behavior: 'smooth'
  });
}

servicesNext.addEventListener('click', () => {
  if (serviceCurrent < serviceCards.length - 1) {
    serviceCurrent++;
    updateServiceCarousel();
  }
});
servicesPrev.addEventListener('click', () => {
  if (serviceCurrent > 0) {
    serviceCurrent--;
    updateServiceCarousel();
  }
});

updateServiceCarousel();

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('sobreVideo');
  if (video) {
    let loaded = false;
    video.addEventListener('play', function onPlay() {
      if (!loaded) {
        const source = document.createElement('source');
        source.src = 'assets/images/jardimdosol.mp4';
        source.type = 'video/mp4';
        video.appendChild(source);
        video.load();
        loaded = true;
        video.play();
      }
    }, { once: true });
  }
});