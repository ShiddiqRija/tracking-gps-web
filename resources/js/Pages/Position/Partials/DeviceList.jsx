import { useEffect, useState } from "react";

import Button from "@/Components/Atom/Button";
import TextInput from "@/Components/Atom/TextInput";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ReorderIcon from "@mui/icons-material/Reorder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BatteryFullOutlinedIcon from "@mui/icons-material/BatteryFullOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import EmergencyShareOutlinedIcon from "@mui/icons-material/EmergencyShareOutlined";

export default function DeviceList({ deviceData, deviceClick }) {
    const [searchDevice, setSearchDevice] = useState("");
    const [isDeviceListOpen, setIsDeviceListOpen] = useState(true);

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        setDevices(deviceData);
    }, [deviceData]);

    const handleSearch = (value) => {
        setSearchDevice(value);
    };

    const filteredDevices = devices.filter((device) =>
        device.name.toLowerCase().includes(searchDevice.toLowerCase())
    );

    return (
        <>
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

                    {isDeviceListOpen ? (
                        <Button
                            primary
                            onClick={() => setIsDeviceListOpen(false)}
                        >
                            <MapOutlinedIcon />
                        </Button>
                    ) : (
                        <Button
                            primary
                            onClick={() => setIsDeviceListOpen(true)}
                        >
                            <ReorderIcon />
                        </Button>
                    )}
                </div>
            </div>

            <div
                className={
                    isDeviceListOpen
                        ? "absolute w-3/12 top-20 right-2 z-10 bg-white rounded-lg shadow-md max-h-full bottom-4 overflow-y-auto"
                        : "hidden"
                }
            >
                <ul role="list" className="py-1 mt-3">
                    {filteredDevices.map((device) => (
                        <li
                            key={device.id}
                            onClick={() => deviceClick(device)}
                            className="px-4 py-2 border-y cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <span
                                        className={`${
                                            device.status == "online"
                                                ? "text-green-400"
                                                : "text-rose-600"
                                        } mr-1`}
                                    >
                                        <FiberManualRecordIcon fontSize="small" />
                                    </span>
                                    {device.name}
                                </div>
                                <div className="flex">
                                    <BatteryFullOutlinedIcon />{" "}
                                    {device.position == null
                                        ? "0"
                                        : device.position.attributes
                                              .battery_level}
                                    %
                                </div>
                            </div>
                            <div className="flex py-1 justify-between items-center ring-sky-600">
                                <div className="flex items-center">
                                    <MonitorHeartOutlinedIcon className="mr-2" />{" "}
                                    {device.position == null
                                        ? "0"
                                        : device.position.attributes.heart_rate}
                                    <DeviceThermostatOutlinedIcon className="ml-2" />{" "}
                                    {device.position == null
                                        ? "0"
                                        : device.position.attributes
                                              .weather_temp}
                                </div>
                                <div>
                                    {device.position == null ? (
                                        ""
                                    ) : device.position.attributes.alarm ==
                                      "sos" ? (
                                        <EmergencyShareOutlinedIcon className="text-rose-500" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
