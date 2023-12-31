document.addEventListener("DOMContentLoaded", () => {
  const productTemplate = document.querySelector(".product");

  // Define the URL of your backend API
  const apiUrl = "https://be-semarang-4-production.up.railway.app/products"; // Replace with your API URL
  const apiAddCart = "https://be-semarang-4-production.up.railway.app/mycart"; // Replace with your API URL

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

          productElement
            .querySelector(".add-to-cart")
            .addEventListener("click", (event) => {
              event.preventDefault();

              if (product.id) {
                const jsonData = {
                  productId: product.id,
                  // Other product data if needed
                };

                fetch(
                  "https://be-semarang-4-production.up.railway.app/mycart",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                  }
                )
                  .then((response) => {
                    if (response.ok) {
                      // Item added to cart successfully
                      alert(`${product.product_name} added to cart!`);
                    } else {
                      // Handle error if the item couldn't be added to cart
                      console.error(
                        "Error adding item to cart:",
                        response.statusText
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Error adding item to cart:", error);
                  });
              }
            });

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
