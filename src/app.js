import CardService from "./services/card-service.js";

const cardService = new CardService();


cardService.getCardsData().then(cards => displayCards(cards));

function displayCards(cards) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    cards.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.onclick = () => openCardDetail(card.id);

        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardContainer.appendChild(cardImage);

        const cardName = document.createElement('h3');
        cardName.textContent = card.name;
        cardContainer.appendChild(cardName);

        container.appendChild(cardContainer);
    });
}

function openCardDetail(cardId) {
    window.location.href = `detail.html?id=${cardId}`;
}

// Sort cards 
function sortByName() {
    cardService.getCardsData().then(cards => {
        const sortedCards = cards.slice().sort((a, b) => a.name.localeCompare(b.name));
        displayCards(sortedCards);
    });
}

//  Spell Cards
function filterSpellCards() {
    cardService.getCardsData().then(cards => {
        const filteredCards = cards.filter(card => card.type === "Spell Card");
        displayCards(filteredCards);
    });
}


window.sortByName = sortByName;
window.filterSpellCards = filterSpellCards;

