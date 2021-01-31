let cards =  Array.from(document.getElementsByClassName('card'));

function turnCard(){
    this.classList.toggle('turned');
}

for(i = 0; i < cards.length; i++){
    card = cards[i];
    cards[i] = card.addEventListener('click', turnCard);    
}
