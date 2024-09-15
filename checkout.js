document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.querySelector('.checkout-items');
    const totalItemsElement = document.querySelector('#total-items');
    const totalPriceElement = document.querySelector('#total-price');
    const checkoutForm = document.querySelector('#checkout-form');

    function getCartProducts() {
        return JSON.parse(localStorage.getItem('cartProducts')) || [];
    }

    function displayCartItems() {
        const cartProducts = getCartProducts();
        let totalPrice = 0;
        let no_of_items = 0;

        checkoutItemsContainer.innerHTML = '';

        cartProducts.forEach((product) => {
            const div = document.createElement('div');
            div.classList.add('checkout-item');
            div.innerHTML = `
                <img src='${product.image}' alt="${product.name}">
                <div class="checkout-item-details">
                    <h3>${product.name}</h3>
                    <p>Rs. ${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                </div>
            `;
            checkoutItemsContainer.append(div);
            no_of_items += product.quantity;
            totalPrice += Number(product.price * product.quantity);
        });

        totalItemsElement.textContent = no_of_items;
        totalPriceElement.textContent = `Rs. ${totalPrice}`;
    }

    displayCartItems();

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value;
        const address = document.querySelector('#address').value;
        const phone = document.querySelector('#phone').value;

        if (!name || !address || !phone) {
            alert('Please fill in all fields.');
            return;
        }
 
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('cartProducts', JSON.stringify(cartProducts));

        
        fetch('checkout.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            
            localStorage.removeItem('cartProducts');
             
            window.location.href = 'index.html';  
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while placing the order.');
        });
    });
});
