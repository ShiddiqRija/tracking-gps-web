import MapView, { map } from "@/Components/Map/Core/MapView";
import MainMap from "@/Components/Map/MainMap";
import MapPositions from "@/Components/Map/MapPositions";
import MapRoutePath from "@/Components/Map/MapRoutePath";
import MapRoutePoints from "@/Components/Map/MapRoutePoints";
import { useState } from "react";
import { useEffect } from "react";

export default function Index() {
    const [index, setIndex] = useState(0);

    const positions = [
        {
            latitude: 1.1134006,
            longitude: 104.0652815,
        },
        {
            latitude: 1.1144006,
            longitude: 104.0752815,
        },
        {
            latitude: 1.1264006,
            longitude: 104.0852815,
        },
    ];

    const onPointClick = (position, index) => {
        setIndex(index);
        map.setCenter(position);
    };

    useEffect(() => {
        map.setCenter({
            lat: 1.1134006,
            lng: 104.0652815,
        });
    }, []);
    // return <MainMap filteredPositions={[positions[0]]} />;
    return (
        <MapView>
            <MapRoutePath positions={positions} />
            <MapRoutePoints positions={positions} onClick={onPointClick} />
            <MapPositions positions={[positions[index]]} />
        </MapView>
    );
}
