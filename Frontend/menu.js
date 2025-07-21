function addToCart(item, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ item, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item} added to cart!`);
}

document.addEventListener('DOMContentLoaded', () => {
    const billBtn = document.getElementById('billBtn');
    const orderNowBtn = document.getElementById('orderNowBtn');
    const phoneInput = document.getElementById('phone');
    let contactSubmitted = localStorage.getItem('contactSubmitted')

    // 💡 Block bill button if not submitted
    if (billBtn) {
        billBtn.addEventListener('click', (e) => {

            if (!contactSubmitted) {
                e.preventDefault();
                alert('Please submit contact info first.');
            }
            else {
                window.location.href = 'cart.html';
            }
        });
    }

    // ✅ On phone blur, check if user already exists in DB
    if (phoneInput) {
        phoneInput.addEventListener('blur', async () => {
            const phone = phoneInput.value.trim();
            if (phone) {
                try {
                    const res = await fetch(`http://localhost:3000/api/check-user?phone=${phone}`);
                    const data = await res.json();
                    if (data.exists) {
                        contactSubmitted = true;
                        localStorage.setItem('contactSubmitted', 'true');

                        if (billBtn) billBtn.disabled = false;
                        if (orderNowBtn) orderNowBtn.disabled = false;

                        console.log('✅ Existing user, enabling buttons.');
                    } else {
                        contactSubmitted = false;
                        localStorage.setItem('contactSubmitted', 'false');

                        if (billBtn) billBtn.disabled = true;
                        if (orderNowBtn) orderNowBtn.disabled = true;

                        console.log('🛑 New user, must submit contact info.');
                    }
                } catch (err) {
                    console.error('Error checking user:', err);
                }
            }
        });
    }

    if (!contactSubmitted) {
        if (billBtn) billBtn.disabled = true;
        if (orderNowBtn) orderNowBtn.disabled = true;
    }
});
