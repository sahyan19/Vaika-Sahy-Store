document.addEventListener("DOMContentLoaded", () => {
  let productCards = document.getElementById("product-cards");

  fetch("../../data/product.json")
      .then((response) => response.json())
      .then((pieces) => {
          pieces.forEach(piece => {
              let container = document.createElement("div");
              container.className = "product-card";
              container.innerHTML = `
                  <img src="${piece.image_src}" alt="${piece.nom}" class="product-img">
                  <div class="card-contents" id="card-contents">
                      <h3 class="product-title">${piece.nom}</h3>
                      <p>${piece.description}</p>
                      <span class="price" id="price">$${piece.prix}</span>
                      <button class="add-cart" data-title="${piece.nom}" data-price="${piece.prix}" data-image="${piece.image_src}">Ajouter au panier</button>
                  </div>
              `;
              productCards.appendChild(container);
          });

          // Ensure the event listeners are added after the products are loaded
          initializeCartEvents();
      });

  function initializeCartEvents() {
      let cartIcon = document.querySelector("#cart-icon");
      let cart = document.querySelector(".cart");
      let closeIcon = document.querySelector("#close-cart");

      cartIcon.addEventListener('click', () => {
          cart.classList.add("active");
      });

      closeIcon.addEventListener('click', () => {
          cart.classList.remove("active");
      });

      let addCartButtons = document.getElementsByClassName("add-cart");
      for (let button of addCartButtons) {
          button.addEventListener('click', addCartClicked);
      }

      document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
  }

  function buyButtonClicked() {
      alert("Achat effectué avec succès");
      let cartContent = document.getElementsByClassName("cart-content")[0];
      while (cartContent.hasChildNodes()) {
          cartContent.removeChild(cartContent.firstChild);
      }
      updateTotal();
  }

  function removeCartItem(event) {
      let buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updateTotal();
  }

  function addCartClicked(event) {
      let button = event.target;
      let title = button.getAttribute('data-title');
      let price = button.getAttribute('data-price');
      let productImg = button.getAttribute('data-image');
      addProductToCart(title, price, productImg);
      updateTotal();
  }

  function addProductToCart(title, price, productImg) {
      let cartShopBox = document.createElement('div');
      cartShopBox.classList.add('cart-box');
      let cartItems = document.getElementsByClassName("cart-content")[0];
      let cartItemNames = cartItems.getElementsByClassName("cart-product-title");

      for (let itemName of cartItemNames) {
          if (itemName.innerText === title) {
              alert("Vous avez déjà ajouté ce produit dans votre panier");
              return;
          }
      }

      let cartBoxContent = `
          <img src="${productImg}" alt="${title}" class="cart-img">
          <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">$${price}</div>
              <input type="number" value="1" class="cart-quantity">
          </div>
          <p class="cart-remove">Supprimer</p>
      `;

      cartShopBox.innerHTML = cartBoxContent;
      cartItems.append(cartShopBox);

      cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);
      cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
  }

  function quantityChanged(event) {
      let input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
      }
      updateTotal();
  }

  function updateTotal() {
      let cartContent = document.getElementsByClassName("cart-content")[0];
      let cartBoxes = cartContent.getElementsByClassName('cart-box');
      let total = 0;
      for (let cartBox of cartBoxes) {
          let priceElement = cartBox.getElementsByClassName("cart-price")[0];
          let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
          let price = parseFloat(priceElement.textContent.replace("$", ""));
          let quantity = quantityElement.value;
          total += price * quantity;
      }
      total = Math.round(total * 100) / 100;
      document.getElementsByClassName("total-price")[0].textContent = "$" + total;
  }
});
