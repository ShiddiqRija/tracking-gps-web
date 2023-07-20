import { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/Atom/TextInput';
import Button from '@/Components/Atom/Button';

import gmaps from 'gmaps';
import gmapsLoader from '@/Libs/GmapsLoader';

import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import BatteryFullOutlinedIcon from '@mui/icons-material/BatteryFullOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import EmergencyShareOutlinedIcon from '@mui/icons-material/EmergencyShareOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


export default function Index({ auth }) {
    const { positions } = usePage().props;
    const [map, setMap] = useState(null);
    // const [marker, setMarker] = useState([]);
    const [positionData, setPositionData] = useState([]);
    const [searchDevice, setSearchDevice] = useState('');

    const handleSearch = (value) => {
        setSearchDevice(value);
    }

    const filteredDevices = positionData.filter((device) => device.name.toLowerCase().includes(searchDevice.toLowerCase()));

    useEffect(() => {
        setPositionData(positions.data);

        gmapsLoader.load().then(() => {
            const initMap = new gmaps({
                el: '#map',
                lat: 1.1134006,
                lng: 104.0652815,
                zoom: 11,
                disableDefaultUI: true,
            });

            setMap(initMap);
        })
    }, [])

    useEffect(() => {
        if (map) {
            initMarker();
        }
    }, [map])

    const initMarker = () => {
        const positionList = positions.data.filter(device => device.position !== null).map(device => ({
            lat: device.position.latitude,
            lng: device.position.longitude,
            title: device.name
        }))

        map.addMarkers(positionList);
    }

    useEffect(() => {
        const channel = Echo.channel('position-update');
        channel.listen('PositionUpdateEvent', function (data) {
            setPositionData(data.data[0]);
            updateMarker(data.data[0])
        });
    }, [positionData])

    const updateMarker = (value) => {
        if (map) {
            map.removeMarkers();
            const positionList = value.filter(device => device.position !== null).map(device => ({
                lat: device.position.latitude,
                lng: device.position.longitude,
                title: device.name
            }))

            map.addMarkers(positionList);
        }
    }



    // useEffect(() => {
    //     setPositionData(positions.data);

    //     gmapsLoader.load().then(() => {
    //         const mapInit = new gmaps({
    //             el: '#map',
    //             lat: 1.1134006,
    //             lng: 104.0652815,
    //             zoom: 11,
    //             disableDefaultUI: true,
    //         });

    //         setMap(mapInit);
    //     })
    // }, []);

    // const mapInit = () => {
    //     const map = new gmaps({
    //         el: '#map',
    //         lat: 1.1134006,
    //         lng: 104.0652815,
    //         zoom: 11,
    //         disableDefaultUI: true,
    //     });

    //     return map;
    // }

    // const positionList = () => {
    //     const data = [];
    //     positions.data.map((device) => {
    //         if (device.position != null) {
    //             data.push({
    //                 lat: device.position.latitude,
    //                 lng: device.position.longitude,
    //                 title: device.name,
    //             })
    //         }
    //     });

    //     return data;
    // }

    // const markerInit = () => {
    //     map.addMarkers(marker);
    // }

    // const updateMarker = (map) => {
    //     map.removeMarkers();
    //     const data = [];
    //     positionData.map((device) => {
    //         if (device.position != null) {
    //             data.push({
    //                 lat: device.position.latitude,
    //                 lng: device.position.longitude,
    //                 title: device.name,
    //             });
    //         }
    //     })
    // }

    // useEffect(() => {
    //     setPositionData(positions.data);

    //     gmapsLoader.load().then(() => {
    //         const map = mapInit();
    //         const dataInit = positionList();

    //         markerInit(map, dataInit);

    //         const channel = Echo.channel('position-update');
    //         channel.listen('PositionUpdateEvent', function (data) {
    //             setPositionData([data.data[0]]);
    //             const intervalId = setInterval(() => {
    //                 updateMarker(map);
    //             }, 5000);
    //         });
    //     });

    // }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tracking" />

            <div className="relative h-screen-bg-gray-100">

                <div id="map" className="relative w-full h-screen"></div>

                <div className="absolute w-3/12 top-2 right-2 z-10 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between p-2">
                        <TextInput
                            id="search-device"
                            name="search-device"
                            className="mr-2 block w-full"
                            autoComplete="current-search-device"
                            value={searchDevice}
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                        <Button primary><MapOutlinedIcon /></Button>
                    </div>
                </div>

                <div className="absolute w-3/12 top-20 right-2 z-10 bg-white rounded-lg shadow-md max-h-full bottom-4 overflow-y-auto">
                    <ul role='list' className="py-1 mt-3">
                        {filteredDevices.map((device) => (
                            <li key={device.id} className="px-4 py-2 border-y cursor-pointer hover:bg-gray-100">
                                <div className="flex justify-between">
                                    <div>
                                        <span className={`${device.status == 'online' ? 'text-green-400' : 'text-rose-600'} mr-1`}>
                                            <FiberManualRecordIcon fontSize="small" />
                                        </span>
                                        {device.name}
                                    </div>
                                    <div className="flex">
                                        <BatteryFullOutlinedIcon /> {device.position == null ? '0' : device.position.attributes.battery_level}%
                                    </div>
                                </div>
                                <div className="flex py-1 justify-between items-center ring-sky-600">
                                    <div className="flex items-center">
                                        <MonitorHeartOutlinedIcon className='mr-2' /> {device.position == null ? '0' : device.position.attributes.heart_rate}
                                        <DeviceThermostatOutlinedIcon className='ml-2' /> {device.position == null ? '0' : device.position.attributes.weather_temp}
                                    </div>
                                    <div>
                                        {device.position == null ? '' : device.position.attributes.alarm == 'sos' ? <EmergencyShareOutlinedIcon className='text-rose-500' /> : ''}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}