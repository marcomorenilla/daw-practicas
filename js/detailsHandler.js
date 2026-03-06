import { addToCart, handleCartVisibility, renderCartProducts } from "./services/cart.js"

document.addEventListener('DOMContentLoaded', () => {
    const detailsMainSection = document.getElementById('details-main-section')
    const queryParams = new URLSearchParams(location.search)
    const cartIcon = document.getElementById('cart-icon')
    const cartSection = document.getElementById('cart-section')
    const cartHiddenSection = document.getElementById('cart-hidden-section')
    const cartProductSection = document.getElementById('cart-product-section')
    const cartProductContainer = document.getElementById('cart-product-container')
    const qtySpan = document.getElementById('qty-span')
    const payBtn = document.getElementById('pay-btn')



    const bikes = JSON.parse(localStorage.getItem('bikes')) || []

    const bike = bikes.find(b => b.id == queryParams.get('id'))
    const cart = JSON.parse(localStorage.getItem('cart')) || []


    function toggleSpan() {
        console.log('qty span', qtySpan.innerHTML, cart.length, typeof (cart))
        if (cart.length > 0) {
            if (qtySpan.classList.contains('hidden')) {
                qtySpan.classList.remove('hidden')
            }

            qtySpan.innerHTML = cart.length

        } else {
            qtySpan.classList.add('hidden')

        }
    }

    function saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    toggleSpan()

    detailsMainSection.innerHTML = `
        <div class="bg-white md:w-[500px] border-1 border-gray-300 rounded-lg m-auto mb-10 p-6 flex flex-col shadow-lg hover:shadow-xl gap-4 text-gray-800">
            <h2 class="text-3xl text-center font-bold border-b border-gray-400 pb-2">${bike.nombre}</h2>
            <div class="mx-auto rounded-t-xl overflow-hidden w-full h-64 md:h-80">
                <img class="object-cover w-full h-full" src="${bike.img}" 
                    alt="${bike.nombre}">
            </div>
            <p class="text-center">${bike.description}</p>

            <ul class="bg-gray-50 p-3 rounded">
                <li><strong>Talla:</strong> ${bike.talla}</li>
                <li><strong>Fecha de creación:</strong> ${bike.fecha}</li>
                <li><strong>Estado:</strong> ${bike.estado}</li>
                <li><strong>Kilómetros:</strong> ${bike.kms}</li>
            </ul>
            <button id="btn-add-to-cart" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Añadir al carrito</button>   

        </div>`;

    const incrementQuantity = (bike) => {
        bike.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    const decrementQuantity = (bike) => {
        bike.quantity--;
        if (bike.quantity <= 0) {
            const index = cart.indexOf(bike);
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    function renderCart() {
        cartProductContainer.innerHTML = '';
        renderCartProducts(
            { section: cartProductContainer, cart: cart, btn: payBtn},
            { onIncrement: incrementQuantity, onDecrement: decrementQuantity }
        );
    }

    const btnAddToCart = document.getElementById('btn-add-to-cart')
    btnAddToCart.addEventListener('click', () => {

        addToCart(cart, bike)
        toggleSpan()
        saveToStorage()
    })

    cartIcon.addEventListener('click', () => {
        handleCartVisibility(cartSection, cartProductSection)
        renderCart()
    })


    cartHiddenSection.addEventListener('click', () => {
        handleCartVisibility(cartSection, cartProductSection)
    })




})