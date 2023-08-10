import { useEffect } from "react";

import { map } from "./Core/MapView";

export default function MapRoutePoints({ positions, onClick }) {

    const onPointClick = (index) => {
        onClick(index);
    };

    useEffect(() => {
        map.removePolygons();

        positions.map((position, index) => {
            map.drawCircle({
                center: {
                    lat: position.latitude,
                    lng: position.longitude,
                },
                strokeColor: "#0ea5e9",
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: "#0ea5e9",
                fillOpacity: 1,
                radius: 0.4,
                click: () => onPointClick(index),
            });
        });
    }, [positions]);

    return null;
}
