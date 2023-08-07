import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

import { toast } from "react-hot-toast";
import axios from "axios";

import SettingIndex from "../SettingIndex";

import Button from "@/Components/Atom/Button";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import InputError from "@/Components/Atom/InputError";
import WifiTable from "./Partials/WifiTable";

export default function Index({ auth }) {
    const { wifis } = usePage().props;
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: "",
        location_name: "",
        mac: "",
    });

    const addDevice = () => {
        setModalTitle("Add Wifi Location");
        setIsModalOpen(true);
    };

    const updateWifi = async (id) => {
        const { data } = await axios.get(route("wifi.edit", { id: id }));

        setData({
            id: id,
            location_name: data.location_name,
            mac: data.mac,
        });
        setModalTitle("Edit Wifi Location");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        reset();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.id == "") {
            post(route("wifi.store"), {
                preserveScroll: true,
                onProgress: () => toast.loading("Saving..."),
                onSuccess: () => {
                    toast.success("Wifi saved!");
                    closeModal();
                },
                onError: () => {
                    toast.error("Could not save.");
                    console.log(errors);
                },
                onFinish: () => reset(),
            });
        } else {
            put(route("wifi.update", { id: data.id }), {
                preserveScroll: true,
                onProgress: () => toast.loading("Updating..."),
                onSuccess: () => {
                    toast.success("Wifi updated!");
                    closeModal();
                },
                onError: () => toast.error("Could not update."),
                onFinish: () => reset(),
            });
        }
    };

    return (
        <SettingIndex auth={auth} title="Wifi Location">
            <div className="flex-1 px-4 py-5 sm:px-6 ls:px-8 bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Wifi Location List</h3>
                    <Button primary onClick={addDevice}>
                        + Add Wifi Location
                    </Button>
                </div>

                <Modal show={isModalOpen} maxWidth="sm" onClose={closeModal}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            {modalTitle}
                        </h2>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="location_name"
                                value="Location Name"
                            />

                            <TextInput
                                id="location_name"
                                name="location_name"
                                value={data.location_name}
                                onChange={(e) =>
                                    setData("location_name", e.target.value)
                                }
                                className="mt-1 block w-full"
                                isFocused
                                placeholder="Location Name"
                            />

                            <InputError
                                message={errors.location_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="mac" value="Mac Address" />

                            <TextInput
                                id="mac"
                                name="mac"
                                value={data.mac}
                                onChange={(e) => setData("mac", e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Mac Address"
                            />

                            <InputError message={errors.mac} className="mt-2" />
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

                <WifiTable wifis={wifis} updateWifi={updateWifi} />
            </div>
        </SettingIndex>
    );
}
