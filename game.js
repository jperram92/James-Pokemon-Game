// Game Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load Assets
const playerImg = new Image();
playerImg.src = 'assets/player.png';
playerImg.onload = () => console.log('Player sprite loaded successfully');

const enemyImg = new Image();
enemyImg.src = 'assets/enemy.png';
enemyImg.onload = () => console.log('Enemy sprite loaded successfully');

const mapImg = new Image();
mapImg.src = 'assets/map.png';
mapImg.onload = () => console.log('Map loaded successfully');

const battleBackgroundImg = new Image();
battleBackgroundImg.src = 'assets/battle-background.png';
battleBackgroundImg.onload = () => console.log('Battle background loaded successfully');

// Map Properties
const map = {
    width: 1024, // Adjust to your actual map width
    height: 1024, // Adjust to your actual map height
    viewWidth: canvas.width, // Viewport width
    viewHeight: canvas.height, // Viewport height
    startX: 0, // Start camera at bottom-left corner
    startY: 1024 - 480, // Bottom-left (Map height - canvas height)
};

// Player Object
const player = {
    x: 100, // Start near the bottom-left corner
    y: map.height - 100,
    width: 50,
    height: 50,
    speed: 5,
};

// Enemy Object (for battle)
const enemy = {
    x: 300,
    y: 200,
    width: 50,
    height: 50,
};

// Camera Object
const camera = {
    x: map.startX,
    y: map.startY,
    width: map.viewWidth,
    height: map.viewHeight,
};

// Game State
let gameState = 'exploration'; // 'exploration' | 'battle'

// Key Events
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update Player Movement and Camera
function updatePlayerAndCamera() {
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < map.height - player.height) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < map.width - player.width) player.x += player.speed;

    // Update Camera to Follow Player
    camera.x = Math.max(0, Math.min(player.x - camera.width / 2, map.width - camera.width));
    camera.y = Math.max(0, Math.min(player.y - camera.height / 2, map.height - camera.height));
}

// Check for Battle Trigger
function checkBattle() {
    if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    ) {
        gameState = 'battle';
    }
}

// Exploration Mode
function renderExploration() {
    // Draw the visible part of the map
    ctx.drawImage(
        mapImg,
        camera.x, camera.y, // Source X, Y
        camera.width, camera.height, // Source width, height
        0, 0, // Destination X, Y
        camera.width, camera.height // Destination width, height
    );

    // Draw the player relative to the camera
    ctx.drawImage(
        playerImg,
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );

    // Draw the enemy relative to the camera
    ctx.drawImage(
        enemyImg,
        enemy.x - camera.x,
        enemy.y - camera.y,
        enemy.width,
        enemy.height
    );
}

// Battle Mode
function renderBattle() {
    ctx.drawImage(battleBackgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Battle Mode!', 350, 100);
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'exploration') {
        updatePlayerAndCamera();
        checkBattle();
        renderExploration();
    } else if (gameState === 'battle') {
        renderBattle();
    }

    requestAnimationFrame(gameLoop);
}

// Start Game
mapImg.onload = () => {
    console.log('All assets loaded. Starting game...');
    gameLoop();
};
