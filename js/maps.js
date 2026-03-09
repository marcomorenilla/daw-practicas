import { GOOGLE_MAPS_API_KEY } from '../env.js';


document.addEventListener('DOMContentLoaded', () => {

    loadGoogleMaps();

});



function loadGoogleMaps() {
    const mapsSection = document.getElementById('maps-section')
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=marker`;
    script.async = true;
    script.defer = true;
    mapsSection.appendChild(script);
}

window.initMap = async function () {
    console.log("¡Google Maps ha encontrado la función initMap!");

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.6523, lng: -4.7286 },
        zoom: 17,
        mapId: 'Valladolid'
    });

    const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker'));
    const marker = new AdvancedMarkerElement({
        position: { lat: 41.6523, lng: -4.7286 },
        map: map,
        title: "Plaza Mayor, Valladolid"
    });
};






