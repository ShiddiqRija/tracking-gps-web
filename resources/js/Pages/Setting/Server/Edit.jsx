import { usePage } from "@inertiajs/react";
import SettingIndex from "../SettingIndex";
import MapLocationForm from "./Partials/MapLocationForm";
import UpdateAppLocation from "./Partials/UpdateAppLocationForm";
import { useState } from "react";

export default function Edit({ auth }) {
    const location = usePage().props.location;
    const [newCenter, setNewCenter] = useState(null);
    const [newZoom, setNewZoom] = useState(null);

    const mapCenterHandler = (value) => {
        setNewCenter(value);
    };

    const mapZoomHandler = (value) => {
        setNewZoom(value);
    };

    return (
        <SettingIndex auth={auth} title="App Location">
            <div className="flex-1 px-4 py-5 sm:px-6 ls:px-8 bg-gray-100">
                <div className="flex justify-center">
                    <div className="w-full space-y-4">
                        <div className="w-full h-[118%]">
                            <MapLocationForm
                                locationInit={location}
                                mapCenter={mapCenterHandler}
                                mapZoom={mapZoomHandler}
                            />
                        </div>
                        <div className="flex justify-center">
                            <div className="w-3/12 bg-white rounded-lg px-4 py-4">
                                <UpdateAppLocation
                                    mapCenter={newCenter}
                                    mapZoom={newZoom}
                                    className="max-w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SettingIndex>
    );
}
