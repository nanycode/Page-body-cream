function recargarPagina() {
    location.reload(); // Esta línea recarga la página
}


document.addEventListener("DOMContentLoaded", () => {

    console.log("Pagina cargada totalmente!")

    const shoppingCartButton = document.querySelector(".shop_img");
    const shoppingCart = document.querySelector(".sidebar_cart");

    shoppingCartButton.addEventListener("click", () => {
        shoppingCart.classList.toggle("open");
    })
})


