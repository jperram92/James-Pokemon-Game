// game.js

import { canvas, ctx, playerImg, mapImg, enemyImg, battleBackgroundImg } from './assets.js';
import { renderNpcs, renderChatbox, handleNpcKeyEvents, updateNpcMovement, chatActive } from './npc.js';
import { renderMap, renderPlayer } from './map.js';

// Key Events
const keys = {};
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));

// Player Object
const player = {
    x: 100,
    y: 924, // Map height - canvas height
    width: 50,
    height: 50,
    speed: 1,
};

// Camera Object
const camera = {
    x: 0,
    y: 1024 - 480,
    width: canvas.width,
    height: canvas.height,
};

// Initialize NPC Key Events
handleNpcKeyEvents(player);

// Update Player and Camera
function updatePlayerAndCamera() {
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < 1024 - player.height) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < 1024 - player.width) player.x += player.speed;

    camera.x = Math.max(0, Math.min(player.x - camera.width / 2, 1024 - camera.width));
    camera.y = Math.max(0, Math.min(player.y - camera.height / 2, 1024 - camera.height));
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!chatActive) {
        updatePlayerAndCamera();
        updateNpcMovement();
    }

    renderMap(camera);
    renderNpcs(ctx, camera);
    renderPlayer(player, camera);
    renderChatbox(ctx);

    requestAnimationFrame(gameLoop);
}

// Asset Loading Handler
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

// Wait for Assets to Load
mapImg.onload = checkAllAssetsLoaded;
playerImg.onload = checkAllAssetsLoaded;
enemyImg.onload = checkAllAssetsLoaded;
battleBackgroundImg.onload = checkAllAssetsLoaded;
