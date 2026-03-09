/**
 * Genera el template HTML para una fila de la tabla
 */
function loadBikeTpl(bike) {
    return `
    <tr>
        <td>${bike.nombre}</td>
        <td>${bike.talla}</td>
        <td>${bike.fecha}</td>
        <td>${bike.estado}</td>
        <td>${bike.kms}</td>
        <td class="flex gap-2 justify-center [&_img]:transition-all [&_img]:duration-300 [&_img]:ease-in-out ">
            <div>
                <img id="${bike.id}-btn-edit" class="size-5 hover:size-8 cursor-pointer" src="assets/edit.svg" alt="edit">
            </div>
            <div>
                <img id="${bike.id}-btn-delete" class="size-5 hover:size-8 cursor-pointer" src="assets/delete.svg" alt="delete">
            </div>
        </td>
    </tr>`;
}

/**
 * Guarda el array de bicis en el almacenamiento local
 */
function saveToStorage(bikes) {
    localStorage.setItem('bikes', JSON.stringify(bikes));
}

/**
 * Renderiza la lista completa de bicis y asigna los eventos
 */
function refreshUI(state, tbody) {
    const bikesTableDiv = document.getElementById('bikes-table-div');
    tbody.innerHTML = '';

    if (state.bikes.length > 0) {
        bikesTableDiv.classList.remove('hidden');
        bikesTableDiv.classList.add('visible');

        state.bikes.forEach(bike => {
            const trTpl = loadBikeTpl(bike);
            tbody.insertAdjacentHTML('beforeend', trTpl);

            document.getElementById(`${bike.id}-btn-edit`).addEventListener('click', () => {
                editBike(bike, state);
            });

            document.getElementById(`${bike.id}-btn-delete`).addEventListener('click', () => {
                deleteBike(bike.id, state, tbody);
            });
        });
    } else {
        bikesTableDiv.classList.remove('visible');
        bikesTableDiv.classList.add('hidden');
    }
}

/**
 * Prepara el formulario para la edición
 */
function editBike(bike, state) {
    const bikeForm = document.getElementById('bike-form');
    const btnSendForm = document.getElementById('send-form-btn');

    state.isEditing = true;
    state.editingId = bike.id;
    btnSendForm.innerHTML = 'Actualizar';

    Object.keys(bike).forEach(key => {
        if (bikeForm.elements[key]) {
            bikeForm.elements[key].value = bike[key];
        }
    });
}

/**
 * Elimina una bici del estado y refresca
 */
function deleteBike(id, state, tbody) {
    const confirmDialog = document.getElementById('confirm-dialog');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmBtn = document.getElementById('confirm-btn');

    confirmDialog.showModal()

    const confirmForm = document.getElementById('confirm-dialog-form');

    confirmForm.addEventListener('submit', (e) => {
        e.preventDefault();

        confirmBtn.addEventListener('click', () => {
            state.bikes = state.bikes.filter(b => b.id !== id);
            saveToStorage(state.bikes);
            refreshUI(state, tbody);
        })

        confirmDialog.close()
    })

}


document.addEventListener('DOMContentLoaded', () => {
    const bikeForm = document.getElementById('bike-form');
    const tbody = document.getElementById('t-body');
    const btnSendForm = document.getElementById('send-form-btn');


    // Estado único y compartido
    let state = {
        bikes: JSON.parse(localStorage.getItem('bikes')) || [],
        isEditing: false,
        editingId: null
    };



    // Render inicial
    refreshUI(state, tbody);

    bikeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(bikeForm);
        const bikeData = Object.fromEntries(formData.entries());

        if (state.isEditing) {
            // Buscamos la bici por el ID que guardamos al pulsar "editar"
            const index = state.bikes.findIndex(b => b.id === state.editingId);
            if (index !== -1) {
                state.bikes[index] = { ...bikeData, id: state.editingId, img: `./assets/${bikeData.nombre.replace(/\s+/g, '')}.jpg` };
            }

            // Resetear estado de edición
            state.isEditing = false;
            state.editingId = null;
            btnSendForm.innerHTML = 'Añadir';
        } else {
            // Lógica de creación
            bikeData.id = Date.now().toString();
            bikeData.img = `./assets/${bikeData.nombre.replace(/\s+/g, '')}.jpg`;
            state.bikes.push(bikeData);
        }

        saveToStorage(state.bikes);
        refreshUI(state, tbody);
        bikeForm.reset();
    });
});