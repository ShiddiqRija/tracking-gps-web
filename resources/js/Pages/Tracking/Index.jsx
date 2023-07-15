import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/Atom/TextInput';
import Button from '@/Components/Atom/Button';

import gmaps from 'gmaps';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import BatteryFullOutlinedIcon from '@mui/icons-material/BatteryFullOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import EmergencyShareOutlinedIcon from '@mui/icons-material/EmergencyShareOutlined';
import gmapsLoader from '@/Libs/GmapsLoader';

export default function Index({ auth }) {
    const [searchDevice, setSearchDevice] = useState('');

    const handleSearch = (value) => {
        setSearchDevice(value);
    }

    const deviceList = [
        {
            id: 1,
            name: 'Device Name 1',
            battery: '90',
            heartRate: 0,
            temperature: 0,
        },
        {
            id: 2,
            name: 'Device Name 2',
            battery: '75',
            heartRate: 1,
            temperature: 1,
        },
    ]

    const filteredDevices = deviceList.filter((device) => device.name.toLowerCase().includes(searchDevice.toLowerCase()))

    useEffect(() => {
        gmapsLoader.load().then(() => {
            const map = new gmaps({
                el: '#map',
                lat: 1.1134006,
                lng: 104.0652815,
                zoom: 12,
                disableDefaultUI: true,
            });
        })
    }, []);

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
                                        {device.name}
                                    </div>
                                    <div className="flex">
                                        <BatteryFullOutlinedIcon /> {device.battery}%
                                    </div>
                                </div>
                                <div className="flex py-1 justify-between items-center ring-sky-600">
                                    <div className="flex items-center">
                                        <MonitorHeartOutlinedIcon className='mr-2' /> {device.heartRate} <DeviceThermostatOutlinedIcon className='ml-2' /> {device.temperature}
                                    </div>
                                    <div>
                                        <EmergencyShareOutlinedIcon className='text-rose-500' />
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