const player = document.getElementById('player');
const praiaImage = document.getElementById('praia-image');
const praiaLabel = document.getElementById('praia-label');
const storyModal = document.getElementById('story-modal');
const storyTitle = document.getElementById('story-title');
const storyImage = document.getElementById('story-image');
const storyDescription = document.getElementById('story-description');
const closeModal = document.getElementById('close-modal');

let playerX = 50;
let playerY = 50;
const speed = 10;

// Dados dos destinos
const destinations = {
  aeroporto: {
    title: "Aeroporto",
    image: "aeroporto.png",
    description: "Cheguei em Maceió na véspera de ano novo. Curiosidade: Fui revistado pela Polícia Federal"
  },
  praia: {
    title: "Praia",
    image: "praia.jpg", 
    description: "Fui em umas 5 praias diferentes"
  },
  hotel: {
    title: "Hotel",
    image: "hotel.png",
    description: "Fiquei em um hotel que tinha um monte de gringo, falei com um mexicano, um americano e um argentino"
  },
  restaurante: {
    title: "Restaurante",
    image: "restaurante.jpg",
    description: "Restaurante/Quiosque na beira da Praia, que tem pagode ao vivo e comidas típicas"
  },
  parque: {
    title: "Marco dos corais",
    image: "corais.jpeg",
    description: "Um dos melhores lugares para ver o por do sol e o nascer do dia, fica sob o mar"
  }
};

// Dados das praias (para o carrossel)
const praias = [
  { image: "praia.jpg", label: "Praia de Pajuçara" },
  { image: "praia2.jpg", label: "Praia de Ponta Verde" },
  { image: "waves.jpg", label: "Praia de Jatiúca" }
];
let praiaIndex = 0;
let carouselInterval;

// Função para mover o personagem
function movePlayer(event) {
  switch (event.key) {
    case 'ArrowUp':
      playerY -= speed;
      break;
    case 'ArrowDown':
      playerY += speed;
      break;
    case 'ArrowLeft':
      playerX -= speed;
      break;
    case 'ArrowRight':
      playerX += speed;
      break;
  }

  // Limita o movimento dentro da tela
  playerX = Math.max(0, Math.min(window.innerWidth - 50, playerX));
  playerY = Math.max(0, Math.min(window.innerHeight - 50, playerY));

  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

  checkCollision();
}

// Verifica colisão com destinos
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const aeroportoRect = document.getElementById('aeroporto').getBoundingClientRect();
  const praiaRect = document.getElementById('praia').getBoundingClientRect();
  const hotelRect = document.getElementById('hotel').getBoundingClientRect();
  const restauranteRect = document.getElementById('restaurante').getBoundingClientRect();
  const parqueRect = document.getElementById('parque').getBoundingClientRect();

  if (isColliding(playerRect, aeroportoRect)) {
    showStory(destinations.aeroporto);
  } else if (isColliding(playerRect, praiaRect)) {
    startCarousel(); // Inicia o carrossel da praia
    showStory(destinations.praia); // Mostra o modal da praia
  } else if (isColliding(playerRect, hotelRect)) {
    showStory(destinations.hotel);
  } else if (isColliding(playerRect, restauranteRect)) {
    showStory(destinations.restaurante);
  } else if (isColliding(playerRect, parqueRect)) {
    showStory(destinations.parque);
  } else {
    stopCarousel(); // Para o carrossel se o personagem sair da praia
  }
}

// Inicia o carrossel da praia
function startCarousel() {
  if (carouselInterval) return; // Evita múltiplos intervalos
  carouselInterval = setInterval(() => {
    praiaIndex = (praiaIndex + 1) % praias.length; // Avança para a próxima praia
    praiaImage.src = praias[praiaIndex].image; // Atualiza a imagem
    praiaLabel.textContent = praias[praiaIndex].label; // Atualiza o nome
    destinations.praia.image = praias[praiaIndex].image; // Atualiza a imagem no modal
  }, 3000); // Muda a cada 3 segundos
}

// Para o carrossel da praia
function stopCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = null;
}

// Verifica se dois elementos estão colidindo
function isColliding(rect1, rect2) {
  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Exibe a história no modal
function showStory(destination) {
  storyTitle.textContent = destination.title;
  storyImage.src = destination.image;
  storyDescription.textContent = destination.description;
  storyModal.style.display = 'flex';
}

// Fecha o modal
closeModal.addEventListener('click', () => {
  storyModal.style.display = 'none';
});

// Adiciona o evento de movimentação
window.addEventListener('keydown', movePlayer);