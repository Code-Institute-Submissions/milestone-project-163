let cards =  Array.from(document.getElementsByClassName('card'));

function turnCard(){
    this.classList.toggle('turned');
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
    cards[i] = card.addEventListener('click', turnCard)
}

