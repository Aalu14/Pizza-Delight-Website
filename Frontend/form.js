document.addEventListener('DOMContentLoaded', () => {
  const orderNowBtn = document.getElementById('orderNowBtn');
  const billBtn = document.getElementById('billBtn');
  const phoneInput = document.getElementById('phone');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const summaryDiv = document.getElementById('cartSummary');

  let total = cart.reduce((s, i) => s + i.price, 0);
  let contactSubmitted = false;

  if (orderNowBtn) orderNowBtn.disabled = true;
  if (billBtn) billBtn.disabled = true;
  if (phoneInput) {
    phoneInput.addEventListener('blur', async () => {
      const phone = phoneInput.value;
      if (phone) {
        try {
          const res = await fetch(`http://localhost:3000/api/check-user?phone=${phone}`);
          const data = await res.json();
          if (data.exists) {
            orderNowBtn.disabled = false;
            billBtn.disabled = false;
            contactSubmitted = true;
          }
        } catch (err) {
          console.error('Check user failed', err);
        }
      }
    });
  }


// Prevent order unless contact is filled
  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', (e) => {
      if (!contactSubmitted) {
        e.preventDefault();
        alert('Please submit contact info first.');
      }
    });
  }


  if (billBtn) {
    billBtn.addEventListener('click', (e) => {
      if (!contactSubmitted) {
        e.preventDefault();
        alert('Please submit contact info first.');
      }
    });
  }


  
  // Handle Contact Form Submit
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !phone || !email || !address) {
      return alert('Please fill all contact fields.');
    }

    try {
      const contactRes = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, address })
      });

      const result = await contactRes.json();

      if (!contactRes.ok) {
        return alert(result.error || 'Failed to save contact info.');
      }

      contactSubmitted = true;
      if (orderNowBtn) orderNowBtn.onclick = null;
      if (billBtn) billBtn.onclick = null;

      alert('Contact info saved. You can now place your order.');
      document.getElementById('orderSection').style.display = 'block'; // show order section
    } catch (err) {
      console.error('Contact error:', err);
      alert('Failed to save contact info.');
    }
  });

  // order now button (if form is submiited alraedy so this will work)
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const data = {
      name, phone, email, address,
      items: cart,
      total
    };

    try {
      const res = await fetch('http://localhost:3000/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      alert(json.message || json.error);

    } catch (err) {
      console.error('Order error:', err);
      alert('Order failed. Try again.');
    }
  });

});