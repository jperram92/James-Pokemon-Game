// npc.js
import { ctx, enemyImg } from './assets.js';

export let chatActive = false;
export function setChatActive(state) {
    chatActive = state;
}

// NPC Configuration
const npcs = [
    { id: 1, x: 300, y: 800, width: 50, height: 50, message: "Hello! I'm NPC 1.", direction: 'right', speed: 0.25, range: 100, startX: 300 },
    { id: 2, x: 600, y: 600, width: 50, height: 50, message: "Greetings, traveler!", direction: 'left', speed: 0.25, range: 50, startX: 600 },
    { id: 3, x: 200, y: 400, width: 50, height: 50, message: "Beware of the forest ahead.", direction: 'up', speed: 0.25, range: 75, startY: 400 }
];

let currentNpcMessage = '';

// Update NPC Movement
export function updateNpcMovement() {
    npcs.forEach(npc => {
        if (npc.direction === 'right') {
            npc.x += npc.speed;
            if (npc.x > npc.startX + npc.range) npc.direction = 'left';
        } else if (npc.direction === 'left') {
            npc.x -= npc.speed;
            if (npc.x < npc.startX) npc.direction = 'right';
        }
    });
}

// Check Interaction
function checkNpcInteraction(player) {
    npcs.forEach(npc => {
        if (
            player.x + player.width > npc.x &&
            player.x < npc.x + npc.width &&
            player.y + player.height > npc.y &&
            player.y < npc.y + npc.height
        ) {
            chatActive = true;
            currentNpcMessage = npc.message;
        }
    });
}

// Render NPCs
export function renderNpcs(ctx, camera) {
    npcs.forEach(npc => {
        ctx.drawImage(
            enemyImg,
            npc.x - camera.x,
            npc.y - camera.y,
            npc.width,
            npc.height
        );
    });
}

// Chatbox
export function renderChatbox(ctx) {
    if (!chatActive) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(50, ctx.canvas.height - 150, ctx.canvas.width - 100, 100);

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(currentNpcMessage, 70, ctx.canvas.height - 100);
}

// Handle NPC Interaction
export function handleNpcKeyEvents(player) {
    window.addEventListener('keydown', (e) => {
        if (e.key === ' ' && !chatActive) {
            checkNpcInteraction(player);
        }
        if (e.key === 'Escape') {
            chatActive = false;
            currentNpcMessage = '';
        }
    });
}
