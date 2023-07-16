import { useForm } from "@inertiajs/react";

import { toast } from "react-hot-toast";

import Modal from "@/Components/Modal";
import Button from "@/Components/Atom/Button";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import InputError from "@/Components/Atom/InputError";

export default function AddDeviceForm({ show = false, onClose }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        unique_id: '',
        contact: '',
        phone: '',
        group_id: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route('device.store'), {
            preserveScroll: true,
            onProgress: () => toast.loading('Saving...'),
            onSuccess: () => {
                toast.success('Device saved!');
                onClose();
            },
            onError: () => toast.error('Could not save.'),
            onFinish: () => reset()
        })
    }

    return (
        <Modal show={show} maxWidth="sm" onClose={onClose}>
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
                    <Button danger onClick={onClose}>Cancel</Button>
                    <Button primary type="submit" className="ml-3" disabled={processing}>Save</Button>
                </div>
            </form>
        </Modal>
    )
}