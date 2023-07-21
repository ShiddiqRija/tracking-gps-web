import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

import { toast } from "react-hot-toast";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from "@/Components/Atom/Button";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import InputError from "@/Components/Atom/InputError";

import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import { Pagination } from "@mui/material";

export default function Index({ auth }) {
    const { wifis } = usePage().props;
    const [modalTitle, setModalTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        location_name: '',
        mac: '',
    });

    const addDevice = () => {
        setModalTitle('Add Wifi Location');
        setIsModalOpen(true);
    };

    const updateDevice = async (id) => {
        const { data } = await axios.get(route('wifi.edit', { id: id }))

        setData({
            id: id,
            location_name: data.location_name,
            mac: data.mac,
        })
        setModalTitle('Edit Wifi Location');
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);

        reset();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.id == '') {
            post(route('wifi.store'), {
                preserveScroll: true,
                onProgress: () => toast.loading('Saving...'),
                onSuccess: () => {
                    toast.success('Wifi saved!');
                    closeModal();
                },
                onError: () => {
                    toast.error('Could not save.');
                    console.log(errors);
                },
                onFinish: () => reset()
            })
        } else {
            put(route('wifi.update', { id: data.id }), {
                preserveScroll: true,
                onProgress: () => toast.loading('Updating...'),
                onSuccess: () => {
                    toast.success('Wifi updated!');
                    closeModal();
                },
                onError: () => toast.error('Could not update.'),
                onFinish: () => reset()
            })
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Wifi" />

            <div className="px-4 py-5 sm:px-6 ls:px-8 h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Wifi Location List</h3>

                    <Button primary onClick={addDevice}>+ Add Wifi Location</Button>
                </div>

                <Modal show={isModalOpen} maxWidth="sm" onClose={closeModal}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            {modalTitle}
                        </h2>

                        <div className="mt-4">
                            <InputLabel htmlFor="location_name" value="Location Name" />

                            <TextInput
                                id="location_name"
                                name="location_name"
                                value={data.location_name}
                                onChange={(e) => setData('location_name', e.target.value)}
                                className="mt-1 block w-full"
                                isFocused
                                placeholder="Location Name"
                            />

                            <InputError message={errors.location_name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="mac" value="Mac Address" />

                            <TextInput
                                id="mac"
                                name="mac"
                                value={data.mac}
                                onChange={(e) => setData('mac', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Mac Address"
                            />

                            <InputError message={errors.mac} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button danger onClick={closeModal}>Cancel</Button>
                            <Button primary type="submit" className="ml-3" disabled={processing}>Save</Button>
                        </div>
                    </form>
                </Modal>

                <div className="block w-full bg-white rounded-t-lg px-4 py-4">
                    <div className="flex justify-end">
                        <TextInput
                            id="search"
                            name="search"
                            onChange={(e) => {
                                e.preventDefault();

                                router.visit(route(route().current(),
                                    { search: e.target.value }),
                                    {
                                        preserveState: true,
                                        replace: true,
                                    });
                            }}
                            className="mb-2 block w-60"
                            placeholder="Search..."
                        />
                    </div>
                    <table className="table-fixed min-w-full border border-gray-300 divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">No</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Location Name</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Mac Address</th>
                                <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wifis.data.map((device, index) => (
                                <tr key={device.id}>
                                    <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">{device.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">{device.location_name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">{device.mac}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                                        <button
                                            type="button"
                                            className="text-sky-600 text-opacity-50 hover:text-opacity-100 cursor-pointer mr-4"
                                            onClick={() => updateDevice(device.id)}
                                        >
                                            <AutoFixHighOutlinedIcon />
                                        </button>
                                        <button type="button" className="text-rose-600 text-opacity-50 hover:text-opacity-100 cursor-pointer "><DeleteOutlinedIcon /></button>
                                    </td>
                                </tr>
                            ))}
                            {wifis.data.length === 0 && (
                                <tr>
                                    <td className="px-4 py-2 text-s text-center text-gray-500 whitespace-nowrap" colSpan="9">
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

                                router.visit(route(route().current(),
                                    { page }),
                                    {
                                        preserveState: true,
                                        replace: true,
                                    });
                            }}
                        />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}