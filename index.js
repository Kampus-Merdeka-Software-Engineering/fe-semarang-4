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

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
