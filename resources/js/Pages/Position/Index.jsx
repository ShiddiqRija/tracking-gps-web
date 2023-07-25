import { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/Atom/TextInput';
import Button from '@/Components/Atom/Button';

import gmaps from 'gmaps';
import gmapsLoader from '@/Libs/GmapsLoader';

import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ReorderIcon from '@mui/icons-material/Reorder';
import BatteryFullOutlinedIcon from '@mui/icons-material/BatteryFullOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import EmergencyShareOutlinedIcon from '@mui/icons-material/EmergencyShareOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';


export default function Index({ auth }) {
    const { positions } = usePage().props;
    const [map, setMap] = useState(null);
    const [isDeviceListOpen, setIsDeviceListOpen] = useState(false);
    const [positionData, setPositionData] = useState([]);
    const [searchDevice, setSearchDevice] = useState('');
    const [deviceInfo, setDeviceInfo] = useState({
        name: '',
        contact: '',
        phone: '',
        location: '',
        lat: '',
        lng: ''
    });
    const [isDeviceInfoOpen, setIsDeviceInfoOpen] = useState(false);

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
                // disableDefaultUI: true,
                // mapType: 'satellite' 
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
            title: device.name,
            click: () => { markerClick(device) }
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
                title: device.name,
                click: () => { markerClick(device) }
            }))

            map.addMarkers(positionList);
        }
    }

    const markerClick = (value) => {
        if (map) {
            setDeviceInfo({
                name: value.name,
                contact: value.contact && '-',
                phone: value.phone && '-',
                location: value.location,
                lat: value.position.latitude,
                lng: value.position.longitude
            })

            map.setZoom(19);
            map.setCenter(value.position.latitude - 0.00001, value.position.longitude+ 0.0005)
            setIsDeviceInfoOpen(true)
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tracking" />

            <div className="relative h-screen-bg-gray-100">

                <div id="map" className="relative w-full h-screen"></div>

                <div className={isDeviceInfoOpen ? "z-20 absolute bottom-4 left-1/3 transform -translate-x-1/4 w-2/12 bg-white px-4 py-4" : "hidden"}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-ls font-medium text-gray-900">
                            {deviceInfo.name}
                        </h2>
                        <button className="text-black" onClick={() => setIsDeviceInfoOpen(false)}><CloseIcon /></button>
                    </div>

                    <table className="table-fixed min-w-full text-left">
                        <tbody>
                            <tr>
                                <th scope="row" className="px-2 py-1">Device Name</th>
                                <td className="px-2 py-1">{deviceInfo.name}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-1">Contact</th>
                                <td className="px-2 py-1">{deviceInfo.contact}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-1">Phone</th>
                                <td className="px-2 py-1">{deviceInfo.phone}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-1">Location</th>
                                <td className="px-2 py-1">{deviceInfo.location}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-1">Latitude</th>
                                <td className="px-2 py-1">{deviceInfo.lat}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-1">Longitude</th>
                                <td className="px-2 py-1">{deviceInfo.lng}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

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

                        {isDeviceListOpen ?
                            <Button primary onClick={() => setIsDeviceListOpen(false)}><MapOutlinedIcon /></Button>
                            :
                            <Button primary onClick={() => setIsDeviceListOpen(true)}><ReorderIcon /></Button>
                        }
                    </div>
                </div>

                <div className={isDeviceListOpen ? "absolute w-3/12 top-20 right-2 z-10 bg-white rounded-lg shadow-md max-h-full bottom-4 overflow-y-auto" : "hidden"}>
                    <ul role='list' className="py-1 mt-3">
                        {filteredDevices.map((device) => (
                            <li key={device.id} onClick={() => markerClick(device)} className="px-4 py-2 border-y cursor-pointer hover:bg-gray-100">
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