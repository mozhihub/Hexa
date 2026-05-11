// Game mudiya-pothu score save panna
function saveToLocal(finalScore) {
    let best = localStorage.getItem('hexa_high_score') || 0;
    if (finalScore > best) {
        localStorage.setItem('hexa_high_score', finalScore);
    }
}

// Mobile-la block set panna chinna vibration
function playFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(40); 
    }
}

console.log("Custom Hexa Logic Loaded Successfully!");

