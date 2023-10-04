document.addEventListener("DOMContentLoaded", () => {
  const productTemplate = document.querySelector(".product");

  // Define the URL of your backend API
  const apiUrl = "http://localhost:3000/products"; // Replace with your API URL
  const apiAddCart = "http://localhost:3000/mycart"; // Replace with your API URL

  // Function to fetch and display products
  async function fetchProducts(type = "best-seller", typeid = ".best-seller") {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        document.querySelector(
          ".product-container"
        ).textContent = `HTTP error! Status: ${response.status}`;
        document.querySelector(".product-container").style.color = "darkgrey";
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products = await response.json();

      const productList = document.getElementById(typeid);
      // Clear any existing products in the list
      productList.innerHTML = "";

      // Loop through the products and create product elements
      products.forEach((product) => {
        if (product.type == type) {
          const productElement = productTemplate.cloneNode(true);
          productElement.style.display = "block";

          productElement.querySelector(
            ".first-image"
          ).src = `${product.product_image_1}`;

          productElement.querySelector(
            ".second-image"
          ).src = `${product.product_image_2}`;

          productElement.querySelector(
            ".catalog-collection"
          ).textContent = `${product.product_collection}`;

          if (product.discount !== null) {
            productElement.querySelector(
              ".catalog-discount"
            ).textContent = `${product.discount}%`;
            productElement.querySelector(".catalog-discount").style.display =
              "flex"; // Show discount
          }

          productElement.querySelector(".product-name").textContent =
            product.product_name;
          productElement.querySelector(
            ".price"
          ).textContent = `Rp ${product.price},00`;

          productElement.querySelector(".product-desc").textContent =
            product.product_desc;

          productElement.querySelector(
            ".add-to-cart"
          ).href = `${apiAddCart}${product.id}`; // Set the appropriate href blm bisa

          productList.appendChild(productElement);
        }
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Fetch and display products when the page loads
  fetchProducts("best-seller", "product-container-best-seller");
  fetchProducts("new-arrival", "product-container-new-arrival");
  fetchProducts("reguler", "product-container-reguler");
});
