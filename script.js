function recargarPagina() {
	location.reload(); // Esta línea recarga la página
}

document.addEventListener("DOMContentLoaded", function () {
	let btnOpenShoppingCart = document.querySelector(".shop_cart-icon");
	let btnAddProductToCart = document.querySelectorAll(".shop_cart");
	let cartProductsList = [];
	let cartProductsTotal = 0;
	let shoppingCart = document.querySelector(".sidebar_cart");

	function showHideShoppingCart() {
		// check if the cart is already open
		if (shoppingCart.classList.contains("open")) {
			// given that it's already open, we remove the class "open"
			// because we want to close it
			shoppingCart.classList.remove("open");
		} else {
			// given that it's NOT open, we add the class "open"
			// because we want to open it
			shoppingCart.classList.add("open");
		}
	}

	function updateCartTotal(total) {
		let cartTotal = shoppingCart.querySelector(".cart_total");
		cartTotal.innerText = "" + total;
	}

	btnOpenShoppingCart.addEventListener("click", (event) => {
		showHideShoppingCart();
	});

	// Given that we have a list of buttons corresponding to each of the cards
	// we need to iterate through them to add the listener to each one
	btnAddProductToCart.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			// console.log({ event });

			let currentProductCard = event.target.closest(".product_card");

			// console.log({ currentProductCard });

			let currentProductImage = currentProductCard.querySelector("img").src;

			let currentProductPrice =
				currentProductCard.querySelector(".product_price").innerText;

			let currentProductTitle =
				currentProductCard.querySelector(".product_title").innerText;

			let currentProductDetails = {
				productImage: currentProductImage,
				productPrice: currentProductPrice,
				productTitle: currentProductTitle,
			};

			// console.log(currentProductDetails);

			cartProductsList.push(currentProductDetails);

			// console.log(cartProductsList);

			addProductsToCart();

			// Increase cart total

			cartProductsTotal += Number(
				currentProductPrice.replace("₡", "").replace(".", "")
			);

			updateCartTotal(cartProductsTotal);

			// console.log(cartProductsTotal);
		});
	});

	function addProductsToCart() {
		let shoppingCartContent = shoppingCart.querySelector(".cart_content");
		let cartProductItem = document.createElement("div");
		let cartProductImage = document.createElement("img");
		let cartProductDetails = document.createElement("div");
		let cartProductTitle = document.createElement("span");
		let cartProductPrice = document.createElement("span");
		let cartProductQuantity = document.createElement("input");
		let cartProductRemoveButton = document.createElement("i");

		cartProductItem.appendChild(cartProductImage);
		cartProductItem.appendChild(cartProductDetails);
		cartProductItem.appendChild(cartProductRemoveButton);

		cartProductDetails.appendChild(cartProductTitle);
		cartProductDetails.appendChild(cartProductPrice);
		cartProductDetails.appendChild(cartProductQuantity);

		cartProductItem.classList.add("cart_box");
		cartProductItem.dataset.lastProductQuantity = 1;
		cartProductDetails.classList.add("detail_box");
		cartProductImage.classList.add("cart_img");
		cartProductTitle.classList.add("cart_product-title");
		cartProductPrice.classList.add("cart_price");
		cartProductQuantity.classList.add("cart_quantity");
		cartProductQuantity.type = "number";
		cartProductQuantity.value = 1;
		cartProductQuantity.min = 0;
		cartProductRemoveButton.classList.add("bx", "bxs-trash-alt", "cart_remove");

		// Add a listener to delete current product from shopping cart

		cartProductRemoveButton.addEventListener("click", (event) => {
			cartProductItem.remove();

			let cartProductContainer = event.target.closest(".cart_box");

			let lastProductQuantity =
				cartProductContainer.dataset.lastProductQuantity;

			let currentProductPrice =
				cartProductContainer.querySelector(".cart_price").innerText;

			cartProductsTotal -=
				Number(currentProductPrice.replace("₡", "").replace(".", "")) *
				lastProductQuantity;

			updateCartTotal(cartProductsTotal);
		});

		// Add a listener to update cart total when item quantity changes

		cartProductQuantity.addEventListener("change", (event) => {
			// console.log(event.target.value);

			let newProductQuantity = Number(event.target.value);

			if (newProductQuantity === 0) {
				cartProductItem.remove();
			}

			let cartProductContainer = event.target.closest(".cart_box");

			let lastProductQuantity =
				cartProductContainer.dataset.lastProductQuantity;

			cartProductContainer.dataset.lastProductQuantity = newProductQuantity;

			// console.log({
			// 	lastProductQuantity,
			// });

			let currentProductPrice =
				cartProductContainer.querySelector(".cart_price").innerText;

			// console.log({ currentProductPrice });

			if (lastProductQuantity > newProductQuantity) {
				cartProductsTotal -= Number(
					currentProductPrice.replace("₡", "").replace(".", "")
				);
			} else {
				cartProductsTotal += Number(
					currentProductPrice.replace("₡", "").replace(".", "")
				);
			}

			updateCartTotal(cartProductsTotal);
		});

		cartProductsList.forEach((product) => {
			cartProductImage.src = product.productImage;
			cartProductTitle.innerText = product.productTitle;
			cartProductPrice.innerText = product.productPrice;

			shoppingCartContent.appendChild(cartProductItem);
		});

		// make sure the cart is open
		shoppingCart.classList.add("open");

		// `
		// <div class="cart_box">
		//     <img src="./images/tinified/product-lips-3.png" alt="" class="cart_img" />
		//     <div class="detail_box">
		//         <div class="cart_product-title">${title}</div>
		//         <div class="cart_price">₡${price}</div>
		//         <input type="number" value="1" class="cart_quantity" />
		//     </div>
		//     <i class="bx bxs-trash-alt cart_remove" onclick="removeCartItem(this)"></i>

		// </div>
		// `;
	}
});
 