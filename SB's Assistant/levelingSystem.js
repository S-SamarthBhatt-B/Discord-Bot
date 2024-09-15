// levelingSystem.js
const fs = require('fs');
const path = './data/levels.json'; // Path to levels.json

// Function to get the user data from the levels.json file
function getUserData(userId) {
    let userData = {};
    if (fs.existsSync(path)) {
        userData = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    if (!userData[userId]) {
        userData[userId] = { level: 1, xp: 0 };
    }

    return userData;
}

// Function to save the updated user data back to levels.json
function saveUserData(userData) {
    fs.writeFileSync(path, JSON.stringify(userData, null, 2), 'utf8');
}

// Function to add XP and handle leveling up
function addXP(userId, xpToAdd) {
    let userData = getUserData(userId);

    userData[userId].xp += xpToAdd;

    const xpForNextLevel = 100;
    if (userData[userId].xp >= xpForNextLevel) {
        userData[userId].level += 1;
        userData[userId].xp = userData[userId].xp - xpForNextLevel; // Reset XP for next level
        console.log(`User ${userId} leveled up to level ${userData[userId].level}!`);
    }

    saveUserData(userData);
}

module.exports = { addXP, getUserData };
