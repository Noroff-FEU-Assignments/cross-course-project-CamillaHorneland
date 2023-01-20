(async function(){
    const request = await fetch('/products.json');
    const json = await request.json();
    const products = json.products;
    const container = document.querySelector('.product_container');
    const containerBestSelling = document.querySelector('.bestselling .product_container');
    const modals = document.querySelector('.product_modals');
    if(products != undefined) {
        if(container != undefined && modals != undefined) {
            var productHTML = '';
            var modalHTML = '';
            products.forEach(function(product) {
                productHTML += `
                <div class="${product.bestselling?'bestselling_products':''}" itemscope itemtype="https://schema.org/Product">
                    <a href="#modal-product${product.id}" title="See ${product.name}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3 class="product_name" itemprop="name">${product.name}</h3>
                        <p class="product_price" itemprop="price">${product.price} kr</p>
                    </a>
                </div>
                `;
                modalHTML += `
                    <div id="modal-product${product.id}" class="modal-container">
                        <div class="modal-content-wrapper">
                            <div class="modal-content">
                                <h1 class="name">${product.name}</h1>
                                <h2 class="price">${product.price}kr</h2>
                                <img class="image" src="${product.image}" alt="${product.name}">
                                <h3 class="size"> - M + </h3>
                                <a href="#closemodal" class="modal-close" title="Close">Close</a>
                                <div class="actions">
                                    <a href="#modal-cart" class="btn green nomargin" onclick="addToCart('${escape(JSON.stringify(product))}')">Add to cart</a>
                                    <a href="jackets.html" class="btn green nomargin">Continue shopping</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = productHTML;
            modals.innerHTML = modalHTML;
        }
        if(containerBestSelling != undefined && modals != undefined) {
            var productHTML = '';
            var modalHTML = '';
            products.forEach(function(product) {
                if(product.bestselling != undefined && product.bestselling) {
                    productHTML += `
                    <div class="${product.bestselling?'bestselling_products':''}" itemscope itemtype="https://schema.org/Product">
                        <a href="#modal-product${product.id}" title="See ${product.name}">
                            <img src="${product.image}" alt="${product.name}">
                            <h3 class="product_name" itemprop="name">${product.name}</h3>
                            <p class="product_price" itemprop="price">${product.price} kr</p>
                        </a>
                    </div>
                    `;
                    modalHTML += `
                        <div id="modal-product${product.id}" class="modal-container">
                            <div class="modal-content-wrapper">
                                <div class="modal-content">
                                    <h1 class="name">${product.name}</h1>
                                    <h2 class="price">${product.price}kr</h2>
                                    <img class="image" src="${product.image}" alt="${product.name}">
                                    <h3 class="size"> - M + </h3>
                                    <a href="#closemodal" class="modal-close" title="Close">Close</a>
                                    <div class="actions">
                                        <a href="#modal-cart" class="btn green nomargin" onclick="addToCart('${escape(JSON.stringify(product))}')">Add to cart</a>
                                        <a href="jackets.html" class="btn green nomargin">Continue shopping</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }                
            });
            container.innerHTML = productHTML;
            modals.innerHTML = modalHTML;
        }
    }
        
})();