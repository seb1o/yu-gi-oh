import CardService from "./services/card-service.js";

const cardService = new CardService();

const queryParams = new URLSearchParams(window.location.search);
const cardId = queryParams.get('id');


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
}
