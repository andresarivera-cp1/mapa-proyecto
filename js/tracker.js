import { onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export function crearTrackingBus({
    map,
    busRef,
    rutaRef,
    marker,
    color
    }) {

    // Funcion para crear trazar, actualizar ruta y marcar posición del bus
     // Se crea el seguimiento para cada bus 

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

        // Se crea una sola vez cada línea, luego solo se actualizan 
        if (!lineaRecorrida) {
            lineaRecorrida = L.polyline([], {
                color,
                weight: 8,
                opacity: 0.2,
                dashArray: '10, 15',
                lineCap: 'round'
            }).addTo(map);
        }

        if (!lineaPendiente) {
            lineaPendiente = L.polyline([], {
                color,
                weight: 8,
                opacity: 0.5,
                lineCap: 'round'
            }).addTo(map);
        }

        //Actualizar
        lineaRecorrida.setLatLngs(parteRecorrida);   //actualizar  c
        lineaPendiente.setLatLngs(partePendiente);
    }

    onValue(busRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        marker.setLatLng([data.lat, data.lng]);
        actualizar(data.lat, data.lng);
    });
}