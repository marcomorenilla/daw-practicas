// bikehandler.js
import { createBikeCard, createDetailsDialog, createUpdateDialog } from './services/crud.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM fijas
    const bikeGrid = document.getElementById('bike-grid');
    const mainForm = document.getElementById('bike-form');
    const formDialog = document.getElementById('form-dialog');
    const showFormBtn = document.getElementById('show-form');
    const closeFormBtn = document.getElementById('close-form-btn');


    let bikes = JSON.parse(localStorage.getItem('bikes')) || [];


    const refreshUI = () => {
        if (bikes.length > 0) {
            bikeGrid.innerHTML = '';
            bikes.forEach(bike => createBikeCard(bike, handleShowDetailsV2));
            document.getElementById('bike-warn').innerHTML = ``;
        } else {
            bikeGrid.innerHTML = ``
            document.getElementById('bike-warn').innerHTML = ` <div 
            class="p-5 rounded-lg bg-yellow-100 text-yellow-800 text-center font-semibold text-xl border-1 border-yellow-800 m-auto w-2/3">
            No hay bicicletas en el localStorage</div>
            `;
        }

    };

    const saveToStorage = () => {
        localStorage.setItem('bikes', JSON.stringify(bikes));
    };



    function handleShowDetails({ id }) {
        const bike = bikes.find(b => b.id == id);

        createDetailsDialog(bike, {
            onDelete: handleDeleteBike,
            onEdit: (bike) => createUpdateDialog(bike, handleUpdateBike)

        });
    }

    function handleDeleteBike(id) {

        bikes = bikes.filter(b => b.id != id);
        saveToStorage();
        refreshUI();

    }

    function handleUpdateBike(id, newData) {
        bikes = bikes.map(b => b.id == id ? { ...b, ...newData } : b);
        saveToStorage();
        refreshUI();
    }


    showFormBtn.addEventListener('click', () => formDialog.showModal());
    closeFormBtn.addEventListener('click', () => formDialog.close());

    mainForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(mainForm);
        const newBike = Object.fromEntries(formData.entries());

        newBike.id = Date.now().toString();
        newBike.img = `./assets/${newBike.nombre.split(' ').join('')}.jpg`;

        bikes.push(newBike);
        saveToStorage();
        refreshUI();

        mainForm.reset();
        formDialog.close();
    });


    function handleShowDetailsV2(bike) {
        console.log('mostrando detalles en página aparte ', { id: bike.id })

        const queryParams = new URLSearchParams()
        queryParams.append('id', bike.id)


        window.open(`https://web.intratum/details.html?${queryParams.toString()}`)




    }


    // Carga inicial
    refreshUI();
});
