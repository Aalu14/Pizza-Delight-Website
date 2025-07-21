function loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItemsContainer = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      let total = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="2" style="padding: 20px; text-align: center;">Cart is empty.</td></tr>';
        cartTotal.textContent = '$0.00';
        return;
      }

      cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td style="padding: 10px;">${item.item}</td>
          <td style="padding: 10px; text-align: right;">$${item.price.toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
        total += item.price;
      });

      cartTotal.textContent = '$' + total.toFixed(2);
    }

    function clearCart() {
      localStorage.removeItem('cart');
      alert('Cart has been cleared!');
      window.location.reload();
    }

    loadCart();