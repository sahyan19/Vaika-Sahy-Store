let table = document.querySelector(".parts-table");
let select = document.getElementById("filter-type");
let allPieces = [];

fetch("../../data/product.json")
  .then((response) => response.json())
  .then((pieces) => {
    allPieces = pieces;
    afficherPieces(pieces);
  })
  .catch((error) => console.error("Erreur lors de la récupération des données:", error));

select.addEventListener("change", (event) => {
  const typeSelectionne = event.target.value;
  let piecesFiltrees;
  if (typeSelectionne === "tous") {
    piecesFiltrees = allPieces;
  } else {
    piecesFiltrees = allPieces.filter(piece => piece.nom.toLowerCase().includes(typeSelectionne));
  }
  afficherPieces(piecesFiltrees);
});

function afficherPieces(pieces) {
  // Vider le tableau sauf l'en-tête
  table.innerHTML = `
    <tr>
      <th>Nom</th>
      <th>Prix</th>
    </tr>
  `;
  for (let piece of pieces) {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `
      <td>${piece.nom}</td>
      <td>$${piece.prix}</td>
    `;
    table.appendChild(trElement);
  }
}
