// map.js
import { ctx, mapImg, playerImg } from './assets.js';

// 📍 Define Collision Boundaries
const collisionBoundaries = [
    { x: 180, y: 50, width: 280, height: 160 },   // Top-left building
    { x: 480, y: 230, width: 200, height: 150 }, // Middle-right building
    { x: 340, y: 420, width: 200, height: 150 }, // Bottom building
    { x: 70, y: 130, width: 130, height: 200 },  // Tree collision (left side)
    { x: 320, y: 300, width: 50, height: 100 }   // Middle fence area
];

// 🎮 Render Map
export function renderMap(camera) {
    ctx.drawImage(
        mapImg,
        camera.x, camera.y,
        camera.width, camera.height,
        0, 0,
        ctx.canvas.width,
        ctx.canvas.height
    );
}

// 🛡️ Check Collision
export function checkCollision(newX, newY, player) {
    return collisionBoundaries.some(boundary => 
        newX + player.width > boundary.x &&
        newX < boundary.x + boundary.width &&
        newY + player.height > boundary.y &&
        newY < boundary.y + boundary.height
    );

        // Render collision boundaries in debug mode
        if (debugMode) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
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
    
            // Player Boundary
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(
                player.x - camera.x,
                player.y - camera.y,
                player.width,
                player.height
            );
    
            // Player Coords
            ctx.fillStyle = 'yellow';
            ctx.font = '14px Arial';
            ctx.fillText(`Player: (${player.x}, ${player.y})`, 10, 20);
        }
}

// 🐞 Debug Mode Rendering
export function renderDebugBoundaries(camera, player) {
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.font = '12px Arial';
    ctx.lineWidth = 1;

    collisionBoundaries.forEach((boundary, index) => {
        // Draw collision rectangle
        ctx.strokeRect(
            boundary.x - camera.x,
            boundary.y - camera.y,
            boundary.width,
            boundary.height
        );

        // Fill with transparent red
        ctx.fillRect(
            boundary.x - camera.x,
            boundary.y - camera.y,
            boundary.width,
            boundary.height
        );

        // Draw coordinates and dimensions
        ctx.fillStyle = 'yellow';
        ctx.fillText(
            `#${index + 1} (${boundary.x}, ${boundary.y}, ${boundary.width}, ${boundary.height})`,
            boundary.x - camera.x + 5,
            boundary.y - camera.y + 15
        );
    });

    // Highlight Player Boundary
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
    ctx.fillStyle = 'white';
    ctx.fillText(
        `Player (${player.x}, ${player.y})`,
        player.x - camera.x + 5,
        player.y - camera.y - 5
    );
}

// 🏃 Render Player
export function renderPlayer(player, camera) {
    ctx.drawImage(
        playerImg,
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}
