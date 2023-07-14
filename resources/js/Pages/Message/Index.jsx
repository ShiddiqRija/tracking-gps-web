import { Head } from "@inertiajs/react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from "@/Components/Atom/Button";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Message" />

            <div className="px-4 py-5 sm:px-6 ls:px-8 h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Message List</h3>

                    <Button primary>+ Send Message</Button>
                </div>

                <div className="block w-full bg-white rounded-t-lg px-4 py-4">
                    <table className="table-fixed w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Device Name</th>
                                <th>Unique Id</th>
                                <th>Message</th>
                                <th>Send Time</th>
                                <th>Sender</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}