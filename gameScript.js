let startButton = document.getElementById("start");
let statPage = document.getElementById("stats");
let distance = 0;
let coins = 0;
let attempts = 0;

let distanceStat = document.getElementById("distance")
let coinsStat = document.getElementById("coins")
let attemptsStat = document.getElementById("attempts")

distanceStat.textContent = distance;
coinsStat.textContent = coins;
attemptsStat.textContent = attempts;

startButton.addEventListener("click", hideElements, false);
statPage.addEventListener("click", openStats, false);

document.getElementById("statHeader").addEventListener("click", backToMain, false);

let creditsButton = document.getElementById("credits");

creditsButton.addEventListener("click", hideElements, false);
creditsButton.addEventListener("click", showCredits, false);

document.getElementById("settings").addEventListener("click", openSettings, false);

document.getElementById("title").addEventListener("click", hideSettings, false);

function hideElements()
{
    document.getElementById("mainContainer").style.display = "none";
}

function openStats()
{
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("statContainer").style.display = "block";
    dropInElementbyID("statContainer");
}

function backToMain()
{
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("statContainer").style.display = "none";
    document.getElementById("Credits").style.display = "none";
}

function showCredits()
{
    let creditsPage = document.getElementById("Credits");
    creditsPage.style.display = "block";
    dropInElementbyID("Credits");
    document.getElementById("creditsHeader").addEventListener("click", backToMain, false);
}

function openSettings()
{
    document.getElementById("settingsBar").style.display = "grid";
    dropInElementbyID("settingsBar");
    hideElements();
}

function hideSettings()
{
    document.getElementById("settingsBar").style.display = "none";
    backToMain();
}

function dropInElementbyID(elementID) {
    let element = document.getElementById(elementID);
    element.style.position = "relative";
    element.style.bottom = "1000px";
    let pos = 1000;
    let movement = setInterval(moveDown, 3);
    function moveDown() {
        if (pos <= 0) {
            clearInterval(movement);
        } else {
            pos -= 10;
            element.style.bottom = pos + "px";
        }
    }
}
