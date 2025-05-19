// Facebook Pixel (Meta Pixel) -----------------------------
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1729771167889310');
fbq('track', 'PageView');

// Leads -----------------------------
(function(a,b,c,d){try{var e=b.head||b.getElementsByTagName("head")[0];var f=b.createElement("script");f.setAttribute("src",c);f.setAttribute("charset","UTF-8");f.defer=true;a.neuroleadId=d;e.appendChild(f)}catch(g){}})(window,document,"https://cdn.leadster.com.br/neurolead/neurolead.min.js","n1KtVCoHGEyvTCCNhhJf9P6p3")



  gtag('event', 'conversion', {'send_to': 'AW-635257063/6qEnCMHknd0BEOeB9a4C'});



// Carrega o componente Google Maps Extended Component Library
(function() {
  if (!window.customElements || !window.customElements.get('gmpx-store-locator')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
    document.head.appendChild(script);
  }
})();

// Configuração do Store Locator
const CONFIGURATION = {
  "locations": [
    {
      "title":"Jardim do Sol Geriatria",
      "address1":"Rua Dom Jaime de Barros Camara 165",
      "address2":"Porto Alegre, RS, Brazil",
      "coords":{"lat":-30.0095812,"lng":-51.130349},
      "placeId":"ChIJoXHYQTN3GZURnJNIA0tiZgo",
      "actions":[{"label":"Book appointment","defaultUrl":"https://www.facebook.com/geriatriajardimdosol/"}]
    }
  ],
  "mapOptions": {
    "center": {"lat": -30.0095812, "lng": -51.130349},
    "fullscreenControl": true,
    "mapTypeControl": false,
    "streetViewControl": false,
    "zoom": 16,
    "zoomControl": true,
    "maxZoom": 17,
    "mapId": ""
  },
  "mapsApiKey": "AIzaSyBB9CpBSTmCrkETKfTr69VdYTQ9-fbkzQk",
  "capabilities": {"input":true,"autocomplete":true,"directions":true,"distanceMatrix":true,"details":true,"actions":true}
};

// Inicializa o mapa quando a página carrega
document.addEventListener('DOMContentLoaded', async () => {
  // Espera o componente customizado estar disponível
  if (window.customElements) {
    await customElements.whenDefined('gmpx-store-locator');
    const locator = document.querySelector('gmpx-store-locator');
    if(locator) locator.configureFromQuickBuilder(CONFIGURATION);
  }
});
