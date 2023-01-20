const productContainer = document.querySelector(".product_container");

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

           
             
         productContainer.innerHTML += 
              `<div class="data">
                <a href="details.html?id=${object.id}">
                  <img src="${object[i].images[0].src}" />
                  <h3 class ="name">${object[i].name}</h3>
                  <h4 class="price">${object[i].price_html}</h4>
                </a>
             </div>`;
     }

    }catch (error) {
      console.log(error);
     product_container.innerHTML = message("error", error);
   }
}

getProducts();
