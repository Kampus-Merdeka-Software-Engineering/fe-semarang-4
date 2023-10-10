document.addEventListener("DOMContentLoaded", () => {
  const productTemplate = document.querySelector(".cart-product");

  // Define the URL of your backend API
  const apiUrl = "https://be-semarang-4-production.up.railway.app/mycart"; // Replace with your API URL

  // Function to fetch and display products
  async function fetchProducts() {
    var totalPrice = 0;
    var totalItem = 0;
    try {
      const response = await fetch(apiUrl);
      const productList = document.getElementById("cart-product-container");
      if (!response.ok) {
        document.querySelector(
          ".cart-product-container"
        ).textContent = `HTTP error! Status: ${response.status}`;
        document.querySelector(".cart-product-container").style.color =
          "darkgrey";
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products = await response.json();

      // Clear any existing products in the list

      // Loop through the products and create product elements
      products.forEach((product) => {
        const productElement = productTemplate.cloneNode(true);
        productElement.style.display = "";

        productElement.querySelector(
          ".cart-image"
        ).src = `${product.itemImage}`;

        productElement.querySelector(".my-cart-product-name").textContent =
          product.itemName;

        productElement.querySelector(
          ".Quantity"
        ).textContent = `${product.quantity}`;
        totalItem += product.quantity;

        productElement.querySelector(
          ".my-cart-price"
        ).textContent = `Rp ${product.itemPrice},00`;
        totalPrice += product.itemPrice * product.quantity;
        console.log(totalPrice);

        //Delete button
        productElement
          .querySelector(".remove-item")
          .addEventListener("click", async () => {
            try {
              // Send a DELETE request to your server to delete the item
              const response = await fetch(`${apiUrl}/${product.itemID}`, {
                method: "DELETE",
              });

              if (response.ok) {
                // Item deleted successfully
                // Remove the cart product element from the DOM
                productElement.remove();
              } else {
                // Handle error if the item could not be deleted
                console.error("Error deleting item from cart");
              }
            } catch (error) {
              console.error("Error deleting item from cart:", error);
            }
          });

        productList.appendChild(productElement);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    cartSummary(totalItem, totalPrice);
  }

  async function cartSummary(totalItem, totalPrice) {
    console.log(totalPrice);
    document.querySelector(
      ".total-item"
    ).textContent = `Total Item: ${totalItem}`;
    document.querySelector(
      ".total-price"
    ).textContent = `Total Price: Rp ${totalPrice}, 00`;
  }

  // Fetch and display products when the page loads
  fetchProducts();
});
