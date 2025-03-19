import CardService from "./services/card-service.js";
import StorageService from "./services/storage-service.js";

const cardService = new CardService();
const storageService = new StorageService();

const queryParams = new URLSearchParams(window.location.search);
const cardId = queryParams.get('id');

// Fetch and display card details
cardService.getCardById(cardId).then(card => displayCardDetail(card));

function displayCardDetail(card) {
    const container = document.getElementById('detail-container');
    container.innerHTML = '';

    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    container.appendChild(cardImage);

    const cardName = document.createElement('h1');
    cardName.textContent = card.name;
    container.appendChild(cardName);

    const cardDesc = document.createElement('p');
    cardDesc.textContent = card.description;
    container.appendChild(cardDesc);

    // Add star/heart icon to toggle preferred status
    const starIcon = document.createElement('span');
    starIcon.classList.add('star-icon');
    starIcon.textContent = storageService.isCardPreferred(card.id) ? '★' : '☆';
    starIcon.onclick = () => {
        toggleCardPreference(card);
        starIcon.textContent = storageService.isCardPreferred(card.id) ? '★' : '☆';
    };
    container.appendChild(starIcon);
}

function toggleCardPreference(card) {
    if (storageService.isCardPreferred(card.id)) {
        storageService.remove(card.id);
    } else {
        storageService.save(card);
    }
}
