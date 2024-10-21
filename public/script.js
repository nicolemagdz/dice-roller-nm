const backendUrl = 'https://dice-roller-nodejs-nm.azurewebsites.net/api/roll-dice';

// function to generate a random dice face (1-6) for animation
function getRandomDiceFace() {
    return Math.floor(Math.random() * 6) + 1;
}

// function to show rolling animation before displaying the result
async function rollDiceAnimation(count) {
    const diceContainer = document.getElementById('result');
    diceContainer.innerHTML = ''; // clears previous dice

    for (let i=0; i<count; i++) {
        const dice = document.createElement('div');
        dice.className = 'dice';
        dice.innerText = getRandomDiceFace(); // temporary rolling face
        diceContainer.appendChild(dice);
    }

    // roll animation duration (1sec)
    await new Promise(resolve => setTimeout(resolve, 1000));
}

// wake up the server
document.getElementById('wakeServer').addEventListener('click', async () => {
    try {
        const response = await fetch(backendUrl + '?count=5');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        document.getElementById('result').innerText = `
        Dice Rolled: ${data.dice.join(', ')}
        `;
    } catch (error) {
        document.getElementById('error').innerText = `
        Error: ${error.message}
        `;
    }
});

// roll dice with animation and API call
document.getElementById('rollDice').addEventListener('click', async () => {
    try {
        const count = document.getElementById('diceCount').value || 5;

        // start rolling animation
        await rollDiceAnimation(count);
        
        // fetch dice roll result from backend
        const response = await fetch(`${backendUrl}?count=${count}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // display final result after rolling animation
        document.getElementById('result').innerText = data.dice
            .map(die => `<div class="dice">${die}</div>`)
            .join('');
    } catch (error) {
        document.getElementById('error').innerText = `
        CORS Error: ${error.message}
        `;
    }
});