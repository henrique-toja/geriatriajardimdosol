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

// ----------- Consentimento de Cookies -----------

function setCookieConsent(status) {
  // status: 'accepted' ou 'rejected'
  const validity = (status === 'accepted') ? 365 : 30; // dias
  const record = {
    status: status,
    date: new Date().toISOString()
  };
  localStorage.setItem('cookieConsent', JSON.stringify(record));
  // Também salva a data para posterior verificação de expiração
}

function getCookieConsent() {
  const record = localStorage.getItem('cookieConsent');
  if (!record) return null;
  try {
    const obj = JSON.parse(record);
    if (!obj.status || !obj.date) return null;
    // Checa validade
    const now = new Date();
    const consentDate = new Date(obj.date);
    const days = (obj.status === 'accepted') ? 365 : 30;
    const ms = days * 24 * 60 * 60 * 1000;
    if (now - consentDate > ms) {
      localStorage.removeItem('cookieConsent');
      return null;
    }
    return obj.status;
  } catch {
    return null;
  }
}

// ----------- Banner de Consentimento -----------

function showConsentBanner() {
  if (document.getElementById('cookie-banner')) return; // Evita múltiplos
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.style.cssText = `
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
    background: #fff; border-top: 1px solid #ccc; padding: 16px 10px;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.05); font-family: sans-serif;
    display: flex; flex-direction: column; align-items: center;
  `;
  banner.innerHTML = `
    <span style="font-size: 16px;">
      Utilizamos cookies de marketing para melhorar sua experiência e exibir anúncios relevantes.
      Para saber mais, leia nossa <a href="/politica-de-privacidade" target="_blank" style="color: #006edc;">Política de Privacidade</a>.
    </span>
    <div style="margin-top:10px;">
      <button id="cookie-accept" style="margin-right: 8px; padding: 8px 20px; background: #006edc; color: #fff; border: none; border-radius: 3px; cursor: pointer;">Aceitar</button>
      <button id="cookie-reject" style="padding: 8px 20px; background: #ccc; color: #222; border: none; border-radius: 3px; cursor: pointer;">Recusar</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').onclick = function() {
    setCookieConsent('accepted');
    banner.remove();
    loadFacebookPixel();
    loadGoogleAnalyticsAndAds();
  }

  document.getElementById('cookie-reject').onclick = function() {
    setCookieConsent('rejected');
    banner.remove();
  }
}

// ----------- Inicialização -----------

window.addEventListener('DOMContentLoaded', function() {
  const consent = getCookieConsent();
  if (consent === 'accepted') {
    loadFacebookPixel();
    loadGoogleAnalyticsAndAds();
  } else if (!consent || consent === 'rejected') {
    showConsentBanner();
  }
});