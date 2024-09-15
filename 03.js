document.addEventListener('DOMContentLoaded', () => {
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    function renderCart() {
        const cartItems = document.querySelector(".cart-items");
        cartItems.innerHTML = '';  

        if (Array.isArray(cartProducts) && cartProducts.length > 0) {
            cartProducts.forEach((product, index) => {
                const div = document.createElement("div");
                div.classList.add("cart-item");
                div.setAttribute('data-id', index);

                div.innerHTML = `
                    <img src='${product.image}' alt="Product Image">
                    <div class="cart-item-details">
                        <h2>${product.name}</h2>
                        <p class="price">Rs. ${product.price}</p>
                        <div class="quantity">
                            <label for="quantity-${index}">Quantity:</label>
                            <input type="number" id="quantity-${index}" value="${product.quantity || 1}" min="1">
                        </div>
                        <button class="btn remove-btn">Remove</button>
                    </div>`;

                cartItems.append(div);
                cartProducts[index].quantity=product.quantity || 1;
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            });
            
            updateCartSummary();

            document.querySelectorAll(".remove-btn").forEach(removeButton => {
                removeButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    const buttonClicked = event.target;
                    const cartItem = buttonClicked.closest(".cart-item");
                    const itemId = cartItem.dataset.id;

                    cartProducts.splice(itemId, 1); 
                    localStorage.setItem('cartProducts', JSON.stringify(cartProducts)); 

                    renderCart();
                });
            });

            document.querySelectorAll(".quantity input").forEach(input => {
                input.addEventListener("change", (event) => {
                    const inputElement = event.target;
                    const itemId = inputElement.closest(".cart-item").dataset.id;
                    const newQuantity = Number(inputElement.value);

                    if (newQuantity > 0) {
                        cartProducts[itemId].quantity = newQuantity;
                        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

                        updateCartSummary();  
                    } else {
                        alert('Quantity must be greater than 0');
                    }
                });
            });
        } else {
            cartItems.innerHTML = "<p style='text-align:center; font-weight:600 ; font-size:25px; color:red; background-color:white'>Your cart is empty.</p>";
            updateCartSummary();
        }
    }

    function updateCartSummary() {
        const container = document.querySelector(".container");
        const existingSummary = document.querySelector(".cart-summary");
        if (existingSummary) {
            existingSummary.remove();  
        }

        let totalPrice = 0;
        let totalItems = 0;

        cartProducts.forEach(item => {
            totalPrice += Number(item.price) * (item.quantity || 1); 
            totalItems += item.quantity || 1;  
        });

        const mydiv = document.createElement("div");
        mydiv.classList.add("cart-summary");

        mydiv.innerHTML = `
            <h2>Summary</h2>
            <p>Total Items: <span id="total-items">${totalItems}</span></p>
            <p>Total Price: <span id="total-price">Rs. ${totalPrice}</span></p>
            <a href="checkout.html" class="btn">Proceed to Checkout</a>`;

        container.append(mydiv);
    }

    renderCart();
});
