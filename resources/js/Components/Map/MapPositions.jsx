import { useEffect } from "react";
import { map } from "./Core/MapView";

export default function MapPositions({
    positions,
    selectedDevice,
    markerClick,
}) {
    useEffect(() => {
        map.removeMarkers();

        positions.map((position, index) =>
            map.addMarker({
                lat: position.latitude,
                lng: position.longitude,
                click: () => {
                    if (selectedDevice) {
                        markerClick(selectedDevice[index]);
                    }
                },
            })
        );
    }, [positions]);

    return null;
}
