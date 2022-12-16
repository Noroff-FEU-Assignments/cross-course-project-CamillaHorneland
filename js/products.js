(async function(){
    const request = await fetch('/products.json');
    const json = await request.json();
    const products = json.products;
    const container = document.querySelector('.product_container');
    const containerBestSelling = document.querySelector('.bestselling .product_container');
    const modals = document.querySelector('.product_modals'); 


}



