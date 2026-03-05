// CRUD functions

type Bike = {
    id: number,
    nombre: string,
    description: string,
    talla: string,
    fecha: string,
    estado: string 
}

function createBike(bikeFormData: FormData) {
    //Obtenemos nodo grid-bikes
    const gridBikes: HTMLElement = document.getElementById('grid-bikes');

    // Creamos artícle
    const bikeArticle: HTMLElement = document.createElement('article');
    bikeArticle.classList.add('bg-orange-400', 'rounded-xl', 'shadow-lg', 'shadow-orange-400/50', 'hover:shadow-xl', 'pb-5', 'hover:scale-101');
    bikeArticle.id = String(bikeFormData.get('id'));

    // Creamos div contenedor de imagen
    const imgContainer: HTMLElement = document.createElement('div');
    imgContainer.classList.add('mx-auto', 'rounded-t-xl', 'overflow-hidden', 'w-full', 'h-64', 'md:h-80');

    // Creamos imagen
    //Nombre img
    const imgName: string = String(bikeFormData.get('nombre')).split(' ').join('');

    
    const bikeImg: HTMLImageElement = document.createElement('img');
    bikeImg.classList.add('object-cover', 'w-full', 'h-full', 'md:h-full');
    bikeImg.src = `./assets/${imgName}.jpg`;
    bikeImg.alt = String(bikeFormData.get('nombre'));


    //Creamos h2
    const bikeH2: HTMLElement = document.createElement('h2');
    bikeH2.classList.add('text-4xl', 'font-bold', 'py-2', 'text-white');
    bikeH2.textContent = String(bikeFormData.get('nombre'));

    //Creamos descripción
    const bikeDescription: HTMLElement = document.createElement('p');
    bikeDescription.classList.add('font-medium', 'text-base', 'lg:text-lg', 'px-4', 'mb-5');
    bikeDescription.textContent = String(bikeFormData.get('description'));

    //Creamos botón
    const bikeBtn: HTMLElement = document.createElement('button');
    bikeBtn.classList.add('text-center', 'text-xl', 'lg:text-2xl', 'text-white', 'bg-blue-500', 'font-bold', 'rounded-sm', 'p-2', 'hover:bg-blue-700');
    bikeBtn.textContent = 'Ver →';
    bikeBtn.id = `ver-btn-${bikeFormData.get('id')}`;


    // Ponemos a escuchar botón
    bikeBtn.addEventListener('click', () => showBike(String(bikeFormData.get('id'))));

    //Anidamos nodos
    gridBikes.insertAdjacentElement('beforeend', bikeArticle)
    bikeArticle.appendChild(imgContainer);
    imgContainer.appendChild(bikeImg);
    bikeArticle.appendChild(bikeH2);
    bikeArticle.appendChild(bikeDescription)
    bikeArticle.appendChild(bikeBtn);
}


function updateBike(bikeId: string, bikes: [], newBike: {}) {


}

function createUpdateDialog(bikeSelected: Bike) {

    // Creamos dialog que se va a mostrar
    const dialog: HTMLElement= document.createElement('dialog');
    dialog.classList.add('m-auto', 'overflow-hidden', 'rounded-sm', 'backdrop:bg-gray-500/75')


    const dialogTpl = `   
        <div class="bg-white md:w-lg p-5 flex flex-col justify-center gap-4">
            <div class="flex gap-10 justify-center items-center">
                <h2 class="text-2xl font-semibold">Editar bicicleta: ${bikeSelected.nombre}</h2>
            </div>
            <form id="bike-2-form" class="flex flex-col w-5/6 m-auto bg-white rounded-sm">
                <label class="text-xl my-2 font-semibold" for="nombre-2">Nombre:</label>
                <input class="border-1 border-blue-500 rounded-sm p-1"
                    type="text" name="nombre-2" id="nombre-2" 
                    value="${bikeSelected.nombre || ''}"> <label class="text-xl my-2 font-semibold" for="description-2">Descripción:</label>
                <textarea id="description-2" name="description-2" 
                    class="border-1 border-blue-500 rounded-sm p-1" rows="4"
                    cols="50">${bikeSelected.description || ''}</textarea> <label for="talla-2" class="text-xl my-2 font-semibold">Talla:</label>
                <select class="border-1 p-1 border-blue-500 rounded-sm" name="talla-2" id="talla-2">
                    <option value="">Selecciona una talla...</option>
                    <option value="XS" ${bikeSelected.talla === 'XS' ? 'selected' : ''}>XS</option>
                    <option value="S"  ${bikeSelected.talla === 'S' ? 'selected' : ''}>S</option>
                    <option value="M"  ${bikeSelected.talla === 'M' ? 'selected' : ''}>M</option>
                    <option value="L"  ${bikeSelected.talla === 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${bikeSelected.talla === 'XL' ? 'selected' : ''}>XL</option>
                </select>

                <label for="fecha-2" class="text-xl my-2 font-semibold">Fecha de creación:</label>
                <input class="border-1 p-1 border-blue-500 rounded-sm"
                    type="date" name="fecha-2" id="fecha-2" 
                    value="${bikeSelected.fecha || ''}">

                <label class="text-xl my-2 font-semibold" for="estado-2">Estado:</label>
                <div class="flex flex-col items-start">
                    <div class="flex gap-2 items-center">
                        <input type="radio" id="nueva-2" name="estado-2" value="nueva" 
                            ${bikeSelected.estado === 'nueva' ? 'checked' : ''}>
                        <label class="my-1" for="nueva-2">Nueva</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input type="radio" id="reacondicionada-2" name="estado-2" value="reacondicionada"
                            ${bikeSelected.estado === 'reacondicionada' ? 'checked' : ''}>
                        <label class="my-1" for="reacondicionada-2">Reacondicionada</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input type="radio" id="mantenimiento-2" name="estado-2" value="mantenimiento"
                            ${bikeSelected.estado === 'mantenimiento' ? 'checked' : ''}>
                        <label class="my-1" for="mantenimiento-2">Mantenimiento</label>
                    </div>
                </div>

                <div class="flex justify-center gap-2 mt-4">
                    <button id="update-form-btn" type="submit"
                        class="font-semibold text-white bg-blue-500 p-1 rounded-sm hover:bg-blue-700 hover:text-white focus:bg-blue-700">
                        Editar</button>
                    <button id="close-update-btn" type="reset"
                        class="font-semibold text-blue-700 border-1 border-blue-700 p-1 rounded-sm hover:bg-blue-700 hover:text-white focus:bg-blue-700">
                        Cerrar</button>
                </div>
            </form>
        </div>`;

        //Incluímos plantilla dentro del dialog
}

function deleteBike(bikeId: string) {

}

function showBike(bikeId: string) {
console.log('Hola mundo')

    

}


export { createBike, updateBike, createUpdateDialog, deleteBike, showBike };

