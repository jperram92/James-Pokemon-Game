// map.js
import { ctx, mapImg, playerImg } from './assets.js';

// Define Collision Boundaries
const collisionBoundaries = [
    { x: 100, y: 200, width: 150, height: 100 }, // Example Building 1
    { x: 400, y: 300, width: 200, height: 150 }, // Example Building 2
    { x: 600, y: 500, width: 150, height: 100 }, // Example Building 3
];

// Render the map
export function renderMap(camera) {
    ctx.drawImage(
        mapImg,
        camera.x, camera.y,
        camera.width, camera.height,
        0, 0,
        ctx.canvas.width,
        ctx.canvas.height
    );

    // Optional: Render collision boundaries for debugging
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Semi-transparent red
    collisionBoundaries.forEach(boundary => {
        ctx.fillRect(
            boundary.x - camera.x,
            boundary.y - camera.y,
            boundary.width,
            boundary.height
        );
    });
}

// Check for Collision
export function checkCollision(newX, newY, player) {
    return collisionBoundaries.some(boundary => 
        newX + player.width > boundary.x &&
        newX < boundary.x + boundary.width &&
        newY + player.height > boundary.y &&
        newY < boundary.y + boundary.height
    );
}

// Render the player
export function renderPlayer(player, camera) {
    ctx.drawImage(
        playerImg,
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}
