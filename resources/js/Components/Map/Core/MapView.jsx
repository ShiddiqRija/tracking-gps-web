import { useRef, useLayoutEffect } from "react";
import gmapsLoader from "@/Libs/GmapsLoader";
import gmaps from "gmaps";

const element = document.createElement("div");

const initializeMap = async () => {
    await gmapsLoader.load();
    return new gmaps({
        el: element,
        lat: 0,
        lng: 0,
        width: "100%",
        height: "100%",
        minZoom: 2,
        maxZoom: 22,
        restriction: {
            latLngBounds: {
                north: 34,
                south: -20,
                east: 180.0,
                west: -180.0,
            },
        },
        disableDefaultUI: true,
    });
};

export const map = await initializeMap();

export default function MapView({ children }) {
    const containerEl = useRef(null);

    useLayoutEffect(() => {
        const currentEl = containerEl.current;
        currentEl.appendChild(element);
        map.refresh();
        return () => {
            currentEl.removeChild(element);
        };
    }, [containerEl]);

    return (
        <div className="relative w-full h-full" ref={containerEl}>
            {children}
        </div>
    );
}
