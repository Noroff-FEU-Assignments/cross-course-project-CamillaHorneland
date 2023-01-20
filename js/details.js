const detailContainer = document.querySelector(".details");
const title = document.querySelector("title");


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

var url = `https://camillahorneland.no/wp-json/wc/store/products?Consumer key=ck_580520369a788907c4ea67585e722c2c9dfb7697&Consumer secret=cs_dbc184217a11ffc1d44dc2d0014ef6413a99ccae` +id;
// if(window.location.hostname == '127.0.0.1')
//   url = "https://cms-ca/wp-json/wc/store/products";

console.log(url);

async function detailProducts() {
    try {
        const response = await fetch(url);
        
        const object = await response.json ();

        console.log(object);

        detailContainer.innerHTML = "";

        for(let i = 0; i < object.length; i++) {

               
        detailContainer.innerHTML += 
              `<div class="data">
                  <img src="${object[i].images[0].src}" />
                  <h3 class ="name">${object[i].name}</h3>
                  <h4 class="price">${object[i].price_html}</h4>
             </div>`;
                document.title = object[i].name;
        }

    }catch (error) {
      console.log(error);
      detailContainer.innerHTML = message("error", error);
   }

}

detailProducts();


