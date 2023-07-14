import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from "@/Components/Atom/Button";

export default function Index({ auth }) {
    const { devices } = usePage().props;
    const { data } = devices;

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Device" />

            <div className="px-4 py-5 sm:px-6 ls:px-8 h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Device List</h3>

                    <Button primary>+ Add Device</Button>
                </div>

                <div className="block w-full bg-white rounded-t-lg px-4 py-4">
                    <table className="table-fixed w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Device Name</th>
                                <th>Unique Id</th>
                                <th>Status</th>
                                <th>Phone</th>
                                <th>Contact</th>
                                <th>Heart Rate</th>
                                <th>Weather Temp.</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((device) => (
                                <tr>
                                    <td>{device.id}</td>
                                    <td>{device.name}</td>
                                    <td>{device.uniquie_id}</td>
                                    <td>{device.status}</td>
                                    <td>{device.phone}</td>
                                    <td>{device.contact}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}