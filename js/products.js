let productCards = document.getElementById("product-cards");

fetch("../../data/product.json")
  .then((response) => {
    return response.json();
  })
  .then((pieces) => {
    for (let piece of pieces) {
      let contenair = document.createElement("div");
      contenair.className = "product-card";
      contenair.innerHTML = `
            <img src=${piece.image_src} alt=${piece.nom}>
            <div class="card-content" id="card-content">
                <h3>${piece.nom}</h3>
                <p>${piece.description}</p>
                <span class="price" id="price">${piece.prix}</span>
                <button>Ajouter au panier</button>
            </div>
        `;
      productCards.appendChild(contenair);
    }
  });
