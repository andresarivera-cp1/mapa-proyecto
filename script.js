console.log("VERSION 2.0 Monitoreo de buses ");
// Importar firebase 
import { crearTrackingBus } from "./js/tracker.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; //enviarvectorruta

//Configuración de Firebase

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

//  Marcadores de buses para el mapa
var marker = L.marker([2.4448, -76.6147], {
    icon: busIcon
}).addTo(map);

var marker2 = L.marker([2.4448, -76.6147], {
    icon: busIcon2
}).addTo(map);



crearTrackingBus({
    map,
    busRef: ref(db, "bus1"),
    rutaRef: ref(db, "rutaBus1"),
    marker: marker,
    color: "#fe24bc"
});

crearTrackingBus({
    map,
    busRef: ref(db, "bus2"),
    rutaRef: ref(db, "rutaBus2"),
    marker: marker2,
    color: "#121a89"
});

