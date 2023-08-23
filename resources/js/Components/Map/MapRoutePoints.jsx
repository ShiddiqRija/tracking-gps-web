import { useEffect } from "react";

import { map } from "./Core/MapView";
import { useState } from "react";

export default function MapRoutePoints({ positions, onClick }) {
    const [radius, setRadius] = useState(0.1);

    const minZoom = 22;
    const maxZoom = 2;

    const minRadius = 0.1;
    const maxRadius = 4;

    // Menghitung nilai m (slope) dan c (intersep) dari transformasi linear
    const m = (maxRadius - minRadius) / (maxZoom - minZoom);
    const c = minRadius - m * minZoom;

    map.addListener("zoom_changed", (e) => {
        calculateRadius(map.getZoom());
    });

    const calculateRadius = (value) => {
        setRadius(m * value + c);
    };

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
                radius: radius,
                click: () => onPointClick(index),
            });
        });
    }, [positions, radius]);

    return null;
}
