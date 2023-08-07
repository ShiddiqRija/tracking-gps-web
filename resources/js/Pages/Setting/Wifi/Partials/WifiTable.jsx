import {router} from "@inertiajs/react"

import TextInput from "@/Components/Atom/TextInput";

import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Pagination } from "@mui/material";

export default function WifiTable({ wifis, updateWifi, classname = "" }) {
    return (
        <div className="block w-full bg-white rounded-t-lg px-4 py-4">
            <div className="flex justify-end">
                <TextInput
                    id="search"
                    name="search"
                    onChange={(e) => {
                        e.preventDefault();

                        router.visit(
                            route(route().current(), {
                                search: e.target.value,
                            }),
                            {
                                preserveState: true,
                                replace: true,
                            }
                        );
                    }}
                    className="mb-2 block w-60"
                    placeholder="Search..."
                />
            </div>
            <table className="table-fixed min-w-full border border-gray-300 divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            No
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Location Name
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Mac Address
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {wifis.data.map((wifi, index) => (
                        <tr key={wifi.id}>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {wifi.id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {wifi.location_name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {wifi.mac}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                <button
                                    type="button"
                                    className="text-sky-600 text-opacity-50 hover:text-opacity-100 cursor-pointer mr-4"
                                    onClick={() => updateWifi(wifi.id)}
                                >
                                    <AutoFixHighOutlinedIcon />
                                </button>
                                <button
                                    type="button"
                                    className="text-rose-600 text-opacity-50 hover:text-opacity-100 cursor-pointer "
                                >
                                    <DeleteOutlinedIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {wifis.data.length === 0 && (
                        <tr>
                            <td
                                className="px-4 py-2 text-s text-center text-gray-500 whitespace-nowrap"
                                colSpan="9"
                            >
                                No Wifi/Router found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-2 flex justify-end">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={wifis.last_page}
                    page={wifis.current_page}
                    onChange={(event, page) => {
                        event.preventDefault();

                        router.visit(route(route().current(), { page }), {
                            preserveState: true,
                            replace: true,
                        });
                    }}
                />
            </div>
        </div>
    );
}
