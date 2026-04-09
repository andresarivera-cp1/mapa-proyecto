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