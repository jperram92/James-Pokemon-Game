import { ctx, canvas, playerImg, mapImg, enemyImg, battleBackgroundImg } from './assets.js';
import { renderNpcs, renderChatbox, handleNpcKeyEvents, updateNpcMovement, chatActive } from './npc.js';
import { renderMap, renderPlayer, checkCollision } from './map.js';
import { startBattle, battleState, renderBattle } from './battle.js';

// 🕹️ Key Events
const keys = {};
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));

// 📍 Player Object
const player = {
    x: 100,
    y: 924,
    width: 50,
    height: 50,
    speed: 2,
    health: 100,
};

// 📸 Camera Object
const camera = {
    x: 0,
    y: 2048 - 480,
    width: canvas.width,
    height: canvas.height,
};

// Handle NPC Key Events
handleNpcKeyEvents(player);

// 🛡️ Player and Camera Update
function updatePlayerAndCamera() {
    if (battleState.active) return; // Disable movement in battle mode

    // Initialize newX and newY with current player position
    let newX = player.x;
    let newY = player.y;

    // Update temporary position based on key inputs
    if (keys['ArrowUp']) newY -= player.speed;
    if (keys['ArrowDown']) newY += player.speed;
    if (keys['ArrowLeft']) newX -= player.speed;
    if (keys['ArrowRight']) newX += player.speed;

    // Check collision before applying new position
    if (!checkCollision(newX, player.y, player)) {
        player.x = newX; // Update x-coordinate if no collision
    }
    if (!checkCollision(player.x, newY, player)) {
        player.y = newY; // Update y-coordinate if no collision
    }

    // Update camera to follow the player
    camera.x = Math.max(0, Math.min(player.x - camera.width / 2, 2048 - camera.width));
    camera.y = Math.max(0, Math.min(player.y - camera.height / 2, 2048 - camera.height));
}

// 🎮 Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (battleState.active) {
        renderBattle(); // Switch to battle scene
    } else {
        updatePlayerAndCamera();
        updateNpcMovement();
        renderMap(camera);
        renderNpcs(ctx, camera);
        renderPlayer(player, camera);
        renderChatbox(ctx);
    }

    requestAnimationFrame(gameLoop);
}

// 🛠️ Asset Loading
function checkAllAssetsLoaded() {
    if (
        mapImg.complete &&
        playerImg.complete &&
        enemyImg.complete &&
        battleBackgroundImg.complete
    ) {
        console.log('All assets loaded. Starting game...');
        gameLoop();
    }
}

// ✅ Start Game
mapImg.onload = checkAllAssetsLoaded;
playerImg.onload = checkAllAssetsLoaded;
enemyImg.onload = checkAllAssetsLoaded;
battleBackgroundImg.onload = checkAllAssetsLoaded;
