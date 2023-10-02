// Toggle class active

const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

var prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // User is scrolling up, show the navbar
    document.querySelector(".navbar").style.top = "0";
  } else {
    // User is scrolling down, hide the navbar
    document.querySelector(".navbar").style.top = "-90px";
  }

  prevScrollPos = currentScrollPos;
};

// document.addEventListener("click", function (e) {
//   if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
//     navbarNav.classList.remove("active");
//   }
// });

//GET FROM CATALOG PRODUCT

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-container-best-seller");
  const productTemplate = document.querySelector(".product");

  // Define the URL of your backend API
  const apiUrl = "http://localhost:3000/products"; // Replace with your API URL

  // Function to fetch and display products
  async function fetchProducts() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products = await response.json();

      // Clear any existing products in the list
      productList.innerHTML = "";

      // Loop through the products and create product elements
      products.forEach((product) => {
        const productElement = productTemplate.cloneNode(true);
        productElement.style.display = "block";

        productElement.querySelector(
          ".first-image"
        ).src = `img/${product.product_image_1}`;

        productElement.querySelector(
          ".second-image"
        ).src = `img/${product.product_image_2}`;

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

        productElement.querySelector(".add-to-cart").href = ""; // Set the appropriate href

        productList.appendChild(productElement);

        console.log(products);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Fetch and display products when the page loads
  fetchProducts();
});
