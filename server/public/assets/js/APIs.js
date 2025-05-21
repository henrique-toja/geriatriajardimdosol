(function() {
  if (localStorage.getItem('cookieConsentGD')) return;

  // --- CSS otimizado e responsivo ---
  const consentCSS = `
    .consent-banner {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      background: transparent;
      pointer-events: none;
    }
    .consent-inner {
      background: var(--white, #fff);
      color: var(--text-color, #2D3748);
      font-family: 'Open Sans', Arial, sans-serif;
      font-size: 1rem;
      border-radius: 22px 22px 0 0;
      box-shadow: 0 -2px 18px rgba(44, 122, 123, 0.15), 0 2px 10px #0001;
      padding: 2rem 2.5rem 1.5rem 2.5rem;
      max-width: 440px;
      width: 98vw;
      margin: 0 auto 18px auto;
      display: flex;
      flex-direction: column;
      gap: 22px;
      align-items: center;
      pointer-events: all;
      animation: fadeInUp .5s;
    }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none;} }
    .consent-main, .consent-settings {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 18px;
      align-items: center;
      justify-content: center;
    }
    .consent-text {
      font-size: 1.08rem;
      color: var(--primary-dark, #285E61);
      text-align: center;
      line-height: 1.6;
    }
    .consent-text a {
      color: var(--primary-color, #2C7A7B);
      text-decoration: underline;
      font-weight: 600;
    }
    .consent-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      margin-top: 6px;
      align-items: center;
    }
    .consent-btn {
      padding: 13px 0;
      border: none;
      cursor: pointer;
      font-weight: 700;
      border-radius: 9px;
      font-size: 1.09rem;
      transition: var(--transition-base, all 0.33s);
      width: 100%;
      max-width: 310px;
      margin: 0 auto;
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.12));
      letter-spacing: 0.01em;
    }
    .consent-btn-ok {
      background: linear-gradient(90deg, var(--primary-color, #2C7A7B), var(--accent-color, #38B2AC));
      color: var(--white, #fff);
      border: 2px solid var(--primary-color, #2C7A7B);
      font-size: 1.14rem;
    }
    .consent-btn-ok:hover {
      background: linear-gradient(90deg, var(--primary-dark, #285E61), var(--accent-color, #38B2AC));
      border-color: var(--primary-dark, #285E61);
    }
    .consent-btn-custom, .consent-btn-back {
      background: var(--primary-light, #4FD1C5);
      color: var(--primary-dark, #285E61);
      border: 2px solid var(--primary-light, #4FD1C5);
    }
    .consent-btn-custom:hover, .consent-btn-back:hover {
      background: var(--primary-dark, #285E61);
      color: var(--white, #fff);
      border-color: var(--primary-dark, #285E61);
    }
    .consent-btn-save {
      background: var(--secondary-color, #9F7AEA);
      color: var(--white, #fff);
      border: 2px solid var(--secondary-color, #9F7AEA);
    }
    .consent-btn-save:hover {
      background: var(--primary-dark, #285E61);
      border-color: var(--primary-dark, #285E61);
      color: var(--white, #fff);
    }
    .consent-settings h3 {
      margin-bottom: 8px;
      color: var(--primary-dark, #285E61);
      text-align: center;
      font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
    }
    .consent-settings label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 1.03rem;
      color: var(--text-color, #2D3748);
    }
    .consent-settings input[type="checkbox"] {
      accent-color: var(--primary-color, #2C7A7B);
      width: 19px;
      height: 19px;
    }
    @media (max-width: 600px) {
      .consent-inner {
        padding: 1.3rem 3vw 0.7rem 3vw;
        max-width: 98vw;
      }
      .consent-btn {
        font-size: 1rem;
        max-width: 100vw;
      }
    }
  `;

  if (!document.getElementById('consent-style')) {
    var s = document.createElement('style');
    s.id = 'consent-style';
    s.textContent = consentCSS;
    document.head.appendChild(s);
  }

  // --- HTML centralizado e elegante ---
  const consentHTML = `
    <div class="consent-inner">
      <div class="consent-main">
        <span class="consent-text">
          Utilizamos cookies neste site para otimizar e personalizar sua navegação. Ao clicar em OK, você concorda com nossa <a href="/politica-de-privacidade.html" target="_blank">Política de Privacidade</a> e com a <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank">LEI GERAL DE PROTEÇÃO DE DADOS (LGPD)</a>.
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
            < (sempre ativos)
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

  // Seletores já dentro do .consent-inner
  const btnOK = banner.querySelector('#consent-ok');
  const btnCustom = banner.querySelector('#consent-custom');
  const settings = banner.querySelector('#cookie-settings');
  const btnSave = banner.querySelector('#consent-save');
  const btnBack = banner.querySelector('#consent-back');
  const analytics = banner.querySelector('#cookie-analytics');
  const marketing = banner.querySelector('#cookie-marketing');

  btnCustom.onclick = function() {
    banner.querySelector('.consent-main').style.display = "none";
    settings.style.display = "flex";
  };
  btnBack.onclick = function() {
    settings.style.display = "none";
    banner.querySelector('.consent-main').style.display = "flex";
  };

  btnOK.onclick = function() {
    const consent = {analytics: true, marketing: true, date: Date.now()};
    setConsent(consent);
    banner.remove();
    if (typeof loadGoogleAnalyticsAndAds === 'function' && consent.analytics) loadGoogleAnalyticsAndAds();
    if (typeof loadFacebookPixel === 'function' && consent.marketing) loadFacebookPixel();
  };

  btnSave.onclick = function() {
    const consent = {
      analytics: analytics.checked,
      marketing: marketing.checked,
      date: Date.now()
    };
    setConsent(consent);
    banner.remove();
    if (typeof loadGoogleAnalyticsAndAds === 'function' && consent.analytics) loadGoogleAnalyticsAndAds();
    if (typeof loadFacebookPixel === 'function' && consent.marketing) loadFacebookPixel();
  };
})();

// Inicialização para scripts externos
window.addEventListener('DOMContentLoaded', function () {
  const consentGD = localStorage.getItem('cookieConsentGD');
  if (!consentGD) return;
  try {
    const consent = JSON.parse(consentGD);
    if (typeof loadGoogleAnalyticsAndAds === 'function' && consent.analytics) loadGoogleAnalyticsAndAds();
    if (typeof loadFacebookPixel === 'function' && consent.marketing) loadFacebookPixel();
  } catch {}
});