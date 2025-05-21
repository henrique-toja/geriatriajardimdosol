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

(function() {
  // Já consentiu? Não mostra de novo
  if (localStorage.getItem('cookieConsentGD')) return;

  // CSS do banner
  const consentCSS = `
    .consent-banner {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      z-index: 99999;
      background: #fff;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.07), 0 -1.5px 0 #4FD1C5;
      padding: 28px 16px 20px;
      font-family: 'Open Sans', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: box-shadow .3s;
    }
    .consent-main, .consent-settings {
      width: 100%;
      max-width: 420px;
      margin: 0 auto;
      text-align: center;
    }
    .consent-text {
      font-size: 1.18rem;
      color: #285E61;
      margin-bottom: 1.8rem;
      display: block;
      font-weight: 500;
    }
    .consent-text a {
      color: #4FD1C5;
      text-decoration: underline;
      font-weight: 600;
      transition: color .18s;
    }
    .consent-text a:hover {
      color: #38B2AC;
    }
    .consent-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      margin-top: 1.5rem;
    }
    .consent-btn {
      font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
      font-size: 1.14rem;
      font-weight: 700;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      border: none;
      transition: all 0.35s ease;
      padding: 1.15em 0;
      width: 100%;
      max-width: 340px;
      cursor: pointer;
      outline: none;
    }
    .consent-btn-ok {
      background: linear-gradient(95deg, #4FD1C5, #38B2AC);
      color: #fff;
      font-size: 1.23rem;
      box-shadow: 0 3px 10px -2px #4FD1C5;
      letter-spacing: 0.02em;
      margin-bottom: 5px;
      border: 2.5px solid #4FD1C5;
    }
    .consent-btn-ok:hover {
      background: linear-gradient(105deg, #285E61, #9F7AEA);
      box-shadow: 0 6px 20px -4px #285E61;
      color: #fff;
      border-color: #285E61;
      transform: translateY(-2px) scale(1.03);
    }
    .consent-btn-custom, .consent-btn-save, .consent-btn-back {
      background: #fff;
      color: #4FD1C5;
      border: 2px solid #4FD1C5;
      font-weight: 600;
    }
    .consent-btn-custom:hover, .consent-btn-save:hover, .consent-btn-back:hover {
      background: #4FD1C5;
      color: #fff;
    }
    .consent-btn-save {
      margin-bottom: 0.6rem;
    }
    .consent-btn-back {
      border: 2px solid #ccc;
      background: #fafafa;
      color: #285E61;
    }
    .consent-settings {
      background: #F7FAFC;
      border-radius: 10px;
      padding: 22px 16px 14px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-top: 0.5rem;
      text-align: left;
      animation: fadeIn .34s;
    }
    .consent-settings h3 {
      text-align: center;
      font-size: 1.25rem;
      color: #285E61;
      margin-bottom: 1.2rem;
      font-family: 'Montserrat', sans-serif;
    }
    .consent-settings label {
      display: flex;
      align-items: center;
      gap: 0.7em;
      margin-bottom: 1em;
      font-size: 1.05rem;
      color: #2D3748;
      cursor: pointer;
    }
    .consent-settings input[type="checkbox"] {
      accent-color: #4FD1C5;
      width: 20px; height: 20px;
    }
    @media (max-width: 600px) {
      .consent-banner {
        padding: 17px 2vw 13px;
      }
      .consent-main, .consent-settings {
        max-width: 98vw;
      }
      .consent-btn {
        max-width: 98vw;
        font-size: 1rem;
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(24px);}
      to { opacity: 1; transform: translateY(0);}
    }
  `;

  // Adiciona o CSS ao <head>
  if (!document.getElementById('consent-style')) {
    var s = document.createElement('style');
    s.id = 'consent-style';
    s.textContent = consentCSS;
    document.head.appendChild(s);
  }

  // HTML do banner
  const consentHTML = `
    <div class="consent-main">
      <span class="consent-text">
        Para uma experiência incrível neste site, usamos cookies para personalizar conteúdos e analisar o tráfego. <a href="/politica-de-privacidade" target="_blank">Saiba mais</a>.
      </span>
      <div class="consent-actions">
        <button class="consent-btn consent-btn-ok" id="consent-ok">OK</button>
        <button class="consent-btn consent-btn-custom" id="consent-custom">Definir cookies</button>
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

  // Cria e injeta o banner
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className = 'consent-banner';
  banner.innerHTML = consentHTML;
  document.body.appendChild(banner);

  // Funções utilitárias
  function setConsent(consent) {
    localStorage.setItem('cookieConsentGD', JSON.stringify(consent));
  }

  // Elementos
  const btnOK = document.getElementById('consent-ok');
  const btnCustom = document.getElementById('consent-custom');
  const settings = document.getElementById('cookie-settings');
  const btnSave = document.getElementById('consent-save');
  const btnBack = document.getElementById('consent-back');
  const analytics = document.getElementById('cookie-analytics');
  const marketing = document.getElementById('cookie-marketing');

  // Abrir customização
  btnCustom.onclick = function() {
    banner.querySelector('.consent-main').style.display = "none";
    settings.style.display = "block";
  };
  btnBack.onclick = function() {
    settings.style.display = "none";
    banner.querySelector('.consent-main').style.display = "block";
  };

  // Clicar em OK
  btnOK.onclick = function() {
    setConsent({analytics:true, marketing:true, date:Date.now()});
    banner.remove();
    // Chame scripts de analytics aqui, se necessário
  };
  // Salvar preferências customizadas
  btnSave.onclick = function() {
    setConsent({
      analytics: analytics.checked,
      marketing: marketing.checked,
      date: Date.now()
    });
    banner.remove();
    // Ative/desative scripts conforme escolha
  };
})();

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