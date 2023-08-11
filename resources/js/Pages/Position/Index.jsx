import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { map } from "@/Components/Map/Core/MapView";
import MainMap from "@/Components/Map/MainMap";
import DeviceList from "./Partials/DeviceList";
import SelectedDevice from "@/Components/Map/SelectedDevice";

export default function Index({ auth }) {
    const { devices, locationInit } = usePage().props;
    const [isDeviceInfoOpen, setIsDeviceInfoOpen] = useState(false);
    const [deviceData, setDeviceData] = useState([]);
    const [positionData, setPositionData] = useState([]);
    const [deviceInfo, setDeviceInfo] = useState({
        name: "",
        contact: "",
        phone: "",
        location: "",
        lat: "",
        lng: "",
    });

    const deviceClick = (value) => {
        setDeviceInfo({
            name: value.name,
            contact: value.contact && "-",
            phone: value.phone && "-",
            location: value.position.location,
            lat: value.position.latitude,
            lng: value.position.longitude,
        });

        map.setZoom(19);
        map.setCenter(
            value.position.latitude ,
            value.position.longitude 
        );

        setIsDeviceInfoOpen(true);
    };

    useEffect(() => {
        setDeviceData(devices.data);
        setPositionData(
            devices.data
                .filter((device) => device.position !== null)
                .map((device) => ({
                    name: device.name,
                    latitude: device.position.latitude,
                    longitude: device.position.longitude,
                }))
        );
    }, []);

    useEffect(() => {
        map.setCenter({
            lat: locationInit.latitude,
            lng: locationInit.longitude,
        });
        map.setZoom(locationInit.zoom);
    }, []);

    useEffect(() => {
        const channel = Echo.channel("position-update");
        channel.listen("PositionUpdateEvent", function (data) {
            setDeviceData(data.data[0]);
            setPositionData(
                data.data[0]
                    .filter((device) => device.position !== null)
                    .map((device) => ({
                        name: device.name,
                        latitude: device.position.latitude,
                        longitude: device.position.longitude,
                    }))
            );
        });
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tracking" />

            <div className="relative h-screen bg-gray-100 overflow-hidden">
                <MainMap
                    filteredPositions={positionData}
                    selectedDevice={deviceData}
                    markerClick={deviceClick}
                />
                <DeviceList deviceData={deviceData} deviceClick={deviceClick} />
                {isDeviceInfoOpen && (
                    <SelectedDevice
                        device={deviceInfo}
                        setIsDeviceInfoOpen={setIsDeviceInfoOpen}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
