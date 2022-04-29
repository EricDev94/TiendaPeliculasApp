//Creamos array de botones de añadir al carrito
const arrButtCarrito = document.querySelectorAll('.addToCart');
console.log(arrButtCarrito);

arrButtCarrito.forEach(addButtCarrito => {
    addButtCarrito.addEventListener('click', addClickButton);
});

const shoppingCartItemsContainer = document.querySelector(
   '.shoppingCartItemsContainer'
);

function addClickButton (event) {
    //Guardamos el evento click del boton
    const b = event.target;
    //Guardamos el item seleccionado
    const item = b.closest('.item');
    //Guardamos las propiedades del producto en cada variable
    const tituloItem = item.querySelector('.item-title').textContent;
    const precioItem = item.querySelector('.item-price').textContent;
    const imgItem = item.querySelector('.item-image').src;

    addItemCarrito(tituloItem, precioItem, imgItem);
}


function addItemCarrito(tituloItem, precioItem, imgItem){

    const elements = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    for (let i = 0; i < elements.length; i++){
        if(elements[i].innerHTML === tituloItem){
            let elementCantidad = elements[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementCantidad.value++;
            updatePrecio();
            return;
        }
    }

    const carritoRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imgItem} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${tituloItem}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${precioItem}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

    carritoRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(carritoRow);

    carritoRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeElement);

    carritoRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', cantidadModificada);


    updatePrecio();
    removeElement();
}


function updatePrecio(){

    let total = 0;
    const carritoTotal = document.querySelector('.shoppingCartTotal');
    const carritoItems = document.querySelectorAll('.shoppingCartItem');
    let carritoItemPrecio = "";
    let carritoItemCantidad = "";

    carritoItems.forEach((carritoItem) => {
        carritoItemPrecio = carritoItem.querySelector('.shoppingCartItemPrice');
        const precioItem = Number(carritoItemPrecio.textContent.replace('€', ''));
        carritoItemCantidad = carritoItem.querySelector('.shoppingCartItemQuantity');
        const cantidadItem = Number(carritoItemCantidad.value);
        total = total + precioItem * cantidadItem;
    
    })

    carritoTotal.innerHTML = `${total.toFixed(2)} €`;

}


function removeElement(event) {
    const botonClicado = event.target;
    botonClicado.closest('.shoppingCartItem').remove();
    updatePrecio();
}


function cantidadModificada(event) {
    const input = event.target;
    if(input.value <= 0){
        input.value = 1;
    }
}