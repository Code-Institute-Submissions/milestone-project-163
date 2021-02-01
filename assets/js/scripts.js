// currently using global variables, would be nice to change
let cards =  Array.from(document.getElementsByClassName('card'));
let matchedCards = [];

let firstTurnOfTwo = true;
let firstCard, secondCard;
let gridActive = true;

let totalClicks = 0;
let timeRemaining = 100;

function canTurnCard(card){
    return (gridActive && !matchedCards.includes(card) && (card != firstCard));
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

function checkForMatch(firstCard, secondCard){
    if(firstCard.getAttribute('data-pm') === secondCard.getAttribute('data-pm')){
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
        if(checkForWin()){
            setTimeout(function(){
                alert('Congratulations old chap. You won!');
            }, 500);
        }
    }
    else{
        //gridActive = false;
        setTimeout(function(){ 
            firstCard.classList.toggle('turned');
            secondCard.classList.toggle('turned');
        }, 750);
        //gridActive = True;
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
    
    firstTurnOfTwo = true;
    secondCard = this;
    
    checkForMatch(firstCard, secondCard);
    firstCard = null;
    secondCard = null;
    
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

shuffleCards(cards);

for(let i = 0; i < cards.length; i++){
    card = cards[i];
    cards[i] = card.addEventListener('click', turnCard);
}
