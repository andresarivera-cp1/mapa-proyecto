console.log("VERSION 2.0 Monitoreo de buses ");
// Importar firebase 
import { crearTrackingBus } from "./js/tracker.js";
import { crearMapa, crearMarcadoresLugares } from "./js/map.js";
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
const { map, marker, marker2 } = crearMapa();

const lugares = [
    {
        coords: [2.4510135000524413, -76.59913795289654],
        iconUrl: 'img/lugar1.png',
        popup: 'Facultad de Salud'
    },
    {
        coords: [2.446918364817143, -76.59763764241958],
        iconUrl: 'img/lugar1.png',
        popup: 'Facultad de Contables'
    }
    {
        coords: [2.4458887205340663, -76.59814801146317],
        iconUrl: 'img/lugar1.png',
        popup: 'Facultad de Ingeniería civil'
    }
    {
        coords: [2.4463101213632137, -76.60043562986958],
        iconUrl: 'img/lugar1.png',
        popup: 'Facultad de Educación'
    }
        {
        coords: [2.441524668419758, -76.6035057023519],
        iconUrl: 'img/lugar1.png',
        popup: 'Facultad de Ciencias Sociales/Humanidades'
    }
    {
        coords: [2.4417364484593755, -76.60471300594388],
        iconUrl: 'img/lugar1.png',
        popup: 'Facultad de Derecho'
    }
];

const marcadoresLugares = crearMarcadoresLugares(map, lugares);

// Sidebar toggle behavior: collapse/expand with a button
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebar-toggle');

function setSidebarCollapsed(collapsed) {
  if (collapsed) {
    sidebar.classList.add('collapsed');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '▶';
  } else {
    sidebar.classList.remove('collapsed');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = '◀';
  }
  try { localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0'); } catch (e) {}
  // Update Leaflet map size after transition
  if (typeof map !== 'undefined' && map && typeof map.invalidateSize === 'function') {
    setTimeout(() => map.invalidateSize(), 300);
  }
}

toggle.addEventListener('click', () => {
  const collapsed = sidebar.classList.toggle('collapsed');
  setSidebarCollapsed(collapsed);
});

// restore state from localStorage
const saved = localStorage.getItem('sidebarCollapsed');
if (saved === '1') setSidebarCollapsed(true);



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

