import CardService from "./services/card-service.js";
import StorageService from "./services/storage-service.js";

const cardService = new CardService();
const storageService = new StorageService();

// Fetch and display the cards
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

        // Add a star/heart icon for preferred cards
        const starIcon = document.createElement('span');
        starIcon.classList.add('star-icon');
        starIcon.textContent = storageService.isCardPreferred(card.id) ? '★' : '☆';
        starIcon.onclick = (e) => {
            e.stopPropagation();
            toggleCardPreference(card);
            displayCards(cards); // Refresh the card list to update the icon
        };
        cardContainer.appendChild(starIcon);

        container.appendChild(cardContainer);
    });
}

function toggleCardPreference(card) {
    if (storageService.isCardPreferred(card.id)) {
        storageService.remove(card.id);
    } else {
        storageService.save(card);
    }
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

function openPreferredPage() {
    window.location.href = "preferred.html";
}

window.openPreferredPage = openPreferredPage;


window.sortByName = sortByName;
window.filterSpellCards = filterSpellCards;

