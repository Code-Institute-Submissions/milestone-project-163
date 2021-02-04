/* ------------ Game Information ------------ */

function updateClicks(){
    totalClicks++;
    document.getElementById('cards-clicked').innerText = totalClicks;
}


function updateTimeRemaining(){
    if(timeRemaining > 0){
        timeRemaining --;
        document.getElementById('remaining-time').innerHTML = timeRemaining;
    }
    else{
        announceGameover();
    }
}


/* ------------ Gameplay ------------ */

function canTurnCard(card){
    return (gameActive && !matchedCards.includes(card) && (card != firstCard));
}


function checkForWin(){
    if(matchedCards.length === cards.length){
        return true;
    }
    return false;
}


function announceVictory(){
    clearInterval(intervalId);
    gameActive = false;
    victorySound.play();
    toggleOverlay(victoryOverlay);

}


function announceGameover(){
    clearInterval(intervalId);
    gameActive = false;
    gameoverSound.play();
    toggleOverlay(gameoverOverlay);
}


function checkForMatch(firstCard, secondCard){
    gameActive = false;

    if(firstCard.getAttribute('data-pm') === secondCard.getAttribute('data-pm')){
        
        matchingSound.play();

        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
        if(checkForWin()){
            announceVictory();
        }
        gameActive = true;
    }
    else{
        setTimeout(function(){ 
            firstCard.classList.toggle('turned');
            secondCard.classList.toggle('turned');
            gameActive = true;
        }, 750);
    }
}


function turnCard(){
    if(!canTurnCard(this)){
        return;
    }
    updateClicks();
    this.classList.toggle('turned');
    
    if(firstTurnOfTwo){
        firstTurnOfTwo = false;
        firstCard = this;
        return;
    }
    
    secondCard = this;
    checkForMatch(firstCard, secondCard);
    
    firstCard = null;
    secondCard = null;
    firstTurnOfTwo = true;
}


// Durstenfeld shuffle
function shuffleCards(cards){
    for(let i = cards.length - 1; i > 0; i--){
        // given index i, take random index j < i
        let j = Math.floor(Math.random() * (i + 1));
            // interchange orderings of the ith and jth cards
            cards[j].style.order = i;
            cards[i].style.order = j;
    }
}


function startGame(){
   
    matchedCards = [];

    firstTurnOfTwo = true;
    firstCard = null, secondCard = null;
    gameActive = true;

    totalClicks = 0;
    timeRemaining = 100;

    // reset cards to be face down
    for(let card in cards){
        if(cards[card].classList.contains('turned')){
            cards[card].classList.remove('turned');
        }
    }

    shuffleCards(cards);
    toggleOverlay(this);
    intervalId = setInterval(updateTimeRemaining, 1000);

}


function toggleOverlay(overlay) {
    if(overlay.classList.contains('hidden')){
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    } else {
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
    }
}


/* ------------ Sound Effects ------------ */

let matchingSound = new Audio('assets/sounds/trumpet.wav');
matchingSound.playbackRate = 1.5;
let victorySound = new Audio('assets/sounds/victory_piano.wav');
victorySound.playbackRate = 1.0;
let gameoverSound = new Audio('assets/sounds/gameover_piano.wav');
gameoverSound.playbackRate = 1.0;

/* ------------ Flow of Game ------------ */
let matchedCards = [];

let firstTurnOfTwo;
let firstCard, secondCard;
let gameActive;

let totalClicks;
let timeRemaining;
let intervalId;

// fetch cards and add event listeners
let cards =  Array.from(document.getElementsByClassName('card'));
for(card in cards){
    cards[card].addEventListener('click', turnCard);
}

// fetch overlays
startOverlay = document.getElementById('start-overlay');
victoryOverlay = document.getElementById('victory-overlay');
gameoverOverlay = document.getElementById('gameover-overlay');

overlays = Array.from(document.getElementsByClassName('overlay'));
for(overlay in overlays){
    overlays[overlay].addEventListener('dblclick', startGame);
}

// startOverlay.addEventListener('click', startGame);
// victoryOverlay.addEventListener('click', startGame);
// gameoverOverlay.addEventListener('click', startGame);

