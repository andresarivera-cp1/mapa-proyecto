console.log("VERSION NUEVA - BUS1 🔥");
// 🔥 IMPORTAR FIREBASE (forma correcta)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; //enviarvectorruta

//CONFIG 
const firebaseConfig = {
  apiKey: "AIzaSyC7i13NFAQjYmE5wuBXW4ZQ1o1ptZBulws",
  authDomain: "flowcity1-44199.firebaseapp.com",
  databaseURL: "https://flowcity1-44199-default-rtdb.firebaseio.com",
  projectId: "flowcity1-44199"
};

// INICIALIZAR
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// MAPA
window.ruta = []; //vector para definir ruta
var map = L.map('map', {
    zoom: 15, // zoom inicial
    minZoom: 13, // límite de zoom hacia afuera para mantener el área en Popayán
    maxZoom: 19  //limite de zoom hacia adentro para evitar perder calidad
}).setView([2.4448, -76.6850], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Limitar el área visible para que no se salga de Popayán
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);
map.setMaxBounds(popayanBounds);

// iconos para buses

var busIcon = L.icon({
    iconUrl: 'img/auto1.png',

    iconSize: [40, 40],     // tamaño
    iconAnchor: [20, 20],   // centro del icono
    popupAnchor: [0, -40]
});

var busIcon2 = L.icon({
    iconUrl: 'img/auto2.png',

    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

//  MARCADOR1
var marker = L.marker([2.4448, -76.6147], {
    icon: busIcon
}).addTo(map);

// MARCADOR2
var marker2 = L.marker([2.4448, -76.6147], {
    icon: busIcon2
}).addTo(map);




function crearTrackingBus({
    busRef,
    rutaRef,
    marker,
    color
}) {

    let lineaRecorrida = null;
    let lineaPendiente = null;
    let ruta = [];

    onValue(rutaRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        ruta = data;
    });

    function actualizar(lat, lng) {

        if (!ruta || ruta.length === 0) return;

        let indiceMasCercano = 0;
        let distanciaMin = Infinity;

        ruta.forEach((punto, i) => {

            const distancia = map.distance(
                [lat, lng],
                [punto[0], punto[1]]
            );

            if (distancia < distanciaMin) {
                distanciaMin = distancia;
                indiceMasCercano = i;
            }
        });

        if (distanciaMin > 80) return;

        const parteRecorrida = ruta.slice(0, indiceMasCercano + 1);
        const partePendiente = ruta.slice(indiceMasCercano);

        if (lineaRecorrida) map.removeLayer(lineaRecorrida);
        if (lineaPendiente) map.removeLayer(lineaPendiente);

        lineaRecorrida = L.polyline(parteRecorrida, {
            color,
            weight: 8,
            opacity: 0.2,
            dashArray: '10, 15'
        }).addTo(map);

        lineaPendiente = L.polyline(partePendiente, {
            color,
            weight: 8,
            opacity: 0.7
        }).addTo(map);
    }

    onValue(busRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        marker.setLatLng([data.lat, data.lng]);
        actualizar(data.lat, data.lng);
    });
}

crearTrackingBus({
    busRef: ref(db, "bus1"),
    rutaRef: ref(db, "rutaBus1"),
    marker: marker,
    color: "#fe24bc"
});

crearTrackingBus({
    busRef: ref(db, "bus2"),
    rutaRef: ref(db, "rutaBus2"),
    marker: marker2,
    color: "#121a89"
});

