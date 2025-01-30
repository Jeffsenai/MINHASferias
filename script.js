const player = document.getElementById('player');
const aeroporto = document.getElementById('aeroporto');
const praia = document.getElementById('praia');
const hotel = document.getElementById('hotel');
const restaurante = document.getElementById('restaurante');
const parque = document.getElementById('parque');
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
    description: "Você chegou ao aeroporto! Prepare-se para uma aventura incrível."
  },
  praia: {
    title: "Praia",
    image: "praia.jpg",
    description: "Você chegou à praia! Aproveite o sol, o mar e a brisa."
  },
  hotel: {
    title: "Hotel",
    image: "hotel.png",
    description: "Você chegou ao hotel! Hora de descansar e recarregar as energias."
  },
  restaurante: {
    title: "Restaurante",
    image: "restaurante.jpg",
    description: "Você chegou ao restaurante! Delicie-se com os pratos locais."
  },
  parque: {
    title: "Parque",
    image: "parque.jpg",
    description: "Você chegou ao parque! Aproveite a natureza e a tranquilidade."
  }
};

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
  const aeroportoRect = aeroporto.getBoundingClientRect();
  const praiaRect = praia.getBoundingClientRect();
  const hotelRect = hotel.getBoundingClientRect();
  const restauranteRect = restaurante.getBoundingClientRect();
  const parqueRect = parque.getBoundingClientRect();

  if (isColliding(playerRect, aeroportoRect)) {
    showStory(destinations.aeroporto);
  } else if (isColliding(playerRect, praiaRect)) {
    showStory(destinations.praia);
  } else if (isColliding(playerRect, hotelRect)) {
    showStory(destinations.hotel);
  } else if (isColliding(playerRect, restauranteRect)) {
    showStory(destinations.restaurante);
  } else if (isColliding(playerRect, parqueRect)) {
    showStory(destinations.parque);
  }
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