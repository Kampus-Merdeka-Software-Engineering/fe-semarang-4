document.addEventListener("DOMContentLoaded", () => {
  const productTemplate = document.querySelector(".cart-product");

  // Define the URL of your backend API
  const apiUrl = "http://localhost:3000/mycart"; // Replace with your API URL

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
      productList.innerHTML = "";

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
        totalPrice += product.itemPrice;
        console.log(totalPrice);

        //delete button blm bisa, aku mau tidur pleasee

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
    ).textContent = `Toteal Price: ${totalPrice}`;
  }

  // Fetch and display products when the page loads
  fetchProducts();
});
