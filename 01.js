document.addEventListener('DOMContentLoaded', () => {
    const searchInput=document.querySelector("#mySearch input");
    const searchButton=document.querySelector("#mySearch button");

    searchButton.addEventListener("click",()=>{
        const mySearch=searchInput.value;
        fetchProducts(mySearch);
        
    })

    fetchProducts("shirts");

    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');
            fetchProducts(category);
        });
    });
});

function fetchProducts(category) {
    const url = `get-product-details.php?category=${category}`;

    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((products) => {
        const productRow = document.querySelector(".product-row");
        productRow.innerHTML = '';   
        if (products.error) {
            productRow.innerHTML = '<p>No products found for this category.</p>';
        } else {
            products.forEach((productDetails) => {
                const id = productDetails.id;
                const name = productDetails.name;
                const src = productDetails.image;
                const price = productDetails.price;

                const newdiv = document.createElement("div");
                newdiv.classList.add("product-card");

                const newProductHTML = `
                    <img src='${src}' alt="Product Image">
                    <h3><a href='productDetails.html?id=${id}'>${name}</a></h3>
                    <p>Rs. ${price}</p>`;

                newdiv.innerHTML = newProductHTML;
                productRow.append(newdiv);
            });
        }
    }).catch((error) => {
        console.log(error);
    });
}
