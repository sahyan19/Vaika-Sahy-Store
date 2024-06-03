let productCard = document.getElementById("product-card");

fetch("../data/product.json").then((response) => {
    return response.json();
}).then((pieces) => {
    for(let piece of pieces){
        productCard.innerHTML = `

        <div class="product-card" id="product-card">
            <img src=${piece.image_src} alt=${piece.nom}>
            <div class="card-content" id="card-content">
                <h3>${piece.nom}</h3>
                <p>${piece.description}</p>
                <span class="price" id="price">$19.99</span>
                <button>Ajouter au panier</button>
            </div>
        </div> 
        `
    }
})