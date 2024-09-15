document.addEventListener('DOMContentLoaded',()=>{

    const urlParams=new URLSearchParams(window.location.search);
    const productId=urlParams.get('id');

    fetch(`product_details_description.php?id=${productId}`).then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Network response was not ok');
        }
    }).then((product_description)=>{
        
        const product_name=product_description.name;

        const product_price=product_description.price;

        const product_container=document.querySelector(".product-details-container");

        const product_image=product_description.image;

        const description=product_description.description;

        const mydiv=document.createElement("div");
        mydiv.classList.add("product-image");
        mydiv.innerHTML=`<img src='${product_image}' alt="Product Image">`;
        product_container.append(mydiv);


        const mydiv2=mydiv.cloneNode();
        mydiv2.classList.add("product-info");
        mydiv2.innerHTML= `<h1>${product_name}</h1>
        <p class="price">₹ ${product_price}</p>
        <p class="description">${description}</p>
        <button class="add-to-cart-btn">Add to Cart</button>`;

        product_container.append(mydiv2);

        const cartButton=document.querySelector(".add-to-cart-btn");

        cartButton.addEventListener("click",()=>{

            const storedProducts = localStorage.getItem('cartProducts');
            let cartProducts = storedProducts ? JSON.parse(storedProducts) : [];

           
            const productExists = cartProducts.some(item => item.id === product_description.id);

            
            if (!productExists) {
                cartProducts.push(product_description);
            }
        
            localStorage.setItem('cartProducts',JSON.stringify(cartProducts));

            window.location.href='cart.html';

        })

    }).catch((error)=>{
        console.log(error);
    })
});
