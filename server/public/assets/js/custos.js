    function atualizarSliderPreenchimento() {
      const slider = document.getElementById("nivelCuidados");
      const fill = document.getElementById("sliderFill");
      const min = parseInt(slider.min, 10);
      const max = parseInt(slider.max, 10);
      const val = parseInt(slider.value, 10);
      const percent = ((val - min) / (max - min));
      fill.style.width = `${percent * 100}%`;
      // Update gradient based on level
      if (val === 1) {
        fill.style.background = "linear-gradient(90deg, #36a165 0%, #36a165 100%)";
      } else if (val === 2) {
        fill.style.background = "linear-gradient(90deg, #36a165 0%, #FFC300 100%)";
      } else {
        fill.style.background = "linear-gradient(90deg, #C62828 0%, #C62828 100%)";
      }
    }

    let frequencia = 'semestral';
    const quartos = [
      { cod: "q3", label: "Quarto Triplo", img: "quarto3.jpg" },
      { cod: "q2", label: "Quarto Duplo", img: "quarto2.jpg" },
      { cod: "q1", label: "Quarto Individual", img: "quarto1.jpg" }
    ];
    const niveisResumo = [
      {
        titulo: "Paciente com baixa complexidade",
        descricao: "Seu familiar é independente para a maioria das tarefas e precisa apenas de supervisão leve e companhia."
      },
      {
        titulo: "Paciente com média complexidade",
        descricao: "Seu familiar necessita de auxílio parcial e acompanhamento em algumas atividades do dia a dia, como higiene, locomoção ou alimentação."
      },
      {
        titulo: "Paciente com alta complexidade",
        descricao: "Seu familiar precisa de suporte próximo e contínuo, com atenção total em todas as suas necessidades e bem-estar."
      }
    ];
    const roomBase = { q3: 3000, q2: 3500, q1: 4000 };
    const complexityMultipliers = [1.00, 1.15, 1.30];
    const frequencyMultipliers = { semestral: 1.00, trimestral: 1.15, mensal: 1.30 };
    const mesesPorPlano = { semestral: 6, trimestral: 3, mensal: 1 };
    let currentIndex = 0;

    function atualizarDescricaoNivel() {
      const nivel = parseInt(document.getElementById("nivelCuidados").value);
      const info = niveisResumo[nivel - 1];
      document.getElementById("descricaoNivel").innerHTML = `
        <div style="margin-top:10px;">
          <strong style="color:#2e7d32;">${info.titulo}</strong>
          <div style="font-size:0.98rem; color:#444; margin-top:4px;">${info.descricao}</div>
        </div>
      `;
    }

    function atualizarCarousel() {
      const nivel = parseInt(document.getElementById("nivelCuidados").value);
      const carouselTrack = document.getElementById('carouselTrack');
      carouselTrack.innerHTML = '';
      quartos.forEach((quarto) => {
        let precoMensal = roomBase[quarto.cod] *
                          complexityMultipliers[nivel - 1] *
                          frequencyMultipliers[frequencia];
        const mesesPlano = mesesPorPlano[frequencia];
        const precoTotal = Math.round(precoMensal * mesesPlano);
        const perfil = niveisResumo[nivel - 1];
        const mensagem = `Olá! Gostaria de avançar na contratação para meu familiar.
Quarto: ${quarto.label}
Perfil: ${perfil.titulo}
${perfil.descricao}
Período: ${frequencia.charAt(0).toUpperCase() + frequencia.slice(1)}

Por favor, envie orientações sobre os próximos passos.`;
        const linkWhats = `https://wa.me/555197879151?text=${encodeURIComponent(mensagem)}`;

        const card = document.createElement('div');
        card.className = 'plano-card';
        card.innerHTML = `
          <img src="${quarto.img}" alt="${quarto.label}">
          <h3>${quarto.label}</h3>
          <div class="preco-profissional">
            <span class="preco-mensal">
              ${mesesPlano > 1 ? `<strong>${mesesPlano}x</strong> de ` : ''}${precoMensal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
            </span>
            <span class="preco-total">
              Valor total do contrato: <strong>${precoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>
            </span>
            <span class="preco-obs">
              * sujeito a alterações
            </span>
          </div>
          <a href="${linkWhats}" class="btn-primary" target="_blank">Conversar no WhatsApp</a>
        `;
        carouselTrack.appendChild(card);
      });
      setTimeout(() => moveCarousel(currentIndex), 0);
    }

    function setFrequencia(tipo) {
      frequencia = tipo;
      document.querySelectorAll('.toggle-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(tipo)) {
          btn.classList.add('active');
        }
      });
      atualizarCarousel();
    }

    function moveCarousel(index) {
      const carouselTrack = document.getElementById('carouselTrack');
      const cards = carouselTrack.querySelectorAll('.plano-card');
      if (cards.length === 0) return;

      const container = document.getElementById('carouselContainer');
      const containerWidth = container.offsetWidth;
      const cardWidth = cards[0].offsetWidth + 16;
      let visible = Math.floor(containerWidth / cardWidth);
      visible = Math.max(1, Math.min(visible, cards.length));

      if (index < 0) index = 0;
      if (index > cards.length - visible) index = cards.length - visible;
      currentIndex = index;
      carouselTrack.style.transform = `translateX(-${index * cardWidth}px)`;

      document.getElementById('carouselPrevBtn').style.visibility = (currentIndex === 0) ? "hidden" : "visible";
      document.getElementById('carouselNextBtn').style.visibility = (currentIndex >= (cards.length - visible)) ? "hidden" : "visible";
    }

    window.addEventListener('resize', () => moveCarousel(currentIndex));

    document.addEventListener('DOMContentLoaded', () => {
      atualizarDescricaoNivel();
      atualizarSliderPreenchimento();
      atualizarCarousel();
      document.getElementById("nivelCuidados").addEventListener('input', function() {
        atualizarDescricaoNivel();
        atualizarSliderPreenchimento();
        atualizarCarousel();
      });
      document.getElementById('carouselPrevBtn').onclick = () => moveCarousel(currentIndex - 1);
      document.getElementById('carouselNextBtn').onclick = () => moveCarousel(currentIndex + 1);
    }); 