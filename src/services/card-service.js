import Card from "../model/card.js";

export default class CardService {
    constructor() {}

    getCardsData() {
        return fetch("./assets/cards.json")
            .then(resp => resp.json())
            .then(data => this.fromRawDataToCards(data))
            .catch(err => console.error("Error fetching cards data:", err));
    }

    fromRawDataToCards(data) {
        return data.map(card => new Card(
            card.id,
            card.name,
            card.desc,
            card.card_images[0].image_url,
            card.type
        ));
    }

    getCardById(cardId) {
        return this.getCardsData().then(cards => cards.find(card => card.id == cardId));
    }
}

