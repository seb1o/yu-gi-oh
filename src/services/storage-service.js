export default class StorageService {
    constructor() {}

    save(card) {
        const storedCardsString = localStorage.getItem('preferredCards');
        let storedCards = storedCardsString ? JSON.parse(storedCardsString) : [];

        // Check if the card is already in the preferred group
        const alreadyExists = storedCards.some(storedCard => storedCard.id === card.id);
        if (!alreadyExists) {
            storedCards.push(card);
            localStorage.setItem('preferredCards', JSON.stringify(storedCards));
        }
    }

    remove(cardId) {
        const storedCardsString = localStorage.getItem('preferredCards');
        let storedCards = storedCardsString ? JSON.parse(storedCardsString) : [];

        // Filter out the card with the matching ID
        storedCards = storedCards.filter(card => card.id !== cardId);
        localStorage.setItem('preferredCards', JSON.stringify(storedCards));
    }

    getPreferredCards() {
        const storedCardsString = localStorage.getItem('preferredCards');
        return storedCardsString ? JSON.parse(storedCardsString) : [];
    }

    isCardPreferred(cardId) {
        const storedCardsString = localStorage.getItem('preferredCards');
        const storedCards = storedCardsString ? JSON.parse(storedCardsString) : [];
        return storedCards.some(card => card.id === cardId);
    }
}
