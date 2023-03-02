const detailContainer = document.querySelector(".details");
const title = document.querySelector("title");


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

var url = "https://camillahorneland.no/rainyday/wp-json/wc/store/products/"+id;
if(window.location.hostname == '127.0.0.1')
   url = "https://rainyday/wp-json/wc/store/products/"+id;

async function detailProducts() {
    try {
        const response = await fetch(url);
        const object = await response.json ();
        detailContainer.innerHTML = "";
        detailContainer.innerHTML += 
              `<div class="data">
                  <img src="${object.images[0].src}" />
                  <h3 class ="name">${object.name}</h3>
                  <h4 class="price">${object.price_html}</h4>
             </div>`;
                document.title = object.name;

    }catch (error) {
      console.log(error);
      detailContainer.innerHTML = message("error", error);
   }

}

detailProducts();


