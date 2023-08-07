import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

import { toast } from "react-hot-toast";
import axios from "axios";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Atom/Button";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import InputError from "@/Components/Atom/InputError";

import DeviceTable from "./Partials/DeviceTable";

export default function Index({ auth }) {
    const { devices } = usePage().props;
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: "",
        name: "",
        unique_id: "",
        contact: "",
        phone: "",
        group_id: 0,
    });

    const addDevice = () => {
        setModalTitle("Add Device");
        setIsModalOpen(true);
    };

    const updateDevice = async (id) => {
        const { data } = await axios.get(route("devices.edit", { id: id }));

        setData({
            id: id,
            name: data.name,
            unique_id: data.unique_id,
            contact: data.contact ? data.contact : "",
            phone: data.phone ? data.phone : "",
            group_id: 0,
        });
        setModalTitle("Edit Device");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        reset();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.id == "") {
            post(route("devices.store"), {
                preserveScroll: true,
                onProgress: () => toast.loading("Saving..."),
                onSuccess: () => {
                    toast.success("Device saved!");
                    closeModal();
                },
                onError: () => {
                    toast.error("Could not save.");
                    console.log(errors);
                },
                onFinish: () => reset(),
            });
        } else {
            put(route("devices.update", { id: data.id }), {
                preserveScroll: true,
                onProgress: () => toast.loading("Updating..."),
                onSuccess: () => {
                    toast.success("Device updated!");
                    closeModal();
                },
                onError: () => toast.error("Could not update."),
                onFinish: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Device" />

            <div className="px-4 py-5 sm:px-6 ls:px-8 h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Device List</h3>

                    <Button primary onClick={addDevice}>
                        + Add Device
                    </Button>
                </div>

                <Modal show={isModalOpen} maxWidth="sm" onClose={closeModal}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            {modalTitle}
                        </h2>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Device Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full"
                                isFocused
                                placeholder="Device Name"
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="unique_id" value="Unique Id" />

                            <TextInput
                                id="unique_id"
                                name="unique_id"
                                value={data.unique_id}
                                onChange={(e) =>
                                    setData("unique_id", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="Unique Id"
                            />

                            <InputError
                                message={errors.unique_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="contact" value="Contact" />

                            <TextInput
                                id="contact"
                                name="contact"
                                value={data.contact}
                                onChange={(e) =>
                                    setData("contact", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="Contact"
                            />

                            <InputError
                                message={errors.contact}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="phone" value="Phone Number" />

                            <TextInput
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="Phone Number"
                            />

                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button danger onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button
                                primary
                                type="submit"
                                className="ml-3"
                                disabled={processing}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Modal>

                <DeviceTable devices={devices} updateDevice={updateDevice} />
            </div>
        </AuthenticatedLayout>
    );
}
