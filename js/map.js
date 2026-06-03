export function crearMapa() {
    // variable global para compatibilidad con el código existente
    window.ruta = [];

    const map = L.map('map', {
        zoom: 15,
        minZoom: 13,
        maxZoom: 19
    }).setView([2.4448, -76.6900], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const popayanBounds = L.latLngBounds([
        [2.35, -76.72],
        [2.53, -76.54]
    ]);
   // map.setMaxBounds(popayanBounds);

    const busIcon = L.icon({
        iconUrl: 'img/auto1.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40]
    });

    const busIcon2 = L.icon({
        iconUrl: 'img/auto2.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const marker = L.marker([2.4448, -76.6147], { icon: busIcon }).addTo(map);
    const marker2 = L.marker([2.4448, -76.6147], { icon: busIcon2 }).addTo(map);

    return { map, busIcon, busIcon2, marker, marker2 };
}

export function crearMarcadoresLugares(map, lugares) {
    return lugares.map((lugar) => {
        const lugarIcon = L.icon({
            iconUrl: lugar.iconUrl,
            iconSize: lugar.iconSize || [40, 40],
            iconAnchor: lugar.iconAnchor || [20, 40],
            popupAnchor: lugar.popupAnchor || [0, -40]
        });

        const marker = L.marker(lugar.coords, { icon: lugarIcon }).addTo(map);

        if (lugar.popup) {
            marker.bindPopup(lugar.popup);
        }

        return marker;
    });
}

