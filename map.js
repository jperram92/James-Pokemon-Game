// map.js
import { ctx, mapImg, playerImg } from './assets.js';

// 📍 Define Collision Boundaries
const collisionBoundaries = [
    // Top-left building
    { x: 180, y: 50, width: 280, height: 160 }, 

    // Middle-right building
    { x: 480, y: 230, width: 200, height: 150 }, 

    // Bottom building
    { x: 340, y: 420, width: 200, height: 150 },

    // Tree collision (left side)
    { x: 70, y: 130, width: 130, height: 200 },

    // Middle fence area
    { x: 320, y: 300, width: 50, height: 100 }
];

// 🎨 Render the Map
export function renderMap(camera) {
    ctx.drawImage(
        mapImg,
        camera.x, camera.y,
        camera.width, camera.height,
        0, 0,
        ctx.canvas.width,
        ctx.canvas.height
    );

    // 🐞 Optional: Render Collision Boundaries for Debugging
    if (window.debugMode) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Semi-transparent red
        collisionBoundaries.forEach(boundary => {
            ctx.fillRect(
                boundary.x - camera.x,
                boundary.y - camera.y,
                boundary.width,
                boundary.height
            );
            ctx.strokeStyle = 'red';
            ctx.strokeRect(
                boundary.x - camera.x,
                boundary.y - camera.y,
                boundary.width,
                boundary.height
            );
        });
    }
}

// 🛡️ Check for Collision
export function checkCollision(newX, newY, player) {
    return collisionBoundaries.some(boundary => 
        newX + player.width > boundary.x &&
        newX < boundary.x + boundary.width &&
        newY + player.height > boundary.y &&
        newY < boundary.y + boundary.height
    );
}

// 🧍 Render the Player
export function renderPlayer(player, camera) {
    ctx.drawImage(
        playerImg,
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}

// 🐞 Debug Mode Toggle (Optional, for development only)
window.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        window.debugMode = !window.debugMode;
        console.log('Debug mode:', window.debugMode ? 'ON' : 'OFF');
    }
});
