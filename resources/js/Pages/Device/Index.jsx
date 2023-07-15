import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

import { toast } from "react-hot-toast";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from "@/Components/Atom/Button";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import InputError from "@/Components/Atom/InputError";

export default function Index({ auth }) {
    const { devices } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        unique_id: '',
        contact: '',
        phone: '',
        group_id: 0,
    });

    const addDevice = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        reset();
    };

    // const store = (e) => {
    //     return post(route('device.store'), {
    //         onSuccess: () => closeModal(),
    //         onError: () => closeModal(),
    //         onFinish: () => reset(),
    //     })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route('device.store'), {
            preserveScroll: true,
            onProgress: () => toast.loading('Saving...'),
            onSuccess: () => {
                toast.success('Device saved!');
                closeModal();
            },
            onError: () => toast.error('Could not save.'),
            onFinish: () => reset()
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Device" />

            <div className="px-4 py-5 sm:px-6 ls:px-8 h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Device List</h3>

                    <Button primary onClick={addDevice}>+ Add Device</Button>
                </div>

                <Modal show={isModalOpen} onClose={closeModal}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Device
                        </h2>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Devce Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full"
                                isFocused
                                placeholder="Device Name"
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="unique_id" value="Unique Id" />

                            <TextInput
                                id="unique_id"
                                name="unique_id"
                                value={data.unique_id}
                                onChange={(e) => setData('unique_id', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Unique Id"
                            />

                            <InputError message={errors.unique_id} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="contact" value="Contact" />

                            <TextInput
                                id="contact"
                                name="contact"
                                value={data.contact}
                                onChange={(e) => setData('contact', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Contact"
                            />

                            <InputError message={errors.contact} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="phone" value="Phone Number" />

                            <TextInput
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Phone Number"
                            />

                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button danger onClick={closeModal}>Cancel</Button>
                            <Button primary type="submit" className="ml-3" disabled={processing}>Save</Button>
                        </div>
                    </form>
                </Modal>

                <div className="block w-full bg-white rounded-t-lg px-4 py-4">
                    <table className="table-fixed min-w-full border border-gray-300 divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">No</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Device Name</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Unique Id</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Status</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Phone</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Contact</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Heart Rate</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Weather Temp.</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.data.map((device) => (
                                <tr key={device.id}>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{device.id}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{device.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{device.unique_id}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {device.status == 'online' ?
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                <h2 className="text-sm font-normal">{device.status}</h2>
                                            </div>
                                            :
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                <h2 className="text-sm font-normal">{device.status}</h2>
                                            </div>

                                        }
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{device.phone}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{device.contact}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">0</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">0</td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">0</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}