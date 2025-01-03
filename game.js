// game.js
import { ctx, canvas, playerImg, mapImg, enemyImg, battleBackgroundImg } from './assets.js';
import { renderNpcs, renderChatbox, handleNpcKeyEvents, updateNpcMovement, chatActive } from './npc.js';
import { renderMap, renderPlayer, checkCollision, renderDebugBoundaries } from './map.js';
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

// 🛡️ Player and Camera Update
function updatePlayerAndCamera() {
    if (battleState.active) return; // Disable movement in battle mode

    let newX = player.x;
    let newY = player.y;

    if (keys['ArrowUp']) newY -= player.speed;
    if (keys['ArrowDown']) newY += player.speed;
    if (keys['ArrowLeft']) newX -= player.speed;
    if (keys['ArrowRight']) newX += player.speed;

    if (!checkCollision(newX, player.y, player)) {
        player.x = newX;
    }
    if (!checkCollision(player.x, newY, player)) {
        player.y = newY;
<<<<<<< HEAD
    }

    // Check interaction with NPCs
    if (keys[' '] && !chatActive) {
        checkNpcInteraction(player);
=======
>>>>>>> b24c65956e0d7fe7e728b798a04373faf6791b19
    }

    player.x = Math.max(0, Math.min(player.x, 2048 - player.width));
    player.y = Math.max(0, Math.min(player.y, 2048 - player.height));

    camera.x = Math.max(0, Math.min(player.x - camera.width / 2, 2048 - camera.width));
    camera.y = Math.max(0, Math.min(player.y - camera.height / 2, 2048 - camera.height));
}

// 🎮 Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (battleState.active) {
        renderBattle();
    } else {
        updatePlayerAndCamera();
        updateNpcMovement();
        renderMap(camera);
        renderNpcs(ctx, camera);
        renderPlayer(player, camera);
        renderChatbox(ctx);

        // 🐞 Debug Rendering
        if (debugMode) {
            renderDebugBoundaries(camera, player); // Pass the player object explicitly
        }
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
        console.log('✅ All assets loaded. Starting game...');
        gameLoop();
    }
}

// ✅ Start Game
mapImg.onload = checkAllAssetsLoaded;
playerImg.onload = checkAllAssetsLoaded;
enemyImg.onload = checkAllAssetsLoaded;
battleBackgroundImg.onload = checkAllAssetsLoaded;
