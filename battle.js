import { ctx, canvas, battleBackgroundImg, playerImg, enemyImg } from './assets.js';

// 🛡️ Battle State
export let battleState = {
    active: false,
    transitioning: false,
    playerTurn: true,
    enemyTurn: false,
};

// Battle Variables
let playerHP = 100;
let enemyHP = 100;
let playerMaxHP = 100;
let enemyMaxHP = 100;

let battleOptions = ['Attack', 'Run'];
let attackMoves = ['Slash', 'Fireball'];
let currentMenu = 'main';

// 🎬 Pagination Transition Effect
function transitionToBattle(callback) {
    let opacity = 0;
    battleState.transitioning = true;

    function fadeIn() {
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        opacity += 0.05;

        if (opacity < 1) {
            requestAnimationFrame(fadeIn);
        } else {
            battleState.transitioning = false;
            battleState.active = true;
            callback();
        }
    }
    fadeIn();
}

// 🎮 Initialize Battle Controls
export function initializeBattleControls() {
    window.addEventListener('keydown', (e) => {
        if (battleState.active && !battleState.transitioning) {
            if (currentMenu === 'main') {
                handleMainMenu(e.key);
            } else if (currentMenu === 'attack') {
                handleAttackMenu(e.key);
            }
        }
    });
}

// 🛡️ Main Menu Logic
function handleMainMenu(key) {
    if (key === '1') {
        currentMenu = 'attack';
    } else if (key === '2') {
        console.log('🏃 Player ran away!');
        battleState.active = false;
    }
}

// ⚔️ Attack Menu Logic
function handleAttackMenu(key) {
    if (key === '1') {
        enemyHP -= 20;
        console.log('⚔️ Player used Slash!');
    } else if (key === '2') {
        enemyHP -= 25;
        console.log('🔥 Player used Fireball!');
    }

    enemyTurn();
    currentMenu = 'main';
}

// 🐍 Enemy Turn Logic
function enemyTurn() {
    console.log('👹 Enemy attacks!');
    playerHP -= 15;

    if (playerHP <= 0) {
        console.log('💀 Player defeated!');
        battleState.active = false;
    } else if (enemyHP <= 0) {
        console.log('🎉 Enemy defeated!');
        battleState.active = false;
    }
}

// 🖌️ Render Health Bars
function renderHealthBar(x, y, width, height, currentHP, maxHP, color) {
    ctx.fillStyle = 'gray'; // Background of the health bar
    ctx.fillRect(x, y, width, height);

    let healthPercentage = currentHP / maxHP;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width * healthPercentage, height);

    // Outline
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, width, height);
}

// 🖌️ Render Battle Scene
export function renderBattle() {
    if (battleState.transitioning) return;

    // 🎨 Draw Background
    ctx.drawImage(battleBackgroundImg, 0, 0, canvas.width, canvas.height);

    // 🎮 Draw Player
    ctx.drawImage(playerImg, 50, 300, 100, 100);
    renderHealthBar(50, 270, 150, 15, playerHP, playerMaxHP, 'green'); // Player Health Bar

    // 🎮 Draw Enemy
    ctx.drawImage(enemyImg, 450, 300, 100, 100);
    renderHealthBar(450, 270, 150, 15, enemyHP, enemyMaxHP, 'red'); // Enemy Health Bar

    // 📝 Health Text
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Player HP: ${playerHP}`, 50, 260);
    ctx.fillText(`Enemy HP: ${enemyHP}`, 450, 260);

    // 📝 Menu Display
    ctx.fillText('Choose Your Move:', 50, 400);
    if (currentMenu === 'main') {
        ctx.fillText('1. Attack', 50, 430);
        ctx.fillText('2. Run', 50, 450);
    } else if (currentMenu === 'attack') {
        ctx.fillText('1. Slash', 50, 430);
        ctx.fillText('2. Fireball', 50, 450);
    }
}

// 🎬 Start Battle
export function startBattle() {
    transitionToBattle(() => {
        console.log('⚔️ Battle Started!');
    });
}
