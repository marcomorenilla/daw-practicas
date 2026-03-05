import { addToCart } from "./services/cart.js"

document.addEventListener('DOMContentLoaded', () => {
    const detailsMainSection = document.getElementById('details-main-section')
    const updatedCartDialog = document.getElementById('cart-dialog')
    const queryParams = new URLSearchParams(location.search)
    const bike = {
        id: queryParams.get('id'),
        nombre: queryParams.get('nombre'),
        description: queryParams.get('description'),
        talla: queryParams.get('talla'),
        fecha: queryParams.get('fecha'),
        estado: queryParams.get('estado'),
        kms: queryParams.get('kms'),
        img: queryParams.get('img')
    }




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
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        addToCart(cart, bike)
        updatedCartDialog.showModal()
        setTimeout(() => {
            updatedCartDialog.close()            
        }, 2000)
    })





})