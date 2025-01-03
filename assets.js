// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Asset Initialization
const playerImg = new Image();
playerImg.src = 'assets/player.png';

const mapImg = new Image();
mapImg.src = 'assets/map.png';

const enemyImg = new Image();
enemyImg.src = 'assets/enemy.png';

const battleBackgroundImg = new Image();
battleBackgroundImg.src = 'assets/battle-background.png';
battleBackgroundImg.onload = () => console.log('Battle background loaded successfully');

// Export assets
export {
    canvas,
    ctx, // Export ctx ONLY ONCE from here
    playerImg,
    mapImg,
    enemyImg,
    battleBackgroundImg
};
