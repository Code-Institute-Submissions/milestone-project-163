function canTurnCard(card){
    return (gameActive && !matchedCards.includes(card) && (card != firstCard));
}

function updateClicks(){
    totalClicks++;
    document.getElementById('cards-clicked').innerText = totalClicks;
}

function checkForWin(){
    if(matchedCards.length === cards.length){
        return true;
    }
    return false;
}

function celebrateVictory(){
    // setTimeout(function(){
    //             alert('Congratulations old chap. You won!');
    //         }, 750);
    victorySound.play();
}

function checkForMatch(firstCard, secondCard){
    gameActive = false;

    if(firstCard.getAttribute('data-pm') === secondCard.getAttribute('data-pm')){
        
        matchingSound.play();

        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
        if(checkForWin()){
            celebrateVictory();
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

// Gameplay

// currently using global variables, would be nice to change
let cards =  Array.from(document.getElementsByClassName('card'));
let matchedCards = [];

let firstTurnOfTwo = true;
let firstCard, secondCard;
let gameActive = true;

let totalClicks = 0;
let timeRemaining = 100;

let matchingSound = new Audio('assets/sounds/trumpet.wav');
matchingSound.playbackRate = 1.5;
let victorySound = new Audio('assets/sounds/ship_shape.wav');

shuffleCards(cards);

for(let i = 0; i < cards.length; i++){
    card = cards[i];
    cards[i] = card.addEventListener('click', turnCard);
}
