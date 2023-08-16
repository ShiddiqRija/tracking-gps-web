import { router } from "@inertiajs/react";
import TextInput from "@/Components/Atom/TextInput";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Pagination } from "@mui/material";

export default function UserTable({ users, editUser, classname = "" }) {
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
                            Name
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Email
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user, index) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {user.id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {user.name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                {user.email}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                <button
                                    type="button"
                                    className="text-sky-600 text-opacity-50 hover:text-opacity-100 cursor-pointer mr-4"
                                    onClick={() => editUser(user.id)}
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
                    {users.data.length === 0 && (
                        <tr>
                            <td
                                className="px-4 py-2 text-s text-center text-gray-500 whitespace-nowrap"
                                colSpan="9"
                            >
                                No User found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-2 flex justify-end">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={users.last_page}
                    page={users.current_page}
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
