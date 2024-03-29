const containerBestSelling = document.querySelector('.bestselling .product_container');
const modalsContainer = document.querySelector('.product_modals');

var url = "https://camillahorneland.no/rainyday/wp-json/wc/store/products";
if(window.location.hostname == '127.0.0.1')
  url = "https://rainyday/wp-json/wc/store/products";

async function getBestsellingProducts() {
    try {
        const response = await fetch(url);
        
        const object = await response.json ();
        var bestsellers = object.filter(object => object.categories.find(category => category.id == 16));
        
        for(let i = 0; i < bestsellers.length; i++) {
            containerBestSelling.innerHTML += 
                `<div class="data bestselling_products">
                    <a href="#modal-product${bestsellers[i].id}">
                    <img src="${bestsellers[i].images[0].src}" alt="${bestsellers[i].name}">
                    <h3 class ="name">${bestsellers[i].name}</h3>
                    <h4 class="price">${bestsellers[i].price_html}</h4>
                    </a>
                </div>`; 
               
                modalsContainer.innerHTML += 
                    `<div id="modal-product${bestsellers[i].id}" class="modal-container">
                        <div class="modal-content-wrapper">
                            <div class="modal-content">
                                <h1 class="name">${bestsellers[i].name}</h1>
                                <h2 class="price">${bestsellers[i].price_html}</h2>
                                <img class="image" src="${bestsellers[i].images[0].src}" alt="${bestsellers[i].name}">
                              
                                <a href="#closemodal" class="modal-close" title="Close">Close</a>
                                <div class="actions">
                                    <a href="#modal-cart" class="btn green nomargin" onclick="addToCart('${escape(JSON.stringify(bestsellers[i]))}')">Add to cart</a>
                                    <a href="jackets.html" class="btn green nomargin">Continue shopping</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
            };

    }catch (error) {
      console.log(error);
     containerBestSelling.innerHTML = message("error", error);
   }
}

getBestsellingProducts();