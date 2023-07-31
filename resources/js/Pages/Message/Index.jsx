import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Atom/Button";
import { toast } from "react-hot-toast";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Atom/InputLabel";
import InputError from "@/Components/Atom/InputError";
import TextInput from "@/Components/Atom/TextInput";
import { Pagination } from "@mui/material";
import ComboBox from "@/Components/Atom/ComboBox";

export default function Index({ auth }) {
    const { messages, devices } = usePage().props;
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        device_id: devices[0].id,
        message: "",
    });

    const createMessage = () => {
        setModalTitle("Create Message");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("messages.store"), {
            preserveScroll: true,
            onProgress: () => toast.loading("Sending..."),
            onSuccess: () => {
                toast.success("Message send");
                closeModal();
            },
            onError: () => toast.error("Could not save."),
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Message" />

            <div className="px-4 py-5 sm:px-6 ls:px-8 h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>Message List</h3>

                    <Button primary onClick={createMessage}>
                        + Create Message
                    </Button>
                </div>

                <Modal show={isModalOpen} maxWidth="md" onClose={closeModal}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-ls font-medium text-gray-900">
                            {modalTitle}
                        </h2>

                        <div className="mt-4">
                            <InputLabel htmlFor="device_id" value="Device" />

                            <ComboBox
                                data={devices}
                                onChange={(e) => setData('device_id', e)}
                                selectedBy="id"
                                showBy="name"
                            />

                            <InputError
                                message={errors.device_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="message" value="Message" />

                            <textarea
                                id="message"
                                name="message"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                className="form-input rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mt-1 block w-full"
                                rows="7"
                                placeholder="Your Message"
                            ></textarea>
                            <InputError
                                message={errors.message}
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
                                Send
                            </Button>
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

                                router.visit(
                                    route(route().current(), { page }),
                                    {
                                        preserveState: true,
                                        replace: true,
                                    }
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
