import { ctx, battleBackgroundImg, playerImg, enemyImg } from './assets.js';


// Battle State
export let battleState = { active: false };

export function renderBattle() {
    renderBattleScene();
}

// Initialize Battle Controls
export function initializeBattleControls() {
    console.log('🎮 Battle controls initialized.');
    window.addEventListener('keydown', (e) => {
        if (battleState.active && ['1', '2', '3', '4'].includes(e.key)) {
            handlePlayerAction(e.key);
        }
    });
}

// Battle State
let playerHP = 100;
let enemyHP = 100;

// Start Battle
export function startBattle() {
    console.log('⚔️ Battle Started!');
    battleState.active = true; // Ensure battle state is correctly updated
    battleLoop();
}


// Render Battle Scene
function renderBattleScene() {
    // Draw Battle Background
    ctx.drawImage(battleBackgroundImg, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // Player Sprite
    ctx.drawImage(playerImg, 100, 300, 100, 100); // Position and size for player in battle

    // Enemy Sprite
    ctx.drawImage(enemyImg, 400, 300, 100, 100); // Position and size for enemy in battle

    // HP Bars
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Player HP: ${playerHP}`, 50, 50);
    ctx.fillText(`Enemy HP: ${enemyHP}`, 450, 50);

    // Action Menu
    ctx.fillText('Choose Your Move:', 50, 400);
    ctx.fillText('1. Tackle', 50, 430);
    ctx.fillText('2. Fireball', 50, 450);
    ctx.fillText('3. Heal', 50, 470);
    ctx.fillText('4. Defend', 50, 490);
}

// Handle Player Actions
function handlePlayerAction(action) {
    switch (action) {
        case '1':
            console.log('Player used Tackle!');
            enemyHP -= 10;
            break;
        case '2':
            console.log('Player used Fireball!');
            enemyHP -= 15;
            break;
        case '3':
            console.log('Player used Heal!');
            playerHP = Math.min(playerHP + 20, 100);
            break;
        case '4':
            console.log('Player used Defend!');
            playerHP -= 5;
            break;
    }

    enemyTurn();
    checkBattleOutcome();
}

// Enemy Turn
function enemyTurn() {
    console.log('Enemy attacks!');
    playerHP -= 10;
}

// Check Battle Outcome
function checkBattleOutcome() {
    if (playerHP <= 0) {
        console.log('💀 Player has been defeated!');
        endBattle();
    } else if (enemyHP <= 0) {
        console.log('🎉 Enemy has been defeated!');
        endBattle();
    }
}

// End Battle
function endBattle() {
    console.log('🏁 Battle Over');
    battleState.active = false;
}

// Battle Loop
function battleLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    renderBattleScene();
    if (battleState.active) {
        requestAnimationFrame(battleLoop);
    }
}
