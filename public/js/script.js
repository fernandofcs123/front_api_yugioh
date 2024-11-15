let currentLimit = 32;
let offset = 0;
let allCards = [];

async function fetchCards(limit = 30, offset = 0) {
    try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        const data = await response.json();

        allCards = data.data;
        const limitedCards = allCards.slice(offset, offset + limit)

        displayCards(limitedCards);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function displayCards(cards) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    cards.forEach(card => {
        const cardElement = `
        <div class="card mb-4" style="width: 18rem;">
            <img src="${card.card_images[0].image_url}" class="card-img-top" alt="${card.name}">
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.desc}</p>
                <p><strong>Preço (TGCPlayer):</strong> $${card.card_prices[0].tcgplayer_price}</p>
                <a href="${card.ygoprodeck_url}" target="_blank" class="btn btn-primary">Ver mais</a>
            </div>
        </div>
        `;
        resultDiv.innerHTML += cardElement;
        
    });
}

fetchCards(currentLimit, offset);

function searchCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredCards = allCards.filter(card => card.name.toLowerCase().includes(input));

    displayCards(filteredCards);

}

function resetSearch(){
    document.getElementById('searchInput').value = '';
    offset = 0;
    fetchCards(currentLimit, offset);
}

function loadMoreCards() {
    offset += currentLimit;
    const nextCards = allCards.slice(offset, offset + currentLimit);

    if (nextCards.length >0) {
        displayCards(nextCards)
    } else {
        alert('Não há mais cartas para exibir.')
    }
}
{/* <button id="loadBackBtn" class="btn btn-success" onclick="loadBackCards()">Anterior</button> */}

function loadBackCards() {
    
    if (offset === 0) {
        alert ('Você já está nas primeiras cartas.');
        return;
    }

    offset -= currentLimit;

    if (offset < 0 ){
        offset= 0;
    }

    const backCards = allCards.slice(offset, offset + currentLimit);
    displayCards(backCards)
    
}