// Map.js - Handles Map Rendering and Camera Scrolling

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load Assets
const mapImg = new Image();
mapImg.src = 'assets/map.png';

const playerImg = new Image();
playerImg.src = 'assets/player.png';

const enemyImg = new Image();
enemyImg.src = 'assets/enemy.png';

// Map Properties
const map = {
    width: 1024, // Update with actual map width
    height: 1024, // Update with actual map height
    viewWidth: canvas.width, // Viewport width (640)
    viewHeight: canvas.height, // Viewport height (480)
    startX: 0, // Camera starts at the bottom-left
    startY: 1024 - 480, // Bottom-left corner
};

// Player Object (Relative to Map, not Canvas)
const player = {
    x: 100,
    y: map.height - 100,
    width: 50,
    height: 50,
    speed: 5,
};

// Camera Object
const camera = {
    x: map.startX,
    y: map.startY,
    width: map.viewWidth,
    height: map.viewHeight,
};

// Game State
let assetsLoaded = {
    map: false,
    player: false,
};

// Event Listeners for Key Inputs
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

// Render Map and Player
function renderMap() {
    if (!assetsLoaded.map) {
        console.warn('Map image not loaded yet!');
        return;
    }

    ctx.drawImage(
        mapImg,
        camera.x, camera.y, // Source X, Y
        camera.width, camera.height, // Source width, height
        0, 0, // Destination X, Y
        camera.width, camera.height // Destination width, height
    );
}

function renderPlayer() {
    if (!assetsLoaded.player) {
        console.warn('Player image not loaded yet!');
        ctx.fillStyle = 'red';
        ctx.fillRect(
            player.x - camera.x,
            player.y - camera.y,
            player.width,
            player.height
        );
        return;
    }

    ctx.drawImage(
        playerImg,
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayerAndCamera();
    renderMap();
    renderPlayer();

    requestAnimationFrame(gameLoop);
}

// Asset Loading Handlers
mapImg.onload = () => {
    console.log('Map image loaded successfully');
    assetsLoaded.map = true;
    checkAllAssetsLoaded();
};

playerImg.onload = () => {
    console.log('Player image loaded successfully');
    assetsLoaded.player = true;
    checkAllAssetsLoaded();
};

// Function to Check if All Assets Are Loaded
function checkAllAssetsLoaded() {
    if (assetsLoaded.map && assetsLoaded.player) {
        console.log('All assets loaded. Starting game...');
        gameLoop();
    }
}
