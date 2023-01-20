const productContainer = document.querySelector(".product_container");
const modalsContainer = document.querySelector('.product_modals');

var url = "https://camillahorneland.no/wp-json/wc/store/products";
if(window.location.hostname == '127.0.0.1')
  url = "https://cms-ca/wp-json/wc/store/products";

async function getProducts() {
    try {
        const response = await fetch(url);
        
        const object = await response.json ();

        console.log(object);

        productContainer.innerHTML = "";
        
        for(let i = 0; i < object.length; i++) {

           
        // #modal-product${product.id}
        
        productContainer.innerHTML += 
          `<div class="data">
           <a href="#modal-product${object[i].id}">
           
              <img src="${object[i].images[0].src}" />
              <h3 class ="name">${object[i].name}</h3>
              <h4 class="price">${object[i].price_html}</h4>
            </a>
          </div>`;

        modalsContainer.innerHTML += 
          `<div id="modal-product${object[i].id}" class="modal-container">
              <div class="modal-content-wrapper">
                  <div class="modal-content">
                      <h1 class="name">${object[i].name}</h1>
                      <h2 class="price">${object[i].price_html}</h2>
                      <img class="image" src="${object[i].images[0].src}" alt="${object[i].name}">
                      <h3 class="size"> - M + </h3>
                      <a href="#closemodal" class="modal-close" title="Close">Close</a>
                      <div class="actions">
                          <a href="#modal-cart" class="btn green nomargin" onclick="addToCart('${escape(JSON.stringify(object[i]))}')">Add to cart</a>
                          <a href="jackets.html" class="btn green nomargin">Continue shopping</a>
                      </div>
                  </div>
              </div>
          </div>`;
     }

    }catch (error) {
      console.log(error);
     product_container.innerHTML = message("error", error);
   }
}

getProducts();
