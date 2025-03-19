import StorageService from "./services/storage-service.js";

const storageService = new StorageService();

// Fetch and display preferred cards
const preferredCards = storageService.getPreferredCards();
displayPreferredCards(preferredCards);

function displayPreferredCards(cards) {
    const container = document.getElementById('preferred-cards-container');
    container.innerHTML = '';
    cards.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardContainer.appendChild(cardImage);

        const cardName = document.createElement('h3');
        cardName.textContent = card.name;
        cardContainer.appendChild(cardName);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
            storageService.remove(card.id);
            const updatedCards = storageService.getPreferredCards();
            displayPreferredCards(updatedCards); // Refresh after removal
        };
        cardContainer.appendChild(removeButton);

        container.appendChild(cardContainer);
    });
}
