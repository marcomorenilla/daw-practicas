import { sharedState } from "./sharedState"



document.addEventListener('DOMContentLoaded', () => {
    const detailsMainSection = document.getElementById('details-main-section')
    const queryParams = new URLSearchParams(location.search)

    const bikes = JSON.parse(localStorage.getItem('bikes')) || []

    const bike = bikes.find(b => b.id == queryParams.get('id'))



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



    const btnAddToCart = document.getElementById('btn-add-to-cart')
    btnAddToCart.addEventListener('click', () => {
        addToCart(sharedState.cart, bike)
        
    })


})


function addToCart(cart, bike) {
    const existingBike = cart.find(b => b.id == bike.id);

    if (existingBike) {
        existingBike.quantity++;
    } else {
        bike.quantity = 1;
        cart.push(bike);
    }
    sharedState.cart = cart
    console.log("Carrito actualizado:", sharedState.cart);
}



