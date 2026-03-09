/**
 * Crea la tarjeta visual de la bicicleta
 */
function createBikeCard(bike) {
    const gridBikes = document.getElementById('bike-grid');


    const htmlTpl = `
    <article id="${bike.id}" class="bg-orange-400 rounded-xl shadow-lg shadow-orange-400/50 hover:shadow-xl pb-5 transition-transform hover:scale-101">
        <div class="mx-auto rounded-t-xl overflow-hidden w-full h-64 md:h-80">
            <img class="object-cover w-full h-full" src="${bike.img}" 
                 alt="${bike.nombre}">
        </div>
        <div class="p-4">
            <h2 class="text-4xl font-bold py-2 text-white">${bike.nombre}</h2>
            <p class="font-medium text-base lg:text-lg text-white/90 mb-5 line-clamp-3">${bike.description}</p>
            <button id="ver-btn-${bike.id}" class="w-full text-center text-xl lg:text-2xl text-white bg-blue-500 font-bold rounded-sm p-2 hover:bg-blue-700">
                Ver →
            </button>
        </div>
    </article>`;

    gridBikes.insertAdjacentHTML('beforeend', htmlTpl);

    document.getElementById(`ver-btn-${bike.id}`).addEventListener('click', () =>open( `https://web.intratum/details?id=${bike.id}`));
}


document.addEventListener('DOMContentLoaded',()=>{
    const bikes = JSON.parse(localStorage.getItem('bikes')) || []

    if (bikes.length > 0) {
        bikes.forEach(bike => createBikeCard(bike))
    } 

})