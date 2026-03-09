import { sharedState } from "./sharedState.js" 

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon')
    const cartSection = document.getElementById('cart-section')
    const cartHiddenSection = document.getElementById('cart-hidden-section')
    const cartProductSection = document.getElementById('cart-product-section')
    const cartProductContainer = document.getElementById('cart-product-container')
    const payBtn = document.getElementById('pay-btn')
    const btnCloseCart = document.getElementById('btn-close-cart')



    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            renderCart()
        }
    })

    window.addEventListener('storage-local', renderCart)


    function toggleSpan() {
        const qtySpan = document.getElementById('qty-span')
        const currentCart = sharedState.cart; 
        if (currentCart.length > 0) {
            qtySpan.classList.remove('hidden')
            qtySpan.innerHTML = currentCart.length
        } else {
            qtySpan.classList.add('hidden')
        }
    }

    toggleSpan()

    const incrementQuantity = (bike) => {
        const cart = sharedState.cart; 
        const existingBike = cart.find(b => b.id === bike.id);
        if (existingBike) {
            existingBike.quantity++;
            sharedState.cart = cart;
            renderCart();
        } 
    };

    const decrementQuantity = (bike) => {
        let cart = sharedState.cart;
        const index = cart.findIndex(b => b.id === bike.id);
        
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); 
            }
            sharedState.cart = cart;
            renderCart();
        }
    };

    const deleteBike = (bike) => {
        const cart = sharedState.cart.filter(b => b.id !== bike.id);
        sharedState.cart = cart; 
        renderCart();
    }

    function renderCart() {
        cartProductContainer.innerHTML = '';
        renderCartProducts(
            { section: cartProductContainer, cart: sharedState.cart, btn: payBtn },
            { onIncrement: incrementQuantity, onDecrement: decrementQuantity, onDelete: deleteBike }
        );
        toggleSpan()
    }

    cartIcon.addEventListener('click', () => {
        handleCartVisibility(cartSection, cartProductSection)
        renderCart()
    })

    cartHiddenSection.addEventListener('click', () => {
        handleCartVisibility(cartSection, cartProductSection)
    })

    btnCloseCart.addEventListener('click',()=> handleCartVisibility(cartSection, cartProductSection))
})

function handleCartVisibility(cartSection, cartProductSection) {
    if (cartSection.classList.contains('hidden')) {
        cartSection.classList.remove('hidden')
        cartProductSection.classList.add('is-visible')
    } else {
        cartSection.classList.add('hidden')
        cartProductSection.classList.remove('is-visible')
    }
}

function renderCartProducts(cartProducts, { onIncrement, onDecrement, onDelete }) {
    const { section, cart, btn } = cartProducts;
    section.innerHTML = '';
    let total = 0;

    cart.forEach((bike, index) => {
        const cartTpl = `
        <div class="flex justify-between gap-10 border-b-1 border-orange-400 p-4" data-id="${index}">
            <img class="size-25 rounded-lg" src="${bike.img}" alt="${bike.nombre}">
            <div class="flex flex-col gap-5">
                <h2 class="font-bold text-2xl text-orange-400">${bike.nombre}</h2>
                <div class="flex justify-between border-1 border-orange-400 font-semibold rounded-sm">
                    <button class="btn-decrement py-1 px-2 text-orange-300 hover:bg-orange-400 hover:text-white border-orange-400 border-r-1">-</button>
                    <p class="py-1 px-3 text-orange-400">${bike.quantity}</p>
                    <button class="btn-increment py-1 px-2 text-orange-300 hover:bg-orange-400 hover:text-white border-orange-400 border-l-1">+</button>
                </div>
            </div>
            <div class="text-end flex flex-col ps-7 text-orange-400 gap-5">
                <p>${bike.kms} kms</p>
                <a href="#" class="delete-product-${bike.id} underline underline-offset-2 hover:font-bold">Eliminar</a>
            </div>
        </div>`;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cartTpl;
        const itemElement = tempDiv.firstElementChild;

        total += (bike.kms * bike.quantity);

        itemElement.querySelector('.btn-increment').addEventListener('click', () => onIncrement(bike));
        itemElement.querySelector('.btn-decrement').addEventListener('click', () => onDecrement(bike));
        itemElement.querySelector(`.delete-product-${bike.id}`).addEventListener('click', (e) => {
            e.preventDefault();
            onDelete(bike);
        });

        section.appendChild(itemElement);
    });

    btn.innerHTML = total > 0 ? `Pedalea ${total} kms para llegar` : 'Nada que mostrar';
}