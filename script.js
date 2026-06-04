console.log("VERSION 2.0 Monitoreo de buses ");
// Importar firebase 
import { crearTrackingBus } from "./js/tracker.js";
import { crearMapa, crearMarcadoresLugares } from "./js/map.js";
import { lugares, paradas } from "./js/data.js";
import { cargarClimaPopayan } from "./js/weather.js";
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

const marcadoresLugares = crearMarcadoresLugares(map, lugares);
const marcadoresParadas = crearMarcadoresLugares(map, paradas);

// Ajusta el tamaño de los iconos de las paradas según el nivel de zoom
function updateParadaIconSizes() {
  const zoom = map.getZoom();
  const minZ = (map.options && map.options.minZoom) ? map.options.minZoom : 13;
  const maxZ = (map.options && map.options.maxZoom) ? map.options.maxZoom : 19;
  const t = Math.max(0, Math.min(1, (zoom - minZ) / (maxZ - minZ)));
  const minSize = 18; // tamaño en px cuando está alejado
  const maxSize = 34; // tamaño en px cuando está cercano
  const size = Math.round(minSize + t * (maxSize - minSize));

  marcadoresParadas.forEach((m, i) => {
    const info = paradas[i] || {};
    const iconUrl = info.iconUrl || 'img/auto1.png';
    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [size, size],
      iconAnchor: [Math.round(size / 2), size],
      popupAnchor: [0, -size]
    });
    m.setIcon(icon);
  });
}

map.on('zoomend', updateParadaIconSizes);
// inicializar tamaños según zoom actual
updateParadaIconSizes();

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

cargarClimaPopayan();
setInterval(cargarClimaPopayan, 5 * 60 * 1000); // actualizar clima cada 5 minutos

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

