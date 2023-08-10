import { useEffect } from "react";
import MapView from "./Core/MapView";
import MapPositions from "./MapPositions";

export default function MainMap({ filteredPositions }) {
    return (
        <>
            <MapView>
                <MapPositions positions={filteredPositions} />
            </MapView>
        </>
    );
}
