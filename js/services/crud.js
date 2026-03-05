// crud.js


/**
 * Crea la tarjeta visual de la bicicleta
 */
export function createBikeCard(bike, onShowDetails) {
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

    // Asignamos el evento que viene desde el handler
    document.getElementById(`ver-btn-${bike.id}`).addEventListener('click', () => onShowDetails(bike));
}

/**
 * Crea el diálogo de detalles (Read/Delete)
 */
export function createDetailsDialog(bike, { onEdit, onDelete }) {
    const dialog = document.createElement('dialog');
    dialog.classList.add('m-auto', 'rounded-lg', 'backdrop:bg-gray-800/50', 'p-0');

    dialog.innerHTML = `
    <div class="bg-white md:w-[500px] p-6 flex flex-col gap-4 text-gray-800">
        <h2 class="text-3xl text-center font-bold pb-2">${bike.nombre}</h2>
        <p class="text-center">${bike.description}</p>
        <ul class="bg-gray-50 p-3 rounded">
            <li><strong>Talla:</strong> ${bike.talla}</li>
            <li><strong>Fecha de creación:</strong> ${bike.fecha}</li>
            <li><strong>Estado:</strong> ${bike.estado}</li>
        </ul>
        <div class="flex justify-end gap-2">
            <button id="btn-edit-modal" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Editar</button>
            <button id="btn-delete-modal" class="bg-red-500 hover:bg-red-700  text-white px-4 py-2 rounded">Eliminar</button>
            <button id="btn-close-modal" class="border border-gray-300 hover:bg-blue-700 hover:text-white px-4 py-2 rounded">Cerrar</button>
        </div>
    </div>`;

    document.body.appendChild(dialog);
    dialog.showModal();

    // Eventos internos para cerrar y comunicar acciones al handler
    document.getElementById('btn-close-modal').addEventListener('click', () => {
        dialog.close();
        dialog.remove();
    });

    document.getElementById('btn-delete-modal').addEventListener('click', () => {
        onDelete(bike.id);
        dialog.close();
        dialog.remove();
    });

    document.getElementById('btn-edit-modal').addEventListener('click', () => {
        onEdit(bike);
        dialog.close();
        dialog.remove();
    });
}

/**
 * Crea el diálogo de edición (Update)
 */
export function createUpdateDialog(bike, onUpdate) {
    const dialog = document.createElement('dialog');
    dialog.classList.add('m-auto', 'rounded-lg', 'backdrop:bg-gray-800/50', 'p-0');

    const dialogTpl = `   
        <div class="bg-white md:w-lg p-5 flex flex-col justify-center gap-4">
            <div class="flex gap-10 justify-center items-center">
                <h2 class="text-2xl font-semibold">Editar bicicleta: ${bike.nombre}</h2>
            </div>
            <form id="update-form" class="flex flex-col w-5/6 m-auto bg-white rounded-sm">
                <label class="text-xl my-2 font-semibold" for="nombre-2">Nombre:</label>
                <input class="border-1 border-blue-500 rounded-sm p-1"
                    type="text" name="nombre-2" id="nombre-2" 
                    value="${bike.nombre || ''}"> <label class="text-xl my-2 font-semibold" for="description-2">Descripción:</label>
                <textarea id="description-2" name="description-2" 
                    class="border-1 border-blue-500 rounded-sm p-1" rows="4"
                    cols="50">${bike.description || ''}</textarea> <label for="talla-2" class="text-xl my-2 font-semibold">Talla:</label>
                <select class="border-1 p-1 border-blue-500 rounded-sm" name="talla-2" id="talla-2">
                    <option value="">Selecciona una talla...</option>
                    <option value="XS" ${bike.talla === 'XS' ? 'selected' : ''}>XS</option>
                    <option value="S"  ${bike.talla === 'S' ? 'selected' : ''}>S</option>
                    <option value="M"  ${bike.talla === 'M' ? 'selected' : ''}>M</option>
                    <option value="L"  ${bike.talla === 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${bike.talla === 'XL' ? 'selected' : ''}>XL</option>
                </select>

                <label for="fecha-2" class="text-xl my-2 font-semibold">Fecha de creación:</label>
                <input class="border-1 p-1 border-blue-500 rounded-sm"
                    type="date" name="fecha-2" id="fecha-2" 
                    value="${bike.fecha || ''}">

                <label class="text-xl my-2 font-semibold" for="estado-2">Estado:</label>
                <div class="flex flex-col items-start">
                    <div class="flex gap-2 items-center">
                        <input type="radio" id="nueva-2" name="estado-2" value="nueva" 
                            ${bike.estado === 'nueva' ? 'checked' : ''}>
                        <label class="my-1" for="nueva-2">Nueva</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input type="radio" id="reacondicionada-2" name="estado-2" value="reacondicionada"
                            ${bike.estado === 'reacondicionada' ? 'checked' : ''}>
                        <label class="my-1" for="reacondicionada-2">Reacondicionada</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input type="radio" id="mantenimiento-2" name="estado-2" value="mantenimiento"
                            ${bike.estado === 'mantenimiento' ? 'checked' : ''}>
                        <label class="my-1" for="mantenimiento-2">Mantenimiento</label>
                    </div>
                </div>
                <label class="text-xl my-2 font-semibold" for="kms">Kilómetros:</label>
                <input type="number" class="border-1 p-1 border-blue-500 rounded-sm focus:shadow-lg focus:shadow-blue-500/50" value="${bike.kms || ''}" id="kms" name="kms>

                <div class="flex justify-center gap-2 mt-4">
                    <button id="update-form-btn" type="submit"
                        class="font-semibold text-white bg-blue-500 p-1 rounded-sm hover:bg-blue-700 hover:text-white ">
                        Editar</button>
                    <button id="btn-cancel-edit" type="reset"
                        class="font-semibold text-blue-700 border-1 border-blue-700 p-1 rounded-sm hover:bg-blue-700 hover:text-white">
                        Cerrar</button>
                </div>
            </form>
        </div>`;

    dialog.innerHTML = dialogTpl;

    document.body.appendChild(dialog);
    dialog.showModal();

    const form = document.getElementById('update-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        onUpdate(bike.id, data);
        dialog.close();
        dialog.remove();
    });

    document.getElementById('btn-cancel-edit').addEventListener('click', () => {
        dialog.close();
        dialog.remove();
    });
}

