var cart = (localStorage && localStorage.getItem('cart') != undefined) ? JSON.parse(localStorage.getItem('cart')):(function(){ localStorage.setItem('cart', JSON.stringify({ items: []})); JSON.parse(localStorage.getItem('cart')); })();

function updateCart(cartObj) {
	localStorage.setItem('cart', JSON.stringify(cartObj));
	cart = JSON.parse(localStorage.getItem('cart'));
}

function addToCart(item) {
	const newItem = JSON.parse(unescape(item));

	const existingItem = cart.items.find(function(cartItem){ 
		return cartItem.id == newItem.id
	});
    if(existingItem != undefined) {
		existingItem.qty++;
		var newItems = cart.items.filter(function(cartItem){
			return cartItem.id != existingItem.id
		});
		newItems.push(existingItem);
		newItems.sort(sortCartByItemId);
		cart.items = newItems;
	} else {
		
		newItem.qty = 1;
		cart.items.push(newItem);
		cart.items.sort(sortCartByItemId);
	}
	updateCart(cart);
	renderCart();
}

function sortCartByItemId( a, b ) {
	if ( a.id < b.id ){
		return -1;
	}
	if ( a.id > b.id ){
		return 1;
	}
	return 0;
}

function removeFromCart(item) {
	const removeItem = JSON.parse(unescape(item));
	
	const existingItem = cart.items.find(function(cartItem){ 
		return cartItem.id == removeItem.id
	});
	
	var newItems = cart.items.filter(function(cartItem){
		return cartItem.id != removeItem.id
	});

	if(existingItem != undefined && existingItem.qty > 1) {
		existingItem.qty--;
		newItems.push(existingItem);
		newItems.sort(sortCartByItemId);
		cart.items = newItems;
	} else {
		newItems.sort(sortCartByItemId);
		cart.items = newItems;
	}
	
	updateCart(cart);
	renderCart();
}

function emptyCart() {
	updateCart({items:[]});
}

function renderCart() {
	const cartContent = document.querySelector('table tbody');
	const cartSum = document.querySelector('.sum');
	const shippingFee = document.querySelector('.shippingfee');
	const checkoutBtn = document.getElementById('checkoutBtn');

	var shippingFeeSum = 0;
	if(cartContent != undefined) {
		var cartContentHTML = '';
		var sum = 0;
		cart.items.forEach(function(cartItem){
			sum = sum + ((cartItem.prices.price/100) * cartItem.qty);
			cartContentHTML += `
				<tr id="product-${cartItem.id}">
                    <td>
                        <img class="table-image" src="${cartItem.images[0].src}" alt="See ${cartItem.name}">
                    </td>
                    <td>
                        <p><button onclick="removeFromCart('${escape(JSON.stringify(cartItem))}')">-</button> ${cartItem.qty} <button onclick="addToCart('${escape(JSON.stringify(cartItem))}')">+</button></p>
                    </td>
                    <td>
                        ${cartItem.price_html}
                    </td>
                </tr>
			`;
		});
		cartContent.innerHTML = cartContentHTML;
		cartSum.innerHTML = `${sum} kr`;

		if(sum > 2000)
			shippingFeeSum = 0;
		else 
			shippingFeeSum = 149;
		shippingFee.innerHTML = `${shippingFeeSum} kr`;
		console.log(cart.items.length);
		if(cart.items.length > 0)
			checkoutBtn.classList.remove('hidden');
		else
			checkoutBtn.classList.add('hidden');
	}

}

renderCart();