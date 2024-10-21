const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // enables CORS for all origins

// API to roll multiple dice
app.get('/api/roll-dice', (req, res) => {
    const diceCount = parseInt(req.query.count) || 5; // default dice is set to 5
    const results = rollDice(diceCount);
    res.json({ dice: results });
});

function rollDice(count) {
    let rolls = [];
    for (let i=0; i<count; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1); // for the 6-sided dice
    }
    return rolls;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});