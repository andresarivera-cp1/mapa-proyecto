// Crear mapa centrado en Popayán
var map = L.map('map').setView([2.4448, -76.6147], 13);

// Cargar mapa base
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Marcador de prueba
L.marker([2.4448, -76.6147])
  .addTo(map)
  .bindPopup("Probando desde GitHub Pages 🚀")
  .openPopup();

// 🔥 Escuchar Firebase
const ubicacionRef = window.ref(window.db, 'ubicacion');

window.onValue(ubicacionRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
        const lat = data.lat;
        const lng = data.lng;

        // mover marcador
        marker.setLatLng([lat, lng]);

        // mover el mapa
        map.setView([lat, lng], 15);
    }
});
