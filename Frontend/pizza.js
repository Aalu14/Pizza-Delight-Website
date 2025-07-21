const isUserVerified = localStorage.getItem("userVerified") === "true";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Event listener for all Add to Cart buttons

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    if (!isUserVerified) {
      alert("Please submit the contact form before adding items to the cart.");
      return;
    }

    const item = button.dataset.item;
    const price = parseFloat(button.dataset.price);

    cart.push({ item, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item} added to cart!`);
    updateCartSummary();

  });
});
