
document.addEventListener('DOMContentLoaded', () => {
    const showForm = document.getElementById('show-form')
    const formDialog = document.getElementById('form-dialog')
    const closeForm = document.getElementById('close-form-btn')
    const form = document.getElementById('bike-form')
    const bikeGrid = document.getElementById('bike-grid')

    let bikes = JSON.parse(localStorage.getItem('bikes')) || []
    console.log(`localstorage parsed: ${JSON.stringify(bikes)}`)
    console.log(`localstorage length: ${bikes.length}`)

    showForm.addEventListener('click', () => {
        formDialog.showModal()
    })

    closeForm.addEventListener('click', () => {
        formDialog.close()
    })

    if (bikes.length > 0) {
        console.log(`if bikes: ${bikes}`)
        renderBikes(bikes)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(form)
        formData.set('id', formData.get('nombre').split(' ').join(''))
        console.log('append id', formData.get('id'))

        bikes.push(Object.fromEntries(formData.entries()))

        dataString = JSON.stringify(bikes)

        localStorage.setItem('bikes', dataString)

        renderBikes([Object.fromEntries(formData.entries())])

        form.reset()
        formDialog.close()

    })


    function renderBikes(bikes = []) {
        console.log('rendering...')

        bikes.map(bike => {

            console.log('bike id ', bike['id'])

            let htmlTpl = `
            <article id="${bike['id']}"
                class="bg-orange-400 rounded-xl shadow-lg shadow-orange-400/50 hover:shadow-xl pb-5 hover:scale-101">

                <div class="mx-auto  rounded-t-xl overflow-hidden w-full h-64 md:h-80">
                    <img class="object-cover w-full h-full md:h-full" src="./assets/${bike['nombre'].split(' ').join('')}.jpg" alt="${bike['nombre']}">
                </div>
                <h2 class="text-4xl font-bold py-2 text-white">${bike['nombre']}</h2>
                <p class="font-medium text-base lg:text-lg px-4 mb-5">
                    ${bike['description']}
                </p>

                <button id="ver-btn-${bike['id']}"
                    class="text-center text-xl lg:text-2xl text-white bg-blue-500 font-bold rounded-sm p-2 hover:bg-blue-700"
                    href="">Ver →</button>
            </article>`

            bikeGrid.insertAdjacentHTML('beforeend', htmlTpl)

            const verBtn = document.getElementById(`ver-btn-${bike['id']}`)
            verBtn.addEventListener('click', () => {
                console.log('click ver btn', 'bike id', bike['id'])
                console.log('bikes', bikes)
                showDetails(bike['id'])
            })


        })

    }


    function showDetails(bikeId) {

        const bikeSelected = bikes.find(bike => bike['id'] == bikeId)
        if (bikeSelected) {
            console.log(` bikeSelected`, JSON.stringify(bikeSelected))
            const dialogTpl = `   
        <div class="bg-white md:w-lg p-5 flex flex-col justify-center gap-4">
            <div class="flex gap-10 justify-center items-center">
                <h2 class="text-2xl font-semibold">${bikeSelected['nombre']}</h2>
            </div>
            
            <p>${bikeSelected['description']}</p>
            
            <ul class="font-bold">
                <li>Talla: <span class="font-normal">${bikeSelected['talla']}</span></li>
                <li>Fecha de recepción: <span class="font-normal">${bikeSelected['fecha']}</span></li>
                <li>Estado: <span class="font-normal">${bikeSelected['estado']}</span><li>
            </ul>
            <div class="flex justify-center gap-2">
                <button id="update-data"
                    class="font-semibold text-white bg-blue-500 p-1 rounded-sm hover:bg-blue-700 hover:text-white ">Editar</button>
                <button id="delete-data"
                    class="font-semibold text-white bg-red-500 p-1 rounded-sm hover:bg-red-700 hover:text-white">Eliminar</button>
                <button id="close-data"
                    class="font-semibold text-blue-700 border-1 border-blue-700 p-1 rounded-sm hover:bg-blue-700 hover:text-white ">Cancelar</button>
            </div>
        </div>   `


            const dialog = document.createElement('dialog')
            dialog.classList.add('m-auto', 'overflow-hidden', 'rounded-sm', 'backdrop:bg-gray-500/75')
            dialog.innerHTML = dialogTpl

            document.body.appendChild(dialog)

            const updateData = document.getElementById('update-data')
            const deleteData = document.getElementById('delete-data')
            const closeData = document.getElementById('close-data')

            closeData.addEventListener('click', () => {
                dialog.close()
                document.body.removeChild(dialog)
            })


            deleteData.addEventListener('click', () => {
                bikes = bikes.filter(bike => bike['id'] != bikeId)

                console.log(bikes)

                localStorage.setItem('bikes', JSON.stringify(bikes))
                const bikeNode = document.getElementById(bikeId)
                bikeGrid.removeChild(bikeNode)
                dialog.close()
                document.body.removeChild(dialog)
            })


            updateData.addEventListener('click', () => {
                updateBike(bikeSelected)
                dialog.close()
                document.body.removeChild(dialog)


            })





            dialog.showModal()
        }
    }

    function updateBike(bikeSelected) {

        console.log('bikeSelected', bikeSelected)

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


        const dialog = document.createElement('dialog')
        dialog.classList.add('m-auto', 'overflow-hidden', 'rounded-sm', 'backdrop:bg-gray-500/75')
        dialog.innerHTML = dialogTpl
        document.body.appendChild(dialog)


        dialog.showModal()


        const updateForm = document.getElementById('bike-2-form')

        updateForm.addEventListener('submit', (e) => {

            let formData = new FormData(updateForm)

            bikes.map(bike => {
                if (bike['id'] == bikeSelected['id']) {
                    bike['nombre'] = formData.get('nombre-2')
                    bike['description'] = formData.get('description-2')
                    bike['talla'] = formData.get('talla-2')
                    bike['fecha'] = formData.get('fecha-2')
                    bike['estado'] = formData.get('estado-2')
                }
            })

            localStorage.setItem('bikes', JSON.stringify(bikes))

            const gridSection = document.getElementById('bike-grid')
            gridSection.innerHTML = ''


            dialog.close()
            document.body.removeChild(dialog)
            renderBikes(bikes)



        })

    }
})















