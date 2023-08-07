import { router } from "@inertiajs/react";

import TextInput from "@/Components/Atom/TextInput";

import { Pagination } from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function DeviceTable({ devices, updateDevice, className = "" }) {
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
                            Device Name
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Unique Id
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Status
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Phone
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Contact
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Heart Rate
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Weather Temp.
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {devices.data.map((device, index) => (
                        <tr key={device.id}>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {device.id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {device.name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {device.unique_id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {device.status == "online" ? (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 3L4.5 8.5L2 6"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <h2 className="text-sm font-normal">
                                            {device.status}
                                        </h2>
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 3L3 9M3 3L9 9"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <h2 className="text-sm font-normal">
                                            {device.status}
                                        </h2>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {device.phone ? device.phone : "-"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {device.contact ? device.contact : "-"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                0
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                0
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                <button
                                    type="button"
                                    className="text-sky-600 text-opacity-50 hover:text-opacity-100 cursor-pointer mr-4"
                                    onClick={() => updateDevice(device.id)}
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
                    {devices.data.length === 0 && (
                        <tr>
                            <td
                                className="px-4 py-2 text-s text-center text-gray-500 whitespace-nowrap"
                                colSpan="9"
                            >
                                No device found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-2 flex justify-end">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={devices.last_page}
                    page={devices.current_page}
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
