export async function addToCart(cart, bike) {
    const existingBike = cart.find(b => b.id == bike.id);

    if (existingBike) {
        existingBike.quantity++;
    } else {
        bike.quantity = 1;
        //bike.img = await imageToBase64(bike.img);
        cart.push(bike);
    }
    console.log("Carrito actualizado:", cart);
}

async function imageToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


export function handleCartVisibility(cart, cartSection) {

    if (cart.classList.contains('hidden')) {
        cart.classList.remove('hidden')
        cartSection.classList.add('is-visible')
    } else {
        cart.classList.add('hidden')
        cartSection.classList.remove('is-visible')
    }
}


export function renderCartProducts(cartProducts, { onIncrement, onDecrement }) {
    const { section, cart, btn } = cartProducts;
    section.innerHTML = ''; 

    let total = 0

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
                <a href="#" class="delete-product underline underline-offset-2 hover:font-bold">Eliminar</a>
            </div>
        </div>`;

        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cartTpl;
        const itemElement = tempDiv.firstElementChild;

         total+=bike.kms * bike.quantity

        itemElement.querySelector('.btn-increment').addEventListener('click', () => onIncrement(bike));
        itemElement.querySelector('.btn-decrement').addEventListener('click', () => onDecrement(bike));

        section.appendChild(itemElement);
    });

    btn.innerHTML = total>0?`Pedalea ${total} kms para llegar`:'Nada que mostrar'
}

