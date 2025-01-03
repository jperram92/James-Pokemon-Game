// map.js
import { ctx, mapImg, playerImg } from './assets.js';

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
