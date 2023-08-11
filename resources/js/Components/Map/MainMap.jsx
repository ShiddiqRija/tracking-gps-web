import { useEffect } from "react";
import MapView, { map } from "./Core/MapView";
import MapPositions from "./MapPositions";

export default function MainMap({
    filteredPositions,
    selectedDevice,
    markerClick,
}) {
    useEffect(() => {
        map.removePolygons();
        map.removePolylines();
    }, []);

    return (
        <>
            <MapView>
                <MapPositions
                    positions={filteredPositions}
                    selectedDevice={selectedDevice}
                    markerClick={markerClick}
                />
            </MapView>
        </>
    );
}
