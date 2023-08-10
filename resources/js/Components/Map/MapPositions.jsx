import { useEffect } from "react";
import { map } from "./Core/MapView";

export default function MapPositions({ positions }) {
    useEffect(() => {
        map.removeMarkers();

        positions.map((position) =>
            map.addMarker({
                lat: position.latitude,
                lng: position.longitude,
            })
        );
    }, [positions]);

    return null;
}
