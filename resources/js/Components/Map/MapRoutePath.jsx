import { useEffect } from "react";

import { map } from "./Core/MapView";

export default function MapRoutePath({ positions, coordinates }) {
    useEffect(() => {
        map.removePolylines();

        if (!coordinates) {
            coordinates = positions.map((item) => ({
                lat: item.latitude,
                lng: item.longitude,
            }));
        }

        map.drawPolyline({
            path: coordinates,
            strokeColor: "#0ea5e9",
            strokeOpacity: 1,
            strokeWeight: 2,
        });
    }, [positions, coordinates]);

    return null;
}
