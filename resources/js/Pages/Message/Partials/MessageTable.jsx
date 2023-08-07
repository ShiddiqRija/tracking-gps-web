import { router } from "@inertiajs/react";

import TextInput from "@/Components/Atom/TextInput";

import { Pagination } from "@mui/material";

export default function MessageTable({ messages, classname = "" }) {
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
                            Message
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Send Time
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Sender
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {messages.data.map((message, index) => (
                        <tr key={message.id}>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {message.id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {message.device_id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {message.unique_id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {message.message}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {message.send_time}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {message.sender}
                            </td>
                        </tr>
                    ))}
                    {messages.data.length === 0 && (
                        <tr>
                            <td
                                className="px-4 py-2 text-s text-center text-gray-500 whitespace-nowrap"
                                colSpan="6"
                            >
                                No message found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-2 flex justify-end">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={messages.last_page}
                    page={messages.current_page}
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
