// game.js
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

// 🐞 Debug State
let debugMode = false;
window.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        debugMode = !debugMode;
        console.log('Debug Mode:', debugMode ? 'ON' : 'OFF');
    }
});

// Handle NPC Key Events
handleNpcKeyEvents(player);

// 🛡️ Player and Camera Update
function updatePlayerAndCamera() {
    if (battleState.active) return; // Disable movement in battle mode

    // Temporary position storage
    let newX = player.x;
    let newY = player.y;

    // Update temporary positions based on key presses
    if (keys['ArrowUp']) newY -= player.speed;
    if (keys['ArrowDown']) newY += player.speed;
    if (keys['ArrowLeft']) newX -= player.speed;
    if (keys['ArrowRight']) newX += player.speed;

    // Handle collisions independently for X and Y axes
    if (!checkCollision(newX, player.y, player)) {
        player.x = newX; // Apply new X if no collision
    }
    if (!checkCollision(player.x, newY, player)) {
        player.y = newY; // Apply new Y if no collision
    }

    // Prevent the player from leaving the map boundaries
    player.x = Math.max(0, Math.min(player.x, 2048 - player.width));
    player.y = Math.max(0, Math.min(player.y, 2048 - player.height));

    // Update Camera to follow the player
    camera.x = Math.max(0, Math.min(player.x - camera.width / 2, 2048 - camera.width));
    camera.y = Math.max(0, Math.min(player.y - camera.height / 2, 2048 - camera.height));
}

// 🎮 Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (battleState.active) {
        renderBattle(); // Render battle screen
    } else {
        updatePlayerAndCamera();
        updateNpcMovement();
        renderMap(camera);
        renderNpcs(ctx, camera);
        renderPlayer(player, camera);
        renderChatbox(ctx);

        // 🐞 Debug Rendering
        if (debugMode) {
            renderDebugBoundaries();
        }
    }

    requestAnimationFrame(gameLoop);
}

// 🐞 Render Collision Boundaries in Debug Mode
function renderDebugBoundaries() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    const boundaries = [
        { x: 100, y: 200, width: 150, height: 100 }, // Example
        { x: 400, y: 300, width: 200, height: 150 },
        { x: 600, y: 500, width: 150, height: 100 }
    ];

    boundaries.forEach(boundary => {
        ctx.strokeRect(
            boundary.x - camera.x,
            boundary.y - camera.y,
            boundary.width,
            boundary.height
        );
    });

    // Highlight player boundary for reference
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}

// 🛠️ Asset Loading
function checkAllAssetsLoaded() {
    if (
        mapImg.complete &&
        playerImg.complete &&
        enemyImg.complete &&
        battleBackgroundImg.complete
    ) {
        console.log('✅ All assets loaded. Starting game...');
        gameLoop();
    }
}

// ✅ Start Game
mapImg.onload = checkAllAssetsLoaded;
playerImg.onload = checkAllAssetsLoaded;
enemyImg.onload = checkAllAssetsLoaded;
battleBackgroundImg.onload = checkAllAssetsLoaded;