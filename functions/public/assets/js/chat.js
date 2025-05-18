document.getElementById('chat-section').innerHTML = `
  <div class="chat-box">
    <div class="chat-header">
      <img src="assets/images/henriquetoja.jpg" class="chat-avatar" />
      <span class="chat-username">HenriqueToja</span>
    </div>
    <div class="chat-body">
      <textarea id="chat-msg" placeholder="Digite sua mensagem..." rows="2"></textarea>
      <button id="send-btn">➤</button>
    </div>
    <div id="chat-resposta" class="chat-resposta hidden"></div>
  </div>
`;

document.getElementById('send-btn').addEventListener('click', enviarMensagem);
document.getElementById('chat-msg').addEventListener('keypress', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarMensagem();
  }
});

function enviarMensagem() {
  const msgInput = document.getElementById('chat-msg');
  const respostaDiv = document.getElementById('chat-resposta');
  const mensagem = msgInput.value.trim();

  if (!mensagem) return;

  respostaDiv.classList.remove('hidden');
  respostaDiv.innerHTML = `<span class="typing">Digitando...</span>`;

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensagem })
  })
  .then(res => res.json())
  .then(data => {
    respostaDiv.innerHTML = `<span class="resposta">${data.resposta || 'Erro na resposta'}</span>`;
    msgInput.value = '';
  })
  .catch(() => {
    respostaDiv.innerHTML = `<span class="resposta erro">Erro ao conectar com o servidor.</span>`;
  });
}
