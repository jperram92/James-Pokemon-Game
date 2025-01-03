import { ctx, canvas, battleBackgroundImg, playerImg, enemyImg } from './assets.js';

// 🛡️ Battle State
export let battleState = {
    active: false,
    transitioning: false,
    playerTurn: true,
    enemyTurn: false,
};

let playerHP = 100;
let enemyHP = 100;
let playerMaxHP = 100;
let enemyMaxHP = 100;

let currentMenu = 'main';

// 📊 Menu Options
const menuOptions = {
    main: [
        { text: 'Attack', x: 20, y: 420, width: 100, height: 40, action: () => currentMenu = 'attack' },
        { text: 'Run', x: 140, y: 420, width: 100, height: 40, action: runAway }
    ],
    attack: [
        { text: 'Slash', x: 20, y: 420, width: 100, height: 40, action: () => playerAttack('Slash') },
        { text: 'Fireball', x: 140, y: 420, width: 100, height: 40, action: () => playerAttack('Fireball') }
    ]
};

// 🎬 Transition to Battle
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

// ⚔️ Player Attacks
function playerAttack(move) {
    if (move === 'Slash') {
        enemyHP -= 20;
        console.log('⚔️ Player used Slash!');
    } else if (move === 'Fireball') {
        enemyHP -= 25;
        console.log('🔥 Player used Fireball!');
    }

    enemyTurn();
    currentMenu = 'main';
}

// 🏃 Player Runs Away
function runAway() {
    console.log('🏃 Player ran away!');
    battleState.active = false;
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 400, canvas.width, 80); // Menu Background

    menuOptions[currentMenu].forEach(option => {
        ctx.fillStyle = 'white';
        ctx.fillRect(option.x, option.y, option.width, option.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(option.x, option.y, option.width, option.height);

        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText(option.text, option.x + 20, option.y + 25);
    });
}

// 🖱️ Handle Clicks for Menu
canvas.addEventListener('click', (e) => {
    if (!battleState.active || battleState.transitioning) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    menuOptions[currentMenu].forEach(option => {
        if (
            mouseX >= option.x &&
            mouseX <= option.x + option.width &&
            mouseY >= option.y &&
            mouseY <= option.y + option.height
        ) {
            option.action();
        }
    });
});

// 🎮 Initialize Battle Controls
export function initializeBattleControls() {
    console.log('🎮 Battle controls initialized.');
}

// 🎬 Start Battle
export function startBattle() {
    transitionToBattle(() => {
        console.log('⚔️ Battle Started!');
    });
}
