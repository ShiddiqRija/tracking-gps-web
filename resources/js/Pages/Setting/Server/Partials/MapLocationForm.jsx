import MapView, { map } from "@/Components/Map/Core/MapView";
import { useEffect } from "react";

export default function MapLocationForm({ locationInit, mapCenter, mapZoom }) {
    useEffect(() => {
        map.addListener("click", (e) => {
            mapCenter(e.latLng.toJSON());
        });
        map.addListener("zoom_changed", (e) => {
            mapZoom(map.getZoom());
        });
    }, []);

    useEffect(() => {
        map.removeMarkers();

        map.setOptions({
            minZoom: 1,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER,
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP,
            },
        });

        map.setCenter({
            lat: locationInit.latitude,
            lng: locationInit.longitude,
        });
    }, []);
    return <MapView />;
}
