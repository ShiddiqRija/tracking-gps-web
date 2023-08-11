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

        map.setOptions({
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER,
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP,
            },
        });
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
