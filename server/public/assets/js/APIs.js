// APIs.js

// ----------- Funções para carregar scripts de marketing -----------

// Facebook Pixel
function loadFacebookPixel() {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1729771167889310');
  fbq('track', 'PageView');
}

// Google Analytics e Google Ads
function loadGoogleAnalyticsAndAds() {
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-ET9GB36ZV3";
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-ET9GB36ZV3');
  gtag('event', 'conversion', {'send_to': 'AW-635257063/6qEnCMHknd0BEOeB9a4C'});
}

// ----------- Banner de Consentimento -----------

(function() {
  if (localStorage.getItem('cookieConsentGD')) return;

  const consentCSS = `/* ... (mantém todo o CSS existente) ... */`;

  if (!document.getElementById('consent-style')) {
    var s = document.createElement('style');
    s.id = 'consent-style';
    s.textContent = consentCSS;
    document.head.appendChild(s);
  }

  const consentHTML = `
      <div class="consent-actions">
        <button class="consent-btn consent-btn-ok" id="consent-ok">OK</button>
        <button class="consent-btn consent-btn-custom" id="consent-custom">Definir cookies</button>
    <div class="consent-main">
      <span class="consent-text">
        Este site, utiliza cookies para otimizar e personalizar a experiência de navegação, ao clicar em OK, você concorda com os termos da Lei Geral de Proteção de Dados(LGPD)<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank">Saiba mais</a>.
      </span>
      </div>
    </div>
    <div class="consent-settings" id="cookie-settings" style="display: none;">
      <form>
        <h3>Preferências de Cookies</h3>
        <label>
          <input type="checkbox" checked disabled>
          <strong>Necessários</strong> (sempre ativos)
        </label>
        <label>
          <input type="checkbox" id="cookie-analytics" checked>
          Estatísticas (ajudam a melhorar o site)
        </label>
        <label>
          <input type="checkbox" id="cookie-marketing" checked>
          Marketing (tornar anúncios mais relevantes)
        </label>
        <div class="consent-actions">
          <button class="consent-btn consent-btn-save" id="consent-save" type="button">Salvar preferências</button>
          <button class="consent-btn consent-btn-back" id="consent-back" type="button">Voltar</button>
        </div>
      </form>
    </div>
  `;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className = 'consent-banner';
  banner.innerHTML = consentHTML;
  document.body.appendChild(banner);

  function setConsent(consent) {
    localStorage.setItem('cookieConsentGD', JSON.stringify(consent));
  }

  const btnOK = document.getElementById('consent-ok');
  const btnCustom = document.getElementById('consent-custom');
  const settings = document.getElementById('cookie-settings');
  const btnSave = document.getElementById('consent-save');
  const btnBack = document.getElementById('consent-back');
  const analytics = document.getElementById('cookie-analytics');
  const marketing = document.getElementById('cookie-marketing');

  btnCustom.onclick = function() {
    banner.querySelector('.consent-main').style.display = "none";
    settings.style.display = "block";
  };
  btnBack.onclick = function() {
    settings.style.display = "none";
    banner.querySelector('.consent-main').style.display = "block";
  };

  btnOK.onclick = function() {
    const consent = {analytics: true, marketing: true, date: Date.now()};
    setConsent(consent);
    banner.remove();
    if (consent.analytics) loadGoogleAnalyticsAndAds();
    if (consent.marketing) loadFacebookPixel();
  };

  btnSave.onclick = function() {
    const consent = {
      analytics: analytics.checked,
      marketing: marketing.checked,
      date: Date.now()
    };
    setConsent(consent);
    banner.remove();
    if (consent.analytics) loadGoogleAnalyticsAndAds();
    if (consent.marketing) loadFacebookPixel();
  };
})();

// ----------- Inicialização -----------

window.addEventListener('DOMContentLoaded', function () {
  const consentGD = localStorage.getItem('cookieConsentGD');
  if (!consentGD) return;

  try {
    const consent = JSON.parse(consentGD);
    if (consent.analytics) loadGoogleAnalyticsAndAds();
    if (consent.marketing) loadFacebookPixel();
  } catch {
    // ignora erro
  }
});