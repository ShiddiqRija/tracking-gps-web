import { router } from "@inertiajs/react";

import Button from "@/Components/Atom/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function SelectedDevice({ device, setIsDeviceInfoOpen }) {
    return (
        <div className="z-20 absolute bottom-4 left-1/3 transform -translate-x-1/4 w-2/12 bg-white px-4 py-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-ls font-medium text-gray-900">
                    {device.name}
                </h2>
                <button
                    className="text-black"
                    onClick={() => setIsDeviceInfoOpen(false)}
                >
                    <CloseIcon />
                </button>
            </div>

            <table className="table-fixed min-w-full text-left">
                <tbody>
                    <tr>
                        <th scope="row" className="px-2 py-1">
                            Device Name
                        </th>
                        <td className="px-2 py-1">{device.name}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-2 py-1">
                            Contact
                        </th>
                        <td className="px-2 py-1">{device.contact}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-2 py-1">
                            Phone
                        </th>
                        <td className="px-2 py-1">{device.phone}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-2 py-1">
                            Location
                        </th>
                        <td className="px-2 py-1">{device.location}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-2 py-1">
                            Latitude
                        </th>
                        <td className="px-2 py-1">{device.lat}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-2 py-1">
                            Longitude
                        </th>
                        <td className="px-2 py-1">{device.lng}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="px-2 py-1">
                            <Button
                                fullWidth
                                onClick={() =>
                                    router.visit(route("replay.index"))
                                }
                            >
                                Replay
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
