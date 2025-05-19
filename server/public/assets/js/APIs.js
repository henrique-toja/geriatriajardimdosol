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


document.addEventListener('DOMContentLoaded', function() {
  // Defina o número do WhatsApp uma única vez:
  const whatsappNumber = '555197879151'; // só números, com DDI e DDD
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Seleciona todos os botões com a classe
  document.querySelectorAll('.whatsapp-btn').forEach(function(btn) {
    btn.setAttribute('href', whatsappLink);
    // Se quiser garantir o target e rel:
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });
});

const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre o Jardim do Sol Geriatria.');
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${mensagem}`;