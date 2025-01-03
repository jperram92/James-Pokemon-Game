// assets.js

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Asset Initialization
const playerImg = new Image();
playerImg.src = 'assets/player.png';
playerImg.onload = () => console.log('Player image loaded successfully');

const mapImg = new Image();
mapImg.src = 'assets/map.png';
mapImg.onload = () => console.log('Map image loaded successfully');

const enemyImg = new Image();
enemyImg.src = 'assets/enemy.png';
enemyImg.onload = () => console.log('Enemy image loaded successfully');

const battleBackgroundImg = new Image();
battleBackgroundImg.src = 'assets/battle-background.png';
battleBackgroundImg.onload = () => console.log('Battle background loaded successfully');

// Export everything
export {
    canvas,
    ctx,
    playerImg,
    mapImg,
    enemyImg,
    battleBackgroundImg,
};
